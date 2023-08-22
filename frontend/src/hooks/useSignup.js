import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import AllCourses from '../components/AllCourses'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (Fname, Lname, Email, Password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/indiv/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Fname, Lname, Email, Password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log(error)
            // return (
            //     <div class="alert alert-danger" role="alert">
            //         {json.error}
            //     </div>
            // )
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json, Usertype: 'indiv' })

            // update loading state
            setIsLoading(false)
        }
    }


    function errii(string) {
      
    }
    
    console.log(error)
    return { signup, isLoading, error }

   
}