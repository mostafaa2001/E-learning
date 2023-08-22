import axios from 'axios'
import Iframe from 'react-iframe';
import { Navigate } from 'react-router-dom';
//  import Iframe2 from 'react-iframe'
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'
import ReactGA from 'react-ga'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import Course_Det from './CourseDetIndiv';
import YoutubeVideo from './YoutubeVideo';
import { CompressOutlined } from '@mui/icons-material';
import { useAuthContext } from '../hooks/useAuthContext';
import PDF from './PDF';

import { Button } from 'react-bootstrap';

import PDFcertificate from './PDFcertificate';

import PDFmail from './PDFmail';


const SubContent = () => {

    var jsonSub;
    const [showVideo, setVideo] = useState(false)
    const { user } = useAuthContext()
    const params = useParams()
    const cid = params.cid
    const s = params.sid
    var id = ""
    const [sid, setSid] = useState('')
    var prog = 0;
    const navigate = useNavigate()
    // const params = new URLSearchParams(window.location.search);
    // const courseId = params.get('courseId');
    const [courses, setCourse] = useState([]);
    const [Reviews, setReviews] = useState([])
    const [IReviews, setReviews2] = useState([])
    const [course_name, setcourse_name] = useState("")
    const [subtitle, setSub] = useState([]);
    const [show, setshow] = useState(false);
    const [show2, setshow2] = useState(false);
    const [subtitle2, setSub2] = useState([]);
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [instid, setinstid] = useState("")
    const [Reviewerreview, setReviewerRev] = useState("")
    const [Reviewerreview2, setReviewerRev2] = useState("")
    const examref = "/coorp/solveExam/" + cid + '/' + s
    var [prog2, setprog2] = useState(prog2);
    var [coorpoldrate, setcoorpoldrate] = useState(0)
    var [coorpoldrate2, setcoorpoldrate] = useState(0)
    const [rated, setrated] = useState(false)
    var [index, setindex] = useState(0)
    const [instructor, setinstructor] = useState(null)
    const [coorp, setcoorp] = useState([])
    var [Watched, setwatched] = useState([])
    var [Progress, setProgress] = useState(0)
    var [Registered_Course, setRegCourse] = useState([])
    var [No_subtitles, setNo] = useState(0)
    var [Refund_Requests, setRef] = useState([])
    const [price, setPrice] = useState(0)
    const [progress, setprog] = useState(0)
    const [Report_content, setReport_content] = useState("")
    const [Reports, setReports] = useState([])
    const [Report_title, setReport_title] = useState("")
    const [My_Reports, setMy_Reports] = useState([])
    const [savepdf, setsavepdf] = useState(false)
    const [notes, setnotes] = useState('')
    const [notestitle, setnotestitle] = useState('')
    const [coursename, setcoursenamw] = useState('')
    var usermail = "";
    const [mailsent, setmailsent] = useState(false);
    if (user) {
        id = user.id
        usermail = user.Email
    }


    useEffect(() => {

        const fetchcoorp = async () => {

            const response = await fetch('/api/coorp')
            console.log(response.json)
            const json = await response.json()

            if (response.ok) {
                setcoorp(json.filter(c => { return c._id === id }))
                setFname(json.filter(c => { return c._id === id })[0].Fname)
                setLname(json.filter(c => { return c._id === id })[0].Lname)
                setwatched(json.filter(c => { return c._id === id })[0].Watched)
                setRegCourse(json.filter(c => { return c._id === id })[0].Registered_Course)
                setMy_Reports(json.filter(c => { return c._id === id })[0].My_Reports)
                setprog2(json.filter(c => { return c._id === id })[0].Registered_Course.filter(c => { return c.Course_id === cid })[0].Progress)
                // var i =0
                // while (i < coorp[0].Registered_Course.length) {
                //     if (coorp[0].Registered_Course[i].Course_id === cid) {
                //         // prog1 = coorp[0].Registered_Course[i].Progress 
                //         //     break

                //     }
                // var i = 0;
                // while(i <  coorp[0].Registered_Course.length){
                //     if (coorp[0].Registered_Course[i].Course_id === cid){
                //         prog1 = coorp[0].Registered_Course[i].Progress 
                //         console.log(prog1)
                //         break
                //     }
                // }
            }





        }

        const fetchCourses = async () => {

            const response = await fetch('/api/course')
            console.log(response.json)
            const json = await response.json()

            if (response.ok) {
                setinstid(json.filter(c => { return c._id === cid })[0].Course_instructor_id)
                setCourse(json.filter(c => { return c._id === cid }))
                setReviews(json.filter(c => { return c._id === cid })[0].Reviews)
                setNo(json.filter(c => { return c._id === cid })[0].No_subtitles)
                setPrice(json.filter(c => { return c._id === cid })[0].Course_price)
                setcoursenamw(json.filter(c => { return c._id === cid })[0].Course_subject)
                // console.log(json)
                console.log("price" + " " + price)
                console.log(Reviews)

                const response2 = await fetch('/api/instructor/' + json.filter(c => { return c._id === cid })[0].Course_instructor_id)
                const json2 = await response2.json()
                console.log(response2)

                setinstructor(json2)
                setReviews2(json2.IReviews)
            }





        }





        const fetchSubtitles = async () => {

            const response = await fetch('/api/subtitle')
            console.log('ffffffff')
            jsonSub = await response.json()
            console.log(response)
            if (response.ok) {

                setSub(jsonSub.filter(c => { return c._id === s }))

            }
            if (!response.ok) {

                console.log('ffffffff')

            }




        }
        const fetchSubtitles2 = async () => {

            const response = await fetch('/api/subtitle')
            console.log('ffffffff')
            jsonSub = await response.json()
            console.log(jsonSub[0])
            if (response.ok) {

                setSub2(jsonSub.filter(c => { return c.CourseId === cid }))

            }
            if (!response.ok) {

                console.log('ffffffff')

            }




        }


        const fetchAdmin = async () => {
            const response = await fetch('/api/admin')
            const json = await response.json()
            setRef(json[0].Refund_Requests)
            setReports(json[0].Reports)


        }



        if (user && user.id !== null) {
            fetchSubtitles2();
            fetchCourses();
            fetchAdmin();
            fetchSubtitles();
            fetchcoorp();
        }


    }, [user])


    if (coorp[0] && coorp[0].Registered_Course && coorp[0].Registered_Course.findIndex(el => { return el.Course_id === cid && el.IsApproved === true }) === -1) {
        navigate("/error404");
    }

    const handleRating = (rate) => { //course
        setshow(true)

        if (courses) {

            console.log(courses)

            const idx = courses[0].Course_rating.findIndex(el => el.RaterId === id && el.RaterType === "coorprate")

            console.log(idx)

            if (idx === -1) {

                const oldrating = courses[0].Course_overAllRate

                const Num = courses[0].Course_NumberOfRatings

                const thh = ((Num * oldrating) + rate) / (Num + 1)



                handleSubmitC1(thh, Num + 1, rate)



            }

            else {

                coorpoldrate = courses[0].Course_rating[idx].Rate

                setrated(true)

                console.log(rated)

                index = idx

                const oldrating = courses[0].Course_overAllRate

                console.log("old: " + oldrating)

                const Numb = courses[0].Course_NumberOfRatings

                const thh = ((Numb * oldrating) - courses[0].Course_rating[idx].Rate) + (rate)

                console.log(courses[0].Course_rating[idx].Rate)

                const vv = thh / Numb

                console.log(vv)



                handleSubmitC2(vv, Numb, rate)



            }


        }
    }




    const handleSubmitC1 = async (rr, nn, newRate) => {


        const addition = [...courses[0].Course_rating, { Rate: newRate, RaterType: "coorprate", RaterId: id }]

        console.log(rr)

        await fetch('/api/course/' + cid, {

            method: 'PATCH',

            url: '/api/course',

            body: JSON.stringify({ Course_rating: addition, Course_overAllRate: rr, Course_NumberOfRatings: nn }),

            headers: {

                'Content-Type': 'application/json'

            },

        })

        alert('your rating was successfuly saved')


    }


    const handleSubmitC2 = async (rr, nn, newRate) => {


        courses[0].Course_rating[index].Rate = newRate

        console.log("index " + index)

        const addition2 = courses[0].Course_rating

        console.log(rr)

        await fetch('/api/course/' + cid, {

            method: 'PATCH',

            url: '/api/course',

            body: JSON.stringify({ Course_rating: addition2, Course_overAllRate: rr, Course_NumberOfRatings: nn }),

            headers: {

                'Content-Type': 'application/json'

            },

        })




    }





    const handleRating2 = (rate) => { // instructor
        setshow2(true)

        if (instructor) {

            console.log(instructor)

            const idx = instructor.rating.findIndex(el => el.RaterId === id && el.RaterType === "coorprate")

            console.log(idx)

            if (idx === -1) {

                const oldrating = instructor.overAllRate

                const Num = instructor.numberofratings

                const thh = ((Num * oldrating) + rate) / (Num + 1)

                console.log(thh)

                handleSubmitI1(thh, Num + 1, rate)



            }

            else {

                coorpoldrate2 = instructor.rating[idx].Rate

                setrated(true)

                console.log(rated)

                index = idx

                const oldrating = instructor.overAllRate

                console.log("old: " + oldrating)

                const Numb = instructor.numberofratings

                const thh = ((Numb * oldrating) - instructor.rating[idx].Rate) + (rate)

                console.log(instructor.rating[idx].Rate)

                const vv = thh / Numb

                console.log(vv)



                handleSubmitI2(vv, Numb, rate)



            }



        }



    }

    const handleSubmitI1 = async (rr, nn, newRate) => {

        // e.preventDefault()

        //console.log(Currency)

        const addition = [...instructor.rating, { Rate: newRate, RaterType: "coorprate", RaterId: id }]

        console.log(rr)

        await fetch('/api/instructor/' + instid, {

            method: 'PATCH',

            url: '/api/instructor',

            body: JSON.stringify({ rating: addition, overAllRate: rr, numberofratings: nn }),

            headers: {

                'Content-Type': 'application/json'

            },

        })



    }

    const handleSubmitI2 = async (rr, nn, newRate) => {

        instructor.rating[index].Rate = newRate

        console.log("index " + index)

        const addition2 = instructor.rating

        console.log(rr)

        await fetch('/api/instructor/' + instid, {

            method: 'PATCH',

            url: '/api/instructor',

            body: JSON.stringify({ rating: addition2, overAllRate: rr, numberofratings: nn }),

            headers: {

                'Content-Type': 'application/json'

            },

        })


    }

    const handleSave = async () => {
        if (Reviewerreview !== "") {
            alert("Thanks for your review!!")
            const Reviewss = [...Reviews, { ReviewerID: id, ReviewerName: Fname, ReviewerReview: Reviewerreview }]
            console.log(JSON.stringify(Reviewss))
            setReviews(Reviewss)
            await fetch('/api/course/' + cid, {

                method: 'PATCH',
                body: JSON.stringify({ Reviews: Reviewss }),
                headers: {
                    'Content-Type': 'application/json'
                },

            })
        }
    }

    const handleSave2 = async () => {
        if (Reviewerreview2 !== "") {
            alert("Thanks for your review!!")
            const Reviewss = [...IReviews, { ReviewerID: id, ReviewerName: Fname, ReviewerReview: Reviewerreview2 }]
            console.log(JSON.stringify(Reviewss))
            setReviews2(Reviewss)
            await fetch('/api/instructor/' + instid, {

                method: 'PATCH',
                body: JSON.stringify({ IReviews: Reviewss }),
                headers: {
                    'Content-Type': 'application/json'
                },

            })
        }
    }
    const video = async () => {
        // prog+=1;

        console.log(coorp[0].Registered_Course.filter(c => { return c.Course_id === cid })[0].Progress)
        // alert('you clicked')
        var i = 0;
        var flag = false

        while (i <= Watched.length) {

            if (Watched[i] === s) {


                flag = true
                i++
            }
            else {
                i++
            }

        }
        if (!flag) {
            const sub3 = [...Watched, s]

            await fetch('/api/coorp/' + id, {

                method: 'PATCH',
                body: JSON.stringify({ Watched: sub3 }),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            const Registered_Course2 = Registered_Course.filter(c => { return c.Course_id === cid })
            const name = Registered_Course2[0].Course_name

            const Amount = Registered_Course2[0].Amount_paid

            const app = Registered_Course2[0].IsApproved
            const watched2 = Registered_Course2[0].Watched + 1

            prog = (watched2 / No_subtitles) * 100
            setprog2(prog)

            Registered_Course = Registered_Course.filter(c => { return c.Course_id != cid })
            const Sub = [...Registered_Course, { Course_id: cid, Course_name: name, Amount_paid: Amount, Watched: watched2, Progress: prog, IsApproved: app }]

            await fetch('/api/coorp/' + id, {

                method: 'PATCH',
                body: JSON.stringify({ Registered_Course: Sub }),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            // var j = 0;
            // while(j<= Registered_Course.length){
            //     if(Registered_Course[j].Course_id === cid)

            // }
            setVideo(true)
        }
        else {
            setVideo(true)
        }






    }



    function gett(c) {

        ct = c
        console.log(ct)
        return c
    }
    const handleRefund = async () => {
        console.log(coorp[0].Registered_Course[0].Progress)
        var i = 0;
        while (i < coorp[0].Registered_Course.length) {
            if (coorp[0].Registered_Course[i].Course_id === cid) {
                console.log(price)
                if (coorp[0].Registered_Course[i].Progress < 50) {
                    const problems = [...Refund_Requests, { UserId: id, UserType: "Coorprate", Amount: price }]
                    await fetch('/api/admin', {

                        method: 'PATCH',
                        body: JSON.stringify({ Refund_Requests: problems }),
                        headers: {
                            'Content-Type': 'application/json'
                        },


                    })
                    alert("Refund Request Is Pending")
                    Registered_Course = Registered_Course.filter(c => { return c.Course_id != cid })
                    await fetch('/api/coorp/' + id, {

                        method: 'PATCH',
                        body: JSON.stringify({ Registered_Course }),
                        headers: {
                            'Content-Type': 'application/json'
                        },


                    })
                    //   < Navigate to = "http://localhost:3000/coorp/mycourses/639ee3146c190af7688e1f93"/>
                    //    return( <Navigate to = "http://localhost:3000/coorp/mycourses/639ee3146c190af7688e1f93" />);
                    window.location.href = '/coorp/mycourses/' + id
                    break
                }
                else {
                    alert("You Cant Refund Since You Have Completed " + prog2 + "%")
                    break
                }
            }
            else {
                i++
            }
        }

    }

    const handleReport = async () => {

        console.log(coorp[0].Registered_Course[0].Progress)
        if (Report_title !== "" || Report_content !== "") {
            alert("Your Report has been sent thanks for your patience")
            const Reportato = [...Reports, { UserId: id, UserType: "Coorprate", Report_title: Report_title, Report_content: Report_content, IsSeen: "Unseen" }]

            await fetch('/api/admin', {

                method: 'PATCH',
                body: JSON.stringify({ Reports: Reportato }),
                headers: {
                    'Content-Type': 'application/json'
                },


            })

            const My_reportato = [...My_Reports, { Report_title: Report_title, Report_content: Report_content, Report_status: "Report Sent!" }]
            await fetch('/api/coorp/' + id, {

                method: 'PATCH',
                body: JSON.stringify({ My_Reports: My_reportato }),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
        }
        else {
            alert("Please Fill in the field or press cancel")
        }





    }

    console.log("MAILSENT  :   " + mailsent)
    console.log(usermail)
    // if(prog2 === 100){
    //     if(mailsent === false){
    //         SendEmail()
    //         alert("email sent")
    //     }
    //     else{
    //         setmailsent(true);
    //     }



    // }
    const SendEmail = async () => {
        // const email =  usermail 
        console.log("sdFsrgGsGrsgs")
        alert("An email has been set to you!")

        await fetch('/api/sendemail/' + id + '/' + coursename, {
            method: 'POST',
            body: JSON.stringify({ email: usermail }),
            headers: {
                'Content-Type': 'application/json'
            },


        })
    }
    function savenotes() {

        setsavepdf(true);

    }



    function savenotesNot() {

        setsavepdf(false);

    }

    return (

        <div
            style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
        >
            {courses.map((course) => (

                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a

                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                        >
                            {course.Course_subject}
                        </a><br />
                        Your Progress: {prog2}%
                    </CDBSidebarHeader>


                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            {subtitle2.map((sub) => (

                                <a onClick={() => window.location.href = `/${course._id}/${sub._id}/coorp`}><CDBSidebarMenuItem icon="table">{sub.Name}</CDBSidebarMenuItem></a>

                            ))}

                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    {prog2 === 100 ? <Button data-bs-toggle="modal" data-bs-target="#cetificateModal" type="button" variant="warning">View your certificate</Button> : <p></p>}
                    <br></br>


                    <button data-bs-toggle="modal" data-bs-target="#exampleModal4" type="button" class="btn btn-danger"><i class="bi bi-exclamation-circle-fill"></i> Report a problem </button>
                    <br />
                    {/* <button data-bs-toggle="modal" data-bs-target="#exampleModal3" type="button" class="btn btn-danger"><i class="bi bi-wallet"></i> Refund Course</button> */}

                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                padding: '20px 5px',
                            }}
                        >
                            Copyrights E-Learning ©
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>

            ))}
            {/* onInferredClick={video} src={"https://www.youtube.com/embed/" + sub.Link} width="640px"
        height="320px" */}
            {subtitle.map((sub) => (

                <div>
                    {/* <div class="row">*/}
                    <div >
                        {showVideo === false ? <div class="rightSideDiv" >efd</div> : <div></div>}
                        {showVideo === false ? <div class="container2 glass">
                            <div class="vertical-center">
                                <button onClick={() => video()} type="button" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                                </svg>
                                </button>
                            </div>

                        </div>
                            : <YoutubeVideo id={sub.Link} />}
                        <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="/coorp/mycourses">E-learning</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul class="navbar-nav">

                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate Course⭐</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal2">Rate Instructor⭐</a>
                                        </li>

                                        <li class="nav-item">
                                            <a class="nav-link" href={examref}>Take Exam</a>
                                        </li>

                                        

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div class="notes">

                        <h3 align="center">Your Notes 📝:</h3>



                        <div>

                            <br></br>

                            {savepdf ? <div class="scroll">



                                <PDF title={notestitle} content={notes} />

                                <button onClick={() => savenotesNot()} type="button" class="btn btn-primary">Back to notes</button>

                            </div> : <div>

                                <div class="input-group">

                                    <input value={notestitle} onChange={(e) => setnotestitle(e.target.value)} class="form-control" aria-label="With textarea" placeholder='title of your notes'></input>

                                    <br></br>

                                </div>

                                <div class="input-group" >



                                    <textarea value={notes} onChange={(e) => setnotes(e.target.value)} class="form-control" aria-label="With textarea" rows="7" placeholder='write your notes'></textarea>

                                </div></div>}

                            <br></br>

                        </div>



                        {!savepdf ? <Button variant="info" onClick={() => savenotes()} type="button">Review Notes</Button> :



                            <p></p>}



                    </div>

                    <div class="modal fade" id="cetificateModal" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true" >

                        <div class="modal-dialog modal-xl" >

                            <div class="modal-content">

                                <div class="modal-header">

                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Your certificate</h1>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                </div>

                                <div class="modal-body">

                                    <PDFcertificate cname={coursename} sname={Fname + " " + Lname} />


                                </div>

                                <div class="modal-footer">
                                    <Button data-bs-dismiss="modal" variant="info" onClick={() => SendEmail()}>Get Certificate by mail</Button>
                                </div>


                            </div>

                        </div>

                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Rate Course</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    {show && <div class="alert alert-success" role="alert">
                                        Thanks for your rating
                                    </div>}
                                    <div class="sasadiv">
                                        <Rating
                                            onClick={handleRating}
                                        /* Available Props */
                                        />
                                    </div>
                                    <br /> <br />
                                    <div class="input-group">
                                        {/* <span class="input-group-text">With textarea</span> */}
                                        {show === true ? <textarea onChange={(e) => setReviewerRev(e.target.value)} placeholder="Tell us about your own exprience taking this course. Was it a good match for you?" class="form-control" aria-label="With textarea"></textarea> : <p></p>}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => handleSave()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>









                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Rate Instructor</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="sasadiv">
                                        {show2 && <div class="alert alert-success" role="alert">
                                            Thanks for your rating
                                        </div>}
                                        <Rating
                                            onClick={handleRating2}
                                        /* Available Props */
                                        />
                                    </div>
                                    <br /> <br />
                                    <div class="input-group">
                                        {/* <span class="input-group-text">With textarea</span> */}
                                        {show2 === true ? <textarea onChange={(e) => setReviewerRev2(e.target.value)} placeholder="Tell us about your own exprience with this instructor?" class="form-control" aria-label="With textarea"></textarea> : <p></p>}
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={() => handleSave2()} type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Refund</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="sasadiv">
                                        <h4>Are You Sure You Want To Refund This Course?</h4>
                                    </div>
                                    <br /> <br />

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button onClick={() => handleRefund()} type="button" class="btn btn-primary">Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Report</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="sasadiv">
                                        <h6><strong>Please type your problem so we can help you?</strong></h6>
                                    </div>
                                    <br />
                                    <div class="input-group">
                                        <input onChange={(e) => setReport_title(e.target.value)} placeholder="Report title" />
                                        <br />
                                        <textarea onChange={(e) => setReport_content(e.target.value)} class="text1" placeholder='How can we help you?'></textarea>
                                    </div>
                                    <br /> <br />

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button onClick={() => handleReport()} type="button" class="btn btn-primary">Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            ))
            }

        </div>




    )
}

export let ct = ""

export default SubContent;
