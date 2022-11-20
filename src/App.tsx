import { ThemeProvider } from '@mui/material'
import Routes from './Routes/Routes'
import theme from './Theme/theme'
import React from 'react'
import { UserProvider } from './Context/userContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ModalProvider } from './Context/modalContext'
import { AppointmentProvider } from './Context/appointmentContext'

function App() {
  return (
    <>
      <Router>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <UserProvider>
                <AppointmentProvider>
                  <Routes />
                </AppointmentProvider>
              </UserProvider>
            </ModalProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </Router>
    </>
  )
}

export default App
