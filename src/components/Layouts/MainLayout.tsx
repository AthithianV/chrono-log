import { Outlet } from 'react-router-dom'
import SideNavbar from '../Navbar/SideNavbar';
import OverlaySideNavbar from '../Navbar/OverlaySideNavbar';

const MainLayout = () => {

  return (
    <main className="h-screen w-screen relative bg-gray-100 dark:bg-primary-bg-dark flex dark:text-slate-300 max-sm:flex-col">
        <div className="bg-secondary-bg-light dark:bg-secondary-bg-dark block">
            <div className='h-full block max-sm:hidden'>
              <SideNavbar/>
            </div>
            <OverlaySideNavbar/>
        </div>
        <div className="flex-1 h-full overflow-hidden relative">
            <Outlet/>
        </div>
    </main>
  )
}

export default MainLayout;