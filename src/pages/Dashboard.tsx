import DashboardControls from "../components/Dashboard/DashboardControls"
import WorkUnitForm from "../components/Dashboard/WorkUnitForm"
import WorkUnitItem from "../components/Dashboard/WorkUnitItem";
import OverlayLayout from "../components/Layouts/OverlayLayout";
import useWorkUnit from "../store/workUnitStore"

const Dashboard = () => {

  const { workUnitFormView, workUnits } = useWorkUnit();

  return (
    <div className="slide-up p-4 flex">

      <div className="flex-1">
        <DashboardControls/>
        <ul>
          {
            workUnits[0].units.map((unit, index)=>(
              <li key={index}>
                <WorkUnitItem workunit={unit}/>
              </li>
            ))
          }
        </ul>
      </div>

      {<OverlayLayout
        view={workUnitFormView}
        openAnimation="overlay-form-show"
        closeAnimation="overlay-form-hide"
        childPositionX="end"
        childPositionY="center"
        >
          <WorkUnitForm />
      </OverlayLayout>}
      
    </div>
  )
}

export default Dashboard