import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Form, FormText, Toast } from 'react-bootstrap';
import './Details.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AxiosContext } from 'react-axios/lib/components/AxiosProvider';
import Table from 'react-bootstrap/Table';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';

const Details = () => {
  const [show, setShow] = useState(false);
  const [authid, setAuthId] = useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);

  async function userdetails() {
    await axios.get(`http://localhost:8017/userdetails/${localStorage.getItem('username')}`).then((res) => {
      localStorage.setItem('userdata', JSON.stringify(res.data));
    });
  }

 userdetails();

  const initialValue = {
    firstname: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).firstname : '',
    lastname: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).lastname : '',
    middlename: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).middlename : '',
    pincode: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).pincode : '',
    mobilenumber: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).mobilenumber : '',
    dateofbirth: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).dateofbirth : '',
    personalemail: localStorage.getItem('userdata') != null ? JSON.parse(localStorage.getItem('userdata')).personalemail : '',
  };

  const [details, setDetails] = useState(initialValue);

  const onValueChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: `http://localhost:8017/details/${localStorage.getItem('username')}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('USER_KEY'),
        'Content-Type': 'application/json',
      },
      data: details,
    })
      .then(() => {
        toast.success('Details saved successfully');
        toggle();
      })
      .catch((res) => {
        console.log(res);
        toast.error('Try again');
      });
  };

  function toggle() {
    setShow(!show);
  }

  const viewDetails = () => {
    var em = document.getElementById('cemail').value;

    axios
      .get(`http://localhost:8017/userdetails/${em}`)
      .then((res) => {
        localStorage.setItem('canddetails', JSON.stringify(res.data));
        document.getElementById('card').style.display = 'block';
        setDetails(' ');
        toast.success('Details fetched successfully');
      })
      .catch((res) => {
        console.log(res);
        toast.error('Sorry, try again');
      });
  };

  return (
    <div >
      {authid == 2 ? (
        <div>
          <Navbar />
          <div className="details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
            <div class="form-group row mt-5">
              <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">
                Enter Email<b className="req"> *</b>
              </label>
              <div class="col-sm-10">
                <input type="email" onChange={() => { document.getElementById('card').style.display = 'none'; }} id="cemail" class="form-control form-control-sm" placeholder="Enter email address" name="cemail" />
              </div>
              <center>
                {' '}
                <Button style={{ width: '5cm' }} className="btn btn-primary" onClick={viewDetails}>
                  View Details
                </Button>
              </center>
            </div>

            <Card id="card" className="card-details mt-5">
              <Card.Body>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <b>First Name :</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).firstname : ''}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Middle Name :</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).middlename : ''}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Last Name :</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).lastname : ''}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Date Of Birth :</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).dateofbirth : ''}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Personal Email ID:</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).personalemail : ''}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Mobile Number :</b>
                      </td>
                      <td>{localStorage.getItem('canddetails') != null ? JSON.parse(localStorage.getItem('canddetails')).mobilenumber : ''}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <ToastContainer />
        </div>
      ) : show == false ? (
        <div>
          <UserNavbar />

          <div className="details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Your Personal Details</h1>
            <Card className="card-details">
              <span className="btt">
                <Button style={{ width: '5rem' }} type="submit" onClick={toggle}>
                  EDIT
                </Button>
              </span>
              <Card.Body>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <b>First Name :</b>
                      </td>
                      <td>{details.firstname}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Middle Name :</b>
                      </td>
                      <td>{details.middlename}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Last Name :</b>
                      </td>
                      <td>{details.lastname}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Date Of Birth :</b>
                      </td>
                      <td>{details.dateofbirth}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Personal Email ID:</b>
                      </td>
                      <td>{details.personalemail}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Mobile Number :</b>
                      </td>
                      <td>{details.mobilenumber}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div>
          <UserNavbar />
          <div className="details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
            <h1>Personal Details</h1>
            <Card className="card-details">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      First Name <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.firstname} required={true} name="firstname" type="text" placeholder="Enter First Name" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control value={details.middlename} name="middlename" type="text" placeholder="Enter Middle Name" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Last Name <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.lastname} name="lastname" required={true} type="text" placeholder="Enter Last Name" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Personal Email <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.personalemail} name="personalemail" required={true} type="email" placeholder="Enter email address" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Mobile Number <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.mobilenumber} name="mobilenumber" required={true} type="number" placeholder="Enter Mobile Number" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Alternate Mobile Number <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.alternatemobilenumber} name="alternatemobilenumber" required={true} type="number" placeholder="Enter Mobile Number" onChange={(e) => onValueChange(e)} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Date Of Birth <FormText className="req">*</FormText>
                    </Form.Label>
                    <Form.Control value={details.dateofbirth} required={true} name="dateofbirth" type="date" placeholder="Enter Mobile Number" onChange={(e) => onValueChange(e)} />
                  </Form.Group>
                </Form>

                <span className="btt">
                  <Button style={{ width: '5rem' }} id="save" type="submit" onClick={handleSubmit}>
                    SAVE
                  </Button>
                </span>
              </Card.Body>
            </Card>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Details;
