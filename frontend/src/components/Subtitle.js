import { useState} from "react"
const Subtitle = () =>{
    const [Name, setName] = useState('')
    const [CourseId, setCourseId] = useState('')

    const [error, setError] = useState(null)

    
   

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const subtitle = {Name ,CourseId}
        const response = await fetch('/api/subtitle' , {
            method: 'POST',
            url: '/api/subtitle',
            body: JSON.stringify(subtitle),
            headers: {
                'Content-Type': 'application/json'
            },
            
            
        })
        const json = await response.json()
        if(!response.ok){
            console.log(json)
            setError(json.error)
        }
        if(response.ok){
           setName('')
           setCourseId('')
            console.log('new course added',json)

        }
    }
    return(
        <form className ="create" onSubmit={handleSubmit}>
            <h3>Add a new Course</h3>
            <label>Subtitle Name:</label>
            <input
            type="text"
            onChange={(e)=>setCourseId(e.target.value)}
            value={CourseId}
            />
            <label>Name:</label>
            <input
            type="text"
            onChange={(e)=>setName(e.target.value)}
            value={Name}
            />
            <button>Add Course</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Subtitle