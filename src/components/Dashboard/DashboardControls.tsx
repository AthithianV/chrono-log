import { AddIcon, FilterIcon, StartIcon } from "../../assets/icons";

const DashboardControls = () => {
  return (
    <div>
        <div className="my-2">
            <button className="btn bg-white">
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