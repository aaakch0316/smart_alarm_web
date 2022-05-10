import { Header, Layout, Modal, Studio } from "@/components";
import Head from 'next/head';
import { useSelector } from 'react-redux'


// import "@/styles/main.scss";


export default function Home() {
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
