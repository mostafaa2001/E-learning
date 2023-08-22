import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const [errorL, setError] = useState(null)
  const [isLoadingL, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const {user } = useAuthContext()
  const navigate = useNavigate()

  const login = async (Email, Password, UserType) => {
    setIsLoading(true)
    setError(null)

    console.log("Email:  " + Email)
    console.log("Pass: "+ Password)
    console.log("Type: "+ UserType)
    console.log(user)

    const response = await fetch('/api/'+UserType+'/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ Email, Password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      // alert(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      console.log(json.UserType)
      
      // update the auth context
      dispatch({type: 'LOGIN' , payload: json , UserType:UserType})

      // update loading state
      setIsLoading(false)

     
     
    }
  }
  console.log(errorL)
  return { login, isLoadingL, errorL }
}