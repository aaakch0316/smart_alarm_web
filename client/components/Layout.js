import Head from "next/head";

export function Layout({ children }) {
	return (
		<main class="layout">
			<Head>
				<title>DeepBrain | Smart-Alarm</title>
			</Head>
			{children}
		</main>
	);
}
