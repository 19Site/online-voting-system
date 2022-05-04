import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Axios from 'axios';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

export default function Home() {

	// use router
	const router = useRouter();

	// get id
	const { id } = router.query;

	// campaign
	const [campaign, setCampaign] = useState(undefined);

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

		// get campaign
		const res = await Axios.get('/api/v1/campaigns/' + id);

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// get campaigns
		const campaigns = data.data;

		// update campaign
		setCampaign(campaigns[0]);
	};

	/**
	 * save
	 */
	const save = async () => {

		// get campaign
		const res = await Axios.patch('/api/v1/campaigns/' + id, {

			...campaign
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

		// get campaign
		const res = await Axios.delete('/api/v1/campaigns/' + id);

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// change page
		router.replace({

			pathname: '/campaigns'
		});
	};

	// render
	return (

		<div className='container'>

			<Head>

				<title>Campaign - Online voting system</title>

				<meta name='description' content='Online voting system' />
			</Head>

			<div className='row mt-3'>

				<div className='col'>

					<div className='h2'>

						<Link

							href={{

								pathname: '/campaigns'
							}}
						>

							<a className='text-decoration-none'>

								Campaigns #{id}
							</a>
						</Link>
					</div>
				</div>
			</div>

			<div className='row mt-3'>

				<div className='col'>

					{ // campaign 

						campaign ? (

							<>

								<div>

									<label className='form-label'>

										Name
									</label>

									<input

										className='form-control'

										type='text'

										value={campaign.name || ''}

										onChange={

											evt => {

												const value = evt.target.value;

												setCampaign({

													...campaign,

													name: value
												});
											}
										}
									/>
								</div>

								<div className='mt-4'>

									<label className='form-label'>

										Description
									</label>

									<input

										className='form-control'

										type='text'

										value={campaign.description || ''}

										onChange={

											evt => {

												const value = evt.target.value;

												setCampaign({

													...campaign,

													description: value
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
