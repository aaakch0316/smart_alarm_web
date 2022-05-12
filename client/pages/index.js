import { useEffect, useState } from "react";
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'

import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import LinearIndeterminate from "@/components/LinearProgress ";
import { userActions } from '@/modules/reducers/user.js';


// import "@/styles/main.scss";

export default function Home() {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const modalObject = {
        openModal, handleCloseModal, handleOpenModal
    }


    const token = useToken();
    const data = useSelector((state) => state.users.data)


    useEffect(()=>{
        if (typeof token !== 'string') {
            Router.push('/auth/login');
        }

    }, [token])

    if (typeof token !== 'string') {
        return <LinearIndeterminate />
    }

    const dispatch = useDispatch()

    // const getAlarms = useCallback(() => {
    //     dispatch(getBooksSagaStart());
    // }, [dispatch]);
    const [alarm, setAlarm] =useState({
        content:'', alerthour:'', alertmin: '', email: data[0]?.userDetail.email
    })
    const inputData = {email: data[0]?.userDetail.email}

    const onSubmitAlarm = (e) => {
        e.preventDefault()
        dispatch(userActions.alarmRequest(alarm))
        handleCloseModal()
        Router.push('/');
    } 
    const onChangeAlarm = e => {
        e.preventDefault()
        const {name, value} = e.target;
        console.log(name, value)
        setAlarm({
            ...alarm,
            [name]: value
        })
    }

    const onDelAlarm = (data, e) => {
        const inputValue = {_id:data._id, ...inputData}
        dispatch(userActions.delAlarmRequest(inputValue))
        console.log(inputValue)
        
    }


    return (
        <Layout>
            <Head>
                <title>DEEPBRAIN</title>
            </Head>
            <Header data={data[0]} modalObject={modalObject} onSubmitAlarm={onSubmitAlarm} onChangeAlarm={onChangeAlarm} />
            <Studio data={data} onDelAlarm={onDelAlarm} />
        </Layout>
    )
}
