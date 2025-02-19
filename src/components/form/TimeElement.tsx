import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

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
    name: "start_time" | "end_time",
    date: Date,
    error: string | undefined,
    title: string
}

const TimeElement = ({setValue, name, date, error, title}:PropType) => {

    const [hour, setHour] = useState<number|undefined>(); 
    const [minutes, setMinutes] = useState<number|undefined>();

    useEffect(()=>{
        setValue(name, null);
    }, [])

    useEffect(()=>{
        if(hour || minutes){
            date.setHours(hour?hour:0, minutes?minutes:0, 0, 0);
            setValue(name, date);
        }
    }, [hour, minutes]);

  return (
    <div className="input-container">
        <label className="text-sm font-semibold">{title}:</label>
        <div className="flex gap-2">
            <input 
                type="number"
                className="input w-10"
                value={hour?hour:undefined} 
                onChange={(e)=>setHour(Number(e.target.value))}
                placeholder="mm"
            />
            <span>:</span>
            <input 
                type="number"
                className="input w-10"
                value={minutes?minutes:undefined}
                onChange={(e)=>setMinutes(Number(e.target.value))}
                placeholder="ss"
            />
        </div>
        {error && <span className="text-sm text-red-500">*{error}</span>}
    </div>
  )
}

export default TimeElement;