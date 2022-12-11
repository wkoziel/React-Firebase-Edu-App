import { Timestamp } from 'firebase/firestore'
import { UserProfileType } from './Users'

export type Appointment = {
  id: string
  subject: string
  bio: string
  price: number
  dates: AppointmentDate[]
  teacher: UserProfileType
}

export type AppointmentDate = { id: string; date: Date | Timestamp; assignedStudent?: UserProfileType }

export type StudentDate = { id: string; date: Date | Timestamp; teacher: UserProfileType }
