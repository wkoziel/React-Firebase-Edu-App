import { createContext, useContext, useEffect, useState } from 'react'
import { UserProfile, UserSignIn } from '../Types/Users'
import { AuthMessage } from '../Types/Others'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Database/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../Routes/paths'
import { getUser } from '../Database/Users'

interface UserContextInterface {
  userID: string | null
  authMessage: AuthMessage | null
  isAuth: boolean
  signInUser: (userData: UserSignIn) => void
  createUser: (userData: UserSignIn) => void
  createUserProfile: (userData: UserProfile) => void
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
  const [userID, setUserID] = useState<string | null>(null)
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)
  const isAuth = !!userID
  const navigate = useNavigate()

  const signInUser = (userData: UserSignIn) => {
    const { email, password } = userData
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {})
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
        setAuthMessage({
          type: 'success',
          title: 'Konto zostało utworzone!',
          message: 'Możesz się zalogować',
        })
        navigate(paths.login)
      })
      .catch((error) => {
        setAuthMessage({
          type: 'error',
          title: 'Coś poszło nie tak!',
          message: error.message,
        })
      })
  }

  const createUserProfile = () => {}

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserID(firebaseUser.uid)
        // navigate(paths.profileCreation)
      } else {
        setUserID(null)
      }
    })
  }, [])

  useEffect(() => {
    const loadUserData = async () => {
      // @ts-ignore
      const _user = await getUser(userID)
      console.log('_user', _user)

      if (_user.length) {
        console.log('dupa')
      } else navigate(paths.profileCreation)
    }
    if (userID) loadUserData()
  }, [userID])

  const value: UserContextInterface = {
    userID,
    authMessage,
    isAuth,
    signInUser,
    createUser,
    createUserProfile,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
