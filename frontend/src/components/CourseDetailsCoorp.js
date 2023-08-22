import { useState } from "react"

const CourseDetailsCoorp = ({course}) => {
const [show,setshow] = useState(false)
    function courseDetails(){
        setshow(true)
    }
    if(show){
        return (
            <div className = "course-details">
                <h4>{course.Course_title}</h4>
                <p><strong>Course duration:</strong>{course.Course_duration}</p>
                <p><strong>Course rating :</strong>{course.Course_overAllRate}</p>
            </div>
        )
    }
    return (
        <div className = "course-details">
            <h4>{course.Course_title}</h4>
            {!show?  <button onClick={courseDetails}>View Course Details</button>:
            <p></p>}
           
        </div>
    )
}

export default CourseDetailsCoorp