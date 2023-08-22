import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { GolfCourse } from '@mui/icons-material';
const Search = () => {
    const { user } = useAuthContext()
    const [course, setCourse] = useState([])
    const [Course_instructor_name, setCourse_instructor_name] = useState("")
    const [Course_subject, setCourse_subject] = useState("")
    const [searchname, setsearch] = useState("")
    const navigate = useNavigate();
    const params = useParams()
    const id = params.id
    const search = params.name.toLocaleLowerCase()
    const search2 = params.name
    const profilehrefc = "/coorprate/profile"
    const { logout } = useLogout()
    const profilehrefI = "/individual" + "/profile"
    var type = ""
    if (user) {
        type = user.UserType
    }

    console.log(user)

    useEffect(() => {
        const fetchcourse = async () => {

            const response = await fetch('/api/course/')

            const json = await response.json()

            if (response.ok) {

                setCourse(json.filter(c => { return c.Course_instructor_name.toLowerCase().includes(search) || c.Course_subject.toLowerCase().includes(search) }))
            }

        }
        fetchcourse();

    }, [])
    function gotoSearch() {
        console.log("ggf")
        console.log(searchname)
        navigate("/search/" + searchname)
    }
    const handlelogout = () => {

        logout()
        navigate("/log")
    }
    const m = "Mat"
    console.log(m)
    function Gol(course_id) {
        if (type === "indiv")
            navigate("/individual/course/" + course_id)
        else if (type == "coorp") {
            navigate("/coorprate/course/" + course_id)
        }
        else if (type === "instructor") {
            navigate("/instructor/course/" + course_id)
        }
        else {
            navigate("/course/" + course_id)
        }
    }
    return (
        <div >
            {!user ? <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">E-Learning <i class="bi bi-book-half"></i></a>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <button class=" btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </button>
                        <button class=" btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Signup
                        </button>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter <i class="bi bi-funnel-fill"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Popular Courses</a></li>
                        {/* <li><a onClick={()=>sort("Another action")}class="dropdown-item" href="#">Another action</a></li>
                                    <li><a onClick={()=>sort("Something else here")}class="dropdown-item" href="#">Something else here</a></li> */}
                    </ul>
                </div>
                <form class="d-flex" role="search">
                    <input onChange={(e) => setsearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={() => gotoSearch()} class="btn btn-outline-success" type="submit">Search</button>
                </form>

            </nav> : user.UserType === "coorp" ? <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/coorprate">E-Learning <i class="bi bi-book-half"></i></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="dropdown">
                                {/* <a class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false"></a> */}
                                <button class="btn btn-secondary dropdown-toggle btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </button>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href={profilehrefc}>Edit Profile</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#" onClick={handlelogout} >LOG OUT <i class="bi bi-box-arrow-left"></i></a></li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <button class="btn btn-dark" onClick={() => window.location.href = `/coorp/mycourses#`}  >My Courses</button>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <input onChange={(e) => setsearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button onClick={() => gotoSearch()} class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
                : user.UserType === "indiv" ? <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/individual">E-Learning <i class="bi bi-book-half"></i></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="dropdown">
                                    {/* <a class="btn btn-secondary dropdown-toggle" href="#" type="button" data-bs-toggle="dropdown" aria-expanded="false"></a> */}
                                    <button class="btn btn-secondary dropdown-toggle btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    </button>

                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href={profilehrefI}>Edit Profile</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#" onClick={handlelogout} >LOG OUT <i class="bi bi-box-arrow-left"></i></a></li>
                                    </ul>
                                </li>

                                <li class="nav-item">
                                    <button class="btn btn-dark" onClick={() => window.location.href = `/coorp/mycourses#`}  >My Courses</button>
                                </li>

                            </ul>
                            <form class="d-flex" role="search">
                                <input onChange={(e) => setsearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button onClick={() => gotoSearch()} class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav> : <p></p>}
            <h3>Search Results for "{search2}"</h3>
            <hr />
            <div className='container'>
                <div className='row'>
                    {course.length === 0 && <strong><h1 class="abdo">Nothing found, try searching again</h1></strong>}
                    {course && course.map((course) => (
                        <div className='col-3'>
                            <div onClick={() => Gol(course._id)} className='card rounded-0'>
                                <img src={course.Course_photo} width="400"
                                    height="200" class="card-img-top rounded-0" alt="..." />
                                <div className='card-body'>
                                    <h5 class="card-title">{course.Course_subject}</h5>
                                    <hr />
                                    <p class="card-text"> <h5>Price: ${course.Course_price}</h5> <strong>Skills you'll gain: </strong>This course is done by {course.Course_instructor_name} to give you more knowledge in {course.Course_subject.split(" ")[0]}, this course has an overall {course.Course_excrcise} excercises and... </p>
                                    <a onClick={() => Gol(course._id)} class="btn  stretched-link" key={course._id}></a>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>

            </div>


        </div>
    );
}
export default Search