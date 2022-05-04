import Head from 'next/head';

import Image from 'next/image';

import Link from 'next/link';

import Axios from 'axios';

import { useEffect, useState } from 'react';

export default function Home() {

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

			<Head>

				<title>Users - Online voting system</title>

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

								Campaigns
							</a>
						</Link>
					</div>
				</div>
			</div>

			<div className='row mt-3'>

				<div className='col'>

					<table className='table'>

						<thead>

							<tr>

								<th>

									Id
								</th>

								<th>

									Name
								</th>

								<th>

									Description
								</th>
							</tr>
						</thead>

						<tbody>

							{ // campaigns

								campaigns.map((campaign, i) => {

									// render
									return (

										<tr key={'campaigns-i-' + i}>

											<th>

												<Link

													href={{

														pathname: '/campaigns/' + campaign.id
													}}
												>

													<a className='text-decoration-none'>

														{campaign.id}
													</a>
												</Link>
											</th>

											<th>

												{campaign.name || '---'}
											</th>

											<th>

												{campaign.description || '---'}
											</th>
										</tr>
									);
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
