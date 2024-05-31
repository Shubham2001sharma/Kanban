// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import SideNavbar from "./SideNavbar";

function Todo() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  
  }, []);
  

  // Update local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    setShowForm(true);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: isEditing ? currentTask.id : Date.now(),
      title: e.target.taskTitle.value,
      description: e.target.taskDescription.value,
      dueDate: e.target.dueDate.value,
    };
    if (isEditing) {
      setTasks(tasks.map((task) => (task.id === currentTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleDelete = (taskId) => {
    // Remove the task from the tasks state
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  
    // Update the local storage with the updated tasks
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  
  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setCurrentTask(taskToEdit);
    setShowForm(true);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-gray-300 pb-2">
          TODO APP
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to the TODO app. Start adding your tasks!
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={createTask}
          >
            CREATE TASKS
          </button>
          {showForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Add Task</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      id="taskTitle"
                      name="taskTitle"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      defaultValue={isEditing ? currentTask.title : ""}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2">
                      Task Description
                    </label>
                    <textarea
                      id="taskDescription"
                      name="taskDescription"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      defaultValue={isEditing ? currentTask.description : ""}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      defaultValue={isEditing ? currentTask.dueDate : ""}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                      onClick={() => {
                        setShowForm(false);
                        setIsEditing(false);
                        setCurrentTask(null);
                    }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      {isEditing ? "Update Task" : "Add Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
       <div className="mt-8">
  {tasks.length === 0 ? (
    <p className="text-lg text-gray-700">No tasks available.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task.id} className="border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Title</h3>
          <p className="text-gray-700 mb-2" style={{ backgroundColor: '#f4f4f4', padding: '5px 10px', borderRadius: '5px', wordWrap: 'break-word', maxWidth: '50ch', overflow: 'hidden' }}>{task.title}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-700 mb-4" style={{ backgroundColor: '#f4f4f4', padding: '5px 10px', borderRadius: '5px', wordWrap: 'break-word', maxWidth: '50ch', overflow: 'hidden' }}>{task.description}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Date</h3>
          <p className="text-gray-600" style={{ backgroundColor: '#f4f4f4', padding: '5px 10px', borderRadius: '5px', wordWrap: 'break-word', maxWidth: '50ch', overflow: 'hidden' }}>{task.dueDate}</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleEdit(task.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>



          
        </div>
      </div>
    </div>
  );
}

export default Todo;
