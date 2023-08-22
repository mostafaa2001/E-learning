import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const GuestViewCourse = () => {
    const navigate = useNavigate()
    const params = useParams()
    const cid = params.idC
    const id = params.id
    const [coursescoorp, setCoursescoorp] = useState([])
    const [courses, setCourses] = useState([])
    var [Registered_Course, setReg] = useState([])
    var [show, setshow] = useState(false)
    const [show3, setshow3] = useState(false)
    useEffect(() => {
        const fetchCourses = async () => {

            const response = await fetch('/api/course')

            const json = await response.json()

            if (response.ok) {

                setCourses(json.filter(c => { return c._id === cid }))
                console.log(Registered_Course.findIndex(el => el.Course_id === cid))
            }

        }

        
        

        fetchCourses();
        



    }, [])


    // console.log(courses.length)
    




    return (
        <div>
              <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">E-Learning <i class="bi bi-book-half"></i></a>
                </div>
            </nav>
            <br />
            {courses.map((course) => (
                <main class="container">
                    <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                        <div class="row">
                            <div class="col-md-6 px-0">
                                <h1 class="display-4 fst-italic">{course.Course_title}</h1>
                                <p class="lead my-3">{course.Course_description}</p>
                                <span>Rating:{course.Course_overAllRate}</span>
                                <br />
                                <span>Created By:{course.Course_instructor}</span>
                            </div>
                            <div class="col-md-6 bg-light text-dark">
                                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div class="col p-4 d-flex flex-column position-static">
                                        <strong class="d-inline-block mb-2 text-primary">Course Preview</strong>
                                        <iframe width="600" height="300" src={"https://www.youtube.com/embed/" + course.Preview_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <br />
                                        <button data-bs-toggle="modal" data-bs-target="#RefundPolicy"  type="button" class="btn btn-primary">Register</button> 
                                        {/* {Registered_Course.findIndex(el => el.Course_id === cid) === -1 ? <button onClick={handleSubmit} type="button" class="btn btn-primary">Register</button> : <button onClick={() => window.location.href = `/mycourses/course/${cid}`} type="button" class="btn btn-primary">View Course</button>} */}
                                        <div class="modal fade" id="RefundPolicy" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Checkout</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Login or Signup to be able to access the course

                                    <br /> <br />

                                </div>
                                <div class="modal-footer">
                                    <button onClick={() => navigate("/login")} type="button" class="btn btn-primary" data-bs-dismiss="modal">Login</button>
                                    <button onClick={() => navigate("/register")} type="button" class="btn btn-secondary" variant="Warning" data-bs-dismiss="modal" >Signup</button>

                                </div>
                            </div>
                        </div>

                    </div>



                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>


                </main>
            ))}
        </div>

    );
}

export default GuestViewCourse