// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/storage';
// import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
// import { FIREBASE_CONFIG } from "./constants/firebase";
import "firebase/compat/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDovXHuiIGZqDTTxDexDgeedJgZkCZXc1w",
    authDomain: "airbnb-clone-b4ae8.firebaseapp.com",
    projectId: "airbnb-clone-b4ae8",
    storageBucket: "airbnb-clone-b4ae8.appspot.com",
    messagingSenderId: "27311502353",
    appId: "1:27311502353:web:dee948dd794c289e0eadb0",
    measurementId: "G-NL9W4MN77B"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;

// const firebaseApp=firebase.initializeApp(firebaseConfig)

// const storage=getStorage(firebaseApp)

// export  {firebase as default,storage};