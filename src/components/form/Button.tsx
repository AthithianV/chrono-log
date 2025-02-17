import { ReactNode } from 'react'

const Button = ({name, icon}:{name: string, icon:ReactNode}) => {
  return (
    <button type="button" className="btn">
        {icon}
        <span>{name}</span>
    </button>
  )
}
export default Button