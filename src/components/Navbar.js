import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { Button } from 'react-bootstrap';
import {Sidebardata} from './Sidebardata'
import './Navbar.css'
import {IconContext} from 'react-icons'
import {Link,useNavigate} from 'react-router-dom'






function Navbar()
{

    const navigate=useNavigate();

    function logOut()
    {
                localStorage.clear();
    navigate("/");
    }
    

    const [Sidebar,setSidebar]=useState(false);

    const showSidebar =()=>{
        setSidebar(!Sidebar);
    }


    return (

        <IconContext.Provider value={{color:'#fff'}}>
   <div className='navbar' style={{display:"flex",justifyContent:"space-between"}}>
    
    <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar}  />
    </Link>

    <Button style={{marginRight:"5px"}}  onClick={logOut}  >
        Logout
    </Button>

    <nav className={Sidebar?'nav-menu active':'nav-menu'}>

    <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
           <Link to='#' className='menu-bars'>
           <AiIcons.AiOutlineClose/>
           </Link> 
        </li>
        {
            Sidebardata.map((item,index)=>{
                return (
                    <li key={index} className={item.cName}>
                <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                </Link>
                     </li>
                )
            })
        }

    </ul>
    </nav>

   </div>
   </IconContext.Provider>

    );
}

export default Navbar;