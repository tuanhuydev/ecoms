import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline'; // Reset CSS
import { StyledEngineProvider } from '@mui/material/styles';

const withMuiStyles = (Component: FC): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Component />
    </StyledEngineProvider>
  );
};

export default withMuiStyles;
