import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../api/db";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [editingTexts, setEditingTexts] = useState("");

  const removeTodo = async (todo) => {
    try {
      await deleteTodo(todo);
      setTodos(await getAllTodos());
    } catch (error) {
      console.log("errror deleting todo", todo);
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (inputTodo) {
      try {
        await createTodo(inputTodo);
        setTodos(await getAllTodos());
        setInputTodo("");
      } catch (error) {
        console.log("failed to add todo", { todo: inputTodo });
        console.log(error);
      }
    }
  };

  const makeTodoEditable = async (todo) => {
    const updateTodos = todos.map((obj) => {
      if (obj.id == todo.id) {
        return { ...obj, isEditing: true };
      } else {
        return obj;
      }
    });
    setTodos(updateTodos);
    setEditingTexts((prev) => [...prev, todo]);
  };

  const handleEditingTexts = (value, todo) => {
    const changedTodos = editingTexts.map((obj) => {
      if (obj.id == todo.id) {
        return { ...obj, todo: value };
      } else {
        return obj;
      }
    });

    setEditingTexts(changedTodos);
  };

  useEffect(() => {
    async function getTodos() {
      const snapshot = await getAllTodos();
      setTodos(snapshot);
    }
    getTodos();
  }, []);

  console.log(editingTexts);

  return (
    <main className="p-3">
      <h1>Todos</h1>
      <div className="border border-black" style={{ width: "30%" }}>
        <ul className="d-flex flex-column row-gap-3 p-3 m-0">
          {todos.length > 0 ? (
            todos.map((el, ind) => (
              <li key={ind} className="w-100 d-flex justify-content-between">
                {!el.isEditing ? (
                  <p className="h5 fw-semibold">{el.todo}</p>
                ) : (
                  <input
                    type="text"
                    value={editingTexts.filter((obj) => obj.id == el.id)[0].todo}
                    onChange={(e) => handleEditingTexts(e.target.value, el)}
                  />
                )}
                <div className="btn-group">
                  <button className={"btn " + (!el.isEditing ? "btn-info" : "btn-success")} onClick={() => makeTodoEditable(el)}>
                    {!el.isEditing ? "Update" : "Accept"}
                  </button>
                  <button className={"btn " + (!el.isEditing ? "btn-danger" : "btn-secondary")} onClick={() => removeTodo(el)}>
                    {!el.isEditing ? "Delete" : "Back"}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="h5 fw-semibold">No todos! Proud of you 🙌</p>
          )}
        </ul>
      </div>

      <form onSubmit={addTodo} className="d-flex column-gap-3 py-3">
        <input type="text" className="rounded-2" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </main>
  );
};

export default Todos;
