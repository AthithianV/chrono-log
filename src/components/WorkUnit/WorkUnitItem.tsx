import useWorkUnit from "../../store/workUnitStore"
import { timeFormat } from "../../utils/dateTime"
import TagItem from "../Tag/TagItem"

const WorkUnitItem = ({workunit}:{workunit:WorkUnit}) => {

  const {selectUnit} = useWorkUnit();

  const unitStyle = {
    backgroundColor: workunit.task.color?workunit.task.color: undefined
  }


  return (
    <div 
      className="py-2 pe-4 rounded cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700" 
      onClick={()=>selectUnit(workunit)}>

      <div className="flex gap-2 w-full">
        <span style={unitStyle} className="px-[2px] rounded-r"></span>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-semibold text-lg">{workunit.description}</h4>
            <span className="font-semibold text-lg">{timeFormat(workunit.duration)}</span>
          </div>
          <ul className="mt-1 flex gap-2 flex-wrap">
              {
                workunit.tags.map((tag, index)=>(
                  <li key={index}><TagItem name={tag.name} color={tag.color}/></li>
                ))
              }
          </ul>
        </div>

      </div>
    </div>
  )
}

export default WorkUnitItem