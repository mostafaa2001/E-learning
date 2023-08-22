
import { useState, useEffect } from 'react'
const CourseDetails = ({ course }) => {
    const [show, setshow] = useState(false)
    const [dicount, setdicount] = useState(0)
    const [beforedicount, setbeforediscount] = useState(0)
    const [Course_price, setprice] = useState(0)
    const [courseid, setcourseid] = useState("")

   
    




    return (
        <div className='row'>
            <div className='col-3'>
                <div className='card'>
                    <img src={course.Course_photo} class="card-img-top" alt="..." />
                    <div className='card-body'>

                        <h5 class="card-title">{course.Course_subject}</h5>
                        <h6>Course Rating: {course.Course_overAllRate}</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a onClick={() => window.location.href = `${course._id}/viewcreviews`} class="btn btn-primary" key={course._id}>View Course Reviews</a>
                    </div>
                </div>
            </div>


        </div>

    )


}

export default CourseDetails