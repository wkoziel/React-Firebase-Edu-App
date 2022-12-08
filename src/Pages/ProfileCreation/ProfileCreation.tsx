import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useUserContext } from '../../Context/userContext'
import { UserProfileType } from '../../Types/Users'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'

const ProfileCreation = () => {
  const [step, setStep] = useState(1)
  const { userID, createUserProfile } = useUserContext()

  const methods = useForm<UserProfileType>({
    mode: 'onChange',
  })

  const { handleSubmit, setValue } = methods

  useEffect(() => {
    if (userID) setValue('userId', userID)
  }, [setValue, userID])

  const setUpperStep = () => {
    setStep(step + 1)
  }

  const setLowerStep = () => {
    setStep(step - 1)
  }

  const onSubmit = (data: UserProfileType) => {
    createUserProfile(data)
  }

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
          {step === 1 && <Step1 setUpperStep={setUpperStep} />}
          {step === 2 && <Step2 setUpperStep={setUpperStep} setLowerStep={setLowerStep} />}
        </form>
      </FormProvider>
    </Container>
  )
}

export default ProfileCreation
