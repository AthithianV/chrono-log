import { CloseIcon } from '../../assets/icons'
import Database from '@tauri-apps/plugin-sql';
import { error } from '@tauri-apps/plugin-log';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputContainer from '../form/InputContainer';
import useTag from '../../store/tags';
import { TagSchema } from '../../validation/schemas';

const TagForm = () => {

    const { toggleTagFormView, addTag, tag, updateTag } = useTag();

    const {register, handleSubmit, formState:{errors}} = useForm(
        {
            defaultValues: {
                name: tag?tag.name:"",
                details: tag?tag.details:null,
                color: tag?tag.color:null
            },
            resolver: zodResolver(TagSchema)
        }
    );

    const onSubmit = async (data:z.infer<typeof TagSchema>)=>{
        try {
            const db = await Database.load('sqlite:app.db');
            if(tag){
                await db.execute(
                    "UPDATE tags SET name=$1, details=$2, color=$3 WHERE id = $4",
                    [data.name, data.details, data.color, tag.id]
                )
                updateTag({...data, id:tag.id} as Tag);
            }else{
                await db.execute(
                    "INSERT INTO tags (name, details, color) VALUES ($1, $2, $3)",
                    [data.name, data.details, data.color]
                );
                addTag(data as Tag);
            }
            db.close();
            toggleTagFormView();          
        } catch (err) {
            error("Error Occured: "+ JSON.stringify(err));
        }
    }

  return (
    <div className='h-screen w-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 flex-center'>
        <div className='bg-gray-100 dark:bg-primary-bg-dark rounded-lg p-10 slide-up min-w-[500px]'> 
            
            <div className='flex justify-between text-xl font-semibold pb-8'>
                <h1>Create New Tag</h1>
                <button 
                    className='text-red-500'
                    onClick={()=>toggleTagFormView()}
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
                    
                <InputContainer title={'Color'} error={errors.color?.message}>
                     <input 
                        type='text' 
                        className='input' 
                        {...register("color")}    
                        />
                </InputContainer>

                <button className='btn'>
                    {tag?"Update":"Create"}
                </button>

            </form>

        </div>
    </div>
  )
}

export default TagForm;