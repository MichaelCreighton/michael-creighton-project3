// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// initialize firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBT4xqBKiGn4r36IFuCRSMbI34AzpxX-BU",
    authDomain: "mc-project3-79a0d.firebaseapp.com",
    projectId: "mc-project3-79a0d",
    storageBucket: "mc-project3-79a0d.appspot.com",
    messagingSenderId: "438503187418",
    appId: "1:438503187418:web:adef6d9e02412878b0d6e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // export the configured version of firebase
  export default firebase;
  