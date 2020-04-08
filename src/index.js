import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app';
import JobDetails from './components/job-details';
import rootReducer from './reducers/index';

const jobStore = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={jobStore}>
      <BrowserRouter>
        <div>
          <Route path="/jobs/:jobKey" component={JobDetails} />
          <Route path="/" component={App} />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
