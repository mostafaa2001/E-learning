import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
const InstuctorViewCourse = () => {
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
                                        {/* {Registered_Course.findIndex(el => el.Course_id === cid) === -1 ? <button onClick={handleSubmit} type="button" class="btn btn-primary">Register</button> : <button onClick={() => window.location.href = `/mycourses/course/${cid}`} type="button" class="btn btn-primary">View Course</button>} */}


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

export default InstuctorViewCourse