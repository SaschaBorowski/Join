// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBoinWgOAD9WSFtxZaXfYUykBACiOJZrFA",
    authDomain: "join-248.firebaseapp.com",
    databaseURL: "https://join-248-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "join-248",
    storageBucket: "join-248.appspot.com",
    messagingSenderId: "445883205311",
    appId: "1:445883205311:web:05c44f8f9c54367199e80a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const db = getDatabase();

let signUpName = document.getElementById('signUpName');
let signUpEmail = document.getElementById('signUpEmail');
let signUpPassword = document.getElementById('signUpPassword');
let signUpPasswordCheck = document.getElementById('signUpPasswordCheck');
let signUpButton = document.getElementById('signUpButton');

function AddData() {
    set(red(db, 'Users/'), {
        nameOfEmployee: {Name: signUpName.value, Email: signUpEmail.value, Password: signUpPassword.value}
    }).then(()=>{
        alert("Registrierung abgeschlossen");
    })
}