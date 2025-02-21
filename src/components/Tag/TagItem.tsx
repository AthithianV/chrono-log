import { TagIcon } from "../../assets/icons"

const TagItem = ({name, color}:{name:string, color:string}) => {
  return (
    <div className="py-1 px-2" style={{backgroundColor: color?color:undefined}}>
        {TagIcon}
        <span>{name}</span>
    </div>
  )
}

export default TagItem