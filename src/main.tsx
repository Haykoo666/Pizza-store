import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import './index.scss'
import { store } from './app/store';
import { ErrorBoundary } from 'react-error-boundary'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
          <App />
        {/* </ErrorBoundary> */}
      </Provider>
    </Router>
  // </React.StrictMode>,
)
