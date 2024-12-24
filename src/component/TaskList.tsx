"use client";
import { useState } from "react";
import { Task } from "@/types/types";


export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [taskList, setTaskList] = useState(tasks); // State for dynamic update of taskList

  async function deleteTask(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/api/routes?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete task with id ${id}`);
      }
      setTaskList((prev) => prev.filter((task) => task.id !== id)); // Locally update TaskList
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("An error occurred while deleting the task.");
    }
  }

  return (
    <ul>
      {taskList.map((task) => ( // Map used to generate an HTML element for each element of taskList
        <li key={task.id} className="mb-4">
          <h2 className="text-lg font-semibold text-green-600">{task.title}</h2>
          <p>{task.description}</p>
          {/* Clickable to delete */}
          <h2 className="text-lg font-semibold cursor-pointer text-red-600 hover:underline" onClick={() => deleteTask(task.id)}>Delete this task</h2>
        </li>
      ))}
    </ul>
  );
}