// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css';

import Head from 'next/head';

import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {

	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(

		<>

			<Head>

				<meta name='viewport' content='width=device-width, initial-scale=1' />

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
