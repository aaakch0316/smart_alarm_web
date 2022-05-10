import { Header, Layout, Modal, Studio } from "@/components";
import useToken from "@/hooks/useToken";
import Head from 'next/head';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Router from 'next/router';
import { useEffect } from "react";
import LinearIndeterminate from "@/components/LinearProgress ";



// import "@/styles/main.scss";


export default function Home() {
    const token = useToken();
    const router = useRouter()

    useEffect(()=>{
        if (token !== null) {
            // router.push('/auth/login') // 이제 토큰 들어와 있으면 home로 간다.
            Router.push('/auth/login');
            // window.location.href('/auth/login')
        }

    }, [])
    if (token !== null) {
        return <LinearIndeterminate />
    }

    const data = useSelector((state) => state.users.data)
    // console.log(data[0].userName)
    // console.log(data?.userName)
    // console.log(data)
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
