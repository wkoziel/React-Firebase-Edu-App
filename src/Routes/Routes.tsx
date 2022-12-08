import React, { lazy, Suspense } from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import { useUserContext } from '../Context/userContext'
import Logout from '../Pages/Logout'
import paths from './paths'

// Common
const Login = lazy(() => import('../Pages/Login'))
const Register = lazy(() => import('../Pages/Register'))
const ProfileCreation = lazy(() => import('../Pages/ProfileCreation/ProfileCreation'))

// Teacher
const TeacherDashboard = lazy(() => import('../Pages/Teacher/Dashboard'))
const TeacherAddAppointment = lazy(() => import('../Pages/Teacher/AddAppointment'))
const TeacherEditProfile = lazy(() => import('../Pages/Teacher/EditProfile'))
const TeacherProfile = lazy(() => import('../Pages/Teacher/Profile'))

// Student
const StudentDashboard = lazy(() => import('../Pages/Student/Dashboard'))
const StudentEditProfile = lazy(() => import('../Pages/Student/EditProfile'))
const StudentProfile = lazy(() => import('../Pages/Student/Profile'))
const StudentAppointments = lazy(() => import('../Pages/Student/Appointments'))

const Routes = () => {
  const { isAuth, userRole } = useUserContext()
  return (
    <>
      <Suspense fallback={<div />}>
        <Navbar />
        <Switch>
          {/* COMMON */}
          <Route path='/' element={<Navigate to={paths.login} replace />} />
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.register} element={<Register />} />
          <Route path={paths.profileCreation} element={<ProfileCreation />} />
          <Route path={paths.logout} element={<Logout />} />

          {/* TEACHER */}
          {isAuth && (
            <>
              <Route path={paths.teacherDashboard} element={<TeacherDashboard />} />
              <Route path={paths.teacherAddAppointment} element={<TeacherAddAppointment />} />
              <Route path={paths.teacherEditProfile} element={<TeacherEditProfile />} />
              <Route path={paths.teacherProfile} element={<TeacherProfile />} />
            </>
          )}

          {/* Student */}
          {isAuth && (
            <>
              <Route path={paths.studentDashboard} element={<StudentDashboard />} />
              <Route path={paths.studentEditProfile} element={<StudentEditProfile />} />
              <Route path={paths.studentProfile} element={<StudentProfile />} />
              <Route path={paths.studentAppointments} element={<StudentAppointments />} />
            </>
          )}
        </Switch>
      </Suspense>
    </>
  )
}

export default Routes
