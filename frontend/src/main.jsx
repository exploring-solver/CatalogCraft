import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthState from './components/Context/Auth/AuthState';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthState>
        <App />
      </AuthState>
    </Router>
  </React.StrictMode>
);
