import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import Axios from 'axios';

import Moment from 'moment';

export default function Page() {

	// campaigns
	const [campaigns, setCampaigns] = useState([]);

	// component did mount
	useEffect(() => {

		// load data
		load();
	}, []);

	/**
	 * load
	 */
	const load = async () => {

		// get campaigns
		const res = await Axios.get('/api/v1/campaigns');

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

														<div className='ms-4 mt-1'>

															{i2 + 1}. {option.name}
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
