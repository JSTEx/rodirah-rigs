// ============================================
// RODIRAH RIGS - FIREBASE CONFIGURATION
// SDK Modular (v9+)
// ============================================

// Importar funciones del SDK modular
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ============================================
// CONFIGURACIÓN DE FIREBASE
// Credenciales reales del proyecto
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyCw18WN75bzfGARgcCO0kSLXUXKUfIRA6Y",
    authDomain: "rodirah-rigs.firebaseapp.com",
    projectId: "rodirah-rigs",
    storageBucket: "rodirah-rigs.firebasestorage.app",
    messagingSenderId: "1063056003767",
    appId: "1:1063056003767:web:80358161904a6137667332",
    measurementId: "G-T2T5EKJ2Z1"
};

// ============================================
// INICIALIZAR FIREBASE
// ============================================
const app = initializeApp(firebaseConfig);

// Exportar instancias
export const db = getFirestore(app);
export const auth = getAuth(app);

// Exportar app por si se necesita
export default app;