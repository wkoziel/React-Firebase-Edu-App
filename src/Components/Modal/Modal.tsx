import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  open: boolean
  title: string
  text: string
  buttonText: string
  onClose: () => void
}

const Modal = ({ open, title, text, buttonText, onClose }: Props) => {
  console.log('Modal')
  return (
    <Dialog open={open} PaperProps={{ sx: { width: '40rem', minHeight: '20rem', borderRadius: 5, padding: '1rem' } }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={onClose} size='large'>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
