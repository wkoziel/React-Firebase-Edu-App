import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      dark: '#1565C0',
      light: '#1565C0',
    },
    secondary: {
      main: '#9C27B0',
      dark: '#7B1FA2;',
      light: '#BA68C8',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.54)',
    },
    error: {
      main: '#D32F2F',
      dark: '#C62828',
      light: '#EF5350',
    },
    grey: {},
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      // TODO: Set input red on error
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 2rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {},
    },
  },
})

export default theme
