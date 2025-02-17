import { TagIcon } from "../../assets/icons"
import Button from "../form/Button"

const AddTagsButton = () => {
  return (
    <div className="my-2 flex justify-end">
        <Button name="Add Tags" icon={TagIcon}/>
    </div>
  )
}

export default AddTagsButton;