import { createContext, useReducer } from 'react'

export const CoursesContext = createContext()

export const CoursesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_Courses': 
      return {
        Courses: action.payload
      }
    case 'CREATE_Course':
      return {
        Courses: [action.payload, ...state.Courses]
      }
    case 'DELETE_Course':
      return {
        Courses: state.Courses.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CoursesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoursesReducer, {
    Courses: null
  })

  return (
    <CoursesContext.Provider value={{...state, dispatch}}>
      { children }
    </CoursesContext.Provider>
  )
}