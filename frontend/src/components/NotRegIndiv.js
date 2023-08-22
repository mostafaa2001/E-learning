import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
const NotRegIndiv = () => {
    const { user } = useAuthContext()
    const params = useParams()
    const cid = params.idC
    var id = ""
    const [coursescoorp, setCoursescoorp] = useState([])
    const [courses, setCourses] = useState([])
    const [price, setPrice] = useState(false)
    var [Registered_Course, setReg] = useState([])
    var [show, setshow] = useState(false)
    var [Enrolled, setEnrolled] = useState(0)
    const [show3, setshow3] = useState(false)
    const [mywallet, setmywallet] = useState(0)
    const [inst, setinst] = useState([])
    // const {user} = useAuthContext()
    const [cname, setcname] = useState("")
    const [Course_instructor_id, setCourse_instructor_id] = useState("")
    const navigate = useNavigate()
    const [Course_photo, setCourse_photo] = useState("")
    if (user) {
        if (user)
            id = user.id
    }
    useEffect(() => {
        const fetchCourses = async () => {

            const response = await fetch('/api/course')

            const json = await response.json()

            if (response.ok) {

                setCourses(json.filter(c => { return c._id === cid }))
                console.log(Registered_Course.findIndex(el => el.Course_id === cid))
                setPrice(json.filter(c => { return c._id === cid })[0].Course_price)
                setCourse_instructor_id(json.filter(c => { return c._id === cid })[0].Course_instructor_id)
                setcname(json.filter(c => { return c._id === cid })[0].Course_subject)
                setEnrolled(json.filter(c => { return c._id === cid })[0].Enrolled)
                setCourse_photo(json.filter(c => { return c._id === cid })[0].Course_photo)

            }

        }

        const fetchr = async () => {

            const response = await fetch('/api/indiv/' + id)

            const json = await response.json()

            if (response.ok) {

                setReg(json.Registered_Course)
                console.log("ewfgwrgrerge")
                console.log("ffff")
                console.log(Registered_Course)
            }

        }
        const fetchrs = async () => {

            const response = await fetch('/api/instructor/')

            const json = await response.json()

            if (response.ok) {

                setinst(json)
            }

        }

        if (user && user.id) {
            fetchCourses();
            fetchr();
            fetchrs();
        }




    }, [user])


    // console.log(courses.length)
    const handleSubmit = async (e) => {

        // e.preventDefault()
        //console.log(Currency)
        // console.log(cid)
        // const red = Registered_Course.push(cid)
        // console.log(red)
        // setReg(red)
        await fetch("http://localhost:3000/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [
                    { id: cid, name: cname, priceInCents: price * 100, quantity: 1 }

                ],
            }),
        })
            .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
                console.log(url)
                window.location = url
            })
            .catch(e => {
                console.error(e.error)
            })

        // console.log(Registered_Course.includes({Course_id:cid , Course_name:Registered_Course.find(el => el.Course_id ===cid).Course_name}))
        console.log(courses[0])
        const abc = [...Registered_Course, { Course_id: cid, Course_name: courses[0].Course_subject, Amount_paid: price, Watched: 0, Progress: 0, Course_photo: Course_photo }]
        console.log(abc)
        setshow(true)
        setReg(abc)
        console.log("REG " + Registered_Course)
        console.log(abc)
        const re = { Registered_Course }
        await fetch('/api/indiv/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ Registered_Course: abc }),
            headers: {
                'Content-Type': 'application/json'
            },


        })

        const i = inst.findIndex(el => { return el._id === Course_instructor_id })
        console.log(i)
        console.log(inst[i])
        const Wallet = inst[i].Wallet + price - (price * 0.05)
        await fetch('/api/instructor/' + Course_instructor_id, {
            method: 'PATCH',
            body: JSON.stringify({ Wallet: Wallet }),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        const enrolled = 1 + Enrolled
        await fetch('/api/course/' + cid, {
            method: 'PATCH',
            body: JSON.stringify({ Enrolled: enrolled }),
            headers: {
                'Content-Type': 'application/json'
            },


        })



    }

    function navto(ii) {
        navigate("/indiv/mycourses/course/" + ii)
    }


    return (
        
        <div>
            <nav class="navbar  navbar-dark bg-dark">
                <div class="container-fluid">
                    <a  href= '/individual'class="navbar-brand mb-0 h1">E-Learning</a>
                </div>
            </nav>
            <br />
            {courses.map((course) => (
                <main class="container">
                    <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                        <div class="row">
                            <div class="col-md-6 px-0">
                                <h1 class="display-4 fst-italic">{course.Course_title}</h1>
                                <p class="lead my-3">{course.Course_description}</p>
                                <span>Rating:{course.Course_overAllRate}</span>
                                <br />
                                <span>Created By:{course.Course_instructor}</span>
                            </div>
                            <div class="col-md-6 bg-light text-dark">
                                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div class="col p-4 d-flex flex-column position-static">
                                        <strong class="d-inline-block mb-2 text-primary">Course Preview</strong>
                                        <iframe width="600" height="300" src={"https://www.youtube.com/embed/" + course.Preview_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <br />
                                        {Registered_Course.findIndex(el => el.Course_id === cid) === -1 ? <button data-bs-toggle="modal" data-bs-target="#RefundPolicy" type="button" class="btn btn-primary">Register</button> : <button onClick={() => navto(course._id)} type="button" class="btn btn-primary">View Course</button>}


                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal fade" id="RefundPolicy" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Checkout</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    This course is {price}$ press continue to checkout

                                    <br /> <br />

                                </div>
                                <div class="modal-footer">
                                    <button onClick={() => handleSubmit()} type="button" class="btn btn-primary">Continue</button>
                                    <button type="button" class="btn btn-secondary" variant="Warning" data-bs-dismiss="modal">Decline</button>

                                </div>
                            </div>
                        </div>

                    </div>



                </main>
            ))}
        </div>

    );
}

export default NotRegIndiv