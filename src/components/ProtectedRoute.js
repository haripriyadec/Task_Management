import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "./api/Authentication";
const ProtectedRoute = ({ children }) => {

    const [check,setCheck]=useState(false);

    const navigate=useNavigate();

        fetchUserData().then(()=>{
            setCheck(true);
        }).catch(()=>{
            navigate("/");
        })

        if(check)
        {
            return children;
        }

};

export default ProtectedRoute;