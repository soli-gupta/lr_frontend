import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';
import { $ } from 'react-jquery-plugin';
import Link from 'next/link';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { ButtonSpinner } from './Helper';

export default function LoginForm(props) {
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [tinyLoader, setTinyLoader] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('')
    const [counter, setCounter] = useState(0);

    const router = useRouter()
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validateMobileNumber = Yup.object().shape({
        mobile: Yup.string()
            .required('Please enter your mobile number')
            .matches(phoneRegExp, 'Mobile number is not valid'),

    });
    const formOptions = { resolver: yupResolver(validateMobileNumber) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);

    const { errors } = formState;


    const userLogin = async (data) => {
        setCounter(59)
        setMobileNumber(data.mobile)
        setStep1(false)
        setStep2(true)
        setTinyLoader(true)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user-login`, data)
            .then(function (res) {
                if (res.data.status == 1) {
                    setTinyLoader(false)
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

    const OtpVerify = async (data) => {
        if (data.otp === '') {
            document.getElementById('otpError').style.display = "block"
            document.getElementById('otpError').innerHTML = 'Please enter OTP.'
            setTimeout(() => {
                document.getElementById('otpError').style.display = "none"
                document.getElementById('otpError').innerHTML = ''
            }, 3000)
            return false
        }
        setTinyLoader(true);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}otp-verify`, data)
            .then(function (res) {

                if (res.data.status == 1) {

                    localStorage.setItem('lr-user-token', res.data.token)
                    // router.reload();
                    setTinyLoader(false)
                    props.closePop();
                    props.submitDataAfterSubmitLogIn();
                    router.push(props.redirectRoute, null, { shallow: true });

                }

            }).catch(function (error) {
                // console.log(error);
                if (error && error.response && error.response.data && error.response.data.status === 0) {
                    document.getElementById('otpError').style.display = "block"
                    document.getElementById('otpError').innerHTML = error.response.data.message
                    setTimeout(() => {
                        document.getElementById('otpError').style.display = "none"
                        document.getElementById('otpError').innerHTML = ''
                    }, 3000)
                    // NotificationManager.error(error.response.data.message);
                    // alert(error.response.data.message);
                    // if (error.response.data.status == 0) {
                    //     alert(error.response.data.message)
                    // } 
                }
            });

    }

    const resendOTP = async () => {
        // countdown('otp-timer', 1, 0)
        let otp = document.getElementById('otp').value;
        if (otp) {
            document.getElementById('otp').value = ''
        }
        setCounter(59)
        setMobileNumber(mobileNumber)
        setStep1(false)
        setStep2(true)

        await axios.post(`${process.env.NEXT_PUBLIC_URL}user-login`, { mobile: mobileNumber })
            .then(function (res) {
                if (res.data.status == 1) {

                    // alert(res.data.message);
                }
            }).catch(function (error) {
                console.log(error)
            });
    }

    if (props.closePop) {
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    const changeNumber = () => {
        document.getElementById('LoginFormDiv').reset()
        setStep1(true)
        setStep2(false)
    }

    useEffect(() => {

        // if (props.Login) {
        //     if (typeof window !== "undefined") {
        //         document.body.classList.add('hide-scroll-poup');
        //     }
        // }

        $('#mobile').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });
        $('#otp').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);



    }, [counter, props.Login, props.closePop, typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false])

    return (
        <>
            <div className={`${props.Login ? "open-popup" : ""} common-popup login main-login`}>

                <div onClick={props.closePop} className="overlay-mob mobile-style"></div>

                <div className='popup-inner'>

                    <div className='popup-close' onClick={props.closePop}></div>

                    <div className='before-otp' style={{ display: `${step1 ? 'block' : 'none'}` }}>
                        <img src="/img/login-icon.svg" />

                        <h3>Login To Continue</h3>

                        <form method='POST' onSubmit={handleSubmit(userLogin)} id="LoginFormDiv">

                            <div className='from-row'>

                                <div className='form-div'>

                                    <label>Mobile Number</label>
                                    <input type="text" {...register('mobile')} id="mobile" name="mobile" maxLength={10} />
                                    <div className="error">{errors.mobile?.message}</div>

                                </div>
                            </div>
                            <div className='from-row'>
                                <div className='form-div checkbox'>
                                    <input id={`${props.loginId ? props.loginId : 'whatsappUpdate'}`} type="checkbox" defaultChecked />
                                    <label htmlFor={`${props.loginId ? props.loginId : 'whatsappUpdate'}`}>Get updates on <span>WhatsApp</span></label>
                                    <div className='clr'></div>
                                    <div className='links'>By proceeding you agree to the <Link href='/privacy-policy' onClick={props.closePop}>Privacy Policy</Link> and <Link href='/terms-conditions' onClick={props.closePop}> Terms and Conditions</Link></div>

                                </div>
                            </div>
                            <button type='submit' className='btn'>
                                <span>
                                    <ButtonSpinner load={tinyLoader} btnName="Request OTP" />
                                </span>
                            </button>
                        </form>

                    </div>

                    <div className='after-otp' style={{ display: `${step2 ? 'block' : 'none'}` }}>
                        <img src="/img/otp-icon.svg" />

                        <h3>Enter OTP</h3>
                        <form method='POST' onSubmit={handleSubmit(OtpVerify)}>
                            <div className='from-row'>

                                <div className='form-div'>
                                    <p>Kindly enter the OTP sent to <i>{mobileNumber}</i> <span onClick={() => changeNumber()}>Change</span></p>
                                    <input type="hidden" name="mobile" id="mobileNumber" defaultValue={mobileNumber} />
                                    <input type="text" {...register('otp')} maxLength={4} name="otp" id="otp" />
                                    <div className="error">{errors.otp?.message}</div>
                                    <div className='error' id="otpError"> </div>

                                </div>
                            </div>
                            <button type='submit' className='btn'>
                                <span>
                                    <ButtonSpinner load={tinyLoader} btnName="Verify & Proceed" />
                                </span>
                            </button>

                            <div className='resend-otp'>Didn’t receive your OTP?
                                {counter === 0
                                    ? <span id="resendOtp" onClick={() => resendOTP()}>Resend OTP</span>
                                    : <span className='otp-timer'>0:{counter}</span>
                                }

                            </div>
                        </form>

                    </div>

                </div>

            </div>
            {/* <NotificationContainer /> */}
        </>
    )
}
