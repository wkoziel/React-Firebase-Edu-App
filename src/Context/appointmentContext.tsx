import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
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
  addAppointment: (data: any) => Promise<void>
  getAppointment: (id: string) => Promise<DocumentSnapshot<DocumentData>>
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
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { userID } = useUserContext()

  const getAllAppointments = () => {
    return appointmentsCollection
  }

  const getAppointments = async (id: string) => {
    const docRef = doc(database, `${collections.appointments}/${id}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data().appointments
    else return null
  }

  const getAppointment = async (id: string) => getDoc(doc(database, collections.appointments, id))

  // const result: Appointment[] = []
  // const q = query(appointmentsCollection, where('teacherId', '==', id))
  // onSnapshot(q, (data) => data.docs.forEach((item) => result.push(item.data() as Appointment)))
  // return result

  // const docRef = doc(database, `${collections.appointments}/${id}`)
  // const docSnap = await getDoc(docRef)
  // if (docSnap.exists()) return docSnap.data().appointments
  // else return null

  const addAppointment = async (data: Appointment) =>
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

  const value: AppointmentContextInterface = { getAllAppointments, addAppointment, getAppointment, getAppointments }

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}
