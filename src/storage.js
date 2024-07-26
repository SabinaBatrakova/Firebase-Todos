
import {initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";

import { collection,
        doc,
        addDoc,
        getDocs } from "firebase/firestore"; 

const firebaseConfig = { 
  apiKey: "AIzaSyBulIa9Nlm25EcoXmMPjwLiwga4iPY8nG4",
  authDomain: "todo-2a925.firebaseapp.com",
  projectId: "todo-2a925",
  storageBucket: "todo-2a925.appspot.com",
  messagingSenderId: "714340190694",
  appId: "1:714340190694:web:e4423c9e128a9d44d22e27",
  measurementId: "G-WF2WGKWJR9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export function createStorage(key) {
    return {
        key, 
        db,
        pull: async function() {

            const todosFirebase = await getDocs(collection(this.db, this.key));
            const todos =  [];

            todosFirebase.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    title: doc.data().title
                })
                
            });

            return todos;
        },

        push: async function(todo) {
            try {
                const docRef = await addDoc(collection(this.db, this.key), {
                  title: todo.title,
                  status: todo.status,
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
           
        }

    }
}