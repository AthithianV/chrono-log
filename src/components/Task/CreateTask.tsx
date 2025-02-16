import { FormEvent, useState } from 'react';
import { CloseIcon } from '../../assets/icons'
import useTask from '../../store/Task'
import Database from '@tauri-apps/plugin-sql';
import { error, info } from '@tauri-apps/plugin-log';

const CreateTask = () => {

    const { toggleCreateTaskView, addTask } = useTask();
    const [data, setData] = useState({
        name: "",
        details: "",
        hourlyRate: 0,
        lumpSum: 0,
        color: "#000000"
    })

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            info("Connecting Database...");
            const db = await Database.load('sqlite:app.db');
            await db.execute(
                "INSERT INTO tasks (name, details, hourly_rate, lump_sum, color) VALUES ($1, $2, $3, $4, $5))",
                [data.name, data.details, data.hourlyRate, data.lumpSum, data.color]
            )
            addTask(data);
            toggleCreateTaskView();            
        } catch (err) {
            error("Error Occured: "+ JSON.stringify(err));
            console.log(err);
        }

    }

  return (
    <div className='h-screen w-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 flex-center'>
        <div className='bg-gray-100 dark:bg-primary-bg-dark rounded-lg p-10 slide-up min-w-[500px]'> 
            
            <div className='flex justify-between text-xl font-semibold pb-8'>
                <h1>Create New Task</h1>
                <button 
                    className='text-red-500'
                    onClick={()=>toggleCreateTaskView()}
                >{CloseIcon}</button>
            </div>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='input-container'>
                    <label className='font-semibold'>Task Name:</label>
                    <input 
                        type='text' 
                        className='input' 
                        onChange={(e)=>setData((prev)=>
                        {
                            prev.name=e.target.value; 
                            return prev;
                        })}/>
                </div>

                <div className='input-container'>
                    <label className='font-semibold'>Details</label>
                    <textarea className='input' onChange={(e)=>setData((prev)=>
                        {
                            prev.details=e.target.value; 
                            return prev;
                        })}></textarea>
                </div>

                <div className='input-container'>
                    <label className='font-semibold'>Hourly Rate</label>
                    <input 
                        type='number' 
                        className='input' 
                        onChange={(e)=>setData((prev)=>
                        {
                            prev.hourlyRate=Number(e.target.value); 
                            return prev;
                        })}/>
                </div>

                
                <div className='input-container'>
                    <label className='font-semibold'>Color</label>
                    <input 
                        type='text' 
                        className='input' 
                        onChange={(e)=>setData((prev)=>
                        {
                            prev.color=e.target.value; 
                            return prev;
                        })}/>
                </div>

                <button className='btn'>
                    Create
                </button>

            </form>

        </div>
    </div>
  )
}

export default CreateTask