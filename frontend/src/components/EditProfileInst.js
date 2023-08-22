import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Country from './Country';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Email, SentimentSatisfiedAltOutlined } from '@mui/icons-material';
const EditProfileInst = () => {
    const { user } = useAuthContext()
    const params = useParams()
    var cid = ""
    const [show, setshow] = useState(false)
    const [showmessage, setshowmessage] = useState(false)
    const [inst, setinst] = useState([]);
    const [Email, setEmail] = useState("")
    //var [course, setcourse] = useState([])
    var [Fname, setFname] = useState("")
    var [Lname, setLname] = useState("")
    var [Bio, setBio] = useState("")
    var [overAllRate, setoverAllRate] = useState(0)
    const [pass, setpass] = useState("")
    var [review, setreview] = useState([])
    var [Wallet, setWallet] = useState(0)
    const [showReview, setshowreview] = useState(false)
    const [fill, setFill] = useState(false)
    const navigate = useNavigate()
    // const profilehref = "/individual/"  + "/profile"
    if (user) {
        if (user.UserType !== "instructor") {
            navigate("/error404")
        }
        else {
            cid = user.id
        }

    }
    else {
        navigate("/error404")
    }

    console.log(user)
    useEffect(() => {



        const fetchinst = async () => {

            const response = await fetch('/api/instructor/')

            const json = await response.json()

            if (response.ok) {

                setinst(json.filter(c => { return c._id === cid }))

                console.log(json.filter(c => { return c._id === cid })[0])
                setFname(json.filter(c => { return c._id === cid })[0].Fname)
                setLname(json.filter(c => { return c._id === cid })[0].Lname)
                setEmail(json.filter(c => { return c._id === cid })[0].Email)
                setoverAllRate(json.filter(c => { return c._id === cid })[0].overAllRate)
                setBio(json.filter(c => { return c._id === cid })[0].Bio)
                setWallet(json.filter(c => { return c._id === cid })[0].Wallet)
                // console.log(json.filter(c => { return c._id === cid })[0].IReviews)
                setreview(json.filter(c => { return c._id === cid })[0].IReviews)

            }
            // console.log(coorp[0].Fname)



        }
        if (user && user.id !== null) {
            fetchinst();
        }







    }, [user])





    const handleClick2 = async (e) => {
        console.log("click2")
        setshow(false)
        if (Email === "") {
            setEmail(inst[0].Email)
        }
        if (Fname === "") {
            setFname(inst[0].Fname)
        }
        if (Lname === "") {
            setLname(inst[0].Lname)
        }
        if (Bio === "") {
            setBio(inst[0].Bio)
        }
        const inst = { Email, Fname, Lname, Bio }
        await fetch('/api/instructor/' + cid, {
            method: 'PATCH',
            body: JSON.stringify(inst),
            headers: {
                'Content-Type': 'application/json'
            },


        })

    }
    function handleClick() {
        console.log("click1")
        setshow(!show)

    }
    function setshowreviewf() {
        setshowreview(true)
    }
    const update = async (email) => {
        if (pass !== "") {
            await fetch('/api/instructor/password/' + cid, {
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

    console.log(show)
    console.log(review)
    return (
        <div>


            <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>
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
                                        <h2 class="font-weight-bold mt">{inst.Fname}</h2>
                                        <p>Instructor</p>
                                        <i class="far fa-edit fa-2x mb-4"></i>

                                    </div>

                                </div>
                                <div class="col-sm-8 bg-white rounded-right">
                                    <h3 class=" text-center">Profile Information</h3>
                                    <h6 class=" text-center">Your Rating: {overAllRate}⭐</h6>
                                    <h6 class=" text-center">Wallet: {Wallet} <i class="bi bi-cash-stack"></i></h6>
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
                                            {show === false ? <h6 class="text-muted">{Email}</h6> : <input placeholder={Email} onChange={(e) => setEmail(e.target.value)} />}
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
                                        <div class="col-sm-6">
                                            <br />

                                            {showmessage === false ? <button onClick={() => setshowmessage(!showmessage)} type="button" class="btn btn-primary">Change Password</button> : <button onClick={() => setshowmessage(!showmessage)} type="button" class="btn btn-danger">Cancel</button>}
                                            <br /> <br />
                                            {showmessage === true ? <div>{fill && <div class="alert alert-danger" role="alert">
                                                Please Type the New password
                                            </div>}<input onChange={(e) => setpass(e.target.value)} placeholder='New Password' type='password' /> <br /><button onClick={() => update()} type="button" class="btn btn-dark">Update</button></div> : <p></p>}
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <br />


                                                {show === true ? <button onClick={handleClick2} type="button" class="btn btn-danger">Update</button> : <p></p>}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <h4 class="mt-3"></h4>
                                <hr class="bg-primary" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button onClick={() => setshowreviewf()} type="button" class="btn btn-primary">View my reviews</button>
                                        <br></br>
                                        <br></br>
                                        {review &&review.length!==0? review.map((inst) => (

                                            showReview === true ? <div class='course-details'>
                                                <h4>{inst.ReviewerName}</h4>
                                                <p><strong>{inst.ReviewerReview}</strong></p>
                                            </div> : <p></p>
                                        )) : showReview? <div class="alert alert-warning" role="alert">
                                        You have no reviews
                                    </div> : <p></p>} 
                                    </div>
                                    {/* {inst.map((sub) => (

                                            <div class='course-details'>
                                                {sub}
                                                {/* <h4>{inst.IReviews}</h4> */}
                                    {/* <p>{course.IReviews.ReviewerReview}</p> */}



                                    {/* <div class="col-sm-6">
                                       efrwfe
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>

    );
}

export default EditProfileInst