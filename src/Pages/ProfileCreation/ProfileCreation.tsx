import { Container } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UserProfile } from '../../Types/Users'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'

const ProfileCreation = () => {
  const [step, setStep] = useState(1)

  const methods = useForm<UserProfile>({
    mode: 'onChange',
  })

  const { handleSubmit } = methods

  const setUpperStep = () => {
    setStep(step + 1)
  }

  const setLowerStep = () => {
    setStep(step - 1)
  }

  const onSubmit = (data: UserProfile) => {
    console.log('Submit', data)
  }

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <Step1 setUpperStep={setUpperStep} />}
          {step === 2 && <Step2 setUpperStep={setUpperStep} setLowerStep={setLowerStep} />}
        </form>
      </FormProvider>
    </Container>
  )
}

export default ProfileCreation
