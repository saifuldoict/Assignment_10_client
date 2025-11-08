
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIMIkvZVrgtakIFPakLNvJ_j_ETrjyPVo",
  authDomain: "moviemasterpro-400fc.firebaseapp.com",
  projectId: "moviemasterpro-400fc",
  storageBucket: "moviemasterpro-400fc.firebasestorage.app",
  messagingSenderId: "111273445155",
  appId: "1:111273445155:web:f688e807fc1527b60dee96"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);