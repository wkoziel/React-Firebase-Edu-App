import React from 'react'
import QuoteBanner from '../Components/QuoteBanner/QuoteBanner'
import FullScreenContainer from '../Layouts/FullScreenContainer'
import { loginQuote } from '../Consts/quotes'
import CenterContainer from '../Layouts/CenterContainer'
import FormContainer from '../Layouts/FormContainer'
import { Button, TextField } from '@mui/material'
import Checkbox from '../Components/Checkbox/Checkbox'
import paths from '../Routes/paths'
import { Controller, useForm } from 'react-hook-form'
import { UserSignIn } from '../Types/Users'
import { useUserContext } from '../Context/userContext'
import Alert from '../Components/Alert/Alert'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { signInUser, authMessage } = useUserContext()
  const { author, quote } = loginQuote
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<UserSignIn>({ mode: 'onSubmit' })

  const onSubmit = (data: UserSignIn) => {
    const { email, password } = data
    if (email && password) signInUser({ email, password })
  }

  return (
    <FullScreenContainer>
      <QuoteBanner quote={quote} author={author} />

      <CenterContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)} title='Zaloguj się do EDU' buttonText='Zaloguj'>
          {authMessage && <Alert {...authMessage} />}
          <Controller
            control={control}
            name='email'
            defaultValue=''
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
          <Checkbox label='Zapamiętaj mnie' />
          <Button variant='contained' type='submit'>
            Zaloguj
          </Button>
          <Button sx={{ textAlign: 'center' }} onClick={() => navigate(paths.register)} variant='text'>
            Nie masz konta? Zarejestruj się!
          </Button>
        </FormContainer>
      </CenterContainer>
    </FullScreenContainer>
  )
}

export default Login
