import React, { useState, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head'
import Script from 'next/script';
import MultiRangeSlider from '../../rangeslider/MultiRangeSlider';
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import { $ } from 'react-jquery-plugin'
import WebHead from '@/components/common/WebHead';
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import WebsiteLayout from '@/components/common/WebsiteLayout';

import useSWRInfinite from 'swr/infinite'
import Loader from '@/components/common/Loader';
import axios from 'axios';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { databaseDateConverter, fullDatabaseDateConverter, numberFormatter } from '@/components/Helper';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ServicePartner from '@/components/ServicePartner';
import WhatsappNo from "@/components/dashboard/WhatsappNo"



const fetcher = (url) => axios.get(url, {
	headers: {
		token: localStorage.getItem('lr-user-token')
	}
}).then(res => res.data);

const swiperSettingMenuUser = {
	slidesPerView: "auto",
	spaceBetween: 10,
	loop: false,
	modules: [Pagination],

}

function Index() {

	const Url = process.env.NEXT_PUBLIC_URL;
	const router = useRouter();
	const { type } = router.query;


	const [Hamburger, setHamburger] = useState(false);
	const [CustomSearch, setCustomSearch] = useState(false);
	const [Includebefefits, setIncludebefefits] = useState(false);
	const [include, setInclude] = useState(true);

	const [user, setUser] = useState('');

	const { data: getOrdersArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
		const aofs = parseInt(index) + parseInt(1);

		return `${Url}user/get-order-details-by-user?type=${type}&orderType=extended-warranty&page=${aofs}`;
	}
		, fetcher);




	const IncludebefefitsPopup = () => {
		setIncludebefefits(true)
	}

	const benefitTrue = () => {
		setInclude(false)
	}

	const includeTrue = () => {
		setInclude(true)
	}



	const closePop = () => {
		setIncludebefefits(false)

		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
		}
	}

	const OpenHamburger = () => {
		setHamburger(true)
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll');
		}
	}


	const HideHam = () => {
		setHamburger(false)
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll');
		}
	}

	const OpenSearch = () => {
		setCustomSearch(true)
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll');
		}
	}

	const HideSearch = () => {
		setCustomSearch(false)
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll');
		}
	}



	useEffect(() => {
		if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {

			router.push("/");
		} else {
			const fetchUserData = axios.get(`${Url}user/get-user-profile`, {
				headers: {
					token: localStorage.getItem('lr-user-token')
				}
			}).then((res) => {
				setUser(res.data.user);
				setOwnerFirstName(res.data.user.first_name);
				setOwnerLastName(res.data.user.last_name);
				setOwnerEmail(res.data.useer.email);
			}).catch((err) => {
				if (err && err.response && err.response.data.status) {
					alert('Something went wrong!');
				}
			});
		}
	}, []);


	if (error) return <Loader loaderTitle={`Something went wrong.`} />;
	if (!getOrdersArray) return <Loader loaderTitle={`Loading...`} />;



	const returnFlattenObject = (arr) => {
		const flatObject = {};
		for (let i = 0; i < arr.length; i++) {
			for (const property in arr[i]) {
				flatObject[`${property}`] = arr[i][property];
				// setPagevalue(i);
			}
		};
		return flatObject;
	}
	const data = returnFlattenObject(getOrdersArray);


	var getOrders = [].concat.apply([], getOrdersArray.map(x => x.orders))

	const isReached = getOrders && getOrders.length === data.ordersCount;

	const allExtendedWarrantyHandler = () => {
		router.push('/dashboard/extended-warranty');
	}

	const pendingExtendedWarrantyHandler = () => {
		router.push('?type=pending');
	}

	const activeExtendedWarrantyHandler = () => {
		router.push(`?type=active`);
	}

	const expiredExtendedWarrantyHandler = () => {
		router.push(`?type=expired`);
	}



	return (
		<div>


			<WebHead pageTitle={'Extended Warranty'} />

			{/* <WebsiteLayout>  */}
			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>

					<Link className='back-link' href="user-menu">Extended Warranty</Link>

					<WhatsappNo />

				</div>

				<div className="wrapper">

					<div className='user-bgBox'>

						<DashboardLeftMenu userProfile={user !== undefined && user !== undefined ? user : ''} />

						<div className='user-right test-drive-user sell-req'>

							<div className='formbx-white p-0 user-style'>

								<div className="border-heading"><h3>Extended Warranty</h3></div>

								<div className='after-car-added'>


									<div className='white-inner'>

										{getOrders !== undefined && getOrders.length > 0 ?
											<>




												<div className='car-user-filter'>

													<ul>

														<Swiper {...swiperSettingMenuUser}>
															<SwiperSlide><li className={`${type === '' || type === undefined ? 'active' : ''}`} onClick={allExtendedWarrantyHandler} >All</li> </SwiperSlide>
															<SwiperSlide><li className={`${type === 'pending' ? 'active' : ''}`} onClick={pendingExtendedWarrantyHandler} >Pending</li> </SwiperSlide>

															<SwiperSlide><li className={`${type === 'active' ? 'active' : ''}`} onClick={activeExtendedWarrantyHandler}>Active Package</li> </SwiperSlide>

															<SwiperSlide>	<li className={`${type === 'expired' ? 'active' : ''}`} onClick={expiredExtendedWarrantyHandler}>Expired Package</li> </SwiperSlide>

														</Swiper>
													</ul>

												</div>


												<div className='list-box gap'>


													<InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={getOrders !== undefined ? getOrders.length : 0} hasMore={!isReached}>
														{
															getOrders !== undefined && getOrders.map((order) => {

																return (
																	<>

																		<div className={`list ${order.form_step !== 5 ? 'pending' : order.order_status === 1 ? 'completed' : order.order_status === 2 ? `` : order.order_status === 3 ? `cancelled` : ''}`} key={order._id}>
																			<div className='date'>
																				{
																					databaseDateConverter(order.createdAt) ? `${databaseDateConverter(order.createdAt).weekDay}, ${databaseDateConverter(order.createdAt).day} ${databaseDateConverter(order.createdAt).month} ${databaseDateConverter(order.createdAt).year} ` : ''
																				}
																			</div>

																			<div className='grey-bg'>
																				<div className="prductSec01">
																					<div className='flag'>
																						{order.form_step !== 5 ? 'Pending' : order.order_status === 1 ? 'Active' : order.order_status === 2 ? `` : order.order_status === 3 ? `Expired` : ''}
																					</div>
																					<div className="row">

																						<div className="col-md-9 right-broder">
																							<div className='order-id'>Order Id : {order.order_id}</div>
																							<h1>
																								{`${order.order_brand_name} ${order.order_model_name} ${order.order_variant_name}`}
																							</h1>
																							<ul>
																								<li>{order.order_car_registration_year}</li>
																								<li>{order.order_car_fuel_type}</li>
																								<li>{numberFormatter(order.order_car_kms)}</li>


																							</ul>


																						</div>


																						{/* <div className="price-detail col-md-3 no-border text-right">

																								<div className='expected-price'>Amount Paid </div>
																								<div className="price">INR <span> 41,290/-</span></div>

																							</div> */}

																					</div>

																					<div className='price-detail col-md-3 only-btn'>
																						{order.form_step !== 5 || order.order_status === 4 ? <>
																							<Link className='btn  reverse' href={`/dashboard/extended-warranty/${order._id}`}>Complete Your Form</Link>
																						</> : <></>}
																					</div>

																				</div>

																				{/* <div className='car-user-info two-colum align-top gap-b'>

																						<div className='car-div-dashboard no-border'>

																							<h4>Extended Warranty 1 Year/10,000 Km</h4>

																							<p className='no-icon'>This extended warranty is <span>valid till 28th February 2024</span> or <span>15,000 KM</span> whichever comes first.</p>

																							<div className='two-btn'>
																								<div className='view-detail blue-border-style'>View Details</div>

																								<div onClick={IncludebefefitsPopup} className='view-detail blue-border-style'>Inclusions & Exclusions</div>

																							</div>


																						</div>


																						{order.order_status === 1 ?
																							<div className="car-div-dashboard no-border align-right"><h5 className="gap-b2">Invoice</h5><div className="view-detail blue-border-style">Download Invoice</div></div> : ''}



																						{order.order_status === 3 ?
																							<div className="car-div-dashboard no-block actions">
																								<div>
																									<Link href="" className="btn reverse green-btn-user">
																										Book Another Package
																									</Link>
																								</div>
																							</div>
																							: ''}


																					</div>

																					<div className='pakage-info'>

																						<div className='pakage'>

																							<ul>

																								<li>Valid from (Kilometres) <span>20,000 KMs</span>
																								</li>

																								<li>Valid from (Kilometres) <span>65,000 KMs</span>
																								</li>

																							</ul>

																						</div>

																						<div className='pakage'>

																							<ul>

																								<li>Issue Date <span>28th Feb 2023</span>
																								</li>

																								<li>Issue Date <span>28th Feb 2024</span>
																								</li>

																							</ul>

																						</div>

																					</div> */}

																				{
																					order.service_center_address !== '' && order.service_center_address !== undefined ?

																						<div className='car-user-info align-top'>

																							<div className='car-div-dashboard'>
																								<h3 className={`${order.order_status === 3 ? 'greay-head' : ''}`}>
																									Preferred Service Centre
																								</h3>

																								{order.order_status === 1 || order.order_status === 4
																									? <>
																										<div className='location'>{order.service_center_name !== '' && order.service_center_name !== undefined ? order.service_center_name : ''}</div>
																										<p>
																											{order.service_center_address !== '' && order.service_center_address !== undefined ? order.service_center_address : ''}
																										</p>
																										<div className='user-email'>
																											{order.service_center_name !== '' && order.service_center_name !== undefined && order.service_center_address !== '' && order.service_center_address !== undefined ?
																												<Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${order.service_center_name}${order.service_center_address}`} className='blue-border-style'>Get Directions</Link> : ''}
																										</div>
																									</> :
																									<div className="grey-text adress">
																										{`${order.service_center_name} ${order.service_center_address}`}
																									</div>}

																							</div>

																							{
																								order.vehicle_inspaction_date !== undefined && order.vehicle_inspaction_date !== '' ?
																									<>


																										<div className='car-div-dashboard'>

																											{order.order_status === 1 || order.order_status === 4 ?
																												<>

																													<h3> Date & Time</h3>

																													<div className='date icons'>
																														<span>Date</span>
																														{order.vehicle_inspaction_date !== undefined && order.vehicle_inspaction_date !== '' ? `${fullDatabaseDateConverter(order.vehicle_inspaction_date).weekDay}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).day} ${fullDatabaseDateConverter(order.vehicle_inspaction_date).month}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).year}` : ''}
																													</div>
																													<div className='time icons'>
																														<span>Time</span>
																														{order.vehicle_inspaction_time !== undefined && order.vehicle_inspaction_time !== '' ? order.vehicle_inspaction_time : ''}
																													</div>
																												</>
																												: <>

																													<h3 className='greay-head'> Date & Time</h3>

																													<div className="grey-text calender">

																														{
																															order.vehicle_inspaction_date !== '' && order.vehicle_inspaction_date !== undefined && order.vehicle_inspaction_time !== '' && order.vehicle_inspaction_time !== undefined ? <>
																																{`${fullDatabaseDateConverter(order.vehicle_inspaction_date).weekDay}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).day} ${fullDatabaseDateConverter(order.vehicle_inspaction_date).month}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).year}, ${order.vehicle_inspaction_time}`}
																															</>
																																: ''
																														}



																													</div>
																												</>}

																										</div>

																									</>
																									: ''

																							}

																							{order.user_address_type !== '' && order.user_address_type !== undefined && order.user_full_address !== '' && order.user_full_address !== undefined ?




																								<div className='car-div-dashboard'>
																									{order.order_status === 1 || order.order_status === 4 ?
																										<>


																											<h3>Car Pickup Address</h3>

																											<div className='location'>{order.user_address_type}</div>
																											<p>
																												{order.user_full_address}
																											</p>

																										</>
																										: <>

																											<h3 className='greay-head'>Car Pickup Address</h3>


																											<div className="grey-text adress">
																												{order.user_full_address}

																											</div>
																										</>}

																								</div>


																								: ''
																							}



																						</div>

																						: ''}


																				<div className={`car-user-info ${order.service_center_address !== '' && order.service_center_address !== undefined ? 'top-border-gap' : ''}`}>

																					{/* <div className='company-message  right-gap'>Luxury Ride Service Buddy is your eyes and ears on the ground and will be managing your complete service experience. Please get in touch in case of any queries.</div>  */}
																					<ServicePartner classSec="right-gap" />
																				</div>



																			</div>

																		</div>
																	</>
																)
															})
														}
													</InfiniteScroll>

													{/* <div className='list cancelled'>
															<div className='date'>Wed, 21 Feb 2023</div>

															<div className='grey-bg'>
																<div className="prductSec01">
																	<div className='flag'>Expired</div>
																	<div className="row">

																		<div className="col-md-9 right-broder">
																			<div className='order-id'>Request ID: 12345678</div>
																			<h1>Audi A3 35 TDI Attraction</h1>
																			<ul>
																				<li>2018</li>
																				<li>Diesel</li>
																				<li>20,000</li>


																			</ul>

																		</div>


																		<div className="price-detail text-right col-md-3 no-border">
																			<div className='expected-price'>Amount Pending</div>
																			<div className="price">INR <span>41,290/-</span></div>


																		</div>

																	</div>

																</div>

																<div className='car-user-info two-colum align-top gap-b'>

																	<div className='car-div-dashboard no-border'>

																		<h4>Extended Warranty 1 Year/10,000 Km</h4>

																		<p className='no-icon'>This extended warranty is <span>valid till 28th February 2024</span> or <span>15,000 KM</span> whichever comes first.</p>

																		<div className='two-btn'>
																			<div className='view-detail blue-border-style'>View Details</div>

																			<div onClick={IncludebefefitsPopup} className='view-detail blue-border-style'>Inclusions & Exclusions</div>

																		</div>


																	</div>

																	<div className="car-div-dashboard no-block actions"><div><a href="" className="btn reverse green-btn-user">Buy Extended Warranty</a></div></div>




																</div>

																<div className='pakage-info grey-text'>

																	<div className='pakage'>

																		<ul>

																			<li>Valid from (Kilometres) <span>20,000 KMs</span>
																			</li>

																			<li>Valid from (Kilometres) <span>65,000 KMs</span>
																			</li>

																		</ul>

																	</div>

																	<div className='pakage'>

																		<ul>

																			<li>Issue Date <span>28th Feb 2023</span>
																			</li>

																			<li>Issue Date <span>28th Feb 2024</span>
																			</li>

																		</ul>

																	</div>

																</div>


																<div className='car-user-info border-top-dashed align-top'>



																	<div className='car-div-dashboard'>

																		<h3 className='greay-head'>Preferred Service Centre</h3>

																		<div className="grey-text adress">

																			Gurugram, Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011

																		</div>


																	</div>

																	<div className='car-div-dashboard'>

																		<h3 className='greay-head'> Date & Time</h3>

																		<div className="grey-text calender">

																			Wednesday, 24th March, 2023 6:00 PM to 7:00 PM

																		</div>

																	</div>

																	<div className='car-div-dashboard'>

																		<h3 className='greay-head'>Car Pickup Address</h3>


																		<div className="grey-text adress">

																			3rd Floor, Building No. 261, Lane No 5, Westend Marg, Saket, Saidulajab New Delhi - 30

																		</div>


																	</div>


																</div>



																<div className='car-user-info  top-border-gap'>



																	<div className='company-message  right-gap'>Luxury Ride Service Buddy is your eyes and ears on the ground and will be managing your complete service experience. Please get in touch in case of any queries.</div>








																</div>

															</div>

														</div> */}





												</div>
											</> :
											<>
												<div className='car-user-filter'>
													<ul>

														<Swiper {...swiperSettingMenuUser}>
															<SwiperSlide><li className={`${type === '' || type === undefined ? 'active' : ''}`} onClick={allExtendedWarrantyHandler} >All</li> </SwiperSlide>
															<SwiperSlide><li className={`${type === 'pending' ? 'active' : ''}`} onClick={pendingExtendedWarrantyHandler} >Pending</li> </SwiperSlide>

															<SwiperSlide><li className={`${type === 'active' ? 'active' : ''}`} onClick={activeExtendedWarrantyHandler}>Active Package</li> </SwiperSlide>

															<SwiperSlide>	<li className={`${type === 'expired' ? 'active' : ''}`} onClick={expiredExtendedWarrantyHandler}>Expired Package</li> </SwiperSlide>

														</Swiper>
													</ul>

												</div>
												<div className='no-data-added' style={{ display: "block" }}>
													<div className='animation-icon'>
														<Lottie animationData={EmptyCar} loop={true} />
													</div>
													<h6>You haven’t booked any Extended Warranty yet</h6>
													<Link className='btn arrow-style blue-btn' href={`/extended-warranty`}><span>View Extended Warranty</span></Link>
												</div>
											</>
										}
									</div>

								</div>
							</div>


						</div>
					</div>


				</div>

			</div>

			{/* </WebsiteLayout> */}



			{Includebefefits ?
				<div className="overlay-new incluBniftsPopup" >
					<div className="overlay-w">
						<div className="popup-wrap">
							<div onClick={closePop} className="close"></div>
							<div className="popupContnt">
								<ul className="inBniftsTab">
									<li className={`${include ? "active" : ""}`}><a onClick={includeTrue} href="javascript:void(0)">What’s Included</a></li>
									<li className={`${include ? "" : "active"}`}><a onClick={benefitTrue} href="javascript:void(0)">Luxury Ride Benefits</a></li>
								</ul>
								{include ?
									<div className="content" id="whatsIncluded">
										<div className="clumns"> <span>2 month comprehensive warranty </span> <span>Included</span> </div>
										<div className="clumns"> <span>RC transfer </span> <span>Included</span> </div>
										<div className="clumns"> <span>Doorstep delivery </span> <span>Included</span> </div>
										<div className="clumns"> <span>Refurbishing and initial service cost </span> <span>Included</span> </div>
										<div className="clumns"> <span>Applicable taxes <strong>1% TCS (refunded by govt.)</strong></span> <span>Included</span> </div>
									</div>
									:
									<div className="content" id="whatsBenefits">
										<div className="clumns"> <span>5 month comprehensive warranty </span> <span>Included</span> </div>
										<div className="clumns"> <span>RC transfer </span> <span>Included</span> </div>
										<div className="clumns"> <span>Doorstep delivery </span> <span>Included</span> </div>
										<div className="clumns"> <span>Refurbishing and initial service cost </span> <span>Included</span> </div>
										<div className="clumns"> <span>Applicable taxes <strong>1% TCS (refunded by govt.)</strong></span> <span>Included</span> </div>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				: ""
			}


		</div>
	)
}

export default Index
