

import { initializeApp } from "firebase/app";

/*
const firebaseConfig = { 
  apiKey: "AIzaSyBulIa9Nlm25EcoXmMPjwLiwga4iPY8nG4",
  authDomain: "todo-2a925.firebaseapp.com",
  projectId: "todo-2a925",
  storageBucket: "todo-2a925.appspot.com",
  messagingSenderId: "714340190694",
  appId: "1:714340190694:web:e4423c9e128a9d44d22e27",
  measurementId: "G-WF2WGKWJR9"
};
*/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function add() {
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: "task 3",
          status: "active",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}

 async function get() {
    const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().status}`);
});
}


add();
get();

