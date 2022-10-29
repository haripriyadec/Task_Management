import React, { useState ,useEffect } from 'react'
import Navbar from './Navbar'
import { Card,Button ,Form,FormText, Toast} from 'react-bootstrap'
import './Details.css'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AxiosContext } from 'react-axios/lib/components/AxiosProvider';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import profilepic from '../components/profilepic.png'

const Reports = () => {

    //  console.log("hello world");
  
    const[show,setShow]=useState(false);

    const [authid,setAuthId]=useState(JSON.parse(localStorage.getItem('userdata')).authorities[0].id);

    const [pic,setPic]=useState(profilepic);

      async function charan(){

        await axios.get(`http://localhost:8017/userdetails/${localStorage.getItem('username')}`).then(res=>{
             //console.log(res);        
            localStorage.setItem('userdata',JSON.stringify(res.data));

          //console.log(JSON.parse(localStorage.getItem('userdata')).profilepic);


         })
        }

              
         
     charan();

   
    const initialValue = {
    'firstname': localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).firstname:'',
    'lastname': localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).lastname:'',
    'middlename': localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).middlename:'',
    'pincode':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).pincode:'',
    'mobilenumber':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).mobilenumber:'',
    'alternatemobilenumber':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).alternatemobilenumber:'',
    'fathername':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).fathername:'',
    'mothername':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).mothername:'',
    'fathermobilenumber':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).fathermobilenumber:'',
    'mothermobilenumber':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).mothermobilenumber:'',
    'addressone':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).addressone:'',
    'addresstwo':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).addresstwo:'',
    'dateofbirth':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).dateofbirth:'',
    'personalemail':localStorage.getItem('userdata')!=null ? JSON.parse(localStorage.getItem('userdata')).personalemail:'',
     'profilepic': JSON.parse(localStorage.getItem('userdata')).profilepic

  }    


      // const canddet={
      //         'firstname':'',
      //         'middlename':'',
      //         'lastname':'',
      //         'fathername':'',
      //         'mothername':'',
      //         'mobilenumber':'',
      //         'alternatemobilenumber':'',
      //         'fathermobilenumber':'',
      //         'mothermobilenumber':'',
      //         'addressone':'',
      //         'addresstwo':'',
      //         'dateofbirth':'',
      //         'location':'',
      //         'department':'',
      //         'salary' : '',
      //         'pincode':'',
      //         'personalemail':'',
      //         'profilepic':''

      // }



      // const [cand,setCand]=useState(canddet);

      

   const [details,setDetails]=useState(initialValue);

   const onValueChange=(e)=>
 {
       setDetails({...details,[e.target.name]:e.target.value})
 }



    const handleSubmit=()=>
    {

      // if(!details.addressone||!details.dateofbirth||!details.fathermobilenumber||!details.mothermobilenumber
      // ||!details.fathername||!details.mothername||!details.pincode||!details.firstname||!details.lastname
      // ||!details.mobilenumber||!details.personalemail||details.alternatemobilenumber)
      // {
      //    toast.error("fill all the details");
      // }

      //   else
        {

          console.log(details);
         
          axios({
            method:'POST',
            url:`http://localhost:8017/details/${localStorage.getItem('username')}`,
            headers:{
              'Authorization':'Bearer '  + localStorage.getItem('USER_KEY'),
              'Content-Type': 'application/json'
          },
           data:details
          }).then(()=>{
            console.log(details);
            toast.success("details saved successfully");
            toggle();
          }).catch(res=>{
            console.log(res);
            toast.error("try again");
          })

        }     
    }

    function toggle()
    {

      setShow(!show);

    }



    const postDetails =  async (pics)=>{

          document.getElementById('save').disabled=true;

          console.log(pics);     
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "project-pdf");
          data.append("cloud_name", "charan464");
          console.log(data);
           await fetch("https://api.cloudinary.com/v1_1/charan464/image/upload", {
            method: "post",
            body: data,
          }).then((res) => res.json()).then((data) => {

                details.profilepic=data.url;

              // console.log(details.profilepic);

             // console.log(data);

              toast.success("profile pic  uploaded succesfully");

            })
            .catch((err) => {
              console.log(err);
              toast.error("try again");
            });


            document.getElementById('save').disabled=false;
  } 


    const viewDetails =()=>{

            var em = document.getElementById("cemail").value;

            console.log(em);

           
          //  console.log(document.getElementById('card').display);


            axios.get(`http://localhost:8017/userdetails/${em}`).then(res=>{

              

                localStorage.setItem('canddetails',JSON.stringify(res.data));

              document.getElementById("card").style.display='block';

              setDetails(' ');

              toast.success("details fetched succesfully");
         }).catch(res=>{

          console.log(res);

          toast.error("sorry try again");

         })

    }

    

   
    console.log(show);

    console.log(JSON.parse(localStorage.getItem('userdata')));

  return (

      authid == 3 ? 
              <div>
                <Navbar/>
                <div   className='details  ' style={{display: 'flex',  justifyContent:'center', alignItems:'center',alignContent:'center'}}>
            
                <div class="form-group row mt-5">
       <label  for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm mb-3">Enter Email
       <b className='req'> *</b>
       </label>
        <div class="col-sm-10">
        <input type="email"  onChange={()=>{  document.getElementById("card").style.display='none';  }}       id='cemail'  class="form-control form-control-sm"   placeholder='enter email address' name='cemail' />
        </div>
      <center>  <Button     style={{  width:'5cm'  }}  className='btn btn-primary' onClick={viewDetails} > View Details</Button>
      </center></div>
            
            
            
            <Card  id="card"  className="card-details mt-5">

    <Card.Body>

    <img src={localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).profilepic : ''} className="card-image"></img>


<Table borderless>
<tbody>
<tr>
<td><b>First Name :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).firstname : ''}</td>
</tr>
<tr>
<td><b>Middle Name :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).middlename : ''}</td>
</tr>
<tr>
<td><b>Last Name :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).lastname : ''}</td>
</tr>
<tr>
<td><b>Date Of Birth :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).dateofbirth : ''}</td>
</tr>
<tr>
<td><b>Personal Email ID:</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).personalemail : ''}</td>
</tr>
<tr>
<td><b>Mobile Number :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).mobilenumber : ''}</td>
</tr>
<tr>
<td><b>Department :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).department.department : ''}</td>
</tr>
<tr>
<td><b>Role :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).role : ''}</td>
</tr>
<tr>
<td><b>Monthly Pay :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).salary : ''}</td>
</tr>
<tr>
<td><b>Alternate Mobile Number :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).alternatemobilenumber : ''}</td>
</tr>
<tr>
<td><b>Father Name :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).fathername : ''}</td>
</tr>
<tr>
<td><b>Father Mobile Number :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).fathermobilenumber : ''}</td>
</tr>
<tr>
<td><b>Mother Name :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).mothername : ''}</td>
</tr>
<tr>
<td><b>Mother Mobile Number :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).mothermobilenumber : ''}</td>
</tr>
<tr>
<td><b>Address Line 1 :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).addressone : ''}</td>
</tr>
<tr>
<td><b>Address Line 2 :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).addresstwo : ''}</td>
</tr>
<tr>
<td><b>Pincode :</b></td>
<td>{localStorage.getItem('canddetails')!=null ? JSON.parse(localStorage.getItem('canddetails')).pincode : ''}</td>
</tr>

</tbody>
</Table>



</Card.Body>
</Card>
        </div>
        <ToastContainer/>
         </div>
             

        :(
      
      show==false? 

         
        <div  ><Navbar/>
          
        <div   className='details' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <h1>Your Personal Details</h1>
          <Card  className="card-details">

          <span className='btt'>
         <Button style={{width:'5rem'}}  type="submit"  onClick={toggle} >
             EDIT
         </Button>
         </span>

          


        <Card.Body>

        <img src={details.profilepic} className="card-image"></img>
        

      <Table borderless>
      <tbody>
        <tr>
          <td><b>First Name :</b></td>
          <td>{details.firstname}</td>
        </tr>
        <tr>
          <td><b>Middle Name :</b></td>
          <td>{details.middlename}</td>
        </tr>
        <tr>
          <td><b>Last Name :</b></td>
          <td>{details.lastname}</td>
        </tr>
        <tr>
          <td><b>Date Of Birth :</b></td>
          <td>{details.dateofbirth}</td>
        </tr>
        <tr>
          <td><b>Personal Email ID:</b></td>
          <td>{details.personalemail}</td>
        </tr>
        <tr>
          <td><b>Mobile Number :</b></td>
          <td>{details.mobilenumber}</td>
        </tr>
        <tr>
          <td><b>Alternate Mobile Number :</b></td>
          <td>{details.alternatemobilenumber}</td>
        </tr>
        <tr>
          <td><b>Father Name :</b></td>
          <td>{details.fathername}</td>
        </tr>
        <tr>
          <td><b>Father Mobile Number :</b></td>
          <td>{details.fathermobilenumber}</td>
        </tr>
        <tr>
          <td><b>Mother Name :</b></td>
          <td>{details.mothername}</td>
        </tr>
        <tr>
          <td><b>Mother Mobile Number :</b></td>
          <td>{details.mothermobilenumber}</td>
        </tr>
        <tr>
          <td><b>Address Line 1 :</b></td>
          <td>{details.addressone}</td>
        </tr>
        <tr>
          <td><b>Address Line 2 :</b></td>
          <td>{details.addresstwo}</td>
        </tr>
        <tr>
          <td><b>Pincode :</b></td>
          <td>{details.pincode}</td>
        </tr>
        
        </tbody>
    </Table>
  

     
      </Card.Body>
    </Card>
          </div>
          <ToastContainer/>
      </div>
    
      

      :(

    <div ><Navbar/>
      <div   className='details' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <h1>Personal Details</h1>
        <Card  className="card-details">
    <Card.Body>
    
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>First Name <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.firstname}   required={true}  name="firstname"  type="text" placeholder="Enter First Name"  onChange={e=>{onValueChange(e)}} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Middle Name </Form.Label>
        <Form.Control value={details.middlename} name="middlename"  type="text" placeholder="Enter Middle Name"  onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Name <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.lastname}  name="lastname" required={true}   type="text" placeholder="Enter Last Name"   onChange={e=>{onValueChange(e)}} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Personal Email <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.personalemail} name="personalemail" required={true}   type="email" placeholder="Enter email address"    onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Mobile Number <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.mobilenumber} name="mobilenumber" required={true}   type="number" placeholder="Enter Mobile Number"    onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Alternate Mobile Number <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.alternatemobilenumber} name="alternatemobilenumber" required={true}   type="number" placeholder="Enter Mobile Number"   onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Date Of Birth <FormText className="req">*</FormText></Form.Label>
        <Form.Control  value={details.dateofbirth}    required={true} name="dateofbirth"  type="date" placeholder="Enter Mobile Number"  onChange={e=>
          {onValueChange(e);
          }} />
      </Form.Group>




      <Form.Group className="mb-3" >
        <Form.Label>Father's Name <FormText className="req">*</FormText></Form.Label>
        <Form.Control  value={details.fathername} name="fathername" required={true}   type="text" placeholder="Enter Father Name"  onChange={e=>{onValueChange(e)}}   />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label >Father's Mobile Number <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.fathermobilenumber} name="fathermobilenumber"  type="number" placeholder="Enter Father Mobile Number"   onChange={e=>{onValueChange(e)}}   />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Mother's Name <FormText className="req">*</FormText></Form.Label>
        <Form.Control  value={details.mothername} name="mothername"  required={true}   type="text" placeholder="Enter Mother Name"  onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Mother's Mobile Number <FormText className="req">*</FormText></Form.Label>
        <Form.Control name="mothermobilenumber" value={details.mothermobilenumber} type="number" placeholder="Enter Mother Mobile Number"   onChange={e=>{onValueChange(e)}}   />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Address Line 1 <FormText className="req">*</FormText></Form.Label>
        <Form.Control value={details.addressone} name="addressone"  required={true}  type="text" placeholder="Enter address line 1"  onChange={e=>{onValueChange(e)}}  />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control value={details.addresstwo} name="addresstwo"  type="text" placeholder="Enter address line 2"   onChange={e=>{onValueChange(e)}}   />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Pincode <FormText className="req">*</FormText></Form.Label>
        <Form.Control  value={details.pincode} name="pincode"  required={true}  type="number" placeholder="Enter pincode"   onChange={e=>{onValueChange(e)}}   />
      </Form.Group>

     
      
      </Form>

      <label class="uploadLabel" style={{backgroundColor:'rgba(241, 187, 10, 0.97)',color:'black'}} >
      <i class="fas fa-file-upload"></i> 

    <input type="file" class="uploadButton"    onChange={(e) => postDetails(e.target.files[0])}/>
    Upload Profilepic
    </label>

    <span className='btt'>
    <Button style={{width:'5rem'}} id="save" type="submit"  onClick={handleSubmit} >
         SAVE
    </Button>
    </span>

    </Card.Body>
  </Card>
        </div>
        <ToastContainer/>
    </div>))
  )
}

export default Reports;

























// import React, { useState ,useEffect, Component } from 'react'
// import Navbar from './Navbar'
// import { Card,Button ,Form,FormText, Toast} from 'react-bootstrap'
// import './Details.css'
// import {toast,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AxiosContext } from 'react-axios/lib/components/AxiosProvider';
// import axios from 'axios'
// import Table from 'react-bootstrap/Table';

// class Reports extends Component
// {

//     constructor(props)
//     {
//       super(props)
//        this.state={
//             show:false
//        }
//     }

    

        
//                details =  {
//                                   'firstname':'',
//                                   'lastname':'',
//                                   'middlename':'',
//                                   'pincode':'',
//                                   'mobilenumber':'',
//                                   'alternatemobilenumber':'',
//                                   'fathername':'',
//                                   'mothername':'',
//                                   'fathermobilenumber':'',
//                                   'mothermobilenumber':'',
//                                   'addressone':'',
//                                   'addresstwo':'',
//                                   'dateofbirth':'02/15/2001',
//                                   'personalemail':''
//                }



//      onValueChange(e)
//     {

//         //console.log(e.target.name,e.target.value);

//         this.details[e.target.name]=e.target.value
//         console.log(this.details);

//         localStorage.setItem('details',this.details);

//     }



//     handleSubmit()
//     {

//       // if(!details.ad1||!details.dob||!details.fathermobilenumber||!details.mothermobilenumber
//       // ||!details.fathername||!details.mothername||!details.pincode||!details.firstname||!details.lastname
//       // ||!details.mobilenumber||!details.personalemail)
//       // {
//       //    toast.error("fill all the details");
//       // }

//       //   else
//         {

//           var userdata = (localStorage.getItem('details'));

//           axios({
//             method:'POST',
//             url:`http://localhost:8017/details/${localStorage.getItem('username')}`,
//             headers:{
//               'Authorization':'Bearer '  + localStorage.getItem('USER_KEY'),
//               'Content-Type': 'application/json'
//           },
//            data:userdata
//           }).then(()=>{
//             toast.success("details saved successfully");
//           }).catch(res=>{
//             console.log(res);
//             toast.error("try again");
//           })

//          }

//      }


//     toggle()
//     {

//        this,

//     }

        

//         render()
//         {

//           console.log(this.state.show);

//           return (

//           this.state.show==false?
          
//           <div  ><Navbar/>
//           <div   className='details' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
//           <h1>Your Personal Details</h1>
//             <Card  className="card-details">
//           <Card.Body>
  
  
//         <Table borderless>
//         <tbody>
//           <tr>
//             <td><b>First Name :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).firstname}</td>
//           </tr>
//           <tr>
//             <td><b>Middle Name :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).middlename}</td>
//           </tr>
//           <tr>
//             <td><b>Last Name :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).lastname}</td>
//           </tr>
//           <tr>
//             <td><b>Date Of Birth :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).dateofbirth}</td>
//           </tr>
//           <tr>
//             <td><b>Personal Email ID:</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).personalemail}</td>
//           </tr>
//           <tr>
//             <td><b>Mobile Number :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).mobilenumber}</td>
//           </tr>
//           <tr>
//             <td><b>Alternate Mobile Number :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).alternatemobilenumber}</td>
//           </tr>
//           <tr>
//             <td><b>Father Name :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).fathername}</td>
//           </tr>
//           <tr>
//             <td><b>Father Mobile Number :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).fathermobilenumber}</td>
//           </tr>
//           <tr>
//             <td><b>Mother Name :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).mothername}</td>
//           </tr>
//           <tr>
//             <td><b>Mother Mobile Number :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).mothermobilenumber}</td>
//           </tr>
//           <tr>
//             <td><b>Address Line 1 :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).addressone}</td>
//           </tr>
//           <tr>
//             <td><b>Address Line 2 :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).addresstwo}</td>
//           </tr>
//           <tr>
//             <td><b>Pincode :</b></td>
//             <td>{JSON.parse(localStorage.getItem('userdata')).pincode}</td>
//           </tr>
          
//           </tbody>
//       </Table>
    
  
  
  
//           <span className='btt'>
//            <Button style={{width:'5rem'}}  type="submit"  onClick={this.toggle} >
//                EDIT
//            </Button>
//            </span>
       
//         </Card.Body>
//       </Card>
//             </div>
//             <ToastContainer/>
//         </div>:
                  
  
//     <div ><Navbar/>
//       <div   className='details' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
//         <h1>Personal Details</h1>
//         <Card  className="card-details">
//     <Card.Body>
    
//     <Form>
//       <Form.Group className="mb-3" >
//         <Form.Label>First Name <FormText className="req">*</FormText></Form.Label>
//         <Form.Control    required={true}  name="firstname"  type="text" placeholder="Enter First Name"  onChange={e=>{this.onValueChange(e)}} />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Middle Name </Form.Label>
//         <Form.Control name="middlename"  type="text" placeholder="Enter Middle Name"  onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Last Name <FormText className="req">*</FormText></Form.Label>
//         <Form.Control  name="lastname" required={true}   type="text" placeholder="Enter Last Name"   onChange={e=>{this.onValueChange(e)}} />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Personal Email <FormText className="req">*</FormText></Form.Label>
//         <Form.Control  name="personalemail" required={true}   type="email" placeholder="Enter email address"    onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Mobile Number <FormText className="req">*</FormText></Form.Label>
//         <Form.Control  name="mobilenumber" required={true}   type="number" placeholder="Enter Mobile Number"    onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Alternate Mobile Number <FormText className="req">*</FormText></Form.Label>
//         <Form.Control name="alternatemobilenumber" required={true}   type="number" placeholder="Enter Mobile Number"   onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Date Of Birth <FormText className="req">*</FormText></Form.Label>
//         <Form.Control    required={true} name="dateofbirth"  type="date" placeholder="Enter Mobile Number"    onChange={e=>
//           {this.onValueChange(e);
//           }} />
//       </Form.Group>




//       <Form.Group className="mb-3" >
//         <Form.Label>Father's Name <FormText className="req">*</FormText></Form.Label>
//         <Form.Control   name="fathername" required={true}   type="text" placeholder="Enter Father Name"  onChange={e=>{this.onValueChange(e)}}   />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label >Father's Mobile Number <FormText className="req">*</FormText></Form.Label>
//         <Form.Control name="fathermobilenumber"  type="number" placeholder="Enter Father Mobile Number"   onChange={e=>{this.onValueChange(e)}}   />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Mother's Name <FormText className="req">*</FormText></Form.Label>
//         <Form.Control   name="mothername"  required={true}   type="text" placeholder="Enter Mother Name"  onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Mother's Mobile Number <FormText className="req">*</FormText></Form.Label>
//         <Form.Control name="mothermobilenumber"  type="number" placeholder="Enter Mother Mobile Number"   onChange={e=>{this.onValueChange(e)}}   />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Address Line 1 <FormText className="req">*</FormText></Form.Label>
//         <Form.Control name="addressone"  required={true}  type="text" placeholder="Enter address line 1"  onChange={e=>{this.onValueChange(e)}}  />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Address Line 2</Form.Label>
//         <Form.Control  name="addresstwo"  type="text" placeholder="Enter address line 2"   onChange={e=>{this.onValueChange(e)}}   />
//       </Form.Group>

//       <Form.Group className="mb-3" >
//         <Form.Label>Pincode <FormText className="req">*</FormText></Form.Label>
//         <Form.Control name="pincode"  required={true}  type="number" placeholder="Enter pincode"   onChange={e=>{this.onValueChange(e)}}   />
//       </Form.Group>

      
//       </Form>

//       <span className='btt'>
//        <Button style={{width:'5rem'}}  type="submit"  onClick={this.handleSubmit} >
//             SAVE
//        </Button>
//        </span>
   
//     </Card.Body>
//   </Card>
//         </div>
//         <ToastContainer/>
//     </div>
//           )
//         }
// }


// export default Reports;

























