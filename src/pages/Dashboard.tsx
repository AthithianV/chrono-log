import DashboardControls from "../components/Dashboard/DashboardControls"
import WorkUnitForm from "../components/WorkUnit/WorkUnitForm"
import WorkUnitItem from "../components/WorkUnit/WorkUnitItem";
import OverlayLayout from "../components/Layouts/OverlayLayout";
import useWorkUnit from "../store/workUnitStore"

const Dashboard = () => {

  const { workUnitFormView, workUnits, toggleWorkUnitFormView } = useWorkUnit();

  return (
    <div className="slide-up p-4 flex">

      <div className="flex-1">
        <DashboardControls/>
        <ul className="py-2">
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
        handleClose={toggleWorkUnitFormView}
        >
          <WorkUnitForm />
      </OverlayLayout>}
      
    </div>
  )
}

export default Dashboard