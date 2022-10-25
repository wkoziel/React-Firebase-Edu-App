import React from 'react'
import { Box, Typography, Button } from '@mui/material'

type Props = {
  image: string
  title: string
  text: string
  onClick?: any
}

const Card = ({ image, title, text, onClick }: Props) => {
  return (
    <Box
      sx={{
        padding: '2rem',
        maxWidth: 400,
        border: '2px solid #bebebe',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '&:hover': {
          boxShadow: 5,
        },
      }}
    >
      <img src={image} alt={title} height={380} width={300} />
      <Typography variant='h5' sx={{ mt: 5 }}>
        {title}
      </Typography>
      <Typography variant='caption'>{text}</Typography>
      <Button onClick={onClick} sx={{ width: '220px', alignSelf: 'center', mt: 2 }}>
        Wybierz
      </Button>
    </Box>
  )
}

export default Card
