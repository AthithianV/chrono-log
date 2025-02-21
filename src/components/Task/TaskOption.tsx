type PropType = {
    payForm: "hourly_rate" | "lump_sum",
    setPayForm: React.Dispatch<React.SetStateAction<"hourly_rate" | "lump_sum">>
}

const TaskOption = ({payForm, setPayForm}:PropType) => {
  return (
    <div className='flex gap-10 mb-2'>
        <div className='flex-center gap-1'>
            <svg width="24" height="24" viewBox="0 0 24 24" 
            className="cursor-pointer" onClick={() => setPayForm("hourly_rate")}>

            <circle 
                cx="12" 
                cy="12"
                r="7"
                fill="white" 
                stroke="black" strokeWidth="1" className="shadow" />

            {payForm === "hourly_rate" && (
                <circle 
                    cx="12"
                    cy="12" 
                    r="6"
                    fill="#FD4760"
                />
            )}
            </svg>
            <label>Hourly Rate</label>
        </div>

        <div className='flex-center gap-1'>
            <svg width="24" height="24" viewBox="0 0 24 24" 
            className="cursor-pointer" onClick={() => setPayForm("lump_sum")}>

            <circle cx="12" cy="12" r="7" fill="white" 
                stroke="black" strokeWidth="1" className="shadow" />

            {payForm === "lump_sum" && (
                <circle cx="12" cy="12" 
                r="6" fill="#FD4760"
                />
            )}
            </svg>
            <label>Lump Sum</label>
        </div>
    </div>
  )
}

export default TaskOption