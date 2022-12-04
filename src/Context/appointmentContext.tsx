import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { collections } from '../Consts/collections'
import { database } from '../Database/firebaseConfig'
import paths from '../Routes/paths'
import { Appointment } from '../Types/Apointments'
import { useModalContext } from './modalContext'
import { useUserContext } from './userContext'

const appointmentsCollection = collection(database, collections.appointments)

interface AppointmentContextInterface {
  getAllAppointments: () => any
  addAppointments: (data: any) => Promise<void>
  applyForAppointmentDate: (selectedDateId: string, appointmentId: string, studentId: string) => Promise<void>
  getAppointments: (id: string) => Promise<DocumentSnapshot<DocumentData>>
}

const AppointmentContext = createContext<AppointmentContextInterface | undefined>(undefined)

export const useAppointmentContext = (): AppointmentContextInterface => {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error('useAppointmentContext must be within UserContextProvider')
  }

  return context
}

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { userID } = useUserContext()

  const getAllAppointments = async () => {
    const result: Appointment[] = []
    const querySnapshot = await getDocs(appointmentsCollection)
    querySnapshot.forEach((doc) => {
      result.push(doc.data().data)
    })
    return result
  }

  const getAppointments = async (id: string) => getDoc(doc(database, collections.appointments, id))

  const addAppointments = async (data: Appointment) =>
    setDoc(doc(appointmentsCollection, userID), {
      data,
    })
      .then(() => {
        navigate(paths.teacherDashboard)
        openModal('Sukces!', 'Terminy zostały pomyślnie zaktualizowane.', 'Powrót')
      })
      .catch((error) => {
        openModal('Nie udało się', 'Terminy nie został dodany. \n Spróbuj ponownie', 'Powrót')
      })

  const applyForAppointmentDate = async (selectedDateId: string, appointmentId: string, studentId: string) => {
    getDoc(doc(database, collections.appointments, appointmentId))
      .then((response) => {
        let shouldUpdate = true
        if (response && response.exists()) {
          const appointments: Appointment = response.data().data
          appointments.dates.forEach((date) => {
            if (date.id === selectedDateId) {
              if (!date.assignedStudent) {
                date.assignedStudent = studentId
              } else {
                shouldUpdate = false
              }
            }
          })

          if (shouldUpdate) {
            setDoc(doc(appointmentsCollection, appointmentId), {
              data: appointments,
            })
              .then(() => {
                openModal('Udało się!', 'Termin został pomyślnie zarezerowowany.', 'Potiwerdź')
              })
              .catch((error) => {
                console.error(error)
              })
          } else {
            openModal(
              'Termin nie został zarezerwowany!',
              'Bardzo nam przykro. Wybrany termin został już zarezerwowany przez innego użytkownika.',
              'Zamknij',
            )
          }
        }
      })
      .catch((error) => {
        openModal('Przepraszamy!', 'Napotkaliśmy problem w trakcie rezerwacji terminu \n Spóbuj później.', 'Zamknij')
      })
  }

  const value: AppointmentContextInterface = {
    getAllAppointments,
    addAppointments,
    getAppointments,
    applyForAppointmentDate,
  }

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
