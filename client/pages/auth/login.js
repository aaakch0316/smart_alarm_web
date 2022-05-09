import { Layout, Login } from "@/components";
import { useState } from "react";
import { useDispatch } from 'react-redux';  
import { userActions } from '../../modules/reducers/user.js';



export default function LoginPage() {
    const [user, setUser] =useState({
        email:'', password:''
    })
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        console.log(e.target.name)
        console.log(e.target.value)
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        // console.log('??')
        // console.log(user.email, user.password)
        dispatch(userActions.loginRequest(user))
        if (user.email && user.password) {
            console.log(user.email, user.password)
            dispatch(userActions.loginRequest({
                email: user.email,
                password: user.password
            }))
        }
    }
    return (
        <Layout>
            <Login onChange={onChange} onSubmit={onSubmit}/>
        </Layout>
    )
}
