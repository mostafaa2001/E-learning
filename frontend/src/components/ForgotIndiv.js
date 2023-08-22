import React, { useState, useEffect } from 'react';
import { useSignup } from "../hooks/useSignup"
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { useLogin } from '../hooks/useLogin';
import { setSubmissionErrors, SET_PAGE } from 'react-admin';
import { useParams } from 'react-router-dom'

const ForgotI= () => {
    const params = useParams()
    const[pa,SETpa] = useState(true)
    // const email = params.email
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [justifyActive2, setJustifyActive2] = useState('');
    const [show, setShow] = useState(false)
    const [flagFname, setflagFname] = useState(false)
    const [flagLname, setflagLname] = useState(false)
    const [flagPassword, setflagPassword] = useState(false)
    const [flagUsername, setflagUsername] = useState(false)
    const [flagUsername2, setflagUsername2] = useState(false)
    const [flagCondition, setflagCondition] = useState(false)
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [Email, setEmail] = useState("")
    const [Password1, setPassword1] = useState("")
    const [Password2, setPassword2] = useState("")
    var [type, setType] = useState("")
    var [id, setid] = useState("")
    const [inst, setinst] = useState("")
    const { signup, error, isLoading } = useSignup()
    const { login, errorL, isLoadingL } = useLogin()
    const [empty, setem] = useState(false)
    const[err,setErr]=useState("")

    console.log(type)
    // if(email === localStorage.getItem('Email')){
    //     SETpa(true)
    // }
    //  console.log(localStorage.getItem('Email') === null)
    const update = async (Password1,Password2) => {
        
       if(Password1 === "" || Password2 === ""){
            setErr("Please Fill All Fields ")
       }
        if(Password1 == Password2){
            //patch
        }
        else{
            setErr("Passwords Doesnt Match")
        }
        



    }
    console.log(localStorage.getItem('Email'))

    // if(email === localStorage.getItem('Email')){
    //     SETpa(true)
    // }
    return (
        <div>

            <nav class="navbar  navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">E-Learning</span>
                </div>
            </nav>

          {localStorage.getItem('Email') !== null && localStorage.getItem('type') === 'indiv'?  <MDBContainer className="p-3 my-5 d-flex flex-column w-50">




                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>

                        <strong><p>Update Password</p>
                        </strong>                          <hr />
                        <br />

                        {err!==""&&<div class="alert alert-danger" role="alert">{err}</div>}


                        <MDBInput onChange={(e) => setPassword1(e.target.value)} wrapperClass='mb-4' label='Password' id='form1' type='password' />
                        <MDBInput onChange={(e) => setPassword2(e.target.value)} wrapperClass='mb-4' label='Re-enter Password' id='form2' type='password' />



                        <MDBBtn onClick={() => update(Password1,Password2)} className="mb-4 w-100">Update Password</MDBBtn>


                    </MDBTabsPane>


                </MDBTabsContent>

            </MDBContainer>: <h1 class ='abdo'>Access Denied <i class="bi bi-exclamation-circle-fill"></i></h1>}
        </div>
    )
}

export default ForgotI