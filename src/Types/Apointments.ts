import { Timestamp } from 'firebase/firestore'

export type Appointment = {
  subject: string
  bio: string
  price: string
  dates: { id: string; date: Date | Timestamp }[]
}
