import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'
import { Appointment } from '../../Types/Apointments'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment | null>(null)
  const { getAppointments } = useAppointmentContext()
  const { userID } = useUserContext()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAppointments(userID)
        if (response && response.exists()) {
          const data: Appointment = response.data().data
          setAppointments(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (userID) loadData()
  }, [userID, getAppointments])

  console.log(appointments)

  return (
    <>
      <Container>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              {/* TODO: Write component displaying appointments with assigned user data */}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default Dashboard
