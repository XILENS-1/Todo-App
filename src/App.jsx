import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const addTask = () => {
    if (inputTask) {
      setTasks([...tasks, { title: inputTask, completed: false }]);
      setInputTask("");
    }
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, indx) => indx !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <div className="main">
        <h1>Todo App</h1>
        <div className="line"></div>
        <div className="type"> 
          <input className="input1"
            type="text"
            placeholder="Enter your task here..."
            value={inputTask}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button className="addTask" onClick={addTask}>
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <input className="checkbo"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}
              />
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </span>
              <button className="delete" onClick={() => removeTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="w-500px h-500px bg-sky-600"></div>
      </div>
    </div>
  );
}

export default App;
