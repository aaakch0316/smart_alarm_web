import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>DeepBrain | Smart-Alarm</title>
			</Head>
			{children}
		</main>
	);
}
