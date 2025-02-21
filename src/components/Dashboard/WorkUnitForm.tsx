import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { WorkUnitSchema } from "../../validation/schemas";
import InputContainer from "../form/InputContainer";
import WorkUnitFormControls from "./WorkUnitFormControls";
import TimeElement from "../form/TimeElement";
import useWorkUnit from "../../store/workUnitStore";
import { TagIcon } from "../../assets/icons";
import TaskDropDown from "./TaskDropDown";
import { error } from "@tauri-apps/plugin-log";
import { getToday } from "../../utils/dateTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkUnitForm = () => {
  
  const {selectedTags, removeTag, addWorkUnit} = useWorkUnit();
  const {register, getValues, setValue, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(WorkUnitSchema),
    defaultValues: {
        date: getToday()
    }
  });

  const resetForm = ()=>{
    reset();
    setValue("date", getToday());
  }

  const onSubmit = (data:z.infer<typeof WorkUnitSchema>)=>{
    console.log({data, tags: selectedTags});
    try {
        const tags = selectedTags.map(tag=>tag.id);
        addWorkUnit({...data, tags, id: 1});        
    } catch (err) {
        error(JSON.stringify(err));
    }finally{
        resetForm();
    }
  }


  
  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full animate__slideInRight p-4 max-sm:bg-primary-bg-light max-sm:dark:bg-primary-bg-dark max-sm:rounded-t-xl">

        <WorkUnitFormControls/>
        
        <InputContainer title={"Description"} error={errors.description?.message}>
            <input className="input" type="text" {...register("description")}/>
        </InputContainer>   

        <InputContainer title={"Details"} error={errors.description?.message}>
            <textarea className="input h-[100px]" {...register("details")}></textarea>
        </InputContainer>    

        <InputContainer title={"Task"} error={errors.task?.message}>
            <TaskDropDown setValue={setValue}/>
        </InputContainer>

        <InputContainer title={"Date"} error={errors.date?.message}>
            {/* <input 
                className="input"
                type="date"
                value={}
                {...register("date")}
            /> */}
            <DatePicker
                selected={getValues("date")}
                onChange={(date)=>setValue("date", date?date:new Date())}
                onSelect={(date)=>setValue("date", date?date:new Date())}
                showIcon
                toggleCalendarOnIconClick
                customInput={<input className="input w-full"/>}
                dateFormat={"dd-MM-yyyy"}
            />
        </InputContainer>

        <TimeElement
            setValue={setValue} 
            name={"start_time"}
            date={new Date(getValues("date"))}
            error={errors.start_time?.message}
            title={"Start Time"}
            value={getValues("start_time")}
        />

        <TimeElement 
            setValue={setValue} 
            name={"end_time"}
            date={new Date(getValues("date"))}
            error={errors.end_time?.message}
            title={"End Time"}
            value={getValues("end_time")}
        />

        <InputContainer title={"Duration"} error={errors.duration?.message}>
            <input className="input" type="text" {...register("duration")} placeholder="hh:mm:ss"/>
        </InputContainer>

        <div className="flex flex-wrap max-h-[100px] overflow-auto p-1">
            {
                selectedTags.map((tag, index)=>(
                    <li 
                      key={index}
                      className="py-1 px-1 m-[0.5px] text-xs font-semibold rounded-sm flex-center gap-1 cursor-pointer hover-shadow"
                      style={{backgroundColor: tag.color?tag.color:undefined}}
                      onClick={()=>removeTag(tag.id)}
                    >
                        {TagIcon}
                        <span>{tag.name}</span>
                    </li>
                ))
            }
        </div>

    </form>
  )
}

export default WorkUnitForm;