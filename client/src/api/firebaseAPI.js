import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyArZTKaWMyH8KAHXgj0S2bgzjDLDA3sz_4",
  authDomain: "whack-em-all-965fe.firebaseapp.com",
  databaseURL: "https://whack-em-all-965fe.firebaseio.com",
  projectId: "whack-em-all-965fe",
  storageBucket: "whack-em-all-965fe.appspot.com",
  messagingSenderId: "645694622560"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
