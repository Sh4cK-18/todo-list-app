"use client";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { createTask, updateTask, selectedTask, setSelectedTask } = useTasks();
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setContent(selectedTask.content);
    }
  }, [selectedTask]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedTask) {
          await updateTask(selectedTask.id, { title, content });
          setSelectedTask(null);
        } else {
          await createTask({ title, content });
          setTitle("");
          setContent("");
        }
      }}
    >
      <input
        type="text"
        name="=title"
        placeholder="Write a Title"
        autoFocus
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <textarea
        name="=title"
        placeholder="Write a Description"
        autoFocus
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex justify-end gap-x-2">
        <button
          type="submit"
          className="px-5 py-2 text-white bg-sky-600 rounded-md hover:bg-blue-700"
        >
          {selectedTask ? "Update" : "Create"}
        </button>
       
       {selectedTask && (
         <button
         type="button"
         onClick={() => {
          setSelectedTask(null);
           setTitle("");
           setContent("");
         }}
         className="px-5 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
       >
         Cancel
       </button>
       )}
      </div>
    </form>
  );
}
