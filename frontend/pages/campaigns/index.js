import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import Axios from 'axios';

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

							// return
							return (

								<div key={'campaign-index-' + i}>

									<div className='mt-4'>

										<Link

											href={{

												pathname: '/campaigns/' + campaign.id
											}}
										>

											<a className='text-decoration-none'>

												Voting Campaign {i + 1} : {campaign.name}
											</a>
										</Link>
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
