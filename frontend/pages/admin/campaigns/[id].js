import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Axios from 'axios';

import Swal from 'sweetalert2';

import Moment from 'moment';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'

import Layout from '../../../components/layout';

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
	}, [router.isReady, id]);

	/**
	 * load
	 */
	const load = async () => {

		// new campaign
		if (id === 'new') {

			return setCampaign({

				startAt: Moment().format('YYYY-MM-DD') + ' 00:00:00',

				endAt: Moment().add(7, 'days').format('YYYY-MM-DD') + ' 23:59:59'
			});
		}

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

		// first campaign
		const campaign = campaigns[0];

		// update campaign
		setCampaign({

			...campaign,

			startAt: Moment(campaign.startAt).isValid() ? Moment(campaign.startAt).format('YYYY-MM-DD HH:mm:ss') : undefined,

			endAt: Moment(campaign.endAt).isValid() ? Moment(campaign.endAt).format('YYYY-MM-DD HH:mm:ss') : undefined
		});
	};

	/**
	 * save
	 */
	const save = async () => {

		// campaign id
		let campaignId = undefined;

		{ // campaign

			// res
			let res = undefined;

			// update
			if (id !== 'new') {

				// update campaign
				res = await Axios.patch('/api/v1/campaigns/' + id, {

					...campaign
				});
			}

			// new
			else {

				// new campaign
				res = await Axios.post('/api/v1/campaigns', {

					...campaign
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

		// redirect
		router.replace({

			pathname: '/admin/campaigns/' + campaignId
		});
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

			pathname: '/admin/campaigns'
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

								<div className='mt-4'>

									<label className='form-label'>

										Start at
									</label>

									<input

										className='form-control'

										type='text'

										value={campaign.startAt || ''}

										onChange={

											evt => {

												const value = evt.target.value;

												setCampaign({

													...campaign,

													startAt: value
												});
											}
										}
									/>
								</div>

								<div className='mt-4'>

									<label className='form-label'>

										End at
									</label>

									<input

										className='form-control'

										type='text'

										value={campaign.endAt || ''}

										onChange={

											evt => {

												const value = evt.target.value;

												setCampaign({

													...campaign,

													endAt: value
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

									{ // delete

										campaign.id ? (

											<button

												className='btn btn-danger ms-4'

												onClick={evt => remove()}
											>

												Remove
											</button>
										) : undefined
									}

									<button

										className='btn btn-primary ms-4'

										onClick={evt => setCampaign({

											...campaign,

											campaignOptions: [...(campaign.campaignOptions || []), {}]
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