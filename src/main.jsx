import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='max-h-screen'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>,
  </React.StrictMode>,
)

