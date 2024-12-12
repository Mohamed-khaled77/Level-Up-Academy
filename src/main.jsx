
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "sass"
import "react-router-dom"
import { AuthProvider } from "./components/Context/AuthContext.jsx";
createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <App />
    </AuthProvider>
)
