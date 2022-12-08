import React, { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Container, Grid, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'
import { Appointment } from '../../Types/Apointments'
import { useAppointmentContext } from '../../Context/appointmentContext'
import { useUserContext } from '../../Context/userContext'

type Props = {}

const AddAppointment = (props: Props) => {
  const { addAppointments, getAppointments } = useAppointmentContext()
  const { user, userID } = useUserContext()
  const navigate = useNavigate()

  const methods = useForm<Appointment>({
    mode: 'onChange',
    defaultValues: { bio: '', price: 0, dates: [{ date: new Date(), id: uuid() }] },
  })
  const { handleSubmit, control, formState, setValue, reset } = methods

  useEffect(() => {
    if (userID)
      getAppointments(userID).then((response) => {
        if (response.exists()) {
          const data = response.data().data
          reset({
            ...data,
            dates: data.dates.map((d: any) => ({
              date: d.date.toDate(),
              id: d.id,
              assignedStudent: d?.assignedStudent || '',
            })),
          })
        }
      })
  }, [userID, getAppointments, reset])

  useEffect(() => {
    if (user) {
      setValue('subject', user.subject)
      setValue('teacher', user)
      setValue('id', user.userId)
    }
  }, [user, setValue])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  })

  const onSubmit = async (data: Appointment) => {
    addAppointments(data)
  }

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: '0 auto' }}>
            <Grid item xs={9}>
              <Typography variant='h4'>Utwórz termin korepetycji</Typography>
              <Typography variant='caption' color='text.secondary'>
                Wypełnij formularz aby użytkownicy mogli zobaczyć twój nowy termin
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name='price'
                defaultValue={0}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label='Cena'
                    type={'number'}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>zł/h</InputAdornment>,
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} mt={3}>
              <Controller
                control={control}
                name='bio'
                defaultValue=''
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label='Opis korepetycji'
                    multiline
                    rows={6}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', my: '1.5rem' }}
            >
              <Typography variant='h5'>Wybrane terminy korepetycji:</Typography>
              <IconButton onClick={() => append({ date: new Date(), id: uuid() })} sx={{ width: 35, height: 35 }}>
                <AddCircleIcon sx={{ width: 35, height: 35, color: 'primary.main' }} />
              </IconButton>
            </Grid>
            {fields.map((item, index) => (
              <Grid
                item
                xs={12}
                key={item.id}
                sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
              >
                <Controller
                  control={control}
                  name={`dates.${index}.date`}
                  rules={{ required: 'To pole jest wymagane' }}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      {...field}
                      inputFormat='dd/MM/yyyy HH:mm'
                      disablePast
                      ampm={false}
                      minutesStep={15}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ width: '70%' }}
                          label='Termin'
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <IconButton
                  disabled={!!item.assignedStudent}
                  onClick={() => remove(index)}
                  sx={{ width: 35, height: 35 }}
                >
                  <RemoveCircleIcon
                    sx={{ width: 35, height: 35, color: !!item.assignedStudent ? 'gray' : 'primary.main' }}
                  />
                </IconButton>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button
                onClick={() => navigate(paths.teacherDashboard)}
                variant='text'
                size='large'
                sx={{ minWidth: '150px' }}
              >
                Powrót
              </Button>
              <Button
                type='submit'
                size='large'
                disabled={!formState.isValid || formState.isSubmitting}
                sx={{ minWidth: '200px' }}
              >
                Zatwierdź
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  )
}

export default AddAppointment
