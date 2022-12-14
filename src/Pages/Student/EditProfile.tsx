import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import { UserProfileType } from '../../Types/Users'
import { Container, Grid, TextField, Button, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import Select from '../../Components/Select/Select'
import { genderOptions } from '../../Consts/selectOptions'
import paths from '../../Routes/paths'

type Props = {}

const EditProfile = (props: Props) => {
  const { getMyProfile, updateUserProfile } = useUserContext()
  const navigate = useNavigate()

  const methods = useForm<UserProfileType>({
    mode: 'onChange',
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = methods

  useEffect(() => {
    const loadDate = async () => {
      const data = await getMyProfile()
      if (data) reset({ ...data, birthday: data.birthday.toDate() })
    }
    loadDate()
  }, [getMyProfile, reset])

  const onSubmit = async (data: UserProfileType) => {
    updateUserProfile(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Grid container spacing={2} sx={{ margin: '0 auto', padding: '0 2rem' }}>
          <Grid item xs={12}>
            <Typography variant='h4'>Edytuj swój profil</Typography>
            <Typography variant='caption' color='text.secondary'>
              Pozwól się nam bliżej poznać
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '1rem' }}>
            <Typography variant='caption' fontWeight='700' color='text.secondary'>
              Dane Osobowe
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name='firstName'
              defaultValue=''
              rules={{ required: 'To pole jest wymagane' }}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label='Imię' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='lastName'
              defaultValue=''
              rules={{ required: 'To pole jest wymagane' }}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label='Nazwisko' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='birthday'
              rules={{ required: 'To pole jest wymagane' }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
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
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  label='Płeć'
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  options={genderOptions}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '1rem' }}>
            <Typography variant='caption' fontWeight='700' color='text.secondary'>
              Dane kontaktowe
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='phone'
              defaultValue=''
              rules={{
                required: 'To pole jest wymagane',
                validate: { isNumber: (v: any) => v > 0 || 'Pole dopuszcza tylko liczby' },
                minLength: { value: 9, message: 'Numer powinien posiadać conajmniej 9 znaków' },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label='Telefon kontaktowy' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='email'
              defaultValue=''
              rules={{
                required: 'To pole jest wymagane',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Adres email nie jest poprawny',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label='Adres email' error={!!error} helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant='text' size='large' sx={{ mt: 2 }} onClick={() => navigate(paths.studentDashboard)}>
              Powrót
            </Button>
            <Button type='submit' size='large' sx={{ mt: 2 }} disabled={!isValid || isSubmitting}>
              Zapisz dane
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
}

export default EditProfile
