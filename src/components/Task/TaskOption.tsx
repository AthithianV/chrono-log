type PropType = {
    payForm: "hourly_rate" | "lump_sum",
    setPayForm: React.Dispatch<React.SetStateAction<"hourly_rate" | "lump_sum">>
}

const TaskOption = ({payForm, setPayForm}:PropType) => {
  return (
    <div className='flex gap-10 mb-2'>
        <div className='flex-center gap-2'>
            <div 
                className='bg-white h-4 w-4 rounded-full flex-center border border-black'
                onClick={()=>setPayForm("hourly_rate")}>
                {payForm==="hourly_rate" && <span className='h-3 w-3 rounded-full bg-sky-400'></span>}
            </div>
            <label>Hourly Rate</label>
        </div>

        <div className='flex-center gap-2'>
            <div 
                className='bg-white h-4 w-4 rounded-full flex-center border border-black'
                onClick={()=>setPayForm("lump_sum")}>
                {payForm==="lump_sum" && <span className='h-3 w-3 rounded-full bg-sky-400'></span>}
            </div>
            <label htmlFor='lump_sum'>Lump Sum</label>
        </div>
    </div>
  )
}

export default TaskOption