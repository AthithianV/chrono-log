import { Link, useLocation } from "react-router-dom";

import { navItems } from "../../utils/navItems";
import { SettingsIcon } from "../../assets/icons";
import Brand from "./Brand";

const SideNavbar = () => {
  
  const {pathname} = useLocation();

  return (
    <nav 
    className="flex flex-col justify-between h-full py-2 px-2 text-xl w-[250px] bg-secondary-bg-light dark:bg-secondary-bg-dark shadow">
      <div>

        <Brand/>
        
        <ul className="border-t-2 border-primary pt-2">
          {
            navItems.map((item, index)=>(
            <li key={index} className={`nav-item ${pathname===item.path?"bg-primary text-white hover:bg-primary":""}`}>
              <Link to={item.path} className="nav-link">
                {item.icon}
                <span className="nav-item-title">{item.name}</span>
              </Link>
            </li>))
          }
        </ul>
      
      </div>
      
      <ul>
        
        <li className={`nav-item ${pathname==="/settings"?"bg-primary text-white hover:bg-primary":""}`}>
         <Link to={"/settings"} className="nav-link">
          {SettingsIcon}
          <span className="nav-item-title">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNavbar;