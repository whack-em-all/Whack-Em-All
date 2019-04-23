import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBFbJiRGH1KO9wUXACk1Ue1vH-gtbfll4I',
  authDomain: 'whack-em-all.firebaseapp.com',
  databaseURL: 'https://whack-em-all.firebaseio.com',
  projectId: 'whack-em-all',
  storageBucket: 'whack-em-all.appspot.com',
  messagingSenderId: '844310209802',
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
