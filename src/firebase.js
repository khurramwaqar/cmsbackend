import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db = false;

export const getDb = () => {
    if (!db) {
        const firebaseConfig = {
            apiKey: "AIzaSyCRwqTBMFzkeORuN91mkHL6cbXQrjekygE",
            authDomain: "ary-zap-5b32f.firebaseapp.com",
            databaseURL: "https://ary-zap-5b32f.firebaseio.com",
            projectId: "ary-zap-5b32f",
            storageBucket: "ary-zap-5b32f.appspot.com",
            messagingSenderId: "834097533516",
            appId: "1:834097533516:web:9a055f0fe8c599bcfd9ae9",
            measurementId: "G-NYWMQYX5ZY"
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}