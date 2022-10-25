import React, { useState } from 'react'
import SideNavbar from '../Navbar'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Row from 'react-bootstrap/Row'
// import PolicyCards from './PolicyCards'
import './Policy.css';
import NDA from './NDA';
import IT from './IT';
import HR from './HR';
import PolicyNav from './PolicyNav';

function Policy() {
  const [active, setActive] = useState(1);
    return (
    <div id="policy"> 
        <SideNavbar/>
        <PolicyNav setActive = {setActive} active = {active}/>
        {active===1 && <NDA />}
        {active===2 && <IT />}
        {active===3 && <HR />}
        
    </div>
  )
}

export default Policy