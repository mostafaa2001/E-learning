import { Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorPage from "./pages/Errorpage";


const ProtectedRoutes4 = () =>{
    const {user} = useAuthContext()
    
    return  user && user.UserType ? user.UserType === "admin" ? <Outlet/> : <ErrorPage/>: <ErrorPage/>
    

}
export default ProtectedRoutes4