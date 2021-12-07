// version 9 firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import {getAuth} from "firebase/auth";
// import { getDocs } from "@firebase/firestore/dist/lite";
import {getStorage} from "firebase/storage"




const firebaseConfig = {
      apiKey: "AIzaSyABgRiTD0kmsSxhRp6fLtd07XppiZirYhY",
      authDomain: "reactjs-todos-a5657.firebaseapp.com",
      databaseURL: "https://reactjs-todos-a5657-default-rtdb.firebaseio.com",
      projectId: "reactjs-todos-a5657",
      storageBucket: "reactjs-todos-a5657.appspot.com",
      messagingSenderId: "378011793439",
      appId: "1:378011793439:web:af7af07ef3aceb5f5f7d2a"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth=getAuth(app);
// const db =getFirestore(app);
// db.collection('contacts').getDocs()

// const snapshpt = await getDocs()

const db = getFirestore(app);
const storage = getStorage(app);

export  {db, storage}
  