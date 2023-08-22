import { useState, useEffect } from "react"
import NavbarInstructor from "./NavbarInstructor"
import { useParams, useSearchParams,useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
const SolveTheExamChoosenCoorp = () => {
    const navigate = useNavigate()
    const params = useParams();
    const subid = params.ide
    const str = '/api/solveExam'
    var id = ""
    const [exams, setexams] = useState(null)
    const [questions, setquestions] = useState([])
    const [options, setoptions] = useState([])
    const [correct, setcorrect] = useState([])
    const [all, setall] = useState([])
    const [studentanswers, setstudentanswers] = useState([])
    var [finalscore, setfinalscore] = useState(0)
    const [showbutt, setshowbutt] = useState(true)
    const [showmodal, setshowmodal] = useState(false)
    const [showcorrect , setshowcorrect] = useState(false)
    const [showbutts , setshowbutts] = useState(false)
    const cccid = params.idcourse
    const [forfunc , setforfunc] = useState(false)
    const {user} = useAuthContext()
    const [theuser , settheuser] = useState(null)
    const [coorp , setcoorp] = useState(null)
    const [indiv , setindiv] = useState(null)
    var typeu = ""
    var coursesReg = []
    if(user){
        id = user.id
        typeu = user.UserType
        coursesReg = user.courses
    }


    useEffect(() => {
        const fetchr = async () => {
            
            const response = await fetch('/api/coorp/' + id)

            const json = await response.json()

            if (response.ok) {

                setcoorp(json)
                
            }

        }

        const fetchrindiv = async () => {
            
            const response = await fetch('/api/indiv/' + id)

            const json = await response.json()

            if (response.ok) {

                setindiv(json)
                
            }

        }

        const fetchexams = async () => {

            const response = await fetch(str)

            const json = await response.json()

            if (response.ok) {

                setexams(json.filter(ex => {return subid === ex.Subtitle_id}))
                console.log(exams)
                setforfunc(true)

            }
        }
        if(user&&user.id!==null){
            fetchexams();

            if(typeu === "coorp"){
                fetchr();
            }
            else if(typeu === "indiv"){
                fetchrindiv();
            }
        }


    }, [user])

    if(forfunc){
        getquestions()
        setforfunc(false)
    }

    function getquestions() {
        if (exams !== null) {
            console.log(exams)
            for (let i = 0; i < exams[0].Questions.length; i++) {
                questions[i] = exams[0].Questions[i];
            }


            for (let i = 0; i < exams[0].Options.length; i++) {
                options[i] = exams[0].Options[i];
            }

            for (let i = 0; i < exams[0].correct_Answers.length; i++) {
                correct[i] = exams[0].correct_Answers[i];
            }

            all[0] = questions;
            all[1] = options;
            all[2] = correct;


        }
        setshowbutt(false)
        setshowbutts(true)
    }

    const numberofquestions = questions.length

    const handleChange = (onChangeValue, i) => {
        const inputdata = [...studentanswers]
        inputdata[i] = onChangeValue.target.value;
        setstudentanswers(inputdata)


    }

    console.log(studentanswers)
    let s = 0
    function finished() {

        for (let i = 0; i < correct.length; i++) {
            if (correct[i] === studentanswers[i]) {
                finalscore++;
            }
        }
        setfinalscore(finalscore)
      
        setshowmodal(true)

    }

    function viewres(){
        setshowcorrect(true)
        setshowmodal(false)
        setshowbutts(false)
    }
    if(typeu === "indiv"){
        if(indiv&&indiv.Registered_Course.findIndex(el => {return el.Course_id === cccid}) === -1){
            navigate("/individual")
        }
    }
    else if (typeu === "coorp"){
        if(coorp&&coorp.Registered_Course&&coorp.Registered_Course.findIndex(el => {return el.Course_id === cccid && el.IsApproved === true}) === -1){
            navigate("/coorprate");
        }
    }


    // if(coursesReg&&coursesReg.findIndex(el => {return el.Course_id === cccid}) === -1){
    //     if(typeu === "indiv"){
    //         navigate("/individual");
    //     }
    //     else if(typeu === "coorp"){
    //         navigate("/coorprate")
    //     }
        
    // }

    return (

        <div>
            {/* {showbutt ? <Button onClick={() => { getquestions() }}>Start Exam</Button> : <h6></h6>} */}


            {questions.map((el, i) => (

                <div>

                    <h4>{el}</h4>

                    <td>

                        <div >
                            <Form.Group controlId="kindOfStand">
                                <Form.Check
                                    value="A"
                                    type="radio"
                                    aria-label="radio 1"
                                    onChange={e => handleChange(e, i)}
                                    checked={studentanswers === "A"}
                                    label={studentanswers[i] === "A" ? <strong>A: {options[i][0]}</strong> : <div>A: {options[i][0]}</div>}

                                />
                                <Form.Check
                                    value="B"
                                    type="radio"
                                    aria-label="radio 1"
                                    onChange={e => handleChange(e, i)}
                                    checked={studentanswers === "B"}
                                    label={studentanswers[i] === "B" ? <strong>B: {options[i][1]}</strong> : <div>B: {options[i][1]}</div>}
                                />
                                <Form.Check
                                    value="C"
                                    type="radio"
                                    aria-label="radio 1"
                                    onChange={e => handleChange(e, i)}
                                    checked={studentanswers === "C"}
                                    label={studentanswers[i] === "C" ? <strong>C: {options[i][2]}</strong> : <div>C: {options[i][2]}</div>}
                                />
                                <Form.Check
                                    value="D"
                                    type="radio"
                                    aria-label="radio 1"
                                    onChange={e => handleChange(e, i)}
                                    checked={studentanswers === "D"}
                                    label={studentanswers[i] === "D" ? <strong>D: {options[i][3]}</strong> : <div>D: {options[i][3]}</div>}
                                />


                            </Form.Group>

                        </div>


                    </td>
                    
                    {showcorrect? <div>Correct Answer for Q{i+1}: {correct[i]}</div> : <h6></h6>}
                    {showcorrect? <div>You Answered: {studentanswers[i]}</div> : <h6></h6>}
                    <br></br>
                </div>



            ))}
            <br></br>

            <form>
                <br></br>
                {showbutts ?  <Button onClick={finished}>Submit Exam</Button> : <h6></h6> }
            </form>
            <>
            <Modal show={showmodal}>
                <Modal.Header>
                    <Modal.Title>You have finished the exam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You scored: {finalscore} out of {numberofquestions}.
                    <div>click Okay to return to the previous page or Click preview to view the correct solutions </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={event =>  window.location.href='/' + cccid + '/' + subid + '/' + typeu}>
                        Okay
                    </Button>
                    <Button variant="dark" onClick={viewres}>
                        preview
                    </Button>
                </Modal.Footer>
            </Modal>

            </>
          

        </div>
    )
}

export default SolveTheExamChoosenCoorp