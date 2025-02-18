import { getCurrentWindow } from '@tauri-apps/api/window';
import { CloseIcon, MaximizeIcon, MinimizeIcon } from '../../assets/icons';
import Brand from '../Navbar/Brand';


const TitleBar = () => {

  const appWindow = getCurrentWindow();

const handleMinimize = () => {
    appWindow.minimize();
  };

  const handleMaximize = () => {
    appWindow.maximize();
  };

  const handleClose = () => {
    appWindow.close();
  };

  return (
    <div data-tauri-drag-region className="flex justify-between bg-secondary-bg-light dark:bg-secondary-bg-dark">
        <div className='px-7 py-2'><Brand/></div>
        <div className='flex-center'>
            <div className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={handleMinimize}>
                {MinimizeIcon}
            </div>
            <div className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={handleMaximize}>
                {MaximizeIcon}
            </div>
            <div className='px-4 py-2 hover:bg-red-500 cursor-pointer' onClick={handleClose}>
                {CloseIcon}
            </div>
        </div>
    </div>
  )
}

export default TitleBar