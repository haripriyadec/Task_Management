import logo from './logo.svg';
///import './App.css';
import {BrowserRouter ,Navigate,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import Details  from './components/Details';
import Documents from './components/Userlist'
import { useNavigate } from 'react-router-dom';
import Login from './components/Login'
import Navbar from './components/Navbar';
import OfferLetter from './components/Users';
import {fetchUserData} from './components/api/Authentication'
import ProtectedRoute from './components/ProtectedRoute'
import Userlist from './components/Userlist';
import Task from './components/Task';
import Users from './components/Users';
import Tasklist from './components/Tasklist';
import AddTask from './users/AddTask';
import EditTask from './users/EditTask';
import ViewTask from './users/ViewTask';
import TaskHome from './pages/TaskHome';
import EditUserManage from './user/EditUserManage';
import DashBoard from './components/DashBoard';
import Report from './components/Report';
import AdminReport from './reports/AdminReport';
import UserReport from './reports/UserReport';
import ViewAdminReport from './reports/ViewAdminReport';
import ViewUserReport from './reports/ViewUserReport';





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
              <Route path='/userlist' element={<Userlist/>}> </Route>
              <Route path='/tasklist' element={<Tasklist/>}> </Route>
              <Route path='/work' element={<Task/>}> </Route>
              <Route path='/candidates' element={<Users/>}> </Route>
              <Route path='/dashboard' element={<DashBoard/>}> </Route>
              <Route path='/report' element={<Report/>}> </Route>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/usertask" element={<TaskHome/>} />
          <Route exact path="/addtask" element={<AddTask />} />
          <Route exact path="/edittask/:id" element={<EditTask />} />
          <Route exact path="/viewtask/:id" element={<ViewTask />} />
          <Route exact path="/editusermange/:id" element={<EditUserManage/>}/>
          <Route exact path="/adminreport" element={<AdminReport/>}/>
          <Route exact path="/userreport" element={<UserReport/>}/>
          <Route exact path="/adminuserreport/:id" element={<ViewAdminReport/>}/>

       <Route exact path="/viewuserreport/:id" element={<ViewUserReport />} />


           </Routes> 
      }

      
    
      </BrowserRouter>
    </div>
  );
}

export default App;
