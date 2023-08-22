import React from 'react';

import Pdf from "react-to-pdf";

import { Button } from 'react-bootstrap';

import { useState } from 'react';

 

const ref = React.createRef();




const PDFmail = (props) => {

    const [down , setdown] = useState(0);

    return (

    <>

      <div className="certificate" ref={ref}>

       

       

       

        <h1 className='boodza'>{props.sname}</h1>

        <h5 className='boodza2'>Awarded for completing {props.cname} course </h5>

      </div>

 

     

      <Pdf targetRef={ref} filename={props.cname+"Certificate.pdf"}>

        {({ toPdf }) => toPdf}

      </Pdf>

    </>

  );

}

 

export default PDFmail;