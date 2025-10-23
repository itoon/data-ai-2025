import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyB_X4LcIBDshWj6XABeQOTUOFl4rZGysUI",
    authDomain: "data-ai-day.firebaseapp.com",
    projectId: "data-ai-day",
    storageBucket: "data-ai-day.firebasestorage.app",
    messagingSenderId: "975433419043",
    appId: "1:975433419043:web:cafcb3aeb5833531366496",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  nuxtApp.vueApp.provide("db", db);
  nuxtApp.provide("db", db);
});
