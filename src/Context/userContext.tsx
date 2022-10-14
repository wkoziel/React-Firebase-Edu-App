import { createContext, useContext, useState } from 'react'
import { User, UserSignIn } from '../Types/Users'
import { AuthMessage } from '../Types/Others'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Database/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../Routes/paths'

interface UserContextInterface {
  user: User | null
  authMessage: AuthMessage | null
  isAuth: boolean
  signInUser: (userData: UserSignIn) => void
  createUser: (userData: UserSignIn) => void
}

const UserContext = createContext<UserContextInterface | undefined>(undefined)

export const useUserContext = (): UserContextInterface => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be within UserContextProvider')
  }

  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)
  const isAuth = !!user
  const navigate = useNavigate()

  const signInUser = (userData: UserSignIn) => {
    const { email, password } = userData
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser({ id: response.user.uid }) // FIXME:
        navigate(paths.profileCreation)
      })
      .catch((error) => {
        setAuthMessage({
          type: 'error',
          title: 'Coś poszło nie tak!',
          message: error.message,
        })
      })
  }

  const createUser = (userData: UserSignIn) => {
    const { email, password } = userData
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        signInUser(userData)
      })
      .catch((error) => {
        setAuthMessage({
          type: 'error',
          title: 'Coś poszło nie tak!',
          message: error.message,
        })
      })
  }

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid
  //     console.log('Użytkownik zalogowany')
  //   }
  // })

  const value: UserContextInterface = {
    user,
    authMessage,
    isAuth,
    signInUser,
    createUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
