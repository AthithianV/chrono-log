import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WorkUnitSchema } from "../../validation/schemas";
import InputContainer from "../form/InputContainer";
import { CloseIcon, SaveIcon } from "../../assets/icons";
import SubmitButton from "../form/SubmitButton";
import Button from "../form/Button";
import AddTagsButton from "./AddTagsButton";
import TimeElement from "../form/TimeElement";
import { z } from "zod";

const WorkUnitForm = () => {
  
  const {register, getValues, setValue, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(WorkUnitSchema),
    defaultValues: {
        description: null,
        details: null,
        date: new Date()
    }
  });

  const onSubmit = (data:z.infer<typeof WorkUnitSchema>)=>{
    console.log(data);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <AddTagsButton/>
        <div className="my-2 flex justify-end gap-2">
            <Button name="Cancel" icon={CloseIcon}/>
            <SubmitButton name={"Save"} icon={SaveIcon}/>
        </div>

        <InputContainer title={"Description"} error={errors.description?.message}>
            <input className="input" type="text" {...register("description")}/>
        </InputContainer>   

        <InputContainer title={"Details"} error={errors.description?.message}>
            <textarea className="input h-[100px]" {...register("details")}></textarea>
        </InputContainer>    
        
        <InputContainer title={"Date"} error={errors.description?.message}>
            <input className="input" type="date" {...register("date")}/>
        </InputContainer>

        <TimeElement 
            setValue={setValue} 
            name={"start_time"}
            date={new Date(getValues("date"))}
            error={errors.start_time?.message}
            title={"Start Time"}
        />

        <TimeElement 
            setValue={setValue} 
            name={"end_time"}
            date={new Date(getValues("date"))}
            error={errors.end_time?.message}
            title={"End Time"}
        />

        <InputContainer title={"Duration"} error={errors.description?.message}>
            <input className="input" type="text" {...register("duration")} placeholder="hh:mm:ss"/>
        </InputContainer>


    </form>
  )
}

export default WorkUnitForm;