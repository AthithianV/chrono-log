import { ReactNode } from "react"

const SubmitButton = ({name, icon}:{name: string, icon:ReactNode}) => {
  return (
    <button type="submit" className="btn">
        {icon}
        <span>{name}</span>
    </button>
  )
}

export default SubmitButton;