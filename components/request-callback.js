import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Lottie from "lottie-react";
import Congratulationstick from '@/public/lotie-icons/tick-circle.json'
import SmallSuccessPopUp from './smallSuccessPopUp';

function RequestCallBack({ queryType, user }) {

    const Url = process.env.NEXT_PUBLIC_URL;
    const SALES_FORCE_URL = process.env.SALES_FORCE_URL
    const router = useRouter();

    const [contactInput, setContactInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [GetACall, setGetACall] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState(false);

    const contactNumberHandler = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setContactInput(e.target.value);
        }
    }

    const requestFirstNameHandler = (e) => {
        // setNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));

    }

    const requestLastNameHandler = (e) => {
        // setNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));

    }

    const closePop = () => {
        document.getElementById('request-callback-form').reset();
        setContactInput('');
        setGetACall(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
    }

    const submitRequestCallBackData = async (e) => {
        e.preventDefault();

        var createError = 0;

        if (e.target.first_name.value.length <= 0) {
            document.getElementById('requestFirstNameError').innerHTML = 'Please enter first name';
            document.getElementById("requestFirstNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('requestFirstNameError').innerHTML = '';
                document.getElementById("requestFirstNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.last_name.value.length <= 0) {
            document.getElementById('requestLastNameError').innerHTML = 'Please enter last name';
            document.getElementById("requestLastNameError").style.display = "block";
            setTimeout(() => {
                document.getElementById('requestLastNameError').innerHTML = '';
                document.getElementById("requestLastNameError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.mobile.value.length <= 0) {
            document.getElementById('requestMobileError').innerHTML = 'Please enter mobile number';
            document.getElementById("requestMobileError").style.display = "block";
            setTimeout(() => {
                document.getElementById('requestMobileError').innerHTML = '';
                document.getElementById("requestMobileError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.mobile.value.length !== 10) {
            document.getElementById('requestMobileError').innerHTML = 'Please enter valid mobile number';
            document.getElementById("requestMobileError").style.display = "block";
            setTimeout(() => {
                document.getElementById('requestMobileError').innerHTML = '';
                document.getElementById("requestMobileError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            return false;
        }

        const formData = new FormData();
        formData.append("first_name", e.target.first_name.value);
        formData.append("last_name", e.target.last_name.value);
        formData.append("mobile", e.target.mobile.value);
        formData.append("email", e.target.email.value)
        formData.append("query_type", queryType);


        await axios.post(`${Url}contact`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res && res.data.status === 1) {
                setGetACall(true);
                document.body.classList.add('hide-scroll-poup-new');
                setCallSuccessMessage(`Thank you for requesting a call back. We can't wait to connect with you and provide the assistance you need. Stay tuned for a call from our executive.`);
                // alert(res.data.message);
                // router.push('/');

                const leadData = {
                    "First Name": e.target.first_name.value,
                    "Last Name": e.target.last_name.value,
                    "Email": e.target.email.value,
                    "WhatsApp": e.target.mobile.value,
                    "Lead Type": "None",
                    "Lead_Category": "Individual"
                };

                await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

                }).catch((e) => {

                });
            }



        }).catch((e) => {
            setGetACall(true);
            document.body.classList.add('hide-scroll-poup-new');
            if (e && e.message) {
                setCallErrorMessage(`Something went wrong.`)
            } else if (e && e.response.data.status === 0) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            }
        });


    }

    return (
        <section className='request-a-call-back commonm-gap'>
            <div className="wrapper">
                <div className="shadow-div-form">
                    <div className="center-text">
                        <h2>Request a Call Back</h2>
                        <p>For urgent inquiries, you may call us directly on <a href="tel:8410084100" className="blue-txt">+91 84100 84100</a> or fill in the form below</p>
                    </div>
                    <form method='POST' onSubmit={submitRequestCallBackData} id="request-callback-form">
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-6">
                                <div className='form-input white-bgform'>
                                    <label>First Name*</label>
                                    <input type='text' placeholder='Enter Name' name="first_name" onChange={requestFirstNameHandler} defaultValue={user !== undefined && user !== '' ? user.first_name : ''} />
                                    <small id="requestFirstNameError" className="error"></small>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className='form-input white-bgform'>
                                    <label>Last Name*</label>
                                    <input type='text' placeholder='Enter Name' name="last_name" onChange={requestLastNameHandler} defaultValue={user !== undefined && user !== '' ? user.last_name : ''} />
                                    <small id="requestLastNameError" className="error"></small>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className='form-input white-bgform'>
                                    <label>Mobile Number*</label>
                                    <input type='number' placeholder='Enter Mobile Number' name='mobile' onChange={contactNumberHandler} minLength={10} maxLength={10} defaultValue={user !== undefined && user !== '' ? user.mobile : contactInput} />
                                    <small id="requestMobileError" className="error"></small>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className='form-input white-bgform'>
                                    <label>Email ID</label>
                                    <input type='text' placeholder='Enter Email ID' name='email' defaultValue={user !== undefined && user !== '' ? user.email : ''} />
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className='form-input mg-0'>
                                    <label>&nbsp;</label>
                                    <button type="submit" className='btn arrow-style blue-btn  fullwd-btn'><span>Submit</span></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {GetACall ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
        </section>
    )
}

export default RequestCallBack