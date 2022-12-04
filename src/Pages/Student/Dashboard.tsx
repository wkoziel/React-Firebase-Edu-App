import React, { useEffect, useState, useCallback } from 'react'
import { Container, Box } from '@mui/material'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { Appointment } from '../../Types/Apointments'
import TeacherCard from '../../Components/TeacherCard/TeacherCard'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const { getAllAppointments } = useAppointmentContext()

  const loadData = useCallback(async () => {
    try {
      const data = await getAllAppointments()
      if (data) {
        setAppointments(data as Appointment[])
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <Container>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <>
          {appointments?.map((appointment, index) => (
            <TeacherCard key={index} appointment={appointment} reloadData={() => loadData()} />
          ))}
        </>
      )}
    </Container>
  )
}

export default Dashboard
