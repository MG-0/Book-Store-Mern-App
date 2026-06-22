import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";



export default function useSignin() {
    const [ form, setForm ] = useState({
        email: '',
        password: '',
        
    })
    const navigate = useNavigate()
    // التعديل: قمنا باستيراد واستخدام refreshAuthStatus من سياق المصادقة (AuthContext)
    // حتى نتمكن من إخبار تطبيق React فوراً بأن المستخدم قد قام بتسجيل الدخول بنجاح وتحديث حالته.
    const { refreshAuthStatus } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((p) => ({...p, [name]: value}))
    }
    const handleSignin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post("/users/signin", form)
            
            // التعديل: نقوم باستدعاء refreshAuthStatus لجلب بيانات المستخدم والتحقق منها وتحديث سياق التطبيق
            // هذا يضمن أن المتصفح يرى الأدمن مسجلاً ويُظهر زر لوحة التحكم في الهيدر فوراً قبل الانتقال.
            await refreshAuthStatus()
            
            const role = response?.data?.role  || 'user';
            const redirect = response?.data?.redirect || (role === 'admin' ? '/admin' : '/')
            toast.success("User Signin Successfully!🎉 Redirecting...");
            
            setTimeout(() => {
                navigate(redirect, { replace: true });
            }, 1000)
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signin Failed"
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }
    
    return {loading, handleSignin, handleChange, form}
}