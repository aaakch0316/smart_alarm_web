import { useEffect, useState } from "react";
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'

import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import LinearIndeterminate from "@/components/LinearProgress ";
import { userActions } from '@/modules/reducers/user.js';
import { aiActions } from '@/modules/reducers/ai.js';
import TokenService from "@/services/tokenService";


// import "@/styles/main.scss";

export default function Home() {
    let token = useToken();
    let localToken = TokenService.get()
    
    useEffect(()=>{
        // if (typeof token !== 'string' && typeof localToken !== 'string') {
        if (typeof token !== 'string') {
            Router.push('/auth/login');
        }
    }, [token])
    // if (typeof token !== 'string' && typeof localToken !== 'string') {
    if (typeof token !== 'string' ) {
        return <LinearIndeterminate />
    }

    const data = useSelector((state) => state.users.data)
    const dataAi = useSelector((state) => state.ais)
    

    const [ aiModelInfo, setAiModelInfo ] = useState({
        language: '', text: '', model: '', modelName:''
    })

    const onChangeModelInfo = e => { 
        const {name, value} = e.target;
        setAiModelInfo({
            ...aiModelInfo,
            [name]: value
        })
    }
    const onTargetModelInfo = (targetObject) =>{
        if (targetObject.language !== 'ko'){
            alert("지원하지 않는 언어 입니다. 다시 모델을 선택해 주세요")
        }
        setAiModelInfo({
            ...aiModelInfo,
            ['language']: targetObject.language,
            ['model']: targetObject.model,
            ['modelName']: targetObject.modelName
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
    const handleSimpleClose = () => {
        setOpenAiModal(false);
    }
    const handleCloseAiModal = (alarm, e) => {
        e.preventDefault()
        dispatch(userActions.delAlarmRequest({_id:alarm._id, email:data[0].userDetail.email}))
        dispatch(aiActions.videoRequest({...aiModelInfo, alarm:alarm, email:data[0].userDetail.email}))
        setOpenAiModal(false);
    }
    const modalAiObject = {
        openAiModal, handleCloseAiModal, handleOpenAiModal, handleSimpleClose
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
    const [videoSource, setVideoSource] = useState("https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/ysy_1_3bce1777b53cdc214cc89cd3ef3e15cc.mp4")
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
            <Studio data={data} aiModelInfo={aiModelInfo} onChangeModelInfo={onChangeModelInfo} onTargetModelInfo={onTargetModelInfo} videoSource={videoSource} setVideoSource={setVideoSource} onDelAlarm={onDelAlarm} modalAiObject={modalAiObject} dataAi={dataAi} />
        </Layout>
    )
}
