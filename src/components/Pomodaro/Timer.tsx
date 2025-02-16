import usePomodaro from "../../store/pomodaro";
import { StartIcon, StopIcon } from "../../assets/icons";
import ProgressBar from "./ProgressBar";


const Timer = () => {

  const {resetPomodaro, setDuration, timer, setTimer, running } = usePomodaro();

  const stop = () => {
    resetPomodaro();
  }

  const start = () =>{
    if(timer) return;
    setTimer(setInterval(()=>{
        setDuration();
    }, 1000));
  }

  return (
    <div className="p-10 w-fit rounded mt-24">
        <ProgressBar/>
        <div className="flex-center gap-3 my-2 text-2xl text-white">
            {(!running)
            ?<button className="py-2 px-4 rounded bg-green-500" onClick={start}>{StartIcon}</button>
            :<button className="py-2 px-4 rounded bg-red-500" onClick={stop}>{StopIcon}</button>
            }  
        </div>

    </div>
  )
}

export default Timer;