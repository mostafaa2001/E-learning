
import { useState} from "react"

const CourseP = ({course}) => {
const [show,setshow] = useState(false)
   
//  <button onClick={event =>  window.location.href='/filterSubjectRate'} >Filter All courses by subject or rate</button>
 
        return(
            <div>
                <h1> {course.Course_title}</h1>

            </div>
        )
}

export default CourseP