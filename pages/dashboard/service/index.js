import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import EmptyCar from "../../../public/lotie-icons/emptyData.json";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import axios from 'axios';
import useSWR from 'swr'
import Loader from '@/components/common/Loader';
import ServiceComponent from '@/components/dashboard/ServiceComponent'
import Link from 'next/link';
import WhatsappNo from "@/components/dashboard/WhatsappNo"

const fetcher = (url) => axios.get(url, { headers: { token: localStorage.getItem('lr-user-token') } }).then(res => res.data);
function Index() {

	const [user, setUser] = useState('')

	useEffect(() => {
		if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
			router.push("/");
		}

		axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-user-profile`, {
			headers: {
				token: localStorage.getItem('lr-user-token')
			}
		}).then((res) => {
			setUser(res.data.user);

		}).catch((err) => {
			if (err && err.response && err.response.data.status) {
				alert('Something went wrong!');
			}
		});
	}, [])

	const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}user/user-service-list`, fetcher);

	if (error) return <Loader loaderTitle={`Something went wrong.`} />;
	if (!data) return <Loader loaderTitle={`Loading...`} />;


	return (
		<>

			<WebHead pageTitle={'Service'} />
			{/* <WebsiteLayout> */}
			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>
					<Link className='back-link' href="user-menu">Service</Link>

					<WhatsappNo />

				</div>
				<div className="wrapper">

					<div className='user-bgBox'>
						<DashboardLeftMenu userProfile={user !== undefined && user !== undefined ? user : ''} />
						<div className='user-right test-drive-user sell-req service'>

							<div className='formbx-white p-0 user-style'>

								<div className="border-heading"><h3>Service</h3></div>

								{data !== undefined && data.data.length > 0 ?

									<>

										<div className='after-car-added'>
											<div className='white-inner'>
												<ServiceComponent data={data && data.data} />
											</div>

										</div>
									</>
									:
									<div className='no-data-added'>

										<div className='animation-icon'>

											<Lottie animationData={EmptyCar} loop={true} />

										</div>

										<h6>No Service Appointments Scheduled Yet</h6>

										<Link className='btn arrow-style blue-btn' href='/car-care'><span>View Service</span></Link>

									</div>}
							</div>
						</div>
					</div>
				</div>

			</div>
			{/* </WebsiteLayout> */}
		</>
	)
}

export default Index
