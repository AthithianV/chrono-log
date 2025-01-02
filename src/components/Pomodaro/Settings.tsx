import { useEffect, useRef, useState } from 'react';
import { SettingsIcon } from '../../assets/icons';
import usePomodaro from '../../store/pomodaro';
import SettingElement from './SettingElement';
import pomodaroConfig from '../../config/pomodaro';

const PomodaroSettings = () => {


    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);
    const { sessionDuration, 
            sessionCount, 
            breakDuration, 
            setSessionDuration, 
            setSessionCount, 
            setBreakDuration
          } = usePomodaro();

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=>{
            if(settingsRef.current && !settingsRef.current.contains(e.target as Node)){
                setShowSettings(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [])

  return (
    <div className='absolute bottom-10 right-10' ref={settingsRef}>
        <button 
            className='relative text-2xl py-2 px-3 rounded-md bg-color border dark:border-gray-700 cursor-pointer'
            onClick={()=>setShowSettings(prev=>!prev)}>
            {SettingsIcon}
        </button>
        {showSettings && 
        <div className='absolute p-4 bg-color border-color bottom-[55px] right-1 rounded w-60 text-lg flex flex-col gap-2'>
          <SettingElement 
            title='Session Duration' 
            value={sessionDuration/pomodaroConfig.conversion} 
            upFunction={()=>setSessionDuration(+pomodaroConfig.conversion)}
            downFunction={()=>setSessionDuration(-pomodaroConfig.conversion)}
            min={5}
            max={120}
            suffix='min'
          />
          <SettingElement 
            title='Break Duration' 
            value={breakDuration/pomodaroConfig.conversion} 
            upFunction={()=> setBreakDuration(+pomodaroConfig.conversion)}
            downFunction={()=> setBreakDuration(-pomodaroConfig.conversion)}
            min={1}
            max={30}
            suffix='min'
          />
          <SettingElement 
            title='Session Count' 
            value={sessionCount}
            upFunction={()=> setSessionCount(+1)}
            downFunction={()=> setSessionCount(-1)}
            min={1}
            max={10}
          />
        </div>}
    </div>
  )
}

export default PomodaroSettings;