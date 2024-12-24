import { Task } from "@/types/types";
import Link from "next/link";
import TaskList from "@/component/TaskList";

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:3000/api/routes", { // API call for the wanted route function
    method: "GET", // Explicite which method is used
    cache: "no-store", // Garantit que les données ne sont pas mises en cache
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export default async function Home() {
  let tasks: Task[] = [];

  try {
    tasks = await fetchTasks(); // Store data response from database in a usable object
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-bold">Task List</h1>

      {/* Use of TaskList component */}
      <TaskList tasks={tasks} />

      {/* addTask redirecting button */}
      <Link href="/addTask">
        <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-purple-600">
          Add Task
        </button>
      </Link>
    </div>
  );
}
