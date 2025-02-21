import { CloseIcon, SaveIcon } from "../../assets/icons";
import useWorkUnit from "../../store/workUnitStore"
import SubmitButton from "../form/SubmitButton";
import AddTagsButton from "./AddTagsButton"

const WorkUnitFormControls = () => {

    const { toggleWorkUnitFormView } = useWorkUnit();

  return (
    <div>
        <div >

            <div className="flex items-center justify-between gap-4">


                <button 
                    className="text-red-500 text-lg"
                    type="button" 
                    onClick={()=>toggleWorkUnitFormView(false)}
                >{CloseIcon}</button>

                <div className="flex items-center justify-end gap-4 text-lg">
                    <AddTagsButton/>
                    <SubmitButton name={"Save"} icon={SaveIcon}/>
                </div>

            </div>

            
            
        </div>
    </div>
  )
}

export default WorkUnitFormControls