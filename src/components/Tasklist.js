import React ,{useState,useEffect}from "react";
import Navbar from './Navbar'
import Home from '../pages/Home';
import TaskHome from "../pages/TaskHome";
import UserNavbar from "./UserNavbar";

function Tasklist() {

  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
return(
  authid==2?
    <div> <Navbar/>
    <Home/>
    </div>
    :(
      <div> <UserNavbar/>
    <TaskHome/>
    </div>
  )
);
}

export default Tasklist;