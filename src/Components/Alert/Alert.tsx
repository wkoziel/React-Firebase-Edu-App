import React from 'react'
import { Alert as MuiAlert, AlertTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'

type Props = {
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  message: string
}

const Alert = ({ type, title, message }: Props) => {
  return (
    <Stack>
      <MuiAlert severity={type} sx={{ borderRadius: 2 }}>
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
        <Typography variant='caption'>{message}</Typography>
      </MuiAlert>
    </Stack>
  )
}

export default Alert
