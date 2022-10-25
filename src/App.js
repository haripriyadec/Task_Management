import logo from './logo.svg';
///import './App.css';
import {BrowserRouter ,Navigate,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import Details  from './components/Details';
import Letter  from './components/Documents';
import DocsVerify from './components/OfferLetter';
import ServiceBond from './components/ServiceBond';
import BankDetails from './components/BankDetails/BankDetails';
import Training from './components/Training';
import Policy from './components/Policies/Policy';
import Documents from './components/Documents'
import { useNavigate } from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar';
import OfferLetter from './components/OfferLetter';
import {fetchUserData} from './components/api/Authentication'
import ProtectedRoute from './components/ProtectedRoute'



function App() {

window.onbeforeunload=closingCode;

function closingCode()
{
     // localStorage.clear();
}


  return (
    <div className="App">

      <BrowserRouter>
      {
        <Routes>
        <Route path='/logout' exact element={<Login/>}></Route>
        <Route path='/' exact  element={<Login/>}> </Route>
            <Route path='/home' exact  element={<ProtectedRoute><Home/></ProtectedRoute>}> </Route>
              <Route path='/details' element={<ProtectedRoute><Details/></ProtectedRoute>}> </Route>
              <Route path='/documents' element={<Documents/>}> </Route>
              <Route path='/offer' element={<OfferLetter/>}> </Route>
              <Route path='/service' element={<ServiceBond/>}> </Route>
              <Route path='/policy' element={<Policy/>}> </Route>
              <Route path='/bank' element={<BankDetails/>}> </Route>
              <Route path='/training' element={<Training/>}> </Route>
           </Routes> 
      }

      
    
      </BrowserRouter>
    </div>
  );
}

export default App;
