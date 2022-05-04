import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Axios from 'axios';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import Layout from '../../components/layout';

export default function Page() {

	// use router
	const router = useRouter();

	// get id
	const { id } = router.query;

	// user
	const [user, setUser] = useState(undefined);

	// component did mount
	useEffect(() => {

		// router not ready
		if (!router.isReady) {

			return;
		}

		// load data
		load();
	}, [router.isReady]);

	/**
	 * load
	 */
	const load = async () => {

		// get user
		const res = await Axios.get('/api/v1/users/' + id);

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// get users
		const users = data.data;

		// update user
		setUser(users[0]);
	};

	/**
	 * save
	 */
	const save = async () => {

		// get user
		const res = await Axios.patch('/api/v1/users/' + id, {

			...user
		});

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// load data
		load();
	};

	/**
	 * remove
	 */
	const remove = async () => {

		// get user
		const res = await Axios.delete('/api/v1/users/' + id);

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// change page
		router.replace({

			pathname: '/users'
		});
	};

	// render
	return (

		<div className='container'>

			<Head>

				<title>User - Online voting system</title>

				<meta name='description' content='Online voting system' />
			</Head>

			<div className='row mt-3'>

				<div className='col'>

					<div className='h2'>

						Users #{id}
					</div>
				</div>
			</div>

			<div className='row mt-3'>

				<div className='col'>

					{ // user 

						user ? (

							<>

								<div>

									<label className='form-label'>

										HKID
									</label>

									<input

										className='form-control'

										type='text'

										value={user.hkid || ''}

										onChange={

											evt => {

												const value = evt.target.value;

												setUser({

													...user,

													hkid: value
												});
											}
										}
									/>
								</div>

								<div className='mt-4'>

									<button

										className='btn btn-success'

										onClick={evt => save()}
									>

										Save
									</button>

									<button

										className='btn btn-danger ms-4'

										onClick={evt => remove()}
									>

										Remove
									</button>
								</div>
							</>
						) : undefined
					}
				</div>
			</div>
		</div>
	);
}

Page.getLayout = function getLayout(page) {

	return (

		<Layout>{page}</Layout>
	);
};