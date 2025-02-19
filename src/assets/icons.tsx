import { faBars, faCalendar, faChartPie, faChevronDown, faChevronUp, faFilter, faGear, faHouse, faList, faMaximize, faMinimize, faMinus, faMoon, faPause, faPlay, faPlus, faSave, faSort, faStop, faStopwatch, faSun, faTag, faWindowMaximize, faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* General */
export const AddIcon = <FontAwesomeIcon icon={faPlus}/>
export const SortIcon = <FontAwesomeIcon icon={faSort}/>
export const CloseIcon = <FontAwesomeIcon icon={faXmark}/>
export const CalenderIcon = <FontAwesomeIcon icon={faCalendar}/>

/*Navbar Icons*/
export const DashBoardIcon = <FontAwesomeIcon icon={faHouse}/>;
export const TaskIcon = <FontAwesomeIcon icon={faList}/>;
export const TagIcon = <FontAwesomeIcon icon={faTag}/>;
export const AnalyticsIcon = <FontAwesomeIcon icon={faChartPie}/>;
export const PomodaroIcon = <FontAwesomeIcon icon={faStopwatch}/>;
export const DarkThemeIcon = <FontAwesomeIcon icon={faMoon}/>;
export const LightThemeIcon = <FontAwesomeIcon icon={faSun}/>;
export const SettingsIcon = <FontAwesomeIcon icon={faGear}/>;
export const ToggleButtonIcon = <FontAwesomeIcon icon={faBars}/>;


/* Pomodaro Icons */
export const StartIcon = <FontAwesomeIcon icon={faPlay}/>;
export const PauseIcon = <FontAwesomeIcon icon={faPause}/>;
export const StopIcon = <FontAwesomeIcon icon={faStop}/>;
export const UpArrowIcon = <FontAwesomeIcon icon={faChevronUp}/>;
export const DownArrowIcon = <FontAwesomeIcon icon={faChevronDown}/>;


/* Dashboard */
export const FilterIcon = <FontAwesomeIcon icon={faFilter}/>;
export const SaveIcon = <FontAwesomeIcon icon={faSave}/>;

/* Title Bar */
export const MaximizeIcon = <FontAwesomeIcon icon={faWindowMaximize}/>;
export const MinimizeIcon = <FontAwesomeIcon icon={faMinus}/>;