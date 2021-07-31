
import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD2bQaO2kQYx5P1_M5AgfNJ4PpU521HAQ0",
    authDomain: "weatherapp-314be.firebaseapp.com",
    projectId: "weatherapp-314be",
    storageBucket: "weatherapp-314be.appspot.com",
    messagingSenderId: "672192273983",
    appId: "1:672192273983:web:f74a6207076ee8ee9da28a"
  };
  // Initialize Firebase
const  firebaseApp= firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();