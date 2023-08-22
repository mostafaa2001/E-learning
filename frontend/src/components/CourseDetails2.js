import { text } from "./FilterSubjectRate"
const CourseDetails2 = ({course}) => {
    
    // if(course.Course_subject === text){
        return (
            <div className = "course-details">
                <h4>{course.title}</h4>
                <p><strong>Course duration:</strong>{course.Course_duration}</p>
                <p><strong>Course rating:</strong>{course.Course_overAllRate}</p>
                <p><strong>Course price:</strong>{course.Course_price}</p>
                <p><strong>Course instructor:</strong>{course.Course_instructor}</p>
                <p>{course.createdAt}</p>
            </div>
        )
    // }
    
}

export default CourseDetails2
