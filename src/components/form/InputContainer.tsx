import { ReactNode } from "react"

type PropType = {
    title:string, 
    children:ReactNode, 
    error: string|undefined
}

const InputContainer = ({title, children, error}:PropType) => {
  return (
    <div className='input-container'>
        <label className='font-semibold'>{title}:</label>
        {children}
        {error && <span className="text-red-500 text-sm">* {error}</span>}
    </div>
  )
}

export default InputContainer