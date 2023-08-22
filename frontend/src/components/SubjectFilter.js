import {useState} from "react"

import CourseTitle from "../components/CourseTitle"

import { cu } from "../components/instructorViewTitle"

 

const SubjectFilter = () =>

{

   const[subjectName , setSubjectName] = useState("")

   const [error, setError] = useState(null)

   const[showfiltered , setShowFiltered] = useState(false)

   const [courses , setCourses] = useState(null)

 

   function clicked(){

    thesubject = subjectName

    console.log(thesubject)

    setCourses(cu)

    setShowFiltered(true)

   

   }

   

        return (

                <div className = "subjectF">  

                <label>Enter Subject Name</label>

                       <input

            type="text"

            value={subjectName}

            onChange={(e)=>setSubjectName(e.target.value)}

             

            />

             <button onClick={clicked}>Search</button>

            {error && <div className="error">{error}</div>}

 

            {showfiltered&&courses && courses.map((course) =>(

                   

                    <CourseTitle key={course._id} course = {course}  />

                   

                ))}                </div>

            )

   

   

 }

 export let thesubject = ""

 export default SubjectFilter