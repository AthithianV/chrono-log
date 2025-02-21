import useWorkUnit from "../../store/workUnitStore"
import { timeFormat } from "../../utils/dateTime"
import TagItem from "../Tag/TagItem"

const WorkUnitItem = ({workunit}:{workunit:WorkUnit}) => {

  const {selectUnit} = useWorkUnit();

  const unitStyle = {
    backgroundColor: workunit.task.color?workunit.task.color: undefined
  }


  return (
    <div className="flex justify-between py-2 pe-4 rounded cursor-pointer hover:bg-gray-200" onClick={()=>selectUnit(workunit)}>

        <div className="flex gap-2">
          <span style={unitStyle} className="px-[2px] rounded-r"></span>
          <div>
            <h4 className="font-semibold text-lg">{workunit.description}</h4>
            <ul className="mt-1">
              {
                workunit.tags.map((tag, index)=>(
                  <li key={index}><TagItem name={tag.name} color={tag.color}/></li>
                ))
              }
            </ul>
          </div>
        </div>
        <div>
            <span className="font-semibold text-lg">{timeFormat(workunit.duration)}</span>
        </div>

    </div>
  )
}

export default WorkUnitItem