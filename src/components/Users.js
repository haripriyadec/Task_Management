import React ,{useState,useEffect}from "react";
import axios from 'axios';
import Navbar from './Navbar'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function Users() {


  //  var department = JSON.parse(localStorage.getItem('userdata')).department.department;
const [details,setDetails]=useState([]);
const [task,setTask]=useState(JSON.parse(localStorage.getItem('userdata')).tasks);
  
useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get(`http://localhost:8017/usermanage`);
    setDetails(result.data);
    console.log(result.data);
  };
  return (
    <div><Navbar/>
 {/* {details.map((obj) => (
      <div key={obj.id}>{obj.username}</div>
    ))} */}

    <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh',color:'blue'}}>Users</h1>
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">User</th>
              <th scope="col">firstname</th>
            </tr>
          </thead>
          <tbody>
            {details.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </div>
        
  );
}

export default Users;


