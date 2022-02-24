import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@components/Router';
import withMuiStyles from '../hocs/withMuiStyles';
import withSnackbar from '../hocs/withSnackbar';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {withSnackbar(withMuiStyles(Router))}
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
