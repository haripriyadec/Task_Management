import React, { useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './BankDetails.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BankDetails() {

  useEffect(()=>{

      setUsername(localStorage.username);
        var url  = `http://localhost:8017/userdetails/${localStorage.getItem('username')}`
        axios.get(url).then(data => {
            localStorage.setItem('authority', data.data.authorities[0].id);
            console.log("authority: "+localStorage.getItem('authority'));
        }).catch(err=>console.log("error brr"));
        if(localStorage.getItem('authority')==1){
          var url = `http://localhost:8017/bankDetails/${localStorage.getItem('username')}`;
          console.log(url+" hehe here it is")
          axios.get(url).then((data)=>{
          console.log(data)

          setPan(data.data.pan);
          setACNumber(data.data.accountNumber);
          setIfsc(data.data.ifsc);
          setFirstEmployment(data.data.firstEmployment);
          setPreviousCompany(data.data.previousCompany);
          setPreviousRole(data.data.previousRole);
          setPreviousSalary(data.data.previousSalary);   
        })
        }
  },[]) 
  const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('authority')));
  const [username,setUsername] = useState("");
  const [pan,setPan]=useState("")
  const [ACNumber,setACNumber]=useState("")
  const [ifsc, setIfsc] = useState("");
  const [firstEmployment, setFirstEmployment] = useState(false);

  const [previousCompany, setPreviousCompany] = useState("");
  const [previousSalary, setPreviousSalary] = useState();
  const [previousRole, setPreviousRole] = useState("");

  const handleSubmit=async (e)=>{  
      e.preventDefault();

      if(firstEmployment == true){
          await setPreviousCompany(null);
          await setPreviousRole(null);
          await setPreviousSalary(null);
      }
      var details = {
        username : username,
        pan : pan,
        ifsc : ifsc,
        accountNumber : ACNumber,
        firstEmployment : firstEmployment,
        previousCompany : previousCompany,
        previousRole : previousRole,
        previousSalary : previousSalary
      }
      var url = "http://localhost:8017/bankDetails";
        url+="/"+username;
        var res = await axios.put(url,details);
      toast.success("Form Submitted !!!")
  }
  const viewDetails = () => {
    var em = document.getElementById("cemail").value;
    var url = `http://localhost:8017/bankDetails/${em}`;
    console.log(url+" hehe here it is")
    axios.get(url).then((data)=>{
      console.log(data)

      setPan(data.data.pan);
      setACNumber(data.data.accountNumber);
      setIfsc(data.data.ifsc);
      setFirstEmployment(data.data.firstEmployment);
      setPreviousCompany(data.data.previousCompany);
      setPreviousRole(data.data.previousRole);
      setPreviousSalary(data.data.previousSalary);   
    })

    document.getElementById("card").style.display='block';
    toast.success("details fetched succesfully");
  }
  const prevEmployment = () => {
      return(
        <>
            <br></br><br></br>
            <Form.Group as={Row} className="mb-3" controlId="previousCompany" required>
            <Col md={4}><Form.Label>Previous Company Name</Form.Label></Col>
            <Col md={8}><Form.Control type="text" placeholder="Enter Company Name" onChange={e=>{setPreviousCompany(e.target.value)}}  value={previousCompany} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="previousRole" required>
            <Col md={4}><Form.Label>Previous Role</Form.Label></Col>
            <Col md={8}><Form.Control type="text" placeholder="Enter Designation" onChange={e=>{setPreviousRole(e.target.value)}}  value={previousRole} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="previousSalary" required>
            <Col md={4}><Form.Label>Previous Salary</Form.Label></Col>
            <Col md={8}><Form.Control type="number" placeholder="Enter Salary" onChange={e=>{setPreviousSalary(e.target.value)}}  value={previousSalary} /></Col>
            </Form.Group>
        </>
      );
  }

  const renderPage = () => {
      if(authid==3)   return adminPage();
      else  return userPage();
  }
  const adminPage = () => {
      return(
        <>
            <div   className='details  ' style={{display: 'flex',  justifyContent:'center', alignItems:'center',alignContent:'center'}}>
            
            <div class="form-group row mt-5">
                <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Enter Email<b className='req'> *</b></label>
                <div class="col-sm-10">
                  <input type="email" id='cemail'  class="form-control form-control-sm"   placeholder='enter email address' name='cemail' />
                </div>
                <center>  <Button     style={{  width:'5cm'  }}  className='btn btn-primary' onClick={viewDetails} > View Details</Button></center>
            </div>
            <Card  id="card"  className="card-details mt-5">
            <Card.Body>
              <Table borderless>
              <tbody>
              <tr>
              <td><b>PAN Number :</b></td>
              <td>{pan}</td>
              </tr>
              <tr>
              <td><b>Account Number :</b></td>
              <td>{ACNumber}</td>
              </tr>
              <tr>
              <td><b>IFSC Code :</b></td>
              <td>{ifsc}</td>
              </tr>
              <tr>
              <td><b>First Employment :</b></td>
              <td>{firstEmployment?"YES":"NO"}</td>
              </tr>
              {!firstEmployment && adminPrevEmployment() }
              </tbody>
              </Table>
            </Card.Body>
            </Card>
          </div>
        </>
      )
  }
  const adminPrevEmployment = () => {
    return(
      <>
        <tr>
        <td><b>Previous Company :</b></td>
        <td>{previousCompany}</td>
        </tr>
        <tr>
        <td><b>Previous Role :</b></td>
        <td>{previousRole}</td>
        </tr>
        <tr>
        <td><b>Previous Salary :</b></td>
        <td>{previousSalary}</td>
        </tr>
      </>
    )
  }
  const userPage = () => {
    return (
      <>
          <h1 style={{display: 'flex',  justifyContent:'center', margin: '50px 0' }}>PAN & Bank Details</h1>
          <div className="bankCard">
              {/* <Card.Body> */}
              
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="pan" required>
                      <Col md={4}><Form.Label>Permanent Account Number (PAN)</Form.Label></Col>
                      <Col md={8}><Form.Control  required={true}   type="text" placeholder="Enter PAN" onChange={e=>{setPan(e.target.value)}} value={pan} /></Col>
                    </Form.Group>
  
                    <Form.Group as={Row} className="mb-3" controlId="acno" required>
                    <Col md={4}><Form.Label>Account Number</Form.Label></Col>
                    <Col md={8}><Form.Control type="text" placeholder="Enter A/C Number" onChange={e=>{setACNumber(e.target.value)}} value={ACNumber}  /></Col>
                    </Form.Group>
  
                    <Form.Group as={Row} className="mb-3" controlId="ifsc" required>
                    <Col md={4}><Form.Label>Branch IFSC Code</Form.Label></Col>
                    <Col md={8}><Form.Control type="text" placeholder="Enter IFSC Code" onChange={e=>{setIfsc(e.target.value)}}  value={ifsc} /></Col>
                    </Form.Group>
  
                    <Form.Group as={Row} className="mb-3" controlId="firstEmployment">
                    <Col md={4}><Form.Label>Is this your first employment ?</Form.Label></Col>
                    <Col md={8}>
                      <BootstrapSwitchButton 
                        checked={firstEmployment}
                        width={100} 
                        onlabel="Yes" 
                        offlabel="No" 
                        onChange={(checked) => {
                          setFirstEmployment(checked)
                      }}
                        /> 
                        </Col>
                    </Form.Group>
  
                    {!firstEmployment && prevEmployment()}
  
                    <Form.Group as={Row} className="mb-3">
                        <Button className="save"  type="submit" onClick={(e)=>handleSubmit(e)}>Submit</Button>
                    </Form.Group>
                  </Form>
            
              {/* </Card.Body> */}
          </div>
        </>
  
    )
  }
  return (
    <div className='bank'><Navbar/>
        { renderPage()  }
        <ToastContainer />
    </div>

  )
}

export default BankDetails