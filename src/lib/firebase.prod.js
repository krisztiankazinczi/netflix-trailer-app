import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB30KnHMR6t7XUNhraCuPRYOIRqHU_EJVY",
  authDomain: "netflix-clone-abe37.firebaseapp.com",
  databaseURL: "https://netflix-clone-abe37.firebaseio.com",
  projectId: "netflix-clone-abe37",
  storageBucket: "netflix-clone-abe37.appspot.com",
  messagingSenderId: "626535057873",
  appId: "1:626535057873:web:461c0cb734ccf581b078f0",
  measurementId: "G-CR5KZRLL3G",
};

const firebase = Firebase.initializeApp(config);

export { firebase, Firebase };
