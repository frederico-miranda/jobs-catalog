import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app';
import rootReducer from './reducers/index';

const jobStore = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={jobStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
