import { ThemeProvider } from '@mui/material';
import Routes from './Routes/Routes';
import theme from './Theme/theme';
import React from 'react';

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Routes />
      </ThemeProvider>
   );
}

export default App;
