import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SingleRangeSlider from '../rangeslider/SingleRangeSlider';
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import { Navigation, Autoplay } from "swiper";
import Lottie from "lottie-react";
import "swiper/css";
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import FrequentlyAskedQuestions from '@/components/frequently-asked-questions/FrequentlyAskedQuestions';
import { ButtonSpinner, calculateEMI, numberFormatter } from '@/components/Helper';
import IntersetCalc from '../rangeslider/product-detail/InterestCalc';
import InterestYearCalc from '../rangeslider/product-detail/InterestYearCalc';


import useSWR from 'swr';
import axios from 'axios';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReviewComponent from '@/components/customer-review/ReviewComponent';
import PixelLoader from '@/components/PixelLoader';


const fetcher = (url) => axios.get(url).then(res => res.data);


const a = [4, 3, 6, 3, 4, 3, 3, 3]

function count_duplicate(a) {
	let counts = {}

	for (let i = 0; i < a.length; i++) {
		if (counts[a[i]]) {
			counts[a[i]] += 1
		} else {
			counts[a[i]] = 1
		}
	}
	for (let prop in counts) {
		if (counts[prop] >= 2) {
			console.log(prop + " counted: " + counts[prop] + " times.")
		}
	}

}

count_duplicate(a)

function Index({ cmsPage }) {


	const router = useRouter();


	const Url = process.env.NEXT_PUBLIC_URL;
	const SALES_FORCE_URL = process.env.SALES_FORCE_URL;

	const [totalPaybel, setTotalPaybel] = useState('');
	const [monthelyPaybel, setMonthelyPaybel] = useState('');
	const [interestPer, setInterestPer] = useState('');
	const [totalInterest, setTotalInterest] = useState('');
	const [circlePerc, setCirclePerc] = useState('');


	const [GetACall, setGetACall] = useState(false);
	const [loansLogIn, setLoansLogIn] = useState(false);
	const [callSuccessMessage, setCallSuccessMessage] = useState('');
	const [callErrorMessage, setCallErrorMessage] = useState('');

	const [upperValue, setUpperValue] = useState('');
	const [user, setUser] = useState('');
	const [tinyLoader, setTinyLoader] = useState(false);


	// 2023-07-13 Night


	const [openBrandTab, setOpenBrandTab] = useState(false);
	const [openYearTab, setOpenYearTab] = useState(false);
	const [openModelTab, setOpenModeltab] = useState(false);
	const [openVariantTab, setOpenvariantTab] = useState(false);
	const [openKMstab, setOpenKMsTab] = useState(false);
	const [brandModlesList, setBrandModelsList] = useState([]);
	const [fetchYear, setFetchYear] = useState([]);
	const [fetchVariants, setFetchVariants] = useState([]);

	const [brandName, setBrandName] = useState('');
	const [selectYear, setSelectYear] = useState('');
	const [modelName, setModelName] = useState('');
	const [variantName, setVariantName] = useState('');
	const [enterKMs, setEnetrKMs] = useState('');

	const [kmsInput, setKmsInput] = useState('');


	//  End

	const banks = useSWR(`${Url}get-all-banks-list`, fetcher);

	// 2023-07-13 Night


	const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);
	const fetchBodyTypes = useSWR(`${Url}fetch-all-body-type`, fetcher);
	const fetchFuelTypes = useSWR(`${Url}fetch-all-fuel-type`, fetcher);

	// End


	const closePop = () => {
		setGetACall(false);
		setLoansLogIn(false);
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
			document.body.classList.remove('hide-scroll-poup-new');
		}

		document.getElementById('generate-loan-lead-form').reset();
		GetACall === true ? router.reload() : '';
		setBrandName(``);
		setModelName(``);
		setVariantName(``);
		setSelectYear(``);
		setCallSuccessMessage(``);
		setCallErrorMessage(``);

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

	let $get80Val = 2500000;

	const [principleAmount, setPrincipleAmount] = useState($get80Val);
	let $calcInterestPerYear = '';
	let $perMonthEMI = '';

	$calcInterestPerYear = calculateEMI($get80Val, 12, 5)
	$perMonthEMI = calculateEMI($get80Val, 12, 5);


	var loanAmount = $get80Val;
	var interestRate = 12;
	var loanTenure = 5;

	// Calculate monthly interest rate and loan tenure in months
	var monthlyInterestRate = parseInt(interestRate) / 1200;
	var loanTenureInMonths = loanTenure * 12;
	// Calculate EMI
	var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

	// Calculate total interest payable
	var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

	// Calculate total loan amount
	var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);


	const part = emi;
	const whole = totalLoanAmount;

	const percent = (part / whole) * 100;




	const calcInteretByPerAndyear = (e) => {
		e.preventDefault();

		const $interestYear = document.getElementById('interest-year').value;
		const $interestPer = document.getElementById('interest-per').value;




		// var loanAmount = document.getElementById("loanAmount").value;
		// var interestRate = document.getElementById("interestRate").value;
		// var loanTenure = document.getElementById("loanTenure").value;
		// console.log(loanAmount)
		// console.log(interestRate)
		// console.log(loanTenure)


		var loanAmount = (document.getElementById('loan_amount').value).replace('INR', '').replaceAll(',', '');
		setPrincipleAmount(loanAmount);
		var interestRate = document.getElementById("interest-per").value;
		var loanTenure = document.getElementById("interest-year").value;

		// Calculate monthly interest rate and loan tenure in months
		var monthlyInterestRate = parseInt(interestRate) / 1200;
		var loanTenureInMonths = loanTenure * 12;
		// Calculate EMI
		var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

		// Calculate total interest payable
		var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

		// Calculate total loan amount
		var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);

		const part = emi;
		const whole = totalLoanAmount;

		const percent = (part / whole) * 100;



		setTotalPaybel(totalLoanAmount.toFixed(0));
		setMonthelyPaybel(emi.toFixed(0));
		setInterestPer(totalInterestPayable.toFixed(0));
		setTotalInterest(totalInterestPayable.toFixed(0));
		setCirclePerc(percent.toFixed(0));

	}

	const calcInterestPer = (e) => { }
	const calInterestPerYear = (e) => { }

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
	}, [])


	const valueToUpperCase = (e) => {
		// console.log(e);
		// setUpperValue(e.toUpperCase());
	}


	const submitCarRegistrationNumber = async (e) => {
		e.preventDefault();

		if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
			setLoansLogIn(false);

			if (brandName === '' || modelName === '' || variantName === '' || selectYear === '') {
				// setGetACall(true);
				// document.body.classList.add('hide-scroll-poup-new');
				// setCallErrorMessage('Please select all values.');
				// return false;

				document.getElementById('errMsg').innerHTML = 'Please select all values to continue.';
				document.getElementById("errMsg").style.display = "block";
				setTimeout(() => {
					document.getElementById('errMsg').innerHTML = '';
					document.getElementById("errMsg").style.display = "none";
				}, 3000);
				return false;
			}
			setTinyLoader(true);


			const formData = new FormData(document.getElementById('generate-loan-lead-form'));
			formData.append('brandName', brandName);
			formData.append('modelName', modelName);
			formData.append('variantName', variantName);
			formData.append('selectYear', selectYear);
			formData.append('enterKms', enterKMs);


			await axios.post(`${Url}generate-buy-page-lead`, formData, {
				headers: {
					token: localStorage.getItem('lr-user-token'),
					'Content-Type': 'application/json'
				}
			}).then(async (res) => {
				if (res && res.data.status === 1) {
					setCallSuccessMessage(`${res.data.message}`);
					document.getElementById('generate-loan-lead-form').reset();
					setGetACall(true);
					document.body.classList.add('hide-scroll-poup-new');
					// brandName,selectYear,modelName,variantName,enterKMs
					setTinyLoader(false);

					const leadData = {
						"First Name": user.first_name ? user.first_name : '',
						"Last Name": user.last_name ? user.last_name : '',
						"Email": user.email ? user.email : '',
						"WhatsApp": user.mobile,
						"Lead Type": "Loan",
						"Lead_Category": "Individual",
						"Registration_Number": carNumber
					};

					// await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

					// }).catch((e) => {

					// });
				}
			}).catch((e) => {
				setGetACall(true);
				setTinyLoader(false);
				document.body.classList.add('hide-scroll-poup-new');
				if (e && e.message) {
					setCallErrorMessage(`Something went wrong.`)
				} else if (e && e.response.data.status === 0) {
					setCallErrorMessage(`${e.response.data.message}`);
				} else if (e && e.response.data.status === 2) {
					setCallErrorMessage(`${e.response.data.message}`);
				}
			})
		} else {
			setLoansLogIn(true);
		}
	}


	const submitDataAfterSubmitLogIn = async () => {
		// const carNumber = document.getElementById('car-registration').value;

		// if (carNumber.length <= 0 || carNumber === '' || carNumber === undefined) {
		// 	document.getElementById('carRegistrationError').innerHTML = 'Please enter car registration number.';
		// 	document.getElementById("carRegistrationError").style.display = "block";
		// 	setTimeout(() => {
		// 		document.getElementById('carRegistrationError').innerHTML = '';
		// 		document.getElementById("carRegistrationError").style.display = "none";
		// 	}, 3000);
		// 	return false;
		// }

		// setTinyLoader(true);
		// const getFormData = {
		// 	car_number: carNumber,
		// 	form_type: "Loan"
		// }
		// await axios.post(`${Url}submit-car-number`, getFormData, {
		// 	headers: {
		// 		token: localStorage.getItem('lr-user-token')
		// 	}
		// }).then(async (res) => {
		// 	if (res.data.status === 1) {
		// 		setGetACall(true);
		// 		setCallSuccessMessage(res.data.message);
		// 		document.getElementById('loans-form').reset();
		// 		document.body.classList.add('hide-scroll-poup-new');
		// 		setTinyLoader(false);


		// 	}
		// }).catch((e) => {
		// 	setGetACall(true);
		// 	setTinyLoader(false);
		// 	if (e && e.response && e.response.data && e.response.data.status === 0) {
		// 		setCallErrorMessage(e.response.data.message);
		// 	} else if (e && e.response && e.response.data && e.response.data.status === 2) {
		// 		setCallErrorMessage(e.response.data.message);
		// 	}
		// });

		if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
			setLoansLogIn(false);

			if (brandName === '' || modelName === '' || variantName === '' || selectYear === '') {
				setGetACall(true);
				document.body.classList.add('hide-scroll-poup-new');
				setCallErrorMessage('Please select all values.');
				return false;
			}
			setTinyLoader(true);


			const formData = new FormData(document.getElementById('generate-loan-lead-form'));
			formData.append('brandName', brandName);
			formData.append('modelName', modelName);
			formData.append('variantName', variantName);
			formData.append('selectYear', selectYear);
			formData.append('enterKms', enterKMs);


			await axios.post(`${Url}generate-buy-page-lead`, formData, {
				headers: {
					token: localStorage.getItem('lr-user-token'),
					'Content-Type': 'application/json'
				}
			}).then(async (res) => {
				if (res && res.data.status === 1) {
					setCallSuccessMessage(`${res.data.message}`);
					document.getElementById('generate-loan-lead-form').reset();
					setGetACall(true);
					document.body.classList.add('hide-scroll-poup-new');
					// brandName,selectYear,modelName,variantName,enterKMs
					setTinyLoader(false);

					const leadData = {
						"First Name": user.first_name ? user.first_name : '',
						"Last Name": user.last_name ? user.last_name : '',
						"Email": user.email ? user.email : '',
						"WhatsApp": user.mobile,
						"Lead Type": "Loan",
						"Lead_Category": "Individual",
						"Registration_Number": carNumber
					};

					await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

					}).catch((e) => {

					});
				}
			}).catch((e) => {
				setGetACall(true);
				setTinyLoader(false);
				document.body.classList.add('hide-scroll-poup-new');
				if (e && e.message) {
					setCallErrorMessage(`Something went wrong.`)
				} else if (e && e.response.data.status === 0) {
					setCallErrorMessage(`${e.response.data.message}`);
				} else if (e && e.response.data.status === 2) {
					setCallErrorMessage(`${e.response.data.message}`);
				}
			})
		} else {
			setLoansLogIn(true);
		}






	}

	// const mobileSubmitCarRegistrationNumber = async (e) => {
	// 	e.preventDefault();

	// 	if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
	// 		setLoansLogIn(false);

	// 		if (brandName === '' || modelName === '' || variantName === '' || selectYear === '') {
	// 			setGetACall(true);
	// 			document.body.classList.add('hide-scroll-poup-new');
	// 			setCallErrorMessage('Please select all values.');
	// 			return false;
	// 		}
	// 		setTinyLoader(true);


	// 		const formData = new FormData(document.getElementById('generate-loan-lead-form'));
	// 		formData.append('brandName', brandName);
	// 		formData.append('modelName', modelName);
	// 		formData.append('variantName', variantName);
	// 		formData.append('selectYear', selectYear);
	// 		formData.append('enterKms', enterKMs);


	// 		await axios.post(`${Url}generate-buy-page-lead`, formData, {
	// 			headers: {
	// 				token: localStorage.getItem('lr-user-token'),
	// 				'Content-Type': 'application/json'
	// 			}
	// 		}).then(async (res) => {
	// 			if (res && res.data.status === 1) {
	// 				setCallSuccessMessage(`${res.data.message}`);
	// 				document.getElementById('generate-loan-lead-form').reset();
	// 				setGetACall(true);
	// 				document.body.classList.add('hide-scroll-poup-new');
	// 				// brandName,selectYear,modelName,variantName,enterKMs
	// 				setTinyLoader(false);

	// 				const leadData = {
	// 					"First Name": user.first_name ? user.first_name : '',
	// 					"Last Name": user.last_name ? user.last_name : '',
	// 					"Email": user.email ? user.email : '',
	// 					"WhatsApp": user.mobile,
	// 					"Lead Type": "Loan",
	// 					"Lead_Category": "Individual",
	// 					"Registration_Number": carNumber
	// 				};

	// 				await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

	// 				}).catch((e) => {

	// 				});
	// 			}
	// 		}).catch((e) => {
	// 			setGetACall(true);
	// 			setTinyLoader(false);
	// 			document.body.classList.add('hide-scroll-poup-new');
	// 			if (e && e.message) {
	// 				setCallErrorMessage(`Something went wrong.`)
	// 			} else if (e && e.response.data.status === 0) {
	// 				setCallErrorMessage(`${e.response.data.message}`);
	// 			} else if (e && e.response.data.status === 2) {
	// 				setCallErrorMessage(`${e.response.data.message}`);
	// 			}
	// 		})
	// 	} else {
	// 		setLoansLogIn(true);
	// 	}
	// }


	// 2023-07-13 Night


	// fetchBrands !== undefined && fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
	// 	brand.isChecked = false
	// 	return brand;
	// });

	// fetchBodyTypes !== undefined && fetchBodyTypes.data !== undefined && fetchBodyTypes.data.body_type.map((bodyT) => {
	// 	bodyT.isChecked = false;
	// 	// if (urlBodyType !== undefined) {
	// 	// 	urlBodyType.map((check) => {
	// 	// 		if (check === bodyT.body_slug) {
	// 	// 			return bodyT.isChecked = true;
	// 	// 		}
	// 	// 	});
	// 	// }
	// 	return bodyT;
	// });

	// fetchFuelTypes !== undefined && fetchFuelTypes.data !== undefined && fetchFuelTypes.data.fuel_type.map((fuelT) => {
	// 	fuelT.isChecked = false;
	// 	// if (urlFuelType !== undefined) {
	// 	// 	urlFuelType.map((check) => {
	// 	// 		if (check === fuelT.fuel_slug) {
	// 	// 			return fuelT.isChecked = true;
	// 	// 		}
	// 	// 	});
	// 	// }
	// });


	const brandTab = () => {
		setOpenBrandTab(openBrandTab === false ? true : false);
		setOpenYearTab(false);
		setOpenModeltab(false);
		setOpenvariantTab(false);
		setOpenKMsTab(false);
	}

	const yearTab = () => {
		setOpenYearTab(openYearTab === false ? true : false);
		setOpenBrandTab(false);
		setOpenModeltab(false);
		setOpenvariantTab(false);
		setOpenKMsTab(false);
	}

	const modelTab = () => {
		setOpenModeltab(openModelTab === false ? true : false);
		setOpenBrandTab(false);
		setOpenYearTab(false);
		setOpenvariantTab(false);
		setOpenKMsTab(false);
	}

	const variantTab = () => {
		setOpenvariantTab(openVariantTab === false ? true : false);
		setOpenBrandTab(false);
		setOpenYearTab(false);
		setOpenModeltab(false);
		setOpenKMsTab(false);
	}

	const kmsTab = () => {
		setOpenKMsTab(openKMstab === false ? true : false);
		setOpenYearTab(false);
		setOpenBrandTab(false);
		setOpenModeltab(false);
		setOpenvariantTab(false);
	}

	const fetchModelsByBrand = async (brandSlug, brand_name) => {
		setBrandName(brand_name);
		setFetchVariants([]);
		setModelName('');
		setVariantName('');
		const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch((e) => {
			if (e.response && e.response.data.status === 2) {
				alert(e.response.data.message);
			} else if (e.response && e.response.data.status === 0) {
				alert(e.reponse.data.message);
			}
		})
		setBrandModelsList(fetchModels);
		yearTab();
	}

	const getAllYears = async () => {
		const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
		const yearData = await years.json();
		setFetchYear(yearData.year)
	}

	const ref = useRef()
	useEffect(() => {

		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (ref.current && !ref.current.contains(e.target)) {
				setOpenBrandTab(false);
				setOpenYearTab(false);
				setOpenModeltab(false);
				setOpenvariantTab(false);
				setOpenKMsTab(false);
			}
		}

		document.addEventListener("mousedown", checkIfClickedOutside)


		getAllYears();
	}, []);

	const selectYearOnChange = (selectedYear) => {
		setSelectYear(selectedYear);
		modelTab();
	}

	const fetchVariantsByBrandAndModel = async (modelSlug, model_name) => {
		setModelName(model_name);
		setVariantName('');
		const fetchvariantsByModel = await axios.get(`${Url}fetch-variantsby-model-buy-page/${modelSlug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch((e) => {
			if (e.response && e.response.data.status === 2) {
				// alert(e.response.data.message);
			} else if (e.response && e.response.data.status === 0) {
				// alert(e.reponse.data.message);
			}
		});

		if (fetchvariantsByModel.data.model_variants.length > 0) {

			setFetchVariants(fetchvariantsByModel)
			variantTab();
		}
	}

	const manageSelectVariantOnChange = (variantSlug, variant_name) => {
		setVariantName(variant_name)
		kmsTab();
	}

	const manageKmsHandlerOnChange = (e) => {
		// setOpenKMsTab(false);
		const regex = /^[0-9\b]+$/;
		if (e === "" || regex.test(e)) {
			setEnetrKMs(e);
			setKmsInput(e);

		}
	}


	const checkAllSelectedValues = (e) => {
		let getFormValues = document.getElementById('generate-loan-lead-form');
		let error = 0;

		Array.prototype.slice.call(getFormValues).forEach(function (form) {
			if (form.required && !form.value) {
				error++;
			}
		})

		if (!error) {
			// setDisabled(false);
			// var disableBtn = document.getElementById('submitLead');
			// disableBtn.classList.remove("disableBtn")
		}
		// if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
		//     setCheckLoginStatus(false);
		// } else {
		//     setCheckLoginStatus(true);
		// }
	}


	// const submitHandlerForGenerateBuyLead = async (e) => {
	// 	e.preventDefault();

	// 	if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
	// 		setLoansLogIn(false);


	// 		if (brandName === '' || modelName === '' || variantName === '' || selectYear === '') {
	// 			// || enterKMs === ''
	// 			setGetACall(true);
	// 			document.body.classList.add('hide-scroll-poup-new');
	// 			setCallErrorMessage('Please select all values.');
	// 			return false;
	// 		}
	// 		setTinyLoader(true);


	// 		const formData = new FormData(document.getElementById('generate-loan-lead-form'));
	// 		formData.append('brandName', brandName);
	// 		formData.append('modelName', modelName);
	// 		formData.append('variantName', variantName);
	// 		formData.append('selectYear', selectYear);
	// 		formData.append('enterKms', enterKMs);
	// 		// formData.append('lead_type', "Loan");

	// 		// for (const pair of formData.entries()) {
	// 		// 	console.log(`${pair[0]}, ${pair[1]}`);
	// 		// }
	// 		await axios.post(`${Url}generate-buy-page-lead`, formData, {
	// 			headers: {
	// 				token: localStorage.getItem('lr-user-token'),
	// 				'Content-Type': 'application/json'
	// 			}
	// 		}).then(async (res) => {
	// 			if (res && res.data.status === 1) {
	// 				setCallSuccessMessage(`${res.data.message}`);
	// 				document.getElementById('generate-loan-lead-form').reset();
	// 				setGetACall(true);
	// 				document.body.classList.add('hide-scroll-poup-new');
	// 				// brandName,selectYear,modelName,variantName,enterKMs
	// 				setTinyLoader(false);
	// 			}
	// 		}).catch((e) => {
	// 			setGetACall(true);
	// 			setTinyLoader(false);
	// 			document.body.classList.add('hide-scroll-poup-new');
	// 			if (e && e.message) {
	// 				setCallErrorMessage(`Something went wrong.`)
	// 			} else if (e && e.response.data.status === 0) {
	// 				setCallErrorMessage(`${e.response.data.message}`);
	// 			} else if (e && e.response.data.status === 2) {
	// 				setCallErrorMessage(`${e.response.data.message}`);
	// 			}
	// 		})
	// 	} else {
	// 		setLoansLogIn(true);
	// 	}
	// }


	return (
		<>
			<WebHead pageTitle="Loan" />
			{/* <PixelLoader /> */}
			{/* <WebsiteLayout> */}


			<div className="home-banner inner-banner mobile-view-hide loan-banner">

				<img src={`${Url}${cmsPage !== undefined && cmsPage.page_banner}`} alt="" />

				<div className="filter-section wd-filter service-fliter">

					<h2><span>Luxury Ride Loans</span>Drive Your Dream Car Without Going Far  </h2>
					<div className='car-search  car-search buypro ' ref={ref}>
						{/* two-colum */}
						{/* <form method="POST" id="loans-form" onSubmit={submitCarRegistrationNumber}>

							<div className='div-data'>
								<input placeholder='Enter Registration Number*' type="text" id="car-registration" defaultValue={upperValue} name="car_registration" />
							</div>
							<div className='div-data'>
								<button>
									<ButtonSpinner load={tinyLoader} btnName={`Submit`} />
								</button>
							</div>
							<small id="carRegistrationError" className="error"></small>
						</form> */}

						<div className="loanbanner-formmob">
							{/* <form method="POST" id="mobile-loans-form" onSubmit={mobileSubmitCarRegistrationNumber}>
								<div className='form-input'>
									<input placeholder='Enter Registration Number*' id="car-registration-mobile" name="car_registration_mobile" type="text" />
									<small id="mobileCarRegistrationError" className="error"></small>
								</div>
								<div className='form-input'>
									<button className="btn">
										<ButtonSpinner load={tinyLoader} btnName={`Submit`} />
									</button>
								</div>

							</form> */}
							<div className='car-search buypro'>
								<form onInput={checkAllSelectedValues} id="generate-loan-lead-form" method="POST">
									<input type="hidden" value={`Loan`} name="lead_type" />
									<div className={`div-data  ${brandName !== '' ? 'added' : ''}`} onClick={brandTab} >

										<div className='data'>
											<span>Brand</span>
											{brandName !== '' ? <i>{brandName}</i> : ''}

										</div>

										<div className="car-data" style={{ display: openBrandTab === false ? "none" : "block" }}>

											<div className='brands no-after-radio'>
												{
													fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
														return (
															<div className="form-group" key={brand.slug}>
																<input type="radio" id={`brand_${brand.name}`} onChange={(e) => fetchModelsByBrand(e.target.value, brand.name)} name="select_brand" value={brand.slug} required />
																<label htmlFor={`brand_${brand.name}`}>
																	<img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} />
																	<span>{brand.name}</span>
																</label>
															</div>
														)
													})
												}
											</div>

										</div>

									</div>
									<div className={`div-data  ${selectYear !== '' ? 'added' : ''} disabled`} onClick={yearTab}>
										<div className='data'>
											<span>Year</span>
											{selectYear !== '' ? <i>{selectYear}</i> : ''}
										</div>

										<div className="car-data small-box four-bxgrid " style={{ display: openYearTab === false ? "none" : "block" }}>

											<h5>Select Year</h5>

											<div className='brands'>

												{
													fetchYear !== undefined && fetchYear.map((year, i) => {
														return (
															<div className="form-group" key={i}>
																<input type="radio" name="select_year" id={`year_${year}`} onChange={(e) => selectYearOnChange(e.target.value)} value={year} required />
																<label htmlFor={`year_${year}`}>{year} </label>
															</div>
														)
													})
												}
											</div>

										</div>

									</div>
									<div className={`div-data  ${modelName !== '' ? 'added' : ''}`} onClick={modelTab}>
										<div className='data'>
											<span>Model</span>
											{modelName !== '' ? <i>{modelName}</i> : ''}
										</div>

										<div className="car-data small-box" style={{ display: openModelTab === false ? "none" : "block" }}>

											<h5>Select Model</h5>
											<div className="scroller-cars-data">	
											<div className='brands'>

												{
													brandModlesList.data !== undefined && brandModlesList.data.brand_models.map((model, i) => {
														return (
															<div className="form-group" key={model.slug}>
																<input type="radio" name="select_model" id={`model_${model.slug}_${i}`} onChange={(e) => fetchVariantsByBrandAndModel(e.target.value, model.name)} value={model.slug} required />
																<label htmlFor={`model_${model.slug}_${i}`}>{model.name} </label>
															</div>
														)
													})
												}
											</div>
											</div>	

										</div>

									</div>
									<div className={`div-data  ${variantName !== '' ? 'added' : ''} active`} onClick={variantTab}>
										<div className='data'>
											<span>Variant</span>
											{variantName !== '' ? <i>{variantName}</i> : ''}
										</div>

										<div className="car-data small-box" style={{ display: openVariantTab === false ? "none" : "block" }}>
											<h5>Select Variant</h5>
											<div className="scroller-cars-data">
											<div className='brands'>

												{
													fetchVariants.data !== undefined && fetchVariants.data.model_variants.map((variant) => {
														return (
															<div className="form-group" key={variant.slug}>
																<input type="radio" name="select_variant" id={`variant_${variant.slug}`} onChange={(e) => manageSelectVariantOnChange(e.target.value, variant.name)} value={variant.slug} required />
																<label htmlFor={`variant_${variant.slug}`}>{variant.name}</label>
															</div>
														)
													})
												}
											</div>
											</div>


										</div>

									</div>

									{/* <div className={`div-data  ${enterKMs !== '' ? 'added' : ''} right-style`}> */}
									{/* <div className='data' onClick={kmsTab}>
											<span>KMs Driven</span>
											{enterKMs !== '' ? <i>{numberFormatter(enterKMs)}</i> : ''}
										</div>

										<div className="car-data" style={{ display: openKMstab === false ? "none" : "block" }}>

											<h5>KMs Range</h5>

											<div className='filter-txtbx form-input'>
												<input type='text' placeholder='Enter KMs Range' name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value={kmsInput} minLength={4} maxLength={5} required />
											</div>
										</div> */}

									{/* 	<div className="car-data small-box" style={{ display: openKMstab === false ? "none" : "block" }}>
											<h5>Select Variant</h5>
											<div className='brands'>

												<div className="form-group">
													<input type="radio" id="kms_0_to_10" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="0 - 10,000" required />
													<label htmlFor="kms_0_to_10">{`0 - ${numberFormatter(10000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_10_to_20" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="10,000 - 20,000" required />
													<label htmlFor="kms_10_to_20">{`${numberFormatter(10000)} - ${numberFormatter(20000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_20_to_30" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="20,000 - 30,000" required />
													<label htmlFor="kms_20_to_30">{`${numberFormatter(20000)} - ${numberFormatter(30000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_30_to_40" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="30,000 - 40,000" required />
													<label htmlFor="kms_30_to_40">{`${numberFormatter(30000)} - ${numberFormatter(40000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_40_to_50" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="40,000 - 50,000" required />
													<label htmlFor="kms_40_to_50">{`${numberFormatter(40000)} - ${numberFormatter(50000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_50_to_60" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="50,000 - 60,000" required />
													<label htmlFor="kms_50_to_60">{`${numberFormatter(50000)} - ${numberFormatter(60000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_60_to_70" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="60,000 - 70,000" required />
													<label htmlFor="kms_60_to_70">{`${numberFormatter(60000)} - ${numberFormatter(70000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_70_to_80" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="70,000 - 80,000" required />
													<label htmlFor="kms_70_to_80">{`${numberFormatter(70000)} - ${numberFormatter(80000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_80_to_90" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="80,000 - 90,000" required />
													<label htmlFor="kms_80_to_90">{`${numberFormatter(80000)} - ${numberFormatter(90000)}`}</label>
												</div>

												<div className="form-group">
													<input type="radio" id="kms_90_to_100" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="90,000 - 1,00,000" required />
													<label htmlFor="kms_90_to_100">{`${numberFormatter(90000)} - ${numberFormatter(100000)}`}</label>
												</div>
											</div>


										</div> */}

									{/* </div> */}


									<div className='div-data'>
										<button onClick={submitCarRegistrationNumber} id="submitLead">
											<ButtonSpinner load={tinyLoader} btnName="Submit" />
										</button>


									</div>
								</form>
								<span className='error banner-error' id="errMsg"></span>

							</div>
						</div>

					</div>
					<ul className='circle-ul'>
						<li>Loan Upto 100% Of On-Road Price</li>
						<li>Attractive Interest Rates</li>
						<li>Flexible EMI Tenure</li>

					</ul>


				</div>

			</div>
			{/* 
			<div className="inner-mobile-banner desktop-hide-div mobile-show-div bottom-text">
				<img src={`${Url}${cmsPage.mobile_banner}`} alt="" />
				<div className="mobile-txt-banner">
					<div className="wrapper">
						<h2>Save Big On Service Packages Customised For You!</h2>
						<Link className="btn" href="service-packages/mobileFilter">Get Started</Link>
					</div>
				</div>
			</div> */}

			<div className="inner-mobile-banner desktop-hide-div mobile-show-div">
				<img src={`${Url}${cmsPage.mobile_banner}`} className="mob-class-bg" alt="" />
				<div className="mobile-txt-banner">
					<div className="wrapper">
						<h2>Looking for <span>Car Finance?</span></h2>

						<ul>
							<li>
								<div className="banner-icon">
									<img src="img/step-instant-approval.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>01</span>Loan Upto 100% Of On-Road Price
								</div>
							</li>

							<li>
								<div className="banner-icon">
									<img src="img/higher-loan-amount.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>02</span>Attractive Interest Rates

								</div>
							</li>

							<li>
								<div className="banner-icon">
									<img src="img/zero-foreclosure-charges.svg" alt="" />
								</div>
								<div className="banner-ico-text">
									<span>03</span>Flexible EMI Tenure

								</div>
							</li>

						</ul>



					</div>

					<Link className="btn" href="loan/mobileFilter">Get Started</Link>

				</div>
			</div>

			<section className='banks-outer-section'>
				<div className="wrapper">
					<div className='working-with-banks'>

						<h3>Our Partners</h3>

						<Swiper {...swiperSetting} autoplay={{ delay: 2500, disableOnInteraction: false, }}>

							{

								banks !== undefined && banks.data !== undefined && banks.data.banks !== undefined && banks.data.banks !== '' && banks.data.banks.map((bank) => {
									return (
										<SwiperSlide key={bank._id}>
											<img src={`${Url}${bank.image}`} />
										</SwiperSlide>
									)
								})
							}

						</Swiper>

					</div>
				</div>
			</section>


			<section className='made-simple loan-calculator'>
				<div className="wrapper">
					<div className='row'>
						<div class="col-md-5">
							<div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
						</div>
						<div className="col-md-7">
							<div className="featSpecCont">
								<h2>EMI Calculator</h2>
								<div className="emi-calculator">
									<div className="box-1">

										<form name="frmCalulator" id="frmCalulator" onSubmit={calcInteretByPerAndyear} method="POST" >
											<div className="row mb-3">
												<div className="col-md-7">
													<label>Loan Amount</label>
												</div>
												<div className="col-md-5">
													<input className='input' type="text" defaultValue={`INR ${numberFormatter($get80Val)}`} id="loan_amount" name="loan_amount" />
													<span className="error" id="error_loan_amount"></span> </div>
											</div>

											<IntersetCalc min={1}
												max={15}
												defaultValue={12}
												onChange={calcInterestPer} />
											{/* ({ min }) => console.log(`min = ${min}`) */}

											<InterestYearCalc
												min={1}
												max={5}
												defaultValue={5}
												onChange={calInterestPerYear}
											/>
											{/* ({ min }) => console.log(`min = ${min}`) */}

											<div className="label">
												<button className="btn calculate-btn reverse"> Calculate </button>
											</div>
										</form>
										<div className="row mb-4 gap">
											<div className="col-lg-4 col-md-5">
												<div className="chart-wrapper">




													<div className="pie animate" style={{ "--p": circlePerc !== '' && circlePerc !== undefined ? circlePerc : percent.toFixed(0) }} >
														<div className='bg-cricle'></div>
														<div className='emi-text'>EMI</div>
														<div className='emi-number'><span>INR</span>  {numberFormatter(monthelyPaybel ? monthelyPaybel : emi.toFixed(0))}</div>
													</div>

												</div>
											</div>
											{/* ? $calcInterestPerYear : totalPaybel */}
											{/* {console.log(numberFormatter(totalPaybel ? totalPaybel : $calcInterestPerYear))} */}
											<div className="col-lg-8 col-md-7">
												<ul className="pieDetls">
													<li><span>Principal</span> <span>₹ {numberFormatter(principleAmount)}</span></li>
													<li className='intrest-payble'>Interest Payable <span>₹ {numberFormatter(totalInterest ? totalInterest : totalInterestPayable.toFixed(0))}</span></li>
													{/* <li className='intrest-payble'>Interest Payable <span>{numberFormatter($calcInterestPerYear ? $calcInterestPerYear : totalPaybel)}</span></li>
                                        totalPaybel ? totalPaybel : $calcInterestPerYear
                                        */}
													<li>Total Amount Payable <span>₹ {numberFormatter(totalPaybel ? totalPaybel : totalLoanAmount.toFixed(0))}</span></li>
												</ul>
											</div>
										</div>
										<div className="st-sm"> The above calculation is just for reference only. The loan is at the sole discretion of the Financier.<br /> Terms & Condition apply. </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


			<section class="why-finance">

				<div dangerouslySetInnerHTML={{ __html: cmsPage.content_two }}></div>
			</section>

			<section className='made-simple four-steps'>
				<div dangerouslySetInnerHTML={{ __html: cmsPage.content_three }}></div>

			</section>

			<FrequentlyAskedQuestions heading="Frequently Asked Questions On Sell" pageType={cmsPage.slug} />

			<ReviewComponent type={cmsPage.slug} />
			{/* 
				{GetACall ?
					<div style={{ display: "block" }} className={`common-popup login get-acall`}>
						<div className='popup-inner'>
							<div className='popup-close' onClick={closePop}></div>

							<div className='thankyou'>
								<div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>
								<p>Our Luxury Ride executive will<br /> get in touch with you shortly.</p>
							</div>
						</div>

					</div>
					: ""

				} */}

			{loansLogIn === true ? <LoginForm Login={loansLogIn} closePop={closePop} logInHeading={`Login to check your insurance eligibility`} submitDataAfterSubmitLogIn={submitDataAfterSubmitLogIn} loginId={`book-loans-data`} /> : ''}

			{GetACall ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
			{/* </WebsiteLayout> */}

		</>
	)
}

export default Index


export async function getServerSideProps() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/loan`);
	const data = await response.json();

	return {
		props: {
			cmsPage: data.cms_page,
		}
	}
}
