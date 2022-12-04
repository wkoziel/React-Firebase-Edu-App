import { Box, Chip, Grid, Rating, Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { subjectOptions } from '../../Consts/selectOptions'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'
import { Appointment } from '../../Types/Apointments'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'

type Props = {
  appointment: Appointment
  reloadData: () => void
}

const TeacherCard = ({ appointment, reloadData }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDateId, setSelectedDateId] = useState('')
  const { userID } = useUserContext()
  const { applyForAppointmentDate } = useAppointmentContext()
  const { subject, bio, dates, price, teacher } = appointment

  const onDateTaleClick = (DateId: string) => {
    setSelectedDateId(DateId)
    setDialogOpen(true)
  }

  const applyForAppointment = async () => {
    setDialogOpen(false)
    const appointmentId = appointment.id
    applyForAppointmentDate(selectedDateId, appointmentId, userID).then(() => reloadData())
  }

  return (
    <Box width={'100%'} mt={2}>
      <Grid container>
        <Grid item xs={4} sx={{ padding: '20px', borderRight: '1px solid lightgray' }}>
          <Typography variant='h5'>
            {teacher.firstName} {teacher.lastName}
          </Typography>
          <Box sx={{ display: 'flex', my: '10px', justifyContent: 'space-between', px: '5px' }}>
            <Typography variant='body1'>{subjectOptions.find((s) => s.value === subject)?.name}</Typography>
            <Typography variant='body1'>{price} zł/h</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
            <Rating name='read-only' value={4} readOnly />
            <Typography variant='body2' color={'gray'}>
              Ocena 4.2 (40 opinii) {/* TODO: Change to real rate*/}
            </Typography>
          </Box>
          <Typography variant='caption'>{bio}</Typography>
          <Box mt={2} sx={{ display: 'flex', gap: 1 }}>
            <Chip color='primary' label='Poziom podstawowy' size='small' variant='outlined' />
            <Chip color='primary' label='Zdalne' size='small' variant='outlined' />
          </Box>
        </Grid>

        <Grid
          item
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', gap: '5px', borderRadius: '12px', padding: '10px' }}
        >
          <Grid container spacing={1}>
            {dates.map((date, index) => (
              <Grid
                item
                key={index}
                component={'button'}
                onClick={() => onDateTaleClick(date.id)}
                xs={4}
                disabled={!!date.assignedStudent}
                sx={{
                  width: '95%',
                  opacity: 0.9,
                  bgcolor: 'primary.light',
                  padding: '5px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    transition: '.3s ease',
                  },
                  '&:disable': {
                    bgcolor: 'primary.lighter',
                    opacity: 0.8,
                  },
                }}
              >
                <Typography variant='body1' fontWeight={'700'} textAlign='center'>
                  {/* @ts-ignore */}
                  {format(date.date.toDate(), 'MM/dd/yyyy HH:mm')}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {dialogOpen && (
        <ConfirmDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={() => applyForAppointment()}
          title={'Zarezerwuj termin'}
          text={'Czy na pewno chcesz dokonać reserwacji terminu?'}
        />
      )}
    </Box>
  )
}

export default TeacherCard
