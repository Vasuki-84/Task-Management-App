import React, { useState } from "react";

function App() {
// overall datas from API
  const[tasks,setTasks] = useState([]);

  // form is set as object and key form
  // add & changes in task
  const[task,setTask]=useState(
    {
      id: "",
      title:"",
      description: "",
      assignment: "",
      dueDate: "",
      isCompleted: false

    }
  );
  // Handle Input

  const handleChange = (e) => {
    const [name , value ,type,checked] = e.target;
    setTask({ ...task , [name]: type === "checkbox" ? checked : value})
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Task Management App
      </h1>

      <form className="bg-white p-4 rounded shadow-md mx-auto max-w-md">
        <label className="font-semibold mb-2">Task Title</label>
        <input type="text" className="border p-2 mb-2 w-full " />

        <label className="font-semibold mb-2">Task Description</label>
        <textarea name="" className="border p-2 mb-2 w-full "></textarea>

        <label className="font-semibold mb-2">Assigned</label>
        <input type="text" className="border p-2 mb-2 w-full " />

        <label className="font-semibold mb-2">Due Date</label>
        <input type="date" className="border p-2 mb-2 w-full " />

        <label className="block mb-3">
        <input type="checkbox" className="mr-2 " />Completed</label>

        <button className="bg-violet-500 text-white px-4 py-2 rounded  mr-2 w-full">
         { task.id ? "Update task" : "Add task" }
        </button>
      </form>
    </div>
  );
}

export default App;

// http://localhost:5000/tasks
