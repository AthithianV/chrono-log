import { CloseIcon } from '../../assets/icons'
import useTask from '../../store/Task'
import Database from '@tauri-apps/plugin-sql';
import { error } from '@tauri-apps/plugin-log';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema } from '../../validation/taskSchema';
import { z } from 'zod';
import InputContainer from '../form/InputContainer';

const TaskForm = () => {

    const { toggleCreateTaskView, addTask, task, updateTask } = useTask();

    const {register, handleSubmit, formState:{errors}} = useForm(
        {
            defaultValues: {
                name: task?task.name:"",
                details: task?task.details:null,
                hourly_rate: task?task.hourly_rate:null,
                lump_sum: task?task.lump_sum:null,
                color: task?task.color:null
            },
            resolver: zodResolver(TaskSchema)
        }
    );

    const onSubmit = async (data:z.infer<typeof TaskSchema>)=>{
        try {
            const db = await Database.load('sqlite:app.db');
            if(task){
                await db.execute(
                    "UPDATE tasks SET name=$1, details=$2, hourly_rate=$3, lump_sum=$4, color=$5 WHERE id = $6",
                    [data.name, data.details, data.hourly_rate, data.lump_sum, data.color, task.id]
                )
                updateTask({...data, id:task.id} as Task);
            }else{
                await db.execute(
                    "INSERT INTO tasks (name, details, hourly_rate, lump_sum, color) VALUES ($1, $2, $3, $4, $5)",
                    [data.name, data.details, data.hourly_rate, data.lump_sum, data.color]
                );
                addTask(data as Task);
            }
            db.close();
            toggleCreateTaskView();          
        } catch (err) {
            error("Error Occured: "+ JSON.stringify(err));
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

            <form onSubmit={handleSubmit(onSubmit)}>
                
                <InputContainer title={'Name'} error={errors.name?.message}>
                    <input 
                        type='text' 
                        className='input' 
                        {...register("name")}    
                    />
                </InputContainer>

                <InputContainer title={'Details'} error={errors.details?.message}>
                    <textarea 
                        className='input'
                        {...register("details")}    
                        ></textarea>
                </InputContainer>
                    

                <InputContainer title={'Hourly Rate'} error={errors.hourly_rate?.message}>
                    <input 
                        type='number' 
                        className='input' 
                        {...register("hourly_rate", {valueAsNumber: true})}    
                        />
                </InputContainer>

                <InputContainer title={'Lump Sum'} error={errors.hourly_rate?.message}>
                    <input 
                        type='number' 
                        className='input' 
                        {...register("lump_sum", {valueAsNumber: true})}    
                        />
                </InputContainer>
                    
                <InputContainer title={'Color'} error={errors.color?.message}>
                     <input 
                        type='text' 
                        className='input' 
                        {...register("color")}    
                        />
                </InputContainer>

                <button className='btn'>
                    {task?"Update":"Create"}
                </button>

            </form>

        </div>
    </div>
  )
}

export default TaskForm;