import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6KefpE1rYiTng7PSP9afpVtc2CBp5WcY",
  authDomain: "reactjs-firebase-b4c88.firebaseapp.com",
  projectId: "reactjs-firebase-b4c88",
  storageBucket: "reactjs-firebase-b4c88.appspot.com",
  messagingSenderId: "884929087763",
  appId: "1:884929087763:web:1bea1a3e7de883978072e6",
  measurementId: "G-DH2G95G2PZ",
  databaseURL:
    "https://reactjs-firebase-b4c88-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const database = firebase.database();
export default firebase;
