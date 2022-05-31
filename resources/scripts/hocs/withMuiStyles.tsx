import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Reset CSS
import React, { FC } from 'react';
import mainTheme from '../configs/themes';

const withMuiStyles = (Component: FC): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Component />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withMuiStyles;
