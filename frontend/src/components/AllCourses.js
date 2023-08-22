import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { GolfCourse } from '@mui/icons-material'
import Tooltip from 'react-bootstrap/Tooltip';

const AllCourses = (props) => {
    console.log(props)
    const { user } = useAuthContext()
    const params = useParams()
    var id = ""
    var type = ""
    const [courses, setCourses] = useState(null)
    const navigate = useNavigate()
    const arr = [5, 8, 7, 3, 2]

    if (user) {
        id = user.id
        type = user.UserType
    }
    useEffect(() => {

        const fetchCourses = async () => {

            const response = await fetch('/api/course')



            const json = await response.json()



            if (response.ok) {
                console.log(props.filterCourse)
                if (props.filterCourse === "Popular Courses") {
                    setCourses(json.sort((a, b) => b.Enrolled - a.Enrolled))
                }
                if (props.filterCourse === "Rate") {
                    setCourses(json.sort((a, b) => b.Course_overAllRate - a.Course_overAllRate))
                }

                if (props.filterCourse === "Highest to lowest price") {
                    setCourses(json.sort((a, b) => b.Course_price - a.Course_price))
                }
                if (props.filterCourse === "Lowest to highest price") {
                    setCourses(json.sort((a, b) => a.Course_price - b.Course_price))
                }
                else {
                    setCourses(json)
                }





            }







        }

        fetchCourses();

    }, [props.filterCourse])
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
        
        <div class='container'>
            <div className='row '>

                {courses && courses.map((course) => (

                    <div className='col-3' >
                        <br />
                        <div onClick={() => Gol(course._id)} className='card carddd rounded-0 show'>
                            <img src={course.Course_photo} width="400"
                                height="200" class="card-img-top rounded-0" alt="..." />
                            <div className='card-body rounded-0 ' >
                                <h5 class="card-title"><strong>{course.Course_subject}</strong></h5>
                                <hr />
                                <p class="card-text"> <h5>Price: ${course.Course_price}</h5> <strong>Skills you'll gain: </strong>This course is done by {course.Course_instructor_name} to give you more knowledge in {course.Course_subject.split(" ")[0]}, this course has an overall {course.Course_excrcise} excercises and... </p>
                                {/* <a  class="btn btn-primary stretched-link" key={course._id} >View Course</a> */}
                                <a class=" btn   stretched-link" ></a>
                                <br/>
                                🌟{course.Course_overAllRate} ({course.Course_NumberOfRatings} reviews)
                                
                            </div>
                        </div>
                        <div class = 'info-box'id ='header_under'>ssss</div>
                    </div>

                ))}
               

            </div>

        </div>
        

    )
}
export default AllCourses