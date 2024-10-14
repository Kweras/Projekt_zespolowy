import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn || isLoggedIn === false) {
            navigate("/login")
        }
    }, [navigate])

    return (<>{children}</>)
}

export default PrivateRoute;