import React, { useState, useRef, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import "swiper/css";
import "swiper/css/pagination";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import ReviewComponent from '@/components/customer-review/ReviewComponent';
import FrequentlyAskedQuestions from '@/components/frequently-asked-questions/FrequentlyAskedQuestions';
import useSWR from 'swr';
import axios from 'axios';
import { ButtonSpinner, numberFormatter } from '@/components/Helper';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/router';
import RequestCallBack from '@/components/request-callback';
import ServiceCenters from '@/components/service-center';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import Link from 'next/link';
import Loader from '@/components/common/Loader';
import PixelLoader from '@/components/PixelLoader';

const fetcher = (url) => axios.get(url).then(res => res.data);

function ExtendedWarrantyIndex({ cmsPage }) {

	const [scroll, setScroll] = useState(false);
	const [Popup, setPopUp] = useState(false);


	const HidePopup = () => {
		setPopUp(false)
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll-poup');
		}
	}

	const Url = process.env.NEXT_PUBLIC_URL;
	const router = useRouter();


	const [fetchYear, setFetchYear] = useState([]);
	const [yearTab, setYearTab] = useState(false);
	const [BrandTabs, setBrandTabs] = useState(false);
	const [openModelTab, setOpenModelTab] = useState(false);
	const [fetchVariants, setFetchVariants] = useState([]);
	const [openVariantTab, setOpenvariantTab] = useState(false);
	const [openFuelTab, setOpenFuelTab] = useState(false);
	const [openKMstab, setOpenKMsTab] = useState(false);



	const [selectYear, setSelectYear] = useState('');
	const [brandName, setBrandName] = useState('');
	const [modelName, setModelName] = useState('');
	const [variantName, setVariantName] = useState('');
	const [selectFuelName, setSelectFuelName] = useState('');
	const [enterKMs, setEnetrKMs] = useState('');
	const [kmsInput, setKmsInput] = useState('');


	const [brandModlesList, setBrandModelsList] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const [checkLoginStatus, setCheckLoginStatus] = useState(false);


	const [extendedWarrantySuccess, setExtendedWarrantySuccess] = useState(false);
	const [callSuccessMessage, setCallSuccessMessage] = useState('');
	const [callErrorMessage, setCallErrorMessage] = useState('');


	const [brandSlug, setBrandSlug] = useState('');
	const [modelSlug, setModelSlug] = useState('');
	const [variantSlug, setVariantSlug] = useState('');
	const [fuelSlug, setFuelSlug] = useState('');

	const [user, setUser] = useState('');
	const [tinyLoader, setTinyLoader] = useState(false);






	// get-brands-sorting
	const fetchBrands = useSWR(`${Url}get-brands-sorting`, fetcher);
	const fetchFuelType = useSWR(`${Url}get-all-fuels`, fetcher);
	const ref = useRef()
	useEffect(() => {

		const checkIfClickedOutside = e => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (ref.current && !ref.current.contains(e.target)) {
				setYearTab(false);
				setBrandTabs(false);
				setOpenModelTab(false);
				setOpenvariantTab(false);
				setOpenFuelTab(false);
				setOpenKMsTab(false);
			}
		}

		document.addEventListener("mousedown", checkIfClickedOutside)

		if (typeof window !== "undefined") {

			document.body.classList.add('mobile-menu-show');
		}

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", () => {
				setScroll(window.scrollY > 10)
			})
		}

		if (typeof window !== "undefined") {
			document.body.classList.remove('header-No-Scroll');
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


	}, []);

	const getAllYears = async () => {
		const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
		const yearData = await years.json();
		setFetchYear(yearData.year)
	}

	const selectYearOnChange = (selectedYear) => {
		setSelectYear(selectedYear);
		setBrandTabs(true);
		setYearTab(false);
		// modelTab();
	}

	const openYearTab = () => {
		getAllYears();
		setYearTab(!yearTab);
		setBrandTabs(false);
		setOpenModelTab(false);
		setOpenvariantTab(false);
		setOpenFuelTab(false);
		setOpenKMsTab(false);
	}

	const BrandTab = () => {
		setYearTab(false);
		setBrandTabs(!BrandTabs);
		setOpenModelTab(false);
		setOpenvariantTab(false);
		setOpenFuelTab(false);
		setOpenKMsTab(false);
		// setPriceTabs(false)
		// setBodyTabs(false)
		// setKmTabTabs(false)
		// setFuelTabs(false)
	}

	const modelTab = () => {
		setOpenModelTab(!openModelTab);
		setYearTab(false);
		setBrandTabs(false);
		setOpenvariantTab(false);
		setOpenFuelTab(false);
		setOpenKMsTab(false);
	}

	const variantTab = () => {
		setYearTab(false);
		setBrandTabs(false);
		setOpenModelTab(false);
		setOpenvariantTab(!openVariantTab);
		setOpenFuelTab(false);
		setOpenKMsTab(false);
	}

	const fuelTab = () => {
		setYearTab(false);
		setBrandTabs(false);
		setOpenvariantTab(false);
		setOpenFuelTab(!openFuelTab);
		setOpenKMsTab(false);
	}

	const kmsTab = () => {
		setYearTab(false);
		setBrandTabs(false);
		setOpenModelTab(false);
		setOpenvariantTab(false);
		setOpenFuelTab(false);
		setOpenKMsTab(!openKMstab);
	}

	const fetchModelsByBrand = async (brandSlug, brand_name) => {
		setBrandName(brand_name);
		setBrandSlug(brandSlug);
		setFetchVariants([]);
		setModelName('');
		setVariantName('');
		const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch((e) => {
			if (e.response && e.response.data.status === 2) {
				// alert(e.response.data.message);
			} else if (e.response && e.response.data.status === 0) {
				// alert(e.reponse.data.message);
			}
		})

		if (fetchModels.data.brand_models.length > 0) {
			setBrandModelsList(fetchModels);
			setBrandTabs(false);
			setOpenModelTab(true);
		}
		//  else {
		// 	// alert(`No models found.`);
		// }
	}

	const fetchVariantsByBrandAndModel = async (modelSlug, model_name) => {
		setModelName(model_name);
		setModelSlug(modelSlug);
		setVariantName('');
		const fetchvariantsByModel = await axios.get(`${Url}fetch-variantsby-model-buy-page/${modelSlug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch((e) => {
			if (e.response && e.response.data.status === 1) {
				// alert(e.response.data.message);
				// router.push('/');
			} else if (e.response && e.response.data.status === 0) {
				// alert(e.reponse.data.message);
			}
		});

		if (fetchvariantsByModel.data.model_variants.length > 0) {
			setFetchVariants(fetchvariantsByModel);
			variantTab();
		}
		//  else {
		// 	// alert('No variants found.');
		// }
	}

	const manageSelectVariantOnChange = (variantSlug, variant_name) => {
		setVariantName(variant_name);
		setVariantSlug(variantSlug)
		fuelTab();
	}



	const manageKmsHandlerOnChange = (e) => {
		const regex = /^[0-9\b]+$/;
		if (e === "" || regex.test(e)) {
			setEnetrKMs(e);
			setKmsInput(e);
		} else {
			setKmsInput('');
		}
	}

	const manageSelectFuelType = (e, fuelName) => {
		setSelectFuelName(fuelName);
		setFuelSlug(e);
		kmsTab();
	}

	const checkAllSelectedValues = (e) => {
		let getFormValues = document.getElementById('extended-warranty-form');
		let error = 0;

		Array.prototype.slice.call(getFormValues).forEach(function (form) {

			if (form.required && !form.value) {
				error++;
			}
		})

		if (!error) {
			setDisabled(false);
			// var disableBtn = document.getElementById('submitExtendedWarranty');
			// disableBtn.classList.remove("disableBtn")
		}
		// if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
		//     setCheckLoginStatus(false);
		// } else {
		//     setCheckLoginStatus(true);
		// }
	}

	const submitExtendedWarrantyDetails = async (e) => {
		e.preventDefault();
		if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
			setCheckLoginStatus(false);


			if (brandName === '' || modelName === '' || variantName === '' || selectYear === '' || selectFuelName === '' || enterKMs === '') {
				// setExtendedWarrantySuccess(true);
				// setCallErrorMessage('Please select all values.');
				// document.body.classList.add('hide-scroll-poup-new');

				// // setDisabled(true);
				// // var disableBtn = document.getElementById('submitExtendedWarranty');
				// // disableBtn.classList.add("disableBtn");
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
			const getExtendedWarrantyData = {
				brand: brandName,
				model: modelName,
				variant: variantName,
				year: selectYear,
				fuel: selectFuelName,
				kms: enterKMs,
				order_type: "extended-warranty",
				form_step: 1
			}

			await axios.post(`${Url}book-service-package`, getExtendedWarrantyData, {
				headers: {
					token: localStorage.getItem('lr-user-token')
				}
			}).then((res) => {
				if (res && res.data.status === 1) {
					router.push(`/extended-warranty/${res.data.orderId}`);
					setTinyLoader(false);
				}
			}).catch((e) => {
				setPopUp(true);
				setTinyLoader(false);
				if (e && e.message) {
					setCallErrorMessage(e.message);
				} else if (e && e.response.data === 0) {
					setCallErrorMessage(e.response.data.message);
				} else if (e && e.response.data.status === 2) {
					setCallErrorMessage(e.response.data.message);
				}
			});





			// const formData = new FormData(document.getElementById('extended-warranty-form'));

			// await axios.post(`${Url}book-extended-warranty`, formData, {
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 		token: localStorage.getItem('lr-user-token')
			// 	}
			// }).then((res) => {
			// 	if (res && res.data.status === 1) {
			// 		setExtendedWarrantySuccess(true);
			// 		setCallSuccessMessage(res.data.message);
			// 	}
			// }).catch((e) => {
			// 	if (e && e.message) {
			// 		setCallErrorMessage(e.message)
			// 	} else if (e && e.response.data.status === 0) {
			// 		setCallErrorMessage(e.response.data.message);
			// 	} else if (e && e.response.data.status === 2) {
			// 		setCallErrorMessage(e.response.data.message);
			// 	}
			// });
		} else {
			setCheckLoginStatus(true);
		}

	}

	const closePop = () => {
		setCheckLoginStatus(false);
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll');
			document.body.classList.remove('hide-scroll-poup-new');
		}
		if (extendedWarrantySuccess === true) {
			router.push('/extended-warranty', { shallow: true });
		}
		setExtendedWarrantySuccess(false);
		setCallSuccessMessage('');
		setCallErrorMessage('');
		// document.getElementById('extended-warranty-form').reset();

		// setOpenModelTab(false);
		// setYearTab(false);
		// setBrandTabs(false);
		// setOpenvariantTab(false);
		// setOpenFuelTab(false);
		// setOpenKMsTab(false);

		// setSelectYear('');
		// setBrandName('');
		// setModelName('')
		// setVariantName('')
		// setSelectFuelName('')
		// setEnetrKMs('')
		// setKmsInput('')
		// setBrandModelsList([]);
		// setDisabled(true);
		// setFetchVariants([]);

		setPopUp(false);
	}

	const submitDataAfterSubmitLogIn = async (e) => {

		setCheckLoginStatus(false);



		if (brandName === '' && modelName === '' && variantName === '' && selectYear === '' && selectFuelName === '' && enterKMs === '') {
			setPopUp(true);
			setCallErrorMessage('Please select all values.');
			return false;
		}


		const getExtendedWarrantyData = {
			brand: brandName,
			model: modelName,
			variant: variantName,
			year: selectYear,
			fuel: selectFuelName,
			kms: enterKMs,
			order_type: "extended-warranty",
			form_step: 1
		}

		await axios.post(`${Url}book-service-package`, getExtendedWarrantyData, {
			headers: {
				token: localStorage.getItem('lr-user-token')
			}
		}).then((res) => {
			if (res && res.data.status === 1) {
				router.push(`/extended-warranty/${res.data.orderId}`);
			}
		}).catch((e) => {
			setPopUp(true);
			if (e && e.message) {
				setCallErrorMessage(e.message);
			} else if (e && e.response.data === 0) {
				setCallErrorMessage(e.response.data.message);
			} else if (e && e.response.data.status === 2) {
				setCallErrorMessage(e.response.data.message);
			}
		});
	}


	if (!cmsPage) return <Loader loaderTitle={`Something went wrong.`} />

	return (
		<>
			<WebHead pageTitle={`${cmsPage.page_title}`} />
			{/* <PixelLoader /> */}
			{/* <WebsiteLayout> */}


			<div className="home-banner inner-banner mobile-view-hide">
				<img src={`${Url}${cmsPage.page_banner}`} alt="" />

				<div className="filter-section wd-filter">

					<h2>Future-Proof Your Drive With Our Extended Warranty!</h2>
					<div className='car-search' ref={ref}>
						<form onInput={checkAllSelectedValues} id="extended-warranty-form" method='POST'>
							<div className={`div-data  ${selectYear !== '' && selectYear !== undefined ? 'added' : ''}`} onClick={openYearTab}>
								<div className='data'>
									<span>Year</span>
									<i>{selectYear}</i>
								</div>

								<div className="car-data small-box four-bxgrid" style={{ display: yearTab === false ? "none" : "block" }}>
									<h5>Select Year</h5>
									<div className='brands'>
										{
											fetchYear !== undefined && fetchYear.map((year, i) => {
												return (
													<div className="form-group" key={i}>
														<input type="radio" name="select_year" required id={`year_${year}`} onChange={(e) => selectYearOnChange(e.target.value)} value={year} />
														<label htmlFor={`year_${year}`}>{year} </label>
													</div>
												)
											})
										}
									</div>
								</div>
							</div>

							<div className={`div-data ${brandName !== '' && brandName !== undefined ? 'added' : ''}`}>

								<div className='data' onClick={BrandTab}>
									<span>Brand</span>
									<i>{brandName}</i>
								</div>

								<div className="car-data" style={{ display: BrandTabs === false ? "none" : "block" }}>

									<div className='brands no-after-radio'>
										{
											fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
												return (
													<div className="form-group" key={brand.slug}>
														<input type="radio" id={`brand_${brand.name}`} required onChange={(e) => fetchModelsByBrand(e.target.value, brand.name)} name="select_brand" value={brand.slug} />
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

							<div className={`div-data  ${modelName !== '' ? 'added' : ''}`} onClick={modelTab}>
								<div className='data'>
									<span>Model</span>
									{modelName !== '' ? <i>{modelName}</i> : ''}
								</div>

								<div className="car-data small-box" style={{ display: openModelTab === false ? "none" : "block" }}>

									<h5>Select Model</h5>
									<div className='scroller-cars-data'>
										<div className='brands'>

											{
												brandModlesList.data !== undefined && brandModlesList.data.brand_models.map((model, i) => {
													return (
														<div className="form-group" key={model.slug}>
															<input type="radio" name="select_model" required id={`model_${model.slug}_${i}`} onChange={(e) => fetchVariantsByBrandAndModel(e.target.value, model.name)} value={model.slug} />
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
									<div className='scroller-cars-data'>
										<div className='brands'>

											{
												fetchVariants.data !== undefined && fetchVariants.data.model_variants.map((variant) => {
													return (
														<div className="form-group" key={variant.slug}>
															<input type="radio" required name="select_variant" id={`variant_${variant.slug}`} onChange={(e) => manageSelectVariantOnChange(e.target.value, variant.name)} value={variant.slug} />
															<label htmlFor={`variant_${variant.slug}`}>{variant.name}</label>
														</div>
													)
												})
											}
										</div>
									</div>


								</div>

							</div>

							<div className={`div-data ${selectFuelName !== '' ? 'added' : ''} active`} onClick={fuelTab}>
								<div className='data'>
									<span>Fuel Type</span>
									{selectFuelName !== '' ? <i>{selectFuelName}</i> : ''}
								</div>

								<div className="car-data search-box mob-right-box fule-type filter-fuel-type" style={{ display: openFuelTab === false ? "none" : "block" }}>

									<h5>Fuel Type</h5>

									<div className='custom-search filter-txtbx'>
										<div className='search-bttomgap no-after-radio'>
											{
												fetchFuelType !== undefined && fetchFuelType.data !== undefined && fetchFuelType.data.fuels !== undefined && fetchFuelType.data.fuels !== '' && fetchFuelType.data.fuels.map((fuel) => {
													return (
														<div className="form-group body-type" key={fuel._id}>
															<input type="radio" id={`fuel_${fuel.fuel_slug}`} value={fuel.fuel_slug} name="fuel_type" onChange={(e) => manageSelectFuelType(e.target.value, fuel.fuel_name)} required />
															<label htmlFor={`fuel_${fuel.fuel_slug}`}>
																<p>
																	<img src={`${Url}${fuel.fuel_image}`} />
																	<span>{fuel.fuel_name}</span>
																</p>
															</label>
														</div>
													)
												})
											}

										</div>
									</div>
								</div>

							</div>

							<div className={`div-data  ${enterKMs !== '' ? 'added' : ''} right-style`}>
								<div className='data' onClick={kmsTab}>
									<span>KMs Driven</span>
									{enterKMs !== '' ? <i>{numberFormatter(enterKMs)}</i> : ''}
								</div>

								<div className="car-data" style={{ display: openKMstab === false ? "none" : "block" }}>

									<h5>KMs Range</h5>

									<div className='filter-txtbx form-input'>
										<input type='text' placeholder='Enter KMs Range' name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} defaultValue={kmsInput !== '' && kmsInput !== undefined ? kmsInput : ''} minLength={4} maxLength={5} required />
									</div>
								</div>

							</div>

							<div className='div-data'>
								<button onClick={submitExtendedWarrantyDetails} id="submitExtendedWarranty">
									<ButtonSpinner load={tinyLoader} btnName="Submit" />
								</button>
							</div>

						</form>
						<span className='error banner-error' id="errMsg"></span>
						{checkLoginStatus !== false ? <LoginForm Login={checkLoginStatus} logInHeading={`Log in to submit values`} redirectRoute={``} closePop={closePop} submitDataAfterSubmitLogIn={submitDataAfterSubmitLogIn} loginId={`book-extended-warranty-user`} /> : ''}

					</div>
				</div>

			</div>



			<div className="inner-mobile-banner desktop-hide-div mobile-show-div bottom-text">
				<img src={`${Url}${cmsPage.mobile_banner}`} alt="" />
				<div className="mobile-txt-banner">
					<div className="wrapper">
						<h2>Get An Extended Warranty That’s Right For You</h2>
						<Link className="btn" href="extended-warranty/mobileFilter">Get Started</Link>
					</div>
				</div>
			</div>


			<section className='made-simple'>
				<div className="wrapper">
					<div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
				</div>
			</section>


			<ServiceCenters user={user} leadType="Extended Warranty" />

			<FrequentlyAskedQuestions heading="Frequently Asked Questions On Extended Warranty" pageType={cmsPage.slug} />


			<ReviewComponent type={cmsPage.slug} />


			<RequestCallBack queryType={`Request call back for Extended Warranty`} user={user} />



			{extendedWarrantySuccess ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
			{/* </WebsiteLayout> */}

		</>
	)
}

export default ExtendedWarrantyIndex



export async function getServerSideProps() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/extended-warranty`);
	const data = await response.json();

	return {
		props: {
			cmsPage: data.cms_page ? data.cms_page : undefined,
		}
	}
}
