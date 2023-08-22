import { useEffect, useState } from "react"
import AddAdminForm from "../components/AddAdminForm"
import Home from "./Home"
import AddUser from "../components/AddUser";
import Reports from "../components/Reports";
import Refund from "../components/Refund";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Report } from "@mui/icons-material"
import Requests from "../components/Requests";
import Courses from "../components/CoursesAdmin";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from "react-router-dom";


const Admin = () => {

    const{user} = useAuthContext()
    const [dashboard, showdash] = useState(false)
    const [addusers, showdaddusers] = useState(true)
    const [courses, showcourses] = useState(false)
    const [requests, showrequests] = useState(false)
    const [reports, showreports] = useState(false)
    const [refunds, showrefund] = useState(false)
    const { logout } = useLogout()
    const navigate = useNavigate()

    // if(user && user.UserType !== "admin"){
    //  console.log("Fdd")
    //     navigate("/error")
    // }
   
    function dash() {
        showdash(true)
        showdaddusers(false)
        showcourses(false)
        showrequests(false)
        showreports(false)
        showrefund(false)
    }

    function add() {
        showdash(false)
        showdaddusers(true)
        showcourses(false)
        showrequests(false)
        showreports(false)
        showrefund(false)
    }
    function course() {
        showdash(false)
        showdaddusers(false)
        showcourses(true)
        showrequests(false)
        showreports(false)
        showrefund(false)
    }
    function request() {
        showdash(false)
        showdaddusers(false)
        showcourses(false)
        showrequests(true)
        showreports(false)
        showrefund(false)
    }
    function report() {
        showdash(false)
        showdaddusers(false)
        showcourses(false)
        showrequests(false)
        showreports(true)
        showrefund(false)
    }
    function refund() {
        showdash(false)
        showdaddusers(false)
        showcourses(false)
        showrequests(false)
        showreports(false)
        showrefund(true)
    }
    const handlelogout = () => {

        logout()
        navigate("/adminlogin")
    }

    return (
        <div >
            {/* <AddAdminForm/>
        <AddInstructorForm/>
        <AddCorpTraineeForm/> */}

            {/* <button onClick={event =>  window.location.href='/addAdmin'} >Add an admin</button>
    <button onClick={event =>  window.location.href='/AddInstructor'} >Add an instructor</button>
    <button onClick={event =>  window.location.href='/AddCoorp'} >Add a Coorpate Trainee</button> */}


            <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">E-Learning</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {/* <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" /> */}
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                        <a onClick={handlelogout} class="nav-link px-3" href="#">Sign out</a>
                    </div>
                </div>
            </header>
            <div class="container-fluid">
                <div class="row">
                    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div class="position-sticky pt-3 sidebar-sticky">
                            <div class="sasadiv "><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg> <br />
                                {/* <h8>  <a class="nav-link" aria-current="page" href="#">Welcome Admin</a></h8> */}

                                <a class="nav-link " href="#" role="button" aria-expanded="false">
                                    Welcome Admin
                                </a>
                               

                            </div>
                            <br />

                            <ul class="nav flex-column">
                               

                               

                                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                                    <span>Actions:</span>
                                    <a class="link-secondary" href="#" aria-label="Add a new report">
                                        <span data-feather="plus-circle" class="align-text-bottom"></span>
                                    </a>
                                </h6>

                                {addusers === false ? <button onClick={() => add()} class="nav-link btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Add users
                                </button> : <button onClick={() => add()} class="nav-link active btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Add users
                                </button>}

                                {courses === false ? <button onClick={() => course()} class="nav-link btn btn-light" >
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Add Discount to Courses
                                </button> : <button onClick={() => course()} class="nav-link active btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Add Discount to Courses
                                </button>}


                                {requests === false ? <button onClick={() => request()} class="nav-link btn btn-light" >
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Requests
                                </button> : <button onClick={() => request()} class="nav-link active btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Requests
                                </button>}


                                {reports === false ? <button onClick={() => report()} class="nav-link btn btn-light" >
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Reports
                                </button> : <button onClick={() => report()} class="nav-link active btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Reports
                                </button>}

                                {refunds === false ? <button onClick={() => refund()} class="nav-link btn btn-light" >
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Refunds
                                </button> : <button onClick={() => report()} class="nav-link active btn btn-light" href="">
                                    <span data-feather="shopping-cart" class="align-text-bottom"></span>
                                    Refunds
                                </button>}

                            </ul>

                            {/* <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                                <span>Saved reports</span>
                                <a class="link-secondary" href="#" aria-label="Add a new report">
                                    <span data-feather="plus-circle" class="align-text-bottom"></span>
                                </a>
                            </h6>
                            <ul class="nav flex-column mb-2">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text" class="align-text-bottom"></span>
                                        Current month
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text" class="align-text-bottom"></span>
                                        Last quarter
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text" class="align-text-bottom"></span>
                                        Social engagement
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text" class="align-text-bottom"></span>
                                        Year-end sale
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </nav>

                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {/* <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        {dashboard === true? <h1 class="h2">Dashboard</h1>: addusers === true? <h1 class="h2">Add users</h1>:courses === true?<h1 class="h2">Courses</h1>:reports ===true? <h1 class="h2">Reports</h1>:requests === true?<h1 class="h2">Requests</h1>:<p></p>}
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group me-2">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                                </div>
                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <span data-feather="calendar" class="align-text-bottom"></span>
                                    This week
                                </button>
                            </div>
                        </div> */}
                        {addusers === true ? <AddUser /> : reports === true ? <Reports /> : refunds === true ? <Refund />: requests === true? <Requests/>: courses === true ? <Courses />:<p></p>}


                        {/*          <h2>Section title</h2> */}
                        {/* <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Header</th>
                                        <th scope="col">Header</th>
                                        <th scope="col">Header</th>
                                        <th scope="col">Header</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1,001</td>
                                        <td>random</td>
                                        <td>data</td>
                                        <td>placeholder</td>
                                        <td>text</td>
                                    </tr>
                                    <tr>
                                        <td>1,002</td>
                                        <td>placeholder</td>
                                        <td>irrelevant</td>
                                        <td>visual</td>
                                        <td>layout</td>
                                    </tr>
                                    <tr>
                                        <td>1,003</td>
                                        <td>data</td>
                                        <td>rich</td>
                                        <td>dashboard</td>
                                        <td>tabular</td>
                                    </tr>
                                    <tr>
                                        <td>1,003</td>
                                        <td>information</td>
                                        <td>placeholder</td>
                                        <td>illustrative</td>
                                        <td>data</td>
                                    </tr>
                                    <tr>
                                        <td>1,004</td>
                                        <td>text</td>
                                        <td>random</td>
                                        <td>layout</td>
                                        <td>dashboard</td>
                                    </tr>
                                    <tr>
                                        <td>1,005</td>
                                        <td>dashboard</td>
                                        <td>irrelevant</td>
                                        <td>text</td>
                                        <td>placeholder</td>
                                    </tr>
                                    <tr>
                                        <td>1,006</td>
                                        <td>dashboard</td>
                                        <td>illustrative</td>
                                        <td>rich</td>
                                        <td>data</td>
                                    </tr>
                                    <tr>
                                        <td>1,007</td>
                                        <td>placeholder</td>
                                        <td>tabular</td>
                                        <td>information</td>
                                        <td>irrelevant</td>
                                    </tr>
                                    <tr>
                                        <td>1,008</td>
                                        <td>random</td>
                                        <td>data</td>
                                        <td>placeholder</td>
                                        <td>text</td>
                                    </tr>
                                    <tr>
                                        <td>1,009</td>
                                        <td>placeholder</td>
                                        <td>irrelevant</td>
                                        <td>visual</td>
                                        <td>layout</td>
                                    </tr>
                                    <tr>
                                        <td>1,010</td>
                                        <td>data</td>
                                        <td>rich</td>
                                        <td>dashboard</td>
                                        <td>tabular</td>
                                    </tr>
                                    <tr>
                                        <td>1,011</td>
                                        <td>information</td>
                                        <td>placeholder</td>
                                        <td>illustrative</td>
                                        <td>data</td>
                                    </tr>
                                    <tr>
                                        <td>1,012</td>
                                        <td>text</td>
                                        <td>placeholder</td>
                                        <td>layout</td>
                                        <td>dashboard</td>
                                    </tr>
                                    <tr>
                                        <td>1,013</td>
                                        <td>dashboard</td>
                                        <td>irrelevant</td>
                                        <td>text</td>
                                        <td>visual</td>
                                    </tr>
                                    <tr>
                                        <td>1,014</td>
                                        <td>dashboard</td>
                                        <td>illustrative</td>
                                        <td>rich</td>
                                        <td>data</td>
                                    </tr>
                                    <tr>
                                        <td>1,015</td>
                                        <td>random</td>
                                        <td>tabular</td>
                                        <td>information</td>
                                        <td>text</td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>*/}
                    </main>
                </div>



            </div>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

            <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="dashboard.js"></script>























        </div>

    )
}
export default Admin
