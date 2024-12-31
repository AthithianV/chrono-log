import Sessions from "../components/Pomodaro/Sessions";
import Timer from "../components/Pomodaro/Timer";

const Pomodaro = () => {  

  return (
    <div className="h-full flex-col">
      <div className="flex-center flex-col w-full">
        <Timer/>
        <Sessions/>
      </div>
    </div>
  )
}

export default Pomodaro;