import React from 'react';

import Pdf from "react-to-pdf";

import { Button } from 'react-bootstrap';

 

const ref = React.createRef();

 

const PDF = (props) => {

  return (

    <>

      <div className="Post" ref={ref}>

        <h1>{props.title}</h1>

        <img src={props.image} alt={props.title} />

        <p>{props.content}</p>

      </div>

      <Pdf targetRef={ref} filename={props.title+".pdf"}>

        {({ toPdf }) => <Button variant="outline-success" onClick={toPdf}>Capture as PDF</Button>}

      </Pdf>

    </>

  );

}

 

export default PDF;