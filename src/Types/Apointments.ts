import { Timestamp } from 'firebase/firestore'
import { UserProfile } from './Users'

export type Appointment = {
  id: string
  subject: string
  bio: string
  price: number
  dates: AppointmentDate[]
  teacher: UserProfile
}

export type AppointmentDate = { id: string; date: Date | Timestamp; assignedStudent?: UserProfile }

export type StudentDate = { id: string; date: Date | Timestamp; teacher: UserProfile }
