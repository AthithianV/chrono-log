import { useRef, useState } from "react"
import { PauseIcon, StartIcon, StopIcon } from "../assets/icons";
import { appendZero, formatTime } from "../utils/formatTime";

const Pomodaro = () => {
  
  let timer = useRef<any|null>(null);
  const [duration, setDuration] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const start = () =>{
    setIsPause(false);
    if(timer.current) return;
    timer.current = setInterval(()=>{
      setDuration((prev)=>prev+1);
    }, 100)
  }

  const pause = () => {
    setIsPause(true);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  const end = () => {
    setDuration(0);
    clearInterval(timer.current);
    timer.current = null;
  }

  return (
    <div className="p-10 bg-secondary-bg-light dark:bg-secondary-bg-dark w-fit rounded m-auto mt-10 border dark:border-gray-900 shadow">
      <div className="text-6xl my-10 font-semibold flex justify-center items-end">
        <div className="w-16">{appendZero(Math.floor(duration/36000))}</div>
        <span>:</span>
        <div className="w-16">{appendZero(Math.floor(duration/600)%60)}</div>
        <span>:</span>
        <div className="w-16">{appendZero(Math.floor(duration/10)%60)}</div>
        <span className="text-xl">:</span>
        <div className="text-xl w-8">{appendZero(duration%10)}</div>
      </div>
      <div className="flex-center gap-3 my-2 text-4xl text-white">
        {duration===0
          ?<button className="py-2 px-4 rounded-lg bg-green-500" onClick={start}>{StartIcon}</button>
          :isPause
          ?<button className="py-2 px-4 rounded-lg bg-yellow-400" onClick={start}>{StartIcon}</button>
          :<button className="py-2 px-4 rounded-lg bg-yellow-400" onClick={pause}>{PauseIcon}</button>
        }
          
        {duration>0 && <button className="py-2 px-4 rounded-lg bg-red-500" onClick={end}>{StopIcon}</button>}
      </div>
    </div>
  )
}

export default Pomodaro;