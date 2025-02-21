import { useState } from 'react';

import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import OverlayLayout from '../Layouts/OverlayLayout';

const OverlaySideNavbar = () => {

  const [viewSidebar, setViewSidebar] = useState(false);

  return (
    <div className='hidden max-sm:flex'>
        <TopNavbar setOverlay={()=>setViewSidebar(prev=>!prev)}/>
        {
          <OverlayLayout 
            view={viewSidebar} 
            openAnimation='slide-in' 
            closeAnimation='slide-out' 
            isSidebar={true}
            childPositionX={"start"}
            childPositionY={"center"}>
            <SideNavbar/>
          </OverlayLayout>
        }
    </div>
  )
}

export default OverlaySideNavbar