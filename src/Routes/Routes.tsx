import React, { lazy } from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Logout from '../Pages/Logout'
import paths from './paths'

const Login = lazy(() => import('../Pages/Login'))
const Register = lazy(() => import('../Pages/Register'))
const ProfileCreation = lazy(() => import('../Pages/ProfileCreation/ProfileCreation'))

// Teacher
const TeacherDashboard = lazy(() => import('../Pages/Teacher/Dashboard'))

const Routes = () => {
  return (
    <>
      <Navbar />

      <Switch>
        {/* COMMON */}
        <Route path='/' element={<Navigate to={paths.login} replace />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
        <Route path={paths.profileCreation} element={<ProfileCreation />} />
        <Route path={paths.logout} element={<Logout />} />

        {/* TEACHER */}
        <Route path={paths.teacherDashboard} element={<TeacherDashboard />} />
      </Switch>
    </>
  )
}

export default Routes
