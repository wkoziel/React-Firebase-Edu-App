import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
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
  addAppointment: (data: any) => void
  getAppointment: (id: string) => void
  getAppointments: (id: string) => any
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
  const { userID } = useUserContext()
  const { openModal } = useModalContext()
  const navigate = useNavigate()

  const getAllAppointments = () => {
    return appointmentsCollection
  }

  const getAppointments = async (id: string) => {
    console.log(`${collections.appointments}/${id}`)
    const docRef = doc(database, `${collections.appointments}/${id}`)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
    if (docSnap.exists()) return docSnap.data().appointments
    else return null
  }

  const getAppointment = async (id: string) => {
    const docRef = doc(database, `${collections.appointments}/${id}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data().appointments
    else return null
  }

  const addAppointment = async (data: Appointment) => {
    const docRef = doc(database, `${collections.appointments}`, userID)
    const docSnap = await getDoc(docRef)

    setDoc(
      doc(appointmentsCollection, userID),
      docSnap.exists() ? { appointments: [...docSnap.data().appointments, ...[data]] } : { appointments: [data] },
    )
      .then(() => {
        navigate(paths.teacherDashboard)
      })
      .catch((error) => {
        openModal('Nie udało się', 'Przedmiot nie został dodany', 'Powrót')
      })
  }

  const value: AppointmentContextInterface = { getAllAppointments, addAppointment, getAppointment, getAppointments }

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
