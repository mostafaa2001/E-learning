import { Outlet } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorPage from "./pages/Errorpage";


const ProtectedRoutes3 = () =>{
    const {user} = useAuthContext()
    
    return  user && user.UserType ? user.UserType === "coorp" ? <Outlet/> : <ErrorPage/>: <ErrorPage/>
    

}
export default ProtectedRoutes3