import axios from 'axios';

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "content-Type": "application/json",
    Authorization: "JWT fetching..."
}

export const joinApi = async (payload) => {
    try{
        const response = await axios.post(`${SERVER}/user/join`, payload, {headers})
        return response.data
    }catch(error){
        return error
    }
}

export const loginApi = async (payload) => {
    try{
        const response = await axios.post(
            `${SERVER}/user/login`,
            payload,
            {headers}
        )
        const loginUser = JSON.stringify(response.data)
        // localStorage.setItem("loginUser", loginUser)
        // console.log('loginUser')
        // console.log(loginUser)
        // console.log(response.token)
        // console.log(loginUser.token)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const logoutApi = async () => {
    try{
        const response = await axios.get(
            `${SERVER}/user/logout`,
            {headers}  
        )  
    }catch(error){
        return error
    }
}

export const delUserApi = async () => {
    try {
        const response= await axios.delete(  // : AxiosResponse 는 정해진거다.
            `${SERVER}/user/delUserApi`,
            {headers} 
        )    
    }catch(err){
        return err;
    }
}