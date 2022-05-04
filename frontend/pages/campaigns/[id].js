import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Axios from 'axios';

import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import Layout from '../../components/layout';

export default function Page() {

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

		// campaign id
		let campaignId = undefined;

		{ // campaign

			// get campaign
			const res = await Axios.patch('/api/v1/campaigns/' + id, {

				...campaign
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

			// campaign id
			campaignId = data.id;
		}

		{ // campaign options

			const options = campaign.campaignOptions || [];

			for (const option of options) {

				// res
				let res = undefined;

				// update
				if (option.id) {

					// get campaign
					res = await Axios.patch('/api/v1/campaign-options/' + option.id, {

						...option
					});
				}

				// create
				else {

					// get campaign
					res = await Axios.post('/api/v1/campaign-options', {

						...option,

						campaign_id: campaignId
					});
				}

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
			}
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

			// error
			return Swal.fire({

				icon: 'error',

				title: 'Error',

				text: data.error
			});
		}

		// change page
		router.replace({

			pathname: '/campaigns'
		});
	};

	/**
	 * remove campaign option
	 */
	const removeCampaignOption = async index => {

		// get option
		const option = campaign.campaignOptions[index];

		// new option
		if (!option.id) {

			// remove from memory
			return setCampaign({

				...campaign,

				campaignOptions: campaign.campaignOptions.filter((m, i) => i !== index)
			})
		}

		// get campaign
		const res = await Axios.delete('/api/v1/campaign-options/' + option.id);

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

		// load data
		load();
	}

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

						Campaigns #{id}
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

								{ // campaign options

									campaign.campaignOptions ? campaign.campaignOptions.map((campaignOption, i) => {

										return (

											<div

												key={'campaign-options-i-' + i}

												className='mt-4'
											>

												<label className='form-label'>

													Option #{i + 1}
												</label>

												<div className='input-group'>

													<input

														className='form-control'

														type='text'

														value={campaignOption.name || ''}

														onChange={

															evt => {

																const value = evt.target.value;

																setCampaign({

																	...campaign,

																	campaignOptions: campaign.campaignOptions.map((m, i2) => {

																		if (i === i2) {

																			return {

																				...m,

																				name: value
																			};
																		}

																		else {

																			return m;
																		}
																	})
																});
															}
														}
													/>

													<button

														className='btn btn-danger'

														onClick={evt => removeCampaignOption(i)}
													>

														Remove option
													</button>
												</div>
											</div>
										);
									}) : undefined
								}

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

									<button

										className='btn btn-primary ms-4'

										onClick={evt => setCampaign({

											...campaign,

											campaignOptions: [...campaign.campaignOptions, {}]
										})}
									>

										Add option
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