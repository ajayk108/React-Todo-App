import React, { useState } from "react";
import { format } from 'date-fns';
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');



  const addTask = () =>{
    if(newTask.trim() !== ''){
      const currentDate = new Date();
      setTasks([...tasks, {id:Date.now(), text:newTask, date:currentDate, completed:false}]);
      setNewTask('')
    }
  }
   
  const toggleTaskComplettion = (taskId) =>{
    const updatedTask = tasks.map((task) =>
        task.id === taskId ? {...task, completed : !task.completed} : task
      );
      setTasks(updatedTask);
  }

  const deleteTask = (taskId) =>{
    const updatedTask = tasks.filter((task)=> task.id !== taskId);
    setTasks(updatedTask);

  }

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do App</h1>
        <div className="task-input">
          <input 
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) =>setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) =>(
            <li key={task.id}>
              <div>
                <input 
                type="checkbox"
                checked={task.completed}
                onChange={()=> toggleTaskComplettion(task.id)}
                />
                <span className={task.completed ? 'completed' : '' }>{task.text} </span>
              </div>
              <div>
                <span className="date">{format(task.date, 'd/MM/yyyy')}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
