import { useTasks } from "@/context/TaskContext";

function TaskCard({ task }) {

  const {deleteTask, setSelectedTask } = useTasks();

  return (
    <div key={task.id} className=" backdrop-blur-lg bg-white/10 p-4 my-2 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.content}</p>
        <div className="flex gap-x-2">
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button
            onClick={() => {
              setSelectedTask(task);
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
