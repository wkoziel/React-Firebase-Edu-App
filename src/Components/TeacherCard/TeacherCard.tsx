import { Box, Chip, Grid, Rating, Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { subjectOptions } from '../../Consts/selectOptions'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'
import { Appointment } from '../../Types/Apointments'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import pl from 'date-fns/locale/pl'

type Props = {
  appointment: Appointment
  reloadData: () => void
}

const TeacherCard = ({ appointment, reloadData }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDateId, setSelectedDateId] = useState('')
  const { user } = useUserContext()
  const { applyForAppointmentDate } = useAppointmentContext()
  const { subject, bio, dates, price, teacher } = appointment

  const onDateTaleClick = (DateId: string) => {
    setSelectedDateId(DateId)
    setDialogOpen(true)
  }

  const applyForAppointment = async () => {
    setDialogOpen(false)
    const appointmentId = appointment.id
    if (user) {
      applyForAppointmentDate(selectedDateId, appointmentId, user).then(() => {
        setTimeout(() => reloadData(), 1000)
      })
    }
  }

  /* @ts-ignore */
  const formattedDates = dates.map((d) => ({ ...d, date: d.date.toDate() })).sort((a, b) => a.date - b.date)

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
            <Chip color='primary' label={teacher.address} size='small' variant='outlined' />
          </Box>
        </Grid>

        <Grid
          item
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', gap: '5px', borderRadius: '12px', padding: '10px' }}
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {formattedDates.map((date, index) => (
              <Box
                key={index}
                component={'button'}
                onClick={() => onDateTaleClick(date.id)}
                disabled={!!date.assignedStudent}
                sx={{
                  width: '49%',
                  opacity: 0.9,
                  bgcolor: 'primary.light',
                  padding: '8px',
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
                <Typography variant='body1' fontWeight={'600'} textAlign='center'>
                  {format(date.date, 'dd/MM/yyyy (EEEE) - HH:mm', { locale: pl })}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      {dialogOpen && (
        <ConfirmDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={() => applyForAppointment()}
          title={'Zarezerwuj termin'}
          text={'Czy na pewno chcesz dokonać rezerwacji terminu?'}
        />
      )}
    </Box>
  )
}

export default TeacherCard
