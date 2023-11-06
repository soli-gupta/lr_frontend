import React, { useState, useRef, useEffect, useCallback } from 'react';

import Script from 'next/script';
import MultiRangeSlider from '../../rangeslider/MultiRangeSlider';
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import WebHead from '@/components/common/WebHead';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';
import Link from 'next/link';
import { ButtonSpinner, databaseDateConverter, numberFormatter } from '@/components/Helper';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Loader from '@/components/common/Loader';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import WhatsappNo from "@/components/dashboard/WhatsappNo"

const fetcher = (url) => axios.get(url, {
	headers: {
		token: localStorage.getItem('lr-user-token')
	}
}).then(res => res.data);





function Index() {

	const Url = process.env.NEXT_PUBLIC_URL;
	const router = useRouter();
	const { type } = router.query;

	const [Hamburger, setHamburger] = useState(false);
	const [CustomSearch, setCustomSearch] = useState(false);
	const [cancleOrder, setCancelOrder] = useState(false);



	const [allCarstab, setAllCarsTab] = useState(true);
	const [checkCancelConfirmation, setCheckCancelConfirmation] = useState(false);
	const [orderId, setOrderId] = useState('');
	const [user, setUser] = useState('');


	const [cancelPopUp, setCancelPopUp] = useState(false);
	const [callSuccessMessage, setCallSuccessMessage] = useState('');
	const [callErrorMessage, setCallErrorMessage] = useState('');


	const [tinyLoader, setTinyLoader] = useState(false);

	const swiperSettingMenuUser = {
		slidesPerView: "auto",
		spaceBetween: 10,
		loop: false,
		modules: [Pagination],

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

	// const { data, error } = useSWR(`${Url}user/get-user-profile`, fetcher);
	// const getOrders = useSWR(`${Url}user/get-order-details-by-user?type=${type}`, fetcher);

	const { data: createGetOrdersArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
		const aofs = parseInt(index) + parseInt(1);

		return `${Url}user/get-order-details-by-user?type=${type}&orderType=buy`;
	}
		, fetcher);

	const checkCancelOrder = (_id) => {
		setCheckCancelConfirmation(true);
		setOrderId(_id);
	}

	const closePop = () => {
		setCheckCancelConfirmation(false);
		setCancelOrder(false);
		setCancelPopUp(false);
		document.body.classList.remove('hide-scroll-poup-new');
		setCallSuccessMessage('');
		setCallErrorMessage('');
		router.reload('/dashboard/bookings');
	}

	const cancleUserOrder = async (e) => {
		e.preventDefault();
		let createError = 0;

		if (e.target.cancel_reason.value.length <= 0) {
			document.getElementById('cancelError').innerHTML = 'Please select your cancel reason.';
			document.getElementById("cancelError").style.display = "block";
			setTimeout(() => {
				document.getElementById('cancelError').innerHTML = '';
				document.getElementById("cancelError").style.display = "none";
			}, 3000);
			createError++;
		}
		if (createError > 0) {
			return false;
		}
		setTinyLoader(true);
		const formData = new FormData(document.getElementById('cancel-order'));

		await axios.post(`${Url}user/cancle-user-order`, formData, {
			headers: {
				token: localStorage.getItem('lr-user-token')
			}
		}).then((res) => {
			if (res && res.data.status === 1) {
				setCallSuccessMessage(res.data.message);
				setCancelPopUp(true);
				setTinyLoader(false);
				document.body.classList.add('hide-scroll-poup-new');
			}
		}).catch((e) => {
			setCancelPopUp(true);
			setTinyLoader(false);
			document.body.classList.add('hide-scroll-poup-new');
			if (e && e.response && e.response.data.status === 0) {
				setCallErrorMessage(e.response.data.message);
			} else if (e && e.response && e.response.data.status == 2) {
				setCallErrorMessage(e.response.data.message);
			}
		})
	}

	const manageOrderListByType = async (e, status) => {
		e.preventDefault();
		router.push(`?type=${status}`)
	}


	const checkForDescription = () => {
		var reason = document.querySelector('input[name = cancel_reason]:checked').value;
		if (reason == "Others") {
			document.getElementById('reasonDiv').style.display = 'block';
			document.getElementById('cancel_reason_dscription').setAttribute('required', '');
			document.getElementById('cancelDescription').innerHTML = 'Please describe your cancel reason.';
			document.getElementById("cancelDescription").style.display = "block";
		} else {
			document.getElementById('reasonDiv').style.display = 'none';
			document.getElementById('cancel_reason_dscription').removeAttribute('required');
		}
	}

	if (error) return <Loader loaderTitle={`Something went wrong.`} />;
	if (!createGetOrdersArray) return <Loader loaderTitle={`Loading...`} />;



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
	const data = returnFlattenObject(createGetOrdersArray);


	var getOrders = [].concat.apply([], createGetOrdersArray.map(x => x.orders))
	console.log(getOrders);
	const isReached = getOrders && getOrders.length === data.ordersCount;
	// console.log(getOrders);
	return (
		<div>
			<WebHead pageTitle="Bookings" />
			{/* <WebsiteLayout> */}

			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>

					<Link className='back-link' href="user-menu">Bookings</Link>

					<WhatsappNo />

				</div>

				<div className="wrapper">

					<div className='user-bgBox'>

						<DashboardLeftMenu userProfile={user !== undefined && user !== undefined ? user : ''} />

						<div className='user-right sell-req sell-mob'>

							<div className='formbx-white p-0 user-style'>
								<div className="border-heading"><h3>Bookings</h3></div>
								{/* && getOrders.data !== undefined && getOrders.data.orders !== undefined && getOrders.data.orders.length > 0  */}

								<div className='after-car-added'>


									<div className='white-inner'>
										{getOrders !== undefined && getOrders.length > 0 ?
											<>



												<div className='car-user-filter'>

													<ul>
														<Swiper {...swiperSettingMenuUser}>
															<SwiperSlide> <li className={type === '' || type === undefined ? "active" : ''} onClick={(e) => manageOrderListByType(e, '')} >All</li> </SwiperSlide>
															<SwiperSlide> <li className={type === 'pending' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'pending')} >Pending</li> </SwiperSlide>
															<SwiperSlide><li className={type === 'booked' ? 'active' : ''} onClick={(e) => manageOrderListByType(e, 'booked')}>Booked</li> </SwiperSlide>
															<SwiperSlide>	<li className={type === 'completed' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'completed')}>Completed</li></SwiperSlide>
															<SwiperSlide>	<li className={type === 'cancelled' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'cancelled')}>Cancelled</li></SwiperSlide>
														</Swiper>
													</ul>

												</div>


												<div className='list-box'>

													<InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={getOrders !== undefined ? getOrders.length : 0} hasMore={!isReached}>
														{
															allCarstab === true && getOrders.map((order) => {

																return (
																	<>
																		<div className={`list ${order.form_step !== 4 ? 'pending' : order.order_status === 1 ? '' : order.order_status === 2 ? `completed` : order.order_status === 3 ? `cancelled` : order.order_status === 4 ? 'pending' : ''}`} key={order._id}>
																			<div className='date'>
																				{
																					databaseDateConverter(order.createdAt) ? `${databaseDateConverter(order.createdAt).weekDay}, ${databaseDateConverter(order.createdAt).day} ${databaseDateConverter(order.createdAt).month} ${databaseDateConverter(order.createdAt).year} ` : ''
																				}
																			</div>

																			<div className='grey-bg'>
																				<div className="prductSec01 top-gap-dash">
																					<div className='flag'>{order.form_step !== 4 ? 'Pending' : order.order_status === 1 ? 'Booked' : order.order_status === 2 ? `Completed` : order.order_status === 3 ? `Cancelled` : order.order_status === 4 ? 'Pending' : ''}</div>
																					<div className="row">
																						<div className='col-md-3'>
																							<div className='order-id mobile-style'>Order ID: {order.order_id}</div>
																							<img className='image-radious' src={`${order.order_product_id.product_image}`} />
																						</div>
																						<div className="col-md-6 right-broder">
																							<div className='order-id desktop-style'>Order ID: {order.order_id}</div>
																							<h1>{order.order_car_name}</h1>
																							<ul>
																								<li>{order.order_car_registration_year}</li>
																								<li>{order.order_car_registration_state}</li>
																								<li>{numberFormatter(order.order_car_kms)}</li>
																								<li>{order.order_car_ownership}</li>
																								<li>{order.order_car_fuel_type}</li>
																							</ul>

																							<div className="insurance">Insurance {order.order_car_insurance_type === "Valid" || order.order_car_insurance_type === "valid" ? 'Valid till' : order.order_car_insurance_type === "Expired" || order.order_car_insurance_type === "expired" ? "Expired in" : ''}  {order.order_car_insurance_valid}</div>


																						</div>

																						<div className="price-detail col-md-3">
																							<div className="price">INR <span>{numberFormatter(order.order_car_amount)}/-</span></div>
																							{/* <div className="emiStarts">Opted in for financing</div> */}
																						</div>

																						<div className='car-div-dashboard actions mobile-style'>

																							{order.form_step !== 4 && order.order_status === 4 ? <>
																								<Link className='btn  reverse' href={`/dashboard/bookings/${order._id}`}>Complete Your Form</Link>
																							</> :
																								<>
																									{order.order_status === 1 || order.order_status === 3 || order.order_status === 4 ? <>
																										<Link className='btn  reverse' href={`/buy/product-detail/${order.order_product_id
																											.product_slug}`}>View Car Details</Link>
																									</> : order.order_status === 2 ? <>
																										<Link className='btn  reverse' href='#'>View Payment Details</Link>
																									</> : ''}
																								</>
																							}

																						</div>

																					</div>

																				</div>

																				<div className='car-user-info'>

																					<div className='car-div-dashboard'>

																						<h3>Car Owner Details</h3>

																						<div className='user-name-in'>
																							{order.user_first_name !== undefined && order.user_first_name !== '' ? `${order.user_first_name}` : ''}
																							{order.user_last_name !== undefined && order.user_last_name !== '' ? ` ${order.user_last_name}` : ''}
																						</div>
																						<div className='user-email'> {order.user_email_id !== '' && order.user_email_id !== undefined ? order.user_email_id : ''}</div>

																					</div>

																					{order.order_status === 1 || order.order_status === 3 || order.order_status === 4 ? <>
																						<div className='car-div-dashboard'>

																							<h3>Booking Amount</h3>

																							<div className='user-name-in'>INR {numberFormatter(order.user_booking_amount)}/-
																								{/* {order.order_status === 1 ? <><span className='green'>Paid</span></> : order.order_status === 3 ? <><div className='blue-border-style orange no-cursor'>Refunded</div></> : ''} */}
																							</div>
																							{/* {order.order_status === 1 ? <><div className='blue-border-style'>Payment Receipt</div></> : ''} */}

																						</div>
																					</> : ''}

																					{order.order_status === 1 || order.order_status === 4 ? <>
																						<div className='car-div-dashboard text-right'>

																							<h3>Balance Amount</h3>

																							<div className='user-name-in'>INR {numberFormatter(order.order_balance_amount)}/-</div>
																							{/* <div className='blue-border-style'>Make Payment</div> */}

																						</div>
																					</> : ''}

																					<div className='car-div-dashboard actions desktop-style'>
																						{order.form_step !== 4 && order.order_status === 4 ? <>
																							<Link className='btn  reverse' href={`/dashboard/bookings/${order._id}`}>Complete Your Form</Link>
																						</> :
																							<>
																								{order.order_status === 1 || order.order_status === 3 || order.order_status === 4 ? <>
																									<Link className='btn  reverse' href={`/buy/product-detail/${order.order_product_id
																										.product_slug}`}>View Car Details</Link>
																								</> : order.order_status === 2 ? <>
																									<Link className='btn  reverse' href='#'>View Payment Details</Link>
																								</> : ''}
																							</>
																						}


																					</div>

																				</div>

																				{order.order_status === 1 ? <><div className='cancel-btn' onClick={(e) => checkCancelOrder(order._id)}>Cancel Booking</div></> : ''}

																			</div>

																		</div>
																	</>
																)
															})
														}
													</InfiniteScroll>
												</div>
											</>
											: <>
												<div className='car-user-filter'>

													<ul>
														<Swiper {...swiperSettingMenuUser}>
															<SwiperSlide> <li className={type === '' || type === undefined ? "active" : ''} onClick={(e) => manageOrderListByType(e, '')} >All</li> </SwiperSlide>
															<SwiperSlide> <li className={type === 'pending' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'pending')} >Pending</li> </SwiperSlide>
															<SwiperSlide><li className={type === 'booked' ? 'active' : ''} onClick={(e) => manageOrderListByType(e, 'booked')}>Booked</li> </SwiperSlide>
															<SwiperSlide>	<li className={type === 'completed' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'completed')}>Completed</li></SwiperSlide>
															<SwiperSlide>	<li className={type === 'cancelled' ? "active" : ''} onClick={(e) => manageOrderListByType(e, 'cancelled')}>Cancelled</li></SwiperSlide>
														</Swiper>
													</ul>

												</div>
												<div className='no-data-added' style={{ display: "block" }}>
													<div className='animation-icon'>
														<Lottie animationData={EmptyCar} loop={true} />
													</div>
													<h6>You Have Not Booked Car any Yet</h6>
													<Link className='btn arrow-style blue-btn' href={`/buy`}><span>View Inventory</span></Link>
												</div>
											</>}
									</div>

								</div>
								{/* getOrders.data.orders */}







							</div>


						</div>


					</div>

				</div>

			</div>

			{/* <div className={`${checkCancelConfirmation === true ? "open-popup" : ""} common-popup login`}>
<div className='popup-inner'>
	<div className='popup-close' onClick={closePop}></div>
	<div className='before-otp'>
		<h3>Confirm Order</h3>
		<button className='btn arrow-style blue-btn' onClick={cancleUserOrder}>Yes</button>
		<button type="button" className='btn arrow-style blue-btn grey' onClick={closePop}>Cancel</button>
	</div>
</div>

</div> */}

			{checkCancelConfirmation ?

				<div style={{ display: "block" }} className={`common-popup login mob-radio cancel-test`}>
					<div onClick={closePop} className="overlay-mob mobile-style"></div>
					<div className='popup-inner'>

						<div className='popup-close' onClick={closePop}></div>

						<div className='before-otp'>


							<h3>Cancel Order</h3>

							<p>Please specify reason for cancellation.</p>

							<form name="cancel_order" id="cancel-order" method='POST' onSubmit={cancleUserOrder}>

								<div className='from-row border-style'>

									<div className='form-div'>
										<small id="cancelError" className="error"></small>
										<div className='radio-div'>
											<input id='better' type="radio" name="cancel_reason" defaultValue="Change in plan" onClick={() => checkForDescription()} />
											<label htmlFor="better">
												Change in plan
											</label>

										</div>

										<div className='radio-div'>
											<input id='station' type="radio" name="cancel_reason" defaultValue="Getting a better offer" onClick={() => checkForDescription()} />
											<label htmlFor="station">
												Getting a better offer
											</label>
										</div>

										<div className='radio-div'>
											<input id='accident' type="radio" name="cancel_reason" defaultValue="Already purchased a car" onClick={() => checkForDescription()} />
											<label htmlFor="accident">
												Already purchased a car
											</label>
										</div>

										<div className='radio-div'>
											<input id='sold' type="radio" name="cancel_reason" defaultValue="Not looking for preowned" onClick={() => checkForDescription()} />
											<label htmlFor="sold">
												Not looking for preowned

											</label>
										</div>

										<div className='radio-div'>
											<input id='Others' type="radio" name="cancel_reason" defaultValue="Others" onClick={() => checkForDescription()} />
											<label htmlFor="Others"  >
												Others
											</label>

										</div>
										<div id="reasonDiv" style={{ display: 'none' }}>
											<textarea className='grey-bg' placeholder='Please mention your reason*' name="cancel_reason_dscription" id="cancel_reason_dscription" cols="30" rows="10"></textarea>
											<small id="cancelDescription" className="error"></small>
										</div>
										<input type="hidden" name="order_id" id="" value={orderId} />
										<input type='hidden' name="status" value="3" />


									</div>
								</div>


								<button className='btn reverse'>
									<ButtonSpinner load={tinyLoader} btnName={`Cancel Booking`} />
								</button>


							</form>

						</div>
					</div>

				</div>


				: ""

			}


			{cancelPopUp ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}


			{/* </WebsiteLayout> */}





		</div>
	)
}

export default Index
