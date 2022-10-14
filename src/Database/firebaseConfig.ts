import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA8khfA0TV3pvI9_FkEd6Yus6hXYj1atAA',
  authDomain: 'edu-backend-e3eb3.firebaseapp.com',
  projectId: 'edu-backend-e3eb3',
  storageBucket: 'edu-backend-e3eb3.appspot.com',
  messagingSenderId: '111883196112',
  appId: '1:111883196112:web:d03c105afb5f4c403d70d5',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getFirestore(app)
export const storage = getStorage(app)
