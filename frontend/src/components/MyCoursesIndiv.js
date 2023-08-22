import { useParams, useNavigate } from 'react-router-dom'
import NavbarCourse from './NavbarCourse'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
const MyCoursesIndiv = () => {
    const { user } = useAuthContext()
    const params = useParams()
    var cid = ""
    var count = 0;
    const [inst, setInst] = useState([]);
    const [indiv, setindiv] = useState(null);
    const [courses, setcourse] = useState([]);
    const [RegCourses, setReg] = useState([]);
    var [notregatall, setnotregatall] = useState(false)
    const navigate = useNavigate()
    console.log(cid)
    if (user) {
        if (user.UserType !== "indiv") {
            navigate("/error404")
        }
        else {
            cid = user.id
        }

    }
    useEffect(() => {



        const fetchindiv = async () => {

            const response = await fetch('/api/indiv/' + cid)

            const json = await response.json()

            var count = 0;
            if (response.ok) {

                setindiv(json)
                setReg(json.Registered_Course)
                console.log(json.Registered_Course)




                console.log(json)
            }




        }


        if (user && user.id !== null) {
            fetchindiv();
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
                    <a href="/individual" class="navbar-brand mb-0 h1">E-Learning</a>
                </div>
            </nav>

            <div className='container'>


                <div class='row'>

                    <br />
                    {RegCourses && RegCourses.length !== 0 ? RegCourses.map((x) => (
                        // {x.IsApproved? }

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
                        </div>
                    )) : <h1 class="abdo">No courses availabe<i class="bi bi-patch-exclamation-fill"></i></h1>
                    }



                </div>
            </div>
        </div>


    )




























    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // const {user} = useAuthContext()

    // var cid =""
    // const [inst, setInst] = useState([]);
    // const [coorp, setcoorp] = useState([]);
    // const [courses, setcourse] = useState([]);
    // const [RegCourses, setReg] = useState([])
    // const navigate = useNavigate()

    // if(user){
    //    cid = user.id
    // }


    // useEffect(() => {



    //     const fetchcoorp = async () => {

    //         const response = await fetch('/api/indiv/')

    //         const json = await response.json()

    //         if (response.ok) {

    //             setcoorp(json.filter(c => { return c._id === cid }))
    //         }




    //     }


    //     if(user){
    //         if(user.id!==null){
    //             fetchcoorp();
    //         }
    //     }






    // }, [user])
    // // if (coorp[0] !== null) {
    // //     setReg(coorp[0].Registered_Course)
    // // }   
    // // useEffect(() => {



    // //     const fetchcourse = async () => {

    // //         const response = await fetch('/api/course/')

    // //         const json = await response.json()

    // //         if (response.ok) {

    // //             setcourse(json.filter(c => {
    // //                 // for(let i = 0;i<coorp[0].Registered_Course.length;i++){
    // //                 //     return c._id === coorp[0].Registered_Course[i]
    // //                 // }
    // //                 // return c._id === coorp+[0].Registered_Course[1]

    // //             }))

    // //         }




    // //     }



    // //     fetchcourse();





    // // }, [])


    // return (



    //     // <div class='row'>
    //     //     {coorp.map((corp) => (
    //     //         corp.Registered_Course.map((x) => (
    //     //             <div class='col-8'>
    //     //                 <div className='card'>
    //     //                     <img src="https://img.freepik.com/premium-vector/e-learning-innovative-online-education-internet-technology-concept-wireframe-hand-touching-digital-interface_127544-1189.jpg?w=2000" class="card-img-top" alt="..." />
    //     //                     <div className='card-body'>
    //     //                         <h5 class="card-title">{x.Course_name}</h5>
    //     //                         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     //                         <a onClick={() => window.location.href = `${cid}/course/${x.Course_id}`} class="btn btn-primary" key={x.Course_id}>To Course</a>
    //     //                     </div>
    //     //                 </div>
    //     //             </div>
    //     //         ))
    //     //     ))}
    //     // </div>


    //     <div class='row'>
    //         {coorp.map((corp) => (
    //             corp.Registered_Course.map((x) => (
    //                 <div class='col-3'>
    //                     <div class='card'>
    //                         <img src="https://img.freepik.com/premium-vector/e-learning-innovative-online-education-internet-technology-concept-wireframe-hand-touching-digital-interface_127544-1189.jpg?w=2000" class="card-img-top" alt="..." />
    //                         <div class='card-body'>
    //                             <h5 class="card-title">{x.Course_name}</h5>
    //                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //                             <a onClick={() => window.location.href = "mycourses/course/"+x.Course_id} class="btn btn-primary" key={x.Course_id} >To Course</a>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))
    //         ))}
    //     </div>
    // )
}
export default MyCoursesIndiv