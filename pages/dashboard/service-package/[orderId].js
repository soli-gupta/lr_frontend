import React, { useEffect, useState } from 'react';
import 'swiper/css';
import "swiper/css/pagination";
import Lottie from "lottie-react";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import { $ } from 'react-jquery-plugin'
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { ButtonSpinner, databaseDateConverter, dateConverterForValue, fullDatabaseDateConverter, numberFormatter, weekDatesForForms } from '@/components/Helper';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import Loader from '@/components/common/Loader';

import DashboardAddressList from '@/components/service-package-components/dashboardAddressList';

const fetcher = (url) => axios.get(url).then(res => res.data);

const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);

function FinalServiceDetails() {

    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { orderId } = router.query;
    let order = {};

    const todayDate = new Date();
    const todayTime = todayDate.getHours();
    const todayDay = dateConverterForValue(databaseDateConverter(todayDate).day, databaseDateConverter(todayDate).month, databaseDateConverter(todayDate).year);


    const [tinyLoader, setTinyLoader] = useState(false);

    const [centerAddress, setCenterAddress] = useState('');
    const [serviceCenterName, setServiceCenterName] = useState('');
    const [serviceCenterAddress, setServiceCenterAddress] = useState(true);

    // Address tab
    const [selectAddressTab, setSelectAddressTab] = useState(false);
    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState('');
    const [selctedAddressTab, setSelctedAddressTab] = useState(false);
    const [addressRadioAndAddTab, setAddressRadioAndAddTab] = useState(false);
    const [selectedAddressRadioButton, setSelectedAddressRadioButton] = useState(true);

    // Address Form

    const [checkPinCode, setCheckPinCode] = useState('');
    const [getCities, setGetCities] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Inspaction Date Tab
    const [vehicleInspactionDateTab, setVehicleInspactionDateTab] = useState(false);
    const [dateLimit, setDateLimit] = useState(7);
    const [addNewAddressTab, setAddNewAddressTab] = useState(false);

    const [selectedVehicleInspactionDateTab, setSelectedVehicleInspactionDateTab] = useState(false);
    const [selectedRadioDate, setSelectedRadioDate] = useState(false);
    const [insterSelectedDate, setInsertSelectedDate] = useState('');


    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');


    // Payments Tab
    const [paymentsTab, setPaymentsTab] = useState(false);



    const [fetchAddresses, setFetchAddresses] = useState([]);


    const serviceCenters = useSWR(`${Url}fetch-service-centers`, fetcher);
    const getStates = useSWR(`${Url}states`, fetcher);
    // const fetchAddresses = useSWR(`${Url}user/fetch-all-address`, loggedFetcher);
    const { data, error } = useSWR(`${Url}user/fetch-order-details/${orderId}`, loggedFetcher);


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

    setTimeout(() => {
        $(".registration-upload").on("change", function (e) {
            e.preventDefault();
            var filename = e.target.files[0].name
            $(".registrationfile p").text(filename)
            $(".reg-uploadbx").hide();
            $(".registrationfile").show();
        })

        $(".registrationfile .registrationfile-remove").on("click", function () {
            $(".reg-uploadbx").show();
            $(".registrationfile").hide();
        })


        $(".insurance-upload").on("change", function (e) {
            e.preventDefault();
            var filename = e.target.files[0].name
            $(".insurance-filename p").text(filename)
            $(".insurance-uploadbox").hide();
            $(".insurance-filename").show();
        })

        $(".insurance-filename .insuranceremovefile").on("click", function () {
            $(".insurance-uploadbox").show();
            $(".insurance-filename").hide();
        })


    }, 100);

    const serviceCenterAddressHandler = (name, address) => {
        setServiceCenterName(name);
        setCenterAddress(address);
    }

    const submitServiceCenterAddress = async (e) => {
        e.preventDefault();

        if (centerAddress === '' || centerAddress === undefined) {
            document.getElementById('serviceCenterError').innerHTML = 'Please select service center.';
            document.getElementById("serviceCenterError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCenterError').innerHTML = '';
                document.getElementById("serviceCenterError").style.display = "none";
            }, 3000);
            return false;
        }

        const getServiceCenterData = {
            preferred_center_name: serviceCenterName,
            preferred_center_address: centerAddress,
            form_step: 2
        }
        setTinyLoader(true);
        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServiceCenterData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.form_step = 2;
                setServiceCenterName(serviceCenterName);
                setServiceCenterAddress(centerAddress);
                setTinyLoader(false);
                setServiceCenterAddress(false);
                setSelectAddressTab(true);
                setAddressRadioAndAddTab(true);
                setSelctedAddressTab(false);
                setSelectedAddressRadioButton(true);
                setAddNewAddressTab(false);
            }
        }).catch((e) => {
            popUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });

    }

    const editServiceCenterTab = () => {
        setServiceCenterAddress(true);
        setSelectAddressTab(false);


        setVehicleInspactionDateTab(false);
        setPaymentsTab(false);
        setSelectedVehicleInspactionDateTab(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
    }


    const selectedAddressByUser = (type, address, city, state, pincode) => {
        setSelectedFullAddress(`${address} ${city}, ${state} - ${pincode}`);
        setSelectedAddressType(type);
        setAddNewAddressTab(false);
        setSelectedAddressRadioButton(true);
    }

    const submitSelectedAddress = async (e) => {

        let fullAddress = '';
        let getAddressType = '';

        if (selectedAddressType === '' || selectedAddressType === undefined) {

            const $getDefaultAddressType = document.getElementById('hid-address-type').value;
            const $getDefaultFullAddress = document.getElementById('hid-address-full').value;
            const $getUserDefaultState = document.getElementById('hid-user-state').value;
            const $getUserDefaultCity = document.getElementById('hid-user-city').value;
            const $getUserDefaultPinCode = document.getElementById('hid-user-pincode').value;
            // console.log($getDefaultAddressType, $getDefaultFullAddress, $getUserDefaultCity, $getUserDefaultState, $getUserDefaultPinCode);
            setSelectedAddressType($getDefaultAddressType);
            setSelectedFullAddress(`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            fullAddress = (`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            getAddressType = $getDefaultAddressType;
        }


        const getUserAddressData = {
            user_address_type: getAddressType !== '' && getAddressType !== undefined ? getAddressType : selectedAddressType,
            user_full_address: fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress,
            form_step: 3
        }

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getUserAddressData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.form_step = 3;
                setAddressRadioAndAddTab(false);
                setSelctedAddressTab(true);
                setVehicleInspactionDateTab(true);
                setSelectedAddressType(getAddressType !== '' && getAddressType !== undefined ? getAddressType : selectedAddressType);
                setSelectedFullAddress(fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress);
            }
        }).catch((e) => {
            popUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });
    }


    const editSelectedAddressTab = () => {
        setAddressRadioAndAddTab(true);
        setSelctedAddressTab(false);
        setServiceCenterAddress(false);
        setSelectedAddressRadioButton(true);
        setSelectedVehicleInspactionDateTab(false);
        setPaymentsTab(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
    }


    const addAddressOpenClose = () => {
        setAddNewAddressTab(!addNewAddressTab);
        const readioChecked = document.querySelector("input[type=radio][name=address_radio_btn]:checked");
        if (readioChecked && readioChecked.checked === true) {
            readioChecked.checked = false;
        }
        setSelectedAddressRadioButton(false);
    }

    const managePinCodeHandler = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e === "" || regex.test(e)) {
            setCheckPinCode(e);
        }
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

    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.remove('hide-scroll-poup-new');
        // setTimeout(() => {
        //     router.push('/dashboard/service-package');
        // }, 5000);
    }


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
            document.getElementById('fullAddressError').innerHTML = 'Please enter pincode';
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

        const formData = new FormData(document.getElementById('add-new-user-address'));


        await axios.post(`${Url}user/save-new-user-address`, formData, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                // alert(res.data.message);
                // setAddNewOwnerAddressTab(false);
                // setSelectCarOwnerAddressTab(!setSelectCarOwnerAddressTab)
                // setSelctedAddressTab(true);
                document.body.classList.add('hide-scroll-poup-new');
                setAddressRadioAndAddTab(true);
                setSelctedAddressTab(false);
                setVehicleInspactionDateTab(false);
                setCheckPinCode('');


                setPopUp(true);
                setSuccessMessage(res.data.message);
                setFetchAddresses(res.data.allAddress);



                const geCurrentAddedAddress = `${res.data.address.user_address_type} ${res.data.address.user_full_address} ${res.data.address.user_city}, ${res.data.address.user_state} - ${res.data.address.user_pincode}`;
                selectedAddressByUser(res.data.address.user_address_type, res.data.address.user_full_address, res.data.address.user_city, res.data.address.user_state, res.data.address.user_pincode);

                setTimeout(() => {
                    const $getAddressRadio = document.querySelector('input[name=address_radio_btn]');
                    if ($getAddressRadio.value === geCurrentAddedAddress) {
                        $getAddressRadio.checked = true;
                    }
                }, 2000)

                document.getElementById('add-new-user-address').reset();

            }
        }).catch((e) => {
            setPopUp(true);
            document.body.classList.add('hide-scroll-poup-new');
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data === 0) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            }
        });
    }


    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);

    const selctedDateHandler = (e, dayMonth, radioDate) => {
        setInsertSelectedDate(e);
        setSelectedRadioDate(fullDatabaseDateConverter(e))
        setRadioSelectedDate(radioDate);
        // setBookedDateSlot(fullDatabaseDateConverter(radioDate));
        const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
        if (todayDay === radioDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
            chekcedDateCheck.checked = false;
        }
    }


    const manageTimeSlotOne = () => {
        setBookedTimeSlot('11 AM to 12 PM');
    }

    const manageTimeSlotTwo = () => {
        setBookedTimeSlot('12 PM to 1 PM');
    }

    const manageTimeSlotThree = () => {
        setBookedTimeSlot('1 PM to 2 PM');
    }

    const manageTimeSlotFour = () => {
        setBookedTimeSlot('2 PM to 3 PM');
    }

    const manageTimeSlotFive = () => {
        setBookedTimeSlot('3 PM to 4 PM');
    }

    const manageTimeSlotSix = () => {
        setBookedTimeSlot('4 PM to 5 PM');
    }

    const manageTimeSlotSaven = () => {
        setBookedTimeSlot('5 PM to 6 PM');
    }

    const manageTimeSlotEight = () => {
        setBookedTimeSlot('6 PM to 7 PM');
    }

    const manageDateTestDrive = (e, radioDate) => {

        // console.log('radioDate : ', fullDatabaseDateConverter(radioDate));
        // console.log('e : ', e);
    }


    const submitSelectedDate = async (e) => {
        e.preventDefault();

        const $getSelectedDate = document.querySelectorAll('input[name=selectedDate]:checked');

        if ($getSelectedDate.checked === false || $getSelectedDate[0] === undefined) {
            document.getElementById('selectedDateError').innerHTML = 'Please select date.';
            document.getElementById("selectedDateError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedDateError').innerHTML = '';
                document.getElementById("selectedDateError").style.display = "none";
            }, 3000);
            return false;
        }

        const $getSelectedTime = document.querySelectorAll('input[name=book_time]:checked');

        if ($getSelectedTime.checked === false || $getSelectedTime[0] === undefined) {
            document.getElementById('selectedTimeError').innerHTML = 'Please select time.';
            document.getElementById("selectedTimeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedTimeError').innerHTML = '';
                document.getElementById("selectedTimeError").style.display = "none";
            }, 3000);
            return false;
        }

        const getSelectedDateTimeData = {
            inspaction_date: insterSelectedDate,
            inspaction_time: bookedTimeSlot,
            form_step: 4
        }

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getSelectedDateTimeData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.form_step = 4;
                setVehicleInspactionDateTab(false);
                setSelectedVehicleInspactionDateTab(true);
                setPaymentsTab(true);
                setInsertSelectedDate(insterSelectedDate);
                setBookedTimeSlot(bookedTimeSlot);
                if (typeof window !== "undefined") {
                    document.body.classList.add('double-big-btns');
                }
            }
        }).catch((e) => {
            popUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });
    }

    const editVehicaleInspactionDate = () => {
        setVehicleInspactionDateTab(true);
        setSelectedVehicleInspactionDateTab(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
    }

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedFuelType, setSelectedFuelType] = useState('');
    const [enteredKMs, setEnteredKMs] = useState('');


    const submitPayAtWorkaShop = async (e) => {
        e.preventDefault();

        const $getSelectedDate = document.querySelectorAll('input[name=selectedDate]:checked');

        if ($getSelectedDate.checked === false || $getSelectedDate[0] === undefined) {
            document.getElementById('selectedDateError').innerHTML = 'Please select date.';
            document.getElementById("selectedDateError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedDateError').innerHTML = '';
                document.getElementById("selectedDateError").style.display = "none";
            }, 3000);
            return false;
        }

        const $getSelectedTime = document.querySelectorAll('input[name=book_time]:checked');

        if ($getSelectedTime.checked === false || $getSelectedTime[0] === undefined) {
            document.getElementById('selectedTimeError').innerHTML = 'Please select time.';
            document.getElementById("selectedTimeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedTimeError').innerHTML = '';
                document.getElementById("selectedTimeError").style.display = "none";
            }, 3000);
            return false;
        }

        const getServicePackageCashPayment = {
            payment_type: "Pay at Workshop",
            inspaction_date: insterSelectedDate,
            inspaction_time: bookedTimeSlot,
            form_step: 5
        }



        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServicePackageCashPayment, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                router.push(`/dashboard/service-package/thank-you/${res.data.orderId}`);
            }
        }).catch((e) => {
            popUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });
    }


    const submitPayNowBtn = async (e) => {
        e.preventDefault();


        const getServicePackageOnlinePayment = {
            payment_type: "Online",
            form_step: 5
        }


        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServicePackageOnlinePayment, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                router.push(`/service-packages/thank-you/${res.data.orderId}`);
            }
        }).catch((e) => {
            popUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });

    }

    useEffect(() => {
        fetchAllUserAddress();
    }, [])



    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    order = data !== undefined && data.order !== undefined && data.order !== '' ? data.order : <Loader loaderTitle={`Loading...`} />;
    // console.log(order);


    return (
        <>
            <WebHead pageTitle={`${order.order_brand_name} ${order.order_model_name} ${order.order_variant_name} | Booked Service Package`} />
            {/* <WebsiteLayout> */}
            <section className="package-service bg-grey comPad">
                <div className="wrapper">
                    <div className='extra-pd-rightleft'>

                        <div className="row">
                            <div className="col-md-7">

                                <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                    </div>
                                    <div className='vehicle-list-detail'>

                                        <ul>
                                            {/* <li>Reg. Year<span>{order.order_car_registration_year !== undefined ? order.order_car_registration_year : ''}</span></li> */}
                                            <li>Brand<span>{order.order_brand_name !== undefined ? order.order_brand_name : ''}</span></li>
                                            <li>Model<span>{order.order_model_name !== undefined ? order.order_model_name : ''}</span></li>
                                            <li>Variant<span>{order.order_variant_name !== undefined ? order.order_variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{order.order_car_fuel_type !== undefined ? order.order_car_fuel_type : ''}</span></li>
                                            <li>KMs Driven<span>{order.order_car_kms !== undefined ? numberFormatter(order.order_car_kms) : ''}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='formbx-white preferred-service-center'>

                                    {
                                        order.form_step === 1 ?
                                            <>
                                                <h3 style={{ display: order.form_step === 1 ? "block" : serviceCenterAddress === false ? "none" : "block" }}  >Select Preferred Service Centre</h3>

                                                <div style={{ display: order.form_step === 1 ? "block" : serviceCenterAddress === false ? "none" : "block" }}>
                                                    <form method="POST" onSubmit={submitServiceCenterAddress}>

                                                        <ul className='selectaddress'>

                                                            {
                                                                serviceCenters !== undefined && serviceCenters.data !== undefined && serviceCenters.data.experience_center.map((center) => {
                                                                    return (
                                                                        <li key={center._id}>
                                                                            <input type="radio" name="select-center" id={`select-service_${center.name}`} onChange={(e) => serviceCenterAddressHandler(center.name, center.address)} />
                                                                            <label htmlFor={`select-service_${center.name}`} className="option">
                                                                                <div className="dot"></div>
                                                                                <div className='addresstype'>{center.name}</div>
                                                                            </label>
                                                                        </li>
                                                                    )
                                                                })

                                                            }


                                                            <small id="serviceCenterError" className="error"></small>
                                                        </ul>
                                                        <p>{centerAddress}</p>
                                                        <input type="hidden" name="service_center_address" id="service-center-address" value={centerAddress} />

                                                        <div className='form-input mg-0'>
                                                            <button href="javascript:void(0)" className='btn arrow-style blue-btn' disabled={tinyLoader}>
                                                                <span>Save & Continue</span>
                                                            </button>
                                                        </div>

                                                    </form>
                                                </div>
                                            </> :
                                            <>
                                                <div className='nextstep-edit editowner-details' style={{ display: order.form_step >= 2 ? "block" : "none" }}>
                                                    <ul>
                                                        <li>
                                                            <div className='iconedit'>
                                                                <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                                                            </div>
                                                            <div className='editinfo-owner'>

                                                                <h4>Preferred Service Centre</h4>
                                                                <div className="ownername">{order.service_center_name !== undefined && order.service_center_name !== '' ? order.service_center_name : serviceCenterName}</div>
                                                                <p>{order.service_center_address !== undefined && order.service_center_address !== '' ? order.service_center_address : serviceCenterAddress}</p>
                                                            </div >
                                                        </li>
                                                    </ul>
                                                </div>
                                            </>
                                    }
                                </div>


                                <div className='formbx-white add-address' style={{ display: order.form_step >= 2 ? "block" : selectAddressTab === false ? "none" : "block" }}>
                                    <h3 style={{ display: order.form_step === 2 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>Select/Add address For Car Pickup</h3>
                                    <p style={{ display: order.form_step === 2 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>Select from saved address or add a new address</p>



                                    {

                                        order.form_step === 2 ?
                                            <>

                                                <div className='nextstep' style={{ display: addNewAddressTab === false ? "none" : "block" }}>
                                                    <div className='new-address-add'>
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
                                                                        <input type='text' placeholder='Enter Your Pincode' onChange={(e) => managePinCodeHandler(e.target.value)} name="pincode" id="pincode" value={checkPinCode} minLength={6} maxLength={6} />
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
                                                                        <button className='btn arrow-style blue-btn'><span>Save & Continue</span></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                                <div className='option-address' style={{ display: order.form_step === 2 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>
                                                    <ul className='selectaddress'>

                                                        {
                                                            fetchAddresses !== undefined && fetchAddresses !== '' && fetchAddresses.map((addr, i) => {
                                                                return (
                                                                    <DashboardAddressList key={addr._id} selectedAddressByUser={selectedAddressByUser} addr={addr} i={i} />
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

                                                    <div className='form-input mg-0' style={{ display: selectedAddressRadioButton === false ? "none" : "block" }}>
                                                        <button href="javascript:void(0)" className='btn arrow-style blue-btn' onClick={submitSelectedAddress}>
                                                            <span>Save & Continue</span>
                                                        </button>
                                                    </div>
                                                </div>

                                            </> :
                                            <>


                                                <div className='nextstep-edit editowner-details' style={{ display: order.form_step >= 3 ? "block" : "none" }}>
                                                    <ul>
                                                        <li>
                                                            <div className='iconedit'>
                                                                <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                            </div>
                                                            <div className='editinfo-owner'>
                                                                <h4>Car Pickup Address</h4>
                                                                <div className="ownername">{order.user_address_type !== undefined && order.user_address_type !== '' ? order.user_address_type : selectedAddressType}</div>
                                                                <p>{order.user_full_address !== undefined && order.user_full_address !== '' ? order.user_full_address : selectedFullAddress}</p>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </>


                                    }


                                </div>

                                <div className='formbx-white add-time-date' style={{ display: order.form_step >= 3 ? "block" : vehicleInspactionDateTab == false ? "none" : "block" }}>
                                    <h3 style={{ display: order.form_step === 3 ? "block" : vehicleInspactionDateTab == false ? "none" : "block" }}>Select Car Pickup Date</h3>
                                    <div className='nextstep' style={{ display: order.form_step >= 3 ? "block" : vehicleInspactionDateTab == false ? "none" : "block" }}>



                                        {
                                            order.form_step === 3 ? <>

                                                <div className='style-box'>
                                                    <h4>Select Date*</h4>
                                                    <div className='dates time-pd'>
                                                        {
                                                            weekCal && weekCal.map((date, i) => {
                                                                return (
                                                                    <div className='date' key={i}>
                                                                        <input type="radio" name="selectedDate" onChange={(e) => selctedDateHandler(e.target.value, `${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))} value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} />
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
                                                            <input type="radio" name="book_time" value="11AM-12PM" id="selectTimeOne" onChange={manageTimeSlotOne}
                                                                disabled={todayDay === radioSelectedDate && todayTime >= '11' ? true : false} />
                                                            <label htmlFor="selectTimeOne" className={`option ${todayDay === radioSelectedDate && todayTime >= '11' ? 'disable-time' : ''}`} >11AM - 12PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="12PM-1PM" id="selectTimeTwo" onChange={manageTimeSlotTwo} disabled={todayDay === radioSelectedDate && todayTime >= '12' ? true : false} />
                                                            <label htmlFor="selectTimeTwo" className={`option ${todayDay === radioSelectedDate && todayTime >= '12' ? 'disable-time' : ''}`}>12PM - 1PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="1PM-2PM" id="selectTimeThree" onChange={manageTimeSlotThree} disabled={todayDay === radioSelectedDate && todayTime >= '13' ? true : false} />
                                                            <label htmlFor="selectTimeThree" className={`option ${todayDay === radioSelectedDate && todayTime >= '13' ? 'disable-time' : ''}`}>1PM - 2PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="2PM-3PM" id="selectTimeFour" onChange={manageTimeSlotFour} disabled={todayDay === radioSelectedDate && todayTime >= '14' ? true : false} />
                                                            <label htmlFor="selectTimeFour" className={`option ${todayDay === radioSelectedDate && todayTime >= '14' ? 'disable-time' : ''}`}>2PM - 3PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="3PM-4PM" id="selectTimeFive" onChange={manageTimeSlotFive} disabled={todayDay === radioSelectedDate && todayTime >= '15' ? true : false} />
                                                            <label htmlFor="selectTimeFive" className={`option ${todayDay === radioSelectedDate && todayTime >= '15' ? 'disable-time' : ''}`}>3PM - 4PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="4PM-5PM" id="selectTimeSix" onChange={manageTimeSlotSix} disabled={todayDay === radioSelectedDate && todayTime >= '16' ? true : false} />
                                                            <label htmlFor="selectTimeSix" className={`option ${todayDay === radioSelectedDate && todayTime >= '16' ? 'disable-time' : ''}`}>4PM - 5PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="5PM-6PM" id="selectTimeSaven" onChange={manageTimeSlotSaven} disabled={todayDay === radioSelectedDate && todayTime >= '17' ? true : false} />
                                                            <label htmlFor="selectTimeSaven" className={`option ${todayDay === radioSelectedDate && todayTime >= '17' ? 'disable-time' : ''}`}>5PM - 6PM</label>
                                                        </div>

                                                        <div className='date'>
                                                            <input type="radio" name="book_time" value="6PM-7PM" id="selectTimeEight" onChange={manageTimeSlotEight} disabled={todayDay === radioSelectedDate && todayTime >= '18' ? true : false} />
                                                            <label htmlFor="selectTimeEight" className={`option ${todayDay === radioSelectedDate && todayTime >= '18' ? 'disable-time' : ''}`}>6PM - 7PM</label>
                                                        </div>

                                                    </div>
                                                    <small id="selectedTimeError" className="error"></small>

                                                </div>

                                                <div className='form-input mg-0'>
                                                    {/* <button className='btn arrow-style blue-btn' onClick={submitSelectedDate}>
                                                        <span>Save & Continue</span>
                                                    </button> */}
                                                    <div class="mobile-fixed-bg">
                                                        <button className='btn blueBdr' onClick={submitPayAtWorkaShop}>
                                                            <ButtonSpinner load={tinyLoader} btnName={`Confirm`} />
                                                        </button>
                                                    </div>
                                                </div>

                                            </> :
                                                <>
                                                    <div className='nextstep-edit editowner-details' style={{ display: order.form_setp >= 4 ? "block" : "" }}>
                                                        <ul>
                                                            <li>
                                                                <div className='iconedit'>
                                                                    <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                                                </div>
                                                                <div className='editinfo-owner'>
                                                                    <h4>Car Pickup Date</h4>
                                                                    <p>
                                                                        {order.vehicle_inspaction_date !== undefined && order.vehicle_inspaction_date !== '' ?
                                                                            <>


                                                                                {`${fullDatabaseDateConverter(order.vehicle_inspaction_date).weekDay}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).day} ${fullDatabaseDateConverter(order.vehicle_inspaction_date).month}, ${fullDatabaseDateConverter(order.vehicle_inspaction_date).year}, ${order.vehicle_inspaction_time}`}
                                                                            </>
                                                                            :
                                                                            <>


                                                                                {`${fullDatabaseDateConverter(insterSelectedDate).weekDay}, ${fullDatabaseDateConverter(insterSelectedDate).day} ${fullDatabaseDateConverter(insterSelectedDate).month}, ${fullDatabaseDateConverter(insterSelectedDate).year}, ${order.bookedTimeSlot}`}
                                                                            </>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </>
                                        }



                                    </div>


                                </div>


                                <div className='formbx-white payment button-payment' style={{ display: order.form_step >= 4 ? "block" : paymentsTab == false ? "none" : "block" }}>
                                    <h3>Payments</h3>
                                    <div className='nextstep' style={{ display: order.form_step >= 4 ? "block" : paymentsTab == false ? "none" : "block" }}>
                                        <button className='btn blueBdr' onClick={submitPayAtWorkaShop}>
                                            <ButtonSpinner load={tinyLoader} btnName={`Confirm`} />
                                        </button>
                                        {/* <button className='btn arrow-style green-btn' onClick={submitPayNowBtn}>
                                            <ButtonSpinner load={tinyLoader} btnName={`Pay Now & Get INR 1500/- Off`} />
                                        </button> */}
                                    </div>
                                </div>


                            </div>


                            {/* <div className='mobile-style'>

                                <div className="proceed-to-pay " style={{ display: order.form_step >= 4 ? "block" : paymentsTab == false ? "none" : "block" }}>
                                    <div className="row">
                                        <button className='btn arrow-style fullwd-btn' onClick={submitPayAtWorkaShop}>
                                            <ButtonSpinner load={tinyLoader} btnName={`Pay At Workhop`} />
                                        </button>
                                        <button className='btn arrow-style green-btn fullwd-btn' onClick={submitPayNowBtn}>
                                            <ButtonSpinner load={tinyLoader} btnName={`Pay Now & Get INR 1500/- Off`} />
                                        </button>

                                    </div>
                                    <div className="cancle-msg">Cancel anytime, fully refundable</div>
                                </div>
                            </div> */}


                            <div className="col-md-5">
                                <div className="sticky-div">
                                    <div className="nextstep">
                                        <div className='formbx-white p-0 mobile-view-hide'>
                                            <div className='border-heading relativediv'>
                                                <h3>Car Details</h3>
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                <ul>
                                                    {/* <li>Reg. Year<span>{order.order_car_registration_year !== undefined ? order.order_car_registration_year : ''}</span></li> */}
                                                    <li>Brand<span>{order.order_brand_name !== undefined ? order.order_brand_name : ''}</span></li>
                                                    <li>Model<span>{order.order_model_name !== undefined ? order.order_model_name : ''}</span></li>
                                                    <li>Variant<span>{order.order_variant_name !== undefined ? order.order_variant_name : ''}</span></li>
                                                    <li>Fuel Type<span>{order.order_car_fuel_type !== undefined ? order.order_car_fuel_type : ''}</span></li>
                                                    <li>KMs Driven<span>{order.order_car_kms !== undefined ? numberFormatter(order.order_car_kms) : ''}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* </div> */}

                            {/* <div className="col-md-5">
                                <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                    </div>
                                    <div className='vehicle-list-detail'>

                                        <ul>
                                            <li>Year<span>{order.order_car_registration_year !== undefined ? order.order_car_registration_year : ''}</span></li>
                                            <li>Brand<span>{order.order_brand_name !== undefined ? order.order_brand_name : ''}</span></li>
                                            <li>Model<span>{order.order_model_name !== undefined ? order.order_model_name : ''}</span></li>
                                            <li>Variant<span>{order.order_variant_name !== undefined ? order.order_variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{order.order_car_fuel_type !== undefined ? order.order_car_fuel_type : ''}</span></li>
                                            <li>KMs Driven<span>{order.order_car_kms !== undefined ? numberFormatter(order.order_car_kms) : ''}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="formbx-white package-ordersummary pb-0">
                                            <h3>Order Summary</h3>
                                            <div className='service-summary-list p-0'>
                                                <ul>
                                                    <li className="package-price-quote">
                                                        <div className="left-sec">
                                                            <div className="icon"><img src="/img/package-service-icon.svg" alt="" /></div>
                                                            <div className="blue-txt sum-package-name">Gold Package <a className="underline-btn">Edit Package</a></div>
                                                            <span>This gold package consist <b>3 services & valid upto 3 years or 45,000 KM</b> whichever comes first.</span>
                                                        </div>
                                                        <div className="right-sec">
                                                            <div className="blue-txt discount-price">INR 55,999/-</div>
                                                            <div className="cut-price">INR 60,999/-</div>
                                                            <button className="delete-btn"></button>
                                                        </div>
                                                    </li>
                                                    <li className="upgradeto">
                                                        <div className="left-sec">
                                                            <p className="mb-0">Upgrade to</p>
                                                            <p className="blue-txt mb-0">
                                                                <b>Diamond Package </b>INR <b>667</b>/month
                                                            </p>
                                                        </div>
                                                        <div className="right-sec">
                                                            <button className="btn reverse">Upgrade Now</button>
                                                        </div>
                                                    </li>
                                                    <li className="extended-year-li align-items-start">
                                                        <div className="left-sec">
                                                            <div className="icon"><img src="/img/sheld-icon.png" alt="" /></div>
                                                            <div className="blue-txt sum-package-name">Extended Warranty</div>
                                                            <div className="selectbx allPrices">
                                                                <form>
                                                                    <div className='form-input white-bgform'>
                                                                        <select>
                                                                            <option>1 Year/10,000 Kms</option>
                                                                            <option>1 Year/10,000 Kms</option>
                                                                            <option>1 Year/10,000 Kms</option>
                                                                            <option>1 Year/10,000 Kms</option>
                                                                        </select>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <span>This extended warranty is valid upto 1 years or 15,000 KM whichever comes first.</span>
                                                        </div>
                                                        <div className="right-sec">
                                                            <div className="blue-txt discount-price">INR 55,999/-</div>
                                                            <div className="cut-price">INR 60,999/-</div>
                                                            <button className="delete-btn"></button>
                                                        </div>
                                                    </li>
                                                    <li className="subtotal">
                                                        <div className="left-sec">
                                                            <p className="mb-0">Subtotal Total<span>Subtotal includes applicable taxes <a className="underline-btn">View Breakup</a></span></p>
                                                        </div>
                                                        <div className="right-sec">
                                                            <div className="">INR 55,999/-</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span className='green-txtorder text-center'>Nice! You saved INR 5,000/- on your order.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                            {/* </div> */}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </section >
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePopUp} /> : ''
            }
            {/* </WebsiteLayout > */}

        </>
    )
}


export default FinalServiceDetails;
