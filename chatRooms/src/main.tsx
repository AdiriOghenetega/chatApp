import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from "./contexts/auth_context";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import './index.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Router>
    <AuthProvider>
   <App />
    </AuthProvider>
     </Router>
  </React.StrictMode>,
)
