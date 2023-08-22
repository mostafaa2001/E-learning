
import { xuu } from "../components/instructorViewTitle"

import {thesubject} from "../components/SubjectFilter"

function CourseTitle({course} )

{

   

     if(course.Course_instructor ===xuu){

        if(thesubject!=="")

        {

            if(course.Course_subject === thesubject)

            {

                return (

                    <div className = "course-Title">

                       

                        <p><strong>Course Title:</strong>{course.Course_title}</p>

                    </div>

                )

            }

        }

 

        else{

 

        return (

                <div className = "course-Title">

                   

                    <p><strong>Course Title:</strong>{course.Course_title}</p>

                </div>

            )

        }

    }

   

 }

 

export default CourseTitle