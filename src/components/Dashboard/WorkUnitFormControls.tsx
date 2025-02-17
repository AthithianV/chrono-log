import { CloseIcon, SaveIcon } from "../../assets/icons";
import useWorkUnit from "../../store/workUnitStore"
import SubmitButton from "../form/SubmitButton";
import AddTagsButton from "./AddTagsButton"

const WorkUnitFormControls = () => {

    const { toggleWorkUnitFormView } = useWorkUnit();

  return (
    <div>
        <div className="hide-on-small">
            <AddTagsButton/>
            <div className="my-2 flex justify-end gap-2">
                <button type="button" className="btn" onClick={()=>toggleWorkUnitFormView(false)}>
                    {CloseIcon}
                    <span>Cancel</span>
                </button>
                <SubmitButton name={"Save"} icon={SaveIcon}/>
            </div>
        </div>

        <div className="hidden max-sm:block">

            <div className="flex items-center justify-start gap-4">

                <button 
                    className="text-red-500 text-lg"
                    type="button" 
                    onClick={()=>toggleWorkUnitFormView(false)}
                >{CloseIcon}</button>

                <h1 className="font-semibold text-sm">Add Work Unit</h1>

            </div>

            <div className="flex items-center justify-end gap-4 text-lg">
                <SubmitButton name={"Save"} icon={SaveIcon}/>
                <AddTagsButton/>
            </div>
            
        </div>
    </div>
  )
}

export default WorkUnitFormControls