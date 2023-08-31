
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHI3xOgW58ADfoYKw8yCtfD2dqcfFkTIc",
  authDomain: "crudapp-17323.firebaseapp.com",
  projectId: "crudapp-17323",
  storageBucket: "crudapp-17323.appspot.com",
  messagingSenderId: "481350508119",
  appId: "1:481350508119:web:bced5e04045d9b6c0c8d12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const itemsCollection = collection(db, "items")

export {
    db, itemsCollection
}