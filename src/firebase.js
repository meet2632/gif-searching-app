import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCu9WpRYFZyV_bcAPtlxHPUAO9qoII_sg",
  authDomain: "fir-auth-bb8a9.firebaseapp.com",
  projectId: "fir-auth-bb8a9",
  storageBucket: "fir-auth-bb8a9.appspot.com",
  messagingSenderId: "163743732770",
  appId: "1:163743732770:web:a6ae1825a7d9c38370a67b",
  measurementId: "G-VY6V8XM68V"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
