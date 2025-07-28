import { initializeApp } from "firebase/app";

export function getFirebaseApp() {
  return initializeApp({
    apiKey: "AIzaSyCEOvUFztpXwXN2qCPqp0zTI43rw9iO7eI",
    authDomain: "todo-daily-d50dd.firebaseapp.com",
    projectId: "todo-daily-d50dd",
    storageBucket: "todo-daily-d50dd.firebasestorage.app",
    messagingSenderId: "869057620740",
    appId: "1:869057620740:web:268806b0e9d7fe3965be51",
  });
}
