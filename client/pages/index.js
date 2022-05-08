import { Header, Layout, Modal, Studio } from "@/components";
import Head from 'next/head';

// import "@/styles/main.scss";


export default function Home() {
    return (
        <Layout>
            <Head>
                <title>DEEPBRAIN</title>
            </Head>
            <Header/>
            <Studio/>
        </Layout>
    )
}
