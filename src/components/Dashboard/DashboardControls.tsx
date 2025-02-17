import { AddIcon, FilterIcon, StartIcon } from "../../assets/icons";
import useWorkUnit from "../../store/workUnitStore";

const DashboardControls = () => {

    const { toggleWorkUnitFormView } = useWorkUnit();

  return (
    <div>
        <div className="my-2">
            <button 
                className="btn bg-white" 
                onClick={()=>toggleWorkUnitFormView(true)}>
            {AddIcon}
            <span>Add Work Unit</span>
            </button>
        </div>

        <div className="my-2 flex justify-between">
            <div>
            <button className="btn bg-white">
                {StartIcon}
                <span>Start</span>
            </button>
            </div>
            <div>
            <button className="btn bg-white">
                {FilterIcon}
                <span>Filter</span>
            </button>
            </div>
        </div>
    </div>
  )
}

export default DashboardControls