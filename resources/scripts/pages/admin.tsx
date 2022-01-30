import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@components/Router';
import withMuiStyles from '../hocs/withMuiStyles';
import { store } from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {withMuiStyles(Router)}
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
