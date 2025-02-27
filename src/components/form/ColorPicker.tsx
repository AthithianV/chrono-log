import { TickIcon } from "../../assets/icons"

type PropType = {
    color: string,
    setColor: (color:string)=>void
}

const colors = [
    "#000000", "#6B7280", "#EF4444", "#F97316",
    "#F59E0B", "#EAB308", "#84CC16", "#10B981",
    "#06B6D4", "#0EA5E9", "#3B82F6", "#6366F1", "#8B5CF6", "#D946EF"
]

const ColorPicker = ({color, setColor}:PropType) => {

  return (
  <div className="p-4 bg-white border rounded-xl">
    <ul className="flex gap-2 flex-wrap">
      {
        colors.map((currentColor, index)=>(
          <li
            key={index}
            className="h-8 w-8 rounded-full cursor-pointer flex-center shadow"
            style={{backgroundColor: currentColor}}
            onClick={()=>setColor(currentColor)}>
                {color === currentColor && <span className="text-white">{TickIcon}</span>}
            </li>
          ))
      }
    </ul>
  </div>
  )
}

export default ColorPicker