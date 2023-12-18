import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './contexts/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(

     <AuthProvider>
       <App />
     </AuthProvider>
   

)
