import { useState} from "react"
const AddCorpTraineeForm = () =>{
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Country, setCountry] = useState('')
    const [Fname, setFname] = useState('')
    const [Lname, setLname] = useState('')
    const [error, setError] = useState(null)

    

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const coorp = {Country,Username,Password , Fname , Lname}
        const response = await fetch('/api/coorp' , {
            method: 'POST',
            url: '/api/admin',
            body: JSON.stringify(coorp),
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
            console.log('new Corporate Trainee added',json)

        }
        console.log(Country)
    }
    return(
        <form className ="create" onSubmit={handleSubmit}>
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

export default AddCorpTraineeForm