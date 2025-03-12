import { CloseIcon } from '../../assets/icons'
import { error } from '@tauri-apps/plugin-log';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputContainer from '../form/InputContainer';
import useTag from '../../store/tagsStore';
import { TagSchema } from '../../validation/schemas';
import { addTagRepository, updateTagRepository } from '../../repository/tags.repository';
import ColorPicker from '../form/ColorPicker';

const TagForm = () => {

    const { toggleTagFormView, addTag, tag, updateTag } = useTag();

    const {register, handleSubmit, watch, setValue, formState:{errors}} = useForm(
        {
            defaultValues: {
                name: tag?tag.name:"",
                details: tag?tag.details:null,
                color: tag?tag.color:"#000000"
            },
            resolver: zodResolver(TagSchema)
        }
    );

    const color = watch("color");

    const setColor = (color:string)=>{
        setValue("color", color);
    }

    const onSubmit = async (data:z.infer<typeof TagSchema>)=>{
        try {
            if(tag){
                updateTagRepository({id: tag.id, ...data});
                updateTag({...data, id:tag.id});
            }else{
                const id = await addTagRepository(data);
                if(id)
                    addTag({...data, id});
            }
            toggleTagFormView(false);          
        } catch (err) {
            error("Error Occured: "+ JSON.stringify(err));
        }
    }

  return (
        <div className='overlay-form'> 
            
            <div className='flex justify-between text-xl font-semibold pb-8'>
                <h1>Create New Tag</h1>
                <button 
                    className='text-red-500'
                    onClick={()=>toggleTagFormView(false)}
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
                    <ColorPicker color={color} setColor={setColor}/>                  
                </InputContainer>

                <button className='btn my-4'>
                    {tag?"Update":"Create"}
                </button>

            </form>

        </div>
  )
}

export default TagForm;