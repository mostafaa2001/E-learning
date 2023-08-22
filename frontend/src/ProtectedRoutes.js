import { Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorPage from "./pages/Errorpage";


const ProtectedRoutes = () =>{
    const {user} = useAuthContext()
    
    return  user && user.UserType ? user.UserType === "instructor" ? <Outlet/> : <ErrorPage/>: <ErrorPage/>
    

}
export default ProtectedRoutes