import React, { useEffect, useState } from "react";
import axios from "axios";
const API = "http://localhost:5000/tasks";

function App() {
  // overall datas from API
  const [tasks, setTasks] = useState([]);

  // form is set as object and key form
  // add & changes in task
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    assignment: "",
    dueDate: "",
    isCompleted: false,
  });
  // Handle Input

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const clearForm = () => {
    setTask({
      id: "",
      title: "",
      description: "",
      assignment: "",
      dueDate: "",
      isCompleted: false,
    });
  };

  useEffect( () => {
    getTasks();
  } ,[])

  // get method 
const getTasks = () => {
  axios.get(API).then((res) => setTasks(res.data));
}

  //  Add / update function or POST function
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent from page reload

    if (task.id) {
      // update logic
    } else {
      // create task  using rest operator & takes shallow copy
      const newTask = { ...task };
      delete newTask.id; // delete default id to create new id
      axios.post(API, newTask).then(() => {
       getTasks();
        clearForm();
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Task Management App
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md mx-auto max-w-md"
      >
        <label className="font-semibold mb-2">Task Title</label>
        <input
          type="text"
          className="border p-2 mb-2 w-full "
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        <label className="font-semibold mb-2">Task Description</label>
        <textarea
          className="border p-2 mb-2 w-full "
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <label className="font-semibold mb-2">Assigned</label>
        <input
          type="text"
          className="border p-2 mb-2 w-full "
          name="assignment"
          value={task.assignment}
          onChange={handleChange}
        />

        <label className="font-semibold mb-2">Due Date</label>
        <input
          type="date"
          className="border p-2 mb-2 w-full "
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />

        <label className="block mb-3">
          <input
            type="checkbox"
            className="mr-2 "
            name="isCompleted"
            checked={task.isCompleted}
            onChange={handleChange}
          />
          Completed
        </label>

        <button className="bg-violet-500 text-white px-4 py-2 rounded  mr-2 w-full">
          {task.id ? "Update task" : "Add task"}
        </button>
      </form>

      {/* Added tasks in UI */}
      <div>
        {
        tasks.length === 0 ? (
          <p className="text-center text-gray-500 ">No tasks Added</p>
        ) : ( tasks.map(data => (
          <div key={data.id}>
            <div>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <p>{data.assignment} - {data.dueDate}</p>
            </div>
          </div>
        )))
      }
      </div>
    </div>
  );
}

export default App;
