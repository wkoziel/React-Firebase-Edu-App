import React from 'react';
import { Checkbox as MuiCheckbox, Box, Typography } from '@mui/material';

type Props = {
   label: string;
};

const Checkbox = ({ label = '' }: Props) => {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <MuiCheckbox />
         <Typography variant='caption'>{label}</Typography>
      </Box>
   );
};

export default Checkbox;
