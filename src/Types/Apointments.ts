import { Timestamp } from 'firebase/firestore'
import { UserProfile } from './Users'

export type Appointment = {
  id: string
  subject: string
  bio: string
  price: number
  dates: { id: string; date: Date | Timestamp; assignedStudent?: string }[]
  teacher: UserProfile
}
