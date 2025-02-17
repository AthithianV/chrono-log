import { useRef, useState } from 'react';

import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'

const OverlaySideNavbar = () => {

    
  const [overlay, setOverlay] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const sideNavbarRef = useRef<null|HTMLDivElement>(null);

  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {        
    if(
        (sideNavbarRef.current && !sideNavbarRef.current.contains(e.target as Node))
        || (e.target instanceof HTMLLIElement) || e.target instanceof HTMLSpanElement
        || (e.target instanceof HTMLAnchorElement)
    ){
        setIsClose(true);
        const timer = setTimeout(()=>{
            setIsClose(false);
            setOverlay(false);
           clearTimeout(timer);
        }, 300)
    }
  }


  return (
    <div className='hidden max-sm:flex'>
        <TopNavbar setOverlay={setOverlay}/>
        {
        overlay && 
        <div className='absolute h-screen w-screen bg-[rgba(0,0,0,0.5)] z-10' onClick={(e)=>handleClick(e)}>
            <div className={`h-full w-fit ${overlay?"slide-in":""} ${isClose?"slide-out translate-x-[-250px]":""}`} ref={sideNavbarRef}>
                <SideNavbar/>
            </div>
        </div>}
    </div>
  )
}

export default OverlaySideNavbar