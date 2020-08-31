import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBgAmuT9ESSq89MXJHmrXjtMKKszqfJI8A",
    authDomain: "chatapp-c781f.firebaseapp.com",
    databaseURL: "https://chatapp-c781f.firebaseio.com",
    projectId: "chatapp-c781f",
    storageBucket: "chatapp-c781f.appspot.com",
    messagingSenderId: "674892704825",
    appId: "1:674892704825:web:a38aa71c199244dd32f1e8"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();