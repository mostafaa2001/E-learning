import React, { useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const [flagFname,setflagFname]  = useState(false)
    const [flagLname,setflagLname]  = useState(false)
    const [flagPassword,setflagPassword]  = useState(false)
    const [flagUsername,setflagUsername]  = useState(false)
    const [flagUsername2,setflagUsername2]  = useState(false)
    const [flagCondition,setflagCondition]  = useState(false)
    const [Fname,setFname] = useState("")
    const [Lname,setLname] = useState("")
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [id, setid] = useState("")



    // function gotoinst() {

    //     navigate("/instructor/" + id)
    // }
    // function gotoindiv() {

    //     navigate("/individual/" + id)
    // }
    // function gotocoorp() {
    //     navigate("/coorprate/" + id)
    // }

 const handleSignup = async () => {
     
        const inst = {Fname,Lname,Email,Password}
        const response = await fetch('/api/instructor/signup' , {
            method: 'POST',
            url: '/api/instructor/signup',
            body: JSON.stringify(inst),
            headers: {
                'Content-Type': 'application/json'
            },
            
            
        })
        const json = await response.json()
        
        alert("d")
        console.log(json)
        if(!response.ok){
            console.log(json)
            if(Fname === ""){
                setflagFname(true)
            }
            if(Lname === ""){
                setflagLname(true)
            }
            if(Email === ""){
                setflagUsername(true)
            }
            if(Password === ""){
                setflagPassword(true)
            }
        }
        if(response.ok){
         
            window.location.href='/instructor'
            console.log('new Instructor added',json)

        }
    }
    return (
        <div>
            <nav class="navbar  navbar-dark bg-dark">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">E-Learning</span>
                </div>
            </nav>
            <form class="row g-3">
                <div class="col-md-4">
                    <label for="validationServer01" class="form-label">First name</label>
                    {flagFname === true?<input onChange={(e)=>setFname(e.target.value)}type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>:<input onChange={(e)=>setFname(e.target.value)}type="text" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required/>}
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                </div>
                <div class="col-md-4">
                    <label for="validationServer02" class="form-label">Last name</label>
                    {flagLname === true?<input onChange={(e)=>setLname(e.target.value)}type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>:<input onChange={(e)=>setLname(e.target.value)}type="text" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required/>}
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                </div>
                <div class="col-md-4">
                    <label for="validationServerUsername" class="form-label">Email</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend3">@</span>
                        {flagUsername === true?<input onChange={(e)=>setEmail(e.target.value)}type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>:<input onChange={(e)=>setEmail(e.target.value)}type="text" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required/>}
                            <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                Please choose a username.
                            </div>
                    </div>
                </div>
                
                
                <div class="col-md-3">
                    <label for="validationServer05" class="form-label">Password</label>
                    {flagPassword === true?<input onChange={(e)=>setPassword(e.target.value)}type="password" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>:<input onChange={(e)=>setPassword(e.target.value)}type="password" class="form-control" id="validationServer05" aria-describedby="validationServer05Feedback" required/>}
                        <div id="validationServer05Feedback" class="invalid-feedback">
                            Please provide a password.
                        </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        {flagCondition === true?<input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required/>:<input class="form-check-input" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required/>}

                            <label class="form-check-label" for="invalidCheck3">
                                Agree to terms and conditions
                            </label>
                            <div id="invalidCheck3Feedback" class="invalid-feedback">
                                You must agree before submitting.
                            </div>
                    </div>
                </div>
                <div class="col-12">
                    <button onClick={()=>handleSignup()}class="btn btn-primary" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
        // <div class="text-center">
        //     <main className="form-signin w-100 m-auto">

        //         <form>
        //             {/* <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
        //             <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        //             <div class="form-floating">
        //                 <input onChange={(e)=>setid(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com" />
        //                 <label for="floatingInput">ID</label>
        //             </div>
        //             {/* <div class="form-floating">
        //                 <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        //                 <label for="floatingPassword">Password</label>
        //             </div> */}
        //           {show===true?  <lable class="errorsasa">Invalid ID</lable>:<p></p>}
        //             <div class="checkbox mb-3">
        //                 <br ></br>
        //                 <label>
        //                     <input type="checkbox" value="remember-me" /> Remember me
        //                 </label>
        //             </div>
        //             <button onClick={()=>gotoinst()}class="w-100 btn btn-lg btn-primary" type="submit">Sign in as Instructor</button>
        //             <br /> <br />
        //             <button onClick={()=>gotocoorp()}class="w-100 btn btn-lg btn-primary" type="submit">Sign in as Cooraprate</button>
        //             <br /> <br />
        //             <button onClick={()=>gotoindiv()}class="w-100 btn btn-lg btn-primary" type="submit">Sign in as Indivdual</button>
        //             <p class="mt-5 mb-3 text-muted">&copy; E-Learning 2022–2023</p>
        //         </form>
        //     </main>
        // </div>



    );
}

export default SignIn