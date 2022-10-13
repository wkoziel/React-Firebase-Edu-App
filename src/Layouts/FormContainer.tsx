import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
   title: string;
   buttonText: string;
   onSubmit: () => void;
   children: React.ReactNode;
};

const FormContainer = ({
   title = '',
   buttonText = 'Zapisz',
   onSubmit,
   children,
}: Props) => {
   return (
      <Box
         component='form'
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            minWidth: '550px',
         }}
         onSubmit={onSubmit}
      >
         <Typography variant='h5' color='text' py={2}>
            {title}
         </Typography>
         {children}
      </Box>
   );
};

export default FormContainer;
