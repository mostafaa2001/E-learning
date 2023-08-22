import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
const Upload = () => {
    const params = useParams()
    const {user} = useAuthContext()
    const SubID = params.idS
    var InstId = ""
    const [Link, setLink] = useState('')
    const [error, setError] = useState(null)
    var [youtubeId, setyouTubeid] = useState("")
    var [duration, setduration] = useState([])
    var [hours, sethours] = useState(0)
    var [minuets, setminutes] = useState(0)
    var [seconds, setseconds] = useState(0)
    var [flag, setflag] = useState(false)
    // const [duration,setduration] = useState([])
    var [duration2, setduration2] = useState(0)
    var [duration3, setduration3] = useState(0)
    const [Course_duration, setCourse_duration] = useState(0)
    const [show, setshow] = useState(false)
    if(user){
        InstId=user.id
    }

    // useEffect(() => {
    //     const fetchCourses = async () => {

    //         const response = await fetch('/api/course')
    //         console.log(response.json)
    //         const json = await response.json()

    //         if (response.ok) {

    //             setduration2(json.filter(c => { return c._id === CourseId })[0].Course_duration)
    //             console.log(duration2)
    //         }





    //     }

    //     const fetchduration = async () => {
    //         await axios.get("https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDyom8DRF3PS61BtoCs9wkolg7hSPx9fbE").then((response) => {
    //             setduration(response.data.items[0].contentDetails.duration.match(/\d+/g))
    //             console.log("--------------")
    //             setduration(duration[0])
    //             console.log(duration)
    //             setCourse_duration(duration+duration2)
    //             console.log(Course_duration)
    //             // setseconds(duration[1])
    //             // console.log(minuets)

    //         })

    //     }
    //     fetchCourses();
    //     fetchduration();
    // }, [])
   
    const handleSubmit = async (e) => {
        // e.preventDefault()

        var data = '/api/subtitle/' + SubID
        const Sub = { Link }
        // console.log(Sub.Link.split('v=')[1][0)
        youtubeId = JSON.stringify(Sub).substr(0, 8) + '"' + JSON.stringify(Sub).substr(41)
        console.log(youtubeId)
        console.log(JSON.stringify(Sub).substr(0, 8) + '"' + JSON.stringify(Sub).substr(41))
        const response = await fetch(data, {
            method: 'PATCH',
            body: JSON.stringify(Sub).substr(0, 8) + '"' + JSON.stringify(Sub).substr(41),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        if (response.ok) {
            setLink("")
            setflag(true)
            console.log(params.idC)
            const str1 = youtubeId.split(":")[1]
           const str2 = str1.split("}")[0]
           const str3 = str2.slice(1)
            youtubeId = str3.substr(0 , str3.length-1)
            console.log(youtubeId)
            console.log(duration)
            console.log(duration2)
            console.log(duration3)
            console.log(Course_duration)
            console.log(minuets + 'm' + seconds + 's')
    //        alert('added')
             window.location.href = '/instructor/createcourse/' + 'createexam/' + params.idC + '/' + SubID




        }



    }
    
    useEffect(() => {
        // console.log(flag)
    
        // const fetchcourse = async () => {

        //     console.log("wkjsbhwhkwskquwhskjqb")
            
        //         const response = await fetch('/api/course')

        //         const json = await response.json()
        //         console.log(json.filter(c => { return c._id === params.idC })[0])
        //         if (response.ok) {

        //             // duration2=json.filter(c => { return c._id === params.idC })[0].Course_duration
        //             console.log(duration2)


        //         }
        //         if(!response.ok){
        //             console.log("error")
        //         }
        //     }
            const fetchduration = async () => {
                console.log(youtubeId)
                await axios.get("https://www.googleapis.com/youtube/v3/videos?id=" + "CrdMFZIYoEY" + "&part=contentDetails&key=AIzaSyDyom8DRF3PS61BtoCs9wkolg7hSPx9fbE").then((response) => {
                    setduration(response.data.items[0].contentDetails.duration.match(/\d+/g))
                    console.log("--------------")
                    console.log(response)
                    setduration3(duration[0])
                    setCourse_duration(duration3+duration2)
                    // setminutes(duration[0]+minuets)
                    // setseconds(duration[1]+seconds)


                })

            }
            
        if(user&&user.id!==null){
            fetchduration();
            // fetchcourse();
        }



    }, [user])








    return (

        <div class="my-3 p-3 bg-body rounded shadow-sm">
            <div >
                <h6 class="border-bottom pb-2 mb-0">Upload Video</h6>
                <label for="inputPassword5" class="form-label">Video Link</label>
                <input type="text" value={Link} onChange={(e) => setLink(e.target.value)} class="form-control" aria-describedby="passwordHelpBlock" />
                <br />
                <button type="submit" onClick={(e) => handleSubmit(e.target.value)} class="btn btn-primary">Next</button>
                <br /> <br />
                <label for="inputPassword5" class="form-label">Progress</label>
                <small class="d-block text-end mt-3">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                </small>
            </div>

            {/* <input type="text" class="form-control" placeholder="Youtube Link" aria-label="Recipient's username" aria-describedby="button-addon2"  onChange={(e) => setLink(e.target.value)}/>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => handleSubmit(e.target.value)}>Button</button> */}

        </div>
    )
}

export default Upload