import { Container } from '@mui/material'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UserProfile } from '../../Types/Users'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

const ProfileCreation = () => {
  const [step, setStep] = useState(1)
  // const [profileData, setProfileData] = useState<UserProfile | null>(null)

  const methods = useForm<UserProfile>({
    mode: 'onChange',
  })

  const { watch } = methods
  const form = watch()
  console.log(form)

  const setUpperStep = () => {
    setStep(step + 1)
  }

  const setLowerStep = () => {
    setStep(step - 1)
  }

  return (
    <Container sx={{ padding: '2rem', height: '100vh' }}>
      <FormProvider {...methods}>
        {step === 1 && <Step1 setUpperStep={setUpperStep} />}
        {step === 2 && <Step2 setUpperStep={setUpperStep} setLowerStep={setLowerStep} />}
        {step === 3 && <Step3 setUpperStep={setUpperStep} setLowerStep={setLowerStep} />}
      </FormProvider>
    </Container>
  )
}

export default ProfileCreation
