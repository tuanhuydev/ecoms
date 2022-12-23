import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'scripts/store/index';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'scripts/components/Router';
import withMuiStyles from 'scripts/hocs/withMuiStyles';
import withSnackbar from 'scripts/hocs/withSnackbar';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{withSnackbar(withMuiStyles(Router))}</BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
