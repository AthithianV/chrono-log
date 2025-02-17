import { useEffect, useState } from "react";
import { AddIcon, SortIcon } from "../assets/icons"
import Database from "@tauri-apps/plugin-sql";
import { error } from "@tauri-apps/plugin-log";
import useTag from "../store/tags";
import TagForm from "../components/Tag/TagForm";

const Tags = () => {

  const { tagFormView, tags, toggleTagFormView, setTags, selectTag } = useTag();
  const [sort, setSort] = useState("ASC");

  useEffect(()=>{
    Database.load("sqlite:app.db").then(
      (db)=>{
        db.select(`SELECT * FROM tags ORDER BY tags.name ${sort};`).then(data=>{
          setTags(data as Tag[]);
      });
        db.close();
      }
    ).catch(err=>error("Error Occurred While Fetching Tags: "+JSON.stringify(err)));
  }, [sort]);

  return (
    <div className="slide-up p-10">
      <div className="flex gap-2 pb-5">
        {tagFormView && <TagForm/>}
        <button
          type="button"
          className="btn"
          onClick={()=>setSort((prev)=>prev=="ASC"?"DESC":"ASC")}
        >
          {SortIcon}
          Sort
        </button>

        <input 
          className="input px-5"
          type="text"/>

        <button
          onClick={()=>toggleTagFormView()}
          className="btn">
            {AddIcon}
            Create New Tag
        </button>

      </div>

      <ul>
        {
          tags.map((tag)=>(
            <li 
            onClick={()=>selectTag(tag)}
            className="flex items-center font-semibold gap-2 p-2 px-5 my-2 text-lg cursor-pointer hover:bg-gray-200 hover:dark:bg-secondary-bg-dark rounded">
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