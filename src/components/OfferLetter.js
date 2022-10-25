import React from 'react'
import Navbar from './Navbar'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

function OfferLetter() {
  return (
    <div><Navbar/>
        <div style={{display:"flex",height:440,alignItems:"center",justifyContent:"center"}}>
     
     <Card
       bg="primary"
       text="white"
       style={{ width: '18rem',padding:10,margin:10 ,height:'15rem'}}
       className="mb-2">
       <Card.Header>Offer Letter</Card.Header>
       <Card.Body>
         <Card.Title> Download Offer Letter </Card.Title>
         <Card.Text>
           Kindly, Download the offer letter on before 25 june,as it wil be taken down after that.
         </Card.Text>
         <Button variant="warning">Download</Button>
       </Card.Body>
     </Card>
    
   </div>
    </div>
  )
}

export default OfferLetter