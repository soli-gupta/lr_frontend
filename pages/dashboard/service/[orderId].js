import React, { useEffect, useState } from 'react';
import 'swiper/css';
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ButtonSpinner, dateConverterForValue, fullDatabaseDateConverter, numberFormatter, weekDatesForForms } from '@/components/Helper';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import Loader from '@/components/common/Loader';
import LearnMore from '@/components/LearnMore';
import Link from 'next/link';

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
    const currentDate = todayDate.getDate();
    const todayMonth = todayDate.getMonth() + 1;
    const todayYear = todayDate.getFullYear();
    const todayTime = todayDate.getHours();
    const todayDay = todayYear + '-' + todayMonth + '-' + currentDate;

    const [tinyLoader, setTinyLoader] = useState(false);

    const [centerAddress, setCenterAddress] = useState('');
    const [serviceCenterName, setServiceCenterName] = useState('');
    const [serviceCenterAddress, setServiceCenterAddress] = useState(true);
    const [confirmationBtn, setConfirmationBtn] = useState(false)
    const [UserAddressForm, setUserAddressForm] = useState(false)
    // Address tab
    const [selectAddressTab, setSelectAddressTab] = useState(false);
    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [selectedAddressType, setSelectedAddressType] = useState('');
    const [selctedAddressTab, setSelctedAddressTab] = useState(false);
    const [addressRadioAndAddTab, setAddressRadioAndAddTab] = useState(false);
    const [selectedAddressRadioButton, setSelectedAddressRadioButton] = useState(true);

    const [address, setAddress] = useState('')

    // Address Form
    const [allAddress, setAllAddress] = useState([])
    const [checkPinCode, setCheckPinCode] = useState('');
    const [getCities, setGetCities] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [LearMore, setLearMore] = useState(false)
    // Inspaction Date Tab
    const [vehicleInspactionDateTab, setVehicleInspactionDateTab] = useState(false);
    const [dateLimit, setDateLimit] = useState(7);
    const [addNewAddressTab, setAddNewAddressTab] = useState(false);

    const [selectedVehicleInspactionDateTab, setSelectedVehicleInspactionDateTab] = useState(false);
    const [selectedRadioDate, setSelectedRadioDate] = useState(false);
    const [insterSelectedDate, setInsertSelectedDate] = useState('');

    const [dateTimeTab, setDateTimeTab] = useState(false)
    const [pickupCarTab, setPickupCarTab] = useState(false)


    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');

    const [pickupPersonFirstName, setPickupPersonFirstName] = useState('')
    const [pickupPersonLastName, setPickupPersonLastName] = useState('')
    const [pickupPersonMobile, setPickupMobile] = useState('')


    const [pickUpAddress, setPickUpaddress] = useState('')
    const [pickUpAddressType, setPickUpAddressType] = useState('')
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)


    // Payments Tab
    const [paymentsTab, setPaymentsTab] = useState(false);


    const serviceCenters = useSWR(`${Url}fetch-service-centers`, fetcher);
    const getStates = useSWR(`${Url}states`, fetcher);
    const fetchAddresses = useSWR(`${Url}user/fetch-all-address`, loggedFetcher);
    const { data, error } = useSWR(`${Url}user/edit-user-service?id=${orderId}`, loggedFetcher);

    const [userData, setUserData] = useState('')


    const userDatas = async () => {
        await axios.get(`${Url}user-profile`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setUserData(res.data.user)
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    const addressHandler = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

    }
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
            center_name: serviceCenterName,
            center_address: centerAddress,
            step_form: 2
        }
        setTinyLoader(true);
        await axios.post(`${Url}user/update-user-service/${orderId}`, getServiceCenterData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.step_form = 2;
                setServiceCenterName(serviceCenterName);
                setServiceCenterAddress(centerAddress);
                setTinyLoader(false);
                setServiceCenterAddress(false);
                setSelectAddressTab(true);
                setAddressRadioAndAddTab(true);
                setSelctedAddressTab(false);
                setSelectedAddressRadioButton(true);
                setAddNewAddressTab(false);
                setConfirmationBtn(false)
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

            setSelectedAddressType($getDefaultAddressType);
            setSelectedFullAddress(`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            fullAddress = (`${$getDefaultFullAddress} ${$getUserDefaultCity}, ${$getUserDefaultState} - ${$getUserDefaultPinCode}`);
            getAddressType = $getDefaultAddressType;
        }


        const getUserAddressData = {
            address_type: getAddressType !== '' && getAddressType !== undefined ? getAddressType : selectedAddressType,
            full_address: fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress,
            step_form: 3
        }

        await axios.post(`${Url}user/update-user-service/${orderId}`, getUserAddressData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.step_form = 3;
                setAddressRadioAndAddTab(false);
                setSelctedAddressTab(true);
                setVehicleInspactionDateTab(true);
                setSelectedAddressType(getAddressType !== '' && getAddressType !== undefined ? getAddressType : selectedAddressType);
                setSelectedFullAddress(fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress);
            }
        }).catch((e) => {
            setPopUp(true);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 0) {
                setErrorMessage(e.response.data.message);
            }
        });
    }


    // const addAddressOpenClose = () => {
    //     setAddNewAddressTab(!addNewAddressTab);
    //     const readioChecked = document.querySelector("input[type=radio][name=address_radio_btn]:checked");
    //     if (readioChecked && readioChecked.checked === true) {
    //         readioChecked.checked = false;
    //     }
    //     setSelectedAddressRadioButton(false);
    // }

    const addAddressOpenClose = () => {

        document.getElementById('selectAddressRadioBtn').style.display = 'none'
        var radio = document.querySelector('input[type=radio][name=pickup-select]:checked');
        if (radio && radio.checked === true) {
            radio.checked = false;
        }
        setUserAddressForm(!UserAddressForm);
    }

    const saveUserAddressDetail = async (e) => {
        let createError = 0;
        e.preventDefault();

        if (e.target.address_type.value.length <= 0) {
            document.getElementById('addressTypeNameError').innerHTML = 'Please select address type.';
            document.getElementById("addressTypeNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('addressTypeNameError').innerHTML = '';
                document.getElementById("addressTypeNameError").style.display = "none";
            }, 3000);
            createError++;
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
            document.getElementById('addressError').innerHTML = 'Please enter you full address.';
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

        const form = new FormData(document.getElementById('userDivAddressForm'))
        var userAddressInfo = {};
        form.forEach(function (value, key) {
            userAddressInfo[key] = value;
        });
        await axios.post(`${Url}user/save-new-user-address`, form, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setAllAddress(res.data.allAddress)
                // setTimeout(() => {
                setPopUp(true)
                setSuccessMessage(res.data.message)
                var radios = document.querySelector('input[type=radio][name=pickup-select]:checked');
                if (radios && radios.checked === false) {
                    radios.checked = true
                }
                // })
                document.getElementById('userDivAddressForm').reset();
                document.getElementById('selectAddressRadioBtn').style.display = 'block'
                setUserAddressForm(false)
            }
        }).catch((e) => {
            if (e && e.response.data === 0) {
                alert(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        });



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

    const OpenLearn = () => {
        setLearMore(true)
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';

        }
    }

    const closeLearnMorePop = () => {
        setPopUp(false)
        setLearMore(false)
        if (typeof window !== "undefined") {

            document.body.className = '';
        }
    }

    const closePopUp = () => {
        setPopUp(false);
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
                setAllAddress(res.data.allAddress)
                setAddressRadioAndAddTab(true);
                setDateTimeTab(true)
                setSelctedAddressTab(false);
                setVehicleInspactionDateTab(false);
                setCheckPinCode('');
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

        // if ($getSelectedTime.checked === false || $getSelectedTime[0] === undefined) {
        //     document.getElementById('selectedTimeError').innerHTML = 'Please select time.';
        //     document.getElementById("selectedTimeError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('selectedTimeError').innerHTML = ' ';
        //         document.getElementById("selectedTimeError").style.display = "none";
        //     }, 3000);
        //     return false;
        // }

        const getSelectedDateTimeData = {
            slot_day: insterSelectedDate,
            // slot_time: bookedTimeSlot,
            step_form: 4
        }

        await axios.post(`${Url}user/update-user-service/${orderId}`, getSelectedDateTimeData, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                order.step_form = 4;
                setVehicleInspactionDateTab(false);
                setSelectedVehicleInspactionDateTab(true);
                setInsertSelectedDate(insterSelectedDate);
                setBookedTimeSlot(bookedTimeSlot);
                setConfirmationBtn(false)
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

    const handlePickUpCar = () => {
        var pickup = document.querySelector('input[name = pickcar]:checked').value;
        if (pickup === "yes") {
            setStep1(true)
            setStep2(false)


        }
        if (pickup == "no") {
            setStep1(false)
            setStep2(true)

        }
    }

    const selectPickUpAddress = (type, address, city, state, pincode) => {
        document.getElementById('selectAddressRadioBtn').style.display = 'block'
        setPickUpaddress(`${address} ${city}, ${state} - ${pincode}`);
        setPickUpAddressType(type)
        setUserAddressForm(false);

    }

    const savePickUpCarDetail = async (e) => {
        if (typeof window !== "undefined") {
            document.body.classList.add('double-big-btns');
        }
        var radios = document.querySelector('input[type=radio][name=pickup-select]:checked');
        let data = ''
        if (radios && radios.checked === true) {
            data = radios.value
        }
        if (pickUpAddressType === '' || pickUpAddressType === undefined) {
            let address_Type = document.getElementById('pickup-address-type').value
            let state = document.getElementById('pickup-user-state').value
            let city = document.getElementById('pickup-user-city').value
            let full_address = document.getElementById('pickup-user-full-address').value
            let pincode = document.getElementById('pickup-user-pincode').value
            setPickUpAddressType(address_Type)
            setPickUpaddress(`${full_address} ${city}, ${state} - ${pincode}`)
        }

        const form_step = {
            'step_form': 5,
            'pickup_car': 'yes',

        }

        setTinyLoader(true);

        const formData = { ...{ 'pickup_car_address': data, 'pickup_car_address_type': pickUpAddressType }, ...form_step }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${orderId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setStep1(false)
                    order.step_form = 5
                    order.pickup_car = "yes"
                    order.pickup_car_address_type = selectedAddressType ? selectedAddressType : pickUpAddressType
                    order.pickup_car_address = selectedFullAddress ? selectedFullAddress : data
                    setConfirmationBtn(true)
                    // setStep2(true)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });


    }
    const savePickUpPersonDetail = async (e) => {
        if (typeof window !== "undefined") {
            document.body.classList.add('double-big-btns');
        }
        e.preventDefault();
        let createError = 0;

        if (e.target.pickup_person_first_name.value.length <= 0) {
            document.getElementById('errorPickupPersonFirstName').innerHTML = 'Please enter your first name';
            document.getElementById("errorPickupPersonFirstName").style.display = "block";
            setTimeout(() => {
                document.getElementById('errorPickupPersonFirstName').innerHTML = '';
                document.getElementById("errorPickupPersonFirstName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.pickup_person_last_name.value.length <= 0) {
            document.getElementById('errorPickupPersonLastName').innerHTML = 'Please enter your last name';
            document.getElementById("errorPickupPersonLastName").style.display = "block";
            setTimeout(() => {
                document.getElementById('errorPickupPersonLastName').innerHTML = '';
                document.getElementById("errorPickupPersonLastName").style.display = "none";
            }, 3000);
            createError++;
        }


        if (e.target.pickup_person_mobile.value.length <= 0) {
            document.getElementById('errorPickupPersonMobile').innerHTML = 'Please enter your mobile number';
            document.getElementById("errorPickupPersonMobile").style.display = "block";
            setTimeout(() => {
                document.getElementById('errorPickupPersonMobile').innerHTML = '';
                document.getElementById("errorPickupPersonMobile").style.display = "none";
            }, 3000);
            createError++;
        }
        if (e.target.pickup_person_mobile.value.length != 10) {
            document.getElementById('errorPickupPersonMobile').innerHTML = 'Please enter 10 digits mobile number';
            document.getElementById("errorPickupPersonMobile").style.display = "block";
            setTimeout(() => {
                document.getElementById('errorPickupPersonMobile').innerHTML = '';
                document.getElementById("errorPickupPersonMobile").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            return false;
        }

        const form_step = {
            'step_form': 5,
            'pickup_car': 'no',

        }
        const formData = { ...{ 'pickup_person_name': pickupPersonFirstName ? pickupPersonFirstName + ' ' + pickupPersonLastName : userData && userData.first_name + ' ' + userData.last_name, 'pickup_person_mobile': pickupPersonMobile ? pickupPersonMobile : userData && userData.mobile }, ...form_step }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${orderId}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setStep2(false)
                    order.step_form = 5
                    order.pickup_car = "no"
                    order.pickup_person_name = pickupPersonFirstName + ' ' + pickupPersonLastName
                    order.pickup_person_mobile = pickupPersonMobile
                    // setPaymentsTab(true)
                    setConfirmationBtn(true)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }

    const submitCarCarePayment = async () => {
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${orderId}`, { 'step_form': 6 }, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    router.push(`/service/thank-you?id=${orderId}`)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }
    const userAllAddress = async () => {
        await axios.get(`${Url}user/fetch-all-address`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setAllAddress(res.data.address)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        userAllAddress()
        userDatas()
        $("#pickup_person_first_name").keypress(function (e) {
            var keyCode = e.keyCode || e.which;
            var regex = /^[A-Za-z]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                console.log("Only Alphabets allowed.")
            }

            return isValid;
        });
        $("#pickup_person_last_name").keypress(function (e) {
            var keyCode = e.keyCode || e.which;
            var regex = /^[A-Za-z]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                console.log("Only Alphabets allowed.")
            }

            return isValid;
        });

        $('.numberonly').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });
    }, [])

    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    order = data !== undefined && data.data !== undefined && data.data !== '' ? data.data : <Loader loaderTitle={`Loading...`} />;

    return (
        <>
            <WebHead pageTitle={`${order.brand_name} ${order.model_name} | Booked Car Care`} />
            {/* <WebsiteLayout> */}
            <section className="package-service bg-grey comPad">
                <div className="wrapper">
                    <div className='extra-pd-rightleft'>

                        <div className="row">
                            <div className="col-md-7">
                                <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                        <a href='' className='editcta'>Edit</a>
                                    </div>
                                    <div className='vehicle-list-detail'>
                                        <ul>
                                            <li>Brand<span>{order.brand_name !== undefined ? order.brand_name : ''}</span></li>
                                            <li>Model<span>{order.model_name !== undefined ? order.model_name : ''}</span></li>
                                            <li>Variant<span>{order.variant_name !== undefined ? order.variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{order.fuel_type !== undefined ? order.fuel_type : ''}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='formbx-white preferred-service-center'>
                                    {
                                        order.step_form === 1 ?
                                            <>
                                                <h3 style={{ display: order.step_form === 1 ? "block" : serviceCenterAddress === false ? "none" : "block" }}  >Select Preferred Service Centre</h3>

                                                <div style={{ display: order.step_form === 1 ? "block" : serviceCenterAddress === false ? "none" : "block" }}>
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
                                                        </ul>
                                                        <small id="serviceCenterError" className="error" style={{ display: 'none' }}></small>
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
                                                <div className='nextstep-edit editowner-details' style={{ display: order.step_form >= 2 ? "block" : "none" }}>
                                                    <ul>
                                                        <li>
                                                            <div className='iconedit'>
                                                                <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                                                            </div>
                                                            <div className='editinfo-owner'>

                                                                <h4>Preferred Service Centre</h4>
                                                                <div className="ownername">{order.center_name !== undefined && order.center_name !== '' ? order.center_name : serviceCenterName}</div>
                                                                <p>{order.center_address !== undefined && order.center_address !== '' ? order.center_address : serviceCenterAddress}</p>
                                                            </div >
                                                        </li>
                                                    </ul>
                                                </div>
                                            </>
                                    }
                                </div>

                                {/* 
                                <div className='formbx-white add-address' style={{ display: order.step_form >= 2 ? "block" : selectAddressTab === false ? "none" : "block" }}>
                                    <h3 style={{ display: order.step_form === 1 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>Select/Add Address For Vehicle Inspection</h3>
                                    <p style={{ display: order.step_form === 1 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>Select from saved address or add a new address</p>
                                    {

                                        order.step_form === 2 ?
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
                                                                        <select name="city" id="city_name">
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

                                                <div className='option-address' style={{ display: order.step_form === 2 ? "block" : addressRadioAndAddTab === false ? "none" : "block" }}>
                                                    <ul className='selectaddress'>

                                                        {
                                                            allAddress !== undefined && allAddress.map((addr, i) => {

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

                                                    <div className='form-input mg-0' style={{ display: selectedAddressRadioButton === false ? "none" : "block" }}>
                                                        <button href="javascript:void(0)" className='btn arrow-style blue-btn' onClick={submitSelectedAddress}>
                                                            <span>Save & Continue</span>
                                                        </button>
                                                    </div>
                                                </div>

                                            </> :
                                            <>


                                                <div className='nextstep-edit editowner-details' style={{ display: order.step_form >= 3 ? "block" : "none" }}>
                                                    <ul>
                                                        <li>
                                                            <div className='iconedit'>
                                                                <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                            </div>
                                                            <div className='editinfo-owner'>
                                                                <h4>Address</h4>
                                                                <div className="ownername">{order.address_type !== undefined && order.address_type !== '' ? order.address_type : selectedAddressType}</div>
                                                                <p>{order.full_address !== undefined && order.full_address !== '' ? order.full_address : selectedFullAddress}</p>
                                                            </div>
                                                        </li>
                                                    </ul>

                                                </div>
                                            </>
                                    }


                                </div> */}

                                <div className='formbx-white add-time-date' style={{ display: order.step_form >= 2 ? "block" : dateTimeTab === false ? "none" : "block" }} >
                                    <h3 style={{ display: order.step_form === 2 ? "block" : vehicleInspactionDateTab == false ? "none" : "block" }}>Select Date For Service</h3>
                                    <div className='nextstep' style={{ display: order.step_form >= 2 ? "block" : vehicleInspactionDateTab == false ? "none" : "block" }}>
                                        {
                                            order.step_form === 2 ? <>

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


                                                {/* <div className='style-box time-slot no-border add-time-date'>
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

                                                </div> */}

                                                <div className='form-input mg-0'>
                                                    <button className='btn arrow-style blue-btn' onClick={submitSelectedDate}>
                                                        <span>Save & Continue</span>
                                                    </button>
                                                </div>

                                            </> :
                                                <>
                                                    <div className='nextstep-edit editowner-details' style={{ display: order.form_setp >= 3 ? "block" : "" }}>
                                                        <ul>
                                                            <li>
                                                                <div className='iconedit'>
                                                                    <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                                                </div>
                                                                <div className='editinfo-owner'>
                                                                    <h4>Date</h4>
                                                                    <p>
                                                                        {order.slot_day !== undefined && order.slot_day !== '' ?
                                                                            <>
                                                                                {`${fullDatabaseDateConverter(order.slot_day).weekDay}, ${fullDatabaseDateConverter(order.slot_day).day} ${fullDatabaseDateConverter(order.slot_day).month}, ${fullDatabaseDateConverter(order.slot_day).year}`}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {`${fullDatabaseDateConverter(insterSelectedDate).weekDay}, ${fullDatabaseDateConverter(insterSelectedDate).day} ${fullDatabaseDateConverter(insterSelectedDate).month}, ${fullDatabaseDateConverter(insterSelectedDate).year}`}
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

                                <div className='formbx-white ask-car-pickup' style={{ display: order.step_form >= 3 ? "block" : pickupCarTab === false ? "none" : "block" }}>
                                    <div className="carpickup" style={{ display: `${order.step_form === 4 ? 'block' : 'none'}` }}>
                                        <h3>Shall We Pick Your Car Up?</h3>
                                        <ul>
                                            <li>
                                                <input type="radio" name="pickcar" id="ans1" defaultValue="yes" onChange={(e) => handlePickUpCar(e.target.value)} />
                                                <label htmlFor="ans1" className="option">
                                                    Yes
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="pickcar" id="ans2" defaultValue="no" onChange={(e) => handlePickUpCar(e.target.value)} />
                                                <label htmlFor="ans2" className="option">
                                                    No Thanks
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='nextstep top-bottom-gap-adress' style={{ display: UserAddressForm === true ? 'block' : 'none' }}>
                                        <div className='new-address-add'>
                                            <form onSubmit={(e) => saveUserAddressDetail(e)} id="userDivAddressForm" method='POST'>
                                                <h3>Select/Add New Address</h3>
                                                <p>Select from saved address or add a new address</p>
                                                <h3>Add New Address</h3>
                                                <div className='select-address-type'>
                                                    <label className='selectAddresstxt'>Select address type*</label>
                                                    <ul>
                                                        <li>
                                                            <input type="radio" name="address_type" id="addresstype" defaultValue="Home" defaultChecked={address ? 'Home' === address.address_type : ''} onChange={(e) => addressHandler(e)} />
                                                            <label htmlFor="addresstype" className="option">Home</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" name="address_type" id="addresstype1" defaultValue="Work" defaultChecked={address ? 'Work' === address.address_type : ''} onChange={(e) => addressHandler(e)} />
                                                            <label htmlFor="addresstype1" className="option">Work</label>
                                                        </li>
                                                        <li>
                                                            <input type="radio" name="address_type" id="addresstype2" defaultValue="Other" defaultChecked={address ? 'Other' === address.address_type : ''} onChange={(e) => addressHandler(e)} />
                                                            <label htmlFor="addresstype2" className="option">Other</label>
                                                        </li>
                                                        <small id="addressTypeNameError" className="error"></small>
                                                    </ul>
                                                </div>

                                                <div className='row'>
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
                                                            <small id="stateNameError" className="error"></small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-input'>
                                                            <label>Select City*</label>
                                                            <select name="city" id="city_name">
                                                                <option value={``}>Select City</option>
                                                                {
                                                                    getCities !== undefined && getCities.map((city, i) => {
                                                                        return (
                                                                            <option value={city.name} key={i}>{city.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <small id="cityNameError" className="error"></small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-input'>
                                                            <label>Full Address*</label>
                                                            <input type='text' placeholder='Enter your full address' name="full_address" defaultValue={''} onChange={(e) => addressHandler(e)} />
                                                            <small id="addressError" className="error"></small>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className='form-input'>
                                                            <label>Pincode</label>
                                                            <input type='text' className='numberonly' maxLength={6} placeholder='Enter Your Pincode' name="pincode" onChange={(e) => addressHandler(e)} defaultValue={''} />
                                                            <p className='error' id="pincodeError"></p>
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

                                    <div className="select-yes" style={{ display: `${step1 === true ? 'block' : 'none'}` }}>
                                        {/* <div className='choose-exiting-address'>
                                            <h3>Choose from Saved Address</h3>

                                            <ul className='selectaddress'>
                                                {
                                                    fetchAddresses !== undefined && fetchAddresses !== '' && fetchAddresses.data !== undefined && fetchAddresses.data !== undefined && fetchAddresses.data.address !== '' && fetchAddresses.data.address.map((addr, i) => {
                                                        return (

                                                            <li key={addr._id}>
                                                                {console.log(fetchAddresses.data.address)}
                                                                <input type="radio" name="pickcar" defaultValue="yes" />
                                                                 
                                                                <input type="hidden" id="pickup-address-type" value={addr.address_type} />
                                                                <input type="hidden" id="pickup-user-state" defaultValue={addr.state} />
                                                                <input type="hidden" id="pickup-user-city" defaultValue={addr.city} />
                                                                <input type="hidden" id="pickup-user-full-address" defaultValue={addr.full_address} />
                                                                <input type="hidden" id="pickup-user-pincode" defaultValue={addr.pincode} />

                                                                <input type="radio" name="pickup-select" id={`pickup-option_${i}`} defaultValue={`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`} onChange={(e) => selectPickUpAddress(addr.address_type, addr.full_address, addr.city, addr.state, addr.pincode)} defaultChecked={!(!!i)} />

                                                                <label htmlFor={`pickup-option_${i}`} className="option">
                                                                    <div className="dot"></div>
                                                                    <div className='addresstype'>{addr.address_type}</div>
                                                                    <p>{`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`}</p>
                                                                </label>
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
                                            <div className='col-md-12'>
                                                <div className='form-input'>
                                                    <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => savePickUpCarDetail()}>
                                                        <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className='choose-exiting-address'>
                                            <h3>Select/Add New Address</h3>

                                            <ul className='selectaddress'>
                                                {
                                                    allAddress !== undefined && allAddress.map((addr, i) => {
                                                        return (

                                                            <li key={addr._id}>
                                                                <input type="radio" name="pickcar" defaultValue="yes" />
                                                                {/* {console.log(addr)} */}
                                                                <input type="hidden" id="pickup-address-type" defaultValue={addr.address_type} />
                                                                <input type="hidden" id="pickup-user-state" defaultValue={addr.state} />
                                                                <input type="hidden" id="pickup-user-city" defaultValue={addr.city} />
                                                                <input type="hidden" id="pickup-user-full-address" defaultValue={addr.full_address} />
                                                                <input type="hidden" id="pickup-user-pincode" defaultValue={addr.pincode} />

                                                                <input type="radio" name="pickup-select" id={`pickup-option_${i}`} defaultValue={`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`} onChange={(e) => selectPickUpAddress(addr.address_type, addr.full_address, addr.city, addr.state, addr.pincode)} defaultChecked={!(!!i)} />

                                                                <label htmlFor={`pickup-option_${i}`} className="option">
                                                                    <div className="dot"></div>
                                                                    <div className='addresstype'>{addr.address_type}</div>
                                                                    <p>{`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`}</p>
                                                                </label>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                {allAddress && allAddress.length > 0 ?
                                                    <li className='addnew-icon' onClick={addAddressOpenClose}>
                                                        <div className='flex-wrap-text'>
                                                            <div className='plusicon'>
                                                                <img src='/img/plus-icon.svg' />
                                                            </div>
                                                            <span>Add New Addesss</span>
                                                        </div>
                                                    </li>
                                                    : ''}
                                            </ul>
                                            {allAddress && allAddress.length > 0 ?
                                                <div className='col-md-12'>
                                                    <div className='form-input'>
                                                        <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => savePickUpCarDetail()}><ButtonSpinner load={tinyLoader} btnName="Save & Continue" /></button>
                                                    </div>
                                                </div> : ''}
                                            {/* <div className='col-md-12'>
                                                <div className='form-input'>
                                                    <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => savePickUpCarDetail()}>
                                                        <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                    </button>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="select-no" style={{ display: `${step2 === true ? 'block' : 'none'}` }}>
                                        <p>Who will be dropping off your car? Please share their contact details</p>
                                        <p>This person can be different from you so feel free to change name & mobile number</p>

                                        <form onSubmit={(e) => savePickUpPersonDetail(e)}>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='form-input'>
                                                        <label>First Name*</label>
                                                        <input type='text' id="pickup_person_first_name" name="pickup_person_first_name" placeholder='Enter your first name' onChange={(e) => setPickupPersonFirstName(e.target.value)} defaultValue={pickupPersonFirstName ? pickupPersonFirstName : userData ? userData.first_name : ''} />
                                                        <small id="errorPickupPersonFirstName" className="error"></small>
                                                    </div >
                                                </div >
                                                <div className='col-md-6'>
                                                    <div className='form-input'>
                                                        <label>Last Name*</label>
                                                        <input type='text' id="pickup_person_last_name" name="pickup_person_last_name" placeholder='Enter your last name' onChange={(e) => setPickupPersonLastName(e.target.value)} defaultValue={pickupPersonLastName ? pickupPersonLastName : userData ? userData.last_name : ''} />
                                                        <small id="errorPickupPersonLastName" className="error"></small>
                                                    </div >
                                                </div >
                                                <div className='col-md-6'>
                                                    <div className='form-input'>
                                                        <label>Mobile Number*</label>
                                                        <input type='text' placeholder='Enter your mobile number*' name="pickup_person_mobile" className="numberonly" onChange={(e) => setPickupMobile(e.target.value)} maxLength={10} defaultValue={pickupPersonMobile ? pickupPersonMobile : userData ? userData.mobile : ''} />
                                                        <small id="errorPickupPersonMobile" className="error"></small>
                                                    </div>

                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-input mg-0'>
                                                        <button className='btn arrow-style blue-btn'  >
                                                            <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                    {order.pickup_car === "yes" ?
                                        <div className='nextstep-edit editowner-details' style={{ display: `${order.step_form >= 5 === true ? 'block' : 'none'}` }}>
                                            <ul>
                                                <li>
                                                    <div className='iconedit'>
                                                        <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                    </div>

                                                    <div className='editinfo-owner'>
                                                        <h4>Car Pickup Address</h4>
                                                        <div className="ownername">{order.pickup_car_address_type}</div>
                                                        <p>{order.pickup_car_address}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        : ''}

                                    {order.pickup_car === 'no' ?
                                        <div className='nextstep-edit editowner-details' style={{ display: `${order.step_form >= 5 ? 'block' : 'none'}` }}>
                                            <ul>
                                                <li>
                                                    <div className='iconedit'>
                                                        <img src="/img/drop-user.svg" alt="Luxury Ride" />
                                                    </div>
                                                    <div className='editinfo-owner'>
                                                        <h4>Car To Be Dropped By</h4>
                                                        <div className="ownername">{`${pickupPersonFirstName ? pickupPersonFirstName : userData && userData.first_name} ${pickupPersonLastName ? pickupPersonLastName : userData && userData.last_name}`}</div>
                                                        <p>{pickupPersonMobile ? pickupPersonMobile : userData && userData.mobile}</p>
                                                    </div>
                                                    {/* {order.pickup_person_name ?
                                                     <div className='editinfo-owner'>
                                                        <h4>Car To Be Dropped By</h4>
                                                        <div className="ownername">{order.pickup_person_name}</div>
                                                        <p>{order.pickup_person_mobile}</p>

                                                    </div>
                                                        : ''} */}

                                                </li>
                                            </ul>
                                        </div>
                                        : ''}
                                </div>


                                <div className='mobile-fixed-bg'>
                                    <Link href={'#'} className='schedule-evaluation text-center' style={{ display: confirmationBtn === true ? 'block' : 'none' }} onClick={() => submitCarCarePayment()}>
                                        <ButtonSpinner load={tinyLoader} btnName="Submit" />

                                    </Link>
                                </div>


                            </div>

                            <div className="col-md-5">
                                <div className='sticky-div'>
                                    <div className="nextstep">
                                        <div className='formbx-white p-0 mobile-view-hide'>
                                            <div className='border-heading relativediv'>
                                                <h3>Vehicle Details</h3>
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                <ul>
                                                    <li>Brand<span>{order.brand_name !== undefined ? order.brand_name : ''}</span></li>
                                                    <li>Model<span>{order.model_name !== undefined ? order.model_name : ''}</span></li>
                                                    <li>Variant<span>{order.variant_name !== undefined ? order.variant_name : ''}</span></li>
                                                    <li>Fuel Type<span>{order.fuel_type !== undefined ? order.fuel_type : ''}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='order-cancle'>Cancel anytime, fully refundable. <span onClick={OpenLearn} className='btnunderline'>Learn more</span></div>
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
                        </div >
                    </div>
                </div >
            </section >
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePopUp} /> : ''}
            {/* </WebsiteLayout > */}
            {LearMore ? <LearnMore closePop={closeLearnMorePop} />
                : ""
            }
        </>
    )
}


export default FinalServiceDetails;
