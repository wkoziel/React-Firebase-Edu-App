import React from 'react'
import { v4 as uuid } from 'uuid'
import { Container, Grid, Typography, TextField, Button, IconButton, Divider } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers'
import Select from '../../Components/Select/Select'
import { useNavigate } from 'react-router-dom'
import paths from '../../Routes/paths'
import { subjectOptions } from '../../Consts/selectOptions'
import { Appointment } from '../../Types/Apointments'
import { useAppointmentContext } from '../../Context/appointmentContext'

type Props = {}

const AddAppointment = (props: Props) => {
  const navigate = useNavigate()
  const { addAppointment } = useAppointmentContext()
  const methods = useForm<Appointment>({
    mode: 'onChange',
    defaultValues: { subject: '', bio: '', price: '', dates: [{ date: new Date(), id: uuid() }] },
  })

  const { handleSubmit, control, watch, formState } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  })

  const onSubmit = (data: Appointment) => {
    addAppointment(data).then(() => console.log('end'))
  }

  const { subject } = watch()

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ margin: '0 auto', padding: '0 2rem' }}>
            <Grid item xs={7}>
              <Typography variant='h4'>Utwórz termin korepetycji</Typography>
              <Typography variant='caption' color='text.secondary'>
                Wypełnij formularz aby użytkownicy mogli zobaczyć twój nowy termin
              </Typography>
            </Grid>

            <Grid xs={5} item sx={{ justifySelf: 'flex-end' }}>
              <Controller
                control={control}
                name='subject'
                defaultValue={''}
                rules={{ required: 'To pole jest wymagane' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    onChange={onChange}
                    value={value}
                    label='Wybierz przedmiot'
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    options={subjectOptions}
                  />
                )}
              />
            </Grid>

            {subject && (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={2}>
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
                <Grid item xs={1} sx={{ alignSelf: 'center' }}>
                  <Typography variant='h5'>ZŁ / H</Typography>
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
                  <IconButton onClick={() => append({ date: new Date(), id: uuid() })} sx={{ width: 35, height: 35 }}>
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
                          inputFormat='dd/MM/yyyy HH:mm'
                          disablePast
                          ampm={false}
                          minutesStep={15}
                          renderInput={(params) => (
                            <TextField {...params} label='Termin' error={!!error} helperText={error?.message} />
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
                  <Button
                    type='submit'
                    size='large'
                    disabled={!formState.isValid || formState.isSubmitting}
                    sx={{ minWidth: '200px' }}
                  >
                    Zatwierdź
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </FormProvider>
    </Container>
  )
}

export default AddAppointment
