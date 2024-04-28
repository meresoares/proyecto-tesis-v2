import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { app as firebaseConfig } from './config/firebase.config';

// Inicializa Firebase con la configuración proporcionada
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
firebaseConfig;

// Utiliza createRoot
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
