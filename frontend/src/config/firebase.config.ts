
// firebase.config.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCd0ibtLevR_AxwNyjk-C_yHqsVAkdYVpI",
  authDomain: "proyecto-b6129.firebaseapp.com",
  projectId: "proyecto-b6129",
  storageBucket: "proyecto-b6129.appspot.com",
  messagingSenderId: "475524980176",
  appId: "1:475524980176:web:cfd4cfc084baaa3c04edd5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Exporta la instancia de la aplicación Firebase inicializada
export { app, auth };
