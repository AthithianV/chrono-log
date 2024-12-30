import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Tags from "./pages/Tags";
import Analytics from "./pages/Analytics";
import Pomodaro from "./pages/Pomodaro";

function App() {

  useEffect(()=>{
    const theme = localStorage.getItem("theme");
    if(theme === "dark") document.documentElement.classList.add("dark");
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="tasks" element={<Tasks/>}/>
          <Route path="tags" element={<Tags/>}/>
          <Route path="analytics" element={<Analytics/>}/>
          <Route path="pomodaro" element={<Pomodaro/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
