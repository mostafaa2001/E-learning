import { useState} from "react"
import NavbarInstructor from "./NavbarInstructor"
import {useParams , useSearchParams} from 'react-router-dom';

const QuestionForm = ({course}) => {
    var questions = []
 return(

    <div>
       
       
        <strong> Question:</strong><input class="form-control me-2" placeholder="Question..." />
      
       Option A: <input class="form-control me-2" placeholder="A" />
        
        Option B:<input class="form-control me-2" placeholder="B" />
   
        Option C:<input class="form-control me-2" placeholder="C" />
    
        Option D: <input class="form-control me-2" placeholder="D" />
        

    </div>
 )
}

export default QuestionForm