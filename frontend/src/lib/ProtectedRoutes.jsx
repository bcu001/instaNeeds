import AppLoadingScreenUI from "@/components/AppLoadingScreenUI";
import useAuth from "@/hooks/useAuth"
import { Outlet,Navigate } from "react-router"


const ProtectedRoutes = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if(isLoading) return <AppLoadingScreenUI/>

  return isAuthenticated ? <Outlet/> : <Navigate to={`/`}/>;
}

export default ProtectedRoutes
