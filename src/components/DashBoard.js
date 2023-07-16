import React ,{useState,useEffect}from "react";
import Navbar from './Navbar'
import AdminDashboard from "./AdminDashBoard";
import UserDashboard from "./UserDashBoard";

function DashBoard() {

  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
return(
  authid==2?
    <div>
    <AdminDashboard/>
    </div>
    :(
      <div>
    <UserDashboard/>
    </div>
  )
);
}

export default DashBoard;