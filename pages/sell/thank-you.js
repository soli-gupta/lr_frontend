import WebHead from '@/components/common/WebHead'
import React, { useEffect, useState } from 'react'
import Lottie from "lottie-react";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import { $ } from 'react-jquery-plugin'
import axios from 'axios';
import { ButtonSpinner, capitalizeFirstLetter } from '@/components/Helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReScheduleForm from '@/components/sell-request/ReScheduleForm';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';

const fetcher = (url) => axios.get(url).then(res => res.data)

export default function SellDetail() {


	const router = useRouter()
	const id = router.query.id
	const [userCarInfo, setUserCarInfo] = useState('')
	const [tinyLoader, setTinyLoader] = useState(false);
	const [price, setPrice] = useState('')
	const [CancelEvaluation, setCancelEvaluation] = useState(false);
	const [ReSchedule, setReSchedule] = useState(false);
	const [sellRequestId, setSellRequestId] = useState('')
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [popUp, setPopUp] = useState(false);
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

	const TestDrive = (id) => {
		setSellRequestId(id)
		setCancelEvaluation(true)
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll-poup');
			document.body.classList.add('hide-scroll-poup-new');
		}
	}

	const closePop = () => {
		setCancelEvaluation(false)
		setReSchedule(false)
		setPopUp(false);
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
			document.body.classList.remove('hide-scroll-poup-new');
		}
	}


	const openDescriptionDiv = () => {
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

	const cancelEvaluation = async (e) => {
		e.preventDefault()
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

		// if (e.target.cancel_reason_dscription.value.length <= 0) {
		// 	document.getElementById('cancelDescription').innerHTML = 'Please describe your cancel reason.';
		// 	document.getElementById("cancelDescription").style.display = "block";
		// 	setTimeout(() => {
		// 		document.getElementById('cancelDescription').innerHTML = '';
		// 		document.getElementById("cancelDescription").style.display = "none";
		// 	}, 3000);
		// 	createError++;
		// }

		if (createError > 0) {
			setTinyLoader(false);
			return false;
		}
		const formData = new FormData(document.getElementById('cancelEvaluationForm'))
		await axios.post(`${process.env.NEXT_PUBLIC_URL}user/cancel-sell-data`, formData, {
			headers: {
				'Content-Type': 'application/json',
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setPopUp(true)
					setSuccessMessage(res.data.message)
					document.body.classList.remove('hide-scroll-poup')
					document.getElementById("cancelEvaluationForm").reset();
					setCancelEvaluation(false)
					router.push('/dashboard/sell-requests')
				}
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	const ReScheduleTest = (id) => {
		setSellRequestId(id)
		setReSchedule(true)
		if (typeof window !== "undefined") {
			document.body.classList.add('hide-scroll-poup');
			document.body.classList.add('hide-scroll-poup-new');
		}
	}


	const handlePrice = (e) => {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === "" || regex.test(e.target.value)) {
			setPrice(e.target.value)
		}
	}

	const submitExpectedPrice = async (e, type) => {
		e.preventDefault()
		let createError = 0;
		let formData = ''

		if (e.target.expected_sell_price.value.length <= 0) {
			document.getElementById('errorPrice').innerHTML = 'Please enter your expected selling price';
			document.getElementById("errorPrice").style.display = "block";
			setTimeout(() => {
				document.getElementById('errorPrice').innerHTML = '';
				document.getElementById("errorPrice").style.display = "none";
			}, 3000);
			createError++;
		}

		if (createError > 0) {
			setTinyLoader(false);
			return false;
		}
		setTinyLoader(true);
		formData = new FormData(document.getElementById('expectedPriceForm'))
		await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-data`, formData, {
			headers: {
				'Content-Type': 'application/json',
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setTinyLoader(false)
					setPrice(res.data.price)
					router.push('/sell/thank-you')
					// router.reload()
					document.getElementById('expectedPrice').style.display = 'block'
					document.getElementById('expectedPriceDiv').style.display = 'none'
				}
			})
			.catch(function (error) {
				setTinyLoader(false)
				if (error && error.response && error.response.data && error.response.data.status === 0) {
					alert(error.response.data.message)
				}
				console.log(error)

			});
	}
	// const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}user/edit-sell-data`, fetcher);

	const submitRCAndInsurance = async (e) => {
		e.preventDefault()
		if (e.target.rc_registration_certificate.value.length <= 0 && e.target.car_insurance.value.length <= 0) {
			document.getElementById('docError').innerHTML = 'Please upload at least one doc or both.';
			document.getElementById("docError").style.display = "block";
			setTimeout(() => {
				document.getElementById('docError').innerHTML = '';
				document.getElementById("docError").style.display = "none";
			}, 3000);
			// setPopUp(true);
			// setErrorMessage('Please upload at least one doc or both.');
			return false
		} else {

		}
		setTinyLoader(true);
		const formData = new FormData(document.getElementById('uploadFileForm'))
		await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-data`, formData, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setSuccessMessage(res.data.messages)
					setTinyLoader(false)
					router.push('/dashboard/sell-requests')
				}
			})
			.catch(function (error) {
				setTinyLoader(false)
				console.log(error)

			});
	}


	const fetchData = async () => {
		await axios.get(`${process.env.NEXT_PUBLIC_URL}user/edit-sell-request?id=${id}`, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setUserCarInfo(res.data.data)
				}
			})
			.catch(function (error) {
				console.log(error)

			});
	}

	const editPrice = () => {
		document.getElementById('expectedPriceDiv').style.display = 'block'
		document.getElementById('expectedPrice').style.display = 'none'
	}


	useEffect(() => {
		if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
			router.push("/");
		}
		fetchData()
		$('.numberonly').keypress(function (e) {
			var charCode = (e.which) ? e.which : event.keyCode
			if (String.fromCharCode(charCode).match(/[^0-9]/g))
				return false;
		});
	}, [id])

	return (
		<>
			<WebHead pageTitle="Sell details" />
			{/* <WebsiteLayout> */}
			<section className='sell-car-form bg-grey comPad'>
				<div className='wrapper'>
					<div className='row'>
						<div className='col-md-7'>
							<div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
								<div className='border-heading relativediv'>
									<h3>Car Details</h3>
									{/* <Link href='/sell' className='editcta' >Edit</Link> */}
								</div>
								<div className='vehicle-list-detail'>
									<ul>
										<li>Brand<span>{userCarInfo && userCarInfo.brand_name}</span></li>
										<li>Reg. Year<span>{userCarInfo && userCarInfo.year}</span></li>
										<li>Model<span>{userCarInfo && userCarInfo.model_name}</span></li>
										<li>Variant<span>{userCarInfo && userCarInfo.variant_name}</span></li>
										<li>Ownership
											<span>{userCarInfo && userCarInfo.ownership}{userCarInfo ? userCarInfo.ownership === '1' ? 'st' : userCarInfo.ownership === '2' ? 'nd' : userCarInfo.ownership === '3' ? 'rd' : '' : ''}</span>
										</li>
										<li>KMs Driven<span>{userCarInfo && Number(userCarInfo.kms).toLocaleString('en-US')}</span></li>
									</ul>
								</div>
							</div>
							<div className='formbx-white congratulation-bx' id="congratulationDiv">
								{userCarInfo &&
									<div className='congo-namebx'>
										<div className='animation-icon'>
											<Lottie animationData={Congratulationstick} loop={true} />
										</div>
										<div className='msg-congo'>
											<h2>Congratulations! {userCarInfo.user_name}</h2>
											<ul>
												<li>+91-{userCarInfo.user_mobile}</li>
												<li>{userCarInfo.user_email}</li>
											</ul>
										</div>
									</div>
								}

								<div className='bookedsell-msg'>Your free car evaluation is scheduled.<span className='blue-txt'> Sell request ID : {userCarInfo && userCarInfo.request_id
								}</span></div>

								<div className='address-confirmation'>
									<ul>
										{/* <li>
											<div className='icon-add'>
												<img src="/img/messageblue-icon.svg" alt="Luxury Ride" />
											</div>
											You will receive an SMS with all the details of your appointment.
										</li> */}
										<li>
											<div className='icon-add'>
												<img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
											</div>
											{new Date(userCarInfo && userCarInfo.slot_date).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(userCarInfo && userCarInfo.slot_date).getDate()} {new Date(userCarInfo && userCarInfo.slot_date).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(userCarInfo && userCarInfo.slot_date).getFullYear()},  {userCarInfo && userCarInfo.slot_time}
										</li>
										<li>
											<div className='icon-add'>
												<img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
											</div>
											<span>{userCarInfo && userCarInfo.address_type ? capitalizeFirstLetter(userCarInfo.address_type) : ''}</span>{userCarInfo && userCarInfo.full_address},{userCarInfo && userCarInfo.city}, {userCarInfo && userCarInfo.state} {userCarInfo && userCarInfo.pincode}, India
										</li>
									</ul>

									<div className='cancle-actions'>
										<Link href="#" className='grey-txt-btn' onClick={() => TestDrive(userCarInfo && userCarInfo._id)}>Cancel Evaluation</Link>
										<Link href="#" onClick={() => ReScheduleTest(userCarInfo && userCarInfo._id)}>Reschedule</Link>
									</div>
								</div>
							</div>

						</div>

						<div className='col-md-5 sticky-div'>
							<div className='sticky-div'>
								<div className='formbx-white p-0 mobile-view-hide'>
									<div className='border-heading relativediv'>
										<h3>Car Details</h3>
										{/* <Link href='/sell' className='editcta' >Edit</Link> */}
									</div>
									<div className='vehicle-list-detail'>
										<ul>
											<li>Brand<span>{userCarInfo && userCarInfo.brand_name}</span></li>
											<li>Reg. Year<span>{userCarInfo && userCarInfo.year}</span></li>
											<li>Model<span>{userCarInfo && userCarInfo.model_name}</span></li>
											<li>Variant<span>{userCarInfo && userCarInfo.variant_name}</span></li>
											<li>Ownership<span>{userCarInfo && userCarInfo.ownership}{userCarInfo ? userCarInfo.ownership === '1' ? 'st' : userCarInfo.ownership === '2' ? 'nd' : userCarInfo.ownership === '3' ? 'rd' : '' : ''}</span></li>
											<li>KMs Driven<span>{userCarInfo && Number(userCarInfo.kms).toLocaleString('en-US')}</span></li>
										</ul>
									</div>
								</div>

								<div className='formbx-white share-expected-price' style={{ position: 'relative' }}>
									{/* {userCarInfo && userCarInfo.expected_sell_price ? */}
									<div className='nextstep-edit' id="expectedPrice" style={{ display: 'none' }}>
										<h3>Share Expected Price For Your Car</h3>
										<div className='final-sell-price'>
											INR {Number(price).toLocaleString('en-US')}
											{/* INR {Number(userCarInfo.expected_sell_price).toLocaleString('en-US')}/- */}
										</div>
									</div>
									{/* : */}

									<form id="expectedPriceForm" method='POST' onSubmit={(e) => submitExpectedPrice(e)}>
										<div className='row' id="expectedPriceDiv">
											<h3>Share Expected Price For Your Car {userCarInfo && userCarInfo.brand_name}</h3>
											<div className='col-md-12'>
												<div className='form-input'>
													<input type="hidden" defaultValue={userCarInfo && userCarInfo._id} name="id" />
													<input type='text' className="numberonly" placeholder='Expected Selling Price' name="expected_sell_price" onChange={(e) => handlePrice(e)} defaultValue={userCarInfo && userCarInfo.expected_sell_price ? userCarInfo.expected_sell_price : price} minLength={4} maxLength={7} />
													<small id="errorPrice" className="error"></small>
												</div>
											</div>
											<div className='col-md-12'>
												<div className='form-input mb-0'>
													<button type='submit' className='btn arrow-style blue-btn'>
														<span>
															<ButtonSpinner load={tinyLoader} btnName="Submit" />
														</span>
													</button>
												</div>
											</div>
										</div>
									</form>
									{/* } */}
								</div>

								<div className='formbx-white uplaod-rc-documents overflow-unset'>
									<form action="#" id="uploadFileForm" method='POST' onSubmit={submitRCAndInsurance}>
										<div className='info-divbx right-hoverbx'>
											<div className='icon-relativediv'>Upload The Required Documents For Car Evaluation
												<div className='info-order mob-right'>
													<img src='/img/circle-info.svg' alt="" />

													<div className='infotxt'>
														<p>Please keep these documents ready beforehand for a smooth experience.</p>
														<p>We generally take 45-60 mins to complete the evaluation process within the specified time slot.</p>
														<ul className='default-ul'>
															<li>Registered owner KYC</li>
															<li>Car Registration Certificate</li>
															<li>Insurance Copy</li>
														</ul>
														<p>This may include a 3KMs test drive.</p>
													</div>
												</div></div>


										</div>
										<div className='form-input uplaod-custombtn'>
											<div className="uplaod-btnbx reg-uploadbx">
												<div className="uploadtxt" id="rcUpload">RC Registration Certificate/Car RC <span>Upload a clear picture of your car’s RC</span></div>
												<input type="hidden" defaultValue={userCarInfo && userCarInfo._id} name="id" />
												<input type="file" htmlFor="rcUpload" className="upload-file registration-upload" accept="image/*,.pdf" name="rc_registration_certificate" id="rc_registration_certificate" />
												<div className="btn-txt"><span>Upload</span></div>
												<small id="rcImage" className="error"></small>
											</div>

											<div className="name-upload registrationfile">
												<p className="mb-0"></p>
												<Link href="#" className="file-remove registrationfile-remove">Remove</Link>
											</div>
										</div>
										<div className='form-input uplaod-custombtn'>
											<div className="uplaod-btnbx insurance-uploadbox">
												<div className="uploadtxt" id="insuranceUpload">Insurance Copy<span>Upload a clear picture of your existing car insurance</span></div>
												<input type="file" htmlFor="insuranceUpload" className="upload-file insurance-upload" accept="image/*,.pdf" name="car_insurance" id="car_insurance" />
												<div className="btn-txt"><span>Upload</span></div>
												<small id="insuranceImage" className="error"></small>
											</div>

											<div className="name-upload insurance-filename">
												<p className="mb-0"></p>
												<Link href="#" className="file-remove insuranceremovefile">Remove</Link>
											</div>
											<span className='error' id="docError"></span>
										</div>

										<div className='form-input mg-0'>
											<button type="submit" className='btn arrow-style blue-btn' >
												<span>
													<ButtonSpinner load={tinyLoader} btnName="Submit" />
												</span>
											</button>
										</div>
									</form>

								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{CancelEvaluation ?

				<div style={{ display: "block" }} className={`common-popup book-visit with-scroll login cancel-test`}>

					<div className='popup-inner'>

						<div className='popup-close' onClick={closePop}></div>

						<div className='before-otp'>


							<h3>Cancel Car Evaluation</h3>

							<p>Please specify reason for cancellation.*</p>

							<form name="cancelEvaluation" id="cancelEvaluationForm" method='POST' onSubmit={cancelEvaluation}>

								<div className='from-row border-style'>

									<div className='form-div'>
										<small id="cancelError" className="error"></small>
										<div className='radio-div'>
											<input id='better' type="radio" name="cancel_reason" defaultValue="Already sold the car" onClick={() => openDescriptionDiv()} />
											<label htmlFor="better">
												Already sold the car

											</label>

										</div>

										<div className='radio-div'>
											<input id='station' type="radio" name="cancel_reason" defaultValue="Not looking to sell" onClick={() => openDescriptionDiv()} />
											<label htmlFor="station">
												Not looking to sell

											</label>
										</div>

										<div className='radio-div'>
											<input id='accident' type="radio" name="cancel_reason" defaultValue="Going on a vacation" onClick={() => openDescriptionDiv()} />
											<label htmlFor="accident">
												Going on a vacation

											</label>
										</div>

										<div className='radio-div'>
											<input id='sold' type="radio" name="cancel_reason" defaultValue="Exploring only" onClick={() => openDescriptionDiv()} />
											<label htmlFor="sold">
												Exploring only

											</label>
										</div>

										<div className='radio-div'>
											<input id='Others' type="radio" name="cancel_reason" defaultValue="Others" onClick={() => openDescriptionDiv()} />
											<label htmlFor="Others"  >
												Others
											</label>

										</div>
										<div id="reasonDiv" style={{ display: 'none' }}>
											<textarea className='grey-bg' placeholder='Please mention your reason*' name="cancel_reason_dscription" id="cancel_reason_dscription" cols="30" rows="10"></textarea>
											<small id="cancelDescription" className="error"></small>
										</div>
										<input type="hidden" name="id" id="" defaultValue={sellRequestId} />
										<input type='hidden' name="status" defaultValue="3" />


									</div>
								</div>


								<button className='btn reverse'>Cancel Evaluation</button>


							</form>

						</div>
					</div>

				</div>

				: ""

			}

			{ReSchedule ?
				<ReScheduleForm closePop={closePop} sellRequestId={sellRequestId} data={userCarInfo} />
				: ""
			}
			{popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePop} /> : ''}
			{/* </WebsiteLayout> */}
		</>
	)
}
