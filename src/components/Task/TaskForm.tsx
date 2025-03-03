import { error } from '@tauri-apps/plugin-log';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { CloseIcon } from '../../assets/icons'
import useTask from '../../store/taskStore'
import InputContainer from '../form/InputContainer';
import { TaskSchema } from '../../validation/schemas';
import TaskOption from './TaskOption';
import { addTaskRepository, updateTaskRepository } from '../../repository.ts/task.repository';
import ColorPicker from '../form/ColorPicker';

const TaskForm = () => {

    const { toggleTaskFormView, addTask, task, updateTask } = useTask();
    const [payForm, setPayForm] = useState<"hourly_rate"|"lump_sum">("hourly_rate");

    const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm(
        {
            defaultValues: {
                name: task?task.name:"",
                details: task?task.details:null,
                hourly_rate: task?task.hourly_rate:null,
                lump_sum: task?task.lump_sum:null,
                color: task?task.color:"#000000"
            },
            resolver: zodResolver(TaskSchema)
        }
    );
    
    const color = watch("color");

    const setColor = (color:string)=>{
        setValue("color", color);
    }

    const onSubmit = async (data:z.infer<typeof TaskSchema>)=>{
        try {
            if(task){
                updateTaskRepository({id: task.id, ...data});
                updateTask({...data, id:task.id});
            }else{
                const id = await addTaskRepository(data);
                if(id)
                    addTask({...data, id});
            }
            toggleTaskFormView(false);          
        } catch (err) {
            error("Error Occured: "+ JSON.stringify(err));
        }
    }

  return (
        <div className='overlay-form'> 
            
            <div className='flex justify-between text-xl font-semibold pb-8'>
                <h1>Create New Task</h1>
                <button 
                    className='text-red-500'
                    onClick={()=>toggleTaskFormView(false)}
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
                    

                {
                    payForm=="hourly_rate"
                    ?<InputContainer title={'Hourly Rate'} error={errors.hourly_rate?.message}>
                        <input 
                            type='number' 
                            className='input' 
                            {...register("hourly_rate", {valueAsNumber: true})}    
                            />
                    </InputContainer>
                    :<InputContainer title={'Lump Sum'} error={errors.hourly_rate?.message}>
                        <input 
                            type='number' 
                            className='input' 
                            {...register("lump_sum", {valueAsNumber: true})}    
                            />
                    </InputContainer>

                }

                <TaskOption payForm={payForm} setPayForm={setPayForm}/>
                
                    
                <InputContainer title={'Color'} error={errors.color?.message}>
                     <ColorPicker color={color} setColor={setColor}/>
                </InputContainer>

                <button className='btn'>
                    {task?"Update":"Create"}
                </button>

            </form>

        </div>
  )
}

export default TaskForm;