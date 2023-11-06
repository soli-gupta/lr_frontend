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
import { ButtonSpinner, dateConverterForValue, fullDatabaseDateConverter, numberFormatter, weekDatesForForms } from '@/components/Helper';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import Loader from '@/components/common/Loader';
import ServiceCenterTab from '@/components/service-package-components/serviceCcenterTab';
import AddressSelectionTab from '@/components/service-package-components/addressSelectiontab';
import InstpactionDateTimeTab from '@/components/service-package-components/inspaction-date-time-tab';

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

    // const todayDate = new Date();
    // const currentDate = todayDate.getDate();
    // const todayMonth = todayDate.getMonth() + 1;
    // const todayYear = todayDate.getFullYear();
    // const todayTime = todayDate.getHours();
    // const todayDay = todayYear + '-' + todayMonth + '-' + currentDate

    const [centerAddress, setCenterAddress] = useState('');
    const [serviceCenterName, setServiceCenterName] = useState('');
    const [serviceCenterAddress, setServiceCenterAddress] = useState(true);

    // Address tab
    const [selectAddressTab, setSelectAddressTab] = useState(false);
    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState('');
    const [selctedAddressTab, setSelctedAddressTab] = useState(false);
    const [addressRadioAndAddTab, setAddressRadioAndAddTab] = useState(false);
    const [selectedAddressRadioButton, setSelectedAddressRadioButton] = useState(false);

    // Address Form

    const [checkPinCode, setCheckPinCode] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');




    const [popUp, setPopUp] = useState(false);

    // Inspaction Date Tab
    const [vehicleInspactionDateTab, setVehicleInspactionDateTab] = useState(false);
    // const [dateLimit, setDateLimit] = useState(7);
    const [addNewAddressTab, setAddNewAddressTab] = useState(false);

    const [selectedVehicleInspactionDateTab, setSelectedVehicleInspactionDateTab] = useState(false);
    const [selectedRadioDate, setSelectedRadioDate] = useState(false);
    const [insterSelectedDate, setInsertSelectedDate] = useState('');

    const [selectionInspactionDateTime, setSelectionInspactionDateTime] = useState(false);



    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');


    // Payments Tab
    const [paymentsTab, setPaymentsTab] = useState(false);


    const [tinyLoader, setTinyLoader] = useState(false);


    // // const serviceCenters = useSWR(`${Url}fetch-service-centers`, fetcher);
    // const getStates = useSWR(`${Url}states`, fetcher);
    // const fetchAddresses = useSWR(`${Url}user/fetch-all-address`, loggedFetcher);
    const { data, error } = useSWR(`${Url}user/fetch-order-details/${orderId}`, loggedFetcher);
    // console.log(fetchAddresses.data);

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

        setTinyLoader(true);

        const getServiceCenterData = {
            preferred_center_name: serviceCenterName,
            preferred_center_address: centerAddress,
            form_step: 2
        }

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServiceCenterData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setServiceCenterAddress(false);
                setSelectAddressTab(true);
                setAddressRadioAndAddTab(true); // This comment for hide second and thirs step
                // setPaymentsTab(true);
                setSelctedAddressTab(false);
                setSelectedAddressRadioButton(true);
                setAddNewAddressTab(false);
                setTinyLoader(false);
            }
        }).catch((e) => {
            popUp(true);
            setTinyLoader(true);
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

        setTinyLoader(true);

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getUserAddressData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setAddressRadioAndAddTab(false);
                setSelctedAddressTab(true);
                setVehicleInspactionDateTab(true);
                setSelectionInspactionDateTime(true);
                setTinyLoader(false);
            }
        }).catch((e) => {
            popUp(true);
            setTinyLoader(true);
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
        setVehicleInspactionDateTab(false);
        setSelectionInspactionDateTime(false);
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

    // const managePinCodeHandler = (e) => {
    //     const regex = /^[0-9\b]+$/;
    //     if (e === "" || regex.test(e)) {
    //         setCheckPinCode(e);
    //     }
    // }


    // const getCitiesByState = async (stateId) => {
    //     axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
    //         if (res.data.status == 1) {
    //             setGetCities(res.data.cities)
    //         }
    //     }).catch(function (error) {
    //         setGetCities('');
    //     });
    // }


    const closePopUp = () => {
        setPopUp(false);
    }

    // const saveNewAddress = async (e) => {
    //     e.preventDefault();
    //     let createError = 0;

    //     if (e.target.address_type.value.length <= 0) {
    //         document.getElementById('selectAddressTypeError').innerHTML = 'Please select address type';
    //         document.getElementById("selectAddressTypeError").style.display = "block";
    //         setTimeout(() => {
    //             document.getElementById('selectAddressTypeError').innerHTML = '';
    //             document.getElementById("selectAddressTypeError").style.display = "none";
    //         }, 3000);
    //         createError++;
    //     }

    //     if (e.target.full_address.value.length <= 0) {
    //         document.getElementById('fullAddressError').innerHTML = 'Please enter pincode';
    //         document.getElementById("fullAddressError").style.display = "block";
    //         setTimeout(() => {
    //             document.getElementById('fullAddressError').innerHTML = '';
    //             document.getElementById("fullAddressError").style.display = "none";
    //         }, 3000);
    //         createError++;
    //     }



    //     if (e.target.state.value.length <= 0) {
    //         document.getElementById('selectAddressError').innerHTML = 'Please select state';
    //         document.getElementById("selectAddressError").style.display = "block";
    //         setTimeout(() => {
    //             document.getElementById('selectAddressError').innerHTML = '';
    //             document.getElementById("selectAddressError").style.display = "none";
    //         }, 3000);
    //         createError++;
    //     }

    //     if (e.target.city.value.length <= 0) {
    //         document.getElementById('selectCityError').innerHTML = 'Please select city';
    //         document.getElementById("selectCityError").style.display = "block";
    //         setTimeout(() => {
    //             document.getElementById('selectCityError').innerHTML = '';
    //             document.getElementById("selectCityError").style.display = "none";
    //         }, 3000);
    //         createError++;
    //     }

    //     if (createError > 0) {
    //         return false;
    //     }

    //     const formData = new FormData(document.getElementById('add-new-user-address'));


    //     await axios.post(`${Url}user/save-new-user-address`, formData, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: localStorage.getItem('lr-user-token')
    //         }
    //     }).then((res) => {
    //         if (res && res.data.status === 1) {
    //             // alert(res.data.message);
    //             // setAddNewOwnerAddressTab(false);
    //             // setSelectCarOwnerAddressTab(!setSelectCarOwnerAddressTab)
    //             // setSelctedAddressTab(true);
    //             setAddressRadioAndAddTab(true);
    //             setSelctedAddressTab(false);
    //             setVehicleInspactionDateTab(false);
    //             setSelectionInspactionDateTime(false);
    //             setCheckPinCode('');
    //             setPopUp(true);
    //             setSuccessMessage(res.data.message);
    //             const geCurrentAddedAddress = `${res.data.address.user_address_type} ${res.data.address.user_full_address} ${res.data.address.user_city}, ${res.data.address.user_state} - ${res.data.address.user_pincode}`;
    //             setTimeout(() => {
    //                 selectedAddressByUser(res.data.address.user_address_type, res.data.address.user_full_address, res.data.address.user_city, res.data.address.user_state, res.data.address.user_pincode);
    //                 const $getAddressRadio = document.querySelector('input[name=address_radio_btn]');
    //                 if ($getAddressRadio.value === geCurrentAddedAddress) {
    //                     $getAddressRadio.checked = true;
    //                 }
    //             }, 300)

    //             router.push(`/service-packages/${orderId}`);
    //             document.getElementById('add-new-user-address').reset();

    //         }
    //     }).catch((e) => {
    //         setPopUp(true);
    //         if (e && e.message) {
    //             setErrorMessage(e.message);
    //         } else if (e && e.response.data === 0) {
    //             setErrorMessage(e.response.data.message);
    //         } else if (e && e.response.data.status === 2) {
    //             setErrorMessage(e.response.data.message);
    //         }
    //     });
    // }


    // const changeDateShowLimit = () => {
    //     setDateLimit(14);
    // }
    // const weekCal = weekDatesForForms(dateLimit);

    // const selctedDateHandler = (e, dayMonth, radioDate) => {
    //     setInsertSelectedDate(e);
    //     setSelectedRadioDate(fullDatabaseDateConverter(e))
    //     setRadioSelectedDate(radioDate);
    //     // setBookedDateSlot(fullDatabaseDateConverter(radioDate));
    //     const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
    //     if (todayDay === radioDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
    //         chekcedDateCheck.checked = false;
    //     }
    // }


    // const manageTimeSlotOne = () => {
    //     setBookedTimeSlot('11 AM to 12 PM');
    // }

    // const manageTimeSlotTwo = () => {
    //     setBookedTimeSlot('12 PM to 1 PM');
    // }

    // const manageTimeSlotThree = () => {
    //     setBookedTimeSlot('1 PM to 2 PM');
    // }

    // const manageTimeSlotFour = () => {
    //     setBookedTimeSlot('2 PM to 3 PM');
    // }

    // const manageTimeSlotFive = () => {
    //     setBookedTimeSlot('3 PM to 4 PM');
    // }

    // const manageTimeSlotSix = () => {
    //     setBookedTimeSlot('4 PM to 5 PM');
    // }

    // const manageTimeSlotSaven = () => {
    //     setBookedTimeSlot('5 PM to 6 PM');
    // }

    // const manageTimeSlotEight = () => {
    //     setBookedTimeSlot('6 PM to 7 PM');
    // }

    // const manageDateTestDrive = (e, radioDate) => {

    //     // console.log('radioDate : ', fullDatabaseDateConverter(radioDate));
    //     // console.log('e : ', e);
    // }


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

        setTinyLoader(true);

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getSelectedDateTimeData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setVehicleInspactionDateTab(true);
                setSelectedVehicleInspactionDateTab(true);
                setSelectionInspactionDateTime(false);
                setPaymentsTab(true);
                setTinyLoader(false);
                if (typeof window !== "undefined") {
                    document.body.classList.add('double-big-btns');
                }
            }
        }).catch((e) => {
            popUp(true);
            setTinyLoader(false);
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
        setSelectionInspactionDateTime(true);
        setPaymentsTab(false);
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


        setTinyLoader(true);

        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServicePackageCashPayment, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                router.push(`/service-packages/thank-you/${res.data.orderId}`);
                setTinyLoader(false);
            }
        }).catch((e) => {
            popUp(true);
            setTinyLoader(false);
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

        setTinyLoader(true);


        await axios.patch(`${Url}update-service-package-order/${orderId}`, getServicePackageOnlinePayment, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                router.push(`/service-packages/thank-you/${res.data.orderId}`);
                setTinyLoader(false);
            }
        }).catch((e) => {
            popUp(true);
            setTinyLoader(false);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });

    }


    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    order = data !== undefined && data.order !== undefined && data.order !== '' ? data.order : <Loader loaderTitle={`Loading...`} />;

    return (
        <>
            <WebHead pageTitle={`${order.order_brand_name} ${order.order_model_name} ${order.order_variant_name} | Book Service Package`} />
            <section className="package-service bg-grey comPad">
                <div className="extra-pd-rightleft">
                    <div className="wrapper">

                        <div className="row">
                            <div className="col-md-7">

                                <div className='formbx-white p-0  desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                        {/* <Link href={`/service-packages`} className='editcta'>Edit</Link> */}
                                    </div>
                                    <div className='vehicle-list-detail'>
                                        <ul>
                                            {/* <li>Reg. Year<span>{order.order_car_registration_year !== '' && order.order_car_registration_year !== undefined ? order.order_car_registration_year : ''}</span></li> */}
                                            <li>Brand<span>{order.order_brand_name !== '' && order.order_brand_name !== undefined ? order.order_brand_name : ''}</span></li>
                                            <li>Model<span>{order.order_model_name !== '' && order.order_model_name !== undefined ? order.order_model_name : ''}</span></li>
                                            <li>Variant<span>{order.order_variant_name !== '' && order.order_variant_name !== undefined ? order.order_variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{order.order_car_fuel_type !== '' && order.order_car_fuel_type !== undefined ? order.order_car_fuel_type : ''}</span></li>
                                            <li>KMs Driven<span>{order.order_car_kms !== '' && order.order_car_kms !== undefined ? numberFormatter(order.order_car_kms) : ''}</span></li>
                                        </ul>
                                    </div>
                                </div>


                                <ServiceCenterTab serviceCenterAddress={serviceCenterAddress} submitServiceCenterAddress={submitServiceCenterAddress} centerAddress={centerAddress} serviceCenterName={serviceCenterName} editServiceCenterTab={editServiceCenterTab} serviceCenterAddressHandler={serviceCenterAddressHandler} tinyLoader={tinyLoader} setTinyLoader={setTinyLoader} />



                                <AddressSelectionTab selectAddressTab={selectAddressTab} addressRadioAndAddTab={addressRadioAndAddTab} addNewAddressTab={addNewAddressTab} setAddNewAddressTab={setAddNewAddressTab} popUp={setPopUp} addAddressOpenClose={addAddressOpenClose} selectedAddressRadioButton={selectedAddressRadioButton} setSelectedAddressRadioButton={setSelectedAddressRadioButton} submitSelectedAddress={submitSelectedAddress} selctedAddressTab={selctedAddressTab} selectedAddressType={selectedAddressType} selectedFullAddress={selectedFullAddress} editSelectedAddressTab={editSelectedAddressTab} selectedAddressByUser={selectedAddressByUser} successMessage={successMessage} errorMessage={errorMessage} setCheckPinCode={setCheckPinCode} checkPinCode={checkPinCode} setAddressRadioAndAddTab={setAddressRadioAndAddTab} setSelctedAddressTab={setSelctedAddressTab} setVehicleInspactionDateTab={setVehicleInspactionDateTab} setSelectionInspactionDateTime={setSelectionInspactionDateTime} tinyLoader={tinyLoader} setTinyLoader={setTinyLoader} />


                                <InstpactionDateTimeTab vehicleInspactionDateTab={vehicleInspactionDateTab} selectionInspactionDateTime={selectionInspactionDateTime} dateConverterForValue={dateConverterForValue} submitSelectedDate={submitSelectedDate} selectedVehicleInspactionDateTab={selectedVehicleInspactionDateTab} selectedRadioDate={selectedRadioDate} setSelectedRadioDate={setSelectedRadioDate} editVehicaleInspactionDate={editVehicaleInspactionDate} setInsertSelectedDate={setInsertSelectedDate} insterSelectedDate={insterSelectedDate} bookedTimeSlot={bookedTimeSlot} setBookedTimeSlot={setBookedTimeSlot} radioSelectedDate={radioSelectedDate} setRadioSelectedDate={setRadioSelectedDate} tinyLoader={tinyLoader} setTinyLoader={setTinyLoader} submitPayAtWorkaShop={submitPayAtWorkaShop} />

                                <div className='formbx-white payment  button-payment' style={{ display: paymentsTab == false ? "none" : "block" }}>
                                    <h3>Payments</h3>
                                    <div className='nextstep' style={{ display: paymentsTab == false ? "none" : "block" }}>

                                        <div className='mobile-fixed-bg'>
                                            <button className='btn blueBdr' onClick={submitPayAtWorkaShop}>
                                                <ButtonSpinner load={tinyLoader} btnName={`Confirm`} />
                                            </button>
                                        </div>
                                        {/* <button className='btn arrow-style green-btn' onClick={submitPayNowBtn}>
                                            <ButtonSpinner load={tinyLoader} btnName={`Pay Now & Get INR 1500/- Off`} />
                                        </button> */}
                                    </div>
                                </div>


                            </div>

                            {/* <div className='mobile-style'>

                                <div className="proceed-to-pay payment payment-button " style={{ display: paymentsTab === false ? "none" : "block" }}>
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
                                        <div className='formbx-white p-0  mobile-view-hide'>
                                            <div className='border-heading relativediv'>
                                                <h3>Car Details</h3>
                                                {/* <Link href={`/service-packages`} className='editcta'>Edit</Link> */}
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                <ul>
                                                    {/* <li>Reg. Year<span>{order.order_car_registration_year !== '' && order.order_car_registration_year !== undefined ? order.order_car_registration_year : ''}</span></li> */}
                                                    <li>Brand<span>{order.order_brand_name !== '' && order.order_brand_name !== undefined ? order.order_brand_name : ''}</span></li>
                                                    <li>Model<span>{order.order_model_name !== '' && order.order_model_name !== undefined ? order.order_model_name : ''}</span></li>
                                                    <li>Variant<span>{order.order_variant_name !== '' && order.order_variant_name !== undefined ? order.order_variant_name : ''}</span></li>
                                                    <li>Fuel Type<span>{order.order_car_fuel_type !== '' && order.order_car_fuel_type !== undefined ? order.order_car_fuel_type : ''}</span></li>
                                                    <li>KMs Driven<span>{order.order_car_kms !== '' && order.order_car_kms !== undefined ? numberFormatter(order.order_car_kms) : ''}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default FinalServiceDetails;


