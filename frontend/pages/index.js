import Head from 'next/head';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import Axios from 'axios';

import { useRouter } from 'next/router';

export default function Page() {

	// router
	const router = useRouter();

	// component did mount
	useEffect(() => {

		if (!router.isReady) {

			return;
		}

		router.replace({

			pathname: '/campaigns'
		});
	}, [router.isReady]);

	// render
	return (

		<div className='container'>
		</div>
	);
}
