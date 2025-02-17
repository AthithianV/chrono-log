
const OverlayLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='overlay'>
        {children}
    </div>
  )
}

export default OverlayLayout