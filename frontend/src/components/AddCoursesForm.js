import { useState, useEffect } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useParams, useSearchParams , RedirectFunction , Redirect , Navigate, useNavigate} from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
const AddCoursesForm = () => {
    const params = useParams()
    const {user} = useAuthContext()
    var Course_instructor_id = ""
    const [Course_instructor_name, setCourse_instructor_name] = useState("")
    const [Course_subject, setCourse_subject] = useState("")
    const [Course_price, setCourse_price] = useState(0)
    const [Preview_link2, setPreview_link2] = useState("")
    var [Preview_link, setPreview_link] = useState("")

    const [error, setError] = useState("")
    const [newCourseId , setNewcourseId] = useState("")
    var [dakhal,setdakhal] = useState(false)
    const [Course_description , setCourse_description] = useState("")
    const [Course_photo , setCourse_photo] = useState("")
    const navigate = useNavigate()
    if(user){
        if(user.UserType!== "instructor"){
            navigate("/error404")
        }else{
            Course_instructor_id = user.id
        }
       
       
    }
   

    useEffect(() => {
        const fetchCourses = async () => {

            const response = await fetch('/api/instructor/' + Course_instructor_id)

            const json = await response.json()

            if (response.ok) {

                setCourse_instructor_name(json.Fname)
                setdakhal(true)
                console.log(json.Fname)
            }

        }

        if(user&& user.id!==null){
            fetchCourses();
        }
        

    }, [user])

    // useEffect(() => {
    //     if(dakhal===true){
    //     const fetchLast = async () => {
         
    //         console.log("DAKHAL AWE")
    //         const response = await fetch('/api/course/' + Course_instructor_id + '/last' )

    //         const json = await response.json()

    //         if (response.ok) {

    //             setNewcourseId(json._id)
    //             console.log("testing------------ "+json.Course_subject)
    //         }
    //     }
    
    
    //     fetchLast();
    // }
    // }, [])

    const handleSubmit2 = async () => {
        Preview_link = Preview_link2.split('v=')[1]
        
        handleSubmit()
    }

    const handleSubmit = async () => {
        // e.preventDefault()
        console.log("DAKHAL")

        const course = { Course_subject, Course_price, Course_instructor_id, Course_instructor_name ,Preview_link , Course_description , Course_photo}

        const response = await fetch('/api/course', {
            method: 'POST',
            url: '/api/course',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json)
            setError(json.error)
            alert('please complete the form')

        }
        if (response.ok) {
            setCourse_instructor_name("")
            setCourse_price(0)
            setCourse_subject("")
            setdakhal(true)
            console.log('new course', json)
            alert('added')
            setNewcourseId(json._id)
           
            window.location.href='/instructor/createcourse/' + json._id
           
            

        }


    }

 


    console.log(Course_price)
    console.log(Course_subject)

    return (

        <div>
             <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>
                </div>
            </nav>

            <div class="my-3 p-3 bg-body rounded shadow-sm">
                <div >


                    <h6 class="border-bottom pb-2 mb-0">Add new course</h6>
                    <label for="inputPassword5" class="form-label">Course Name</label>
                    <input type="text" value={Course_subject} onChange={(e) => setCourse_subject(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <label for="inputPassword5" class="form-label">Course Price</label>
                    <input type="number" value={Course_price} onChange={(e) => setCourse_price(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <label for="inputPassword5" class="form-label">Course Preview_link</label>
                    <input type="text" value={Preview_link2} onChange={(e) => setPreview_link2(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <label for="inputPassword5" class="form-label">Course description</label>
                    <input type="text" value={Course_description} onChange={(e) => setCourse_description(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <label for="inputPassword5" class="form-label">Course photo</label>
                    <input type="text" value={Course_photo} onChange={(e) => setCourse_photo(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <button type="submit" onClick={handleSubmit2} class="btn btn-primary">Next</button>
                    <br /> <br />
                    <label for="inputPassword5" class="form-label">Progress</label>
                    <small class="d-block text-end mt-3">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      
                    </small>
                </div>
            </div>
        </div>


    )
}

export default AddCoursesForm