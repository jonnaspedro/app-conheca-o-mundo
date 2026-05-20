import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyAABoVAufUq_EKzQADunduZMf85J4XxNMs",
  authDomain: "app-conheca-o-mundo.firebaseapp.com",
  projectId: "app-conheca-o-mundo",
  storageBucket: "app-conheca-o-mundo.firebasestorage.app",
  messagingSenderId: "741942747416",
  appId: "1:741942747416:web:a5f7b7078db026816abe6d"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);