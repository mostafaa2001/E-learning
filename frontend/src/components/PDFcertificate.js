import React from 'react';

import Pdf from "react-to-pdf";

import { Button } from 'react-bootstrap';

 

const ref = React.createRef();

 

const PDFcertificate = (props) => {

  return (

    <>

      <div className="certificate" ref={ref}>

       

       

       

        <h1 className='boodza'>{props.sname}</h1>

        <h5 className='boodza2'>Awarded for completing {props.cname} course </h5>

      </div>

 

     

      <Pdf targetRef={ref} filename={props.cname+"Certificate.pdf"}>

        {({ toPdf }) => <Button className="pdfbutton"  variant="outline-success" onClick={toPdf}>Capture as PDF</Button>}

      </Pdf>

    </>

  );

}

 

export default PDFcertificate;