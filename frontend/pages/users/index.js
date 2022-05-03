import Head from 'next/head';

import Image from 'next/image';

import Axios from 'axios';

import { useEffect, useState } from 'react';

export default function Home() {

	// users
	const [users, setUsers] = useState([]);

	// component did mount
	useEffect(() => {

		// async wrapper
		(async () => {

			// get users
			const res = await Axios.get('/api/v1/users');

			// data
			const data = res.data;

			// error
			if (!data.ok) {

				return;
			}

			// get users
			const users = data.data;

			// update users
			setUsers(users);
		})();
	}, []);

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

						Users
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

									Hkid
								</th>
							</tr>
						</thead>

						<tbody>

							{ // users

								users.map((user, i) => {

									// render
									return (

										<tr key={'user-i-' + i}>

											<th>

												{user.id}
											</th>

											<th>

												{user.hkid}
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
