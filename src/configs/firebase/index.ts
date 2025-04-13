import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCEeS62LQTc3SDcyXiDyxS252waTZYTDeE",
    authDomain: "nexus-8e69e.firebaseapp.com",
    projectId: "nexus-8e69e",
    storageBucket: "nexus-8e69e.firebasestorage.app",
    messagingSenderId: "312923330934",
    appId: "1:312923330934:web:d6847bfd13e566869f0257"
  }

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export {
    firebaseApp,
    db
}