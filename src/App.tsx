import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Tags from "./pages/Tags";
import Analytics from "./pages/Analytics";
import Pomodaro from "./pages/Pomodaro";
import Settings from "./pages/Settings";
import useTheme from "./store/theme";

function App() {

  const {theme} = useTheme();

  useEffect(()=>{
    if(theme === "dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="tags" element={<Tags/>}/>
          <Route path="analytics" element={<Analytics/>}/>
          <Route path="pomodaro" element={<Pomodaro/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
