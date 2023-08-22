// import { useState} from "react"
// const AddCourseForm = () =>{
//     const [Course_subject, setSubject] = useState('')
//     const [Course_excrcise, setExcercises] = useState('')
//     const [Course_title, setTitle] = useState('')
//     const [Course_duration , setDuration] = useState('')
//     const [Course_rating, setRating] = useState('')
//     const [Course_price, setPrice] = useState('')
//     const [Course_instructor, SetCourseIns] = useState('')
//     const [Course_subtitle, setSubtitle] = useState('')
//     const [error, setError] = useState(null)

    
   

   
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const course = {Course_subject ,Course_excrcise ,Course_title , Course_duration , Course_rating , Course_price , Course_instructor , Course_subtitle}
//         const response = await fetch('/api/course' , {
//             method: 'POST',
//             url: '/api/course',
//             body: JSON.stringify(course),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
            
            
//         })
//         const json = await response.json()
//         if(!response.ok){
//             console.log(json)
//             setError(json.error)
//         }
//         if(response.ok){
//             setTitle('')
//             setExcercises('')
//             setPrice('')
//             setDuration('')
//             setSubtitle('')
//             setSubject('')
//             setRating('')
//             SetCourseIns('')
//             setError(null)
//             console.log('new course added',json)

//         }
//     }
//     return(
//         <form className ="create" onSubmit={handleSubmit}>
//             <h3>Add a new Course</h3>
//             <label>Subject:</label>
//             <input
//             type="text"
//             onChange={(e)=>setSubject(e.target.value)}
//             value={Course_subject}
//             />
//             <label>Excercises:</label>
//             <input
//             type="text"
//             onChange={(e)=>setExcercises(e.target.value)}
//             value={Course_excrcise}
//             />
//             <label>Title:</label>
//             <input
//             type="text"
//             onChange={(e)=>setTitle(e.target.value)}
//             value={Course_title}
//             />
//              <label>Rating:</label>
//             <input
//             type="number"
//             onChange={(e)=>setRating(e.target.value)}
//             value={Course_overAllRate}
//             />
//             <label>duration:</label>
//             <input
//             type="number"
//             onChange={(e)=>setDuration(e.target.value)}
//             value={Course_duration}
//             />
//              <label>Price:</label>
//             <input
//             type="number"
//             onChange={(e)=>setPrice(e.target.value)}
//             value={Course_price}
//             />
//              <label>Instructor: </label>
//             <input
//             type="text"
//             onChange={(e)=>SetCourseIns(e.target.value)}
//             value={Course_instructor}
//             />
//              <label>Subtitle:</label>
//             <input
//             type="text"
//             onChange={(e)=>setSubtitle(e.target.value)}
//             value={Course_subtitle.Name}
//             />
//              <input
//             type="text"
//             onChange={(e)=>setSubtitle(e.target.value)}
//             value={Course_subtitle.Exercises}
//             />
//              <input
//             type="text"
//             onChange={(e)=>setSubtitle(e.target.value)}
//             value={Course_subtitle.Hours}
//             />
           
            
             
//             <button>Add Course</button>
//             {error && <div className="error">{error}</div>}
//         </form>
//     )
// }

// export default AddCourseForm