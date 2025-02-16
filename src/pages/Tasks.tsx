import { AddIcon, SortIcon } from "../assets/icons"
import CreateTask from "../components/Task/CreateTask"
import useTask from "../store/Task"

const Tasks = () => {

  const { createTaskview, tasks, toggleCreateTaskView } = useTask();

  return (
    <div className="slide-up p-10">
      <div className="flex gap-2 pb-5">
        {createTaskview && <CreateTask/>}
        <button
          type="button"
          className="px-5 flex-center gap-2 bg-primary-bg-light hover:bg-secondary-bg-light border rounded text-black font-semibold"
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
            <li className="flex items-center font-semibold gap-2 p-2 px-5 my-2 text-lg cursor-pointer hover:bg-gray-200 hover:dark:bg-secondary-bg-dark rounded">
              <span className={`bg-[${task.color}] h-[15px] w-[15px] rounded-full`}></span>
              <span>{task.name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Tasks