
// firebase.config.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

// Exporta la instancia de la aplicación Firebase inicializada
export { app, auth };
