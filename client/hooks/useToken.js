import { getToken } from "@/services/tokenService";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useToken() {
    // useEffect(() => {
    //     let localToken = getToken()
    //     console.log(localToken)
    //     console.log(localToken)
    //     if (typeof token !== 'string') {
    //         // token = localStorage.getItem("token")
    //         token = localToken
    //     } else{
    //         return token
    //     }
    // }, [])
    const user = useSelector(
        (state) => state.users.data
    )
    const token = user[0]?.accessToken
    
    return token;
}