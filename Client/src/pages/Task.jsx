import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../Redux/features/AuthSlice";

function Task() {
  const token = useSelector((store) => store.auth.token);
  console.log(token);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/task", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setTasks(response.data.tasks);

      // setTasks
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="overflow-x-auto mt-10">
      <table className="mx-auto  bg-white border border-green-300 rounded-lg shadow-lg">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Task</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b hover:bg-green-100">
              <td className="py-2 px-4">{task.task}</td>
              <td className="py-2 px-4">{task.category}</td>
              <td className="py-2 px-4">{task.status}</td>
              <td className="py-2 px-4">
                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded mr-2">
                  Update
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Task;
