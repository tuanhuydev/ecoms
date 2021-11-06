import React from 'react';
import ReactDOM from 'react-dom';
import withAuth from '../../HOC/WithAuth';
import CssBaseline from '@mui/material/CssBaseline'; // Reset CSS
import { StyledEngineProvider } from '@mui/material/styles';
import Router from '@components/Router';
import Admin from './index';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <CssBaseline />
        <Admin />
      </Router>
    </StyledEngineProvider>
  );
};

const container = document.getElementById('root');
ReactDOM.render(withAuth(App), container);
