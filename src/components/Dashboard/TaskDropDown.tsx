import { useEffect, useRef, useState } from "react";
import useTask from "../../store/taskStore"
import { DownArrowIcon, UpArrowIcon } from "../../assets/icons";
import { UseFormSetValue } from "react-hook-form";

type PropType = {
  setValue: UseFormSetValue<
    { task: number; 
      description: string | null; 
      details: string | null; 
      date: Date; 
      start_time: Date; 
      end_time: Date | null; 
      duration: number; 
    }>
}

const TaskDropDown = ({setValue}:PropType) => {

  const {tasks} = useTask();
  const [task, setTask] = useState<Task|null>(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement|null>(null);

  useEffect(()=>{
  
      const handleClick = (e:MouseEvent)=>{
        if(
          dropdownRef.current
          && !dropdownRef.current.contains(e.target as Node)
        ){
          setDropdown(false);
        }
      } 
  
      document.addEventListener("mousedown", handleClick);
  
      return ()=>{
        document.removeEventListener("mousedown", handleClick);
      }
  
    }, []);

  const selectTask = (task:Task)=>{
    setTask(task);
    setValue("task", task.id);
    setDropdown(false);
  }

  return (
    <div className="relative">
        <div className="input cursor-pointer flex justify-between items-center" onClick={()=>setDropdown(true)}>
          <div>
            {
              task
              ?<div
                className="flex items-center gap-2"
              >
                <span 
                  className="p-[5px] rounded-full border-[1px] border-black"
                  style={{backgroundColor: task.color?task.color:undefined}}></span>
                <span>{task.name}</span>
              </div>
              :<span className="text-gray-500">Select Task</span>
            }
          </div>
          {dropdown?UpArrowIcon:DownArrowIcon}
        </div>
        {dropdown && <ul ref={dropdownRef} className="drop-down drop-down-animation top-8 w-full max-h-[200px]">
        {
          tasks.map((task,index)=>(
            <li 
              key={index} 
              value={task.id} 
              className="flex items-center gap-2 hover:bg-slate-200 p-2 cursor-pointer"
              onClick={()=>selectTask(task)}
            >
              <span 
                className="p-[5px] rounded-full border-[1px] border-black"
                style={{backgroundColor: task.color?task.color:undefined}}></span>
              <span>{task.name}</span>
            </li>
          ))
        }
        </ul>}
    </div>
  )
}

export default TaskDropDown;