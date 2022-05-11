import { useEffect } from "react";
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'

import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import LinearIndeterminate from "@/components/LinearProgress ";

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

    const dispatch = useDispatch()

    // const getAlarms = useCallback(() => {
    //     dispatch(getBooksSagaStart());
    // }, [dispatch]);



    const data = useSelector((state) => state.users.data)
    return (
        <Layout>
            <Head>
                <title>DEEPBRAIN</title>
            </Head>
            <Header data={data[0]} />
            <Studio data={data[0]} />
        </Layout>
    )
}
