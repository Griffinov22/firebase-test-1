import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

// todos model {todo: string, id: string}

export async function getAllTodos() {
  const todosCol = collection(db, "todos");
  const todosSnapshot = await getDocs(todosCol);
  const todos = todosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return todos;
}

export async function deleteTodo(todo) {
  await deleteDoc(doc(db, "todos", todo.id));
}

export async function createTodo(todo) {
  //adds a document {todo: string} with auto generated id by firestore
  await addDoc(collection(db, "todos"), { todo });
}

export async function updateTodo(todo) {
  await updateDoc(doc(db, "todos", todo.id), todo);
}
