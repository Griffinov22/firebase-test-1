import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../api/db";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");

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
  };

  const handleEditingTexts = async (event, changedTodo) => {
    event.preventDefault();
    const value = event.target["todo"].value;

    // removing 'isEditing' from reaching the backend
    const { isEditing, ...todo } = changedTodo;

    try {
      await updateTodo({ ...todo, todo: value });
      setTodos(await getAllTodos());
    } catch (err) {
      console.log("error trying to update todo: ", { ...changedTodo, todo: value });
      console.log(err);
    }
  };

  const removeTodoEditability = (todo) => {
    const changedTodos = todos.map((obj) => {
      if (obj.id == todo.id) {
        return { ...obj, isEditing: false };
      } else {
        return obj;
      }
    });
    setTodos(changedTodos);
  };

  useEffect(() => {
    async function getTodos() {
      const snapshot = await getAllTodos();
      setTodos(snapshot);
    }
    getTodos();
  }, []);

  return (
    <main className="p-3">
      <h1>Todos</h1>
      <div className="border border-black" style={{ width: "30%" }}>
        <ul className="d-flex flex-column row-gap-3 p-3 m-0 list-unstyled">
          {todos.length > 0 ? (
            todos.map((el, ind) => (
              <li key={ind} className={"w-100 " + (!el.isEditing ? " d-flex justify-content-between" : "")}>
                {!el.isEditing ? (
                  <>
                    <p className="h5 fw-semibold">{el.todo}</p>
                    <div className="btn-group">
                      <button className={"btn btn-info"} onClick={() => makeTodoEditable(el)}>
                        Update
                      </button>
                      <button className={"btn btn-danger"} onClick={() => removeTodo(el)}>
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <form className="d-flex justify-content-between" onSubmit={(e) => handleEditingTexts(e, el)}>
                    <input
                      name="todo"
                      type="text"
                      defaultValue={todos.filter((obj) => obj.id == el.id)[0].todo}
                      // onChange={(e) => handleEditingTexts(e.target.value, el)}
                    />
                    <div className="btn-group">
                      <button className={"btn btn-success"} type="submit">
                        Accept
                      </button>
                      <button className={"btn btn-secondary"} onClick={() => removeTodoEditability(el)}>
                        Back
                      </button>
                    </div>
                  </form>
                )}
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
