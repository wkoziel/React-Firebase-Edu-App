import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'
import { Appointment } from '../../Types/Apointments'
import TeacherCard from '../../Components/TeacherCard/TeacherCard'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { getAppointments } = useAppointmentContext()
  const { userID } = useUserContext()

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAppointments(userID)
        if (data) setAppointments(data)
      } finally {
        setIsLoading(false)
      }
    }
    if (userID) loadData()
  }, [userID])

  return (
    <>
      <Container>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <>
            {appointments?.map((appointment, index) => (
              <TeacherCard key={index} appointment={appointment} />
            ))}
          </>
        )}
      </Container>
    </>
  )
}

export default Dashboard
