import { useEffect, useState } from "react";
import { AddIcon, SortIcon } from "../assets/icons"
import useTask from "../store/taskStore"
import { error } from "@tauri-apps/plugin-log";
import TaskForm from "../components/Task/TaskForm";
import OverlayLayout from "../components/Layouts/OverlayLayout";
import { getAllTasksRepository } from "../repository/task.repository";

const Tasks = () => {

  const { taskFormView, tasks, toggleTaskFormView, setTasks, selectTask } = useTask();
  const [sort, setSort] = useState<'DESC'|'ASC'>("ASC");

  useEffect(()=>{
    getAllTasksRepository(sort).then(
      (data)=>setTasks(data?data:[])
    ).catch(err=>error("Error Occurred While Fetching Task: "+JSON.stringify(err)));
  }, [sort]);

  return (
    <div className="slide-up p-10 max-sm:p-2">
      <div className="flex gap-2 pb-5">
        
        <OverlayLayout
          view={taskFormView}
          childPositionX="end"
          childPositionY="center"
          openAnimation="overlay-form-show"
          closeAnimation="overlay-form-hide"
          handleClose={toggleTaskFormView}>
          <TaskForm/>
        </OverlayLayout>

        <button
          type="button"
          className="btn"
          onClick={()=>setSort((prev)=>prev=="ASC"?"DESC":"ASC")}
        >
          {SortIcon}
          Sort
        </button>

        <input 
          className="input px-5 flex-1"
          type="text"/>

        <button
          onClick={()=>toggleTaskFormView(true)}
          className="btn max-sm:fixed max-sm:bottom-5 max-sm:right-5">
            {AddIcon}
            Create New Task
        </button>

      </div>

      <ul>
        {
          tasks.map((task, index)=>(
            <li 
            key={index}
            onClick={()=>selectTask(task)}
            className="tag-task-item">
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