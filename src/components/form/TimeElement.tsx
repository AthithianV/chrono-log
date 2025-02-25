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
    name: "start_time" | "end_time" | "duration",
    date?: Date,
    error: string | undefined,
    title: string,
    value: number|null|undefined
}

const TimeElement = ({setValue, name, date, error, title, value}:PropType) => {

    const [hour, setHour] = useState<number|undefined>(); 
    const [minutes, setMinutes] = useState<number|undefined>();

    useEffect(()=>{
        setValue(name, name==="duration"?0:null);
    }, [])

    useEffect(()=>{
        if(name=="duration"){
            setValue(name, (hour?hour:0)*3600+(minutes?minutes:0)*60);
        }else if(date){
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
                className="input w-10 flex-1"
                value={name==="duration"
                        ?(value?value/3600:undefined)
                        :value?value:undefined} 
                onChange={(e)=>setHour(Number(e.target.value))}
                placeholder="hh"
            />
            <span>:</span>
            <input 
                type="number"
                className="input w-10 flex-1"
                value={name==="duration"
                    ?(value?value/60:undefined)
                    :value?value:undefined} 
                onChange={(e)=>setMinutes(Number(e.target.value))}
                placeholder="mm"
            />
        </div>
        {error && <span className="text-sm text-red-500">*{error}</span>}
    </div>
  )
}

export default TimeElement;