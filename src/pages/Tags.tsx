import { useEffect, useState } from "react";
import { AddIcon, SortIcon } from "../assets/icons"
import useTag from "../store/tagsStore";
import TagForm from "../components/Tag/TagForm";
import OverlayLayout from "../components/Layouts/OverlayLayout";
import { getAllTagsRepository } from "../repository.ts/tags.repository";

const Tags = () => {

  const { tagFormView, tags, toggleTagFormView, setTags, selectTag } = useTag();
  const [sort, setSort] = useState<"ASC"|"DESC">("ASC");

  useEffect(()=>{
    toggleTagFormView(false);
  }, [])

  useEffect(()=>{
    getAllTagsRepository(sort)
    .then(data=>setTags(data?data:[]))
    .catch(err=>console.log(err))
  }, [sort]);

  return (
    <div className="slide-up p-10 max-sm:p-2">
      <div className="flex gap-2 pb-5">
        
        <OverlayLayout
          view={tagFormView}
          childPositionX="end"
          childPositionY="center"
          openAnimation="overlay-form-show"
          closeAnimation="overlay-form-hide"
          handleClose={toggleTagFormView}>
          <TagForm/>
        </OverlayLayout>
        
        <button
          type="button"
          className="btn"
          onClick={()=>setSort((prev)=>prev=="ASC"?"DESC":"ASC")}
        >
          {SortIcon}
          Sort
        </button>

        <input 
          className="input px-5 flex-1"
          type="text"/>

        <button
          onClick={()=>toggleTagFormView(true)}
          className="btn max-sm:fixed max-sm:bottom-5 max-sm:right-5">
            {AddIcon}
            Create New Tag
        </button>

      </div>

        <ul>
          {
            tags.map((tag, index)=>(
              <li 
              key={index}
              onClick={()=>selectTag(tag)}
              className="tag-task-item">
                <span 
                  style={{ backgroundColor: tag.color?tag.color:undefined }}
                  className={`border-[1px] border-black h-[20px] w-[20px] rounded-full`}></span>
                <span>{tag.name}</span>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default Tags;