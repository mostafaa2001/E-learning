import { useState} from "react"
const AddAdminForm = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const admin = {username,password}
        const response = await fetch('/api/admin' , {
            method: 'POST',
            url: '/api/admin',
            body: JSON.stringify(admin),
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
            setError(null)
            console.log('new admin added',json)

        }
    }
    return(
        <form className ="create" onSubmit={handleSubmit}>
            <h3>Add a new Admin</h3>
            <label>Username:</label>
            <input
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            />
            <label>Password:</label>
            <input
            type="text"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            />
            
            
             
            <button>Add Admin</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddAdminForm