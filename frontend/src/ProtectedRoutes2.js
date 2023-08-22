import { Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorPage from "./pages/Errorpage";


const ProtectedRoutes2 = () =>{
    const {user} = useAuthContext()
    
    return  user && user.UserType ? user.UserType === "indiv" ? <Outlet/> : <ErrorPage/>: <ErrorPage/>
    

}
export default ProtectedRoutes2