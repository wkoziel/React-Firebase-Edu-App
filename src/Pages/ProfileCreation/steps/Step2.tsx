import { Button, Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from '../../../Components/Select/Select'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { genderOptions } from '../../../Consts/selectOptions'

type Props = {
  setLowerStep: () => void
  setUpperStep: () => void
}

const Step2 = ({ setUpperStep, setLowerStep }: Props) => {
  const { control, trigger } = useFormContext()

  return (
    <Grid container spacing={2} sx={{ margin: '0 auto', padding: '0 2rem' }}>
      <Grid item xs={12}>
        <Typography variant='h4'>Stwórz swój profil</Typography>
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
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Imię' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='lastName'
          defaultValue=''
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Nazwisko' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='birthday'
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              {...field}
              inputFormat='dd/MM/yyyy'
              disableFuture
              renderInput={(params) => <TextField {...params} label='Data urodzenia' helperText={error?.message} />}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='gender'
          defaultValue={''}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select onChange={onChange} value={value} label='Płeć' fullWidth options={genderOptions} />
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
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Telefon kontaktowy' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='email'
          defaultValue=''
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Adres email' helperText={error?.message} />
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
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Adres zamieszkania' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='city'
          defaultValue=''
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Miasto' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          control={control}
          name='postCode'
          defaultValue=''
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField {...field} label='Kod pocztowy' helperText={error?.message} />
          )}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Button onClick={setLowerStep} variant='text' size='large' sx={{ minWidth: '150px' }}>
          Powrót
        </Button>
        <Button
          onClick={() => {
            trigger()
          }}
          size='large'
          sx={{ minWidth: '200px' }}
          endIcon={<ArrowForwardIosIcon />}
        >
          Przejdź dalej
        </Button>
      </Grid>
    </Grid>
  )
}

export default Step2
