import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePomodaro from "../../store/pomodaro"
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Sessions = () => {

    const {sessionCount, sessionCompleted, breakCompleted } = usePomodaro();

  return (
    <ul className="w-8/12 flex-center gap-2">
        {
            Array.from({length: 2*sessionCount-1}).map((_, index)=>{
                const bgColor = index%2===0
                                ?Math.floor(index/2)+1<=sessionCompleted?"bg-primary":"bg-gray-300"
                                :"";
                const textColor = Math.floor(index/2)+1<=breakCompleted?"text-primary":"text-gray-300";
                return (
                    <li 
                    className={`py-[1.5px] rounded-full ${index%2===0?"flex-1":""} ${bgColor} ${textColor}`} 
                    key={index}>{index%2===1 && <FontAwesomeIcon icon={faCoffee}/>}</li>)
            })
        }
    </ul>
  )
}

export default Sessions;