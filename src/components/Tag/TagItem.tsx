import { TagIcon } from "../../assets/icons"

const TagItem = ({name, color}:{name:string, color:string|null}) => {
  return (
    <div 
    className="p-[0.2rem] px-1 text-xs font-semibold rounded-sm shadow flex-center gap-1 cursor-pointer hover-shadow dark:text-black" 
    style={{backgroundColor: color?color:undefined}}>
        {TagIcon}
        <span>{name}</span>
    </div>
  )
}

export default TagItem