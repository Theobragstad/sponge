import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDi_TTUkzJAMpF-vDCcPsbwSE-BFispFCs",
  authDomain: "noteapp-e2abe.firebaseapp.com",
  projectId: "noteapp-e2abe",
  storageBucket: "noteapp-e2abe.appspot.com",
  messagingSenderId: "768868778138",
  appId: "1:768868778138:web:7ef7f0ab29aba49aef5f23",
  measurementId: "G-RVWMJG7V96",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
