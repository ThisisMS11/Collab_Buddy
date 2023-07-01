import { useAuth } from "../contexts/user"
import { useNavigate,Navigate,useLocation } from "react-router-dom"

type AuthRequireProps={
    children:React.ReactNode
}

const AuthRequire = ({children}:AuthRequireProps) => {
    const auth=useAuth()
    const navigate=useNavigate()
    const location=useLocation()

    if(!auth.user){
        return <Navigate to="/login" state={{ path: location.pathname }} />

    }

    return (
        <>
            {children}
        </>
    )
    
}

export default AuthRequire