import { Container, Typography, Box, TextField, Grid } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UserProfileForm } from '../Types/Users'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Select from '../Components/Select/Select'
import { rolesOptions } from '../Consts/roles'

const ProfileCreation = () => {
  const { handleSubmit, control, setError } = useForm<UserProfileForm>({
    mode: 'onSubmit',
  })
  return (
    <Container sx={{ padding: '2rem' }}>
      <Typography variant='h4'>Stwórz swój profil</Typography>
      <Grid container spacing={2} sx={{ width: '70%', margin: '0 auto' }}>
        <Grid item xs={6}>
          <Controller
            control={control}
            name='firstName'
            defaultValue=''
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField onChange={onChange} value={value} label='Imię' helperText={error?.message} />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name='lastName'
            defaultValue=''
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField onChange={onChange} value={value} label='Nazwisko' helperText={error?.message} />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name='birthday'
            defaultValue=''
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                inputFormat='dd/MM/yyyy'
                onChange={onChange}
                value={value}
                disableFuture
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={onChange}
                    value={value}
                    label='Data urodzenia'
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            control={control}
            name='role'
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select onChange={onChange} value={value} label='Rola' placeholder='Rola' options={rolesOptions} />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            control={control}
            name='bio'
            defaultValue=''
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label='Opis'
                helperText={error?.message}
                multiline
                rows={4}
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfileCreation
