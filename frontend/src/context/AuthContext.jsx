import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const navigation = useNavigate()

    const signin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/signin', {
                username,
                password
            }, {withCredentials: true})
            setUser(response.statusText)
            console.log(response.statusText)
            alert("Your account has been created");
            navigation("/")
        } catch (error) {
            console.error("Sign up failed", error);
            alert("Failed to create account. Please try again.");
        }
    }

    const signup = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup', {
                username,
                password
            }, {withCredentials: true})
            setUser(response.data.user)
            alert("You are logged in");
            navigation("/")
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please try again.");
        }
    }

    const logout = async() => {
        try {
            const response  = await axios.get('http://localhost:3000/logout', {}, {withCredentials:true})
            setUser(null)
            alert("your successfully logout!")
            navigation("/api/v1/signup")
        } catch (error) {
            console.log("logout failed", error)
        }
    }

    return (
        <AuthContext.Provider value={{user, signin, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)