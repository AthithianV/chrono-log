import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const MainLayout = () => {
  return (
    <main className="h-screen w-screen bg-primary-bg-light dark:bg-primary-bg-dark flex gap-2 dark:text-slate-300">
        <div className="bg-secondary-bg-light dark:bg-secondary-bg-dark h-full">
            <Navbar/>
        </div>
        <div className="flex-1 h-full">
            <Outlet/>
        </div>
    </main>
  )
}

export default MainLayout;