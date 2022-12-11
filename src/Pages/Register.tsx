import { Button, Link, TextField } from '@mui/material'
import { useUserContext } from '../Context/userContext'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import QuoteBanner from '../Components/QuoteBanner/QuoteBanner'
import { registerQuote } from '../Consts/quotes'
import CenterContainer from '../Layouts/CenterContainer'
import FormContainer from '../Layouts/FormContainer'
import FullScreenContainer from '../Layouts/FullScreenContainer'
import paths from '../Routes/paths'
import { UserRegister } from '../Types/Users'
import Alert from '../Components/Alert/Alert'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { createUser, authMessage } = useUserContext()
  const { author, quote } = registerQuote
  const navigate = useNavigate()

  const { handleSubmit, control, setError } = useForm<UserRegister>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: UserRegister) => {
    const { email, password, confirmPassword } = data

    if (password !== confirmPassword) {
      setError('password', {
        type: 'custom',
        message: 'Hasła nie są takie same',
      })
      setError('confirmPassword', {
        type: 'custom',
        message: 'Hasła nie są takie same',
      })
    } else if (email && password) createUser({ email, password })
  }

  return (
    <FullScreenContainer>
      <QuoteBanner quote={quote} author={author} />

      <CenterContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)} title='Zarejestruj się do EDU' buttonText='Zarejestruj'>
          {authMessage && <Alert {...authMessage} />}

          <Controller
            control={control}
            name='email'
            defaultValue=''
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label='Adres email'
                type={'email'}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            defaultValue=''
            rules={{ required: true, minLength: 8 }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label='Hasło'
                type={'password'}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='confirmPassword'
            defaultValue=''
            rules={{ required: true, minLength: 8 }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label='Powtórz hsało'
                type={'password'}
                helperText={error?.message}
              />
            )}
          />
          <Button variant='contained' type='submit'>
            Zarejestruj
          </Button>
          <Button sx={{ textAlign: 'center' }} onClick={() => navigate(paths.login)} variant='text'>
            Masz już konto? Zaloguj się!
          </Button>
        </FormContainer>
      </CenterContainer>
    </FullScreenContainer>
  )
}

export default Register
