import { TagIcon } from "../../assets/icons"

const TagItem = ({name, color}:{name:string, color:string}) => {
  return (
    <div className="p-1" style={{backgroundColor: color?color:undefined}}>
        {TagIcon}
        <span>{name}</span>        
    </div>
  )
}

export default TagItem