import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import WebHead from '@/components/common/WebHead';
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import axios from 'axios';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { ButtonSpinner, databaseDateConverter, dateConverterForValue, formatHoursTo12Hour, fullDatabaseDateConverter, numberFormatter, weekDatesForForms } from '@/components/Helper';
import Link from 'next/link';
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
}).then(res => res.data)


function Index() {

	const Url = process.env.NEXT_PUBLIC_URL;
	const router = useRouter();
	const { type } = router.query;


	const todayDate = new Date();
	const todayTime = todayDate.getHours();
	const todayDay = dateConverterForValue(databaseDateConverter(todayDate).day, databaseDateConverter(todayDate).month, databaseDateConverter(todayDate).year);


	const [Hamburger, setHamburger] = useState(false);
	const [CustomSearch, setCustomSearch] = useState(false);
	const [CancelTestDrive, setCancelTestDrive] = useState(false);
	const [include, setInclude] = useState(true);
	const [locationAdress, setlocationAdress] = useState(false);
	const [Location, setLocation] = useState(true);
	const [ReSchedule, setReSchedule] = useState(false);
	const [user, setUser] = useState('');
	const [testDriveId, setTestDriveId] = useState('');

	const [experienceCenterId, setExperienceCenterId] = useState('');
	const [experienceCenterName, setExperienceCenterName] = useState('');
	const [experienceCenterAddress, setExperienceCenterAddress] = useState('')


	const [getCities, setGetCities] = useState([]);
	const [bookedAddres, setBookedAddress] = useState('');
	const [bookedDateSlot, setBookedDateSlot] = useState('');
	const [bookedDateSlotNotConv, setBookedDateSlotNotConv] = useState('');
	const [bookedTimeNotConv, setBookedTimeSlotNotConv] = useState('');
	const [bookedTimeSlot, setBookedTimeSlot] = useState('');
	const [thankYouTestDrive, setThankYouTestDrive] = useState(false);
	const [submitRescheduleTestDrive, setSubmitRescheduleTestDrive] = useState(false);
	const [radioSelectedDate, setRadioSelectedDate] = useState('');




	const [cancelPopUp, setCancelPopUp] = useState(false);
	const [callSuccessMessage, setCallSuccessMessage] = useState('');
	const [callErrorMessage, setCallErrorMessage] = useState('');
	const [btnBookedDate, setBtnBookedDate] = useState('');

	const [tinyLoader, setTinyLoader] = useState(false);


	const swiperSettingMenuUser = {
		slidesPerView: "auto",
		spaceBetween: 10,
		loop: false,
		modules: [Pagination],

	}


	const experienceLocation = () => {
		setLocation(true);
		setBookedAddress('');
		document.getElementById('reschedule-user-test-drive').reset();
	}

	const googleLocation = () => {
		setLocation(false);
		document.getElementById('reschedule-user-test-drive').reset();
	}

	const TestDrive = (e, _id) => {
		setCancelTestDrive(true);
		setSubmitRescheduleTestDrive(true);
		setTestDriveId(_id);
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll-poup');
		}
	}

	const ReScheduleTest = (e, exp_center_id, exp_name, exp_address, _id, bookedDate, bookedTime) => {


		const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
		if (todayDay === bookedDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
			chekcedDateCheck.checked = false;
		}

		setReSchedule(true);
		setExperienceCenterId(exp_center_id);
		setExperienceCenterName(exp_name);
		setExperienceCenterAddress(exp_address);
		setTestDriveId(_id);
		setSubmitRescheduleTestDrive(true);
		setBookedDateSlot(fullDatabaseDateConverter(bookedDate) ? `${fullDatabaseDateConverter(bookedDate).weekDay}, ${fullDatabaseDateConverter(bookedDate).day} ${fullDatabaseDateConverter(bookedDate).month} ${fullDatabaseDateConverter(bookedDate).year} ` : '');

		setBtnBookedDate(fullDatabaseDateConverter(bookedDate));
		// ? `${fullDatabaseDateConverter(bookedDate).weekDay}, ${fullDatabaseDateConverter(bookedDate).day} ${fullDatabaseDateConverter(bookedDate).month} ${fullDatabaseDateConverter(bookedDate).year} ` : ''
		setRadioSelectedDate(bookedDate);

		setBookedDateSlotNotConv(bookedDate)
		setBookedTimeSlot(bookedTime);
		setBookedAddress(exp_name + ` Experience Center`);
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll-poup');
		}


	}

	const [dateLimit, setDateLimit] = useState(7);
	const changeDateShowLimit = () => {
		setDateLimit(14);
	}
	const weekCal = weekDatesForForms(dateLimit);

	const closePop = () => {
		setCancelTestDrive(false);
		setReSchedule(false);
		setBookedDateSlot('');
		setBookedTimeSlot('');
		setThankYouTestDrive(false);
		ReSchedule === true ? document.getElementById('reschedule-user-test-drive').reset() : ''
		ReSchedule === true && thankYouTestDrive === true ? router.reload() : '';
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
			document.body.classList.remove('hide-scroll-poup-new');
		}
		if (cancelPopUp === true) {
			router.reload();
		}
		setCancelPopUp(false);
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
					cancelPopUp
					setCancelPopUp(true);
					setCallErrorMessage('Something went wrong.');
				}
			});
		}
	}, []);

	// const { data, error } = useSWR(`${Url}user/get-test-drives?type=${type}`, fetcher);

	const { data: createTestDriveArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
		return `${Url}user/get-test-drives?type=${type}`
	}
		, fetcher);


	const getStates = useSWR(`${Url}states`, fetcher);



	const cancelUserTestDrive = async (e) => {
		e.preventDefault();
		let createError = 0;

		if (e.target.cancel_reason.value.length <= 0) {
			document.getElementById('cancelError').innerHTML = 'Please select your cancel reason.';
			document.getElementById("cancelError").style.display = "block";
			setTimeout(() => {
				document.getElementById("cancelError").style.display = "none";
				document.getElementById('cancelError').innerHTML = '';
			}, 2000);
			createError++;
		}
		if (createError > 0) {
			return false;
		}

		setTinyLoader(true);

		const formData = new FormData(document.getElementById("cancel-user-test-drive"));

		await axios.post(`${Url}user/cancel-user-test-drive`, formData, {
			headers: {
				token: localStorage.getItem('lr-user-token')
			}
		}).then((res) => {
			if (res && res.data && res.data.status === 1) {
				setCallSuccessMessage(res.data.message);
				setCancelPopUp(true);
				setTinyLoader(false);
				document.body.classList.add('hide-scroll-poup-new');
			}
		}).catch((e) => {
			setCancelPopUp(true);
			setTinyLoader(false);
			document.body.classList.add('hide-scroll-poup-new');
			if (e && e.response && e.response.data && e.response.data.status === 0) {
				setCallErrorMessage(e.response.data.message);
			} else if (e && e.response && e.response.data && e.response.data.status === 2) {
				setCallErrorMessage(e.response.data.message);
			}
		});
	}

	const checkForDescription = () => {
		var reason = document.querySelector('input[name = cancel_reason]:checked').value;
		if (reason == "Others") {
			document.getElementById('reasonDiv').style.display = 'block';
			document.getElementById('cancel_reason_dscription').setAttribute('required', '');
			document.getElementById('cancelDescription').innerHTML = 'Please describe your cancel reason.';
			document.getElementById("cancelDescription").style.display = "block";

			setTimeout(() => {
				document.getElementById('cancelDescription').innerHTML = '';
				document.getElementById("cancelDescription").style.display = "none";

			}, 1000);

		} else {
			document.getElementById('reasonDiv').style.display = 'none';
			document.getElementById('cancel_reason_dscription').removeAttribute('required');
		}
	}



	const getCitiesByState = async (stateId) => {
		axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
			if (res.data.status == 1) {
				setGetCities(res.data.cities)

			}
		}).catch(function (error) {

		});
	}

	const manageAddressTestDrive = (e) => {
		setBookedAddress(e.target.value);
	}

	const manageLandMarkTestDrive = () => {

	}

	const managePinCodetestDrive = () => {

	}

	const manageCitytestDrive = () => {

	}

	const manageDateTestDrive = (e, radioDate) => {
		setRadioSelectedDate(radioDate);
		setBookedDateSlot(fullDatabaseDateConverter(radioDate));
		setBtnBookedDate(fullDatabaseDateConverter(radioDate));
		setBookedTimeSlot('');

		const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
		if (todayDay === radioDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
			chekcedDateCheck.checked = false;
		}
	}

	const manageTimeSlotOne = () => {
		setBookedTimeSlot('11AM - 12PM');
	}

	const manageTimeSlotTwo = () => {
		setBookedTimeSlot('12PM - 1PM');
	}

	const manageTimeSlotThree = () => {
		setBookedTimeSlot('1PM - 2PM');
	}

	const manageTimeSlotFour = () => {
		setBookedTimeSlot('2PM - 3PM');
	}

	const manageTimeSlotFive = () => {
		setBookedTimeSlot('3PM - 4PM');
	}

	const manageTimeSlotSix = () => {
		setBookedTimeSlot('4PM - 5PM');
	}

	const manageTimeSlotSaven = () => {
		setBookedTimeSlot('5PM - 6PM');
	}

	const manageTimeSlotEight = () => {
		setBookedTimeSlot('6PM - 7PM');
	}

	const reScheduleUserTestDrive = async (e) => {
		e.preventDefault();


		let createError = 0

		if (e.target.book_date.value.length <= 0) {
			document.getElementById('selectedDateError').innerHTML = 'Please select date!';
			document.getElementById("selectedDateError").style.display = "block";
			setTimeout(() => {
				document.getElementById('selectedDateError').innerHTML = '';
				document.getElementById("selectedDateError").style.display = "none";
			}, 3000);
			createError++;
		}

		if (e.target.book_time.value.length <= 0) {
			document.getElementById('selectedTimeError').innerHTML = 'Please select time!';
			document.getElementById("selectedTimeError").style.display = "block";
			setTimeout(() => {
				document.getElementById('selectedTimeError').innerHTML = '';
				document.getElementById("selectedTimeError").style.display = "none";
			}, 3000);
			createError++;
		}

		if (createError > 0) {
			return false;
		}

		setTinyLoader(true);
		const formData = new FormData(document.getElementById('reschedule-user-test-drive'));

		await axios.post(`${Url}user/re-schedule-user-test-drive`, formData, {
			headers: {
				'Content-Type': 'application/josn',
				token: localStorage.getItem('lr-user-token')
			}
		}).then((res) => {
			if (res && res.data.status === 1) {
				setThankYouTestDrive(true);
				setSubmitRescheduleTestDrive(false);
				setTinyLoader(false);
			}
		}).catch((e) => {
			setCancelPopUp(true);
			setTinyLoader(false);
			if (e && e.response && e.response.data.status === 0) {
				setCallErrorMessage(e.response.data.message);
			} else if (e && e.response && e.response.data.status === 2) {
				setCallErrorMessage(e.response.data.message);
			}
		});
	}


	const managetestDriveStatusType = (e, status) => {
		router.push(`?type=${status}`)
	}

	if (error) return <Loader loaderTitle={`Something went wrong.`} />;
	if (!createTestDriveArray) return <Loader loaderTitle={`Loading...`} />;

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
	const data = returnFlattenObject(createTestDriveArray);


	var testDrives = [].concat.apply([], createTestDriveArray.map(x => x.testDrives))

	const isReached = testDrives && testDrives.length === data.testDrivesCount;


	const btnEBookCar = (e, productSlug, productStatus) => {
		e.preventDefault();
		if (productStatus === "booked" || productStatus === "sold") {
			setCancelPopUp(true);
			setCallErrorMessage('This car has been bought or booked by someone else. Please contact our Customer Service Representative.');
			document.body.classList.add('hide-scroll-poup-new');
			return false;
		}
		router.push(`/buy/e-book/${productSlug}`)
	}

	return (
		<div>


			<WebHead pageTitle={`Test Drives`} />



			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>

					<Link className='back-link' href="user-menu">Test Drives</Link>
					<WhatsappNo />

				</div>

				<div className="wrapper">

					<div className='user-bgBox'>
						<DashboardLeftMenu userProfile={user !== undefined && user !== undefined ? user : ''} />

						<div className='user-right test-drive-user test-mob'>

							<div className='formbx-white p-0 user-style'>
								<div className="border-heading"><h3>Test Drives</h3></div>
								{/* {testDrives.length === 0 ? <>


										<div className='car-user-filter'>

											<ul>

												<li className={type === '' || type === undefined ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, '')}  >All</li>
												<li className={type === 'upcoming' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'upcoming')}>Upcoming</li>
												<li className={type === 'completed' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'completed')}>Completed</li>
												<li className={type === 'cancelled' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'cancelled')}>Cancelled</li>

											</ul>

										</div>
										<div className='no-data-added' style={{ display: "block" }}>

											<div className='animation-icon'>
												<Lottie animationData={EmptyCar} loop={true} />
											</div>

											<h6>You haven’t any car yet</h6>

											<Link className='btn arrow-style blue-btn' href="/buy"><span>View Inventory</span></Link>

										</div>
									</> : ''} */}


								<div className='after-car-added'>


									<div className='white-inner'>
										{
											testDrives !== undefined && testDrives.length > 0 ? <>


												<div className='car-user-filter'>

													<ul>
														<Swiper {...swiperSettingMenuUser}>

															<SwiperSlide>	<li className={type === '' || type === undefined ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, '')}  >All</li></SwiperSlide>
															<SwiperSlide>	<li className={type === 'upcoming' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'upcoming')}>Upcoming</li></SwiperSlide>
															<SwiperSlide>	<li className={type === 'completed' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'completed')}>Completed</li></SwiperSlide>
															<SwiperSlide>	<li className={type === 'cancelled' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'cancelled')}>Cancelled</li></SwiperSlide>
														</Swiper>
													</ul>

												</div>

												<div className='list-box'>

													<InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={testDrives !== undefined ? testDrives.length : 0} hasMore={!isReached}>

														{
															testDrives.map((drive) => {

																return (
																	<>

																		<div className={`list ${drive.test_status === 1 ? '' : drive.test_status === 2 ? "completed" : drive.test_status === 3 ? "cancelled" : ''}`} key={drive._id}>
																			<div className='date'>{
																				databaseDateConverter(drive.createdAt) ? `${databaseDateConverter(drive.createdAt).weekDay}, ${databaseDateConverter(drive.createdAt).day} ${databaseDateConverter(drive.createdAt).month} ${databaseDateConverter(drive.createdAt).year} ` : ''
																			}</div>

																			<div className='grey-bg'>
																				<div className="prductSec01 top-gap-dash">
																					<div className='flag'>{drive.test_status === 1 ? 'Upcoming' : drive.test_status === 2 ? "Completed" : drive.test_status === 3 ? "Cancelled" : ''}</div>
																					<div className="row">
																						<div className='col-md-3'>
																							<div className='order-id mobile-style'>Order ID: {drive.test_drive_order_id}</div>
																							<img src={`${drive.product_id.product_image}`} className="image-radious" />
																						</div>

																						<div className="col-md-6 right-broder">
																							<div className='order-id desktop-style'>Order ID: {drive.test_drive_order_id}</div>
																							<h1>{drive.car_name}</h1>
																							<ul>
																								<li>{drive.car_registration_year}</li>
																								<li>{drive.car_resgistration_state}</li>
																								<li>{numberFormatter(drive.car_kms)}</li>
																								<li>{drive.car_ownership}</li>
																								<li>{drive.car_fuel_type}</li>
																							</ul>
																						</div>

																						<div className="price-detail col-md-3">

																							<div className='flex-wrapper'>
																								<div className="price">INR <span>{numberFormatter(drive.product_id.price)}/-</span></div>
																								{drive.product_id.product_monthely_emi ? <div className="emiStarts">EMI starts from <span>INR /-</span> {numberFormatter(drive.product_id.product_monthely_emi)}
																								</div> : ''}
																							</div>
																						</div>

																						{
																							drive.car_cancel_reason !== '' && drive.car_cancel_reason !== undefined ?
																								<>
																									<div className="cancel-reasion"><span>Cancellation Reason: </span> {drive.car_cancel_reason}</div>

																									{drive.car_cancel_description !== '' && drive.car_cancel_description !== undefined ?
																										<div className="cancel-reasion">
																											<span>Cancellation Descriptoin: </span>
																											{drive.car_cancel_description}
																										</div> : ''}
																								</>
																								: ''
																						}



																						<div className={`${drive.test_status === 1 ? "upcoming" : ""} car-div-dashboard actions mobile-style top-gap-mob`}>
																							<div>
																								{
																									drive.test_status === 1 || drive.test_status === 3 ? <>
																										<div onClick={(e) => ReScheduleTest(e, drive.experience_center._id, drive.experience_center.center_name, drive.experience_center.center_full_address, drive._id, drive.test_drive_date, drive.test_drive_time)} className='btn  reverse'>Reschedule Test Drive</div>
																									</> : ''
																								}

																								{drive.test_status === 1 ?
																									<>
																										<div className='btn blueBdr' onClick={(e) => TestDrive(e, drive._id)} >Cancel Test Drive</div>
																									</>
																									: ''}

																								{/* Enable # Book Now Button   {
																									drive.test_status === 2 ? <>
																										<div>
																											<Link className='btn min-width reverse' href={`/buy/e-book/${drive.product_id.product_slug}`}>Book Now</Link>


																										</div>
																									</> : ''
																								} */}
																							</div>

																						</div>

																					</div >

																				</div >

																				<div className={`${drive.test_status === 1 ? "upcoming" : ""} car-user-info`}>

																					<div className='car-div-dashboard'>

																						{drive.test_status === 1 ? <>
																							<h3>Test Drive Location</h3>

																							{
																								drive.user_address !== '' && drive.user_city !== '' && drive.user_state !== '' ? <>
																									<div className='location'>{`${drive.user_address}`}</div>
																									<p>{drive.user_landmark}, {drive.user_city}, ({drive.user_state}) – {drive.pin_code}</p>
																								</> : <>

																									<div className='location'>{drive.experience_center.center_name} Experience centre</div>
																									<p>{drive.experience_center.center_full_address}</p>
																									{/* <div className='user-email'><a className='blue-border-style' href='#'>Get Directions</a> </div> */}
																								</>
																							}

																						</> :

																							<div className="grey-text adress">Gurugram Experience centre, Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011</div>

																						}


																					</div>

																					<div className='car-div-dashboard no-border-mob'>

																						{drive.test_status === 1 ?
																							<>
																								<h3>Test Drive Date & Time</h3>
																								<div className='date icons'><span>Date</span>
																									{
																										fullDatabaseDateConverter(drive.test_drive_date) ? `${fullDatabaseDateConverter(drive.test_drive_date).weekDay},  ${fullDatabaseDateConverter(drive.test_drive_date).day} ${fullDatabaseDateConverter(drive.test_drive_date).month}, ${fullDatabaseDateConverter(drive.test_drive_date).year}` : ''
																									}
																								</div>
																								<div className='time icons'><span>Time</span>

																									{
																										drive.test_drive_time === '11 AM - 12 PM' ? '11:00 AM to 12:00 PM' :
																											drive.test_drive_time === '12 PM - 1 PM' ? '12:00 PM to 1:00 PM' :
																												drive.test_drive_time === '1 PM - 2 PM' ? '1:00 PM to 2:00 PM' :
																													drive.test_drive_time === '2 PM - 3 PM' ? '2:00 PM to 3:00 PM' :
																														drive.test_drive_time === '3 PM - 4 PM' ? '3:00 PM to 4:00 PM' :
																															drive.test_drive_time === '4 PM - 5 PM' ? '4:00 PM to 5:00 PM' :
																																drive.test_drive_time === '5 PM - 6 PM' ? '5:00 PM to 6:00 PM' :
																																	drive.test_drive_time === '6 PM - 7 PM' ? '6:00 PM to 7:00 PM' : ''


																									}
																								</div>

																							</>

																							:
																							<div className="grey-text calender">
																								{
																									fullDatabaseDateConverter(drive.test_drive_date) ? `${fullDatabaseDateConverter(drive.test_drive_date).weekDay},  ${fullDatabaseDateConverter(drive.test_drive_date).day} ${fullDatabaseDateConverter(drive.test_drive_date).month} ${fullDatabaseDateConverter(drive.test_drive_date).year} ` : ''
																								}
																								<br />
																								{
																									drive.test_drive_time === '11 AM - 12 PM' ? '11:00 AM to 12:00 PM' :
																										drive.test_drive_time === '12 PM - 1 PM' ? '12:00 PM to 1:00 PM' :
																											drive.test_drive_time === '1 PM - 2 PM' ? '1:00 PM to 2:00 PM' :
																												drive.test_drive_time === '2 PM - 3 PM' ? '2:00 PM to 3:00 PM' :
																													drive.test_drive_time === '3 PM - 4 PM' ? '3:00 PM to 4:00 PM' :
																														drive.test_drive_time === '4 PM - 5 PM' ? '4:00 PM to 5:00 PM' :
																															drive.test_drive_time === '5 PM - 6 PM' ? '5:00 PM to 6:00 PM' :
																																drive.test_drive_time === '6 PM - 7 PM' ? '6:00 PM to 7:00 PM' : ''


																								}
																							</div>
																						}

																					</div>



																					<div className='car-div-dashboard actions desktop-style'>
																						<div>
																							{
																								drive.test_status === 1 || drive.test_status === 3 ? <>
																									<div onClick={(e) => ReScheduleTest(e, drive.experience_center._id, drive.experience_center.center_name, drive.experience_center.center_full_address, drive._id, drive.test_drive_date, drive.test_drive_time)} className='btn  reverse'>Reschedule Test Drive</div>
																								</> : ''
																							}

																							{drive.test_status === 1 ?
																								<>
																									<div className='btn blueBdr' onClick={(e) => TestDrive(e, drive._id)} >Cancel Test Drive</div>
																								</>
																								: ''}

																							{/* {
																								drive.test_status === 2 ? <>
																									<div>
																										<div className='btn min-width reverse' onClick={(e) => btnEBookCar(e, drive.product_id.product_slug, drive.product_id.product_status)}>Book Now</div>
																									</div>
																								</> : ''
																							} */}
																						</div>

																					</div>







																					<div className='car-div-dashboard actions mobile-style bottom-btns'>
																						<div>


																							{drive.test_status === 1 ?
																								<>
																									<div className='btn blueBdr' onClick={(e) => TestDrive(e, drive._id)} >Cancel Test Drive</div>
																								</>
																								: ''}

																							{/* {
																								drive.test_status === 2 ? <>
																									<div>
																										<Link className='btn min-width reverse' href={`/buy/e-book/${drive.product_id.product_slug}`}>Book Now</Link>


																									</div>
																								</> : ''
																							} */}
																						</div>

																					</div>



																				</div>



																			</div >

																		</div >


																	</>
																)
															})
														}
													</InfiniteScroll >
												</div >
											</> :
												<>
													<div className='car-user-filter'>
														<ul>
															<li className={type === '' || type === undefined ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, '')}  >All</li>
															<li className={type === 'upcoming' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'upcoming')}>Upcoming</li>
															<li className={type === 'completed' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'completed')}>Completed</li>
															<li className={type === 'cancelled' ? "active" : ''} onClick={(e) => managetestDriveStatusType(e, 'cancelled')}>Cancelled</li>
														</ul>
													</div>
													<div className='no-data-added' style={{ display: "block" }}>
														<div className='animation-icon'>
															<Lottie animationData={EmptyCar} loop={true} />
														</div>
														<h6>You Have Not Scheduled Any Test Drives Yet</h6>
														<Link className='btn arrow-style blue-btn' href="/buy"><span>View Inventory</span></Link>
													</div>
												</>
										}
									</div >
								</div >




								{/* <div className='list cancelled'>
					<div className='date'>Wed, 21 Feb 2023</div>

					<div className='grey-bg'>
						<div className="prductSec01">
							<div className='flag'>Cancelled</div>
							<div className="row">
								<div className='col-md-3'>

									<img src="../img/test-img.png" />


								</div>
								<div className="col-md-6 right-broder">
									<div className='order-id'>Order ID: 12345678</div>
									<h1>Mercedes Benz C220d Progressive</h1>
									<ul>
										<li>2018</li>
										<li>Haryana</li>
										<li>44,500</li>
										<li>2nd</li>
										<li>Diesel</li>
									</ul>




								</div>

								<div className="price-detail col-md-3">
									<div className="price">INR <span>48,25,000/-</span></div>
									<div className="emiStarts">EMI starts from <span>INR 60,000/-</span></div>
								</div>


								<div className='cancel-reasion'><span>Cancellation Reason:</span> Out of station</div>


							</div>

						</div>

						<div className='car-user-info align-top'>

							<div className='car-div-dashboard'>

								<div className="grey-text adress">

									Gurugram Experience centre, Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011

								</div>

							</div>

							<div className='car-div-dashboard no-border'>


								<div className="grey-text calender">

									Wednesday, 24th March, 2023 6:00 PM to 7:00 PM

								</div>

							</div>



							<div className='car-div-dashboard actions'>
								<div>
									<div onClick={ReScheduleTest} className='btn  reverse' >Reschedule Test Drive</div>


								</div>

							</div>

						</div>



					</div>

				</div> */}

								{/* <div className='list completed'>
					<div className='date'>Wed, 21 Feb 2023</div>

					<div className='grey-bg'>
						<div className="prductSec01">
							<div className='flag'>Completed</div>
							<div className="row">
								<div className='col-md-3'>

									<img src="../img/test-img.png" />


								</div>
								<div className="col-md-6 right-broder">
									<div className='order-id'>Order ID: 12345678</div>
									<h1>Mercedes Benz C220d Progressive</h1>
									<ul>
										<li>2018</li>
										<li>Haryana</li>
										<li>44,500</li>
										<li>2nd</li>
										<li>Diesel</li>
									</ul>




								</div>

								<div className="price-detail col-md-3">
									<div className="price">INR <span>48,25,000/-</span></div>
									<div className="emiStarts">EMI starts from <span>INR 60,000/-</span></div>
								</div>





							</div>

						</div>

						<div className='car-user-info align-top'>

							<div className='car-div-dashboard'>

								<div className="grey-text adress">

									Gurugram Experience centre, Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011

								</div>

							</div>

							<div className='car-div-dashboard no-border'>


								<div className="grey-text calender">

									Wednesday, 24th March, 2023 6:00 PM to 7:00 PM

								</div>

							</div>



							<div className='car-div-dashboard actions'>
								<div>
									<a className='btn min-width reverse' href='#'>Book Now</a>


								</div>

							</div>

						</div>



					</div>

				</div> */}



							</div >


						</div >


					</div >

				</div >

			</div >




			{
				CancelTestDrive ?

					<div style={{ display: "block" }
					} className={`common-popup login mob-radio cancel-test`}>
						<div onClick={closePop} className="overlay-mob mobile-style"></div>
						<div className='popup-inner'>

							<div className='popup-close' onClick={closePop}></div>

							<div className='before-otp'>


								<h3>Cancel Order</h3>

								<p>Please specify reason for cancellation.</p>

								<form name="cancel_order" id="cancel-user-test-drive" method='POST' onSubmit={cancelUserTestDrive}>

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
												<input id='station' type="radio" name="cancel_reason" defaultValue="Not looking for preowned" onClick={() => checkForDescription()} />
												<label htmlFor="station">
													Not looking for preowned
												</label>
											</div>

											<div className='radio-div'>
												<input id='accident' type="radio" name="cancel_reason" defaultValue="Doesn’t feel like the right buy" onClick={() => checkForDescription()} />
												<label htmlFor="accident">
													Doesn’t feel like the right buy
												</label>
											</div>

											<div className='radio-div'>
												<input id='sold' type="radio" name="cancel_reason" defaultValue="Car is over my budget" onClick={() => checkForDescription()} />
												<label htmlFor="sold">
													Car is over my budget
												</label>
											</div>

											<div className='radio-div'>
												<input id='already-pruchased-car' type="radio" name="cancel_reason" defaultValue="Already purchased a car" onClick={() => checkForDescription()} />
												<label htmlFor="already-pruchased-car">
													Already purchased a car
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
											<input type="hidden" name="drive_id" id="" value={testDriveId} />
											<input type='hidden' name="status" value="3" />


										</div>
									</div>
									<div className='center-btns two-btn'>
										<div className='popup-close-mob mobile-style' onClick={closePop}>Close</div>

										<button className='btn reverse'>
											<ButtonSpinner load={tinyLoader} btnName={`Cancel Booking`} />
										</button>
									</div>

								</form>

							</div>
						</div>

					</div >

					: ""

			}
			{/* {
CancelTestDrive ?

	<div style={{ display: "block" }
	} className={`common-popup login cancel-test`
	}>

		<div className='popup-inner'>

			<div className='popup-close' onClick={closePop}></div>

			<div className='before-otp'>


				<h3>Cancel Test Drive</h3>

				<p>Please specify the reason why you’d like to cancel your Test Drive?</p>

				<form>

					<div className='from-row border-style'>

						<div className='form-div'>

							<div className='radio-div'>
								<input id='better' type="radio" name="radio-test" />
								<label htmlFor="better">
									Getting better offer

								</label>
							</div>

							<div className='radio-div'>
								<input id='station' type="radio" name="radio-test" />
								<label htmlFor="station">
									Out of station

								</label>
							</div>

							<div className='radio-div'>
								<input id='accident' type="radio" name="radio-test" />
								<label htmlFor="accident">
									Met with an accident

								</label>
							</div>

							<div className='radio-div'>
								<input id='sold' type="radio" name="radio-test" />
								<label htmlFor="sold">
									Already sold my car

								</label>
							</div>

							<div className='radio-div'>
								<input id='Others' type="radio" name="radio-test" />
								<label htmlFor="Others">
									Others

								</label>
							</div>

							<input className='grey-bg' placeholder='Please mention your reason' type="text" />


						</div>
					</div>


					<button className='btn reverse'>Cancel Evaluation</button>


				</form>

			</div>

			<div className='after-otp' style={{ display: "none" }}>
				<img src="img/otp-icon.svg" />

				<h3>Enter OTP</h3>



				<form>

					<div className='from-row'>

						<div className='form-div'>

							<p>Please enter the OTP sent to <i>9876543210</i> <span>Change</span></p>
							<input type="text" />
							<div className='error'>error</div>

							<div className='otp-timer'>5:45</div>

						</div>
					</div>


					<button className='btn'>Verify & Proceed</button>

					<div className='resend-otp'>Didn’t received your OTP? <span>Resend OTP</span></div>


				</form>

			</div>

		</div>

	</div >

	: ""

} */}

			{
				ReSchedule ?
					<div className={`common-popup with-scroll`} style={{ display: "block" }}>
						<div onClick={closePop} className="overlay-mob mobile-style"></div>
						<div className='popup-inner'>

							{/*  */}
							<div className='popup-close show-mob' onClick={closePop}></div>

							<form method="POST" onSubmit={reScheduleUserTestDrive} id="reschedule-user-test-drive">

								<div className='test-drive' style={{ display: submitRescheduleTestDrive === false ? "none" : "block" }}>

									<h3>Reschedule Test Drive</h3>

									<div className='scroll-div'>


										<div className="style-box no-border">

											{/* <h4>Select Location</h4> */}

											<div className='tabers'>

												<div onClick={experienceLocation} className={`${Location ? "active" : ""} btn blueBdr`}>Experience Centre</div>
												{/* <div onClick={googleLocation} className={`${Location ? "" : "active"} btn blueBdr`}>My Location</div> */}

											</div>

											{Location ?
												<div className='centre-adress'>

													<h4>{experienceCenterName}</h4>
													<p>{experienceCenterAddress}</p>

												</div>
												:
												<div className='google-detect'>

													{/* <div className='detect-adress'>3rd Floor, Building No. 261, Lane No 5, Westend Marg, Said-ul-Ajaib, Saket, Saiyad Ul Ajaib Extension…</div>

							<div className='detect-location'><span>Detect my location</span></div> */}

													<div className="from-row">

														<div className='form-div'>

															<label>First Name*</label>

															<input type="text" placeholder='Enter First Name' defaultValue={user !== '' && user !== undefined ? user.first_name : ''} name="first_name" id="first_name" onChange={manageLandMarkTestDrive} />

														</div>

														<div className='form-div'>

															<label>Last Name*</label>

															<input type="text" placeholder='Enter Last Name' name="last_name" id="last_name" onChange={managePinCodetestDrive} defaultValue={user !== '' && user !== undefined ? user.last_name : ''} />

														</div>

													</div>
													<div className='full-form'>

														<div className="from-row full">

															<div className='form-div'>

																<label>Address*</label>

																<textarea placeholder='Enter Address' name="drive_full_address" id="full_address" onChange={manageAddressTestDrive}></textarea>



															</div>

														</div>

														<div className="from-row">

															<div className='form-div'>

																<label>Landmark</label>

																<input type="text" placeholder='Enter Landmark' name="landmark" id="landmark" onChange={manageLandMarkTestDrive} />

															</div>

															<div className='form-div'>

																<label>Pincode </label>

																<input type="text" placeholder='Enter Pincode' name="pincode" id="pincode" onChange={managePinCodetestDrive} />

															</div>

														</div>


														<div className="from-row">

															<div className='form-div'>

																<label>Select State*</label>

																<select onChange={(e) => getCitiesByState(e.target.value)} name="state" id="state_name" >
																	<option value={``}>Select State</option>
																	{
																		getStates !== undefined && getStates.data !== undefined && getStates.data.data.map((state, i) => {
																			return (
																				<option value={state.province_title} key={i}>{state.province_title}</option>
																			)
																		})
																	}
																</select>
															</div>

															<div className='form-div'>

																<label>Select City*</label>

																<select name="city" id="city_name" onChange={manageCitytestDrive}>
																	<option value={``}>Select City</option>
																	{
																		getCities !== undefined && getCities.map((city, i) => {
																			return (
																				<option value={city.name} key={i}>{city.name}</option>
																			)
																		})
																	}
																</select>

															</div>

														</div>



													</div>
												</div>

											}

										</div>

										<div className='style-box no-border add-time-date'>

											<h4>Select Date*</h4>

											<div className='dates time-pd'>
												{
													weekCal && weekCal.map((date, i) => {
														return (
															<div className='date' key={i}>
																<input type="radio" name="book_date" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} onChange={(e) => manageDateTestDrive(`${date.day} ${date.month} ${date.year}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))}
																	defaultChecked={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`) === bookedDateSlotNotConv ? true : false}
																/>
																<label htmlFor={`selected_${i}`} className="option">
																	{date.day} {date.month} <span>{date.weekDay}</span>
																</label>
															</div>
														)
													})
												}
												<div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>

											</div>
											<small id="selectedDateError" className="error"></small>

										</div>


										<div className='style-box time-slot no-border add-time-date'>

											<h4>Select Time Slot</h4>

											<div className='dates'>

												<div className='date'>
													<input type="radio" name="book_time" value="11 AM - 12 PM" id="selectTimeOne" onChange={manageTimeSlotOne}
														defaultChecked={bookedTimeSlot === '11 AM - 12 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '11' ? true : false} />
													<label htmlFor="selectTimeOne" className={`option ${todayDay === radioSelectedDate && todayTime >= '11' ? 'disable-time' : ''}`} >11AM - 12PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="12 PM - 1 PM" id="selectTimeTwo" onChange={manageTimeSlotTwo} defaultChecked={bookedTimeSlot === '12 PM - 1 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '12' ? true : false} />
													<label htmlFor="selectTimeTwo" className={`option ${todayDay === radioSelectedDate && todayTime >= '12' ? 'disable-time' : ''}`}>12PM - 1PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="1 PM - 2 PM" id="selectTimeThree" onChange={manageTimeSlotThree} defaultChecked={bookedTimeSlot === '1 PM - 2 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '13' ? true : false} />
													<label htmlFor="selectTimeThree" className={`option ${todayDay === radioSelectedDate && todayTime >= '13' ? 'disable-time' : ''}`}>1PM - 2PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="2 PM - 3 PM" id="selectTimeFour" onChange={manageTimeSlotFour} defaultChecked={bookedTimeSlot === '2 PM - 3 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '14' ? true : false} />
													<label htmlFor="selectTimeFour" className={`option ${todayDay === radioSelectedDate && todayTime >= '14' ? 'disable-time' : ''}`}>2PM - 3PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="3 PM - 4 PM" id="selectTimeFive" onChange={manageTimeSlotFive} defaultChecked={bookedTimeSlot === '3 PM - 4 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '15' ? true : false} />
													<label htmlFor="selectTimeFive" className={`option ${todayDay === radioSelectedDate && todayTime >= '15' ? 'disable-time' : ''}`} >3PM - 4PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="4 PM - 5 PM" id="selectTimeSix" onChange={manageTimeSlotSix} defaultChecked={bookedTimeSlot === '4 PM - 5 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '16' ? true : false} />
													<label htmlFor="selectTimeSix" className={`option ${todayDay === radioSelectedDate && todayTime >= '16' ? 'disable-time' : ''}`} >4PM - 5PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="5 PM - 6 PM" id="selectTimeSaven" onChange={manageTimeSlotSaven} defaultChecked={bookedTimeSlot === '5 PM - 6 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '17' ? true : false} />
													<label htmlFor="selectTimeSaven" className={`option ${todayDay === radioSelectedDate && todayTime >= '17' ? 'disable-time' : ''}`}>5PM - 6PM</label>
												</div>

												<div className='date'>
													<input type="radio" name="book_time" value="6 PM - 7 PM" id="selectTimeEight" onChange={manageTimeSlotEight} defaultChecked={bookedTimeSlot === '6 PM - 7 PM' ? true : false} disabled={todayDay === radioSelectedDate && todayTime >= '18' ? true : false} />
													<label htmlFor="selectTimeEight" className={`option ${todayDay === radioSelectedDate && todayTime >= '18' ? 'disable-time' : ''}`}>6PM - 7PM</label>
												</div>

											</div>
											<small id="selectedTimeError" className="error"></small>
										</div>

										<div className='style-box time-slot no-border'>

											<div className='message'>You will get a clean and sanitized car for test drive. Our Luxury Ride<br /> executives are screened for normal temperature daily.</div>

										</div>



									</div>
									<input type="hidden" name="experience_center" value={experienceCenterId} />
									<input type="hidden" name="test_id" value={testDriveId} />
									<div className='fixed-button'><button>
										<ButtonSpinner load={tinyLoader} btnName="RESCHEDULE TEST DRIVE" />
										<span>
											<i>At </i>
											{Location === true ? experienceCenterName + ` Experience Centre` : bookedAddres ? bookedAddres : experienceCenterName + ` Experience Centre`}  <i>on </i>{btnBookedDate.weekDay}, {btnBookedDate.day} {btnBookedDate.month} {btnBookedDate.year} <i> from</i> {bookedTimeSlot}
										</span>

									</button></div>

								</div>
							</form>
							<div className='thankyou' style={{ display: thankYouTestDrive === false ? "none" : "block" }}>



								<div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

								<h4>Free Test Drive Re-Schedule!</h4>

								<p>Your test drive is rescheduled for <span>{btnBookedDate.weekDay}, {btnBookedDate.day} {btnBookedDate.month} {btnBookedDate.year}, {bookedTimeSlot}  </span>at<span> {bookedAddres}</span>.

								</p>
								<Link href={`/buy`} className='btn reverse'>Back To Cars</Link>
							</div>

						</div>

					</div>

					: ""

			}



			{cancelPopUp ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}

		</div >
	)
}

export default Index