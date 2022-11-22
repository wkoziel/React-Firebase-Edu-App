import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Menu } from '@mui/material'
import { useState } from 'react'
import { useUserContext } from '../../Context/userContext'
import { useLocation, useNavigate } from 'react-router-dom'

import paths from '../../Routes/paths'

const pagesTeacher = [
  { name: 'Strona główna', route: paths.teacherDashboard },
  { name: 'Zarządzaj terminami', route: paths.teacherAddAppointment },
  { name: 'Profil', route: paths.teacherProfile },
]
const pagesStudent = [
  { name: 'Strona główna', route: paths.studentDashboard },
  { name: 'Profil', route: paths.studentProfile },
]

const settingsTeacher = [{ name: 'Wyloguj', route: paths.logout }]

const settingsStudent = [{ name: 'Wyloguj', route: paths.logout }]

const Navbar = () => {
  const { isAuth, userRole, user } = useUserContext()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const getLogoUrl = () => {
    if (userRole === 'teacher') return paths.teacherDashboard
    if (userRole === 'student') return paths.studentDashboard
    return paths.login
  }

  if (
    !isAuth ||
    location.pathname === paths.login ||
    location.pathname === paths.register ||
    location.pathname === paths.profileCreation
  )
    return null

  const pages = userRole === 'teacher' ? pagesTeacher : pagesStudent
  const settings = userRole === 'teacher' ? settingsTeacher : settingsStudent

  return (
    <AppBar position='static'>
      <Container sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href={getLogoUrl()}
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EDU
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.route)}
                sx={{ my: 2, mx: 1, color: 'white', display: 'block' }}
                variant='text'
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Otwórz menu'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={`${user?.firstName} ${user?.lastName}`}>{`${user?.firstName[0].toUpperCase() || 'N'}${
                  user?.lastName[0].toUpperCase() || 'A'
                }`}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu()
                    navigate(setting.route)
                  }}
                  sx={{ minWidth: '200px' }}
                >
                  <Typography textAlign='center'>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
