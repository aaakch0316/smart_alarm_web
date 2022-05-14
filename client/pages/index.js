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

    const [ aiModelInfo, setAiModelInfo ] = useState({
        language: '', text: '', model: ''
    })

    const onChangeModelInfo = e => { 
        const {name, value} = e.target;
        setAiModelInfo({
            ...aiModelInfo,
            [name]: value
        })
    }
    const onTargetModelInfo = (targetObject) =>{
        console.log(targetObject)
        if (targetObject.language === 'ko'){
            alert("지원하지 않는 언어 입니다. 다시 선택해 주세요")
        }
        setAiModelInfo({
            ...aiModelInfo,
            ['language']: targetObject.language,
            ['model']: targetObject.model
        })
    }

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
    const handleCloseAiModal = (e) => {
        // e.preventDefault()
        console.log(aiModelInfo)
        setOpenAiModal(false);
    }
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
    const [alarmList, setAlarmList] = useState([])
    const inputData = {email: data[0]?.userDetail.email}
    const [videoSource, setVideoSource] = useState("https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/ysy_2_a8d4cf2dbe8a094cc62a0a1e6a80cfc8.mp4")
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

    const onAddAlarm = (data, e) => {
        setAlarmList([
            ...alarmList,
            dispatch(userActions.addAlarmRequest(inputValue))
        ])
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
            <Studio data={data} onChangeModelInfo={onChangeModelInfo} onTargetModelInfo={onTargetModelInfo} videoSource={videoSource} setVideoSource={setVideoSource} onDelAlarm={onDelAlarm} modalAiObject={modalAiObject} dataAi={dataAi} />
        </Layout>
    )
}
