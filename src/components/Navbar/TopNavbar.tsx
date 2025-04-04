import { DarkThemeIcon, LightThemeIcon, ToggleButtonIcon } from "../../assets/icons"
import useTheme from "../../store/themeStore"

type PropType={
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const TopNavbar = ({setOverlay}:PropType) => {

    const {theme, toggleTheme} = useTheme();

  return (
    <nav className="flex justify-between items-center h-[var(--title-bar-height)] py-2 px-4 text-lg w-full shadow">
        <div className="flex-center gap-4">
            <div onClick={()=>setOverlay(true)} className="py-1 px-2 rounded hover:shadow cursor-pointer">
                {ToggleButtonIcon}
            </div>
            {/* <Brand/> */}
        </div>
        <div className="py-1 px-2 rounded hover:shadow cursor-pointer" onClick={toggleTheme}>
            {theme==="light"?DarkThemeIcon:LightThemeIcon}
        </div>
    </nav>
  )
}

export default TopNavbar