import Circle from "../../assets/svg/Circle"
import Text from "../../assets/svg/Text"
import pomodaroConfig from "../../config/pomodaro";
import theme from "../../config/theme";
import usePomodaro from "../../store/pomodaroStore"
import { appendZero } from "../../utils/dateTime";

const ProgressBar = () => {

    const { duration, sessionDuration, breakDuration, sessionOrBreak } = usePomodaro();

  return (
    <svg width={200} height={200} className="dark:text-slate-300">
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle color="lightgrey" />
        <Circle color={theme.colors.primary} percentage={sessionOrBreak==="SESSION"?(duration/sessionDuration*100):(duration/breakDuration*100)} />
      </g>
      <Text text={`${appendZero(Math.floor(duration/pomodaroConfig.conversion))}:${appendZero(Math.floor(duration)%60)}`} />
    </svg>
  )
}

export default ProgressBar;