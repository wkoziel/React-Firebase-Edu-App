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

export type UserProfileForm = {
  firstName: string
  lastName: string
  bio: string
  birthday: Date | string
  role: 'student' | 'teacher' | 'admin'
}
