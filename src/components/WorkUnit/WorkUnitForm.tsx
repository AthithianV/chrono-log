import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { WorkUnitSchema } from "../../validation/schemas";
import InputContainer from "../form/InputContainer";
import WorkUnitFormControls from "./WorkUnitFormControls";
import TimeElement from "../form/TimeElement";
import useWorkUnit from "../../store/workUnitStore";
import TaskDropDown from "../Dashboard/TaskDropDown";
import { error } from "@tauri-apps/plugin-log";
import { getToday } from "../../utils/dateTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TagItem from "../Tag/TagItem";
import useTask from "../../store/taskStore";

const WorkUnitForm = () => {
  
  const {selectedTags, selectedUnit, removeTag, addWorkUnit} = useWorkUnit();
  const {tasks} = useTask();
  const {register, getValues, setValue, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: zodResolver(WorkUnitSchema),
    defaultValues: {
        description: selectedUnit?selectedUnit.description:null,
        details: selectedUnit?selectedUnit.details:null,
        date: selectedUnit?selectedUnit.date:getToday(),
        start_time: selectedUnit?selectedUnit.start_time:undefined,
        end_time: selectedUnit?selectedUnit.end_time:null,
        task: selectedUnit?selectedUnit.task.id:undefined,
    }
  });

  const resetForm = ()=>{
    reset();
    setValue("date", getToday());
  }

  const onSubmit = (data:z.infer<typeof WorkUnitSchema>)=>{
    console.log({data, tags: selectedTags});
    try {
        const tagIds = selectedTags.map(tag=>tag.id);
        const task = tasks.find(t=>t.id===data.task);
        if(task){
            addWorkUnit({...data, task, tags: selectedTags, id: 1});
        }
    } catch (err) {
        error(JSON.stringify(err));
    }finally{
        resetForm();
    }
  }


  
  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className={`overlay-form`}>

        <WorkUnitFormControls/>
        
        <InputContainer title={"Description"} error={errors.description?.message}>
            <input className="input" type="text" {...register("description")}/>
        </InputContainer>   

        <InputContainer title={"Details"} error={errors.description?.message}>
            <textarea className="h-[90px] py-1 px-2 input" {...register("details")}></textarea>
        </InputContainer>    

        <InputContainer title={"Task"} error={errors.task?.message}>
            <TaskDropDown setValue={setValue} selectedUnitTask={selectedUnit?selectedUnit.task:null}/>
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
            value={getValues("start_time")?getValues("start_time").getHours():null}
        />

        <TimeElement 
            setValue={setValue} 
            name={"end_time"}
            date={new Date(getValues("date"))}
            error={errors.end_time?.message}
            title={"End Time"}
            value={getValues("end_time")?.getMinutes()}
        />

        <TimeElement 
            setValue={setValue} 
            name={"duration"}
            error={errors.duration?.message}
            title={"Duration"}
            value={getValues("duration")}
        />

        <div className="flex flex-wrap max-h-[100px] overflow-auto p-1">
            {
                selectedTags.map((tag, index)=>(
                    <li 
                      key={index}
                      className="m-[0.5px]"
                      style={{backgroundColor: tag.color?tag.color:undefined}}
                      onClick={()=>removeTag(tag.id)}
                    >
                        <TagItem name={tag.name} color={tag.color}/>
                    </li>
                ))
            }
        </div>

    </form>
  )
}

export default WorkUnitForm;