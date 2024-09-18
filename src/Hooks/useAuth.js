import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthProvider"

const useAuth = () => {
    const { user, data, register, users, login, logout } = useContext(AuthContext)

    return {
        user,
        data,
        register,
        users,
        login,
        logout
    }
}

export default useAuth