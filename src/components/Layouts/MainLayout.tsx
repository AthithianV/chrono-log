import { Outlet } from 'react-router-dom'
import SideNavbar from '../Navbar/SideNavbar';
import OverlaySideNavbar from '../Navbar/OverlaySideNavbar';
import TitleBar from '../titlebar/TitleBar';

const MainLayout = () => {

  return (
    <main className='h-screen w-screen flex flex-col'>
        <TitleBar/>
        
        <div className="h-[89vh]">
          <div className="bg-secondary-bg-light dark:bg-secondary-bg-dark block">
              <div className='h-full block max-sm:hidden'>
                <SideNavbar/>
              </div>
              <OverlaySideNavbar/>
          </div>
            
          <div className='relative rounded-lg h-full'>
            <Outlet/>
          </div>
        </div>
    </main>
  )
}

export default MainLayout;