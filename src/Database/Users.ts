import { collections } from '../Consts/collections'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { User } from '../Types/Users'
import { database } from './firebaseConfig'

const userCollection = collection(database, collections.users)

export const postUser = (user: User) => {
  addDoc(userCollection, { user })
    .then(() => alert('Użytkownik został dodany'))
    .catch((error) => alert('error.message'))
}

export const getUser = async (email: string) => {
  const user = query(userCollection, where('email', '==', email))
  if (user) return user
  return null
}
