import { DarkThemeIcon, LightThemeIcon } from "../assets/icons";
import useTheme from "../store/themeStore";

const Settings = () => {

  const {toggleTheme, theme} = useTheme();

  return (
    <div className="p-10 slide-up">
        <div className="w-8/12 mx-auto">
          <h1 className="font-bold text-2xl py-2 border-b-2">Settings</h1>
          <div className="flex justify-between items-center my-1 font-semibold">
            <h3 className="text-lg">Theme</h3>
            <div 
            className="nav-item"
            onClick={toggleTheme}>
              <span className="nav-link">
                {theme==='light'?LightThemeIcon:DarkThemeIcon}
                <span className="">{theme==='light'?'Dark':'Light'} Mode</span>
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Settings