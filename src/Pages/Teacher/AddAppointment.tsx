import React from 'react'
import { Container, Grid, Typography, TextField, Button, IconButton } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers'
import Select from '../../Components/Select/Select'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'
import { subjectOptions } from '../../Consts/selectOptions'

type Props = {}

const AddAppointment = (props: Props) => {
  const navigate = useNavigate()
  const methods = useForm<any>({
    //FIXME: Change to proper type
    mode: 'onChange',
    defaultValues: { subject: '', bio: '', dates: [{ date: '', city: '' }] },
  })

  const { handleSubmit, control } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  })

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
                name='subject'
                defaultValue={''}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    label='Przedmiot'
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    options={subjectOptions}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}></Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name='subject'
                defaultValue={''}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    label='Przedmiot'
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    options={subjectOptions}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name='price'
                defaultValue=''
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField {...field} label='Cena za godzinę' error={!!error} helperText={error?.message} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
                    rows={5}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Typography>Terminy:</Typography>
              <IconButton onClick={() => append({ date: '' })} sx={{ width: 35, height: 35 }}>
                <AddCircleIcon sx={{ width: 35, height: 35, color: 'primary.main' }} />
              </IconButton>
            </Grid>
            {fields.map((item, index) => (
              <Grid
                item
                xs={7}
                key={item.id}
                sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Controller
                  control={control}
                  name={`dates.${index}.date`}
                  rules={{ required: 'To pole jest wymagane' }}
                  render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                      {...field}
                      inputFormat='dd/MM/yyyy'
                      disablePast
                      renderInput={(params) => (
                        <TextField {...params} label='Data urodzenia' error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />

                <IconButton onClick={() => remove(index)} sx={{ width: 35, height: 35 }}>
                  <RemoveCircleIcon sx={{ width: 35, height: 35, color: 'primary.main' }} />
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
