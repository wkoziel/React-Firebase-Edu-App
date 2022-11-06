export type UserSignIn = {
  email: string
  password: string
}

export type UserRegister = {
  email: string
  password: string
  confirmPassword: string
}

export type User = {
  id: string
}

export type PostUser = {}

export type UserProfile = {
  userId: string
  firstName: string
  lastName: string
  bio: string
  birthday: Date | string
  gender: 'female' | 'male' | 'other'
  role: 'student' | 'teacher' | 'admin'
  address: string
  city: string
  postCode: string
  phone: string
  email: string
}

export type UserRole = 'student' | 'teacher' | 'admin'
