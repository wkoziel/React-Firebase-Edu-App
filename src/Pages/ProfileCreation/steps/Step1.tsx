import React from 'react'
import { Box, Typography } from '@mui/material'
import StudentCartImage from '../../../Assets/Images/student_card.svg'
import TeacherCartImage from '../../../Assets/Images/teacher_card.svg'
import Card from '../../../Components/Card/Card'
import { useFormContext } from 'react-hook-form'

type Props = {
  setUpperStep: () => void
}

const Step1 = ({ setUpperStep }: Props) => {
  const { setValue } = useFormContext()

  const handleSubmit = (role: string) => {
    setValue('role', role)
    setUpperStep()
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant='h4'>Wybierz swoją rolę w platformie</Typography>
      <Typography variant='caption' color='text.secondary'>
        Rola będzie decydowała o możliwościach użytkownika w ramach platformy
      </Typography>
      <Box sx={{ display: 'flex', gap: '2rem', justifyContent: 'center', padding: '2rem 0' }}>
        <Card
          image={StudentCartImage}
          onClick={() => handleSubmit('student')}
          title='Uczeń'
          text='Bardzo mądry i porywający opis roli ucznia'
        />
        <Card
          image={TeacherCartImage}
          onClick={() => handleSubmit('teacher')}
          title='Nauczyciel'
          text='Bardzo mądry i porywający opis roli nauczyciela'
        />
      </Box>
    </Box>
  )
}

export default Step1
