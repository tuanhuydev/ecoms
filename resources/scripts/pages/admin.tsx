import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@components/Router';
import Admin from '@containers/Admin';
import withMuiStyles from '../hocs/withMuiStyles';
import { store } from '../store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Router>{withMuiStyles(Admin)}</Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
