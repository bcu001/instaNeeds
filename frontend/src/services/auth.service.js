import api from "@/lib/axios"
import toast from "react-hot-toast";


export const signIn = async(email, password)=>{
    const res = await api.post(`/auth/signin`,{email,password});
    toast.success("user is logged in",{duration:600})
    return res?.data?.data;
}

export const signUp = async(name,email,password)=>{
    const res = await api.post(`/auth/signup`,{name,email,password})
    toast.success("user account is created",{duration:600})
    return res.data?.data;
}

export const getCurrentUser = async()=>{
    const res = await api.get(`/auth/me`);
    toast.success("User detail fetched",{duration:600});
    return res.data?.data;
}

export const signOut = async()=>{
    const res = await api.post(`/auth/signout`);
    toast.success("user sign out",{duration:600});
    return res.data?.data;
}
export const signOutAll = async()=>{
    const res = await api.post(`/auth/signout-all`);
    toast.success("user sign out",{duration:600});
    return res.data?.data;
}

export const refreshToken = async()=>{
    const res = await api.post('/auth/refresh');
    toast.success("access token refresh and refreshtoken rotated",{duration:600});
    return res.data?.data;
}