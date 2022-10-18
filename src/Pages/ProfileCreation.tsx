import { Container, Typography, Button, TextField, Grid, Avatar, FormControl } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UserProfile } from '../Types/Users'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Select from '../Components/Select/Select'
import { rolesOptions } from '../Consts/roles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { genderOptions } from '../Consts/selectOptions'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const ProfileCreation = () => {
  const [avatar, setAvatar] = useState(null)

  const { handleSubmit, control } = useForm<UserProfile>({
    mode: 'onSubmit',
  })

  const onSubmit = () => {}
  return (
    <Container sx={{ padding: '2rem' }}>
      <FormControl>
        <Grid
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          container
          spacing={2.5}
          sx={{ margin: '0 auto', padding: '2rem' }}
        >
          <Grid item xs={12}>
            <Typography variant='h4'>Stwórz swój profil</Typography>
            <Typography variant='caption' color='text.secondary'>
              Pozwól się nam bliżej poznać
            </Typography>
          </Grid>

          {/* <Grid item xs={12}>
            <Typography variant='subtitle1'>Avatar</Typography>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', gap: '1rem' }}>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>

            <Button variant='text' size='small'>
              Dodaj zdjęcie
            </Button>
          </Grid> */}

          <Grid item xs={12} sx={{ marginTop: '2rem' }}>
            <Typography variant='caption' fontWeight='700' color='text.secondary'>
              Dane Osobowe
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name='firstName'
              defaultValue=''
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
              name='gender'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select label='Płeć' fullWidth options={genderOptions} />
              )}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <Controller
              control={control}
              name='bio'
              defaultValue=''
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label='Opis'
                  placeholder='Napisz coś o sobie'
                  helperText={error?.message}
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid> */}
          <Grid item xs={12} sx={{ marginTop: '2rem' }}>
            <Typography variant='caption' fontWeight='700' color='text.secondary'>
              Dane kontaktowe
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='phone'
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label='Telefon kontaktowy' helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='email'
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label='Adres email' helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '2rem' }}>
            <Typography variant='caption' fontWeight='700' color='text.secondary'>
              Adres
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='address'
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label='Adres' helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='city'
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label='Miasto' helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              control={control}
              name='postCode'
              defaultValue=''
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label='Kod pocztowy' helperText={error?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button variant='text' size='large' sx={{ minWidth: '150px' }}>
              Powrót
            </Button>
            <Button type='submit' size='large' sx={{ minWidth: '200px' }} endIcon={<ArrowForwardIosIcon />}>
              Przejdź dalej
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  )
}

export default ProfileCreation
