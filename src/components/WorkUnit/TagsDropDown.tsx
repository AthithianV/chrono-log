import { useEffect, useRef, useState, useCallback } from "react";
import { AddIcon, CloseIcon } from "../../assets/icons";
import useTag from "../../store/tagsStore";
import { Link } from "react-router-dom";
import useWorkUnit from "../../store/workUnitStore";
import { getAllTagsRepository } from "../../repository/tags.repository";

const TagsDropDown = () => {

  const { tags, setTags } = useTag();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { toggleWorkUnitFormView } = useWorkUnit();
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      btnRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      !btnRef.current.contains(e.target as Node)
    ) {
      setDropdown(false);
    }
  }, []);

  // Close dropdown on Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdown(false);
    }
  }, []);

  // useEffect(()=>{
  //     getAllTagsRepository('DESC')
  //     .then(data=>setTags(data?data:[]))
  //     .catch(err=>console.log(err))
  // }, []);

  useEffect(() => {
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdown, handleClickOutside, handleKeyDown]);

  const pickTag = (tag:Tag)=>{
    const exists = selectedTags.find(t=>t.id===tag.id);
    if(!exists){
      setSelectedTags([...selectedTags, tag]);
    }
  }

  const removeTag = (e: React.MouseEvent<HTMLButtonElement>, tagId: number) => {
    e.stopPropagation();
    setSelectedTags(prev=>prev.filter(tag=>tag.id!==tagId));
  }

  return (
    <div className="flex justify-end flex-col">

      {/* Dropdown Toggle Button */}
      <div ref={btnRef} className="input min-h-8 w-full flex flex-wrap" onClick={() => setDropdown((prev) => !prev)}>
        <ul className="flex gap-1 flex-wrap max-h-[75px] overflow-auto p-1">
            {                
                selectedTags.map((tag, index)=>(
                    <li 
                      key={index}
                      style={{ backgroundColor: tag.color }}
                      className="flex gap-1 py-[1px] px-2 rounded font-semibold"
                    >
                        <span>{tag.name}</span>
                        <button type="button" onClick={(e)=>removeTag(e, tag.id)}>{CloseIcon}</button>
                    </li>
                ))
            }
        </ul>
      </div>

      {/* Dropdown List */}
      <div className="relative">
      {dropdown && (
        <ul
          ref={dropdownRef}
          className="drop-down"
        >
          {tags.length > 0 ? (
            tags.map((tag) => (
              <li
                key={tag.id}
                className="drop-down-element"
                onClick={() => pickTag(tag)}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black"
                  style={{ backgroundColor: tag.color || "transparent" }}
                ></span>
                <span>{tag.name}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No tags available</li>
          )}

          {/* Create New Tag Option */}
          <li
            className="p-2 cursor-pointer hover:bg-slate-200 transition rounded"
            onClick={() => {
              setDropdown(false);
              toggleWorkUnitFormView(false);
            }}
          >
            <Link to={"/tags"} className="flex items-center gap-2">
              <span>{AddIcon}</span>
              <span>Create New Tag</span>
            </Link>
          </li>
        </ul>
      )}
      </div>
    </div>
  );
};

export default TagsDropDown;
