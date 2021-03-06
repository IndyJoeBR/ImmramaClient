import firebase from "firebase/app";
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// this code is generated by Firebase and is project specific
const firebaseConfig = {
  apiKey: "AIzaSyDTMHEHRSL_EpyozJXSW6mXdTGuDXsMv5U",
  authDomain: "immramamediastorage.firebaseapp.com",
  projectId: "immramamediastorage",
  storageBucket: "immramamediastorage.appspot.com",
  messagingSenderId: "1037080898069",
  appId: "1:1037080898069:web:6573bcf4f1c7301f46fc1c",
  measurementId: "G-QHX4674DYJ"
};

firebase.initializeApp(firebaseConfig);   // uses data from config (just below import)

// import media storage

const storage = firebase.storage();

export {storage, firebase as default};


// Made with the help of YouTube Video:
//  Uploading Images to Firebase Storage in ReactJS
//    https://www.youtube.com/watch?v=8r1Pb6Ja90o&ab_channel=HongLy
//
// This code should be put in index.js,
//                     inside firebase folder,
//                     inside src folder
// it can then be imported elsewhere