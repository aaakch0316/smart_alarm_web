import { Layout, Register } from "@/components";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';  
import { userActions } from '../../modules/reducers/user.js';




export default function RegisterPage() {
    const [open, setOpen] = useState(false)
    const [user, setUser] =useState({
        email:'', password:'', name: '', feature: [],
    })
    const [diseases, setDiseases] = useState({
        고혈압: false,
        당뇨병: false,
        고지혈증: false,
        관절염: false,
        치매: false
        
    })
    
    useEffect(()=> {
        const inputList = [];
        for (let i in diseases){
            if (diseases[i] === true){
                inputList.push(i)
            }
        }
        setUser({
            ...user,
            ['feature']: inputList
        })
    }, [diseases])

    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const onCheck = e => {
        e.preventDefault()
        const name = e.target.name;

        setDiseases({
            ...diseases,
            [name] : e.target.checked
        })
    }


    const onSubmit = e => {
        e.preventDefault()
        if (user.password === user.password2){
            dispatch(userActions.joinRequest({
                email: user.email,
                password: user.password,
                name: user.name,
                age: String(user.age),
                feature: user.feature
            }))
        } else {
            setOpen(true)
        }
    }
    return (
        <>
        <Collapse in={open}>
            <Alert 
                severity="error"
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >This is an error alert — check your password!</Alert>
        </Collapse>
        <Layout>
            <Register onChange={onChange} onCheck={onCheck} onSubmit={onSubmit} />
        </Layout>
        </>
    )
}
