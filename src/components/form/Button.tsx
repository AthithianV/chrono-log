import { ReactNode } from 'react'

type PropTye = {
  name: string,
  icon:ReactNode,
}

const Button = ({name, icon}:PropTye) => {
  return (
    <button type="button" className="btn">
        {icon}
        <span>{name}</span>
    </button>
  )
}
export default Button