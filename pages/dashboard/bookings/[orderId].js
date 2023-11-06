import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import MultiRangeSlider from '../rangeslider/MultiRangeSlider';
import Lottie from "lottie-react";
// import Congratulationstick from "@/public/lotie-icons/tick-circle.json";

import MultiRangeSlider from '@/pages/rangeslider/MultiRangeSlider';
import WebHead from '@/components/common/WebHead';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import { ButtonSpinner, numberFormatter } from '@/components/Helper';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Loader from '@/components/common/Loader';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';

const fetcher = (url) => axios.get(url).then(res => res.data);
const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
});

function EditBooking() {



    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { orderId } = router.query;

    const [Hamburger, setHamburger] = useState(false);
    const [CustomSearch, setCustomSearch] = useState(false);
    const [carOwnerDetail, setCarOwnerDetail] = useState(true);
    const [filledOwnerDetail, setFilledCarOwnerDetail] = useState(false);
    const [selectOwnerAddressTab, setSelectCarOwnerAddressTab] = useState(false);
    const [addNewOwnerAddressTab, setAddNewOwnerAddressTab] = useState(false);
    const [selectPayments, setSelectPayments] = useState(false);
    const [selectOwnerAddressRadio, setSelectOwnerAddressRadio] = useState(false);
    const [selectOwnerAddressRadioBtn, setSelectOwnerAddressRadioBtn] = useState(true);
    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState('');
    const [showSelectedAddress, setShowSelectedAddress] = useState(false);
    const [showHideAddressBarHeading, setShowHideAddressBarHeading] = useState(false);

    const [ownerFirstName, setOwnerFirstName] = useState('');
    const [ownerLastName, setOwnerLastName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [getCities, setGetCities] = useState([]);
    const [checkConfirmation, setCheckConfirmation] = useState(false);
    const [addressSelectionRadioBtn, setAddressSelectionRadioBtn] = useState(true);

    const [GetACall, setGetACall] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');


    const [user, setUser] = useState('');
    // const [orderId, setOrderId] = useState('');

    // const [optCheckBoxClick,setOptCheckBoxClick] = useState('');
    const [optCheckBox, setOptCheckBox] = useState(2);
    const [tinyLoader, setTinyLoader] = useState(false);

    const [getCityName, setGetCityName] = useState('');
    const [getStateName, setGetStateName] = useState('');
    const [getPinCode, setGetPinCode] = useState('');
    const [getSelectedAddress, setGetSelectedAddress] = useState('');


    const [LearMore, setLearMore] = useState(false);
    const [appearLearnData, setAppearLearnData] = useState('');

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

    const swiperSetting = {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: true,
        loop: true,
        modules: [Navigation],
    }


    // const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
    const { data, error } = useSWR(`${Url}user/fetch-order-details/${orderId}`, loggedFetcher);
    const getStates = useSWR(`${Url}states`, fetcher);
    // let fetchAddresses = useSWR(`${Url}user/fetch-all-address`, loggedFetcher);
    // console.log(fetchAddresses.data.data.address)
    // console.log(data);

    // if(fetchAddresses !== undefined && fetchAddresses.data.data.address.length === 0){

    // }

    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');

    const [fetchAddresses, setFetchAddresses] = useState([]);



    const manageCarOwnerFirtName = (e) => {
        setFirstNameInput(e.replace(/[^A-Za-z]/ig, ''));
        setOwnerFirstName(e.replace(/[^A-Za-z]/ig, ''));
    }
    const manageCarOwnerLastName = (e) => {
        setLastNameInput(e.replace(/[^A-Za-z]/ig, ''));
        setOwnerLastName(e.replace(/[^A-Za-z]/ig, ''));
    }

    const manageCarOwnerEmail = (e) => {
        setOwnerEmail(e);
    }

    const manageCarOwnerDetails = async (e) => {
        e.preventDefault();
        let createError = 0;

        if (e.target.car_owner_first_name.value.length <= 0) {
            document.getElementById('firstNameError').innerHTML = 'Please enter your first name';
            document.getElementById("firstNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('firstNameError').innerHTML = '';
                document.getElementById("firstNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.car_owner_last_name.value.length <= 0) {
            document.getElementById('lastNameError').innerHTML = 'Please enter your last name';
            document.getElementById("lastNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('lastNameError').innerHTML = '';
                document.getElementById("lastNameError").style.display = "none";
            }, 3000);
            createError++;
        }


        if (createError > 0) {
            return false;
        }
        // document.getElementById('car-owner-detail')
        setTinyLoader(true);
        const formData = new FormData();
        formData.append("first_name", e.target.car_owner_first_name.value);
        formData.append("last_name", e.target.car_owner_last_name.value);
        formData.append("email", e.target.car_owner_email.value);
        formData.append("form_step", 2);

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        await axios.patch(`${Url}user/update-user-order/${orderId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {

                order.form_step = 2;

                setOwnerFirstName(e.target.car_owner_first_name.value);
                setOwnerLastName(e.target.car_owner_last_name.value)
                setOwnerEmail(e.target.car_owner_email.value);


                setCarOwnerDetail(false);
                setFilledCarOwnerDetail(true);
                setSelectCarOwnerAddressTab(true);
                setShowHideAddressBarHeading(true);
                setSelectOwnerAddressRadio(true);
                setSelectOwnerAddressRadioBtn(true);
                setShowSelectedAddress(false);
                setTinyLoader(false);
            }
        }).catch((e) => {
            setGetACall(true);
            document.body.classList.add('hide-scroll-poup-new');
            setTinyLoader(false);
            if (e && e.response.data.status === 0) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            }
        })

        await axios.post(`${Url}user-update-profile`, formData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {

        }).catch((e) => {
            setGetACall(true);
            document.body.classList.add('hide-scroll-poup-new');
            // if (e && e.message) {
            //     setCallErrorMessage(`Something went wrong.`)
            // } else 
            if (e && e.response.data.status === 0) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            }
        })



    }

    const editCarOwnerDetail = () => {
        setCarOwnerDetail(true);
        setFilledCarOwnerDetail(false);
        setSelectCarOwnerAddressTab(false);
        setShowHideAddressBarHeading(false);
        setSelectOwnerAddressRadio(false);
        setSelectOwnerAddressRadioBtn(false);
        setSelectPayments(false);
    }

    const addAddressOpenClose = () => {
        setAddNewOwnerAddressTab(!addNewOwnerAddressTab);
        const readioChecked = document.querySelector("input[type=radio][name=address_radio_btn]:checked");
        if (readioChecked && readioChecked.checked === true) {
            readioChecked.checked = false;

        }
        setSelectOwnerAddressRadioBtn(false);
        // setAddNewOwnerAddressTab(!selectOwnerAddressRadio);
        // setSelectCarOwnerAddressTab(!setSelectCarOwnerAddressTab)
        // // selectOwnerAddressTab
        // console.log(selectOwnerAddressTab)
        setAddressSelectionRadioBtn(setSelectCarOwnerAddressTab === false ? true : false);
        setSelectOwnerAddressRadio(true);
        // setSelectOwnerAddressRadioBtn();
    }

    const getCitiesByState = async (stateId) => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
            if (res.data.status == 1) {
                setGetCities(res.data.cities)
            }
        }).catch(function (error) {
            setGetCities('');
        });
    }

    const manageCities = () => { }

    const saveNewAddress = async (e) => {
        e.preventDefault();
        let createError = 0;

        if (e.target.address_type.value.length <= 0) {
            document.getElementById('selectAddressTypeError').innerHTML = 'Please select address type';
            document.getElementById("selectAddressTypeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectAddressTypeError').innerHTML = '';
                document.getElementById("selectAddressTypeError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.full_address.value.length <= 0) {
            document.getElementById('fullAddressError').innerHTML = 'Please enter full address';
            document.getElementById("fullAddressError").style.display = "block";
            setTimeout(() => {
                document.getElementById('fullAddressError').innerHTML = '';
                document.getElementById("fullAddressError").style.display = "none";
            }, 3000);
            createError++;
        }



        if (e.target.state.value.length <= 0) {
            document.getElementById('selectAddressError').innerHTML = 'Please select state';
            document.getElementById("selectAddressError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectAddressError').innerHTML = '';
                document.getElementById("selectAddressError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.city.value.length <= 0) {
            document.getElementById('selectCityError').innerHTML = 'Please select city';
            document.getElementById("selectCityError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectCityError').innerHTML = '';
                document.getElementById("selectCityError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            return false;
        }
        setTinyLoader(true);
        const formData = new FormData(document.getElementById('add-new-user-address'));


        await axios.post(`${Url}user/save-new-user-address`, formData, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-user-token')
            }
        }).then(async (res) => {
            if (res && res.data.status === 1) {
                // alert(res.data.message);
                setTinyLoader(false);
                document.getElementById('add-new-user-address').reset();
                setAddNewOwnerAddressTab(false);
                // setSelectCarOwnerAddressTab(!setSelectCarOwnerAddressTab)

                setFetchAddresses(res.data.allAddress);
                setSelectOwnerAddressRadio(true);
                setCheckPinCode('');
                // console.log(res.data.allAddress);
                // fetchAddresses = '';
                // console.log('fetchAddresses : ', fetchAddresses);
                // fetchAddresses = res.data.allAddress;
                // let getAddress = await fetch(`${Url}fetch-all-address`, {
                //     headers: {
                //         token: localStorage.getItem('lr-user-token')
                //     }
                // });
                // fetchAddresses = await getAddress.json();
                // console.log(fetchAddresses);

                const geCurrentAddedAddress = `${res.data.address.user_address_type} ${res.data.address.user_full_address} ${res.data.address.user_city}, ${res.data.address.user_state} - ${res.data.address.user_pincode}`;

                selectedAddressByUser(res.data.address.user_address_type, res.data.address.user_full_address, res.data.address.user_city, res.data.address.user_state, res.data.address.user_pincode);
                // if (fetchAddresses !== '') {

                setTimeout(() => {
                    const $getAddressRadio = document.querySelector('input[name=address_radio_btn]');
                    // console.log($getAddressRadio.value)
                    // console.log($getAddressRadio.value === geCurrentAddedAddress)
                    if ($getAddressRadio.value === geCurrentAddedAddress) {
                        $getAddressRadio.checked = true;
                        // console.log('fetchAddresses : ', fetchAddresses);
                    }
                }, 2000)
                // }

            }
        }).catch((e) => {
            setTinyLoader(false);
            if (e && e.message) {
                setCallErrorMessage(`Something went wrong.`)
            } else if (e && e.response.data === 0) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            }
        });
    }




    const fetchAllUserAddress = async () => {
        await axios.get(`${Url}user/fetch-all-address`, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            console.log(res.data)
            setFetchAddresses(res.data.address);
        }).catch((e) => {

        })
    }


    const selectedAddressByUser = (type, address, city, state, pincode) => {

        setSelectedFullAddress(`${address} ${city}, ${state} - ${pincode}`);
        setSelectedAddressType(type);
        setAddNewOwnerAddressTab(false);
        setAddressSelectionRadioBtn(true);
        setSelectOwnerAddressRadioBtn(true);
        // console.log(`${address} ${city}, ${state} - ${pincode}`);

        setGetSelectedAddress(address);
        setGetCityName(city);
        setGetStateName(state);
        setGetPinCode(pincode);
    }

    const submitSelectedAddress = async (e) => {
        e.preventDefault();

        // console.log(document.getElementById('hid-address-type'))
        if (document.getElementById('hid-address-type') === null || document.getElementById('hid-address-full') === null && document.getElementById('hid-user-state') === null && document.getElementById('hid-user-city') === null) {
            // firstAddressError
            // document.getElementById('firstAddressError').innerHTML = 'Please add address first.';
            // document.getElementById("firstAddressError").style.display = "block";
            // setTimeout(() => {
            //     document.getElementById('firstAddressError').innerHTML = '';
            //     document.getElementById("firstAddressError").style.display = "none";
            // }, 3000);

            setAddNewOwnerAddressTab(true);
            setAddressSelectionRadioBtn(false);
            return false;
        }
        let fullAddress = '';
        let getAddressType = '';

        if (selectedFullAddress === '' || selectedFullAddress === undefined) {
            const $getDefaultAddressType = document.getElementById('hid-address-type').value;
            const $getDefaultFullAddress = document.getElementById('hid-address-full').value;
            const $getUserDefaultState = document.getElementById('hid-user-state').value;
            const $getUserDefaultCity = document.getElementById('hid-user-city').value;
            const $getUserDefaultPinCode = document.getElementById('hid-user-pincode').value;
            selectedAddressByUser($getDefaultAddressType, $getDefaultFullAddress, $getUserDefaultCity, $getUserDefaultState, $getUserDefaultPinCode);

            setSelectedFullAddress(`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            fullAddress = (`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            getAddressType = $getDefaultAddressType;

            setGetSelectedAddress($getDefaultFullAddress);
            setGetCityName($getUserDefaultCity);
            setGetStateName($getUserDefaultState);
            setGetPinCode($getUserDefaultPinCode);

        }
        setTinyLoader(true);

        // submit-selected-address
        const formData = new FormData();
        formData.append("address_type", getAddressType !== '' && getAddressType !== undefined ? getAddressType : selectedAddressType);
        formData.append("full_address", fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress);
        formData.append("option_insurance", optCheckBox);
        formData.append("form_step", 3);

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        await axios.patch(`${Url}user/update-user-order/${orderId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {

                order.form_step = 3;

                setSelectOwnerAddressRadio(false);
                setShowSelectedAddress(true);
                setShowHideAddressBarHeading(false);
                setAddNewOwnerAddressTab(false);
                setSelectPayments(true);
                setTinyLoader(false);
            }
        }).catch((e) => {
            setGetACall(true);
            document.body.classList.add('hide-scroll-poup-new');
            setTinyLoader(false);
            if (e && e.message) {
                setCallErrorMessage(e.message);
            } else if (e && e.response && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response && e.response.data.status === 0) {
                setCallErrorMessage(e.response.data.message);
            }
        })

    }


    const editSelctedAddress = () => {
        setShowHideAddressBarHeading(true);
        setSelectOwnerAddressRadio(true);
        setAddNewOwnerAddressTab(false)
        setShowSelectedAddress(false);
        setSelectPayments(false);
    }


    const checkOrderConfirmation = () => {
        setCheckConfirmation(true);
    }

    const createPayment = async (e) => {

        e.preventDefault();
        setTinyLoader(true);

        const formData = new FormData();
        formData.append("option_insurance", optCheckBox);
        formData.append("payment_type", "Cash");
        formData.append("form_step", 4);
        const productData = {
            option_insurance: optCheckBox,
            payment_type: "Cash",
            form_step: 4
        }
        await axios.patch(`${Url}user/update-user-order/${orderId}`, formData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setTinyLoader(false);
                router.push(`/dashboard/bookings/thank-you/${res.data.order_id}`);
            }
        }).catch((e) => {
            setTinyLoader(false);
            if (e && e.message) {
                document.getElementById('order-error').innerHTML = e.response.data.message;
                document.getElementById("order-error").style.display = "block";
                setTimeout(() => {
                    document.getElementById('order-error').innerHTML = '';
                    document.getElementById("order-error").style.display = "none";
                }, 3000);
            } else if (e && e.response && e.response.data.status === 2) {
                document.getElementById('order-error').innerHTML = e.response.data.message;
                document.getElementById("order-error").style.display = "block";
                setTimeout(() => {
                    document.getElementById('order-error').innerHTML = '';
                    document.getElementById("order-error").style.display = "none";
                }, 3000);
                // alert(e.response.data.message);
            } else if (e && e.response && e.response.data.status === 0) {
                document.getElementById('order-error').innerHTML = e.response.data.message;
                document.getElementById("order-error").style.display = "block";
                setTimeout(() => {
                    document.getElementById('order-error').innerHTML = '';
                    document.getElementById("order-error").style.display = "none";
                }, 3000);
                // alert(e.response.data.message);
            }
        });


    }

    const closePop = () => {
        setCheckConfirmation(false);
        setGetACall(false);
        setLearMore(false);
        document.body.classList.remove('hide-scroll-poup-new');
        document.body.classList.remove('hide-scroll-poup');
    }

    useEffect(() => {
        fetchAllUserAddress();
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
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
        } else {
            router.push('/');
        }
    }, []);

    const [checkPinCode, setCheckPinCode] = useState('');
    const managePinCodeHandler = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e === "" || regex.test(e)) {
            setCheckPinCode(e);
        }
    }

    const manageInsuranceClickHandler = () => {
        const checkBoxClick = document.querySelector('input[name=insurance_check]');
        if (checkBoxClick.checked === true) {
            setOptCheckBox(1);
        } else {
            setOptCheckBox(2);
        }
    }


    useEffect(() => {
        if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
            router.push("/");
        }
        if (data && data.data && data.data.order && data.data.order.form_step === 2) {
            setSelectOwnerAddressRadio(true);
            setShowHideAddressBarHeading(true);
        }
        if (data && data.data && data.data.order && data.data.order.form_step === 4) {
            router.push('/dashboard/bookings');
        }
    }, []);

    const OpenLearn = () => {
        setLearMore(true);
        setAppearLearnData(`We at Luxury Ride provide car loan and financing solutions, ensuring that you can afford your dream vehicle without breaking the bank. With our commitment to customer satisfaction, we strive to offer the best rates possible, tailored to your specific financial needs.Our team of experts will guide you through the loan process and assist you in securing favorable financing terms.
        `);
        document.body.classList.add('hide-scroll-poup-new');
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';
        }
    }

    const OpenLearnOrderCancel = () => {
        setLearMore(true);
        setAppearLearnData(`We at Luxury Ride stand behind our cars and your satisfaction with them is very important to us. If you change your mind about the booking, we will happily issue you a refund upon your request,no questions asked.`);
        document.body.classList.add('hide-scroll-poup-new');
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';
        }
    }


    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    const order = data !== undefined && data.data !== undefined && data.data.order !== undefined && data.data.order !== '' ? data.data.order : <Loader loaderTitle={`Loading...`} />;

    return (
        <>

            <div>
                <WebHead pageTitle={order.order_car_name} />

                {/* <WebsiteLayout> */}
                <section className='ebook-deatil bg-grey comPad'>
                    <div className='wrapper'>
                        <div className='box-reduce'>
                            <div className='row'>
                                <div className="col-md-12 desktop-hide-div mobile-show-div ">
                                    <div className="row  prductSec01">
                                        <div className="col-5">
                                            <div className="image-circle">
                                                {/* <img src="http://3.111.141.162:4000/public/products/image-1681460828918-84780331-image-(2).png" /> */}
                                                <img src={`${order.order_product_id.product_image}`} />
                                            </div>
                                        </div>

                                        <div className="col-7">
                                            <div className="txt">
                                                <h1>{order.order_car_name}</h1>
                                                <ul>
                                                    <li>{order.order_car_registration_year}</li>
                                                    <li>{order.order_car_registration_state}</li>
                                                    <li>{order.order_car_kms}</li>
                                                    <li>{order.order_car_ownership}</li>
                                                    <li>{order.order_car_fuel_type}</li>
                                                </ul>
                                                {console.log(order)}
                                                <div className="price-detail">
                                                    <div className="price">INR <span>{numberFormatter(order.order_car_amount)}/-</span></div>
                                                    <div className="emiStarts">EMI starts from <span>INR {numberFormatter(order.order_product_id.product_monthely_emi)}/-</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>

                                    <div className='confirm-ownerdetails' style={{ display: "block" }}>
                                        <div className='formbx-white'>
                                            <div className='carloan'>
                                                <input type="checkbox" id="interestrate" name="insurance_check" onClick={manageInsuranceClickHandler} value={optCheckBox} />
                                                <label htmlFor="interestrate" className='label-loan'>
                                                    <div className='iconloan'>
                                                        <img src='/img/carloan.png' />
                                                    </div>
                                                    <h3>Interested In Car Loan?</h3>
                                                    <p>Get your car financed at attractive interest rates. <span onClick={OpenLearn} className='btnunderline'>Learn more</span></p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className='confirm-ownerdetails' style={{ display: "none" }}>
                                            <div className='formbx-white'>
                                                <div className='carloan'>
                                                    <input type="checkbox" id="interestrate" />
                                                    <label htmlFor="interestrate" className='label-loan'>
                                                        <div className='iconloan'>
                                                            <img src='/img/carloan.png' />
                                                        </div>
                                                        <h3>Interested In Car Loan?</h3>
                                                        <p>Get your car financed at attractive interest rates. <Link href="">Learn more</Link></p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div> */}

                                    <div className='formbx-white ownerdetail'>


                                        {
                                            order.form_step === 1 ?
                                                <>
                                                    <div style={{ display: "block" }}>

                                                        <h3>Enter Car Owner Details</h3>
                                                        <form method="POST" id="car-owner-detail" onSubmit={manageCarOwnerDetails}>
                                                            <div className='row'>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>First Name*</label>
                                                                        <input type='text' onChange={(e) => manageCarOwnerFirtName(e.target.value)} name="car_owner_first_name" id="car-owner-first-name" placeholder='Enter your first name' defaultValue={user !== '' && user !== undefined ? user.first_name : firstNameInput} />
                                                                        <small id="firstNameError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>Last Name*</label>
                                                                        <input type='text' onChange={(e) => manageCarOwnerLastName(e.target.value)} name="car_owner_last_name" id="car-owner-last-name" placeholder='Enter your last name' defaultValue={user !== '' && user !== undefined ? user.last_name : lastNameInput} />
                                                                        <small id="lastNameError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>Email ID</label>
                                                                        <input type='text' onChange={(e) => manageCarOwnerEmail(e.target.value)} name="car_owner_email" id="car_owner_email" placeholder='Enter your email id' defaultValue={user !== '' && user !== undefined ? user.email : ''} />
                                                                    </div>

                                                                </div>
                                                                <div className='col-md-12'>
                                                                    <div className='form-input mb-0'>
                                                                        <button className='btn arrow-style blue-btn'>
                                                                            <span>
                                                                                <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </> :
                                                <>
                                                    <div className='nextstep-edit editowner-details' style={{ display: "block" }}>
                                                        <ul>
                                                            <li>
                                                                <div className='iconedit'>
                                                                    <img src="/img/user-icon.svg" alt="Luxury Ride" />
                                                                </div>
                                                                <div className='editinfo-owner'>
                                                                    <h4>Car Owner Details</h4>
                                                                    <div className='ownername'>
                                                                        {`${ownerFirstName !== '' && ownerLastName !== undefined ? ownerFirstName : order.user_first_name !== undefined ? order.user_first_name : ''} ${ownerLastName !== '' && ownerLastName !== undefined ? ownerLastName : order.user_last_name !== undefined ? order.user_last_name : ''}`}</div>
                                                                    <div className='ownermailid'>{ownerEmail !== '' && ownerEmail !== '' ? ownerEmail : order.user_email_id}</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                        }
                                    </div>

                                    <div className='formbx-white add-address' style={{ display: order.form_step === 1 ? "none" : "block" }}>
                                        {
                                            order.form_step === 2 ?
                                                <>

                                                    <div style={{ display: order.form_step === 2 ? "block" : "none" }}>
                                                        <h3>Select/Add Address</h3>
                                                        <p>Select from saved address or add a new address</p>
                                                    </div>


                                                    <div className='new-address-add' style={{ display: addNewOwnerAddressTab === false ? "none" : "block" }}>
                                                        <h3>Add New Address</h3>
                                                        <form method="POST" onSubmit={saveNewAddress} id="add-new-user-address">

                                                            <div className='select-address-type'>
                                                                <label className='selectAddresstxt'>Select address type*</label>
                                                                <ul>
                                                                    <li>
                                                                        <input type="radio" name="address_type" id="addresstype" value="Home" />
                                                                        <label htmlFor="addresstype" className="option">Home</label>
                                                                    </li>
                                                                    <li>
                                                                        <input type="radio" name="address_type" id="addresstype1" value="Work" />
                                                                        <label htmlFor="addresstype1" className="option">Work</label>
                                                                    </li>
                                                                    <li>
                                                                        <input type="radio" name="address_type" id="addresstype2" value="Other" />
                                                                        <label htmlFor="addresstype2" className="option">Other</label>
                                                                    </li>
                                                                    <small id="selectAddressTypeError" className="error"></small>
                                                                </ul>
                                                            </div>

                                                            <div className='row'>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>Full Address*</label>
                                                                        <input type='text' placeholder='Enter your full address' name="full_address" id="full-address" />
                                                                        <small id="fullAddressError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>Pincode*</label>
                                                                        <input type='text' placeholder='Enter Your Pincode' onChange={(e) => managePinCodeHandler(e.target.value)} name="pincode" id="pincode" value={checkPinCode} maxLength={6} />
                                                                        <small id="pinCodeError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
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
                                                                        <small id="selectAddressError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <div className='form-input'>
                                                                        <label>Select City*</label>
                                                                        <select name="city" id="city_name" onChange={manageCities}>
                                                                            <option value={``}>Select City</option>
                                                                            {
                                                                                getCities !== undefined && getCities !== '' && getCities.map((city, i) => {
                                                                                    return (
                                                                                        <option value={city.name} key={i}>{city.name}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                        <small id="selectCityError" className="error"></small>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-12'>
                                                                    <div className='form-input'>
                                                                        <button className='btn arrow-style blue-btn'>
                                                                            <span>
                                                                                <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>



                                                    <div className='option-address' style={{ display: order.form_step === 2 ? "block" : selectOwnerAddressRadio === false ? "none" : "block" }}>
                                                        <form method="POST" onSubmit={submitSelectedAddress} id="submit-selected-address">
                                                            <ul className='selectaddress'>
                                                                {
                                                                    fetchAddresses !== undefined && fetchAddresses.map((addr, i) => {

                                                                        return (
                                                                            <li key={addr._id}>
                                                                                <input type="radio" name="address_radio_btn" id={`option_${i}`} value={`${addr.address_type} ${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`} onChange={(e) => selectedAddressByUser(addr.address_type, addr.full_address, addr.city, addr.state, addr.pincode)} defaultChecked={i === 0 ? true : false} />


                                                                                <label htmlFor={`option_${i}`} className="option">
                                                                                    <div className="dot"></div>
                                                                                    <div className='addresstype'>{addr.address_type}</div>
                                                                                    <p>{`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`}</p>
                                                                                </label>
                                                                                <input type="hidden" value={addr.address_type} name="hid_address_type" id="hid-address-type" />
                                                                                <input type="hidden" value={addr.full_address} name="hid_full_address" id="hid-address-full" />
                                                                                <input type="hidden" value={addr.state} name="hid_user_state" id="hid-user-state" />
                                                                                <input type="hidden" value={addr.city} name="hid_user_city" id="hid-user-city" />
                                                                                <input type="hidden" value={addr.pincode} name="hid_user_pincode" id="hid-user-pincode" />
                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                                <li className='addnew-icon' onClick={addAddressOpenClose}>
                                                                    <div className='flex-wrap-text'>
                                                                        <div className='plusicon'>
                                                                            <img src='/img/plus-icon.svg' />
                                                                        </div>
                                                                        <span>Add New Addesss</span></div>
                                                                </li>
                                                            </ul>
                                                            <small id="firstAddressError" className="error"></small>
                                                            <button className='btn arrow-style blue-btn' style={{ display: selectOwnerAddressRadioBtn === false ? "none" : "block" }}>
                                                                <span>
                                                                    <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                                                                </span>
                                                            </button>
                                                        </form>
                                                    </div>

                                                </>
                                                :
                                                <>

                                                    <div className='nextstep-edit editowner-details' style={{ display: order.form_step === 3 ? "block" : "none" }}>
                                                        <ul>
                                                            <li>
                                                                <div className='iconedit'>
                                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                                </div>
                                                                <div className='editinfo-owner'>
                                                                    <h4>{selectedAddressType !== '' && selectedAddressType !== '' ? selectedAddressType : order.user_address_type}</h4>
                                                                    <p>{selectedFullAddress !== undefined && selectedFullAddress !== '' ? selectedFullAddress : order.user_full_address}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                        }

                                    </div>


                                    {/* <div className='choose-exiting-address' style={{ display: "none" }}>
                                        <h3>Choose from Saved Address</h3>

                                        <ul className='selectaddress'>
                                            <li>
                                                <input type="radio" name="choose-add" id="option3" />
                                                <label htmlFor="option3" className="option">
                                                    <div className="dot"></div>
                                                    <div className='addresstype'>Home</div>
                                                    <p>Plot no 41, Saraswati Kunj, Sector 53 Gurugram, Haryana – 122011</p>
                                                </label>
                                            </li>

                                            <li>
                                                <input type="radio" name="choose-add" id="option4" />
                                                <label htmlFor="option4" className="option">
                                                    <div className="dot"></div>
                                                    <div className='addresstype'>Home</div>
                                                    <p>Plot no 41, Saraswati Kunj, Sector 53 Gurugram, Haryana – 122011</p>
                                                </label>
                                            </li>
                                        </ul>
                                    </div> */}



                                    <div className='formbx-white payment desktop-style' style={{ display: order.form_step === 3 ? "block" : selectPayments === false ? "none" : "block" }}>
                                        {/* <h3>Payments</h3> */}
                                        <h3>Confirmation</h3>
                                        {/* <button onClick={checkOrderConfirmation} className='btn arrow-style green-btn fullwd-btn'> */}
                                        {/* <span>Confirm Order</span></button> */}
                                        {/* <button onClick={createPayment} className='btn arrow-style green-btn fullwd-btn'><span>Proceed To Pay INR {numberFormatter(data.product.booking_amount)}/-</span></button> */}
                                        <button onClick={checkOrderConfirmation} className='btn arrow-style green-btn fullwd-btn'><span>Proceed To Pay INR {numberFormatter(order.user_booking_amount)}/-</span></button>
                                        <div className='cancle-msg' style={{ display: "block" }} >Cancel anytime, fully refundable</div>
                                    </div>

                                    {/* <div className='formbx-white congratulation-bx' style={{ display: "block" }}>
                                    <div className='congo-namebx'>
                                        <div className='animation-icon'>
                                            <Lottie animationData={Congratulationstick} loop={true} />
                                        </div>
                                        <div className='msg-congo'>
                                            <h2>Congratulations! Himanshu Arya</h2>
                                            <ul>
                                                <li>+91-9876543210</li>
                                                <li>himanshuarya@gmail.com</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='payment-orderinfo'>Your payment of <span>INR 50,000/-</span> has received. <span>Your order ID is 3456789</span></div>

                                    <div className='address-confirmation'>
                                        <ul>
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/messageblue-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                You would have got an SMS with all the details of your payment
                                            </li>
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Work</span>261, 1st Floor, Lane no 5, Westend Marg, Saiyad Ul Ajaib Extension, Sainik Farm, New Delhi, Delhi 110030, India, 110030
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}

                                </div>

                                <div className='col-md-6 sticky-div'>


                                    <div className='sticky-div'>
                                        <div className='formbx-white p-0 order-summary overflow-unset new-design-image'>
                                            <div className='border-heading'><h3>Order Summary</h3></div>

                                            <h5 className="mobile-view-hide">Car Details</h5>
                                            <div className='vehicle-list-detail border-bottom pad-small mobile-view-hide'>

                                                <div className='image'>  <img className='image-radious' src={`${order.order_product_id.product_image}`} /></div>


                                                <div className='car-info'>

                                                    <div className='car-year'><span>{order.order_car_registration_year}</span></div>
                                                    <div className='car-name'><span>{order.order_model_name}</span></div>
                                                    <ul>
                                                        {/* <li><span>{order.order_brand_name}</span></li> */}


                                                        <li><span>{order.order_variant_name}</span></li>
                                                        <li><span>{order.order_car_ownership}</span></li>
                                                        <li><span>{numberFormatter(order.order_car_kms)}</span></li>
                                                    </ul>

                                                </div>
                                            </div>

                                            <div className='summarylist'>
                                                <ul>
                                                    <li>
                                                        <div className='left-txt'>Car Value
                                                            <span style={{ display: optCheckBox === 2 ? "none" : "block" }}>Opted in for financing</span>
                                                        </div>
                                                        <div className='right-txt'>INR {numberFormatter(order.order_car_amount)}/-</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>2 Months Comprehensive Warranty</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Insurance  <span>{order.order_car_insurance_type}</span> </div>
                                                        <div className='right-txt'>
                                                            {` ${order.order_car_insurance_valid}`}
                                                            {/* {order.order_car_insurance_type === "Valid" ? ` ${order.order_car_insurance_type} Till ${order.order_car_insurance_valid}` : (order.order_car_insurance_type === "Expired" || order.order_car_insurance_type === "expired" ? `Expired in  ${order.order_car_insurance_valid}` : '')} */}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt blue-txt-order'>Booking Amount
                                                            <div className='info-order'>
                                                                <img src='/img/circle-info.svg' alt="" />

                                                                <div className='infotxt'>
                                                                    <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 7 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                                    <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                                </div>
                                                            </div>
                                                            {/* <i>(Pay Now)</i> */}
                                                            {/* <div className='info-order'>
                        <img src='/img/circle-info.svg' alt="" />

                        <div className='infotxt'>
                            <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                            <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                        </div>
                    </div> */}
                                                        </div>
                                                        <div className='right-txt blue-txt-order'>
                                                            {/* <Link href='' className='btnunderline'>Edit</Link> */}
                                                            <b>INR {numberFormatter(order.user_booking_amount)}/-</b>
                                                        </div>
                                                    </li>
                                                    {/* <li>
                                                        <div className='left-txt'>Balance Amount */}
                                                    {/* <i>(Pay Later)</i> */}
                                                    {/* <div className='info-order'>
                        <img src='/img/circle-info.svg' alt="" />

                        <div className='infotxt'>
                            <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                            <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                        </div>
                    </div> */}
                                                    {/* </div>
                                                        <div className='right-txt'>
                                                            INR {numberFormatter(order.order_balance_amount)}/-
                                                        </div>
                                                    </li> */}
                                                    <li className='grandtotal'>
                                                        <div className='left-txt'>Balance Amount
                                                            <div className='info-order'>
                                                                <img src='/img/circle-info.svg' alt="" />

                                                                <div className='infotxt'>
                                                                    <p>Don’t make your dream car wait !!
                                                                        Pay the balance amount and lock the deal on your dream car. We offer you a 15 days money back guarantee to boost your confidence in your buying decision.
                                                                    </p>
                                                                    <p>Rest assured we will continue to hold this exclusively for you for next 7 days. We are committed to making your car-buying experience as seamless and transparent as possible.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='right-txt'>INR {numberFormatter(order.order_balance_amount)}/-</div>
                                                    </li>
                                                </ul>
                                                <div className='order-cancle'>Cancel anytime, fully refundable.  <span onClick={OpenLearnOrderCancel} className='btnunderline'>
                                                    Learn more</span></div>
                                            </div>
                                        </div>

                                        <div className='mobile-style'>

                                            <div className="proceed-to-pay " style={{ display: selectPayments === 3 ? "block" : "block" }}>
                                                <div className="row">
                                                    <div className="col-10 pay-left">
                                                        <div className="ownerheading">Owner Details</div>
                                                        <p>{`${ownerFirstName} ${ownerLastName}, ${ownerEmail !== '' && ownerEmail !== undefined ? ownerEmail : user !== '' && user !== undefined ? user.email : ''}, ${selectedFullAddress}`}</p>
                                                    </div>
                                                    <div className="col-2 pay-right">
                                                        {/* <div class="editcta" onClick={editCarOwnerDetail}>Edit</div> */}
                                                    </div>
                                                </div>
                                                <button className='btn arrow-style green-btn fullwd-btn' onClick={checkOrderConfirmation}>
                                                    <ButtonSpinner load={tinyLoader} btnName={`Proceed To Pay INR ${numberFormatter(order.user_booking_amount)}/-`} />
                                                </button>
                                                <div className="cancle-msg">Cancel anytime, fully refundable</div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                                {/* <div className='col-md-6 sticky-div'>


                                    <div className='sticky-div'>
                                        <div className='formbx-white p-0 order-summary overflow-unset'>
                                            <div className='border-heading'><h3>Order Summary</h3></div>

                                            <h5>Car Details</h5>
                                            <div className='vehicle-list-detail border-bottom pad-small '>
                                                <ul>
                                                    <li>Brand<span>{order.order_brand_name}</span></li>
                                                    <li>Reg. Year<span>{order.order_car_registration_year}</span></li>
                                                    <li>Model<span>{order.order_model_name}</span></li>
                                                    <li>Variant<span>{order.order_variant_name}</span></li>
                                                    <li>Ownership<span>{order.order_car_ownership}</span></li>
                                                    <li>KMs Driven<span>{numberFormatter(order.order_car_kms)}</span></li>
                                                </ul>
                                            </div>

                                            <div className='summarylist'>
                                                <ul>
                                                    <li>
                                                        <div className='left-txt'>Purchase Amount
                                                            <span style={{ display: optCheckBox === 2 ? "none" : "block" }}>Opted in for financing</span>
                                                        </div>
                                                        <div className='right-txt'>INR {numberFormatter(order.order_car_amount)}/-</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>2 Months Comprehensive Warranty</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Insurance</div>
                                                        <div className='right-txt'>{order.order_car_insurance_type === "Valid" ? ` ${order.order_car_insurance_type} Till ${order.order_car_insurance_valid}` : (order.order_car_insurance_type === "Expired" || order.order_car_insurance_type === "expired" ? `Expired in  ${order.order_car_insurance_valid}` : '')}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt blue-txt-order'>Booking Amount */}
                                {/* <i>(Pay Now)</i> */}
                                {/* <div className='info-order'>
                                                            <img src='/img/circle-info.svg' alt="" />

                                                            <div className='infotxt'>
                                                                <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                                <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                            </div>
                                                        </div> */}
                                {/* </div> */}
                                {/* <div className='right-txt blue-txt-order'> */}
                                {/* <Link href='' className='btnunderline'>Edit</Link> */}
                                {/* <b>INR {numberFormatter(order.user_booking_amount)}/-</b>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Balance Amount */}
                                {/* <i>(Pay Later)</i> */}
                                {/* <div className='info-order'>
                                                            <img src='/img/circle-info.svg' alt="" />

                                                            <div className='infotxt'>
                                                                <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                                <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                            </div>
                                                        </div> */}
                                {/* </div>
                                                        <div className='right-txt'>
                                                            INR {numberFormatter(order.order_balance_amount)}/-
                                                        </div>
                                                    </li>
                                                    <li className='grandtotal'>
                                                        <div className='left-txt'>Grand Total</div>
                                                        <div className='right-txt'>INR {numberFormatter(order.order_car_amount)}/-</div>
                                                    </li>
                                                </ul>
                                                <div className='order-cancle'>Cancel anytime, fully refundable. <Link href="" className='btnunderline'>Learn more</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}


                            </div>
                        </div>
                    </div>
                </section>

                <section className='happen-nxt comPad'>
                    <div className='wrapper'>
                        <h2 className='center-heading'>What Happens Next</h2>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className='happen-bx'>
                                    <div className='img-bx'>
                                        <img src="/img/happen1.png" alt="Luxury Ride" />
                                    </div>
                                    <div className='txt-happen'>
                                        <h3>Make Booking</h3>
                                        <p>Complete the booking process to reserve this car exclusively for a total of 3 days.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-3 col-md-6'>
                                <div className='happen-bx'>
                                    <div className='img-bx'>
                                        <img src="/img/happen2.png" alt="Luxury Ride" />
                                    </div>
                                    <div className='txt-happen'>
                                        <h3>Complete Paperwork</h3>
                                        <p>We’ll take care of all the paperwork regarding your car’s purchase & RC transfer.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-3 col-md-6'>
                                <div className='happen-bx'>
                                    <div className='img-bx'>
                                        <img src="/img/happen3.png" alt="Luxury Ride" />
                                    </div>
                                    <div className='txt-happen'>
                                        <h3>Pay Balance Amount</h3>
                                        <p>Choose how you pay the balance amount or avail financing with LR starting at just 11.25%.</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-lg-3 col-md-6'>
                                <div className='happen-bx'>
                                    <div className='img-bx'>
                                        <img src="/img/happen4.png" alt="Luxury Ride" />
                                    </div>
                                    <div className='txt-happen'>
                                        <h3>Get Delivery</h3>
                                        <p>Get your Luxury car delivered gift-wrapped in style.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={`${checkConfirmation === true ? "open-popup" : ""} common-popup login are-you-sure`}>
                    <div className='popup-inner'>
                        <div className='popup-close' onClick={closePop}></div>
                        <div className='before-otp'>
                            <h3>Confirm Order</h3>
                            <small id="order-error" className='error'></small>
                            <button className='btn arrow-style blue-btn' onClick={createPayment}>
                                <ButtonSpinner load={tinyLoader} btnName={`Yes`} />
                            </button>
                            <button type="button" className='btn arrow-style blue-btn grey' onClick={closePop}>
                                <ButtonSpinner load={tinyLoader} btnName={`Cancel`} />
                            </button>
                        </div>
                    </div>

                </div>


                {GetACall ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}

                {LearMore ? <div style={{ display: "block" }} className={`common-popup text-pop login get-acall`}>
                    <div onClick={closePop} className="overlay-mob mobile-style "></div>
                    <div className='popup-inner'>

                        <div onClick={closePop} className='popup-close'></div>

                        <div className='thankyou'>



                            <p>{appearLearnData}</p>
                        </div>
                    </div>

                </div>
                    : ""
                }

                {/* </WebsiteLayout> */}
            </div>
        </>
    )
}

export default EditBooking;