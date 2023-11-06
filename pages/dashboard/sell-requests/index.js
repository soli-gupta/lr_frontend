import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import WebHead from '@/components/common/WebHead';
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import axios from 'axios';
import useSWR from 'swr'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '@/components/common/Loader';
import SellRequestListComponent from '@/components/sell-request/SellRequestListComponent';
import WhatsappNo from "@/components/dashboard/WhatsappNo"

const fetcher = (url) => axios.get(url, { headers: { token: localStorage.getItem('lr-user-token') } }).then(res => res.data);

function Index() {

	const router = useRouter()
	const { type } = router.query;
	const [user, setUser] = useState('')
	setTimeout(() => {
		if (typeof window !== "undefined") {
			$(".registration-upload").on("change", function (e) {
				e.preventDefault();
				var filename = e.target.files[0].name
				$(".registrationfile p").text(filename)
				$(".reg-uploadbx").hide();
				$(".registrationfile").show();
			})

			$(".registrationfile .registrationfile-remove").on("click", function (e) {
				e.preventDefault();
				$(".reg-uploadbx").show();
				$("#rc_registration_certificate").val('')
				$(".registrationfile").hide();
			})


			$(".insurance-upload").on("change", function (e) {
				e.preventDefault();
				var filename = e.target.files[0].name
				$(".insurance-filename p").text(filename)
				$(".insurance-uploadbox").hide();
				$(".insurance-filename").show();
			})

			$(".insurance-filename .insuranceremovefile").on("click", function (e) {
				e.preventDefault();
				$(".insurance-uploadbox").show();
				$("#car_insurance").val('')
				$(".insurance-filename").hide();
			})
		}

	}, 100);

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
	const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}user/user-sell-request-list?type=${type}`, fetcher);

	if (error) return <Loader loaderTitle={`Something went wrong.`} />;
	if (!data) return <Loader loaderTitle={`Loading...`} />;

	return (
		<>
			<WebHead pageTitle="Dashboard | Sell-Request" />

			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>

					<Link className='back-link' href="user-menu">Sell Request</Link>

					<WhatsappNo />

				</div>

				<div className="wrapper">

					<div className='user-bgBox'>

						<DashboardLeftMenu userProfile={user !== undefined && user !== undefined ? user : ''} />

						<div className='user-right test-drive-user main-sell'>

							<div className='formbx-white p-0 user-style'>

								<div className="border-heading"><h3>Sell Request</h3></div>

								{data !== undefined && data.sellData.length > 0 ?
									<div className='after-car-added'>

										<SellRequestListComponent data={data && data.sellData} />

									</div >
									:
									<div className='no-data-added'>
										<div className='animation-icon'>
											<Lottie animationData={EmptyCar} loop={true} />
										</div>

										<h6>You haven’t Sell any car yet</h6>
										<Link className='btn arrow-style blue-btn' href='/sell'><span>Sell Your Car</span></Link>
									</div>
								}

							</div >


						</div >

					</div >

				</div >

			</div >

		</>
	)
}

export default Index
