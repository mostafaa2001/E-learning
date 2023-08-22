import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Country from './Country';
import { useParams, useNavigation , useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const EditProfileC = () => {
    const params = useParams()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    var cid = ""
    if (user) {
        if(user.UserType !== "coorp"){
            navigate("/error404")
        }
        else{
            cid = user.id
        }
        
    }
    const [show, setshow] = useState(false)
    const [coorp, setcoorp] = useState([]);
    const [Email, setUsername] = useState("")
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [Bio, setBio] = useState("")
    const [My_Reports, setmyrep] = useState([])
    const [show2, setshow2] = useState(false)
    const [follow, setFollow] = useState("")
    const [fill, setFill] = useState(false)
    const [pass, setpass] = useState("")
    const [showmessage, setshowmessage] = useState(false)
    const profilehref = "/coorprate/" + cid + "/profile"
    useEffect(() => {



        const fetchcoorp = async () => {
            console.log(cid)
            const response = await fetch('/api/coorp/')

            const json = await response.json()

            if (response.ok) {
                // console.log(json.filter(c => { return c._id === cid }))
                setcoorp(json.filter(c => { return c._id === cid }))
                setmyrep(json.filter(c => { return c._id === cid })[0].My_Reports)
                setFname(json.filter(c => { return c._id === cid })[0].Fname)
                setLname(json.filter(c => { return c._id === cid })[0].Lname)
                setUsername(json.filter(c => { return c._id === cid })[0].Email)
                setBio(json.filter(c => { return c._id === cid })[0].Bio)
            }
            // console.log(coorp[0].Fname)



        }


        if (user && user.id !== null) {
            fetchcoorp();
        }






    }, [user])

    const handleClick2 = async (e) => {
        console.log("click2")

        if (Email === "") {
            setUsername(coorp[0].Username)
        }
        if (Fname === "") {
            setFname(coorp[0].Fname)
        }
        if (Lname === "") {
            setLname(coorp[0].Lname)
        }
        if (Bio === "") {
            setBio(coorp[0].Bio)
        }
        const coorp = { Email, Fname, Lname, Bio }
        await fetch('/api/coorp/' + cid, {
            method: 'PATCH',

            body: JSON.stringify(coorp),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        setshow(false)

        window.location.reload()

    }
    function handleClick() {
        console.log("click1")
        setshow(!show)

    }
    function setshowrep() {
        setshow2(true)
    }
    console.log(show)
    const handleFollwup = async () => {
        // alert("!!!@@@###"+follow)
    }
    const update = async (email) => {
        if (pass !== "") {
            await fetch('/api/coorp/password/' + cid, {
                method: 'PATCH',

                body: JSON.stringify({ Password: pass }),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            setshowmessage(false)
        }
        else {
            setFill(true)
        }

    }
    return (
        <div>
            <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/coorprate">E-Learning <i class="bi bi-book-half"></i></a>
                </div>
            </nav>



            <div class="bg-light">

                <div class="container">
                    <div class="row-d flex justify-content-center">
                        <div class="col-md-10 mt-5 pt-5">
                            <div class="row z-depth-3">
                                <div class="col-sm-4 bg-info rounded-left">
                                    <div class="card-block text-center text-white">
                                        <i class="fas fa-user-tie fa-7x mt-5"></i>
                                        <h2 class="font-weight-bold mt">{coorp.Fname}</h2>
                                        <p>Coorpate Trainee</p>
                                        <i class="far fa-edit fa-2x mb-4"></i>

                                    </div>

                                </div>
                                <div class="col-sm-8 bg-white rounded-right">
                                    <h3 class=" text-center">Profile Information</h3>
                                    <Button onClick={() => handleClick()} variant="outlined" endIcon={<EditIcon />}>
                                        Edit
                                    </Button>
                                    <hr class="bagdge-primary mt-0 w-25" />
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <p class="font-weight-bold">First name:</p>
                                            {show === false ? <h6 class="text-muted">{Fname}</h6> : <input placeholder={Fname} onChange={(e) => setFname(e.target.value)} />}
                                        </div>

                                        <div class="col-sm-6">
                                            <p class="font-weight-bold">Email:</p>
                                            {show === false ? <h6 class="text-muted">{Email}</h6> : <input placeholder={Email} onChange={(e) => setUsername(e.target.value)} />}
                                        </div>

                                        <div class="col-sm-6">
                                            <br />
                                            <p class="font-weight-bold">Last name :</p>
                                            {show === false ? <h6 class="text-muted">{Lname}</h6> : <input placeholder={Lname} onChange={(e) => setLname(e.target.value)} />}
                                        </div>

                                        {/* <div class="col-sm-6">
                                                <br />
                                                <Country />
                                            </div> */}
                                        <div class="col-sm-6">
                                            <br />
                                            <p class="font-weight-bold">Biograhy</p>
                                            {show === false ? <h6 class="text-muted">{Bio}</h6> : <input placeholder={Bio} onChange={(e) => setBio(e.target.value)} />}
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <br />
                                                {  showmessage === false ? <button onClick={() => setshowmessage(!showmessage)} type="button" class="btn btn-primary">Change Password</button> : <button onClick={() => setshowmessage(!showmessage)} type="button" class="btn btn-danger">Cancel</button>}
                                                <br /> <br />
                                                {showmessage === true ? <div>{fill && <div class="alert alert-danger" role="alert">
                                                   Please enter a password
                                                </div>}<input onChange={(e) => setpass(e.target.value)} placeholder='New Password' type='password' /> <br /><button onClick={() => update()} type="button" class="btn btn-dark">Update</button></div> : <p></p>}

                                                {show === true ? <button onClick={handleClick2} type="button" class="btn btn-danger">Update</button> : <p></p>}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <h4 class="mt-3"></h4>
                                <hr class="bg-primary" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button onClick={() => setshowrep()} type="button" class="btn btn-primary">View my Reports</button>
                                        {My_Reports && My_Reports.length!==0? My_Reports.map((reports) => (

                                            show2 === true ? <div class='course-details'>
                                                <h4>{reports.Report_title}</h4>
                                                <hr class="bg-primary" />

                                                <p><strong>Your Report: {reports.Report_content}</strong></p>
                                                <hr class="bg-primary" />
                                                <h7>Status: {reports.Report_status}</h7> <br /> <br />
                                                {reports.Report_status !== "Resolved" ? <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4">Send a Followup</button> : <p></p>}

                                            </div> : <p></p>
                                        )) :show2? <div class="alert alert-warning" role="alert">
                                        You did not write any reports
                                    </div> : <p></p>
                                    }
                                    </div>

                                    <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Followup on A Report</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="sasadiv">
                                                        {/* <h6><strong>Please type your problem so we can help you?</strong></h6> */}
                                                    </div>
                                                    <br />
                                                    <div class="input-group">
                                                        <textarea onChange={(e) => setFollow(e.target.value)} placeholder="Followup..." class="text1"></textarea>
                                                    </div>
                                                    <br /> <br />

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button onClick={() => handleFollwup()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Send</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default EditProfileC