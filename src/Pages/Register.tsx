import { Button, Link, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createUser } from '../Auth/auth';
import QuoteBanner from '../Components/QuoteBanner/QuoteBanner';
import { registerQuote } from '../Consts/quotes';
import CenterContainer from '../Layouts/CenterContainer';
import FormContainer from '../Layouts/FormContainer';
import FullScreenContainer from '../Layouts/FullScreenContainer';
import paths from '../Routes/paths';
import { UserRegister } from '../Types/users';

const Register = () => {
   const { author, quote } = registerQuote;

   const { handleSubmit, control, setError, formState } = useForm<UserRegister>(
      {
         mode: 'onChange',
      }
   );

   const onSubmit = (data: UserRegister) => {
      const { email, password, confirmPassword } = data;

      if (password !== confirmPassword) {
         setError('password', {
            type: 'custom',
            message: 'Hasła nie są takie same',
         });
         setError('confirmPassword', {
            type: 'custom',
            message: 'Hasła nie są takie same',
         });
      } else if (email && password) createUser(email, password);
   };

   return (
      <FullScreenContainer>
         <QuoteBanner quote={quote} author={author} />

         <CenterContainer>
            <FormContainer
               onSubmit={handleSubmit(onSubmit)}
               title='Zarejestruj się do EDU'
               buttonText='Zarejestruj'
            >
               <Controller
                  control={control}
                  name='email'
                  defaultValue=''
                  rules={{ required: true }}
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
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
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
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
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        onChange={onChange}
                        value={value}
                        label='Powtórz hsało'
                        type={'password'}
                        helperText={error?.message}
                     />
                  )}
               />
               <Button
                  variant='contained'
                  type='submit'
                  disabled={!formState.isValid}
               >
                  Zarejestruj
               </Button>
               <Link
                  sx={{ textAlign: 'center' }}
                  href={paths.login}
                  variant='body2'
               >
                  Masz już konto? Zaloguj się!
               </Link>
            </FormContainer>
         </CenterContainer>
      </FullScreenContainer>
   );
};

export default Register;
