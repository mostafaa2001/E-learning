import { xuu } from "../components/instructorViewTitle"

import {thePrice} from "../components/PriceFilter"

function PriceResult({course} )

{

     if(course.Course_instructor ===xuu){

        if(thePrice!==-1)

        {

            if(course.Course_price === Number(thePrice))

            {

               

               

                return (

                    <div className = "course-Title">

                       

                        <p><strong>Course Title:</strong>{course.Course_title}</p>

                    </div>

                )

            }

        }

 

     

    }

   

 }

 

export default PriceResult