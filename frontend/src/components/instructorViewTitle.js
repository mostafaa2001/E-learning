import { useEffect , useState} from "react"

//components

import CourseTitle from '../components/CourseTitle'

import SubjectFilter from "../components/SubjectFilter";

import React from 'react';

import Select from 'react-select';

import PriceFilter from "../components/PriceFilter";

// import PriceResult from "../components/PriceResults";

 

const CTitle = () =>{

    const [FullName, setInstructorName] = useState("")

    const [error, setError] = useState(null)

   

   

 

 const [courses , setCourses] = useState(null)

    useEffect(() =>{

        const fetchCourses = async () =>{

            const response = await fetch('/api/course')

 

            const json = await response.json()

           

            if(response.ok){

                 setCourses(json)

                 cu = json

                 

            }

 

         

           

        }

        fetchCourses();

    },[])





    const [show, setShow] = useState(false);

    const [showFilterSubject, setShowFilterSubject] = useState(false);

    const [showFilterPrice, setShowFilterPrice] = useState(false);

 

    function clicked(){

 

        setShow(true)

        xuu=FullName

     

    }

   

 

      const actions = [

        { label: "Subject" },

        { label: "Price"}

      ];

 

   

 

      function chooseFilter(e){

 

        if(e.label === "Subject"){

            setShowFilterSubject(true);

        }

        else if(e.label === "Price"){

            setShowFilterPrice(true)

        }  

      }

     

 

    return(

        <div className="home"  >

 

            <div className="courses">

            <label>Enter your Name:</label>

            <input

            type="text"

            value={FullName}

            onChange={(e)=>setInstructorName(e.target.value)}

             //onClick={event =>  window.location.href='/your-href'}

            />

             <button onClick={clicked}>Search</button>

            {error && <div className="error">{error}</div>}

 

            <div>

            <p></p>

 

            </div>

 

            <div>{show ?  

            <div className="container">

 

           Filter By: <Select options={ actions }

              id="drpdwn"

              onChange={(e) => chooseFilter(e)}  />

            </div>

           

 

            : <p></p>}

           

            </div>

 

            <div>{show ? <h2>Your Courses:</h2> : <p></p>}</div>

 

       

           

           

           

           

            <div>{showFilterSubject ?

       

           

            <SubjectFilter/>

           

 

           

           

            : <p></p>}</div>

 

        <div>{showFilterPrice ?

       

           

        <PriceFilter/>

       

 

       

       

        : <p></p>}</div>




           

           

            {show && !showFilterPrice && !showFilterSubject && courses && courses.map((course) =>(

                   

                <CourseTitle key={course._id} course = {course}  />

               

            ))}

 

           

               

            </div>

           

        </div>

       

    )

               

                   

}

 

export let cu =[]

export let xuu = ""

export default CTitle