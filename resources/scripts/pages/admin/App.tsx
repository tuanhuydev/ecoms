import React from 'react';
import ReactDOM from 'react-dom';
import withAuth from '../../HOC/WithAuth';
import Router from '@components/Router';

const App = () => {
  return (
    <Router/>
  );
};

const container = document.getElementById('root');
ReactDOM.render(withAuth(App), container);
