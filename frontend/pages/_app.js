// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css';

import Head from 'next/head';

import React, { useState, useContext } from 'react';

import { Context } from '../context/context';

// my app
function MyApp({ Component, pageProps }) {

	// session
	const [session, setSession] = useState({

		// access token
		accessToken: undefined,

		// refresh token
		refreshToken: undefined
	});

	// get layout
	const getLayout = Component.getLayout || ((page) => page);

	// render
	return getLayout(

		<Context.Provider

			value={{ session, setSession }}
		>

			<Head>

				<title>Online voting system</title>

				<meta name='description' content='Online voting system' />

				<meta name='viewport' content='width=device-width, initial-scale=1' />

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Component {...pageProps} />
		</Context.Provider>
	);
}

export default MyApp;
