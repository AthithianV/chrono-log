import { useEffect, useState } from "react";
import { AddIcon, SortIcon } from "../assets/icons"
import useTask from "../store/Task"
import Database from "@tauri-apps/plugin-sql";
import { error } from "@tauri-apps/plugin-log";
import TaskForm from "../components/Task/TaskForm";

const Tasks = () => {

  const { createTaskview, tasks, toggleCreateTaskView, setTasks, selectTask } = useTask();
  const [sort, setSort] = useState("ASC");

  useEffect(()=>{
    Database.load("sqlite:app.db").then(
      (db)=>{
        db.select(`SELECT * FROM tasks ORDER BY tasks.name ${sort};`).then(data=>{
          setTasks(data as Task[]);
      });
        db.close();
      }
    ).catch(err=>error("Error Occurred While Fetching Task: "+JSON.stringify(err)));
  }, [sort]);

  return (
    <div className="slide-up p-10">
      <div className="flex gap-2 pb-5">
        {createTaskview && <TaskForm/>}
        <button
          type="button"
          className="btn"
          onClick={()=>setSort((prev)=>prev=="ASC"?"DESC":"ASC")}
        >
          {SortIcon}
          Sort
        </button>

        <input 
          className="input px-5"
          type="text"/>

        <button
          onClick={()=>toggleCreateTaskView()}
          className="btn">
            {AddIcon}
            Create New Task
        </button>

      </div>

      <ul>
        {
          tasks.map((task)=>(
            <li 
            onClick={()=>selectTask(task)}
            className="flex items-center font-semibold gap-2 p-2 px-5 my-2 text-lg cursor-pointer hover:bg-gray-200 hover:dark:bg-secondary-bg-dark rounded">
              <span 
                style={{ backgroundColor: task.color?task.color:undefined }}
                className={`border-[1px] border-black h-[20px] w-[20px] rounded-full`}></span>
              <span>{task.name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Tasks