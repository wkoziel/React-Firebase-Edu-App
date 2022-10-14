import { Box } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const FullScreenContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
      }}
    >
      {children}
    </Box>
  )
}

export default FullScreenContainer
