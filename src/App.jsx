import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [open, setOpen] = useState(false);
  const [changeTask, setChangeTask] = useState('');
  const [id, setId] = useState(null);

  const handleNewTask = () => {
    const isTask = todos.find((t) => t.value === task);

    if (!isTask && task) {
      const newTask = {
        value: task,
        id: new Date().getTime(),
        checked: false,
      };

      setTodos((prev) => [...prev, newTask]);
      setTask('');
    }
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((t) => t.id !== id);
    setTodos(newArray);
    setOpen(false);
  };

  const handleChangeTask = () => {
    const replaceTask = todos.find((t) => t.id === id);

    replaceTask.value = changeTask;
    const newArray = todos.filter((t) => t.id !== id);
    setTodos([...newArray, replaceTask]);
    setChangeTask('');
    setOpen(false);
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, checked: !t.checked } : t,
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container p-5">
      <nav>
        <div className="input-group mb-5">
          <input
            type="text"
            className="form-control p-3"
            placeholder="To Do"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleNewTask}>
            Dodaj zadanie
          </button>
        </div>
        {open && (
          <div className="input-group mb-5">
            <input
              type="text"
              className="form-control p-3"
              placeholder="Edit"
              value={changeTask}
              onChange={(e) => setChangeTask(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleChangeTask}>
              zapisz
            </button>
          </div>
        )}
      </nav>

      <main>
        {todos.length > 0 && !todos.every((task) => task.checked) && (
          <h2>To Do</h2>
        )}
        {todos
          .filter((task) => !task.checked)
          .map((task) => (
            <div
              className="card mb-3 d-flex flex-row justify-content-between align-items-center p-2"
              key={task.id}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={task.checked}
                  onChange={() => handleToggle(task.id)}
                />
                <p className="mb-0 ms-3 fs-5">{task.value}</p>
              </div>
              <div className="align-items-center justify-content-between">
                <button
                  className="btn btn-outline-danger px-4 mx-1"
                  onClick={() => handleDelete(task.id)}
                >
                  ❌
                </button>
                <button
                  className="btn btn-outline-warning px-4 mx-1"
                  onClick={() => {
                    setOpen(!open);
                    setChangeTask(task.value);
                    setId(task.id);
                  }}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        {todos.some((task) => task.checked) && <h2>Complete</h2>}
        {todos
          .filter((task) => task.checked)
          .map((task) => (
            <div
              className="card mb-3 d-flex flex-row justify-content-between align-items-center p-2"
              key={task.id}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={task.checked}
                  onChange={() => handleToggle(task.id)}
                />
                <p className="mb-0 ms-3 text-decoration-line-through text-secondary fs-5">
                  {task.value}
                </p>
              </div>
              <div className="align-items-center justify-content-between">
                <button
                  className="btn btn-outline-secondary px-4 mx-1"
                  onClick={() => handleDelete(task.id)}
                >
                  ✖️
                </button>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
