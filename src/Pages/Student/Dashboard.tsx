import React, { useEffect, useState, useCallback } from 'react'
import { Container, Box, Grid, Typography } from '@mui/material'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { Appointment } from '../../Types/Apointments'
import TeacherCard from '../../Components/TeacherCard/TeacherCard'
import { subjectOptions } from '../../Consts/selectOptions'
import Select from '../../Components/Select/Select'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [subject, setSubject] = useState<string | null>(null)

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

  const filteredAppointments = subject ? appointments.filter((a) => a.subject === subject) : appointments

  return (
    <Container sx={{ py: '2rem' }}>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={7}></Grid>
          <Grid item xs={5}>
            <Select
              onChange={(e) => setSubject(e.target.value as string)}
              value={subject}
              label='Przedmiot'
              fullWidth
              options={subjectOptions}
            />
          </Grid>
          <Grid item xs={12}>
            {filteredAppointments?.map((appointment, index) => (
              <TeacherCard key={index} appointment={appointment} reloadData={() => loadData()} />
            ))}
            {!filteredAppointments.length && (
              <Box sx={{ width: '100%', pt: 20 }}>
                <Typography variant='h5' textAlign={'center'}>
                  Żaden z dostępnych terminów nie spełnia parametrów wyszukiwania
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default Dashboard
