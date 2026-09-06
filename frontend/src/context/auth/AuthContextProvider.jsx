import AuthContext from "@/context/auth/AuthContext"
import { setAxiosAccessToken } from "@/lib/axios";
import { getCurrentUser, signIn, signOut, signOutAll, signUp } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AuthContextProvider = ({children})=>{
    const queryClient = useQueryClient();
    const [accessToken, setAccessToken] = useState(null);

    const {data:userData, isLoading} = useQuery({
        queryKey:["authUser"],
        queryFn: getCurrentUser,
        retry:false
    })

    const signinMutation = useMutation({
        mutationFn: ({email,password})=>signIn(email,password),
        onSuccess:(data)=>{
            setAccessToken(data?.accessToken);
            setAxiosAccessToken(data?.accessToken);
            queryClient.invalidateQueries({
                queryKey:["authUser"]
            });
        }
    })
    const signupMutation = useMutation({
        mutationFn: ({name,email,password})=>signUp(name,email,password),
    })
    const signoutMutation = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            setAccessToken(null);
            setAxiosAccessToken(null);
            queryClient.removeQueries({queryKey:["authUser"]});
        }
    })
    const signoutAllMutation = useMutation({
        mutationFn: signOutAll,
        onSuccess: () => {
            setAccessToken(null);
            setAxiosAccessToken(null);
            queryClient.removeQueries({queryKey:["authUser"]});
        }
    })

    const signinHandler = (email,password)=>signinMutation.mutateAsync({email,password});
    const signupHandler = (name,email,password)=>signupMutation.mutateAsync({name,email,password});
    const signoutHandler = ()=>signoutMutation.mutateAsync();
    const signoutAllHandler = ()=>signoutAllMutation.mutateAsync();

    const user = userData?.user ?? null

    return(
        <AuthContext.Provider value={{
            user,
            accessToken,
            setAccessToken,
            isAuthenticated: !!user,
            isLoading,
            signinHandler,
            signinPending:signinMutation.isPending,
            signupHandler,
            signupPending:signupMutation.isPending,
            signoutHandler,
            signoutAllHandler
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;