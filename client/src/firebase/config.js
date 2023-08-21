// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6YQGpa-rzgCLibEVOLT2ABdL21ZWQNas",
  authDomain: "travel-61afc.firebaseapp.com",
  projectId: "travel-61afc",
  storageBucket: "travel-61afc.appspot.com",
  messagingSenderId: "747424977895",
  appId: "1:747424977895:web:e9e29bacd05e4c46a52342"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const storage = getStorage();
//export { app, storage }

//export default storage;