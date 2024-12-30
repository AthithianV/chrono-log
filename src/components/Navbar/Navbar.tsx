import { Link } from "react-router-dom";
import { navItems } from "../../utils/navItems";
import { DarkThemeIcon, LightThemeIcon } from "../../assets/icons";
import { useEffect, useState } from "react";
import Brand from "./Brand";

const Navbar = () => {
  
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  useEffect(()=>{
    const theme = localStorage.getItem("theme");
    if(theme && theme === "light"){
      setTheme('dark');
    }
  },[])

  const toggleTheme = ()=>{
  const theme = localStorage.getItem("theme");
    if(!theme || theme === "light"){
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setTheme('light');
    }else{
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setTheme('dark');
    }
  }

  return (
    <div className="flex flex-col justify-between h-full py-2 px-2">
      <div>
        <Brand/>
        <ul>
          {
            navItems.map((item)=><li>
              <Link to={item.path} className="nav-item">
                {item.icon}
                <span className="nav-item-title">{item.name}</span>
              </Link>
            </li>)
          }
        </ul>
      </div>
      <ul>
        <li 
          className="nav-item"
          onClick={toggleTheme}>
            {theme==='light'?LightThemeIcon:DarkThemeIcon}
            <span className="nav-item-title">{theme!=='light'?'Dark':'Light'} Mode</span>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;