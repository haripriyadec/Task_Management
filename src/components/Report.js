import React ,{useState,useEffect}from "react";
import Navbar from './Navbar'
import AdminReport from "../reports/AdminReport";
import UserReport from "../reports/UserReport";

function Report() {

  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
return(
  authid==2?
    <div> <Navbar/>
    <AdminReport/>
    </div>
    :(
      <div> <Navbar/>
    <UserReport/>
    </div>
  )
);
}

export default Report;