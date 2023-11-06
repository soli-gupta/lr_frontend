import React, { useEffect, useState } from 'react';
import 'swiper/css';
import "swiper/css/pagination";
import { weekDatesForForms, dateConverterForValue, capitalizeFirstLetter, ButtonSpinner, onlyAlphaValidation, databaseDateConverter } from '@/components/Helper';
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import SmallSuccessPopUp from '../../components/smallSuccessPopUp';
import { $ } from 'react-jquery-plugin';
import LearnMore from '@/components/LearnMore';
import Link from 'next/link';

const fetch = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
});

const fetcher = (url) => axios.get(url).then(res => res.data)

export default function CareOwnerInfo() {
    const router = useRouter()
    const id = router.query.orderId
    const Url = process.env.NEXT_PUBLIC_URL;
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    // let hrs = date.getHours()
    // let today = `${year}-${month}-${day}`

    const todayDate = new Date();
    const hrs = todayDate.getHours();
    const today = dateConverterForValue(databaseDateConverter(todayDate).day, databaseDateConverter(todayDate).month, databaseDateConverter(todayDate).year);


    const [allAddress, setAllAddress] = useState([])

    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [fullAddress, setFullAddress] = useState({})
    const [addressType, setAddressType] = useState('')
    const [tinyLoader, setTinyLoader] = useState(false);
    const [UserAddressForm, setUserAddressForm] = useState(false)
    const [getCities, setGetCities] = useState([]);
    const [address, setAddress] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [editUserAddressForm, setEditUserAddressForm] = useState(false)
    const [dateTimeData, setDateTimeData] = useState('')


    const [centerAddress, setCenterAddress] = useState('');
    const [serviceCenterName, setServiceCenterName] = useState('');


    const [pickUpAddress, setPickUpaddress] = useState('')
    const [pickUpAddressType, setPickUpAddressType] = useState('')

    const [pickupPersonFirstName, setPickupPersonFirstName] = useState('')
    const [pickupPersonLastName, setPickupPersonLastName] = useState('')
    const [pickupPersonMobile, setPickupMobile] = useState('')

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [LearMore, setLearMore] = useState(false)
    const [confirmationBtn, setConfirmationBtn] = useState(false)
    const [dateLimit, setDateLimit] = useState(7);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)
    const [step7, setStep7] = useState(false)
    const [step8, setStep8] = useState(false)
    const [step9, setStep9] = useState(false)
    const [step10, setStep10] = useState(false)
    const [step11, setStep11] = useState(false)
    const [step12, setStep12] = useState(false)
    const [step13, setStep13] = useState(false)
    const [step14, setStep14] = useState(false)
    const [step15, setStep15] = useState(false)

    const [userData, setUserData] = useState('')
    const [selectedServices, setSelectedServices] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [gst, setGst] = useState(0)
    const [grandPrice, setGrandPrice] = useState(0)

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

    const closePop = () => {
        setPopUp(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    const closeLearnMorePop = () => {
        setPopUp(false)
        setLearMore(false)
        if (typeof window !== "undefined") {

            document.body.className = '';
        }
    }

    const OpenLearn = () => {

        setLearMore(true)
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';

        }
    }

    const serviceCenterAddressHandler = (name, address) => {
        setServiceCenterName(name);
        setCenterAddress(address);
    }

    const saveExpericenceCenter = async () => {
        if (serviceCenterName === '') {
            document.getElementById('serviceCenterError').innerHTML = 'Please select preferred service centre.';
            document.getElementById("serviceCenterError").style.display = "block";
            setTimeout(() => {
                document.getElementById('serviceCenterError').innerHTML = '';
                document.getElementById("serviceCenterError").style.display = "none";
            }, 3000);
            return false;
        }
        const stepForm1 = document.getElementById('step_form1').value
        const data = {
            center_name: serviceCenterName,
            center_address: centerAddress,
            step_form: 3
        }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setStep1(false)
                    setStep2(true)
                    setStep3(true)
                    setEditUserAddressForm(false)
                    setStep4(false)
                    setStep5(true)
                    setStep6(true)
                    setStep7(false)
                    setStep8(false)
                    setStep9(false)
                    setStep13(false)
                    setStep14(false)
                    setConfirmationBtn(false)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                // if (e && e.message) {
                //     setCallErrorMessage(e.message)
                // } else if (e && e.response.data.status === 0) {
                //     setCallErrorMessage(e.response.data.message);
                // } else if (e && e.response.data.status === 2) {
                //     setCallErrorMessage(e.response.data.message);
                // }
            });

    }

    const editExpericenceCenter = () => {
        if (typeof window !== "undefined") {
            document.body.classList.add('double-big-btns');
        }
        setStep1(true)
        setStep2(false)
        setStep3(false)
        setStep4(false)
        setStep5(false)
        setStep6(false)
        setStep7(false)
        setStep8(false)
        setStep9(false)
        setStep13(false)
        setStep14(false)
        setConfirmationBtn(false)
    }

    useEffect(() => {
        userAllAddress()
        userDatas()
    }, [id])

    const fetchAddresses = useSWR(`${Url}user/fetch-all-address`, fetch)
    const carDetail = useSWR(`${Url}user/edit-user-service?id=${id}`, fetch)

    const getStates = useSWR(`${Url}states`, fetcher);
    const serviceCenters = useSWR(`${Url}fetch-service-centers`, fetcher);

    const getCitiesByState = async (stateId) => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
            if (res.data.status == 1) {
                setGetCities(res.data.cities)

            }
        }).catch(function (error) {
            console.log(error)

        });
    }

    const selectedAddressByUser = (type, address, city, state, pincode) => {

        document.getElementById('selectAddressRadioBtn').style.display = 'block'

        setSelectedFullAddress(`${address} ${city}, ${state} - ${pincode}`);
        setAddressType(type)
        setFullAddress({
            address_type: type,
            state: state,
            city: city,
            full_address: address,
            pincode: pincode

        })
        setUserAddressForm(false);
    }

    const addAddressOpenClose = () => {
        setFullAddress({
            address_type: '',
            state: '',
            city: '',
            full_address: '',
            pincode: ''
        })
        document.getElementById('selectAddressRadioBtn').style.display = 'none'
        var radio = document.querySelector('input[type=radio][name=pickup-select]:checked');
        if (radio && radio.checked === true) {
            radio.checked = false;
        }
        setUserAddressForm(!UserAddressForm);
    }

    const addressHandler = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

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
                setEditUserAddressForm(false)
            }
        }).catch((e) => {
            if (e && e.response.data === 0) {
                alert(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        });

        document.getElementById('selectAddressRadioBtn').style.display = 'block'
        setUserAddressForm(false)

    }
    const saveSelectedAddress = async (e) => {
        // var radios = document.querySelector('input[type=radio][name=select]:checked');
        // if (radios && radios.checked === true) {
        //     setSelectedFullAddress(radios.value)
        // }
        let fullAddress = '';
        let getAddressType = '';
        if (addressType === '' || addressType === undefined) {
            let address_Type = document.getElementById('address-type').value
            let state = document.getElementById('user-state').value
            let city = document.getElementById('user-city').value
            let full_address = document.getElementById('user-full-address').value
            let pincode = document.getElementById('user-pincode').value
            setAddressType(address_Type)

            // setFullAddress({
            //     address_type: address_Type,
            //     state: state,
            //     city: city,
            //     full_address: full_address,
            //     pincode: pincode

            // })
            setSelectedFullAddress(`${full_address}, ${city}, ${state} - ${pincode}`)
            fullAddress = (`${full_address} ${city}, ${state} - ${pincode}`);
            getAddressType = address_Type;
        }
        const form_step = {
            'step_form': 4
        }
        const getUserAddressData = {
            address_type: getAddressType !== '' && getAddressType !== undefined ? getAddressType : addressType,
            full_address: fullAddress !== '' && getAddressType !== undefined ? fullAddress : selectedFullAddress,
            step_form: 4
        }

        const formData = { ...fullAddress, ...form_step }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, getUserAddressData, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setEditUserAddressForm(true)
                    setStep4(true)
                    setStep5(true)
                    setStep6(true)
                    setStep7(false)
                    setStep8(false)
                    setStep9(false)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });


    }


    const editUserAddress = () => {
        if (typeof window !== "undefined") {
            document.body.classList.add('double-big-btns');
        }
        setStep3(true)
        setEditUserAddressForm(false)
        setStep4(false)
        setStep5(false)
        setStep6(false)
        setStep7(false)
        setStep8(false)
        setStep9(false)
    }

    const dateTimeHandle = (e) => {
        if (dateTime && dateTime.slot_time && e.target.value === today) {
            var radio = document.querySelector('input[type=radio][name=slot_time]:checked');
            if (radio && radio.checked === true) {
                radio.checked = false;
            }
        }
        setDateTime((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const saveDateTimeSlot = async (e) => {
        let createError = 0;
        e.preventDefault();
        if (e.target.slot_day.value.length <= 0) {
            document.getElementById('slotDateError').innerHTML = 'Please select date.';
            document.getElementById("slotDateError").style.display = "block";
            setTimeout(() => {
                document.getElementById('slotDateError').innerHTML = '';
                document.getElementById("slotDateError").style.display = "none";
            }, 3000);
            createError++;
        }

        // if (e.target.slot_time.value.length <= 0) {
        //     document.getElementById('slotTimeError').innerHTML = 'Please select time.';
        //     document.getElementById("slotTimeError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('slotTimeError').innerHTML = '';
        //         document.getElementById("slotTimeError").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        const form = new FormData(document.getElementById('dayAndTimeForm'))
        var timeInfo = {};
        form.forEach(function (value, key) {
            timeInfo[key] = value;
        });
        setDateTime(timeInfo)
        var timeInfoRes = JSON.stringify(timeInfo);
        localStorage.setItem('date-sell-detail', timeInfoRes)
        if (dateTime && dateTime.slot_day) {

        }
        const form_step = {
            'step_form': 5
        }

        const formData = { ...dateTime, ...form_step }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, formData, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setStep5(true)
                    setStep6(false)
                    setStep7(true)
                    setStep8(true)
                    setStep9(true)
                    setStep14(false)
                    setStep15(false)
                    setConfirmationBtn(false)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }

    const editDateTimeDetail = () => {
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
        setStep6(true)
        setStep7(false)
        setStep8(false)
        setStep13(false)
        setStep14(false)
        setConfirmationBtn(false)
    }

    const handlePickUpCar = () => {
        var pickup = document.querySelector('input[name = pickcar]:checked').value;
        if (pickup == "yes") {
            setStep10(true)
            setStep11(false)
            setUserAddressForm(false)

        }
        if (pickup == "no") {
            setStep11(true)
            setStep10(false)
            setUserAddressForm(false)
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
            'step_form': 6,
            'pickup_car': 'yes',

        }

        setTinyLoader(true);

        const formData = { ...{ 'pickup_car_address': data, 'pickup_car_address_type': pickUpAddressType }, ...form_step }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    setStep9(false)
                    setStep10(false)
                    setStep11(false)
                    setStep12(true)
                    setStep13(true)
                    setStep14(true)
                    setConfirmationBtn(true)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });


    }

    const editPickUpCarDetail = () => {
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
        setStep9(true)
        var pickup = document.querySelector('input[name = pickcar]:checked').value;
        if (pickup == "yes") {
            setStep10(true)
            setStep11(false)

        }
        if (pickup == "no") {
            setStep11(true)
            setStep10(false)
        }
        setStep12(false)
        setStep13(false)
        setStep14(false)
        setConfirmationBtn(false)
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
            'step_form': 6,
            'pickup_car': 'no',

        }
        const formData = { ...{ 'pickup_person_name': pickupPersonFirstName ? pickupPersonFirstName + ' ' + pickupPersonLastName : userData && userData.first_name + ' ' + userData.last_name, 'pickup_person_mobile': pickupPersonMobile ? pickupPersonMobile : userData && userData.mobile }, ...form_step }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    // setPaymentsTab(true)
                    setStep9(false)
                    setStep11(false)
                    setStep15(true)
                    setStep13(true)
                    setStep14(true)
                    setConfirmationBtn(true)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }

    const editPickUpPersonDetail = () => {
        if (typeof window !== "undefined") {
            document.body.classList.remove('double-big-btns');
        }
        setStep11(true)
        setStep10(false)
        setStep9(true)
        setStep15(false)

        // setStep12(false)
        setStep13(false)
        setStep14(false)
        setConfirmationBtn(false)
    }

    const submitCarCarePayment = async () => {
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-user-service/${id}`, { 'step_form': 7 }, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    router.push(`/service/thank-you?id=${id}`)
                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });

    }
    const selectServiceAddToCart = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-service-by-order-id/${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setSelectedServices(res.data.data)
                    setTotalPrice(res.data.total_price)
                    setGst(res.data.gst)
                    setGrandPrice(res.data.grand_price)

                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });
    }

    const removeToCart = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/service-remove-to-cart/${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setSelectedServices(res.data.data)
                    setTotalPrice(res.data.total_price)
                    setGst(res.data.gst)
                    setGrandPrice(res.data.grand_price)

                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }
    useEffect(() => {
        selectServiceAddToCart()
        $('.numberonly').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });
    }, [id])

    return (
        <>
            <WebHead pageTitle="Final Details Address" />
            {/* <WebsiteLayout> */}
            <section className="package-service bg-grey comPad">
                <div className='extra-pd-rightleft'>
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-7">
                                <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                        <a href='' className='editcta'>Edit</a>
                                    </div>
                                    <div className='vehicle-list-detail'>
                                        {carDetail.data !== undefined && carDetail.data && carDetail.data.data && carDetail.data.data.data ?
                                            <ul>
                                                <li>Brand<span>{carDetail.data.data.data.brand_name}</span></li>
                                                <li>Model<span>{carDetail.data.data.data.model_name}</span></li>
                                                <li>Variant<span>{carDetail.data.data.data.variant_name}</span></li>
                                                <li>Fuel Type<span>{carDetail.data.data.data.fuel_type}</span></li>
                                            </ul>
                                            : ''}

                                    </div>
                                </div>

                                <div className="formbx-white service-order-summary pb-0  scroll-summery mobile-style" >
                                    <h3>Order Summary</h3>
                                    <div className='summarylist p-0'>
                                        <ul className='data-scroll more-item'>
                                            <li>
                                                <div className='left-txt blue-txt-order'>PPF (Paint Protection Film) 3 Years<span>1000 kms or 1 Month Warranty | Every <br />15000 kms or 12 Months</span></div>
                                                <div className='right-txt blue-txt-order'>
                                                    INR 34,999/-
                                                    <br /><span className="price-cut">INR 39,999/-</span>
                                                    <button className="delete-btn"></button>
                                                </div>
                                            </li>
                                            <li>
                                                <div className='left-txt blue-txt-order'>PPF (Paint Protection Film) 3 Years<span>1000 kms or 1 Month Warranty | Every <br />15000 kms or 12 Months</span></div>
                                                <div className='right-txt blue-txt-order'>
                                                    INR 34,999/-
                                                    <br /><span className="price-cut">INR 39,999/-</span>
                                                    <button className="delete-btn"></button>
                                                </div>
                                            </li>

                                            <li>
                                                <div className='left-txt blue-txt-order'>PPF (Paint Protection Film) 3 Years<span>1000 kms or 1 Month Warranty | Every <br />15000 kms or 12 Months</span></div>
                                                <div className='right-txt blue-txt-order'>
                                                    INR 34,999/-
                                                    <br /><span className="price-cut">INR 39,999/-</span>
                                                    <button className="delete-btn"></button>
                                                </div>
                                            </li>

                                        </ul>

                                        <ul className='gap-ul'>
                                            <li>
                                                <div className='left-txt'>Pick & Drop</div>
                                                <div className='right-txt green-txtorder'>Free</div>
                                            </li>
                                            <li>
                                                <div className='left-txt'>Car Wash</div>
                                                <div className='right-txt green-txtorder'>Free</div>
                                            </li>
                                            <li>
                                                <div className='left-txt'>Car Inspection</div>
                                                <div className='right-txt green-txtorder'>Free</div>
                                            </li>
                                            <li className='grandtotal'>
                                                <div className='left-txt'>Grand Total</div>
                                                <div className='right-txt'>INR 34,999/-</div>
                                            </li>

                                        </ul>

                                    </div>
                                </div>


                                <div className='formbx-white preferred-service-center'>
                                    <div style={{ display: `${step1 === true ? 'block' : 'none'}` }}>
                                        <form method='POST' id="centerForm">
                                            <input type="hidden" value={2} name="step_form" id="step_form1" />
                                            <h3>Select Preferred Service Centre</h3>
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
                                            <small id="serviceCenterError" className="error"></small>
                                            <p>{centerAddress}</p>

                                            <div className='form-input mg-0'>
                                                <button type="button" className='btn arrow-style blue-btn' onClick={() => saveExpericenceCenter()}>
                                                    <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>


                                    <div className='nextstep-edit editowner-details' style={{ display: `${step2 === true ? 'block' : 'none'}` }}>
                                        <ul>
                                            <li>
                                                <div className='iconedit'>
                                                    <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                <div className='editinfo-owner'>
                                                    <h4>Preferred Service Centre</h4>
                                                    <div className="ownername">{serviceCenterName}</div>
                                                    <p>{centerAddress}</p>
                                                </div>
                                                <a className='edit-btn' onClick={editExpericenceCenter}>Edit</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                {/* <div className='formbx-white add-address' style={{ display: `${step3 === true ? 'block' : 'none'}` }}>

                                    {allAddress && allAddress.length > 0 ? '' :
                                        <div className='new-address-add'>
                                            <form onSubmit={(e) => saveUserAddressDetail(e)} id="userDivAddressForm" method='POST'>
                                                <h3>Select/Add new address</h3>
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
                                                            <button className='btn arrow-style blue-btn'>
                                                                <span>Save & Continue</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    }
                                    <div className='nextstep top-bottom-gap-adress' style={{ display: UserAddressForm === true ? 'block' : 'none' }}>
                                        <div className='new-address-add'>
                                            <form onSubmit={(e) => saveUserAddressDetail(e)} id="userDivAddressForm" method='POST'>
                                                <h3>Select/Add new address</h3>
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
                                    <div className='choose-exiting-address' style={{ display: editUserAddressForm === false ? 'block' : 'none' }}>
                                        <h3>Select/Add New Address</h3>
                                        <ul className='selectaddress'>
                                            {
                                                allAddress !== undefined && allAddress.map((addr, i) => {
                                                    return (
                                                        <li key={addr._id}>
                                                            <input type="hidden" name="step_form" id="step_form" value="3" />
                                                            <input type="text" id="address-type" defaultValue={addr.address_type} />
                                                            <input type="text" id="user-state" defaultValue={addr.state} />
                                                            <input type="text" id="user-city" defaultValue={addr.city} />
                                                            <input type="text" id="user-full-address" defaultValue={addr.full_address} />
                                                            <input type="text" id="user-pincode" defaultValue={addr.pincode} />
                                                            <input type="radio" name="select" id={`option_${i}`} value={`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`} onChange={(e) => selectedAddressByUser(addr.address_type, addr.full_address, addr.city, addr.state, addr.pincode)} defaultChecked={!(!!i)} />
                                                            <label htmlFor={`option_${i}`} className="option">
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
                                                    <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => saveSelectedAddress()}><span>Save & Continue</span></button>
                                                </div>
                                            </div> : ''}

                                    </div>

                                    <div className='nextstep-edit editowner-details' style={{ display: `${step4 === true ? 'block' : 'none'}` }}>
                                        <ul>
                                            <li>
                                                <div className='iconedit'>
                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                </div>
                                                <div className='editinfo-owner'>
                                                    <h4>Address</h4>
                                                    <div className="ownername">{addressType}</div>
                                                    <p>{selectedFullAddress}</p>
                                                </div>
                                                <a className='edit-btn' onClick={() => editUserAddress()}>Edit</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div> */}

                                <div className='formbx-white add-time-date' style={{ display: `${step5 === true ? 'block' : 'none'}` }}>
                                    <form id="dayAndTimeForm" method='POST' onSubmit={(e) => saveDateTimeSlot(e)} >
                                        <div className='nextstep' style={{ display: `${step6 === true ? 'block' : 'none'}` }}>
                                            {/* <h3>Select Date & Time of Evaluation</h3> */}
                                            <h3>Select Date For Service</h3>
                                            <div className='style-box'>
                                                <h4>Select Date*</h4>
                                                <div className='dates time-pd'>
                                                    {
                                                        weekCal && weekCal.map((date, i) => {
                                                            return (
                                                                <>
                                                                    <div className='date' key={i}>
                                                                        <input type="radio" name="slot_day" defaultValue={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} defaultChecked={dateTimeData ? dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`) === dateTimeData.slot_day ? true : false : ''} onChange={(e) => dateTimeHandle(e)} disabled={(date.day === day) && (hrs >= '15') ? true : false} />

                                                                        <label htmlFor={`selected_${i}`} className={`option ${(date.day === day) && (hrs >= '15') ? 'disable-time' : ''}`}>
                                                                            {date.day} {date.month} <span>{date.weekDay}</span>
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>
                                                    <div className='clr'></div>
                                                    <small id="slotDateError" className="error"></small>
                                                </div>
                                            </div>

                                            {/* <div className='style-box'>
                                                <h4>Select Time Slot*</h4>
                                                <div className='dates'>
                                                    <div className='date'>
                                                        <input type="radio" className="" name="slot_time" id="time" defaultValue="10 AM - 12 PM" defaultChecked={dateTime ? dateTime.slot_time === '10 AM - 12 PM' : dateTimeData ? dateTimeData.slot_time === '10 AM - 12 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs > 8 && hrs >= 10 ? true : false) : ''} />
                                                        <label htmlFor="time" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 8 && hrs >= 10 ? 'disable-time' : '')} `} >
                                                            10 AM - 12 PM
                                                        </label>
                                                    </div>
                                                    <div className='date'>
                                                        <input type="radio" className='slotTime' name="slot_time" id="time1" defaultValue="12 PM - 2 PM" defaultChecked={dateTime ? dateTime.slot_time === '12 PM - 2 PM' : dateTimeData ? dateTimeData.slot_time === '12 PM - 2 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs > 10 && hrs >= 12 ? true : false) : ''} />
                                                        <label htmlFor="time1" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 10 && hrs >= 12 ? 'disable-time' : '')} `}>
                                                            12 PM - 2 PM
                                                        </label>
                                                    </div>
                                                    <div className='date'>
                                                        <input type="radio" className='slotTime' name="slot_time" id="time2" defaultValue="2 PM - 4 PM" defaultChecked={dateTime ? dateTime.slot_time === '2 PM - 4 PM' : dateTimeData ? dateTimeData.slot_time === '2 PM - 4 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs >= 14 ? true : false) : ''} />
                                                        <label htmlFor="time2" className={`option ${dateTime && (dateTime.slot_day === today && hrs >= 14 ? 'disable-time' : '')} `} >
                                                            2 PM - 4 PM
                                                        </label>
                                                    </div>
                                                    <div className='date'>
                                                        <input type="radio" className='slotTime' name="slot_time" id="time4" defaultValue="4 PM - 6 PM" defaultChecked={dateTime ? dateTime === '4 PM - 6 PM' : dateTimeData ? dateTimeData.slot_time === '4 PM - 6 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs >= 14 ? true : false) : ''} />
                                                        <label htmlFor="time4" className={`option ${dateTime && (dateTime.slot_day === today && hrs >= 14 ? 'disable-time' : '')} `}>
                                                            4 PM - 6 PM
                                                        </label>
                                                    </div>
                                                    <div className='clr'></div>
                                                    <small id="slotTimeError" className="error"></small>
                                                </div>
                                            </div> */}


                                            <div className='form-input mg-0'>
                                                <button className='btn arrow-style blue-btn'>
                                                    <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                </button>
                                            </div>
                                        </div>

                                    </form>

                                    <div className='nextstep-edit editowner-details' style={{ display: `${step7 === true ? 'block' : 'none'}` }}>
                                        <ul>
                                            <li>
                                                <div className='iconedit'>
                                                    <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                                </div>
                                                <div className='editinfo-owner'>
                                                    {/* <h4>Date & Time</h4> */}
                                                    <h4>Date</h4>
                                                    {dateTime ? <p> {new Date(dateTime.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(dateTime.slot_day).getDate()} {new Date(dateTime.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(dateTime.slot_day).getFullYear()}, {dateTime.slot_time}</p> : dateTimeData ? <p>
                                                        {new Date(dateTimeData.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(dateTimeData.slot_day).getDate()} {new Date(dateTimeData.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(dateTimeData.slot_day).getFullYear()}, {dateTimeData.slot_time}
                                                    </p> : ''}
                                                </div>
                                                <a className='edit-btn' onClick={() => editDateTimeDetail()}>Edit</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                <div className='nextstep formbx-white ask-car-pickup' style={{ display: `${step8 === true ? 'block' : 'none'}` }}>

                                    {allAddress && allAddress.length > 0 ? '' :
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
                                                            <button className='btn arrow-style blue-btn'>
                                                                <span>Save & Continue</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    }

                                    <div className="carpickup" style={{ display: `${step9 === true ? 'block' : 'none'}` }}>
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

                                    <div className="select-yes" style={{ display: `${step10 === true ? 'block' : 'none'}` }}>
                                        <div className='choose-exiting-address'>
                                            <h3>Select/Add New Address</h3>

                                            <ul className='selectaddress'>
                                                {
                                                    allAddress !== undefined && allAddress.map((addr, i) => {
                                                        return (

                                                            <li key={addr._id}>
                                                                <input type="radio" name="pickcar" defaultValue="yes" />
                                                                {/* {console.log(addr)} */}
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
                                                        <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => savePickUpCarDetail()}><span>Save & Continue</span></button>
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

                                    <div className="select-no" style={{ display: `${step11 === true ? 'block' : 'none'}` }}>
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
                                                        <input type='text' name="pickup_person_mobile" className="numberonly" placeholder='Enter your mobile number*' onChange={(e) => setPickupMobile(e.target.value)} maxLength={10} defaultValue={pickupPersonMobile ? pickupPersonMobile : userData ? userData.mobile : ''} />
                                                        <small id="errorPickupPersonMobile" className="error"></small>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='form-input mg-0'>
                                                        <button className='btn arrow-style blue-btn' >
                                                            <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>



                                    <div className='nextstep-edit editowner-details' style={{ display: `${step12 === true ? 'block' : 'none'}` }}>
                                        <ul>
                                            <li>
                                                <div className='iconedit'>
                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                </div>
                                                <div className='editinfo-owner'>
                                                    <h4>Car Pickup Address</h4>
                                                    <div className="ownername">{pickUpAddressType}</div>
                                                    <p>{pickUpAddress}</p>
                                                </div>
                                                <a className='edit-btn' onClick={() => editPickUpCarDetail()}>Edit</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className='nextstep-edit editowner-details' style={{ display: `${step15 === true ? 'block' : 'none'}` }}>
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
                                                <a className='edit-btn' onClick={() => editPickUpPersonDetail()}>Edit</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                {/* <div className='formbx-white payment button-payment' style={{ display: `${step13 === true ? 'block' : 'none'}` }}>
                                    <h3>Payments</h3>
                                    <div className='nextstep' style={{ display: `${step14 === true ? 'block' : 'none'}` }}>
                                        <button type="button" className='btn blueBdr' onClick={() => submitCarCarePayment()}>
                                            <span>Pay At Workhop</span>
                                        </button>
                                        <a href="#" className='btn arrow-style green-btn'>
                                            <span>Pay Now & Get INR 1500/- Off</span>
                                        </a>
                                    </div>

                                    <div className="mobilecancletxt desktop-hide-div mobile-show-div text-center">Cancel anytime, fully refundable</div>
                                </div> */}


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
                                                <h3>Car Details</h3>
                                                {/* <a href='' className='editcta'>Edit</a> */}
                                            </div>
                                            <div className='vehicle-list-detail'>
                                                {carDetail.data !== undefined && carDetail.data && carDetail.data.data && carDetail.data.data.data ?
                                                    <ul>
                                                        <li>Brand<span>{carDetail.data.data.data.brand_name}</span></li>
                                                        <li>Model<span>{carDetail.data.data.data.model_name}</span></li>
                                                        <li>Variant<span>{carDetail.data.data.data.variant_name}</span></li>
                                                        <li>Fuel Type<span>{carDetail.data.data.data.fuel_type}</span></li>
                                                    </ul>
                                                    : ''}

                                            </div>
                                        </div>

                                        <div className="formbx-white service-order-summary pb-0  scroll-summery desktop-style" >
                                            <h3>Order Summary</h3>
                                            <div className='summarylist p-0'>
                                                <ul className='data-scroll more-item'>
                                                    {selectedServices && selectedServices.length > 0 ? selectedServices.map((addService, i) => {
                                                        return (
                                                            <>
                                                                <li key={i}>
                                                                    <div className='left-txt blue-txt-order'>
                                                                        {addService && addService.service_sub_category && addService.service_sub_category.service_sub_category_name}

                                                                        <span dangerouslySetInnerHTML={{ __html: addService && addService.service_sub_category && addService.service_sub_category.service_short_description }}></span>

                                                                        <span>{ } </span>
                                                                    </div>
                                                                    <div className='right-txt blue-txt-order'>
                                                                        INR {addService && addService.service_price ? addService.service_price : ''}/-
                                                                        <br />
                                                                        {/* <span className="price-cut">INR 39,999/-</span> */}
                                                                        <button className="delete-btn" onClick={() => removeToCart(addService._id)}></button>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )

                                                    }) : ''}
                                                </ul>

                                                <ul className='gap-ul'>
                                                    <li>
                                                        <div className='left-txt'>Pick & Drop</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Car Wash</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>Car Inspection</div>
                                                        <div className='right-txt green-txtorder'>Free</div>
                                                    </li>
                                                    <li>
                                                        <div className='left-txt'>GST (18%)</div>
                                                        <div className='right-txt green-txtorder'> {gst ? Number(gst).toLocaleString('en-US') : ''}</div>
                                                    </li>
                                                    <li className='grandtotal'>
                                                        <div className='left-txt'>Grand Total</div>
                                                        <div className='right-txt'>INR
                                                            {grandPrice ? Number(grandPrice).toLocaleString('en-US') : ''}
                                                            /-</div>
                                                    </li>

                                                </ul>

                                            </div>
                                        </div>



                                        <div className='order-cancle'>Cancel anytime, fully refundable. <span onClick={OpenLearn} className='btnunderline'>Learn more</span></div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePop} /> : ''}
            {LearMore ? <LearnMore closePop={closeLearnMorePop} />
                : ""
            }
        </>
    )
}
