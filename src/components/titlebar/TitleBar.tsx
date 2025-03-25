import { getCurrentWindow } from '@tauri-apps/api/window';
import { CloseIcon, MaximizeIcon, MinimizeIcon } from '../../assets/icons';
import Brand from './Brand';


const TitleBar = () => {

  const appWindow = getCurrentWindow();

  return (
    <div data-tauri-drag-region className="flex justify-between items-center bg-slate-50 dark:bg-secondary-bg-dark">
        <Brand/>
        <div className='flex-center '>
            <div className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={()=>appWindow.minimize()}>
                {MinimizeIcon}
            </div>
            <div className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={()=>appWindow.toggleMaximize()}>
                {MaximizeIcon}
            </div>
            <div className='px-4 py-2 hover:bg-red-500 cursor-pointer' onClick={()=>appWindow.close()}>
                {CloseIcon}
            </div>
        </div>
    </div>
  )
}

export default TitleBar