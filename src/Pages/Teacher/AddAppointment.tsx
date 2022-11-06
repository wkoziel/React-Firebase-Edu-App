import React from 'react'
import { Container, Grid, Typography, TextField, Button } from '@mui/material'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers'
import Select from '../../Components/Select/Select'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'

type Props = {}

const AddAppointment = (props: Props) => {
  const navigate = useNavigate()
  const methods = useForm<any>({
    //FIXME: Change to proper type
    mode: 'onChange',
  })

  const { handleSubmit, control } = methods

  const onSubmit = () => {}

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: '0 auto', padding: '0 2rem' }}>
            <Grid item xs={12}>
              <Typography variant='h4'>Utwórz termin korepetycji</Typography>
              <Typography variant='caption' color='text.secondary'>
                Wypełnij formularz aby użytkownicy mogli zobaczyć twój nowy termin
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name='birthday'
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field, fieldState: { error } }) => (
                  <DateTimePicker
                    {...field}
                    inputFormat='dd/MM/yyyy'
                    disableFuture
                    renderInput={(params) => (
                      <TextField {...params} label='Data urodzenia' error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name='gender'
                defaultValue={''}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    label='Płeć'
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    options={[]}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button
                onClick={() => navigate(paths.teacherDashboard)}
                variant='text'
                size='large'
                sx={{ minWidth: '150px' }}
              >
                Powrót
              </Button>
              <Button type='submit' size='large' sx={{ minWidth: '200px' }}>
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
