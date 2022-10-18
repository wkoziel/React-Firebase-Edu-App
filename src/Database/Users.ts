import { collections } from '../Consts/collections'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { User } from '../Types/Users'
import { database } from './firebaseConfig'
import { readQueryData } from './helpers'

const userCollection = collection(database, collections.users)

export const postUser = (user: User) => {
  addDoc(userCollection, { user })
    .then(() => alert('Użytkownik został dodany'))
    .catch((error) => alert('error.message'))
}

export const getUser = async (id: string) => {
  const q = query(userCollection, where('id', '==', id))
  const userData = await readQueryData(q)
  return userData
}
