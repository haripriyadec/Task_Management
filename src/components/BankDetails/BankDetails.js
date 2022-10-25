import React from 'react'
import Navbar from '../Navbar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './BankDetails.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function BankDetails() {

  const [pan,setPan]=useState("")
  const [ACNumber,setACNumber]=useState("")
  const [ifsc, setIfsc] = useState("");
  const [firstEmployment, setFirstEmployment] = useState(false);
  const handleSubmit=()=>{  
      alert("Form submitted !!!");
  }
  return (
    <div className='bank'><Navbar/>
        <h1 style={{display: 'flex',  justifyContent:'center', margin: '50px 0' }}>PAN & Bank Details</h1>
        <div className="bankCard">
            {/* <Card.Body> */}
            
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="pan" required>
                    <Col md={4}><Form.Label>Permanent Account Number (PAN)</Form.Label></Col>
                    <Col md={8}><Form.Control  required={true}   type="text" placeholder="Enter PAN" onChange={e=>{setPan(e.target.value)}} /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="acno" required>
                  <Col md={4}><Form.Label>Account Number</Form.Label></Col>
                  <Col md={8}><Form.Control type="text" placeholder="Enter A/C Number" onChange={e=>{setACNumber(e.target.value)}}   /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="ifsc" required>
                  <Col md={4}><Form.Label>Branch IFSC Code</Form.Label></Col>
                  <Col md={8}><Form.Control type="text" placeholder="Enter IFSC Code" onChange={e=>{setIfsc(e.target.value)}}   /></Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="firstEmployment">
                  <Col md={4}><Form.Label>Is this your first employment ?</Form.Label></Col>
                  <Col md={8}>
                    {/* <BootstrapSwitchButton 
                      checked={true}
                      width={100} 
                      onlabel="Yes" 
                      offlabel="No" 
                      onChange={(checked) => {
                        setFirstEmployment(checked)
                    }}
                      />  */}
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Button className="save"  type="submit" onClick={handleSubmit}>Submit</Button>
                  </Form.Group>
                </Form>
          
            {/* </Card.Body> */}
        </div>
    </div>

  )
}

export default BankDetails