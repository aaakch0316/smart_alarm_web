import { Layout, Register } from "@/components";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';




export default function RegisterPage() {
    const [open, setOpen] = useState(false)
    const [user, setUser] =useState({
        email:'', password:''
    })
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        console.log(user )
        if (user.password === user.password2){
            console.log('같다')
        } else {
            setOpen(true)
        }
        // dispatch(registerRequest(user))
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
            <Register onChange={onChange} onSubmit={onSubmit} />
        </Layout>
        </>
    )
}
