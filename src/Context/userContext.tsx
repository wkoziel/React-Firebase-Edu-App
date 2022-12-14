import { createContext, useContext, useEffect, useState } from 'react'
import { UserProfileType, UserRole, UserSignIn } from '../Types/Users'
import { AuthMessage } from '../Types/Others'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, database, storage } from '../Database/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import paths from '../Routes/paths'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useModalContext } from './modalContext'
import { collections } from '../Consts/collections'
import { getDownloadURL, ref } from 'firebase/storage'

const userCollection = collection(database, collections.users)
interface UserContextInterface {
  userID: string
  user: UserProfileType | null
  authMessage: AuthMessage | null
  isAuth: boolean
  userRole: UserRole | null
  signInUser: (userData: UserSignIn) => void
  createUser: (userData: UserSignIn) => void
  createUserProfile: (userData: UserProfileType) => void
  updateUserProfile: (userData: UserProfileType) => Promise<void>
  getUserProfile: (id: string) => any
  logoutUser: () => void
  getMyProfile: () => any
  userImage: string
  loadUserPhoto: (userId: string) => void
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
  const [user, setUser] = useState<UserProfileType | null>(null)
  const [userImage, setUserImage] = useState('')

  const isAuth = !!userID
  const navigate = useNavigate()
  const { openModal } = useModalContext()

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const _userId = firebaseUser.uid

        setUserID(_userId)

        const docRef = doc(database, `${collections.users}/${_userId}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUser(docSnap.data()?.user)
          const _userRole = docSnap.data()?.user?.role
          if (_userRole === 'teacher') {
            navigate(paths.teacherDashboard)
            setUserRole('teacher')
          }
          if (_userRole === 'student') {
            navigate(paths.studentDashboard)
            setUserRole('student')
          }
        } else {
          navigate(paths.profileCreation)
        }
        loadUserPhoto(_userId)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUserPhoto = (userID: string) => {
    const storageRef = ref(storage, `${userID}.jpg`)
    getDownloadURL(storageRef)
      .then((url) => setUserImage(url))
      .catch((err) => setUserImage(''))
  }

  const signInUser = (userData: UserSignIn) => {
    const { email, password } = userData
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {})
      .catch((error) => {
        setAuthMessage({
          type: 'error',
          title: 'Co?? posz??o nie tak!',
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
          title: 'Konto zosta??o utworzone!',
          message: 'Mo??esz si?? zalogowa??',
        })
        navigate(paths.login)
      })
      .catch((error) => {
        setAuthMessage({
          type: 'error',
          title: 'Co?? posz??o nie tak!',
          message: error.message,
        })
      })
  }

  const logoutUser = async () => {
    await signOut(auth)
    navigate(paths.login)
  }

  const createUserProfile = async (user: UserProfileType) => {
    setDoc(doc(userCollection, userID), {
      user,
    })
      .then(() => {
        openModal(
          'Sukces',
          'Tw??j profil zosta?? pomy??lnie utworzony. \n Teraz mo??esz w pe??ni korzysta?? z platformy.',
          'Potwierd??',
        )
        if (user.role === 'teacher') navigate(paths.teacherDashboard)
        else if (user.role === 'student') navigate(paths.studentDashboard)
      })
      .catch((error) => {
        openModal('Nie uda??o si??', 'U??ytkownik nie zosta?? dodany', 'Powr??t')
      })
  }

  const updateUserProfile = async (user: UserProfileType) =>
    setDoc(doc(userCollection, userID), {
      user,
    })
      .then(() => {
        openModal('Sukces', 'Tw??j profil zosta?? pomy??lnie edytowany.', 'Potwierd??')
      })
      .catch((error) => {
        openModal('Nie uda??o si??', 'U??ytkownik nie zosta?? dodany', 'Powr??t')
      })

  const getUserProfile = async (id: string) => getDoc(doc(database, collections.users, id))

  const getMyProfile = async () => {
    const docRef = doc(database, `${collections.users}/${userID}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data().user
    else return null
  }

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
    getMyProfile,
    updateUserProfile,
    userImage,
    loadUserPhoto,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
