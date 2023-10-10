"use client";
import { createContext, useContext, useState } from "react";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function createTask(task) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function updateTask(id, task) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  }    

  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, createTask, deleteTask, updateTask, selectedTask, setSelectedTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
