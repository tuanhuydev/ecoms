import { SnackbarProvider } from 'notistack';
import React from 'react';

const withSnackbar = (Component: JSX.Element) : JSX.Element => {
  return (
    <SnackbarProvider maxSnack={5}>{Component}</SnackbarProvider>
  );
};

export default withSnackbar;
