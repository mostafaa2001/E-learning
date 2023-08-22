import axios from 'axios'
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.min'
import { useState, useEffect } from 'react'
import SubContent from './SubContent';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink , useNavigate} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const CourseDetCoorp = () => {
    const {user} = useAuthContext()
    var jsonSub;
    const params = useParams()
    const cid = params.id
    var id = ""
    console.log(id)
    const [sid,setSid] = useState('')
    // const params = new URLSearchParams(window.location.search);
    // const courseId = params.get('courseId');
    const [courses, setCourse] = useState([]);
    const [subtitle, setSub] = useState([]);
    const [coorp , setcoorp] = useState(null)
    const [show, setshow] = useState(false)
    const navigate = useNavigate();
    if(user){
        id = user.id
    }

    useEffect(() => {


console.log(id)
        const fetchCourses = async () => {

            const response = await fetch('/api/course')
            console.log(response.json)
            const json = await response.json()

            if (response.ok) {

                setCourse(json.filter(c => { return c._id === cid }))

            }





        }



        const fetchr = async () => {

            const response = await fetch('/api/coorp/' + id)

            const json = await response.json()

            if (response.ok) {

                setcoorp(json)
             
            }

        }

        const fetchSubtitles = async () => {

            const response = await fetch('/api/subtitle')
            console.log('ffffffff')
             jsonSub = await response.json()
            console.log(response)
            if (response.ok) {

                setSub(jsonSub.filter(c => { return c.CourseId === cid }))
                
            }
            if (!response.ok) {

                console.log('ffffffff')

            }




        }

       

if(user && user.id!==null){
    fetchCourses();
    fetchSubtitles();
    fetchr();
}
      


    }, [user])


    function gett(c) {

        ct = c
        console.log(ct)
        return c
    }
    function handleClick(sid){
        setSid(sid)
        // console.log(jsonSub)
        // setSub(jsonSub.filter(c => { return c._id === sid }))
        setshow(true)
    }
    if(coorp&&coorp.Registered_Course&&coorp.Registered_Course.findIndex(el => {return el.Course_id === cid && el.IsApproved === true}) === -1){
        navigate("/coorprate");
    }
    

    return (

        <div
            style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
        >
            {courses.map((course) => (

                <CDBSidebar textColor="#fff" backgroundColor="#333">
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        <a
                            href="/"
                            className="text-decoration-none"
                            style={{ color: 'inherit' }}
                        >
                            {course.Course_subject}
                        </a>
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content">
                        <CDBSidebarMenu>
                            {subtitle.map((sub) => (
                                <a onClick={() => window.location.href = `/${course._id}/${sub._id}/coorp`}><CDBSidebarMenuItem icon="table">{sub.Name}</CDBSidebarMenuItem></a>

                            ))}

                        </CDBSidebarMenu>
                    </CDBSidebarContent>

                    <CDBSidebarFooter style={{ textAlign: 'center' }}>
                        <div
                            style={{
                                padding: '20px 5px',
                            }}
                        >
                            Copyrights E-Learning ©
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>

            ))}
            
        </div>



        // <div className='container'>
        //     <div className='row'>
        //         <div className='col-md-8'>
        //             {courses.map((course) => (
        //                <div class="offcanvas offcanvas-start show" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        //                <div class="offcanvas-header">
        //                  <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
        //                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        //                </div>
        //                <div class="offcanvas-body">
        //                  Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
        //                </div>
        //              </div>


        //             ))}
        //         </div>
        //         <div className='col-md-4'>
        // <div className='card'>
        // <iframe  src="https://www.youtube.com/embed/DZKf9l42WCo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        //     <div className='card-body'>
        //         <h5 class="card-title">Lesson 1</h5>
        //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     </div>
        // </div>
        //         </div>

        //     </div>
        // </div>

        // <div>
        //     <div>
        //         <div class='grid'>
        //             <div>
        //                 {courses.map((course) => (

        //                     <div class="offcanvas offcanvas-start show text-bg-dark" tabindex="-1" id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
        //                         <div class="offcanvas-header">
        //                             <h5 class="offcanvas-title" id="offcanvasDarkLabel">{course.Course_title}</h5>

        //                         </div>
        //                         <div class="offcanvas-body">
        //                             <p>Place offcanvas content here.</p>
        //                         </div>

        //                     </div>


        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        //     <div>
        // <div className='card'>
        //     <img src="https://img.freepik.com/premium-vector/e-learning-innovative-online-education-internet-technology-concept-wireframe-hand-touching-digital-interface_127544-1189.jpg?w=2000" class="card-img-top" alt="..." />
        //     <div className='card-body'>
        //         <h5 class="card-title">h bj</h5>
        //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //     </div>
        // </div>
        //     </div>


        // </div>


    )
}

export let ct = ""

export default CourseDetCoorp;
