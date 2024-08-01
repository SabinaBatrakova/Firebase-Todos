
import {initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { 
        collection,
        doc,
        setDoc,
        getDocs,
        writeBatch,
        serverTimestamp,
        query,
        orderBy,
        updateDoc
     } from "firebase/firestore"; 

const firebaseConfig = { 
  apiKey: "AIzaSyBulIa9Nlm25EcoXmMPjwLiwga4iPY8nG4",
  authDomain: "todo-2a925.firebaseapp.com",
  projectId: "todo-2a925",
  storageBucket: "todo-2a925.appspot.com",
  messagingSenderId: "714340190694",
  appId: "1:714340190694:web:e4423c9e128a9d44d22e27",
  measurementId: "G-WF2WGKWJR9"
};


export function createStorage(key) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

return {
        key, 
        db,
        pull: async function() {
            
          const ref = collection(this.db, this.key)
          const q = query(ref, orderBy("createdAt", 'desc'))
            const querySnapshot = await getDocs(q);
            const todos =  [];

            querySnapshot.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    title: doc.data().title,
                    done: doc.data().done
                })
                
            });

            return todos;
        },

        push: async function(todo) {
            try {
                 await setDoc(doc(this.db, this.key, todo.id), {
                  title: todo.title,
                  done: todo.done,
                  createdAt:serverTimestamp()
                });
                
              } catch (e) {
                console.error("Error adding document: ", e);
              }
           
        },

        delete: async function({todosIds}) {
              const batch = writeBatch(this.db);

              todosIds.forEach((id) => {
                 const ref = doc(this.db, this.key, id)
              batch.delete(ref);
              });
             await batch.commit();
       },
       update:async function(todo) {
        
            const ref = doc(this.db, this.key, todo.id);

              await updateDoc(ref, {
              done: todo.done
});
       }
    }
}