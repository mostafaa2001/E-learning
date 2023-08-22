import { Navigate, useNavigate, useParams } from 'react-router-dom'
import NavbarCourse from './NavbarCourse'
import { useState, useEffect } from 'react'
import Nocourses from './Nocourses'
import { useAuthContext } from '../hooks/useAuthContext'
const MyCourses = () => {
    const { user } = useAuthContext()
    const params = useParams()
    var cid = ""
    var count = 0;
    const [inst, setInst] = useState([]);
    const [coorp, setcoorp] = useState(null);
    const [courses, setcourse] = useState([]);
    const [RegCourses, setReg] = useState([]);
    var [notregatall, setnotregatall] = useState(false)
    const navigate = useNavigate()
    console.log(cid)
    if (user) {
        if (user.UserType !== "coorp") {
            navigate("/error404")
        }
        else {
            cid = user.id
        }

    }
    useEffect(() => {



        const fetchcoorp = async () => {

            const response = await fetch('/api/coorp/' + cid)

            const json = await response.json()

            var count = 0;
            if (response.ok) {

                setcoorp(json)
                setReg(json.Registered_Course)
                console.log(RegCourses.findIndex(el => el.IsApproved === true) === -1)



                console.log(json)
            }




        }


        if (user && user.id !== null) {
            fetchcoorp();
        }






    }, [user])

    console.log(RegCourses)
    // if (coorp[0] !== null) {
    //     setReg(coorp[0].Registered_Course)
    // }   
    // useEffect(() => {



    //     const fetchcourse = async () => {

    //         const response = await fetch('/api/course/')

    //         const json = await response.json()

    //         if (response.ok) {

    //             setcourse(json.filter(c => {
    //                 // for(let i = 0;i<coorp[0].Registered_Course.length;i++){
    //                 //     return c._id === coorp[0].Registered_Course[i]
    //                 // }
    //                 // return c._id === coorp+[0].Registered_Course[1]

    //             }))

    //         }




    //     }



    //     fetchcourse();




    // }, [])


    return (
        <div>
            <nav class="navbar  navbar-dark bg-dark">
                <div class="container-fluid">
                    <a href='/coorprate' class="navbar-brand mb-0 h1">E-Learning</a>
                </div>
            </nav>
            <div className='container'>
                <div class='row'>

                    <br />
                    {RegCourses.findIndex(el => el.IsApproved === true) === -1 ? notregatall = true : <p></p> && RegCourses.map((x) => (
                        // {x.IsApproved? }
                        x.IsApproved ?
                            <div className='col-3'>
                                <br />
                                <div className='card'>
                                    <img src={x.Course_photo} class="card-img-top" width="400"
                                        height="200" alt="..." />
                                    <div className='card-body'>
                                        <h5 class="card-title">{x.Course_name}</h5>

                                        <hr />

                                        <a onClick={() => window.location.href = `mycourses/course/${x.Course_id}`} class="btn stretched-link" key={x.Course_id}></a>
                                    </div>
                                </div>
                            </div> : <p></p>
                        // <div class='col-3'>
                        //     <div class='card'>
                        //         <img src="https://img.freepik.com/premium-vector/e-learning-innovative-online-education-internet-technology-concept-wireframe-hand-touching-digital-interface_127544-1189.jpg?w=2000" class="card-img-top" alt="..." />
                        //         <div class='card-body'>
                        //             <h5 class="card-title">{x.Course_name}</h5>
                        //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        //             <a onClick={() => window.location.href = "mycourses/course/"+x.Course_id} class="btn btn-primary" key={x.Course_id} >To Course</a>
                        //         </div>
                        //     </div>
                        // </div>:<p></p>
                    ))
                    }

                    {notregatall ? <h1 class="abdo">No courses availabe<i class="bi bi-patch-exclamation-fill"></i></h1> : <p></p>}

                </div>
            </div>
        </div>


    )
}
export default MyCourses