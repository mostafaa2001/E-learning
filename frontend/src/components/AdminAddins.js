import { useState} from "react"
const AddInstructorForm = () =>{
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Country, setCountry] = useState('')
    const [Fname, setFname] = useState('')
    const [Lname, setLname] = useState('')
    const [error, setError] = useState(null)

    

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const inst = {Country,Username,Password , Fname , Lname}
        const response = await fetch('/api/instructor' , {
            method: 'POST',
            url: '/api/instructor',
            body: JSON.stringify(inst),
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
            setUsername('')
            setPassword('')
            setCountry('')
            setFname('')
            setLname('')
            setError(null)
            console.log('new Instructor added',json)

        }
    }
    return(
        <form className ="create" onSubmit={handleSubmit}>
            <h3>Add a new Instructor</h3>
            <label>Username:</label>
            <input
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            value={Username}
            />
            <label>Password:</label>
            <input
            type="text"
            onChange={(e)=>setPassword(e.target.value)}
            value={Password}
            />

            <label>First name:</label>
            <input
            type="text"
            onChange={(e)=>setFname(e.target.value)}
            value={Fname}
            />


            <label>Last Name:</label>
            <input
            type="text"
            onChange={(e)=>setLname(e.target.value)}
            value={Lname}
            />


            <label>Country:</label>
            <input
            type="text"
            onChange={(e)=>setCountry(e.target.value)}
            value={Country}
            />
            
            
             
            <button>Add Instructor</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddInstructorForm
