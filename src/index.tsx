import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import AppRoute from './routes';
import './assets/scss/root.scss'
// import Bugsnag from '@bugsnag/js'
// import BugsnagPluginReact from '@bugsnag/plugin-react'

// Bugsnag.start({
//   apiKey: '343213f49aadc853875be645dfd1f168',
//   plugins: [new BugsnagPluginReact()]
// })
// const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

ReactDOM.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <Provider store={store}>
      <AppRoute />
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
  document.getElementById('root')
);

