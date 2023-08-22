import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
const InstructorCourses = () => {
    const { user } = useAuthContext()
    var insid = ""
    const [courses, setCourses] = useState([])
    const [instructor, setinstructor] = useState(null)
    const [filterCourse, setfilterrr] = useState("")
    const navigate = useNavigate()
    if (user) {
        if (user.UserType !== "instructor") {
            navigate("/error404")
        }
        else {
            insid = user.id
        }

    }
    useEffect(() => {

        const fetchCourses = async () => {
            const response = await fetch('/api/course')
            const json = await response.json()
            if (response.ok) {

                // setCourses(json)
                console.log()
                if (filterCourse === "Highest to lowest price") {
                    setCourses(json.sort((a, b) => b.Course_price - a.Course_price))
                }
                if (filterCourse === "Lowest to highest price") {
                    setCourses(json.sort((a, b) => a.Course_price - b.Course_price))
                }
                setCourses(json.filter(course => { return course.Course_instructor_id === insid }))

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



    }, [user, filterCourse])

    function sort() {


        // setfilterrr("Popular Courses"  )        
        // window.location.reload() 
    }
    function sort2() {
        setfilterrr("Highest to lowest price")

    }
    function sort3() {


        // setfilterrr("Rate"  )        
        // window.location.reload() 
    }
    function sort4() {
        setfilterrr("Lowest to highest price")
        // window.location.reload() 
    }
    return (

        <div>
            <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>


                </div>



            </nav>
            <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter <i class="bi bi-funnel-fill"></i>
                        </button>
                        <ul class="dropdown-menu">

                            <li><a onClick={() => sort2()} class="dropdown-item" href="#">Highest to lowest price</a></li>

                            <li><a onClick={() => sort4()} class="dropdown-item" href="#">Lowest to highest price</a></li>
                        </ul>
                    </div>
            <div className='container'>
                <div className='row'>


                 
                    <hr />

                    {courses && courses.map((course) => (

                        <div className='col-3'>
                            <br />
                            <div className='card'>
                                <img src={course.Course_photo} class="card-img-top" width="400"
                                    height="200" alt="..." />
                                <div className='card-body'>
                                    <h5 class="card-title"><strong>{course.Course_subject}</strong></h5>
                                    <hr />
                                    <p class="card-title"> <h5><strong>${course.Course_price}</strong></h5></p>
                                   

                                    <a onClick={() => window.location.href = `${course._id}/viewcreviews`} class="btn stretched-link" key={course._id}></a>
                                </div>
                            </div>
                        </div>

                    ))}

                </div>

            </div>
        </div>


    )


}
export default InstructorCourses