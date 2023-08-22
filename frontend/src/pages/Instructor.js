import { useEffect, useState } from "react"
import AddCourseForm from "../components/AddCourseForm"
import Home from "./Home"
import CTitle from "../components/instructorViewTitle"
import FilterSubjectRate from "../components/FilterSubjectRate"
import NavbarInstructor from "../components/NavbarInstructor"
import { BrowserRouter } from "react-router-dom"
import { useParams, useSearchParams } from 'react-router-dom';
import axios from "axios"
import CourseDetails from "../components/CourseDetails"
import { subjectexported } from "../components/NavbarInstructor"
import { Form, Button, Modal } from "react-bootstrap";
import AllCourses from "../components/AllCourses"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
const Instructor = () => {
    const { user } = useAuthContext()
    const params = useParams();
    const navigate = useNavigate();
    var insid = ""
    console.log(insid)
    const [show, setshow] = useState(false)
    const [CourseFlag, setCourseFlag] = useState(false)
    const [courses2, setCourses2] = useState(null)
    const [courses, setCourses] = useState(null)
    const createExamLocation = "/instructor/" + insid + "/createExam"
    const pricefilterloc = "/instructor/" + insid + "/pricefilter"
    const createCourseloc = "/instructor/" + insid + "/createcourse"
    const [subject, setsubject] = useState('')
    const [showModal, setshowModal] = useState(false)
    const [instructor, setinstructor] = useState(null)
    const profilehref = "/instructor/profile"
    const [searchname, setsearch] = useState("")
    var [ filterrr , setfilterrr] = useState("")
    const { logout } = useLogout()
    console.log(user)
    if (user) {
        insid = user.id
    }
  
    useEffect(() => {

        const fetchCourses = async () => {
            const response = await fetch('/api/course')
            const json = await response.json()
            if (response.ok) {

                setCourses(json)
                setCourses2(json)

            }
        }

        const fetchtheinstructor = async () => {
            const response = await fetch('/api/instructor/' + insid)
            const json = await response.json()
            if (response.ok) {

                setinstructor(json)

            }
        }
        if (user && user.id !== null) {
            fetchtheinstructor();
            fetchCourses();
        }



    }, [user])
    //const filtered = employees.filter(employee => {
    //  return employee.country === 'Canada';
    console.log(subject)

    console.log(instructor)


    function setmodal() {
        setshowModal(true)
    }


    function logoutfunc() {

    }

    function clicked() {
        setshow(true)
        if (courses !== null) {
            setCourses2(courses.filter(course => { return course.Course_instructor_id === insid }))
            console.log(courses2)
        }
        console.log("clicked")

    }
    function clicked2() {
        setCourses2(courses.filter(course => { return course.Course_subject.toLowerCase() === subject.toLowerCase() }))
    }
    function Flag() {
        navigate('/instructor/mycourses')

    }
    function gotoSearch() {
        console.log("ggf")
        console.log(searchname)
        navigate("/search/" + searchname)
    }
    const handlelogout = () => {

        logout()
        navigate("/")
    }
  
    function sort(){
        
        
        setfilterrr("Popular Courses"  )        
        // window.location.reload() 
    }
    function sort2(){
        
        
        setfilterrr("Highest to lowest price"  )        
        // window.location.reload() 
    }
    function sort3(){
        
        
        setfilterrr("Rate"  )        
        // window.location.reload() 
    }
    function sort4(){
        
        
        setfilterrr("Lowest to highest price"  )        
        // window.location.reload() 
    }
    return (

        <div className="Instructor">


            <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" >E-Learning <i class="bi bi-book-half"></i></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn btn-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg></button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href={profilehref}>Edit Profile</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#" onClick={handlelogout} key={insid}>LOG OUT <i class="bi bi-box-arrow-left"></i></a></li>
                                </ul>
                            </li>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter <i class="bi bi-funnel-fill"></i>
                                </button>
                                <ul class="dropdown-menu">  
                                    <li><a onClick={()=>sort()}class="dropdown-item" href="#">Popular Courses</a></li>
                                    
                                    <li><a onClick={()=>sort3()}class="dropdown-item" href="#">Rate</a></li>
                                    
                                    <li><a onClick={()=>sort2()}class="dropdown-item" href="#">Highest to lowest price</a></li>

                                    <li><a onClick={()=>sort4()}class="dropdown-item" href="#">Lowest to highest price</a></li>
                                </ul>
                            </div>
                            <li class="nav-item">
                                <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createCourse" >Create new course</button>
                            </li>
                        
                            <li class="nav-item">
                                <button class="btn btn-dark" onClick={Flag} key={insid} >View My Courses</button>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <input onChange={(e) => setsearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button onClick={() => gotoSearch()} class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <br />



















            {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">E-learning</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome 
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>

                           
                            <li class="nav-item">
                                <a class="nav-link" onClick={setmodal} >Create new course</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href={pricefilterloc}>filter by price</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" onClick={Flag}>View my courses</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" onClick={logoutfunc}>logout</a>
                            </li>
                        </ul>
                    </div>
                    <div class="container-fluid">
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search for a Subject" aria-label="Search" onChange={e => setsubject(e.target.value)} />
                            <button class="btn btn-outline-success" type="submit" onClick={clicked2}>Search</button>
                        </div>
                    </div>
                </div>
            </nav> */}





            {/* <button onClick={clicked}>Click to view</button> */}

            <>
                <div class="modal fade" id="createCourse" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Contract</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                By Accepting this form you are willing to commit to these following conditions:
                                <div>1- All videos and meterials copyrights are transfered to SAHAJ learning and must not be shared with any one</div>
                                <div>2- 5% of the net profits made by instructor: {insid} belong to SAHAJ learning </div>
                               
                                <br /> <br />

                            </div>
                            <div class="modal-footer">
                                <button onClick= {()=>window.location.href='/instructor/createcourse'}type="button" class="btn btn-primary">Accept</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Decline</button>

                            </div>
                        </div>
                    </div>

                </div>

                {/* <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>Contract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By Accepting this form you are willing to commit to these following conditions: 
                    <div>1- All videos and meterials copyrights are transfered to SAHAJ learning and must not be shared with any one</div>
                    <div>2- 30% of the net profits made by instructor: {insid} belong to SAHAJ learning </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={event =>  window.location.href='/instructor/' + insid + '/createcourse' }>
                        Accept
                    </Button>
                    <Button variant="dark" type="button" class="btn btn-secondary" data-bs-dismiss="modal" >
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal> */}

            </>

            <AllCourses filterCourse = {filterrr}/>
<Footer/>

            {/* <button onClick={event =>  window.location.href='/'} >View All Courses</button>
            <button onClick={event =>  window.location.href='/AddCourse'} >Add A course</button>
            <button onClick={event =>  window.location.href='/ctitle'} >View your courses</button>
            <button onClick={event =>  window.location.href='/filterSubjectRate'} >Filter All courses by subject or rate</button>
 */}

        </div>

    )
}
export default Instructor
