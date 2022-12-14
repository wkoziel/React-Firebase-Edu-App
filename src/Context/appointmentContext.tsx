import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { collections } from '../Consts/collections'
import { database } from '../Database/firebaseConfig'
import paths from '../Routes/paths'
import { Appointment, StudentDate } from '../Types/Apointments'
import { UserProfileType } from '../Types/Users'
import { useModalContext } from './modalContext'
import { useUserContext } from './userContext'

const appointmentsCollection = collection(database, collections.appointments)

interface AppointmentContextInterface {
  getAllAppointments: () => any
  addAppointments: (data: any) => Promise<void>
  applyForAppointmentDate: (selectedDateId: string, appointmentId: string, student: UserProfileType) => Promise<void>
  getAppointments: (id: string) => Promise<DocumentSnapshot<DocumentData>>
  studentGetAllMyAppointments: (id: string) => any
  resignFromAppointmentDate: (selectedDateId: string, appointmentId: string) => Promise<void>
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
        openModal('Sukces!', 'Terminy zosta??y pomy??lnie zaktualizowane.', 'Powr??t')
      })
      .catch((error) => {
        openModal('Nie uda??o si??', 'Terminy nie zosta?? dodany. \n Spr??buj ponownie', 'Powr??t')
      })

  const applyForAppointmentDate = async (selectedDateId: string, appointmentId: string, student: UserProfileType) => {
    getDoc(doc(database, collections.appointments, appointmentId))
      .then((response) => {
        let shouldUpdate = true
        if (response && response.exists()) {
          const appointments: Appointment = response.data().data
          appointments.dates.forEach((date) => {
            if (date.id === selectedDateId) {
              if (!date.assignedStudent) {
                date.assignedStudent = student
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
                openModal('Uda??o si??!', 'Termin zosta?? pomy??lnie zarezerwowany.', 'Potwierd??')
              })
              .catch((error) => {
                console.error(error)
              })
          } else {
            openModal(
              'Termin nie zosta?? zarezerwowany!',
              'Bardzo nam przykro. Wybrany termin zosta?? ju?? zarezerwowany przez innego u??ytkownika.',
              'Zamknij',
            )
          }
        }
      })
      .catch((error) => {
        openModal('Przepraszamy!', 'Napotkali??my problem w trakcie rezerwacji terminu \n Sp??buj p????niej.', 'Zamknij')
      })
  }

  const resignFromAppointmentDate = async (selectedDateId: string, appointmentId: string) => {
    getDoc(doc(database, collections.appointments, appointmentId))
      .then((response) => {
        let shouldUpdate = true
        if (response && response.exists()) {
          const appointments: Appointment = response.data().data
          appointments.dates.forEach((date) => {
            if (date.id === selectedDateId) {
              if (date.assignedStudent) {
                delete date.assignedStudent
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
                openModal('Uda??o si??!', 'Termin zosta?? pomy??lnie usuni??ty.', 'Potiwerd??')
              })
              .catch((error) => {
                console.error(error)
              })
          } else {
            openModal('Termin nie zosta?? usuni??ty!', 'Wyst??pi?? nieoczekiwany b????d spr??buj p????niej', 'Zamknij')
          }
        }
      })
      .catch((error) => {
        openModal('Przepraszamy!', 'Napotkali??my problem w trakcie rezerwacji terminu \n Sp??buj p????niej.', 'Zamknij')
      })
  }

  const studentGetAllMyAppointments = async (studentId: string) => {
    const allAppointments = await getAllAppointments()
    const result: StudentDate[] = []
    allAppointments.forEach((a) => {
      const dates = a.dates
        .filter((d) => d.assignedStudent?.userId === studentId)
        .map((d) => ({ date: d.date, id: d.id, teacher: a.teacher }))
      dates.forEach((d) => result.push(d))
    })
    return result
  }

  const value: AppointmentContextInterface = {
    getAllAppointments,
    addAppointments,
    getAppointments,
    applyForAppointmentDate,
    studentGetAllMyAppointments,
    resignFromAppointmentDate,
  }

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
