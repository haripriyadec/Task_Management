import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from './Navbar'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminDisplay from "../user/AdminDisplay";
import Home from "../pages/Home";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from "./UserNavbar";

function Userlist() {
  const [authid, setAuthId] = useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);
  const navigate = useNavigate();

  useEffect(() => {
    if (authid !== 2) {
      navigate('/home');
    }
  }, []);

  return (
    <div>
      <Navbar />
      {authid === 2 ? <AdminDisplay /> : <UserNavbar />}
    </div>
  );
}

export default Userlist;
