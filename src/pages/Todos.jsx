import { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: "do laundry" },
    { id: 2, content: "meal prep" },
    { id: 3, content: "study statistics" },
  ]);

  const [inputTodo, setInputTodo] = useState("");

  const removeTodo = (todo) => {
    setTodos((prev) => prev.filter((x) => x.id != todo.id));
  };

  const addTodo = (e) => {
    e.preventDefault();

    if (inputTodo) {
      const rand = Math.floor(Math.random() * 100);
      setTodos((prev) => [...prev, { id: rand, content: inputTodo }]);
      setInputTodo("");
    }
  };

  const handleInputTodoChange = (e) => setInputTodo(e.target.value);

  return (
    <main className="p-3">
      <h1>Todos</h1>
      <div className="border border-black" style={{ width: "30%" }}>
        <ul className="d-flex flex-column row-gap-3 p-3 m-0">
          {todos.length > 0 ? (
            todos.map((el, ind) => (
              <li key={ind} className="w-100 d-flex justify-content-between">
                <p className="h5 fw-semibold">{el.content}</p>
                <div className="btn-group">
                  <button className="btn btn-info">Update</button>
                  <button className="btn btn-danger" onClick={() => removeTodo(el)}>
                    Delete
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
        <input type="text" className="rounded-2" value={inputTodo} onChange={handleInputTodoChange} />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </main>
  );
};

export default Todos;
