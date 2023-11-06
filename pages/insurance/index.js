import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import { Navigation, Autoplay } from "swiper";
import Lottie from "lottie-react";
import "swiper/css";
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import ReviewComponent from '@/components/customer-review/ReviewComponent';
import FrequentlyAskedQuestions from '@/components/frequently-asked-questions/FrequentlyAskedQuestions';
import RequestCallBack from '@/components/request-callback';
import useSWR from 'swr';
import axios from 'axios';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import LoginForm from '@/components/LoginForm';
import { ButtonSpinner } from '@/components/Helper';


const fetcher = (url) => axios.get(url).then(res => res.data);


function Index({ cmsPage }) {

	const Url = process.env.NEXT_PUBLIC_URL;
	const SALES_FORCE_URL = process.env.SALES_FORCE_URL;

	const [GetACall, setGetACall] = useState(false);
	const [testDriveLogin, setTestDriveLogin] = useState(false);
	const [callSuccessMessage, setCallSuccessMessage] = useState('');
	const [callErrorMessage, setCallErrorMessage] = useState('');
	const [user, setUser] = useState('');
	const [tinyLoader, setTinyLoader] = useState(false);

	const [carRegistrationNumber, setCarRegistrationNumber] = useState('');


	const insurances = useSWR(`${Url}get-all-insurance-list`, fetcher);



	const closePop = () => {
		setTestDriveLogin(false);
		setGetACall(false);
		setTinyLoader(false);
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
			document.body.classList.remove('hide-scroll-poup-new');
		}
	}
	const swiperSetting = {
		slidesPerView: 2.5,
		navigation: true,

		modules: [Navigation, Autoplay],
		breakpoints: {
			1200: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 3,
			},
		}
	}

	useEffect(() => {

		if (typeof window !== "undefined") {

			document.body.classList.add('mobile-menu-show');
		}


		if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
			const fetchUserData = axios.get(`${Url}user/get-user-profile`, {
				headers: {
					token: localStorage.getItem('lr-user-token')
				}
			}).then((res) => {
				setUser(res.data.user);
			}).catch((err) => {
				if (err && err.response && err.response.data.status) {
					setVisitSuccess(true);
					setCallErrorMessage('Something went wrong!');
				}
			});
		}
		return () => {
			if (typeof window !== "undefined") {

				document.body.classList.remove('mobile-menu-show');
			}

		}

	});

	const submitCarRegistrationNumber = async (e) => {
		e.preventDefault();

		const carNumber = document.getElementById('car-registration').value;

		if (carNumber.length <= 6 || carNumber === '' || carNumber === undefined) {
			document.getElementById('carRegistrationError').innerHTML = 'Please enter car registration number.';
			document.getElementById("carRegistrationError").style.display = "block";

			setTimeout(() => {
				document.getElementById('carRegistrationError').innerHTML = '';
				document.getElementById("carRegistrationError").style.display = "none";
			}, 3000);
			return false;
		}
		if (typeof window !== "undefined" && localStorage.getItem('lr-user-token')) {
			setTestDriveLogin(false);
			// setTinyLoader(true);

			const getFormData = {
				car_number: carNumber,
				form_type: "Insurance"
			}
			await axios.post(`${Url}submit-car-number`, getFormData, {
				headers: {
					token: localStorage.getItem('lr-user-token')
				}
			}).then(async (res) => {
				if (res.data.status === 1) {
					setGetACall(true);
					setCallSuccessMessage(res.data.message);
					document.getElementById('insurance-form').reset();
					document.body.classList.add('hide-scroll-poup-new');
					setTinyLoader(false);
					setCarRegistrationNumber('');

					const leadData = {
						"First Name": user.first_name ? user.first_name : '',
						"Last Name": user.last_name ? user.last_name : '',
						"Email": user.email ? user.email : '',
						"WhatsApp": user.mobile,
						"Lead Type": "Insurance",
						"Lead_Category": "Individual",
						"Registration_Number": carNumber
					};

					await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {
					}).catch((e) => {
					});
				}
			}).catch((e) => {
				setTinyLoader(false);
				if (e && e.response && e.response.data && e.response.data.status === 0) {
					setCallErrorMessage(e.response.data.message);
				} else if (e && e.response && e.response.data && e.response.data.status === 2) {
					setCallErrorMessage(e.response.data.message);
				}
			});

		} else {
			setTestDriveLogin(true);
		}
	}

	const mobileSubmitCarRegistrationNumber = async (e) => {
		e.preventDefault();

		const carNumber = document.getElementById('car-registration-mobile').value;
		if (carNumber.length <= 0 || carNumber === '' || carNumber === undefined) {
			document.getElementById('mobileCarRegistrationError').innerHTML = 'Please enter car registration number.';
			document.getElementById("mobileCarRegistrationError").style.display = "block";
			setTimeout(() => {
				document.getElementById('mobileCarRegistrationError').innerHTML = '';
				document.getElementById("mobileCarRegistrationError").style.display = "none";
			}, 3000);
			return false;
		}
		if (typeof window !== "undefined" && localStorage.getItem('lr-user-token')) {
			setTestDriveLogin(false);
			setTinyLoader(true);

			const getFormData = {
				car_number: carNumber,
				form_type: "Insurance"
			}
			await axios.post(`${Url}submit-car-number`, getFormData, {
				headers: {
					token: localStorage.getItem('lr-user-token')
				}
			}).then(async (res) => {
				if (res.data.status === 1) {
					setGetACall(true);
					setCallSuccessMessage(res.data.message);
					document.getElementById('mobile-insurance-form').reset();
					document.body.classList.add('hide-scroll-poup-new');
					setTinyLoader(false);

					const leadData = {
						"First Name": user.first_name ? user.first_name : '',
						"Last Name": user.last_name ? user.last_name : '',
						"Email": user.email ? user.email : '',
						"WhatsApp": user.mobile,
						"Lead Type": "Insurance",
						"Lead_Category": "Individual",
						"Registration_Number": carNumber
					};

					await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {
					}).catch((e) => {
					});
				}
			}).catch((e) => {
				setTinyLoader(false);
				if (e && e.response && e.response.data && e.response.data.status === 0) {
					setCallErrorMessage(e.response.data.message);
				} else if (e && e.response && e.response.data && e.response.data.status === 2) {
					setCallErrorMessage(e.response.data.message);
				}
			})

		} else {
			setTestDriveLogin(true);
		}
	}

	const submitDataAfterSubmitLogIn = async () => {
		setTinyLoader(true);
		const carNumber = document.getElementById('car-registration').value;
		const getFormData = {
			car_number: carNumber,
			form_type: "Insurance"
		}
		await axios.post(`${Url}submit-car-number`, getFormData, {
			headers: {
				token: localStorage.getItem('lr-user-token')
			}
		}).then(async (res) => {
			if (res.data.status === 1) {
				setGetACall(true);
				setCallSuccessMessage(res.data.message);
				document.getElementById('insurance-form').reset();
				document.body.classList.add('hide-scroll-poup-new');
				setTinyLoader(false);

				const leadData = {
					"First Name": user.first_name ? user.first_name : '',
					"Last Name": user.last_name ? user.last_name : '',
					"Email": user.email ? user.email : '',
					"WhatsApp": user.mobile,
					"Lead Type": "Insurance",
					"Lead_Category": "Individual",
					"Registration_Number": carNumber
				};

				await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

				}).catch((e) => {

				});
			}
		}).catch((e) => {
			setTinyLoader(false);
			if (e && e.response && e.response.data && e.response.data.status === 0) {
				setCallErrorMessage(e.response.data.message);
			} else if (e && e.response && e.response.data && e.response.data.status === 2) {
				setCallErrorMessage(e.response.data.message);
			}
		})
	}
	// const convertToSlug = value.toLowerCase().replace(/ /g, '-');

	function removeNonAlphanumeric(string) {
		return string.replace(/[^A-Z0-9]/gi, '');
	}


	const checkCarRegisNumber = (e) => {
		setCarRegistrationNumber(removeNonAlphanumeric(e).toUpperCase());
	}


	function alphanumeric(inputtxt) {
		var letterNumber = /^[0-9A-Z]+$/;
		if ((inputtxt.match(letterNumber))) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<>
			<WebHead pageTitle="Insurance" />
			{/* <WebsiteLayout> */}
			<div className="home-banner inner-banner mobile-view-hide">
				<img src={`${Url}${cmsPage.page_banner}`} alt="" />

				<div className="filter-section wd-filters">

					<h2><span>Luxury Ride Insurance</span>Save Upto 70%* On Car Insurance Premium</h2>
					<div className='car-search two-colum'>
						<form method="POST" onSubmit={submitCarRegistrationNumber} id="insurance-form">

							<div className='div-data'>
								<input placeholder='Enter Registration Number*' id="car-registration" name="car_registration" onChange={(e) => checkCarRegisNumber(e.target.value)} type="text" value={carRegistrationNumber} minLength={6} maxLength={10} pattern="[a-zA-Z0-9\s]+" />
							</div>

							<div className='div-data'>
								<button>
									{/* <span>Submit</span> */}
									<ButtonSpinner load={tinyLoader} btnName={`Submit`} />
								</button>
							</div>
							<small id="carRegistrationError" className="error"></small>
						</form>

					</div>
					<ul className='circle-ul'>
						<li>Incredibly Low Premiums</li>
						<li>Superquick & Easy</li>
						<li>Hassle-Free Claims</li>

					</ul>
				</div>

			</div>

			<div className="inner-mobile-banner desktop-hide-div mobile-show-div">
				<img src={`${Url}${cmsPage.mobile_banner}`} className="mob-class-bg" alt="" />
				<div className="mobile-txt-banner">
					<div className="wrapper">
						<h2>Save unto 70%* on <span>Car Insurance</span></h2>

						<ul>
							<li>
								<div className="banner-icon">
									<img src="img/low-premiums.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>01</span>Incredibly Low Premiums
								</div>
							</li>

							<li>
								<div className="banner-icon">
									<img src="img/superquickand-easy.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>02</span>Superquick And Easy
								</div>
							</li>

							<li>
								<div className="banner-icon">
									<img src="img/hassle-Free-claims.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>03</span>Hassle-Free Claims
								</div>
							</li>
						</ul>
						<form method="POST" onSubmit={mobileSubmitCarRegistrationNumber} id="mobile-insurance-form">
							<div className="loanbanner-formmob">
								<div className='form-input'>
									<input placeholder='Enter Registration Number*' id="car-registration-mobile" name="car_registration_mobile" type="text" />
									<small id="mobileCarRegistrationError" className="error"></small>
								</div>
								<div className='form-input'>
									<button className="btn">
										<ButtonSpinner load={tinyLoader} btnName={`Submit`} />
									</button>
								</div>
							</div>

						</form>
					</div>
				</div>
			</div>
			<section className='banks-outer-section'>
				<div className="wrapper">
					<div className='working-with-banks'>

						<h3>Our Partners</h3>

						<Swiper {...swiperSetting} autoplay={{ delay: 2500, disableOnInteraction: false, }}>

							{

								insurances !== undefined && insurances.data !== undefined && insurances.data.insurances !== undefined && insurances.data.insurances !== '' && insurances.data.insurances.map((insurance) => {
									return (
										<SwiperSlide key={insurance._id}>
											<img src={`${Url}${insurance.image}`} />
										</SwiperSlide>
									)
								})
							}
						</Swiper>

					</div>
				</div>
			</section>

			<section className='core-benefit commonm-gap'>
				<div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
			</section>


			<section className='happen-nxt without-border comPad pb-0'>
				<div className='wrapper'>
					<div dangerouslySetInnerHTML={{ __html: cmsPage.content_two }}></div>
				</div>
			</section>


			<RequestCallBack queryType={`Request call back for Insurance`} user={user} />

			<FrequentlyAskedQuestions heading="Frequently Asked Questions On Sell" pageType={cmsPage.slug} />


			<ReviewComponent type={cmsPage.slug} />

			{testDriveLogin === true ? <LoginForm Login={testDriveLogin} closePop={closePop} logInHeading={`Login to check your insurance eligibility`} submitDataAfterSubmitLogIn={submitDataAfterSubmitLogIn} loginId={`book-insurance-by-user`} /> : ''}

			{GetACall ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
			{/* </WebsiteLayout> */}
		</>
	)
}

export default Index

export async function getServerSideProps() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/insurance`);
	const data = await response.json();

	return {
		props: {
			cmsPage: data.cms_page,
		}
	}
}
