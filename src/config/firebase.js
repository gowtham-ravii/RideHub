import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    databaseURL: '', // Optional if you don't need it
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use getAuth from @react-native-firebase/auth
export const database = getFirestore(app);


export default app;