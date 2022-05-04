import Head from 'next/head';

import Image from 'next/image';

import { useContext, useEffect, useState } from 'react';

import Axios from 'axios';

import Swal from 'sweetalert2';

import { useRouter } from 'next/router';

import { Context } from '../context/context';

export default function Page() {

	// R
	const R = useContext(Context);

	// router
	const router = useRouter();

	// hkid
	const [hkid, setHkid] = useState('J8888888');

	/**
	 * do login
	 */
	const doLogin = async () => {

		// get campaigns
		const res = await Axios.post('/api/v1/actions/do-login', {

			hkid: hkid
		});

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			// error
			return Swal.fire({

				icon: 'error',

				title: 'Error',

				text: data.error
			});
		}

		// get user
		const user = data.user;

		// set session
		R.setSession({

			...R.session,

			userId: user.id
		});

		// redirect
		router.replace({

			pathname: '/campaigns'
		});
	};

	// render
	return (

		<div className='container'>

			<div className='row mt-4'>

				<div className='col'>

					<div className='h3'>

						Login with HKID
					</div>
				</div>
			</div>

			<div className='row'>

				<div className='col'>

					<div className='mt-4'>

						<label className='form-label'>

							HKID
						</label>

						<input

							className='form-control'

							type='text'

							value={hkid}

							onChange={evt => setHkid(evt.target.value)}
						/>
					</div>

					<div className='mt-4'>

						<button

							className='btn btn-primary'

							onClick={evt => doLogin()}
						>

							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
