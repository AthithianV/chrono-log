import DashboardControls from "../components/Dashboard/DashboardControls"
import WorkUnitForm from "../components/WorkUnit/WorkUnitForm"
import WorkUnitItem from "../components/WorkUnit/WorkUnitItem";
import OverlayLayout from "../components/Layouts/OverlayLayout";
import useWorkUnit from "../store/workUnitStore"

const Dashboard = () => {

  const { workUnitFormView, workUnits, toggleWorkUnitFormView } = useWorkUnit();

  return (
      <div className= "slide-up p-4 w-full h-full">
        <div className="h-[13%]">
          <DashboardControls/>
        </div>
        <ul className="py-2 h-[87%] overflow-auto">
          {
            workUnits.map((date, index)=>(
              <ul key={index}>
                {
                  date.units.map((workunit, index)=>(
                    <li key={index}>
                      <WorkUnitItem workunit={workunit}/>
                    </li>
                  ))
                }
              </ul>
            ))
          }
        </ul>
        
      <OverlayLayout
        view={workUnitFormView}
        openAnimation="overlay-form-show"
        closeAnimation="overlay-form-hide"
        childPositionX="end"
        childPositionY="center"
        handleClose={toggleWorkUnitFormView}
        >
          <WorkUnitForm />
      </OverlayLayout>
      </div>

  )
}

export default Dashboard