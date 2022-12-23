import { createTheme } from '@mui/material/styles';
// import OpenSanRegular from 'scripts/assets/fonts/Open_Sans/OpenSans-Regular.ttf';

export default createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif"
  },
  // palette: {
  //   mode: 'dark'
  // },
  spacing: 16,
  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      //     @font-face {
      //       font-family: "'Open Sans', sans-serif";
      //       font-style: normal;
      //       font-display: swap;
      //       font-weight: 400;
      //       src: local('OpenSans'), local('OpenSans-Regular'), url(${OpenSanRegular}) format('ttf');
      //     },
      //   `
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});
