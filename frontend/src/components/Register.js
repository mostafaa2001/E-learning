import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Register = () => {
    const [justifyActive, setJustifyActive] = useState('tab2');
    const [justifyActive2, setJustifyActive2] = useState('');
    const navigate = useNavigate()
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
    const [errr, seterrr] = useState(false)
    const { signup, error, isLoading } = useSignup()
    const { login, errorL, isLoadingL } = useLogin()
    const [empty, setem] = useState(false)
    const [Indiv,setIndiv] = useState([])
    const  [Coorp,setCoorp] = useState([])
    const [Inst,setInst] = useState([])
    useEffect(() => {



        const fetchindiv = async () => {

            const response = await fetch('/api/indiv/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))
                
                setIndiv(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }
        const fetchcoorp = async () => {
            const response = await fetch('/api/coorp/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))

                setCoorp(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }
        const fetchinst = async () => {
            const response = await fetch('/api/coorp/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))

                setInst(json)
                console.log(json)

            }
            // console.log(coorp[0].Fname)



        }




        fetchcoorp();


        fetchinst();
        fetchindiv();







    }, [])

    console.log(type)

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
        if(Indiv.findIndex(e => {return e.Email === Email}) === -1 && Coorp.findIndex(e => {return e.Email === Email}) === -1 && Inst.findIndex(e => {return e.Email === Email}) === -1){
            seterrr(false)
            console.log("dsfDFSGv")
            await signup(Fname, Lname, Email, Password)
        }

        else 
        seterrr(true)
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
        setem(true)
        await login(Email, Password, type)


    }
    console.log("Error  !!!!!" + errorL)


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
                    <strong><p>Register:</p>
                            </strong>                          <hr />
                           
                        <div className="text-center mb-3">
                            <p>Sign in as:</p>
                            {errorL && <div class="alert alert-danger" role="alert">{errorL}</div>}
                            {type === "" && empty && <div class="alert alert-danger" role="alert">Please choose which type of user you are</div>}
                            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                                    <MDBTabsItem>
                                        <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive2 === 'tab3'}>
                                            Instructor
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <MDBTabsLink onClick={() => handleJustifyClick('tab4')} active={justifyActive2 === 'tab4'}>
                                            Individual
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <MDBTabsLink onClick={() => handleJustifyClick('tab5')} active={justifyActive2 === 'tab5'}>
                                            Coorp
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                </MDBTabs>
                                {/* <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                            </MDBBtn> */}
                            </div>

                            {/* <p className="text-center mt-3">or:</p> */}
                        </div>

                        <MDBInput onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                        <MDBInput onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form2' type='password' />

                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="/forgotpassword">Forgot password?</a>
                        </div>

                        <MDBBtn onClick={(e) => handleSigin(e)} className="mb-4 w-100">Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="#!">Register</a></p>

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>
                    <strong><p>Register:</p>
                            </strong>                         
                        <div className="text-center mb-3">
                            {errr&& <div class="alert alert-danger" role="alert">User already exist try logging in</div>}
                            {error && <div class="alert alert-danger" role="alert">{error}</div>}
                            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>

                            </div>


                        </div>

                        <MDBInput onChange={(e) => setFname(e.target.value)} wrapperClass='mb-4' label='Fisrst Name' id='form1' type='text' />
                        <MDBInput onChange={(e) => setLname(e.target.value)} wrapperClass='mb-4' label='Last Name' id='form1' type='text' />
                        <MDBInput onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email' id='form1' type='email' />
                        <MDBInput onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Password' id='form1' type='password' />
                        <p>By signing up, you agree to our<button data-bs-toggle="modal" data-bs-target="#exampleModal4" type="button" class="btn btn-link">Terms&Privacy</button></p>

                        <div className='d-flex justify-content-center mb-4'>
                            {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' /> */}
                        </div>
                        <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Terms & Policy</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        By Accepting this form you understand that:
                                        <p>E-Learning’s mission is to improve lives through learning. We enable anyone anywhere to create and share educational content (instructors) and to access that educational content to learn (students). We consider our marketplace model the best way to offer valuable educational content to our users. We need rules to keep our platform and services safe for you, us, and our student and instructor community. These Terms apply to all your activities on the E-Learning website.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <MDBBtn disabled={isLoading} onClick={(e) => handleSignup(e)} className="mb-4 w-100">Sign up</MDBBtn>
                        <button onClick={()=>navigate('/login')}type="button" class="btn btn-link">Already have an account?</button>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
        </div>
    )
}

export default Register