import { DownArrowIcon, UpArrowIcon } from "../../assets/icons"

type PropsType = {
    title:string,
    placeholder: string,
    upFunction:()=>void,
    downFunction:()=>void,
}

const SettingElement = ({title, placeholder, upFunction, downFunction}:PropsType) => {

  return (
    <div className="flex flex-col gap-1 my-1">
        <label>{title}</label>
        <div className='bg-white py-1 px-2 rounded border border-b-black flex'>
            <input className="flex-1 w-0"  value={placeholder}/>
            <div className='flex-center gap-3 text-sm'>
                <button className='' onClick={upFunction}>{UpArrowIcon}</button>
                <button className='' onClick={downFunction}>{DownArrowIcon}</button>
            </div>
        </div>
    </div>
  )
}

export default SettingElement