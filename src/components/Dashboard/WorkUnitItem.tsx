import { timeFormat } from "../../utils/dateTime"
import TagItem from "../Tag/TagItem"

const WorkUnitItem = ({workunit}:{workunit:WorkUnit}) => {

  const unitStyle = {
    backgroundColor: workunit.task.color?workunit.task.color: undefined
  }


  return (
    <div style={unitStyle} className="flex justify-between px-4 py-2 text-white rounded cursor-pointer">
        <div>
          <h4>{workunit.description}</h4>
          <ul className="mt-1">
            {
              workunit.tags.map((tag, index)=>(
                <li key={index}><TagItem name={tag.name} color={tag.color}/></li>
              ))
            }
          </ul>
        </div>
        <div>
            <span>{timeFormat(workunit.duration)}</span>
        </div>

    </div>
  )
}

export default WorkUnitItem