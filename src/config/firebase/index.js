import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA6KefpE1rYiTng7PSP9afpVtc2CBp5WcY",
  authDomain: "reactjs-firebase-b4c88.firebaseapp.com",
  projectId: "reactjs-firebase-b4c88",
  storageBucket: "reactjs-firebase-b4c88.appspot.com",
  messagingSenderId: "884929087763",
  appId: "1:884929087763:web:1bea1a3e7de883978072e6",
  measurementId: "G-DH2G95G2PZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
