import { TagIcon } from "../../assets/icons"

const TagItem = ({name, color}:{name:string, color:string|null}) => {
  return (
    <div 
    className="p-[0.1rem] text-xs font-semibold rounded-sm flex-center gap-1 cursor-pointer hover-shadow" 
    style={{backgroundColor: color?color:undefined}}>
        {TagIcon}
        <span>{name}</span>
    </div>
  )
}

export default TagItem