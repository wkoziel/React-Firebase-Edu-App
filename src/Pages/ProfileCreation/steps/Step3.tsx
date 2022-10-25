import React from 'react'
import { Grid, Typography } from '@mui/material'

type Props = {
  setLowerStep: () => void
  setUpperStep: () => void
}

const Step3 = ({ setLowerStep, setUpperStep }: Props) => {
  return (
    <Grid container spacing={2} sx={{ margin: '0 auto', padding: '0 2rem' }}>
      <Grid item xs={12}>
        <Typography variant='h4'>Stwórz swój profil</Typography>
        <Typography variant='caption' color='text.secondary'>
          Pozwól się nam bliżej poznać
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Step3
