import DashboardControls from "../components/Dashboard/DashboardControls"
import WorkUnitForm from "../components/Dashboard/WorkUnitForm"

const Dashboard = () => {
  return (
    <div className="slide-up p-2 flex">

      <div className="flex-1">
        <DashboardControls/>
      </div>

      <div className="w-[300px] p-2 hide-on-small">
          <WorkUnitForm />
      </div>

      <div className="hidden max-sm:block">
        <div className="overlay">
          <WorkUnitForm/>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard