// Initialize Firebase
const config = {
    apiKey: "AIzaSyChS8SWxzsXLv5lBrum5H85n6OzoTAQVdo",
    authDomain: "webmio-ffc0b.firebaseapp.com",
    databaseURL: "https://webmio-ffc0b.firebaseio.com",
    projectId: "webmio-ffc0b",
    storageBucket: "webmio-ffc0b.appspot.com",
    messagingSenderId: "635137472435"
  };
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const leetcodesRef = db.collection("leetcodes");
const leetcodesbarRef = db.collection("leetcodesbar");