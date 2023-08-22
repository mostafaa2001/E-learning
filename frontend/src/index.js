import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/js/bootstrap.js';
import Popper from 'popper.js'
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { CoursesContextProvider } from './context/CoursesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CoursesContextProvider>
        <App />
      </CoursesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


