import { useState, useEffect } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useParams, useSearchParams, RedirectFunction, Redirect , useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
const CreateSubtitle = () => {
    const {user} = useAuthContext()
    const params = useParams()
    const CourseId = params.idC
    var Course_instructor_id = ""
    const [Name, setName] = useState("")
    var [Link, setLink] = useState("")
    const [error, setError] = useState("")
    const [Link2, setLink2] = useState("")
    const [duration,setduration] = useState([])
    const [duration2,setduration2] = useState([])
    const [Course_duration,setCourse_duration] = useState(0)
    const [show,setshow] = useState(false)
    var [No_subtitles,setnoSub] = useState(0)
    const navigate = useNavigate()
    if(user){
        if(user.UserType !== "instructor"){
            navigate("/error404")
        }
        else{
            Course_instructor_id = user.id
        }
        
        
    }
    useEffect(() => {
        const fetchCourses = async () => {

            const response = await fetch('/api/course')
            console.log(response.json)
            const json = await response.json()

            if (response.ok) {
                setnoSub(json.filter(c => { return c._id === CourseId })[0].No_subtitles)
                setduration2(json.filter(c => { return c._id === CourseId })[0].Course_duration)
                console.log(duration2)
            }





        }

        const fetchduration = async () => {
            await axios.get("https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDyom8DRF3PS61BtoCs9wkolg7hSPx9fbE").then((response) => {
                setduration(response.data.items[0].contentDetails.duration.match(/\d+/g))
                console.log("--------------")
                setduration(duration[0])
                console.log(duration)
                setCourse_duration(duration+duration2)
                console.log(Course_duration)
                // setseconds(duration[1])
                // console.log(minuets)
               
            })

        }
        if(user&&user.id!==null){
            fetchCourses();
            fetchduration();
        }
   
    }, [user])
        // const fetchduration = async () => {
            
        // console.log("DAKHAL2")
        //     await axios.get("https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDyom8DRF3PS61BtoCs9wkolg7hSPx9fbE").then((response) => {
        //         setduration(response.data.items[0].contentDetails.duration.match(/\d+/g))
        //         console.log("--------------")
        //         setminutes(duration[0])
        //         // setseconds(duration[1])
        //         // console.log(minuets)
               
        //     })

        // }
    
    

    const handleSubmit = async () => {
        // e.preventDefault()
        console.log("DAKHAL")
        Link=Link2.substr(0,8)+'"'+Link2.substr(41)
        console.log(Link)
        
           
        // fetchduration()
            
            
           
       
        const subtitle = { Name, Link, CourseId }
        const response = await fetch('/api/subtitle', {
            method: 'POST',
            url: '/api/course',
            body: JSON.stringify(subtitle),
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
            No_subtitles ++;
            console.log(No_subtitles)
            setName("")
            setLink("")
            console.log(json)
            alert('added')
            const Course = {No_subtitles}
            console.log(Course)
            const response2 = await fetch('/api/course/'+ CourseId , {
                method: 'PATCH',
                body: JSON.stringify(Course),
                headers: {
                    'Content-Type': 'application/json'
                },
                
                
            })
           
            window.location.href='/instructor/createcourse/' + CourseId+'/'+json._id
           
            

        }


    }
    console.log(Link2)
    return (
        <div>
             <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>
                </div>
            </nav>

            <div class="my-3 p-3 bg-body rounded shadow-sm">
                <div >
                     <h6 class="border-bottom pb-2 mb-0">Add new Subtitle</h6>
                    <label for="inputPassword5" class="form-label">Subtitle Name</label>
                    <input type="text" value={Name} onChange={(e) => setName(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                    <br />
                    <button type="submit" onClick={handleSubmit} class="btn btn-primary">Next</button>
                    <br /> <br />
                    <label for="inputPassword5" class="form-label">Progress</label>
                    <small class="d-block text-end mt-3">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{width: "25%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>

                    </small> 
                </div>
            </div> 
        </div>
    )
}
export default CreateSubtitle