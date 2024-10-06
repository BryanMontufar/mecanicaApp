import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import  ReactNativeAsyncStorage  from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBstgEveLC_DfJwV7GgHRsZY4daOSxtpGA",
  authDomain: "mecanica-c89c0.firebaseapp.com",
  projectId: "mecanica-c89c0",
  storageBucket: "mecanica-c89c0.appspot.com",
  messagingSenderId: "135080523290",
  appId: "1:135080523290:web:9b3d881d25ab8b37cb03a3",
  databaseURL: "https://mecanica-c89c0-default-rtdb.firebaseio.com/"
};



// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime = getDatabase(firebase);