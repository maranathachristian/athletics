import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import './index.css'

const api = "http://localhost:8080/api/"
const version = "1.0.0"

// TODO : handle anything else that needs to be handled
axios.get(api + "status")
  .then(status => {
    if (status.status)
    if (status.data.version !== version) {
      console.error("Server and client out-of-date.")
    }
  })
  .catch(_error => console.error("Server is offline."));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)