'use client'
import TaskForm from "@/components/TaskForm";
import { useEffect } from "react";
import {useTasks} from '@/context/TaskContext'
import TaskCard from "@/components/TaskCard";

  function Home() {
  const {tasks, loadTasks} = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-center text-2xl font-bold">Task Form</h1>
        <TaskForm />

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
