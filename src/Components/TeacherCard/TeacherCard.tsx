import { Box, Chip, Grid, Rating, Typography } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { subjectOptions } from '../../Consts/selectOptions'
import { Appointment } from '../../Types/Apointments'

type Props = {
  appointment: Appointment
}

const TeacherCard = ({ appointment }: Props) => {
  const { subject, bio, dates, price } = appointment
  return (
    <Box width={'100%'} mt={2}>
      <Grid container>
        <Grid item xs={4} sx={{ padding: '20px', borderRight: '1px solid lightgray' }}>
          {/* TODO: ADD name */}
          <Typography variant='h5'>Wojceich Kozieł</Typography>
          <Box sx={{ display: 'flex', my: '10px', justifyContent: 'space-between', px: '5px' }}>
            <Typography variant='body1'>{subjectOptions.find((s) => s.value === subject)?.name}</Typography>
            <Typography variant='body1'>{price} zł/h</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
            <Rating name='read-only' value={4} readOnly />
            <Typography variant='body2' color={'gray'}>
              Ocena 4.2 (40 opinii)
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
          {dates.map((date, index) => (
            <Grid container key={index}>
              <Grid
                component={'button'}
                item
                xs={4}
                sx={{
                  width: '100%',
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeacherCard
