import React from 'react'
import Navbar from './Navbar'
import AllItems from './AllItems'

function Training() {

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
            <div>

              <Navbar/>

              <div style={{ display: 'flex',alignItems:'center',justifyContent:'center',alignContent:'center' }}><h1>Training</h1></div>

          <div className="courses"  style={{display:'flex',flexDirection:'column'}}>
            <div className="row "  style={{display:'flex',flexDirection:'row'}}>
                    {
                        AllItems.map(({Title,url,Img,Instructor}, index) => {
                            
                           
                            return (

                                <div    style={{height:'300px',margin:'1cm',width:'300px'}}  className="card col-lg-4 col-xl-3 col-md-6  mb-3" key={index}>
                                    <img  onClick={() => openInNewTab(url)} style={{height:'4cm',width:'100%',padding:'0.2cm'}}                      src={Img}  alt="Sorry! Image is not available at this time"/>
                                    <div className="content">
                                        <h5>{ Title }</h5>
                                        <p>{ Instructor }</p>
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>
        </div>








            </div>
  )
}

export default Training