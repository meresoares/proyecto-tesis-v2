
// firebase.config.ts

import { initializeApp } from 'firebase/app';
import { getAuth, Auth, setPersistence, browserLocalPersistence } from 'firebase/auth';

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

// Obtener instancia de Auth
const auth: Auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

// Exporta la instancia de la aplicación Firebase inicializada
export { app, auth };
