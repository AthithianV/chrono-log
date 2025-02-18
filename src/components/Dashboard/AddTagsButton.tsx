import { useEffect, useRef, useState } from "react";
import { AddIcon, TagIcon } from "../../assets/icons"
import useTag from "../../store/tagsStore"
import { Link } from "react-router-dom";
import useWorkUnit from "../../store/workUnitStore";

const AddTagsButton = () => {
  
  const {tags} = useTag();
  const {selectTag} = useWorkUnit();
  const [dropdown, setDropdown] = useState(false);
  const addTagRef = useRef<HTMLUListElement|null>(null);
  const btnRef = useRef<HTMLButtonElement|null>(null);

  useEffect(()=>{

    const handleClick = (e:MouseEvent)=>{
      if(
        addTagRef.current && btnRef.current
        && !addTagRef.current.contains(e.target as Node)
        && !btnRef.current.contains(e.target as Node)
      ){
        setDropdown(false);
      }
    } 

    document.addEventListener("mousedown", handleClick);

    return ()=>{
      document.removeEventListener("mousedown", handleClick);
    }

  }, []);

  return (
    <div className="my-2 flex justify-end relative">

      <button 
        ref={btnRef}
        type="button"
        className="btn"
        onClick={()=>setDropdown(prev=>!prev)}
      >
          {TagIcon}
          <span>Add Tags</span>
      </button>

      {
        dropdown &&
        <ul 
          ref={addTagRef}
          className="absolute top-10 text-sm min-w-[200px] z-4 bg-primary-bg-light dark:bg-primary-bg-dark p-2 rounded border shadow-lg reveal-down"
        >
        {
          tags.map((tag,index)=>(
            <li 
              key={index} 
              className="flex p-2 items-center justify-start gap-2 cursor-pointer hover:bg-slate-200 border-b-[1.5px] border-gray-200"
              onClick={()=>selectTag(tag)}
            >
              <span 
                className="p-2 rounded-full border-[1px] border-black"
                style={{backgroundColor: tag.color?tag.color:undefined}}></span>
              <span>{tag.name}</span>
            </li>
          ))
        }
        <li 
          className="p-2 rounded cursor-pointer hover:bg-slate-200"
          onClick={()=>setDropdown(false)}
          >
          <Link to={"/tags"} className="flex items-center justify-start gap-2">
            <span>
              {AddIcon}
            </span>
            <span>
              Create New Tag
            </span>
          </Link>
        </li>
        </ul>
      }
    </div>
  )
}

export default AddTagsButton;