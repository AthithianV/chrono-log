import Sessions from "../components/Pomodaro/SessionsBar";
import PomodaroSettings from "../components/Pomodaro/Settings";
import Timer from "../components/Pomodaro/Timer";

const Pomodaro = () => {  

  return (
    <div className="h-full flex-col relative slide-up z-0">
      <div className="flex-center flex-col w-full">
        <Timer/>
        <Sessions/>
        <PomodaroSettings/>
      </div>
    </div>
  )
}

export default Pomodaro;