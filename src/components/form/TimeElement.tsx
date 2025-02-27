import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { secToHours, secToMinutes } from "../../utils/dateTime";

type PropType = {
    setValue: UseFormSetValue<{ 
        start_time: Date,
        end_time: Date | null,
        date: Date,
        description: string | null,
        details: string | null,
        duration: number,
        task: number
    }>,
    name: "start_time" | "end_time" | "duration",
    date?: Date,
    error: string | undefined,
    title: string,
    value: number|null|undefined
}

const TimeElement = ({setValue, name, date, error, title, value}:PropType) => {

    const [hour, setHour] = useState<number|string|undefined>(); 
    const [minutes, setMinutes] = useState<number|string|undefined>();

    useEffect(()=>{
        setValue(name, name==="duration"?0:null);
        if(!value) return;
        if(name==="duration"){
            setHour(secToHours(value));
            setMinutes(secToMinutes(value%3600));
        }else{
            setHour(value);
            setMinutes(value);
        }
    }, [])

    useEffect(()=>{
        if(name=="duration"){
            setValue(name, Number(hour?hour:0)*3600+Number(minutes?minutes:0)*60);
        }else if(date){
            date.setHours(Number(hour?hour:0), Number(minutes?minutes:0), 0, 0);
            setValue(name, date);
        }
    }, [hour, minutes]);

  return (
    <div className="input-container">
        <label className="text-sm font-semibold">{title}:</label>
        <div className="flex gap-2">
            <input 
                type="number"
                className="input w-10 flex-1"
                value={hour} 
                onChange={(e)=>setHour(Number(e.target.value))}
                placeholder="hh"
            />
            <span>:</span>
            <input 
                type="number"
                className="input w-10 flex-1"
                value={minutes} 
                onChange={(e)=>setMinutes(Number(e.target.value))}
                placeholder="mm"
            />
        </div>
        {error && <span className="text-sm text-red-500">*{error}</span>}
    </div>
  )
}

export default TimeElement;