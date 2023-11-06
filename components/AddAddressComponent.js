import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useSWR from 'swr';
import { ButtonSpinner } from './Helper';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import { useRouter } from 'next/router';

const fetch = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
});
const fetcher = (url) => axios.get(url).then(res => res.data)

function AddAddressComponent(props) {
    const router = useRouter()
    const [tinyLoader, setTinyLoader] = useState(false);
    const [address, setAddress] = useState('')

    const [openSuccessPopup, setOpenSuccessPopup] = useState(false)
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');

    const url = process.env.NEXT_PUBLIC_URL
    const [city, setCity] = useState([])
    const getStates = useSWR(`${url}states`, fetcher);

    const hidePopup = () => {
        setOpenSuccessPopup(false)
    }

    const getCitiesByState = async (stateId) => {
        axios.get(`${url}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
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
        await axios.post(`${url}user/save-new-user-address`, form, {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setTinyLoader(false)
                setCallSuccessMessage(res.data.message);
                var radios = document.querySelector('input[type=radio][name=select]:checked');
                if (radios && radios.checked === false) {
                    radios.checked = true
                }
                props.closeComponent()
                document.getElementById('userDivAddressForm').reset();
                setOpenSuccessPopup(true);
            }
        }).catch((e) => {
            if (e && e.response && e.response.data === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        });
    }
    useEffect(() => {

    }, [props])
    return (
        <>
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
            {openSuccessPopup ? <SmallSuccessPopUp HidePopup={hidePopup} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
        </>
    )
}
export default React.memo(AddAddressComponent)