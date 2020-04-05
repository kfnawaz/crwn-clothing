import firebase from 'firebase/app'; 
import 'firebase/firestore';
import 'firebase/auth';


const config ={
    apiKey: "AIzaSyCPIRWvBlPUHPu8RbOWQSyhI2_-MoA2N3w",
    authDomain: "crwn-db-fed1a.firebaseapp.com",
    databaseURL: "https://crwn-db-fed1a.firebaseio.com",
    projectId: "crwn-db-fed1a",
    storageBucket: "crwn-db-fed1a.appspot.com",
    messagingSenderId: "266680520062",
    appId: "1:266680520062:web:fd19ef5a1abaad61b5372f",
    measurementId: "G-RWWW7KHQQC"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; 

    const userRef = firestore.doc(`users/${userAuth.uid}`); 

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } =  userAuth;
      const CreatedAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          CreatedAt, 
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef; 
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); 
provider.setCustomParameters({prompt: ' select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 

