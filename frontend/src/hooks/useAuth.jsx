import AuthContext from "@/context/auth/AuthContext"
import { useContext } from "react"

const useAuth = ()=>{
    const ctx = useContext(AuthContext);
    if(!ctx) console.error("Error at useAuth");
    return ctx;
}

export default useAuth