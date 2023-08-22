import { useState ,useEffect } from "react"
import NavbarInstructor from "./NavbarInstructor"
import { useParams, useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import Select from 'react-select';

import QuestionForm from "./QuestionForm";
import { useAuthContext } from "../hooks/useAuthContext";
const CreateExam = ({ course }) => {
    var [show, setshow] = useState(false)
    const {user} = useAuthContext()

    const params = useParams();
    var insid = ""
    const courseid = params.idcourse
    var [ref, setref] = useState(0)
    var [Course_excrcise,setCourseExcercise] = useState(0)
    const navigate = useNavigate()
    if(user){
        if(user.UserType !== "instructor"){
            navigate("/error404")
        }
        else{
            insid = user.id
        }
        
        
    }

    


    const [error, setError] = useState("")


    const Subtitle_id = params.idsub
    const [Exam_Name, setExamName] = useState("")

    useEffect(() => {
        const fetchCourses = async () => {

            const response = await fetch('/api/course')
            console.log(response.json)
            const json = await response.json()

            if (response.ok) {

                setCourseExcercise(json.filter(c => { return c._id === courseid })[0].Course_excrcise)
            }





        }
        if(user&&user.id!==null){
            fetchCourses()
        }
       
    }, [user])

    
    
    // QUESTIONS******************
    const [Questions, setquestions] = useState([])
    const handleAddQuestions = () => {
        const abc = [...Questions, []]
        setquestions(abc)
    }

    const handleChangeQuestions = (onChangeValue, i) => {
        const inputdata = [...Questions]
        inputdata[i] = onChangeValue.target.value;
        setquestions(inputdata)
    }

    const handleDeleteQuestions = (i) => {
        const deletVal = [...Questions]
        deletVal.splice(i, 1)
        setquestions(deletVal)
    }

    // OPTIONS**************
    const [Options, setoptions] = useState([])
    const handleAddOptions = () => {

        handleAddOpABCD();
        const abc = [...Options, []]

        setoptions(abc)
    }

    const handleChangeOptions = (onChangeValue, i, n) => {

        const inputdata = [...Options]
        inputdata[i][n] = onChangeValue;
        setoptions(inputdata)
    }


    const handleDeleteOptions = (i) => {
        handleDeleteOpABCD(i);




        const deletVal = [...Options]
        deletVal.splice(i, 1)
        setoptions(deletVal)
    }



    // CORRECT ANSWERS*********************
    const [correct_Answers, setcorrectAns] = useState([])
    const [vcorrect, setvcorrect] = useState(null)
    const handleAddcorrect_Answers = () => {
        const abc = [...correct_Answers, []]
        setcorrectAns(setcorrectAns)
    }

    const handleChangecorrect_Answers = (onChangeValue, i) => {
        const inputdata = [...correct_Answers]
        inputdata[i] = onChangeValue.label;
        setcorrectAns(inputdata)
    }

    const handleDeletecorrect_Answers = (i) => {
        const deletVal = [...correct_Answers]
        deletVal.splice(i, 1)
        setcorrectAns(deletVal)
    }




    const handleAdd = () => {
        setCourseExcercise(Course_excrcise +1)
        console.log(Course_excrcise)
        handleAddQuestions();
        handleAddOptions();
        handleAddcorrect_Answers();
    }

    const handleDelete = (i) => {
        setCourseExcercise(Course_excrcise -1) 
        handleDeleteOptions(i);
        handleDeleteQuestions(i);
        handleDeletecorrect_Answers(i);
    }


    const [qq, setqq] = useState("")



    // OPTIONS A,B,C,D
    const [opA, setopA] = useState([])
    const handleAddopA = () => {
        const abc = [...opA, []]
        setopA(abc)
        for (let i = 0; i < opA.length; i++) {
            Options[i][0] = opA[i]
        }
    }
    const handleChangeopA = (onChangeValue, i) => {

        const inputdata = [...opA]
        inputdata[i] = onChangeValue.target.value;
        setopA(inputdata)

        handleChangeOptions(inputdata[i], i, 0)
    }
    const handleDeleteopA = (i) => {
        const deletVal = [...opA]
        deletVal.splice(i, 1)
        setopA(deletVal)
    }


    const [opB, setopB] = useState([])
    const handleAddopB = () => {

        const abc = [...opB, []]
        setopB(abc)

        for (let i = 0; i < opB.length; i++) {
            Options[i][1] = opB[i]
        }
    }
    const handleChangeopB = (onChangeValue, i) => {

        const inputdata = [...opB]
        inputdata[i] = onChangeValue.target.value;
        setopB(inputdata)

        handleChangeOptions(inputdata[i], i, 1)
    }
    const handleDeleteopB = (i) => {
        const deletVal = [...opB]
        deletVal.splice(i, 1)
        setopB(deletVal)
    }


    const [opC, setopC] = useState([])
    const handleAddopC = () => {
        const abc = [...opC, []]
        setopC(abc)
        for (let i = 0; i < opC.length; i++) {
            Options[i][2] = opC[i]
        }
    }
    const handleChangeopC = (onChangeValue, i) => {

        const inputdata = [...opC]
        inputdata[i] = onChangeValue.target.value;
        setopC(inputdata)

        handleChangeOptions(inputdata[i], i, 2)
    }
    const handleDeleteopC = (i) => {
        const deletVal = [...opC]
        deletVal.splice(i, 1)
        setopC(deletVal)
    }


    const [opD, setopD] = useState([])
    const handleAddopD = () => {
        const abc = [...opD, []]
        setopD(abc)

        for (let i = 0; i < opD.length; i++) {
            Options[i][3] = opD[i]
        }
    }
    const handleChangeopD = (onChangeValue, i) => {

        const inputdata = [...opD]
        inputdata[i] = onChangeValue.target.value;
        setopD(inputdata)


        handleChangeOptions(inputdata[i], i, 3)
    }
    const handleDeleteopD = (i) => {
        const deletVal = [...opD]
        deletVal.splice(i, 1)
        setopD(deletVal)
    }

    const handleAddOpABCD = () => {
        handleAddopA();
        handleAddopB();
        handleAddopC();
        handleAddopD();
    }

    const handleChangeOpABCD = (onChangeValue, i) => {
        handleChangeopA(onChangeValue, i);
        handleChangeopB(onChangeValue, i);
        handleChangeopC(onChangeValue, i);
        handleChangeopD(onChangeValue, i);
    }
    const handleDeleteOpABCD = (i) => {
        handleDeleteopA(i);
        handleDeleteopB(i);
        handleDeleteopC(i);
        handleDeleteopD(i);
    }


    const [corr, setcorr] = useState("")

    const [insert, setinsert] = useState('')


    function calls() {
        // forms.push(<div><QuestionForm/></div>)
        // setforms(forms + <QuestionForm />)

        // console.log(forms.length)
        setshow(true)

    }

    function submitted() {
        //    Questions.push(qq)
        console.log(Questions)
        //        Options.push([opA, opB, opC, opD])
        console.log(Options)
        //        correct_Answers.push(corr)
        console.log(Subtitle_id)
        console.log(correct_Answers)
        setinsert('/api/instructor/' + insid + '/createExam')
        // if (examName || cid || opA || opB || opC || opD || qq === "") {
        //     alert('Please fill the form')
        // }
        // setref(10)
        ref = 10
        handleSubmit()




    }
    function submitted2() {
        //    Questions.push(qq)
        console.log(Questions)
        //        Options.push([opA, opB, opC, opD])
        console.log(Options)
        //        correct_Answers.push(corr)
        console.log(Subtitle_id)
        console.log(correct_Answers)
        setinsert('/api/instructor/' + insid + '/createExam')
        // if (examName || cid || opA || opB || opC || opD || qq === "") {
        //     alert('Please fill the form')
        // }
        // setref(20)
        ref = 20
        handleSubmit()



    }

    const handleSubmit = async () => {
        console.log(Exam_Name)
        console.log(Questions)
        console.log(Options)
        console.log(correct_Answers)
        console.log(insid)
        console.log(Subtitle_id)
        const exam = { Subtitle_id, Exam_Name, Questions, Options, correct_Answers }
        const response = await fetch('/api/instructor/' + insid + '/createExam', {
            method: 'POST',
            url: '/api/instructor/' + insid + '/createExam',
            body: JSON.stringify(exam),
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
            const Course = {Course_excrcise}
            const response2 = await fetch('/api/course/'+ courseid , {
                method: 'PATCH',
                body: JSON.stringify(Course),
                headers: {
                    'Content-Type': 'application/json'
                },
                
                
            })
            setExamName("")
            setquestions([])
            setoptions([])
            setcorrectAns([])
            setqq("")
            setopA("")
            setopB("")
            setopC("")
            setopD("")

            setError(null)
            if (ref === 10) {
                window.location.href = '/instructor'
            }
            else if (ref === 20) {
                window.location.href = '/instructor/createcourse/' + params.idcourse
            }
            console.log('new Exam added', json)
            alert('Your exam has been added')


         
        }

    }
    console.log(ref)

    const actions = [

        { label: "A" },

        { label: "B" },

        { label: "C" },

        { label: "D" }

    ];



    // console.log("////QUESTIONS    " + Questions)
    // console.log("////COORRECTANSWERS    " + correct_Answers)
    // console.log("////OPTIONS    " + Options)
    // console.log(Subtitle_id)
    return (


        <div class="my-3 p-3 bg-body rounded shadow-sm">

            <h6 class="border-bottom pb-2 mb-0">Create Exam</h6>


            <strong> Exam Name:</strong><input class="form-control me-2" placeholder="Name..." value={Exam_Name} type="text"

                onChange={(e) => setExamName(e.target.value)} />

            <br></br>


            {Questions && Questions.map((data, i) => {
                return (
                    <div>

                        <strong> Question:</strong><input class="form-control me-2" placeholder="Question..." value={data} type="text"

                            onChange={(e) => handleChangeQuestions(e, i)} />

                        Option A: <input class="form-control me-2" placeholder="A.." type="text" value={opA[i]}

                            onChange={(e) => handleChangeopA(e, i)} />

                        Option B:<input class="form-control me-2" placeholder="B.." type="text" value={opB[i]}

                            onChange={(e) => handleChangeopB(e, i)} />

                        Option C:<input class="form-control me-2" placeholder="C.." type="text" value={opC[i]}

                            onChange={(e) => handleChangeopC(e, i)} />

                        Option D: <input class="form-control me-2" placeholder="D.." type="text" value={opD[i]}

                            onChange={(e) => handleChangeopD(e, i)} />
                        <br></br>
                        Correct Answer:<Select options={actions}

                            id="drpdwn"

                            onChange={(e) => handleChangecorrect_Answers(e, i)} />
                        <br />

                        <button class="btn btn-danger" onClick={() => handleDelete(i)}>Delete Question</button>
                        <br></br>

                    </div>
                )
            })}
            <br />
            <button class="btn btn-primary" onClick={handleAdd}>Add a new Question</button>


            <div>
                <br></br>
                <button onClick={submitted} class="btn btn-primary">submit Course</button>
                <br /> <br />
                <button onClick={submitted2} class="btn btn-primary">Add another subtitle</button>
            </div>
            <br />
            <h6>Progress</h6>
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "100%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>

        </div>
    )
}

export default CreateExam