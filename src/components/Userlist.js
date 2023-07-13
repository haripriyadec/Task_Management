import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from './Navbar'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import AdminDisplay from "../user/AdminDisplay";
import UserDisplay from "../user/UserDisplay";

function Userlist() {
  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
return(
  authid==2?
    <div> <Navbar/>
    <AdminDisplay/>
    </div>
    :(
      <div> <Navbar/>
    <UserDisplay/>
    </div>
  )
);
}

export default Userlist;