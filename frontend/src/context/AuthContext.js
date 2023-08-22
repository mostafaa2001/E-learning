import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()


export const authReducer = (state, action) => {
// console.log(action.UserType)

  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null };
      
    default:
      return state
  }


}

export const AuthContextProvider = ({ children }) => {
  // console.log(children)
  const [state, dispatch] = useReducer(authReducer, { user: null })
  const xtype = Object.keys(state)[0]

  

  useEffect(() => {
     
    console.log("gffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    const user = JSON.parse(localStorage.getItem('user'))
    console.log("dsffsfgaer: "+user)
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}