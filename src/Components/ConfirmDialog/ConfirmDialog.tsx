import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Dialog } from '@mui/material'
import { GridCloseIcon } from '@mui/x-data-grid'
import React from 'react'

type Props = { title: string; text: string; isOpen: boolean; onConfirm: () => void; onClose: () => void }

const ConfirmDialog = ({ isOpen = false, title, text, onConfirm, onClose }: Props) => {
  return (
    <Dialog open={isOpen} PaperProps={{ sx: { width: '40rem', minHeight: '20rem', borderRadius: 5, padding: '2rem' } }}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <GridCloseIcon />
      </IconButton>
      <DialogTitle variant='h4' textAlign={'center'}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DialogContentText variant='h5' textAlign={'center'}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={onClose} variant='text' size='large'>
          Anuluj
        </Button>
        <Button onClick={onConfirm} size='large'>
          Potwierdź
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
