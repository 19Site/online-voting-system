import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import { useContext, useEffect, useReducer, useState } from 'react';

import Axios from 'axios';

import Moment from 'moment';

import Swal from 'sweetalert2';

import Qs from 'qs';

import { Context } from '../../context/context';

import { useRouter } from 'next/router';

export default function Page() {

	// R
	const R = useContext(Context);

	// router
	const router = useRouter();

	// campaigns
	const [campaigns, setCampaigns] = useState([]);

	// component did mount
	useEffect(() => {

		// router not ready
		if (!router.isReady) {

			return;
		}

		// no session
		if (!R.session.accessToken) {

			// exit
			router.replace({

				pathname: '/login'
			});

			// exit
			return;
		}

		// load data
		load();
	}, [router.isReady]);

	/**
	 * load
	 */
	const load = async () => {

		// user id
		const { accessToken } = R.session;

		// get campaigns
		const res = await Axios.get('/api/v1/campaigns?' + Qs.stringify({

			votable: 1
		}), {

			headers: {

				Authorization: 'Bearer ' + accessToken
			}
		});

		// data
		const data = res.data;

		// error
		if (!data.ok) {

			return;
		}

		// get campaigns
		const campaigns = data.data;

		// update campaigns
		setCampaigns(campaigns);
	};

	/**
	 * do vote
	 */
	const doVote = async (optionId) => {

		// user id
		const { accessToken } = R.session;

		// get campaigns
		const res = await Axios.post('/api/v1/actions/do-vote', {

			optionId: optionId
		}, {

			headers: {

				Authorization: 'Bearer ' + accessToken
			}
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

		// load data
		load();
	};

	// render
	return (

		<div className='container'>

			<div className='row mt-4'>

				<div className='col'>

					<div className='h3'>

						Campaigns
					</div>

					{ // campaigns

						campaigns.length > 0 ? campaigns.map((campaign, i) => {

							// start at
							const startAt = Moment(campaign.startAt).isValid() ? Moment(campaign.startAt).format('LLL') : '---';

							// end at
							const endAt = Moment(campaign.endAt).isValid() ? Moment(campaign.endAt).format('LLL') : '---';

							// voted
							const voted = campaign.campaignOptions.reduce((a, b) => a === 1 ? a : (b.hasMe === 1 ? 1 : 0), 0);

							// return
							return (

								<div key={'campaign-index-' + i}>

									<div

										className='mt-4 py-4'

										style={{

											borderTop: 'solid 1px #EEEEEE'
										}}
									>

										<div className='fw-bold'>

											Voting Campaign {i + 1} : {campaign.name}
										</div>

										<div className='text-secondary small mt-1'>

											<span>

												Start: {startAt}
											</span>

											<span className='ms-3'>

												End: {endAt}
											</span>
										</div>

										{ // campaigns options

											campaign.campaignOptions.map((option, i2) => {

												// return
												return (

													<div key={'campaign-index-' + i + '-options-' + i2}>

														<div className='ms-4 mt-2'>

															<div>

																{ // voted

																	voted ? undefined : (

																		<button

																			className='btn btn-primary btn-sm me-3'

																			onClick={evt => doVote(option.id)}
																		>

																			Vote this
																		</button>
																	)
																}

																<span className=''>

																	{i2 + 1}. {option.name}
																</span>

																<span className='ms-5'>

																	Vote : {option.voteCount}

																	{ // me vote
																		option.hasMe === 1 ? (

																			<span className='ms-5'>

																				(You voted)
																			</span>
																		) : undefined
																	}
																</span>
															</div>
														</div>
													</div>
												);
											})
										}
									</div>
								</div>
							);
						}) : (

							<div className='py-5 text-center'>

								no data
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
}
