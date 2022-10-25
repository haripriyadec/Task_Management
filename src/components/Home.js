import React, { useEffect } from 'react'
import Navbar from './Navbar'
import './Home.css'
import { Card,Button ,Form,FormText, Toast} from 'react-bootstrap'
import { useState,useRef } from 'react'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import user from './Login'
import { useNavigate } from 'react-router-dom';
import {fetchUserData} from './api/Authentication'
import axios from 'axios'

function Home(props) {


    const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);

    //console.log(authid);


  const navigate= useNavigate();

  const form = useRef();

  const [firstname,setFirstName]=useState("");
  const [middleName,setMiddleName]=useState("");
  const [lastname,setLastName]=useState("");
  const [email,setEmail]=useState("");

  const [candidateEmail,setCandidateEmail]=useState()
  const [candidatePassword,setCandidatePassword]=useState()


    

     function passwordGenerator()
    {
        var ualp="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lalp="abcdefghijklmnopqrstuvwxyz";
        var dig="0123456789";
        var sp="!@^";

        var password=""

        for(let i=0;i<2;i++)
        {
            password=password+ualp.charAt(Math.floor(Math.random()*26));
        }

        for(let i=0;i<3;i++)
        {
            password=password+lalp.charAt(Math.floor(Math.random()*26));
        }

        for(let i=0;i<1;i++)
        {
            password=password+sp.charAt(Math.floor(Math.random()*7));
        }

        for(let i=0;i<4;i++)
        {
            password=password+dig.charAt(Math.floor(Math.random()*10));
        }

          //document.getElementById("password").value=password;


          return password;

    }

    const  addCandidate = (e) =>{

     
        var cp = (passwordGenerator());

        setCandidatePassword(cp);

      document.getElementById("cpassword").value=cp;

          console.log(candidateEmail, document.getElementById("cpassword").value);


          axios.post(`http://localhost:8017/addCandidate/${candidateEmail}/${cp}`).then(res=>{
            console.log(res);

            if(res.data==false)
            {
               toast.error("Candidate exists");
            }

            else
            {

              emailjs.sendForm('service_pnzzwnz', 'template_yk5q6bt', form.current, '4Ctb_sqQaySydPYc-')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });



              toast.success("Candidate added");
            }


          }).catch(res=>{
            console.log(res);

            toast.error("try again");

          })


    }




  

  const sendEmail=(e)=>{
    e.preventDefault();

    if(!firstname||!lastname||!email)
          {
                toast.error("Fill all the required fields");
          }

          else{

            let password = passwordGenerator();

            let virtusaemail = firstname+middleName+lastname+"@virtusa.com";

            axios.post(`http://localhost:8017/generatemail/${email}/${virtusaemail}/${password}`).then(
              ()=>{
                emailjs.sendForm('service_pnzzwnz', 'template_8zsenzm', form.current, '4Ctb_sqQaySydPYc-')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
          
                toast.success("Check your mail");
              }
            ).catch(()=>{
              toast.error("Sorry try again");
            });

         
    }
      
  }

  




  return (

    
    
    authid==1 ?

    <div >
         <Navbar/>
      
       <div  className='home' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h1>Generate Your Mail Id</h1>
      <Card   className='card-home'>
      <Card.Body>

          <form  ref={form} >
          <div class="form-group row">
       <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Email
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="email"  onChange={e=>{setEmail(e.target.value)}} class="form-control form-control-sm"   placeholder='enter email address' name='email' />
        </div>
        </div>
        <div class="form-group row">
        <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">First Name
        <b className='req'> *</b>
        </label>
        <div class="col-sm-10">
        <input type="text"  onChange={e=>{setFirstName(e.target.value)}} class="form-control form-control-sm" placeholder='enter first name'  name='first_name'/>
        </div>
        </div>
        <div class="form-group row">
        <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3"> Middle Name
        </label>
        <div class="col-sm-10">
        <input type="text"   onChange={e=>{setMiddleName(e.target.value)}}  class="form-control form-control-sm" placeholder='enter middle name'  name='middle_name'/>
        </div>
        </div>
        <div class="form-group row">
        <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Last Name
        <b className='req'> *</b>
        </label>
        <div class="col-sm-10">
        <input type="text"   onChange={e=>{setLastName(e.target.value)}} class="form-control form-control-sm" placeholder='enter last name' name="last_name" />
        </div>
        </div><br></br>
          <input style={{display:"none"}} type="text" class="form-control form-control-sm" name="password"  id="password"></input>
        </form>

        <button  class="btn btn-primary "  onClick={sendEmail} >Submit</button>



      </Card.Body>
    </Card>
    </div>

    <ToastContainer/>

    </div>

      :

      (
        <div>
          <Navbar/>
          <div  className='home' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h1>Add Candidate</h1>
      <Card   className='card-home'>
      <Card.Body>

          <form  ref={form} >
          <div class="form-group row">
       <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Email
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="email"  onChange={e=>{setCandidateEmail(e.target.value)}} class="form-control form-control-sm"   placeholder='enter email address' name='cemail' />
        </div>
        </div>
        <input style={{display:"none"}} type="text" class="form-control form-control-sm" name="cpassword"  id="cpassword"></input>
        </form>

        <button  class="btn btn-primary "  onClick={addCandidate} >Add Candidate</button>



      </Card.Body>
    </Card>
    </div>

    <ToastContainer/>

    </div>
      )


  )
}

export default Home
