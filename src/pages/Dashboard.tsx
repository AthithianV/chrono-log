import DashboardControls from "../components/Dashboard/DashboardControls"
import WorkUnitForm from "../components/Dashboard/WorkUnitForm"
import WorkUnitItem from "../components/Dashboard/WorkUnitItem";
import useWorkUnit from "../store/workUnitStore"

const Dashboard = () => {

  const { workUnitFormView, workUnits } = useWorkUnit();

  return (
    <div className="slide-up p-4 flex">

      <div className="flex-1">
        <DashboardControls/>
        <ul>
          {
            workUnits.map((unit, index)=>(
              <li key={index}>
                <WorkUnitItem workunit={unit}/>
              </li>
            ))
          }
        </ul>
      </div>

      {workUnitFormView && <div className="w-[350px] p-2 hide-on-small">
          <WorkUnitForm />
      </div>}

      {workUnitFormView && <div className="hidden max-sm:block">
        <div className="overlay">
          <WorkUnitForm/>
        </div>
      </div>}
      
    </div>
  )
}

export default Dashboard