import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCOKPbsXuBo3z1wLSLyVsKbnTwjMdGzBBc",
  authDomain: "travel-auth-9840b.firebaseapp.com",
  projectId: "travel-auth-9840b",
  storageBucket:"travel-auth-9840b.appspot.com",
  messagingSenderId: "120157072835",
  appId: "1:120157072835:web:2bd83b7e31226e1fa62176"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app, onAuthStateChanged };

