import { createContext, useContext, useEffect, useState } from 'react'
import { User, UserProfile, UserRole, UserSignIn } from '../Types/Users'
import { AuthMessage } from '../Types/Others'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, database } from '../Database/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../Routes/paths'
import { addDoc, collection, getDocs, onSnapshot, query, where, doc, getDoc, setDoc } from 'firebase/firestore'
import { getDatabase, ref, child, get, set } from 'firebase/database'
import { useModalContext } from './modalContext'

const userCollection = collection(database, 'users')
interface UserContextInterface {
  userID: string
  user: UserProfile | null
  authMessage: AuthMessage | null
  isAuth: boolean
  userRole: UserRole | null
  signInUser: (userData: UserSignIn) => void
  createUser: (userData: UserSignIn) => void
  createUserProfile: (userData: UserProfile) => void
  getUserProfile: (id: string) => any
  logoutUser: () => void
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
  const [userID, setUserID] = useState<string>('')
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)

  const isAuth = !!userID
  const navigate = useNavigate()
  const { openModal } = useModalContext()

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const _userId = firebaseUser.uid

        setUserID(_userId)

        const docRef = doc(database, `users/${_userId}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUser(docSnap.data()?.user)
          const _userRole = docSnap.data()?.user?.role
          if (_userRole === 'teacher') {
            navigate(paths.teacherDashboard)
            setUserRole('teacher')
          }
          if (_userRole === 'student') {
            alert('Dashboard ucznia')
            setUserRole('student')
          }
        } else {
          navigate(paths.profileCreation)
        }
      }
    })
  }, [])

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

  const logoutUser = async () => {
    await signOut(auth)
    navigate(paths.login)
  }

  const createUserProfile = async (user: UserProfile) => {
    setDoc(doc(userCollection, userID), {
      user,
    })
      .then(() => {
        openModal('Sukces', 'Użytkownik został dodany', 'Potwierdź')
        if (user.role === 'teacher') navigate(paths.teacherDashboard)
        if (user.role === 'student') alert('Dashboard ucznia')
      })
      .catch((error) => {
        openModal('Nie udało się', 'Użytkownik został dodany', 'Potwierdź')
      })
  }

  const getUserProfile = async (id: string) => {}

  const value: UserContextInterface = {
    userID,
    user,
    authMessage,
    isAuth,
    userRole,
    signInUser,
    createUser,
    createUserProfile,
    getUserProfile,
    logoutUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
