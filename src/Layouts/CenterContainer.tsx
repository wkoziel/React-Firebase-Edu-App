import { Box } from '@mui/material';
import React from 'react';

type Props = {
   children: React.ReactNode;
};

const CenterContainer = ({ children }: Props) => {
   return (
      <Box
         sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         {children}
      </Box>
   );
};

export default CenterContainer;
