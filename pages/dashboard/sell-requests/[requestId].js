import React, { useState, useEffect } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import { weekDatesForForms, dateConverterForValue, capitalizeFirstLetter, ButtonSpinner, fullDatabaseDateConverter } from '@/components/Helper';
import { $ } from 'react-jquery-plugin'
import WebHead from '@/components/common/WebHead';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '@/components/common/Loader';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';


const fetch = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
});
const fetcher = (url) => axios.get(url).then(res => res.data)

export default function SellDetail() {

    const Url = process.env.NEXT_PUBLIC_URL;

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hrs = date.getHours()
    let today = `${year}-${month}-${day}`
    const router = useRouter()
    let userData = {}
    let carData = {}
    const [city, setCity] = useState([])
    const getStates = useSWR(`${Url}states`, fetcher);
    const { requestId } = router.query

    const userInfo = useSWR(`${Url}user-profile`, fetch)
    const carInfo = useSWR(`${Url}user/edit-sell-request?id=${requestId}`, fetch)
    userData = userInfo !== undefined && userInfo.data !== undefined && userInfo.data.user !== undefined && userInfo.data.user !== '' ? userInfo.data.user : ''

    carData = carInfo !== undefined && carInfo.data !== undefined && carInfo.data.data !== undefined && carInfo.data.data.data !== undefined && carInfo.data.data.data !== '' ? carInfo.data.data.data : ''

    const [tinyLoader, setTinyLoader] = useState(false);

    const [step1, setStep1] = useState(true)
    const [openSuccessPopup, setOpenSuccessPopup] = useState(false)
    const [allAddress, setAllAddress] = useState([])
    const [user, setUser] = useState('')
    const [address, setAddress] = useState('')
    const [selectedFullAddress, setSelectedFullAddress] = useState('');
    const [addressType, setAddressType] = useState('')
    const [fullAddress, setFullAddress] = useState({})
    const [addressComponent, setAddressComponent] = useState(false)
    const [dateTimeData, setDateTimeData] = useState('')
    const [dateLimit, setDateLimit] = useState(7);
    const [dateTime, setDateTime] = useState('')

    const [editUserInfo, setEditUserInfo] = useState(false)
    const [editUserAddress, setEditUserAddress] = useState(false)
    const [editDateTime, setEditDateTime] = useState(false)


    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');

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

    const getCitiesByState = async (stateId) => {
        axios.get(`${Url}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
            if (res.data.status == 1) {
                setCity(res.data.cities)

            }
        }).catch(function (error) {
            console.log(error)

        });
    }
    const addressHandler = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));

    }
    const hidePopup = () => {
        setOpenSuccessPopup(false)
    }
    const userHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const updateSellRequestData = async (id, data) => {
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-request/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {

                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }


    const saveUserInfo = async (e) => {

        let createError = 0;
        e.preventDefault();

        if (e.target.first_name.value.length <= 0) {
            document.getElementById('firstNameError').innerHTML = 'Please enter your first name.';
            document.getElementById("firstNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('firstNameError').innerHTML = '';
                document.getElementById("firstNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.last_name.value.length <= 0) {
            document.getElementById('lastNameError').innerHTML = 'Please enter your last name';
            document.getElementById("lastNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('lastNameError').innerHTML = '';
                document.getElementById("lastNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        let form = new FormData(document.getElementById('userDivDetailForm'))
        var userInfo = {};
        form.forEach(function (value, key) {
            userInfo[key] = value;
        });
        setUser(userInfo)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user-update-profile`, form, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    carData.step_form = 2
                    updateSellRequestData(requestId, form)
                    setEditUserInfo(true)
                    // router.reload()
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    // save new address
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
        setTinyLoader(true)
        await axios.post(`${Url}user/save-new-user-address`, form, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setAddressComponent(false)
                setAllAddress(res.data.allAddress)
                setTinyLoader(false)
                setOpenSuccessPopup(true);
                setAllAddress(res.data.allAddress)
                document.getElementById('selectAddressRadioBtn').style.display = 'block'
                setCallSuccessMessage(res.data.message);

                var radios = document.querySelector('input[type=radio][name=select]:checked');
                if (radios && radios.checked === false) {
                    radios.checked = true
                }
                document.getElementById('userDivAddressForm').reset();

            }
        }).catch((e) => {
            if (e && e.response && e.response.data === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        });
    }
    // End new address

    const openNewAddressPop = () => {
        document.getElementById('selectAddressRadioBtn').style.display = 'none'
        var radio = document.querySelector('input[type=radio][name=select]:checked');
        if (radio && radio.checked === true) {
            radio.checked = false;
        }
        setAddressComponent(!addressComponent)
    }

    const selectedAddressByUser = (type, address, city, state, pincode) => {
        setAddressComponent(false)
        document.getElementById('selectAddressRadioBtn').style.display = 'block'
        setAddressType(type)
        setFullAddress({
            address_type: type,
            state: state,
            city: city,
            full_address: address,
            pincode: pincode

        })
    }

    const saveSelectedAddress = async (e) => {
        var radios = document.querySelector('input[type=radio][name=select]:checked');
        if (radios && radios.checked === true) {
            setSelectedFullAddress(radios.value)
        }
        let formData = ''
        const stepForm = document.getElementById('step_form').value
        if (addressType === '' || addressType === undefined) {
            let address_Type = document.getElementById('address-type').value
            let state = document.getElementById('user-state').value
            let city = document.getElementById('user-city').value
            let full_address = document.getElementById('user-full-address').value
            let pincode = document.getElementById('user-pincode').value
            setAddressType(address_Type)
            setFullAddress({
                address_type: address_Type,
                state: state,
                city: city,
                full_address: full_address,
                pincode: pincode
            })

            formData = {
                'address_type': address_Type,
                'state': state,
                'city': city,
                'full_address': full_address,
                'pincode': pincode,
                'step_form': stepForm
            }
        }

        const form_step = {
            'step_form': stepForm
        }
        const newAddress = { ...fullAddress, ...form_step }

        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-request/${requestId}`, formData ? formData : newAddress, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    carData.step_form = 3
                    carData.address_type = formData ? formData.address_type : newAddress ? newAddress.address_type : ''
                    carData.full_address = formData ? formData.full_address : newAddress ? newAddress.full_address : ''
                    carData.city = formData ? formData.city : newAddress ? newAddress.city : ''
                    carData.state = formData ? formData.state : newAddress ? newAddress.state : ''
                    carData.pincode = formData ? formData.pincode : newAddress ? newAddress.pincode : ''
                    setEditUserAddress(true)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);

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
        if (typeof window !== "undefined") {
            document.body.classList.add('sticky-btn-have');
        }
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

        if (e.target.slot_time.value.length <= 0) {
            document.getElementById('slotTimeError').innerHTML = 'Please select time.';
            document.getElementById("slotTimeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('slotTimeError').innerHTML = '';
                document.getElementById("slotTimeError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        const form = new FormData(document.getElementById('dayAndTimeForm'))
        var timeInfo = {};
        form.forEach(function (value, key) {
            timeInfo[key] = value;
        });
        setTinyLoader(true)
        setDateTime(timeInfo)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-request/${requestId}`, form, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false)
                    carData.step_form = 4
                    carData.slot_date = dateTime ? dateTime.slot_day : ''
                    carData.slot_time = dateTime ? dateTime.slot_time : ''
                    setEditDateTime(true)

                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }

    const SubmitCarInfo = async () => {
        const data = {
            'step_form': "5"
        }

        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-request/${requestId}`, data, {
            headers: {
                // s'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false);
                    localStorage.removeItem("date-sell-detail");
                    router.push(`/sell/thank-you?id=${requestId}`)

                }
            })
            .catch(function (error) {
                setTinyLoader(false)
                console.log(error)
            });

    }

    useEffect(() => {
        userAllAddress()
        $("#first_name").keypress(function (e) {
            var keyCode = e.keyCode || e.which;
            var regex = /^[A-Za-z]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                console.log("Only Alphabets allowed.")
            }

            return isValid;
        });
        $("#last_name").keypress(function (e) {
            var keyCode = e.keyCode || e.which;
            var regex = /^[A-Za-z]+$/;
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                console.log("Only Alphabets allowed.")
            }

            return isValid;
        });
    }, [requestId])

    return (
        <>
            <WebHead pageTitle="LR | Sell Detail" />
            {/* <WebsiteLayout> */}
            <section className='sell-car-form bg-grey comPad'>
                <div className='wrapper'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                <div className='border-heading relativediv'>
                                    <h3>Car Details</h3>
                                    {/* <a href='' className='editcta'>Edit</a> */}
                                </div>
                                <div className='vehicle-list-detail'>
                                    <ul>
                                        <li>Brand<span>{carData && carData.brand_name}</span></li>
                                        <li>Reg. Year<span>{carData && carData.year}</span></li>
                                        <li>Model<span>{carData && carData.model_name}</span></li>
                                        <li>Variant<span>{carData && carData.variant_name}</span></li>
                                        <li>Ownership
                                            <span>{carData && carData.ownership}{carData ? carData.ownership === '1' ? 'st' : carData.ownership === '2' ? 'nd' : carData.ownership === '3' ? 'rd' : '' : ''}</span>
                                        </li>
                                        <li>KMs Driven<span>{carData && Number(carData.kms).toLocaleString('en-US')}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='formbx-white ownerdetail' style={{ display: step1 === true ? 'block' : 'none' }} >
                                {carData.step_form === 1 ? <div style={{ display: carData.step_form === 1 ? 'block' : 'none' }}>
                                    <form id="userDivDetailForm" action='POST' onSubmit={saveUserInfo}>
                                        <h3>Enter Your Details</h3>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='form-input'>
                                                    <label>First  Name*</label>
                                                    <input type="hidden" name="step_form" value="2" />
                                                    <input type='text' placeholder='Enter your first name' id="first_name" name="first_name" maxLength={20} defaultValue={userData && userData.first_name ? userData.first_name : user.first_name ? user.first_name : ''} onChange={(e) => userHandler(e)} />
                                                    <small id="firstNameError" className="error"></small>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='form-input'>
                                                    <label>Last Name*</label>
                                                    <input type='text' id="last_name" placeholder='Enter your last name' name="last_name" maxLength={20} defaultValue={userData && userData.last_name ? userData.last_name : user.last_name ? user.last_name : ''} onChange={(e) => userHandler(e)} />
                                                    <small id="lastNameError" className="error"></small>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='form-input'>
                                                    <label>Email ID</label>
                                                    <input type='text' placeholder='Enter your email id' name="email" defaultValue={userData && userData.email ? userData.email : user.email ? user.email : ''} onChange={(e) => userHandler(e)} />

                                                </div>
                                            </div>
                                            <div className='col-md-12'>
                                                <div className='form-input mg-0'>
                                                    <button className='btn arrow-style blue-btn'>
                                                        <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                    : ''}
                                <div className='nextstep-edit editowner-details' style={{ display: carData.step_form >= 2 ? 'block' : editUserInfo === true ? "block" : "none" }}>
                                    <ul>
                                        <li>
                                            <div className='iconedit'>
                                                <img src="/img/user-icon.svg" alt="Luxury Ride" />
                                            </div>
                                            <div className='editinfo-owner'>
                                                <h4>Your Details</h4>
                                                <div className='ownername'>{carData && carData.user_name ? carData.user_name : user && user.first_name ? user.first_name : userData && userData.first_name ? userData.first_name : ''} {user && user.last_name ? user.last_name : userData && userData.last_name ? userData.last_name : ''}</div>
                                                <div className='ownermailid'>{user && user.email ? user.email : userData && userData.email ? userData.email : ''}</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* } */}

                            </div>

                            <div className='formbx-white add-address' style={{ display: carData.step_form >= 2 ? 'block' : 'none' }}>

                                {carData.step_form === 2 ?

                                    <div style={{ display: carData && carData.step_form === 2 ? 'block' : 'none' }}>

                                        <div className='nextstep'>
                                            {allAddress && allAddress.length === 0 || addressComponent === true ?
                                                <div className='new-address-add'>
                                                    <form onSubmit={(e) => saveUserAddressDetail(e)} id="userDivAddressForm" method='POST'>
                                                        <h3>Select/Add Address</h3>
                                                        <p>Select from saved address or add a new address</p>
                                                        <h3>Add New Address</h3>
                                                        <div className='select-address-type'>
                                                            <label className='selectAddresstxt'>Select address type*</label>
                                                            <ul>
                                                                <li>
                                                                    <input type="radio" name="address_type" id="addresstype" defaultValue="Home" onChange={(e) => addressHandler(e)} />
                                                                    <label htmlFor="addresstype" className="option">Home</label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio" name="address_type" id="addresstype1" defaultValue="Work" onChange={(e) => addressHandler(e)} />
                                                                    <label htmlFor="addresstype1" className="option">Work</label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio" name="address_type" id="addresstype2" defaultValue="Other" onChange={(e) => addressHandler(e)} />
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
                                                                            city !== undefined && city.map((city, i) => {
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
                                                                    <input type='text' placeholder='Enter your full address' name="full_address" onChange={(e) => addressHandler(e)} />
                                                                    <small id="addressError" className="error"></small>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div className='form-input'>
                                                                    <label>Pincode*</label>
                                                                    <input type='text' className='numberonly' maxLength={6} placeholder='Enter Your Pincode' name="pincode" onChange={(e) => addressHandler(e)} />
                                                                </div>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <div className='form-input'>
                                                                    <button className='btn arrow-style blue-btn'>
                                                                        <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                : ''}

                                            <div className='choose-exiting-address'>
                                                <h3>Select/Add New Address</h3>

                                                <ul className='selectaddress'>
                                                    {
                                                        allAddress && allAddress.map((addr, i) => {
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
                                                        <li className='addnew-icon' onClick={openNewAddressPop}>
                                                            <div className='flex-wrap-text'>
                                                                <div className='plusicon'>
                                                                    <img src='/img/plus-icon.svg' />
                                                                </div>
                                                                <span>Add New Addesss</span>
                                                            </div>
                                                        </li> : ''}
                                                </ul>
                                                {allAddress && allAddress.length > 0 ?
                                                    <div className='col-md-12'>
                                                        <div className='form-input'>
                                                            <button type='button' id="selectAddressRadioBtn" className='btn arrow-style blue-btn' onClick={() => saveSelectedAddress()}>
                                                                <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                            </button>
                                                        </div>
                                                    </div> : ''}
                                            </div>
                                        </div>
                                    </div>

                                    : ''}
                                <div className='nextstep-edit editowner-details' style={{ display: carData.step_form >= 3 ? 'block' : editUserAddress === true ? "block" : "none" }}>
                                    <ul>

                                        <li>
                                            <div className='iconedit'>
                                                <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                            </div>
                                            <div className='editinfo-owner'>
                                                <h4>{addressType ? addressType : carData.address_type}</h4>
                                                {/* {carData ? <p>{carData.full_address}, {carData.city}, {carData.state} {carData.pincode}, India</p> : <p>{fullAddress.full_address}, {fullAddress.city}, {fullAddress.state} {fullAddress.pincode}, India</p>} */}
                                                <p>{carData.full_address}, {carData.city}, {carData.state} {carData.pincode}, India</p>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* } */}

                            </div>

                            <div className='formbx-white add-time-date' style={{ display: carData.step_form >= 3 ? 'block' : 'none' }}>
                                {carData.step_form === 3 ?
                                    <div style={{ display: carData && carData.step_form === 3 ? 'block' : 'none' }}>
                                        <form id="dayAndTimeForm" method='POST' onSubmit={(e) => saveDateTimeSlot(e)} >
                                            <input type="hidden" name="step_form" id="" value="4" />
                                            <div className='nextstep'>
                                                <h3>Select Preferred Date & Time Of Evaluation</h3>
                                                <div className='style-box'>
                                                    <h4>Select Date*</h4>
                                                    <div className='dates time-pd'>
                                                        {
                                                            weekCal && weekCal.map((date, i) => {
                                                                return (
                                                                    <>
                                                                        <div className='date' key={i}>
                                                                            <input type="radio" name="slot_day" defaultValue={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} defaultChecked={dateTimeData ? dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`) === dateTimeData.slot_day ? true : false : ''} onChange={(e) => dateTimeHandle(e)} />

                                                                            <label htmlFor={`selected_${i}`} className="option">
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

                                                <div className='style-box'>
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
                                                            <input type="radio" className='slotTime' name="slot_time" id="time2" defaultValue="2 PM - 4 PM" defaultChecked={dateTime ? dateTime.slot_time === '2 PM - 4 PM' : dateTimeData ? dateTimeData.slot_time === '2 PM - 4 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs > 12 && hrs >= 14 ? true : false) : ''} />
                                                            <label htmlFor="time2" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 12 && hrs >= 14 ? 'disable-time' : '')} `} >
                                                                2 PM - 4 PM
                                                            </label>
                                                        </div>
                                                        <div className='date'>
                                                            <input type="radio" className='slotTime' name="slot_time" id="time4" defaultValue="4 PM - 6 PM" defaultChecked={dateTime ? dateTime === '4 PM - 6 PM' : dateTimeData ? dateTimeData.slot_time === '4 PM - 6 PM' : ''} onChange={(e) => dateTimeHandle(e)} disabled={dateTime ? (dateTime.slot_day === today && hrs > 14 && hrs >= 16 ? true : false) : ''} />
                                                            <label htmlFor="time4" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 14 && hrs >= 16 ? 'disable-time' : '')} `}>
                                                                4 PM - 6 PM
                                                            </label>
                                                        </div>
                                                        <div className='clr'></div>
                                                        <small id="slotTimeError" className="error"></small>
                                                    </div>
                                                </div>


                                                <div className='form-input mg-0'>
                                                    <button className='btn arrow-style blue-btn'>
                                                        <ButtonSpinner load={tinyLoader} btnName="Save & Continue" />
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    : ''}
                                <div className='nextstep-edit editowner-details' style={{ display: carData.step_form >= 4 ? "block" : editDateTime === true ? "block" : "none" }}>
                                    <ul>
                                        <li>
                                            <div className='iconedit'>
                                                <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                            </div>
                                            <div className='editinfo-owner'>
                                                <h4>Evaluation Date & Time</h4>
                                                {carData.slot_date !== undefined && carData.slot_date !== '' ?
                                                    <>
                                                        <p>
                                                            {`${fullDatabaseDateConverter(carData.slot_date).weekDay}, ${fullDatabaseDateConverter(carData.slot_date).day} ${fullDatabaseDateConverter(carData.slot_date).month}, ${fullDatabaseDateConverter(carData.slot_date).year}, ${carData.slot_time}`}
                                                        </p>
                                                    </>
                                                    : ''}
                                                {/* {dateTime ? <p> {new Date(dateTime.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(dateTime.slot_day).getDate()} {new Date(dateTime.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(dateTime.slot_day).getFullYear()}, {dateTime.slot_time}</p> : ''} */}


                                                {/* <p>
                                                            {new Date(dateTimeData.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(dateTimeData.slot_day).getDate()} {new Date(dateTimeData.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(dateTimeData.slot_day).getFullYear()}, {dateTimeData.slot_time}
                                                        </p> */}
                                                {/* </>
                                                } */}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* } */}
                            </div>

                            <Link href={'#'} className='schedule-evaluation text-center' style={{ display: carData.step_form >= 4 ? 'block' : 'none' }} onClick={() => SubmitCarInfo()}>
                                <h4>SCHEDULE EVALUATION</h4>
                                <p className='mb-0'>At
                                    <strong> {carData.address_type}</strong> on <strong>{new Date(carData.slot_date).getDate()} {new Date(carData.slot_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(carData.slot_date).getFullYear()}</strong> from <strong>{carData.slot_time}</strong></p>
                            </Link>

                        </div>

                        <div className='col-md-5'>
                            <div className='sticky-div'>
                                <div className='nextstep'>
                                    <div className='formbx-white p-0 mobile-view-hide'>
                                        <div className='border-heading relativediv'>
                                            <h3>Car Details</h3>
                                            {/* <Link href='/sell' className='editcta' >Edit</Link> */}
                                        </div>
                                        <div className='vehicle-list-detail'>
                                            <ul>
                                                <li>Brand<span>{carData && carData.brand_name}</span></li>
                                                <li>Reg. Year<span>{carData && carData.year}</span></li>
                                                <li>Model<span>{carData && carData.model_name}</span></li>
                                                <li>Variant<span>{carData && carData.variant_name}</span></li>
                                                <li>Ownership <span>{carData && carData.ownership}{carData ? carData.ownership === '1' ? 'st' : carData.ownership === '2' ? 'nd' : carData.ownership === '3' ? 'rd' : '' : ''}</span></li>
                                                <li>KMs Driven<span>{carData && Number(carData.kms).toLocaleString('en-US')}</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='formbx-white selling-steps text-center' style={{ backgroundImage: 'url("/img/bg-side-img.png")', backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover" }}>
                                        <h3>Selling your car made easy with Luxury Ride</h3>

                                        <ul className='white-center-icon'>
                                            <li>
                                                <div className='icon-center'>
                                                    <img src="/img/fill-form.svg" alt="" />
                                                </div>
                                                <p>Fill your car details & Get an Instant Call Back</p>
                                            </li>
                                            <li>
                                                <div className='icon-center'>
                                                    <img src="/img/doorsteps.svg" alt="" />
                                                </div>
                                                <p>Free Doorstep <br />Evaluation</p>
                                            </li>
                                            <li>
                                                <div className='icon-center'>
                                                    <img src="/img/instantpayment-white.svg" alt="" />
                                                </div>
                                                <p>Real-time Payment</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className='formbx-white key-chainbx'>
                                        <div className='icon-key'>
                                            <img src='/img/key-chain-icon.svg' alt='' />
                                        </div>
                                        <h4 className='mb-0' >Sell your car from the safety of your home <span className='blue-txt'>#WithExtraCare</span></h4>
                                        <p>Luxury Ride offers a convenient, transparent and seamless luxury car selling experience that delivers a price that matches your luxury car’s value.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* </WebsiteLayout> */}
            {openSuccessPopup ? <SmallSuccessPopUp HidePopup={hidePopup} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
        </>
    )
}
