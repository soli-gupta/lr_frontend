import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import AddNewAddressTab from "./add-new-address-tab";

import DashboardAddressList from '@/components/service-package-components/dashboardAddressList';
import SmallSuccessPopUp from "../smallSuccessPopUp";
import { ButtonSpinner } from "../Helper";

const fetcher = (url) => axios.get(url).then(res => res.data);

const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);

function AddressSelectionTab({ selectAddressTab, addressRadioAndAddTab, addNewAddressTab, addAddressOpenClose, selectedAddressRadioButton, setSelectedAddressRadioButton, submitSelectedAddress, selctedAddressTab, selectedAddressType, selectedFullAddress, editSelectedAddressTab, selectedAddressByUser, setCheckPinCode, checkPinCode, setAddressRadioAndAddTab, setSelctedAddressTab, setAddNewAddressTab, setVehicleInspactionDateTab, setSelectionInspactionDateTime, tinyLoader, setTinyLoader }) {

    const Url = process.env.NEXT_PUBLIC_URL;

    const getStates = useSWR(`${Url}states`, fetcher);
    // const fetchAddresses = useSWR(`${Url}user/fetch-all-address`, loggedFetcher);
    const [fetchAddresses, setFetchAddresses] = useState([]);

    const fetchAllUserAddress = async () => {
        await axios.get(`${Url}user/fetch-all-address`, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            // console.log(res.data)
            setFetchAddresses(res.data.address);
        }).catch((e) => {

        })
    }

    const [popUp, setPopUp] = useState(false);
    const [getCities, setGetCities] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    const manageCities = () => { }


    const getCitiesByState = async (stateId) => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
            if (res.data.status == 1) {
                setGetCities(res.data.cities)
            }
        }).catch(function (error) {
            setGetCities('');
        });
    }


    const managePinCodeHandler = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e === "" || regex.test(e)) {
            setCheckPinCode(e);
        }
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

        setTinyLoader(true);

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
                setAddNewAddressTab(false);
                setAddressRadioAndAddTab(true);
                setSelctedAddressTab(false);
                setVehicleInspactionDateTab(false);
                setSelectionInspactionDateTime(false);
                setCheckPinCode('');
                setPopUp(true);
                document.body.classList.add('hide-scroll-poup-new');
                setSuccessMessage(res.data.message);

                setFetchAddresses(res.data.allAddress);
                setSelectedAddressRadioButton(true);

                setTinyLoader(false);

                const geCurrentAddedAddress = `${res.data.address.user_address_type} ${res.data.address.user_full_address} ${res.data.address.user_city}, ${res.data.address.user_state} - ${res.data.address.user_pincode}`;
                setTimeout(() => {
                    selectedAddressByUser(res.data.address.user_address_type, res.data.address.user_full_address, res.data.address.user_city, res.data.address.user_state, res.data.address.user_pincode);
                    const $getAddressRadio = document.querySelector('input[name=address_radio_btn]');
                    if ($getAddressRadio.value === geCurrentAddedAddress) {
                        $getAddressRadio.checked = true;
                    }
                }, 300);
                document.getElementById('add-new-user-address').reset();
            }
        }).catch((e) => {
            setPopUp(true);
            document.body.classList.add('hide-scroll-poup-new');
            setTinyLoader(false);
            if (e && e.message) {
                setErrorMessage(e.message);
            } else if (e && e.response.data === 0) {
                setErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setErrorMessage(e.response.data.message);
            }
        });
    }

    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.remove('hide-scroll-poup-new');
    }

    useEffect(() => {
        fetchAllUserAddress();
    }, []);


    return (

        <div className='formbx-white add-address' style={{ display: selectAddressTab === false ? "none" : "block" }}>
            <h3 style={{ display: addressRadioAndAddTab === false ? "none" : "block" }}>Select/Add address For Car Pickup</h3>
            <p style={{ display: addressRadioAndAddTab === false ? "none" : "block" }}>Select from saved address or add a new address</p>

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

                                    <select onChange={(e) => getCitiesByState(e.target.value)} name="state" id="state_name">
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
                                        <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            {/* <AddNewAddressTab addNewAddressTab={addNewAddressTab} saveNewAddress={saveNewAddress} checkPinCode={checkPinCode} getStates={getStates} manageCities={manageCities} getCities={getCities} getCitiesByState={getCitiesByState} popUp={popUp} managePinCodeHandler={managePinCodeHandler} successMessage={successMessage} errorMessage={errorMessage} closePopUp={closePopUp} /> */}


            <div className='option-address' style={{ display: addressRadioAndAddTab === false ? "none" : "block" }}>
                <ul className='selectaddress'>

                    {
                        fetchAddresses !== undefined && fetchAddresses !== '' && fetchAddresses.map((addr, i) => {

                            return (
                                // <DashboardAddressList key={addr._id} selectedAddressByUser={selectedAddressByUser} addr={addr} i={i} />
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
                        <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                    </button>
                </div>
            </div>



            <div className='nextstep-edit editowner-details' style={{ display: selctedAddressTab == false ? "none" : "block" }}>
                <ul>
                    <li>
                        <div className='iconedit'>
                            <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                        </div>
                        <div className='editinfo-owner'>
                            <h4>Car Pickup Address</h4>
                            <div className="ownername">{selectedAddressType}</div>
                            <p>{selectedFullAddress}</p>
                        </div>
                        <div className='edit-btn' onClick={editSelectedAddressTab}>Edit</div>
                    </li>
                </ul>

            </div>
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePopUp} /> : ''}

        </div>


    )
}

export default AddressSelectionTab