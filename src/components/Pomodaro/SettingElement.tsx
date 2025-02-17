import { DownArrowIcon, UpArrowIcon } from "../../assets/icons"
import usePomodaro from "../../store/pomodaroStore"

type PropsType = {
    title:string,
    value: number,
    upFunction:()=>void,
    downFunction:()=>void,
    suffix?: string,
    min: number,
    max: number,
}

const SettingElement = ({title, value, upFunction, downFunction, suffix}:PropsType) => {

  const {running} = usePomodaro();

  return (
    <div className="flex flex-col gap-1 my-1">
        <label>{title}</label>
        <div className={`bg-white py-1 px-2 rounded border border-b-black flex  ${running?"opacity-30":""}`}>
            <div className="flex-1">
              {/* <input 
                className="max-w-12 w-fit px-2 focus:outline-none inp"
                disabled={running}  
                value={value}
                min={min}
                max={max}
                type="number"
              /> */}
              <span className="focus:outline-none" role="textbox">{value}</span> 
              {suffix && <span className="ml-1">{suffix}</span>}
            </div>
            <div className='flex-center gap-3 text-sm'>
                <button className='' disabled={running} onClick={upFunction}>{UpArrowIcon}</button>
                <button className='' disabled={running} onClick={downFunction}>{DownArrowIcon}</button>
            </div>
        </div>
    </div>
  )
}

export default SettingElement