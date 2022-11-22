import { Timestamp } from 'firebase/firestore'

export type Appointment = {
  teacherId: string
  subject: string
  bio: string
  price: number
  dates: { id: string; date: Date | Timestamp }[]
}
