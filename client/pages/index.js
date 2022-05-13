import { useEffect, useState } from "react";
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'

import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import LinearIndeterminate from "@/components/LinearProgress ";
import { userActions } from '@/modules/reducers/user.js';
import { aiActions } from '@/modules/reducers/ai.js';


// import "@/styles/main.scss";

export default function Home() {
    const token = useToken();
    useEffect(()=>{
        if (typeof token !== 'string') {
            Router.push('/auth/login');
        }
    }, [token])
    if (typeof token !== 'string') {
        return <LinearIndeterminate />
    }

    const data = useSelector((state) => state.users.data)
    const dataAi = useSelector((state) => state.ais)

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const modalObject = {
        openModal, handleCloseModal, handleOpenModal
    }
    const [openAiModal, setOpenAiModal] = useState(false);
    const handleOpenAiModal = () => {
        dispatch(aiActions.modelListRequest(dataAi))

        setOpenAiModal(true);
    }
    const handleCloseAiModal = () => setOpenAiModal(false);
    const modalAiObject = {
        openAiModal, handleCloseAiModal, handleOpenAiModal
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
        setAlarm({
            ...alarm,
            [name]: value
        })
    }

    const onDelAlarm = (data, e) => {
        const inputValue = {_id:data._id, ...inputData}
        dispatch(userActions.delAlarmRequest(inputValue))
        
    }


    return (
        <Layout>
            <Head>
                <title>DEEPBRAIN</title>
            </Head>
            <Header data={data[0]} modalObject={modalObject} onSubmitAlarm={onSubmitAlarm} onChangeAlarm={onChangeAlarm} />
            <Studio data={data} onDelAlarm={onDelAlarm} modalAiObject={modalAiObject} dataAi={dataAi} />
        </Layout>
    )
}
