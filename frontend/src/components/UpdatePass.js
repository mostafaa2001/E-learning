import React from 'react'
import { useState } from 'react'
const UpdatePass = () => {

    const [id, setId] = useState('')
    var [Password, setPassword] = useState('')
    var [Password2, setPassword2] = useState('')
    var [show, setshow] = useState('')
    const gototcheck = async (e) => {
        // e.preventDefault()
        //console.log(Currency)
        if (Password2 === Password) {
            const inst = { Password }
            await fetch('/api/instructor/' + id, {
                method: 'PATCH',

                body: JSON.stringify(inst),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
        } else {
            setshow(true)
        }

    }

    // gototcheck()

    return (
        <div class="text-center">
            <main className="form-signin w-100 m-auto">
            {show === true ? <lable class="errorsasa">Password Doesnt Match</lable> : <p></p>}
                <div>
                    {/* <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}
                    <h1 class="h3 mb-3 fw-normal">Change Password</h1>

                    <div class="form-floating">
                        <input type = "password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="floatingInput" placeholder="******" />
                        <label for="floatingInput">Password</label>
                    </div>
                    <div class="form-floating">
                        <input type = "password" onChange={(e) => setPassword2(e.target.value)} class="form-control" id="floatingInput" placeholder="******" />
                        <label for="floatingInput">Re-enter Password</label>
                    </div>
                    {/*<input onChange={(e) => setPassword2(e.target.value)} class="form-control" id="floatingInput" placeholder="******" />
                        <label for="floatingInput"></label> <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div> */}
                    
                    <div class="checkbox mb-3">
                        <br ></br>
                    </div>
                    <button onClick={() => gototcheck()} class="w-100 btn btn-lg btn-primary" type="submit">Change Password</button>
                </div>
            </main>
        </div>

    )
}

export default UpdatePass