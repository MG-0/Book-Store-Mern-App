import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import { toast } from 'react-toastify'

export default function useSignup() {
    const [form, setForm] = useState({
        name:'',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((p) => ({...p, [name]: value}))
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
             await axiosInstance.post("/users/signup", form )
           
            toast.success("Account created successfully! 🎉 Redirecting...", {
                autoClose: 200
            });
            setTimeout(() => {
                navigate('/signin')
            }, 1000);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "SignUp is Failed, Try Again pls."
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return { handleSignup, loading, form, handleChange };
}