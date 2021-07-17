import firebase from 'firebase/app';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBEe1bI1Fv0cv6rEG-pe38lI3aSVQdpfWM",
    authDomain: "constructionmanagementsy-6e63e.firebaseapp.com",
    projectId: "constructionmanagementsy-6e63e",
    storageBucket: "constructionmanagementsy-6e63e.appspot.com",
    messagingSenderId: "160740400053",
    appId: "1:160740400053:web:2efae09ba2600d231e97fc",
    measurementId: "G-6LQ10SW02P"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;