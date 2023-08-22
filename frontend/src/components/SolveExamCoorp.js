import { useState, useEffect } from "react"
import NavbarInstructor from "./NavbarInstructor"
import { useParams, useSearchParams } from 'react-router-dom';

const SolveExamCoorp = ({ course }) => {
    const params = useParams();
    const subid = params.idc
    const individ = params.idi
    console.log(subid)

    const [Subtitle_id, setsubtitle] = useState(null)
    const [exams, setexams] = useState(null)
    const str = '/api/coorp/' + individ + '/' + subid + '/solveExam'

    useEffect(() => {

        const fetchsubtitle = async () => {

            const response = await fetch('/api/subtitle')

            const json = await response.json()

            if (response.ok) {

                setsubtitle(json.filter(c => { return c._id === subid }))

            }
        }

        fetchsubtitle();

    }, [])


    useEffect(() => {

        const fetchexams = async () => {
            
            const response = await fetch(str)

            const json = await response.json()

            if (response.ok) {

                setexams(json.filter(e => { return e.Subtitle_id === subid }))
                

            }
        }

        fetchexams();

    }, [])

    

    return (

        <div>
            <h1>Welcome: {individ} , Which exam would you like to take ?</h1>
            {exams&&exams.map((ex) => (



                <div>
                    <br></br>
                    <button key={ex._id} onClick={event =>  window.location.href='/coorp/' + individ + '/' + subid + '/solveExam'+'/'+ex._id} >{ex.Exam_Name}</button>
                    <br></br>
                </div>



            ))}


        </div>
    )
}


export default SolveExamCoorp