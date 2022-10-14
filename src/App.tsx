import { ThemeProvider } from '@mui/material'
import Routes from './Routes/Routes'
import theme from './Theme/theme'
import React, { Suspense } from 'react'
import { UserProvider } from './Context/userContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function App() {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Suspense fallback={<div />}></Suspense>
            <Routes />
          </UserProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Router>
  )
}

export default App
