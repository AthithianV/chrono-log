import { Outlet } from 'react-router-dom'
import SideNavbar from '../Navbar/SideNavbar';
import OverlaySideNavbar from '../Navbar/OverlaySideNavbar';
import TitleBar from '../titlebar/TitleBar';

const MainLayout = () => {

  return (
    <main className='h-screen w-screen flex flex-col'>
        <TitleBar/>
        <div className='flex flex-1 max-sm:flex-col relative bg-gray-100 dark:bg-primary-bg-dark dark:text-slate-300'>
          <div className="bg-secondary-bg-light dark:bg-secondary-bg-dark block">
              <div className='h-full block max-sm:hidden'>
                <SideNavbar/>
              </div>
              <OverlaySideNavbar/>
          </div>
          <div className="flex-1 h-full overflow-hidden">
            <div className='relative rounded-lg h-full'>
              <Outlet/>
            </div>
          </div>
        </div>
    </main>
  )
}

export default MainLayout;