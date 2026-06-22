import { useState, useEffect, useContext, createContext } from "react";
import axiosInstance from "../api/axiosInstance";

// CreateContext
const AuthContext = createContext(null);

// USeContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
         throw new Error("useAuth must be used inside an AuthProvider");
    }
    return context;
}

// Provider Context
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await axiosInstance.get("/users/verify");
            setUser(response?.data?.user || null);
            
        } catch (errro) {
            console.log("Authentication is failed!", errro);
            setUser(null)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuthStatus()
    },[])

    const signup = async (userData) => {
        try {
            const response = await axiosInstance.post("/users/signup", userData);
            setUser(response?.data?.user)
            return {success: true};
        } catch (error) {
            setUser(null)
            return {success: false, error: error?.response?.data?.message || 'Signup failed,  try Again!'}
        }
    }

    const signin = async (credentials) => {
        try {
                    const response = await axiosInstance.post(
                      "/users/signin",
                      credentials,
                    );
                    setUser(response?.data?.user)
                    return { success: true }
            
        } catch (error) {
            return {
              success: false,
              error:
                error.response?.data?.message || "Signin failed, try again",
            };
        }
    }

    const signout = async () => {
      try {
        await axiosInstance.post("/users/signout");
      } catch (error) {
        console.log("Signout failed", error);
      } finally {
        setUser(null);
      }
    };

    const value = {
      signup,
      signout,
      signin,
      user,
      loading,
      isAuthentication: !!user,
      isAdmin: user?.role === "admin",
      refreshAuthStatus: checkAuthStatus,
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>


}