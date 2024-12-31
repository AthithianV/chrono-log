import { useState } from 'react';
import { SettingsIcon } from '../../assets/icons';

const PomodaroSettings = () => {

    const [showSettings, setShowSettings] = useState(false);

  return (
    <div className='absolute bottom-10 right-10'>
        <button 
            className='relative text-2xl py-2 px-3 rounded-md bg-color border dark:border-gray-700 cursor-pointer'
            onClick={()=>setShowSettings(prev=>!prev)}>
            {SettingsIcon}
        </button>
        {showSettings && 
        <ul className='absolute p-2 bg-color border-color bottom-[55px] right-1 rounded'>
          <li><span>Session Duration:</span></li>
          <li><span>Break Duration:</span></li>
          <li><span>Session Count:</span></li>
        </ul>}
    </div>
  )
}

export default PomodaroSettings;