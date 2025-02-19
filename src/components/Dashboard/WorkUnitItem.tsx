
const WorkUnitItem = ({workunit}:{workunit:WorkUnit}) => {
  return (
    <div className="flex justify-between">
        <h4>{workunit.description}</h4>
        <div>
            <span>{workunit.duration}</span>
        </div>

    </div>
  )
}

export default WorkUnitItem