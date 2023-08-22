import { useEffect, useState } from "react"
//components
import instructorDetails from '../components/CourseDetails'
import Country from "../components/Country"
import FilterSubjectRate from "../components/FilterSubjectRate"
import { useNavigate } from "react-router-dom";
import AllCourses from "../components/AllCourses";
import Footer from "../components/Footer";

//import AddCourseForm from '../components/AddCourseForm'
const Home = () => {

    const [searchname, setsearch] = useState("")
    const navigate = useNavigate();
    var [ filterrr , setfilterrr] = useState("")

    function gotoSearch() {
        console.log("ggf")
        console.log(searchname)
        navigate("/search/" + searchname)
    }
    function sort(){
        
        
        setfilterrr("Popular Courses"  )        
        // window.location.reload() 
    }
    function sort2(){
        
        
        setfilterrr("Highest to lowest price"  )        
        // window.location.reload() 
    }
    function sort3(){
        
        
        setfilterrr("Rate"  )        
        // window.location.reload() 
    }
    function sort4(){
        
        
        setfilterrr("Rate"  )        
        // window.location.reload() 
    }
    return (
        <div >
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/individual">E-Learning <i class="bi bi-book-half"></i></a>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

                        <button onClick={()=>navigate("/login")}class=" btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Login
                        </button>
                        <button onClick={()=>navigate("/register")} class=" btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Signup
                        </button>
                    </div>
                </div>

                <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle btn btn-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter <i class="bi bi-funnel-fill"></i>
                                </button>
                                <ul class="dropdown-menu">  
                                    <li><a onClick={()=>sort()}class="dropdown-item" href="#">Popular Courses</a></li>
                                    
                                    <li><a onClick={()=>sort3()}class="dropdown-item" href="#">Rate</a></li>
                                    
                                    <li><a onClick={()=>sort2()}class="dropdown-item" href="#">Highest to lowest price</a></li>

                                    <li><a onClick={()=>sort4()}class="dropdown-item" href="#">lowest to Highest price</a></li>
                                </ul>
                            </div>
                <form class="d-flex" role="search">
                    <input onChange={(e) => setsearch(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick={() => gotoSearch()} class="btn btn-outline-success" type="submit">Search</button>
                </form>

            </nav>
            <br />
            <AllCourses filterCourse = {filterrr}/>
            <br/>
            <Footer/>
        </div>


    )
}

export default Home