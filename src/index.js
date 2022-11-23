import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  // yarn start (개발용 API 서버)
  axios.defaults.baseURL = process.env.REACT_APP_API_URL_DEV
} else {
  // yarn build (배포용 API 서버)
  axios.defaults.baseURL = process.env.REACT_APP_API_URL_PROD
}

axios.defaults.timeout = 5000

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
reportWebVitals()
