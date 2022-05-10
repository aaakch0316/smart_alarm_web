import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import Head from 'next/head';
import { useSelector } from 'react-redux'
import Router from 'next/router';
import { useEffect } from "react";
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

    const data = useSelector((state) => state.users.data)
    return (
        <Layout>
            <Head>
                <title>DEEPBRAIN</title>
            </Head>
            <Header data={data[0]} />
            {JSON.stringify(token)}adf
            <Studio data={data[0]} />
        </Layout>
    )
}
