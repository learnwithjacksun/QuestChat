import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthProvider"

const useAuth = () => {
    const {getUserData, user, data, register, users, login, logout } = useContext(AuthContext)

    return {
        user,
        data,
        register,
        users,
        login,
        logout,
        getUserData
    }
}

export default useAuth