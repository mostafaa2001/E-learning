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
import { getStaticContextFromError } from '@remix-run/router';

const Login = () => {
    const [email, setEmaill] = useState("")
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
    const [Password, setPassword] = useState("")
    var [type, setType] = useState("")
    var [id, setid] = useState("")
    const [inst, setinst] = useState("")
    const { signup, error, isLoading } = useSignup()
    const { login, errorL, isLoadingL } = useLogin()
    const [empty, setem] = useState(false)
    const [sentt, setsentt] = useState(false)
    const [EmailIndiv, setEmailIndiv] = useState([])
    const [EmailCoorp, setEmailCoorp] = useState([])
    const [EmailInst, setEmailInst] = useState([])
    const [err, seterr] = useState(false);
    const[errr,seterrr] = useState(false);
    const [roro,setRoro] = useState(false)


    console.log(type)

    useEffect(() => {



        const fetchindiv = async () => {

            const response = await fetch('/api/indiv/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))
                
                setEmailIndiv(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }
        const fetchcoorp = async () => {
            const response = await fetch('/api/coorp/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))

                setEmailCoorp(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }
        const fetchinst = async () => {
            const response = await fetch('/api/instructor/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))

                setEmailInst(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }




        fetchcoorp();


        fetchinst();
        fetchindiv();







    }, [])















    const handleJustifyClick = (value) => {
        console.log(value)
        if (value === justifyActive) {
            return;
        }
        if (value === "tab3" || value === "tab4" || value === "tab5") {
            setJustifyActive('tab1');
            setJustifyActive2(value);
            if (value === "tab3") {
                setType("instructor")
            }
            else if (value === "tab4") {
                setType("indiv")
            }
            else {
                setType("coorp")
            }
        }
        else {
            setJustifyActive(value);

        }


    };
    const handleSignup = async (e) => {
        e.preventDefault()

        const res = await signup(Fname, Lname, Email, Password)

        // const inst = {Fname,Lname,Email,Password}

        // const response = await fetch('/api/instructor/signup' , {
        //     method: 'POST',
        //     url: '/api/instructor/signup',
        //     body: JSON.stringify(inst),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },


        // })
        // const json = await response.json()

        // alert("d")
        // console.log(json)
        // if(!response.ok){
        //     console.log(json)
        //     if(Fname === ""){
        //         setflagFname(true)
        //     }
        //     if(Lname === ""){
        //         setflagLname(true)
        //     }
        //     if(Email === ""){
        //         setflagUsername(true)
        //     }
        //     if(Password === ""){
        //         setflagPassword(true)
        //     }
        // }
        // if(response.ok){
        //     const response2 = await fetch('/api/instructor')

        //     const json2 = await response2.json()
        //     setid(json2.slice(-1)[0]._id)
        //     console.log(json2.slice(-1)[0]._id)
        //     id = json2.slice(-1)[0]._id
        //     alert("id:"+id)
        //     alert(json2.slice(-1)[0]._id)

        //     if (response2.ok) {

        //         window.location.href='/instructor/'+id
        //     }

        //     console.log('new Instructor added',json)

        // }
    }
    const handleSigin = async (e) => {

        e.preventDefault()
        // if(Indiv.findIndex(e => {return e.Email === Email}) === -1 && Coorp.findIndex(e => {return e.Email === Email}) === -1 && Inst.findIndex(e => {return e.Email === Email}) === -1){
            console.log(EmailInst.findIndex(e => {return e.Email === Email}))
            if(EmailIndiv.findIndex(e => {return e.Email === Email}) !== -1){
                seterrr(false)
                setRoro(true)
                await login(Email, Password, "indiv")
            } 
             if(EmailInst.findIndex(e => {return e.Email === Email}) !== -1){
                setRoro(true)
                seterrr(false)
                await login(Email, Password, "instructor")
            }    
            if(EmailCoorp.findIndex(e => {return e.Email === Email}) !== -1){
                setRoro(true)
                seterrr(false)
            console.log("hna corpr")
                await login(Email, Password, "coorp")
            }
            if(EmailIndiv.findIndex(e => {return e.Email === Email}) === -1 && EmailInst.findIndex(e => {return e.Email === Email}) === -1 && EmailCoorp.findIndex(e => {return e.Email === Email}) === -1){
                setRoro(false)
                seterrr(true)
                
            }
        setem(false)
        


    }
    console.log("Error  !!!!!" + errorL)
  
    const senttt = async () => {
        if (EmailCoorp.findIndex(e => { return e.Email === email}) !== -1) {
            const i = EmailCoorp.findIndex(e => { return e.Email === email}) 
            console.log(EmailCoorp[i])
            const e = { email }
            console.log(e)
            await fetch('/api/sendemail/coorp', {
                method: 'POST',
                body: JSON.stringify(e),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
           
                
            
            localStorage.setItem('id',EmailCoorp[i]._id )
            localStorage.setItem('type', "coorp")
            setsentt(true)
            seterr(false)
        }
        else if (EmailIndiv.findIndex(e => { return e.Email === email }) !== -1) {
            const i = EmailIndiv.findIndex(e => { return e.Email === email}) 
            console.log(EmailIndiv[i])
            const e = { email }
            console.log(e)
            await fetch('/api/sendemail/indiv', {
                method: 'POST',
                body: JSON.stringify(e),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            localStorage.setItem('id',EmailIndiv[i]._id )
            localStorage.setItem('type', "indiv")
            setsentt(true)
            seterr(false)
        }
        else if (EmailInst.findIndex(e => { return e.Email === email }) !== -1) {
            const i = EmailInst.findIndex(e => { return e.Email === email}) 
            console.log(EmailInst[i])
            const e = { email }
            
            console.log(e)
            await fetch('/api/sendemail/inst', {
                method: 'POST',
                body: JSON.stringify(e),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            localStorage.setItem('id',EmailInst[i]._id )
            localStorage.setItem('type', "instructor")
            setsentt(true)
            seterr(false)
        }
        else {
            seterr(true)
        }


    }

    return (
        <div>

            <nav class="navbar  navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">E-Learning</span>
                </div>
            </nav>

            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

               

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>
                  <strong>  <p>Login:</p> </strong>
                  <hr />
                        <div className="text-center mb-3">
                            
                            {errorL && roro && <div class="alert alert-danger" role="alert">{errorL}</div>}
                 {errr &&  <div class="alert alert-danger" role="alert">Invalid Email</div>}
                            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                              
                            </div>

                            {/* <p className="text-center mt-3">or:</p> */}
                        </div>

                        <MDBInput onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                        <MDBInput onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form2' type='password' />

                        <div className="d-flex justify-content-between mx-4 mb-4">

                            <button data-bs-toggle="modal" data-bs-target="#exampleModal4" type="button" class="btn btn-link">Forgot Password?</button>
                            <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Terms & Policy</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <strong><label>Please Enter Your Email:</label></strong>
                                            {sentt && <div class="alert alert-success" role="alert">
                                                An Email has been sent to {email}
                                            </div>}
                                            {err && <div class="alert alert-danger" role="alert">
                                               Incorrect Email
                                            </div>}
                                            <input onChange={(e) => setEmaill(e.target.value)} type='email' placeholder='Email' />
                                            <hr />
                                            <button onClick={() => senttt()} type="button" class="btn btn-dark">Submit</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <MDBBtn onClick={(e) => handleSigin(e)} className="mb-4 w-100">Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="/register">Register</a></p>

                    </MDBTabsPane>

                   

                </MDBTabsContent>

            </MDBContainer>
        </div>
    )
}

export default Login