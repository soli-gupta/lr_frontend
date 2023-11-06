import React, { useState, useEffect } from 'react';
import WebHead from '@/components/common/WebHead';
import useSWR from 'swr';
import DashboardLeftMenu from '@/components/dashboard/DashboardLeftMenu';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ButtonSpinner, ConfirmationModal, onlyAlphaValidation } from '@/components/Helper';
import { useRouter } from 'next/router';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Loader from '@/components/common/Loader';
import Head from 'next/head';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Link from 'next/link';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import WhatsappNo from "@/components/dashboard/WhatsappNo"



const fetcher = (url) => axios.get(url, {
	headers: {
		token: localStorage.getItem('lr-user-token')
	}
}).then(res => res.data);

function Index() {

	const router = useRouter()
	const Url = process.env.NEXT_PUBLIC_URL;
	const [Hamburger, setHamburger] = useState(false);
	const [tinyLoader, setTinyLoader] = useState(false);
	const [city, setCity] = useState('')
	const [stateName, setStateName] = useState('')
	const [cityName, setCityName] = useState('')
	const [confirmModel, setConfirmModel] = useState(false)
	const [addressForm, setAddressForm] = useState(false)
	const [address, setAddress] = useState([])
	const [editAddress, setEditAddress] = useState('')
	const [image, setImage] = useState('')
	const [addressId, setAddressId] = useState('')
	const [SelectBrand, setSelectBrand] = useState(false);

	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [popUp, setPopUp] = useState(false);

	const [updateBtn, setUpdateBtn] = useState(true)

	const HideHam = () => {
		setHamburger(false)
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll');
		}
	}

	const showBrand = () => {
		setSelectBrand(!SelectBrand)

	}

	const unlockEditBtn = () => {
		setUpdateBtn(false)
	}
	const removeClassRadio = () => {
		$('.select-address-type li').removeClass("radioChecked")
	}

	const getCityByState = (state_id) => {
		var state = document.getElementById("state");
		var text = state.options[state.selectedIndex].text;
		setStateName(text)
		axios.get(`${process.env.NEXT_PUBLIC_URL}cities?state_id=${state_id}`).then(function (res) {
			if (res.data.status == 1) {
				setCity(res.data.data)

			}
		}).catch(function (error) {
			console.log(error)

		});
	}

	const getCityName = (e) => {
		var id = document.getElementById('city')
		var cityname = id.options[id.selectedIndex].text;
		setCityName(cityname)
	}

	const saveUserAddress = async (e) => {
		let createError = 0;
		e.preventDefault();

		if (editAddress === '') {
			if (e.target.address_type.value.length <= 0) {
				document.getElementById('addressTypeNameError').innerHTML = 'Please select address type.';
				document.getElementById("addressTypeNameError").style.display = "block";
				setTimeout(() => {
					document.getElementById('addressTypeNameError').innerHTML = '';
					document.getElementById("addressTypeNameError").style.display = "none";
				}, 3000);
				createError++;
			}
		}

		if (e.target.state.value.length <= 0) {
			document.getElementById('stateNameError').innerHTML = 'Please select state.';
			document.getElementById("stateNameError").style.display = "block";
			setTimeout(() => {
				document.getElementById('stateNameError').innerHTML = '';
				document.getElementById("stateNameError").style.display = "none";
			}, 3000);
			createError++;
		}

		if (e.target.city.value.length <= 0) {
			document.getElementById('cityNameError').innerHTML = 'Please select city.';
			document.getElementById("cityNameError").style.display = "block";
			setTimeout(() => {
				document.getElementById('cityNameError').innerHTML = '';
				document.getElementById("cityNameError").style.display = "none";
			}, 3000);
			createError++;
		}

		if (e.target.full_address.value.length <= 0) {
			document.getElementById('addressError').innerHTML = 'Please enter your full address.';
			document.getElementById("addressError").style.display = "block";
			setTimeout(() => {
				document.getElementById('addressError').innerHTML = '';
				document.getElementById("addressError").style.display = "none";
			}, 3000);
			createError++;
		}

		if (createError > 0) {
			setTinyLoader(false);
			return false;
		}
		setTinyLoader(true);
		let formData = new FormData(document.getElementById('userProfileAddress'))
		formData.append('state', stateName)
		formData.append('city', cityName)
		formData.delete("id");
		let id = document.querySelector('#userProfileAddress [name="id"]').value;

		if (id === '' || id === null) {

			await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-new-user-address`, formData, {
				headers: {
					'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
				}
			})
				.then(function (res) {
					if (res.data.status == 1) {
						setTinyLoader(false);
						setAddress(res.data.allAddress)
						document.getElementById('userProfileAddress').reset();
						setAddressForm(false)
						setPopUp(true);
						setSuccessMessage(res.data.message);
						// router.reload()
					}
				})
				.catch(function (error) {
					setTinyLoader(false);
					console.log(error)
				});
		} else {
			await axios.post(`${process.env.NEXT_PUBLIC_URL}user/edit-user-address?id=${id}`, formData, {
				headers: {
					'Content-type': 'application/json',
					'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
				}
			})
				.then(function (res) {
					if (res.data.status == 1) {
						setTinyLoader(false);
						document.getElementById('userProfileAddress').reset();
						// setEditAddress(res.data.address)
						// setCity(res.data.address.cities)
						setAddress(res.data.allAddress)
						setAddressForm(false)
						setPopUp(true);
						setSuccessMessage(res.data.message);

					}
				})
				.catch(function (error) {
					setTinyLoader(false);
					console.log(error)
				});
		}

	}

	const getUserAddress = async () => {
		axios.get(`${process.env.NEXT_PUBLIC_URL}user/fetch-all-address`, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		}).then(function (res) {
			if (res.data.status == 1) {
				setAddress(res.data.address)
			}
		}).catch(function (error) {
			console.log(error)

		});
	}

	const editUserAddress = async (id) => {
		var radio = document.querySelector('input[type=radio][name=address_type]:checked');
		if (radio && radio.checked === true) {
			radio.checked = false;
		}
		await axios.get(`${process.env.NEXT_PUBLIC_URL}user/edit-user-address?id=${id}`, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setEditAddress(res.data.address)
					setCity(res.data.address.cities)
					setAddressForm(true)
				}
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	const deleteUserAddress = async (id) => {
		await axios.get(`${process.env.NEXT_PUBLIC_URL}user/delete-address?id=${id}`, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1) {
					setConfirmModel(false)
					setAddress(res.data.allAddress)
					setPopUp(true);
					setSuccessMessage(res.data.message);
				}
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	const openConfirmModel = (id) => {
		setAddressId(id)
		setConfirmModel(true)
	}

	const closePop = () => {
		setConfirmModel(false)
		setPopUp(false);
		if (typeof window !== "undefined") {
			document.body.classList.remove('hide-scroll');
		}
		// router.reload()
	}
	// console.log(editAddress)
	const openAddressForm = () => {
		var radio = document.querySelector('input[type=radio][name=address_type]:checked');
		if (radio && radio.checked === true) {
			radio.checked = false;
		}
		setEditAddress('')
		setAddressForm(!addressForm)

	}

	const passDigital = new RegExp(/^([^0-9, $]*)$/);
	const emailPattern = new RegExp()

	const editInput = () => {
		//alert('ok')
		document.getElementById("first_name").classList.remove('disableInput');
	}

	useEffect(() => {
		if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
			router.push("/");
		}
		getUserAddress()


		setTimeout(() => {
			if (typeof window !== "undefined") {
				$(document).on('click', '#upload-aphoto', function () {
					document.getElementById('selectedFile').click();
				});

				$('#selectedFile').change(function () {
					if (this.files[0] == undefined)
						return;
					$('#imageModalContainer').modal('show');
					let reader = new FileReader();
					reader.addEventListener("load", function () {
						window.src = reader.result;
						$('#selectedFile').val('');
					}, false);
					if (this.files[0]) {
						reader.readAsDataURL(this.files[0]);
						console.log(this.files[0].name)
					}
				});

				let croppi;
				$('#imageModalContainer').on('shown.bs.modal', function () {
					let width = document.getElementById('crop-image-container').offsetWidth - 20;
					$('#crop-image-container').height((width - 80) + 'px');
					croppi = $('#crop-image-container').croppie({
						viewport: {
							width: 100,
							height: 100
						},
						//rotatable: true,
						enableOrientation: true

					});
					$('.modal-body1').height(document.getElementById('crop-image-container').offsetHeight + 50 + 'px');
					croppi.croppie('bind', {
						url: window.src,

					}).then(function () {
						croppi.croppie('setZoom', 1);

					});

				});
				$('#imageModalContainer').on('hidden.bs.modal', function () {
					$('#crop-image-container').croppie('destroy');
				});

				$('#rotateImg').on("click", function () {
					$('#crop-image-container').croppie('rotate', 90);
				});

				$('#rotateImgLeft').on("click", function () {
					$('#crop-image-container').croppie('rotate', -90);
				});

				$(document).on('click', '.save-modal', function (ev) {

					$('#crop-image-container').croppie('result', {
						type: 'base64',
						format: 'jpeg',
						size: 'original'
					}).then(function (resp) {
						$('#confirm-img').attr('src', resp);
						setImage(resp)
						$('.modal').modal('hide');
					});
				});

			}
			$('#first_name').bind('keypress', onlyAlphaValidation);
			$('#last_name').bind('keypress', onlyAlphaValidation);
			$('.numberonly').keypress(function (e) {
				var charCode = (e.which) ? e.which : event.keyCode
				if (String.fromCharCode(charCode).match(/[^0-9]/g))
					return false;
			});
		}, 1000)


	}, []);


	function IsEmail(email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test(email)) {
			return false;
		} else {
			return true;
		}
	}


	const { register, handleSubmit, formState: { errors } } = useForm();

	const updateUserProfile = async (data) => {

		// if (IsEmail(data.email) == true) {
		// 	alert("good");
		// 	return false
		// }

		// const imagePath = document.getElementById('imageName').value
		// const lastWord = imagePath.split('/').pop()
		// return false
		let formData = new FormData(document.getElementById('userProfileForm'))
		if (image !== '') {
			formData.append('image', image)
		}
		await axios.post(`${process.env.NEXT_PUBLIC_URL}user-update-profile`, formData, {
			headers: {
				'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
			}
		})
			.then(function (res) {
				if (res.data.status == 1 && res.data.user) {
					setPopUp(true);
					setSuccessMessage(res.data.message);
					// NotificationManager.success(res.data.message);
					// router.reload()
				}
			})
			.catch(function (error) {
				setPopUp(true);
				setErrorMessage(error);
				console.log(error)
			});
	}
	// console.log(image)
	const state = useSWR(`${process.env.NEXT_PUBLIC_URL}states`, fetcher)
	const userAddress = useSWR(`${process.env.NEXT_PUBLIC_URL}user/fetch-all-address`, fetcher)


	const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}user-profile`, fetcher);


	if (error) return <Loader loaderTitle={`Please wait..`} />;
	if (!data) return <Loader loaderTitle={`Loading`} />;
	if (!userAddress.data) return <Loader loaderTitle={`Please wait..`} />;


	return (
		<div>
			{/* <WebHead pageTitle="Dashboard" /> */}
			<Head>
				<title>Dashboard | Luxury Ride</title>
				{/* <meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, user-scalable=no" /> */}
				<link rel="icon" href="/lr-favicon.ico" />
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
					integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous" />
				<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
					integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>

				<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
				<script src='https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js' defer />

				<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' defer />



				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.css" />
			</Head>

			{/* <WebsiteLayout> */}

			<div className={`${Hamburger ? "open" : ""} hamburger-menu`}>

				<div className='ham-close' onClick={HideHam}></div>

				<div className='ham-menu'>

					<ul>
						<li><a href='#'>ABOUT US</a></li>
						<li><a href='#'>LUXURY RIDE ASSURANCE</a></li>
						<li><a href='#'>CAREERS</a></li>
						<li><a href='#'>LUXURY RIDE BUY BACK</a></li>
						<li><a href='#'>BLOG</a></li>
						<li><a href='#'>CONTACT US</a></li>
						<li><a href='#'>NEWS & MEDIA</a></li>
					</ul>

				</div>
				<div className='locations'>

					<h3>Our Locations</h3>

					<div className='head-office'>
						<h6>Head Office <span>Delhi</span></h6>
						<address>261, Ground Floor, Lane Number-5, Westend Marg,<br /> Saidulajab, Saket, New Delhi, Delhi 110030</address>
						<a href="#" className="btn center arrow-style blueBdr"><span>Get Directions</span></a>
					</div>
					<div className='all-adress'>
						<div className='adress'>
							<h6>Gurugram <span>Experience Centre</span></h6>
							<address>
								Plot No 41, Saraswati Kunj,<br /> Sector 53, Gurugram,<br /> (Haryana) – 122011
							</address>

							<a href='#'>Get Directions</a>

						</div>

						<div className='adress'>
							<h6>Delhi <span>Experience Centre</span></h6>
							<address>

								Khasra No. 98/2, GT Karnal<br /> Rd, Near Satguru Darshan<br /> Dham, Alipur, (Delhi) – 110036

							</address>

							<a href='#'>Get Directions</a>


						</div>

						<div className='adress'>
							<h6>Karnal <span>Experience Centre & Service Centre</span></h6>
							<address>

								118, Milestone, NH-1,<br /> Karnal, (Haryana) – <br /> 132001

							</address>

							<a href='#'>Get Directions</a>


						</div>

						<div className='adress'>
							<h6>Dehradun <span>Experience Centre & Service Centre</span></h6>
							<address>

								1Saharanpur Rd,<br /> Mohabbewala, Dehradun,<br /> (Uttarakhand) – 248002

							</address>

							<a href='#'>Get Directions</a>


						</div>

					</div>

				</div>

				<div className='socials'>

					<h2>Download App</h2>

					<div className="app-icons">

						<a href="#"><svg width="130" height="31" viewBox="0 0 649 171" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_71_390)">
								<path d="M102.815 79.4406C102.643 60.331 118.466 51.0341 119.19 50.6013C110.229 37.5394 96.339 35.7547 91.458 35.6124C79.7923 34.3851 68.4765 42.591 62.5339 42.591C56.4728 42.591 47.3217 35.731 37.4589 35.9326C24.7672 36.1283 12.8939 43.4745 6.38201 54.8821C-7.05697 78.1421 2.96592 112.324 15.8415 131.125C22.2822 140.339 29.8083 150.614 39.6592 150.252C49.2966 149.861 52.8965 144.116 64.5267 144.116C76.05 144.116 79.4305 150.252 89.4771 150.021C99.8203 149.861 106.332 140.772 112.548 131.481C119.991 120.933 122.98 110.533 123.098 109.999C122.861 109.916 103.017 102.339 102.815 79.4406ZM83.837 23.2442C89.0205 16.7637 92.567 7.94707 91.5825 -1C84.0802 -0.667968 74.6978 4.188 69.2949 10.5262C64.5148 16.1115 60.2447 25.2661 61.3478 33.8752C69.7753 34.5037 78.4282 29.624 83.837 23.2442Z" fill="white" />
								<path d="M242.406 148.93H228.938L221.56 125.753H195.916L188.888 148.93H175.775L201.188 70.0251H216.881L242.406 148.93ZM219.336 116.029L212.664 95.4255C211.958 93.3207 210.63 88.3639 208.684 80.5612H208.447C207.664 83.9171 206.413 88.8738 204.699 95.4255L198.14 116.029H219.336ZM307.632 119.782C307.632 129.459 305.005 137.107 299.744 142.722C295.035 147.721 289.182 150.217 282.201 150.217C274.664 150.217 269.243 147.531 265.951 142.147V172H253.307V110.735C253.307 104.657 253.147 98.4257 252.839 92.0341H263.959L264.664 101.052H264.902C269.118 94.2575 275.518 90.8601 284.105 90.8601C290.819 90.8601 296.423 93.5104 300.907 98.817C305.385 104.135 307.632 111.12 307.632 119.782ZM294.751 120.245C294.751 114.707 293.505 110.142 291.003 106.543C288.269 102.801 284.597 100.928 279.995 100.928C276.876 100.928 274.041 101.971 271.508 104.029C268.97 106.104 267.309 108.814 266.533 112.169C266.186 113.424 265.989 114.716 265.945 116.017V125.51C265.945 129.643 267.215 133.135 269.753 135.993C272.291 138.839 275.589 140.268 279.645 140.268C284.408 140.268 288.114 138.424 290.765 134.765C293.422 131.095 294.751 126.257 294.751 120.245ZM373.09 119.782C373.09 129.459 370.462 137.107 365.202 142.722C360.487 147.721 354.639 150.217 347.653 150.217C340.115 150.217 334.694 147.531 331.403 142.147V172H318.758V110.735C318.758 104.657 318.598 98.4257 318.29 92.0341H329.41L330.116 101.052H330.353C334.564 94.2575 340.963 90.8601 349.557 90.8601C356.264 90.8601 361.869 93.5104 366.364 98.817C370.836 104.135 373.09 111.12 373.09 119.782ZM360.202 120.245C360.202 114.707 358.951 110.142 356.448 106.543C353.714 102.801 350.055 100.928 345.452 100.928C342.333 100.928 339.498 101.971 336.954 104.029C334.415 106.104 332.761 108.814 331.984 112.169C331.598 113.735 331.391 115.009 331.391 116.017V125.51C331.391 129.643 332.666 133.135 335.192 135.993C337.731 138.833 341.028 140.268 345.097 140.268C349.865 140.268 353.572 138.424 356.217 134.765C358.874 131.095 360.202 126.257 360.202 120.245ZM446.274 126.797C446.274 133.514 443.926 138.975 439.258 143.191C434.122 147.792 426.952 150.098 417.76 150.098C409.267 150.098 402.458 148.462 397.322 145.183L400.246 134.647C405.791 137.932 411.882 139.568 418.513 139.568C423.281 139.568 426.988 138.489 429.633 136.348C432.284 134.202 433.624 131.332 433.624 127.751C433.624 124.544 432.515 121.858 430.339 119.67C428.15 117.488 424.532 115.454 419.45 113.586C405.631 108.434 398.716 100.898 398.716 90.9846C398.716 84.51 401.16 79.2094 406.035 75.0649C410.91 70.9263 417.374 68.8571 425.416 68.8571C432.598 68.8571 438.582 70.1081 443.333 72.6043L440.16 82.9091C435.688 80.49 430.641 79.2805 424.995 79.2805C420.535 79.2805 417.036 80.3774 414.533 82.5593C412.428 84.51 411.36 86.8876 411.36 89.7099C411.36 92.8227 412.576 95.4078 414.996 97.4355C417.095 99.3032 420.927 101.337 426.466 103.519C433.262 106.258 438.256 109.448 441.453 113.112C444.673 116.776 446.274 121.348 446.274 126.797ZM488.187 101.521H474.25V129.145C474.25 136.171 476.705 139.675 481.627 139.675C483.887 139.675 485.761 139.485 487.244 139.088L487.594 148.687C485.103 149.618 481.823 150.086 477.761 150.086C472.767 150.086 468.865 148.562 466.047 145.515C463.242 142.467 461.831 137.362 461.831 130.176V101.497H453.528V92.0104H461.831V81.5929L474.25 77.8456V92.0104H488.187V101.521ZM550.946 120.014C550.946 128.759 548.443 135.939 543.449 141.554C538.224 147.335 531.273 150.217 522.609 150.217C514.246 150.217 507.598 147.448 502.64 141.916C497.682 136.372 495.203 129.388 495.203 120.962C495.203 112.146 497.765 104.924 502.871 99.3091C507.989 93.6883 514.881 90.8779 523.546 90.8779C531.896 90.8779 538.604 93.6527 543.68 99.1905C548.532 104.562 550.946 111.499 550.946 120.014ZM537.839 120.304C537.839 115.092 536.712 110.622 534.452 106.881C531.801 102.363 528.006 100.104 523.089 100.104C518.024 100.104 514.14 102.363 511.494 106.881C509.229 110.622 508.102 115.17 508.102 120.541C508.102 125.759 509.229 130.241 511.494 133.971C514.229 138.489 518.042 140.748 522.982 140.748C527.816 140.748 531.605 138.441 534.345 133.858C536.67 130.028 537.839 125.528 537.839 120.304ZM592.063 103.151C590.748 102.914 589.414 102.797 588.078 102.801C583.63 102.801 580.19 104.473 577.77 107.841C575.671 110.806 574.615 114.553 574.615 119.077V148.93H561.971V109.952C561.982 103.979 561.859 98.0072 561.603 92.04H572.616L573.079 102.926H573.429C574.769 99.1846 576.869 96.1667 579.751 93.9077C582.389 91.9337 585.595 90.8648 588.89 90.8601C590.059 90.8601 591.114 90.9431 592.051 91.0913L592.063 103.151ZM648.612 117.79C648.644 119.712 648.49 121.632 648.15 123.524H610.217C610.359 129.145 612.198 133.449 615.721 136.414C618.917 139.058 623.051 140.386 628.128 140.386C633.744 140.386 638.868 139.497 643.476 137.7L645.457 146.469C640.072 148.817 633.714 149.985 626.378 149.985C617.553 149.985 610.626 147.388 605.585 142.206C600.556 137.018 598.035 130.046 598.035 121.312C598.035 112.739 600.378 105.594 605.069 99.8961C609.98 93.8128 616.616 90.7712 624.967 90.7712C633.169 90.7712 639.378 93.8128 643.595 99.8961C646.934 104.716 648.612 110.693 648.612 117.79ZM636.555 114.511C636.644 110.758 635.814 107.527 634.1 104.794C631.912 101.272 628.543 99.5166 624.03 99.5166C619.896 99.5166 616.527 101.23 613.965 104.669C611.86 107.402 610.608 110.687 610.223 114.5L636.555 114.511Z" fill="white" />
								<path d="M192.268 42.1285C188.751 42.1285 185.709 41.9566 183.177 41.6661V3.518C186.718 2.97101 190.298 2.7014 193.881 2.71164C208.382 2.71164 215.06 9.84439 215.06 21.4714C215.06 34.8831 207.172 42.1285 192.268 42.1285ZM194.391 7.60318C192.434 7.60318 190.768 7.72176 189.386 8.00636V37.0058C190.133 37.1243 191.568 37.1777 193.585 37.1777C203.086 37.1777 208.495 31.7703 208.495 21.6434C208.495 12.6133 203.602 7.60318 194.391 7.60318ZM235.871 42.4191C227.698 42.4191 222.402 36.318 222.402 28.035C222.402 19.4022 227.811 13.2477 236.333 13.2477C244.387 13.2477 249.802 19.0583 249.802 27.5784C249.802 36.318 244.221 42.4191 235.871 42.4191ZM236.108 17.7894C231.619 17.7894 228.742 21.9873 228.742 27.8571C228.742 33.6143 231.678 37.8121 236.049 37.8121C240.42 37.8121 243.355 33.3238 243.355 27.7385C243.355 22.0466 240.479 17.7894 236.108 17.7894ZM296.406 13.8228L287.658 41.7846H281.958L278.335 29.6418C277.434 26.6715 276.684 23.6577 276.087 20.6117H275.968C275.512 23.6593 274.646 26.7128 273.727 29.6418L269.872 41.7846H264.113L255.881 13.8228H262.268L265.435 27.116C266.183 30.2821 266.811 33.2704 267.333 36.0927H267.452C267.909 33.7388 268.656 30.798 269.753 27.1753L273.727 13.8288H278.791L282.593 26.8907C283.512 30.0568 284.259 33.1637 284.841 36.0986H285.007C285.41 33.223 286.045 30.1695 286.905 26.8907L290.303 13.8288L296.406 13.8228ZM328.609 41.7846H322.394V25.7285C322.394 20.7836 320.496 18.3053 316.754 18.3053C313.071 18.3053 310.538 21.4714 310.538 25.1534V41.7846H304.323V21.8153C304.323 19.3429 304.264 16.6925 304.092 13.8169H309.56L309.85 18.1333H310.022C311.695 15.145 315.087 13.2477 318.889 13.2477C324.76 13.2477 328.615 17.7361 328.615 25.0408L328.609 41.7846ZM345.749 41.7846H339.528V0.992188H345.749V41.7846ZM368.41 42.4191C360.244 42.4191 354.942 36.318 354.942 28.035C354.942 19.4022 360.35 13.2477 368.867 13.2477C376.927 13.2477 382.336 19.0583 382.336 27.5784C382.342 36.318 376.755 42.4191 368.41 42.4191ZM368.642 17.7894C364.152 17.7894 361.276 21.9873 361.276 27.8571C361.276 33.6143 364.217 37.8121 368.576 37.8121C372.953 37.8121 375.883 33.3238 375.883 27.7385C375.889 22.0466 373.018 17.7894 368.642 17.7894ZM406.841 41.7846L406.391 38.5651H406.224C404.327 41.1562 401.557 42.4191 398.046 42.4191C393.035 42.4191 389.476 38.909 389.476 34.1894C389.476 27.2879 395.46 23.7186 405.821 23.7186V23.2027C405.821 19.5207 403.87 17.6768 400.015 17.6768C397.257 17.6768 394.838 18.3705 392.708 19.752L391.445 15.6668C394.031 14.0541 397.257 13.2477 401.047 13.2477C408.354 13.2477 412.042 17.1017 412.042 24.8155V35.1144C412.042 37.9366 412.167 40.1245 412.446 41.7906L406.841 41.7846ZM405.987 27.8571C399.084 27.8571 395.62 29.5291 395.62 33.4957C395.62 36.4306 397.406 37.8655 399.885 37.8655C403.046 37.8655 405.987 35.4523 405.987 32.1735V27.8571ZM442.224 41.7846L441.933 37.2963H441.761C439.976 40.6878 436.975 42.4191 432.782 42.4191C426.039 42.4191 421.045 36.4899 421.045 28.1476C421.045 19.4022 426.223 13.2418 433.292 13.2418C437.034 13.2418 439.686 14.5047 441.18 17.0424H441.305V0.992188H447.526V34.2487C447.526 36.9524 447.591 39.4841 447.757 41.7846H442.224ZM441.305 25.3313C441.305 21.4181 438.713 18.08 434.757 18.08C430.149 18.08 427.332 22.1651 427.332 27.9164C427.332 33.555 430.256 37.4149 434.633 37.4149C438.541 37.4149 441.305 34.0175 441.305 29.9916V25.3313ZM486.971 42.4191C478.804 42.4191 473.508 36.318 473.508 28.035C473.508 19.4022 478.917 13.2477 487.434 13.2477C495.493 13.2477 500.902 19.0583 500.902 27.5784C500.908 36.318 495.327 42.4191 486.971 42.4191ZM487.202 17.7894C482.719 17.7894 479.842 21.9873 479.842 27.8571C479.842 33.6143 482.778 37.8121 487.143 37.8121C491.52 37.8121 494.45 33.3238 494.45 27.7385C494.462 22.0466 491.585 17.7894 487.202 17.7894ZM534.328 41.7846H528.106V25.7285C528.106 20.7836 526.209 18.3053 522.466 18.3053C518.783 18.3053 516.257 21.4714 516.257 25.1534V41.7846H510.036V21.8153C510.036 19.3429 509.976 16.6925 509.804 13.8169H515.272L515.563 18.1333H515.735C517.401 15.145 520.8 13.2418 524.595 13.2418C530.467 13.2418 534.328 17.7301 534.328 25.0348V41.7846ZM576.145 18.4831H569.307V32.0609C569.307 35.5176 570.505 37.2429 572.925 37.2429C574.022 37.2429 574.941 37.1243 575.683 36.9524L575.855 41.672C574.651 42.1345 573.037 42.3657 571.033 42.3657C566.134 42.3657 563.204 39.662 563.204 32.5826V18.4831H559.124V13.8228H563.204V8.70007L569.307 6.8561V13.8169H576.145V18.4831ZM609.049 41.7846H602.839V25.8471C602.839 20.8429 600.947 18.3112 597.199 18.3112C593.979 18.3112 590.978 20.499 590.978 24.9281V41.7846H584.768V0.992188H590.978V17.7894H591.102C593.06 14.7419 595.894 13.2418 599.512 13.2418C605.431 13.2418 609.049 17.8428 609.049 25.1534V41.7846ZM642.759 29.2979H624.107C624.225 34.5926 627.73 37.5809 632.92 37.5809C635.678 37.5809 638.216 37.1184 640.458 36.2587L641.424 40.5751C638.779 41.7254 635.666 42.3005 632.042 42.3005C623.294 42.3005 618.117 36.7745 618.117 28.2069C618.117 19.6334 623.419 13.1884 631.342 13.1884C638.489 13.1884 642.972 18.4831 642.972 26.4815C643.013 27.4255 642.941 28.3708 642.759 29.2979ZM637.059 24.8688C637.059 20.5524 634.883 17.5048 630.909 17.5048C627.339 17.5048 624.516 20.6117 624.113 24.8688H637.059Z" fill="white" />
							</g>
							<defs>
								<clipPath id="clip0_71_390">
									<rect width="649" height="171" fill="white" />
								</clipPath>
							</defs>
						</svg>
						</a>
						<a href="#"><svg width="130" height="31" viewBox="0 0 661 161" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M544.237 130.515H554.46V65.4407H544.237V130.515ZM636.317 88.8838L624.599 117.095H624.248L612.086 88.8838H601.074L619.318 128.313L608.914 150.248H619.575L647.686 88.8857L636.317 88.8838ZM578.338 123.124C574.996 123.124 570.323 121.531 570.323 117.597C570.323 112.575 576.142 110.649 581.16 110.649C585.653 110.649 587.773 111.569 590.501 112.825C589.707 118.854 584.244 123.124 578.338 123.124ZM579.577 87.4604C572.175 87.4604 564.51 90.559 561.338 97.4236L570.411 101.022C572.35 97.4236 575.961 96.2526 579.752 96.2526C585.039 96.2526 590.413 99.2637 590.501 104.623V105.292C588.649 104.288 584.683 102.781 579.84 102.781C570.055 102.781 560.1 107.886 560.1 117.43C560.1 126.137 568.121 131.747 577.106 131.747C583.976 131.747 587.773 128.816 590.145 125.383H590.501V130.409H600.373V105.459C600.373 93.9057 591.29 87.4604 579.577 87.4604ZM516.396 96.8052H501.855V74.5009H516.396C524.038 74.5009 528.377 80.5114 528.377 85.6529C528.377 90.6956 524.038 96.8052 516.396 96.8052ZM516.133 65.4422H491.637V130.517H501.856V105.864H516.133C527.463 105.864 538.601 98.0724 538.601 85.6552C538.601 73.2403 527.463 65.4422 516.133 65.4422ZM382.559 123.134C375.496 123.134 369.586 117.514 369.586 109.803C369.586 102.001 375.496 96.3016 382.559 96.3016C389.532 96.3016 395.004 102.001 395.004 109.803C395.004 117.514 389.532 123.134 382.559 123.134ZM394.297 92.5265H393.944C391.65 89.9276 387.235 87.5795 381.677 87.5795C370.024 87.5795 359.345 97.3084 359.345 109.803C359.345 122.212 370.024 131.855 381.677 131.855C387.235 131.855 391.65 129.506 393.944 126.825H394.297V130.009C394.297 138.482 389.532 143.007 381.853 143.007C375.588 143.007 371.705 138.731 370.114 135.126L361.201 138.648C363.759 144.515 370.553 151.73 381.853 151.73C393.859 151.73 404.009 145.02 404.009 128.666V88.9206H394.298L394.297 92.5265ZM411.072 130.513H421.306V65.4387H411.072V130.513ZM436.4 109.046C436.136 100.492 443.376 96.133 448.581 96.133C452.643 96.133 456.082 98.0625 457.234 100.828L436.4 109.046ZM468.174 101.666C466.233 96.7209 460.32 87.5795 448.228 87.5795C436.222 87.5795 426.249 96.5519 426.249 109.717C426.249 122.128 436.136 131.855 449.373 131.855C460.052 131.855 466.233 125.652 468.794 122.045L460.85 117.013C458.201 120.703 454.584 123.135 449.373 123.135C444.168 123.135 440.46 120.87 438.08 116.426L469.233 104.183L468.174 101.666ZM219.949 94.3723V103.764H243.603C242.896 109.047 241.043 112.903 238.218 115.587C234.775 118.857 229.391 122.464 219.948 122.464C205.385 122.464 194 111.311 194 97.4751C194 83.6388 205.385 72.4849 219.948 72.4849C227.804 72.4849 233.54 75.4206 237.777 79.1942L244.752 72.5681C238.836 67.2021 230.982 63.0932 219.948 63.0932C199.998 63.0932 183.229 78.5231 183.229 97.4751C183.229 116.425 199.998 131.855 219.948 131.855C230.715 131.855 238.837 128.501 245.19 122.212C251.722 116.006 253.753 107.286 253.753 100.241C253.753 98.0629 253.575 96.0502 253.222 94.3723H219.949ZM280.648 123.134C273.585 123.134 267.495 117.6 267.495 109.717C267.495 101.751 273.585 96.302 280.648 96.302C287.708 96.302 293.798 101.751 293.798 109.717C293.798 117.6 287.708 123.134 280.648 123.134ZM280.648 87.5795C267.758 87.5795 257.256 96.8872 257.256 109.717C257.256 122.464 267.758 131.855 280.648 131.855C293.533 131.855 304.037 122.464 304.037 109.717C304.037 96.8872 293.533 87.5795 280.648 87.5795ZM331.67 123.134C324.613 123.134 318.52 117.6 318.52 109.717C318.52 101.751 324.613 96.302 331.67 96.302C338.733 96.302 344.821 101.751 344.821 109.717C344.821 117.6 338.733 123.134 331.67 123.134ZM331.67 87.5795C318.785 87.5795 308.284 96.8872 308.284 109.717C308.284 122.464 318.785 131.855 331.67 131.855C344.56 131.855 355.062 122.464 355.062 109.717C355.062 96.8872 344.56 87.5795 331.67 87.5795Z" fill="white" />
							<path d="M71.8669 75.4659L13.5427 134.283C13.5449 134.295 13.5493 134.305 13.5514 134.317C15.3401 140.704 21.4802 145.407 28.7672 145.407C31.6802 145.407 34.4152 144.659 36.7606 143.345L36.9469 143.241L102.602 107.247L71.8669 75.4659Z" fill="#EB3131" />
							<path d="M130.878 65.4524L130.822 65.4161L102.476 49.8043L70.542 76.8023L102.587 107.244L130.783 91.7875C135.726 89.2521 139.082 84.3009 139.082 78.5914C139.082 72.9229 135.772 67.9962 130.878 65.4524Z" fill="#F6B60B" />
							<path d="M13.5349 22.6497C13.1843 23.8782 13 25.1649 13 26.501V130.435C13 131.769 13.1821 133.06 13.5371 134.284L73.8747 76.9705L13.5349 22.6497Z" fill="#5778C5" />
							<path d="M72.2987 78.4681L102.489 49.7934L36.9085 13.6687C34.5247 12.3123 31.7426 11.5294 28.7655 11.5294C21.4785 11.5294 15.3301 16.2407 13.541 22.6349C13.5388 22.6412 13.5388 22.6455 13.5388 22.6509L72.2987 78.4681Z" fill="#3BAD49" />
							<path d="M218.031 25.2732H202.048V29.0307H214.025C213.699 32.0971 212.415 34.5044 210.249 36.253C208.084 38.0019 205.318 38.88 202.048 38.88C198.462 38.88 195.423 37.6927 192.932 35.3343C190.492 32.927 189.251 29.95 189.251 26.3635C189.251 22.7772 190.492 19.8002 192.932 17.3931C195.423 15.0346 198.462 13.8552 202.048 13.8552C203.889 13.8552 205.644 14.156 207.253 14.815C208.863 15.4734 210.155 16.3926 211.165 17.5721L214.204 14.6849C212.826 13.1962 211.08 12.0578 208.913 11.2282C206.748 10.3985 204.488 10.0003 202.048 10.0003C197.263 10.0003 193.206 11.5779 189.893 14.7256C186.58 17.8809 184.919 21.7687 184.919 26.3636C184.919 30.9585 186.58 34.8546 189.893 38.0024C193.205 41.1494 197.263 42.7277 202.048 42.7277C207.073 42.7277 211.079 41.1984 214.161 38.0914C216.875 35.5055 218.261 32.0083 218.261 27.6328C218.261 26.8926 218.168 26.1029 218.031 25.2732ZM224.222 10.699V42.0277H243.474V38.1806H228.459V28.2424H242.002V24.4848H228.459V14.5544H243.474V10.6989L224.222 10.699ZM270.47 14.5545V10.699H247.81V14.5545H257.022V42.0276H261.259V14.5545H270.47ZM290.984 10.699H286.747V42.0277H290.984V10.699ZM318.953 14.5545V10.699H296.294V14.5545H305.504V42.0276H309.742V14.5545H318.953ZM361.712 14.7741C358.442 11.5777 354.436 10 349.65 10C344.857 10 340.851 11.5777 337.58 14.7253C334.31 17.8323 332.701 21.7278 332.701 26.3633C332.701 30.9988 334.31 34.895 337.58 38.0021C340.851 41.1491 344.857 42.7274 349.65 42.7274C354.393 42.7274 358.442 41.1492 361.712 38.0021C364.982 34.8952 366.591 30.9992 366.591 26.3633C366.591 21.7684 364.982 17.8805 361.712 14.7741ZM340.619 17.3928C343.059 15.0344 346.055 13.8549 349.65 13.8549C353.237 13.8549 356.233 15.0344 358.63 17.3928C361.07 19.7106 362.268 22.7357 362.268 26.3632C362.268 29.999 361.07 33.0159 358.63 35.3341C356.233 37.6925 353.237 38.8798 349.65 38.8798C346.055 38.8798 343.059 37.6925 340.619 35.3341C338.231 32.9673 337.033 29.999 337.033 26.3632C337.033 22.7358 338.231 19.7594 340.619 17.3928ZM376.658 22.5167L376.479 16.4734H376.658L393.42 42.0274H397.845V10.6987H393.608V29.0304L393.787 35.0737H393.608L377.583 10.6987H372.421V42.0274H376.658V22.5167Z" fill="white" stroke="white" strokeWidth="0.26666" strokeMiterlimit="10" />
						</svg>
						</a>

					</div>

					<div className="social"> <a
						href="#"><i className="fa fa-instagram" aria-hidden="true"></i>
					</a>
						<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i>
						</a>
						<a href="#"><i
							className="fa fa-youtube-play" aria-hidden="true"></i>
						</a>
						<a href="#"><i
							className="fa fa-linkedin" aria-hidden="true"></i></a> </div>
				</div>

			</div>

			<div className='user-dashboard'>

				<div className='user-mob-back mobile-style'>

					<Link className='back-link' href="user-menu">Personal Information</Link>

					<WhatsappNo />

				</div>

				<div className="wrapper">

					<div className='user-bgBox'>

						<DashboardLeftMenu userProfile={data && data.user ? data.user : ''} />

						<div className='user-right personal-mob'>

							<div className='formbx-white p-0 user-style'>

								<div className="border-heading"><h3>My Profile</h3></div>


								<div className='white-inner'>

									<h5>Personal Information</h5>
									{/* <div className='container-form'>
										<input id='selectedFile' className="disp-none" type='file' accept=".png, .jpg, .jpeg, .svg" onChange={unlockEditBtn} />
										<label htmlFor="selectedFile" id="upload-aphoto" className="btn-primary btn">Upload New Picture</label>
										<button className='delete-img' style={{ display: 'none' }}>Delete</button>
										<div className="user-img">{data && data.user && data.user.first_name ? data.user.first_name.charAt(0).toUpperCase(data.user.first_name) : 'U'}
											{data && data.user && data.user.profile &&
												<img src={`${Url}${data.user.profile}`} />
											}
											<img id='confirm-img' src='' />
										</div>
									</div> */}
									{/* <div className='user-profile-image'>
										<div className="modal fade" id="imageModalContainer" >
											<div className="modal-dialog modal-md modal-dialog-centered">
												<div className="modal-content modal-content1 modal-content1">
													<div className="modal-header">
														<h5 className="modal-title" id="imageModal">Crop Image</h5>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div className="modal-body modal-body1">
														<div id='crop-image-container'>

														</div>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
														<button type="button" className="btn btn-primary save-modal">Save</button>
													</div>
												</div>
											</div>
										</div>


									</div> */}

									<form id="userProfileForm" method='POST' onSubmit={handleSubmit(updateUserProfile)} enctype="multipart/form-data">

										<div className='row'>
											<div className='col-md-6'>
												<div className='form-input'>
													{/* <input type="hidden" id="imageName" defaultValue={image} /> */}
													<label>First Name*</label>
													<input className={'disableInput'} type='text' id="first_name" placeholder='Enter your first name' name="first_name" defaultValue={data && data.user && data.user.first_name} {...register('first_name', { required: true, pattern: passDigital })} maxLength={20} onKeyUp={unlockEditBtn} />
													{errors.first_name?.type === 'required' && <span className="error">Please enter your first name</span>}
													{errors.first_name?.type === 'pattern' && <span className="error">No space and number allowed in first name</span>}
												</div >
											</div >
											<div className='col-md-6'>
												<div className='form-input'>
													<label>Last Name*</label>
													<input type='text' id="last_name" placeholder='Enter your last name' defaultValue={data && data.user && data.user.last_name} {...register('last_name', { required: true, pattern: passDigital })} maxLength={20} onKeyUp={unlockEditBtn} />
													{errors.last_name?.type === 'required' && <span className="error">Please enter your last name</span>}
													{errors.last_name?.type === 'pattern' && <span className="error">No space and number allowed in last name</span>}
												</div>
											</div>

											<div className='col-md-6'>
												<div className='form-input'>
													<label>Mobile Number*</label>
													<input type='text' defaultValue={data && data.user && data.user.mobile} name="mobile" readOnly />
												</div>
											</div>

											<div className='col-md-6'>
												<div className='form-input'>
													<label>Email ID</label>
													<input type='email' name="email" placeholder='Enter your email id' defaultValue={data && data.user && data.user.email ? data.user.email : ''} {...register('email', { required: false, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} onKeyUp={unlockEditBtn} />
													{errors.email?.type === 'pattern' && <span className="error">Please enter vaild email address</span>}
												</div>
											</div>
											<div className='col-md-12'>
												<div className='form-input'>

													<button className='btn arrow-style blue-btn' disabled={updateBtn === true ? true : false}><span>{data && data.user && data.user.first_name ? 'Edit' : updateBtn === true ? 'Save' : 'Save'}</span></button>

												</div >
											</div >
										</div >
									</form >
									{/* <button onClick={showMsg}>
											Edit
										</button> */}
									<NotificationContainer />
								</div >
							</div >

							<div className='formbx-white p-0 user-style'>
								<div className="border-heading"><h3>My Address</h3></div>
								<div className='white-inner'>
									<div className='option-address' style={{ display: `${address.length > 0 ? 'block' : 'none'}` }}>
										<h5>Saved Address</h5>
										{address.length > 0 ?
											<ul className='selectaddress'>
												{address && address.map((addr, i) => {
													return (
														<li key={i}>
															<div className='user-adress option'>
																<div className="dot edit-icon" onClick={(e) => openConfirmModel(addr._id)}></div>
																<div className='addresstype'>{addr.address_type}</div>
																<p>{addr.full_address} {addr.state}, {addr.city} – {addr.pincode}</p>
																<div className='edit-btn-div'><button onClick={() => editUserAddress(addr._id)}>Edit</button></div>
															</div>

														</li>
													)
												})}
												<li className='addnew-icon' onClick={openAddressForm}>
													<div className="flex-wrap-text">
														<div className='plusicon'>
															<img src='../img/plus-icon.svg' />
														</div>
														<span>Add New Addesss</span>
													</div>
												</li>
											</ul>

											: ''}

									</div>

									<div className={`new-address-add ${addressForm || address.length > 0 ? 'top-gap-adress' : ''}`} style={{ display: `${addressForm || address.length === 0 ? 'block' : 'none'}` }}>
										<h5>Add New Address</h5>
										<form method='POST' onSubmit={saveUserAddress} id="userProfileAddress">
											<input type="hidden" name="id" defaultValue={editAddress && editAddress._id ? editAddress._id : ''} />
											<div className='select-address-type'>
												<label className='selectAddresstxt'>Select address type*</label>
												<ul>
													<li className={`${editAddress !== undefined && editAddress.address_type === 'Home' ? 'radioChecked' : ''}`}>
														<input type="radio" name="address_type" id="addresstype" defaultValue="Home" defaultChecked={editAddress !== undefined ? editAddress.address_type === "Home" ? true : false : false} onClick={removeClassRadio} />
														<label htmlFor="addresstype" className="option">Home</label>
													</li>

													<li className={`${editAddress !== undefined && editAddress.address_type === "Work" ? 'radioChecked' : ''}`}>
														<input type="radio" name="address_type" id="addresstype1" defaultValue="Work" defaultChecked={editAddress !== undefined ? editAddress.address_type === "Work" ? true : false : false} onClick={removeClassRadio} />
														<label htmlFor="addresstype1" className="option">Work</label>
													</li>
													<li className={`${editAddress !== undefined && editAddress.address_type === "Other" ? 'radioChecked' : ''}`}>

														<input type="radio" name="address_type" id="addresstype2" defaultValue="Other" defaultChecked={editAddress !== undefined ? editAddress.address_type === "Other" ? true : false : false} onClick={removeClassRadio} />
														<label htmlFor="addresstype2" className="option">Other</label>
													</li>
													<small id="addressTypeNameError" className="error"></small>
												</ul>
											</div>
											<div className='row'>
												<div className='col-md-6'>
													<div className='form-input'>
														<label>Select State*</label>
														<select id="state" onChange={(e) => getCityByState(e.target.value)}>
															<option value="">Select State</option>
															{state.data && state.data.data ? state.data.data.map((state, i) => {
																return (
																	<>
																		<option value={state.province_id} i={i} selected={editAddress !== undefined && editAddress.state === state.province_title ? true : false}>{state.province_title}</option>
																	</>
																)
															}) :
																<div className="spinner-border text-secondary" role="status">
																	<span className="visually-hidden">Loading...</span>
																</div>}

														</select>
														{/* <div class="compItem">
																<div class="car-comp-box" id="comp-select-box">
																	<div class="car-in">
																		<div className="selc-bx">
																			<div onClick={showBrand} className="selectCarLabel">Select Brand</div>
																			{
																				SelectBrand ?
																					<ul className="filterListComan shortByCars scroll-area01 custom-scroller">
																						{
																							state.data && state.data.data ? state.data.data.map((state, i) => {
																								return (
																									<li key={i}>
																										<input type="radio" id={`state_${state.province_id}_Two`} name="compare_brandTwo" value={state.province_id} onChange={(e) => getCityByState(e.target.value)} />
																										<label htmlFor={`state_${state.province_id}_Two`}>{state.province_title}</label>

																									</li>
																								)
																							})
																								: ''}

																					</ul>
																					: ""}

																		</div>
																	</div>
																</div>
															</div> */}
														<small id="stateNameError" className="error"></small>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='form-input'>
														<label>Select City*</label>
														<select id="city" onChange={() => getCityName()} defaultValue={editAddress !== undefined && editAddress.city}>
															<option value="">Select City</option>
															{city && city.map((cityName, i) => {
																return (
																	<>
																		<option value={cityName.id} key={i} selected={editAddress !== undefined && editAddress.city === cityName.name ? true : false}>{cityName.name}</option>
																	</>
																)
															})}
														</select>
														<small id="cityNameError" className="error"></small>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='form-input'>
														<label>Full Address*</label>
														<input type='text' name='full_address' placeholder='Enter your full address' defaultValue={editAddress !== undefined && editAddress.full_address ? editAddress.full_address : ''} />
														<small id="addressError" className="error"></small>
													</div>
												</div>
												<div className='col-md-6'>
													<div className='form-input'>
														<label>Pincode</label>
														<input type='text' name='pincode' className='numberonly' maxLength={6} placeholder='Enter Your Pincode' defaultValue={editAddress && editAddress.pincode} />
													</div>
												</div>
												<div className='col-md-12'>
													<div className='form-input'>
														<button className='btn arrow-style blue-btn'>
															<ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
															{/* <span>Save & Continue</span> */}
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div >

					</div >

				</div >
			</div >
			<ConfirmationModal confirm={confirmModel} msg="Are you sure to delete this record?" closePop={closePop} method={() => deleteUserAddress(addressId)} />

			{popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePop} /> : ''}
			{/* </WebsiteLayout > */}

		</div >
	)
}

export default Index
