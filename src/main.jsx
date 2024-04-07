import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AccessTokenProvider } from './AccessTokenContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AccessTokenProvider>
      <App />
    </AccessTokenProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
