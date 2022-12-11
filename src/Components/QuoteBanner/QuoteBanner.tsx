import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
  quote: string
  author: string
}

const QuoteBanner = ({ quote = '', author = '' }: Props) => {
  return (
    <Box
      sx={{
        width: '800px',
        height: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem',
        gap: '3rem',
      }}
    >
      <Typography variant='h3' color='white'>
        {quote}
      </Typography>
      <Typography variant='body1' color='white' textAlign={'right'}>
        - {author}
      </Typography>
    </Box>
  )
}

export default QuoteBanner
