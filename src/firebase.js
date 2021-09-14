// import firebase from 'firebase';
// import firebase from "firebase/app"
// import firebase from "firebase/app";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCMSrNBwOgWiO5AZUMp1PZNh7i2Ztl64Ls',
    authDomain: 'fir-auth-article-f041f.firebaseapp.com',
    projectId: 'fir-auth-article-f041f',
    storageBucket: 'fir-auth-article-f041f.appspot.com',
    messagingSenderId: '281297007690',
    appId: '1:281297007690:web:71167bd33007448ec3a2b3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// const db = app.firestore();

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
/*

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
            .collection('users')
            .where('uid', '==', user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection('users').add({
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection('users').add({
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};
*/
export { auth, signInWithGoogle, signInWithEmailAndPassword };
