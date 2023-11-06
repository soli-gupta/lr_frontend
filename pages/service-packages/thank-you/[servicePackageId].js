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

const fetcher = (url) => axios.get(url).then(res => res.data);

const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);

function FinalServiceDetails() {

    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { servicePackageId } = router.query;


    const [popUp, setPopUp] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState(false);


    const [tinyLoader, setTinyLoader] = useState(false);


    const { data, error } = useSWR(`${Url}user/fetch-order-details/${servicePackageId}`, loggedFetcher);

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

    const uploadDocsForCarInspaction = async (e) => {
        e.preventDefault();

        if (e.target.rc_certificate.files[0] === undefined && e.target.insurance_copy.files[0] === undefined) {
            document.getElementById('requestMobileError').innerHTML = 'Please upload atleast one document';
            document.getElementById("requestMobileError").style.display = "block";
            setTimeout(() => {
                document.getElementById('requestMobileError').innerHTML = '';
                document.getElementById("requestMobileError").style.display = "none";
            }, 3000);
            return false;
        }
        // document.getElementById('car-inspaction-upload-docs')
        setTinyLoader(true);
        const formData = new FormData();
        formData.append("rc_certificate", e.target.rc_certificate.files[0]);
        formData.append("insurance_copy", e.target.insurance_copy.files[0]);

        await axios.patch(`${Url}upload-doc-after-order/${servicePackageId}`, formData, {
            headers: {
                token: localStorage.getItem("lr-user-token")
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setPopUp(true);
                document.body.classList.add('hide-scroll-poup-new');
                setCallSuccessMessage(res.data.message);
                setTinyLoader(false);
                // alert(res.data.message);
                // router.push('/');
            }
        }).catch((e) => {
            setPopUp(true);
            document.body.classList.add('hide-scroll-poup-new');
            setTinyLoader(false);
            if (e && e.message) {
                setCallErrorMessage(e.message)
            } else if (e && e.response.data.status === 0) {
                setCallErrorMessage(e.response.data.message);
            } else if (e && e.response.data.status === 2) {
                setCallErrorMessage(e.response.data.message);
            }
        });
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

    }

    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.remove('hide-scroll-poup-new');
        setTinyLoader(false);
        router.push('/dashboard/service-package');
    }
    // setTimeout(() => {
    //     router.push('/dashboard/service-package');
    // }, 15000);

    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    if (!data.order) return <Loader loaderTitle={`Loading...`} />;

    return (
        <>
            <WebHead pageTitle={`Thank You`} />
            <section className="package-service bg-grey comPad">
                <div className="extra-pd-rightleft">
                    <div className='wrapper'>

                        <div className="row">
                            <div className="col-md-7">

                                <div className='formbx-white p-0 desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>
                                    </div>
                                    <div className='vehicle-list-detail'>
                                        <ul>
                                            {/* <li>Reg. Year<span>{data !== undefined && data.order !== undefined ? data.order.order_car_registration_year : ''}</span></li> */}
                                            <li>Brand<span>{data !== undefined && data.order !== undefined ? data.order.order_brand_name : ''}</span></li>
                                            <li>Model<span>{data !== undefined && data.order !== undefined ? data.order.order_model_name : ''}</span></li>
                                            <li>Variant<span>{data !== undefined && data.order !== undefined ? data.order.order_variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{data !== undefined && data.order !== undefined ? data.order.order_car_fuel_type : ''}</span></li>
                                            <li>KMs Driven<span>{data !== undefined && data.order !== undefined ? numberFormatter(data.order.order_car_kms) : ''}</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='formbx-white congratulation-bx' style={{ display: "block" }}>
                                    <div className='congo-namebx'>
                                        <div className='animation-icon'>
                                            <Lottie animationData={Congratulationstick} loop={true} />
                                        </div>
                                        <div className='msg-congo'>
                                            <h2>Congratulations! {data !== undefined && data.order !== undefined ? data.order.user_first_name + ' ' + data.order.user_last_name : ''}</h2>
                                            <ul>
                                                <li>+91-{data !== undefined && data.order !== undefined ? data.order.user_contact : ''}</li>
                                                <li>{data !== undefined && data.order !== undefined ? data.order.user_email_id : ''}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='payment-orderinfo'>
                                        {/* Your payment of
                                            <span>INR 34,999/- </span>has been received. */}
                                        Your order ID is <span>{data !== undefined && data.order !== undefined ? data.order.order_id : ''}</span>
                                    </div>

                                    <div className='address-confirmation'>
                                        <ul>
                                            {/* <li>
                                                <div className='icon-add'>
                                                    <img src="/img/messageblue-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                You would have got an SMS with all the details of your service
                                            </li> */}
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Preferred Service Centre</span>
                                                <b>{data !== undefined && data.order !== undefined ? data.order.service_center_name : ''}</b>
                                                {data !== undefined && data.order !== undefined ? data.order.service_center_address : ''}
                                            </li>
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Vehicle Inspection Address</span>

                                                <b>{data !== undefined && data.order !== undefined ? data.order.user_address_type : ''}</b>
                                                {data !== undefined && data.order !== undefined ? data.order.user_full_address : ''}
                                            </li>
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Vehicle Inspection Date</span>
                                                {data !== undefined && data.order !== undefined ?
                                                    `${fullDatabaseDateConverter(data.order.vehicle_inspaction_date).weekDay}, ${fullDatabaseDateConverter(data.order.vehicle_inspaction_date).day} ${fullDatabaseDateConverter(data.order.vehicle_inspaction_date).month}, ${fullDatabaseDateConverter(data.order.vehicle_inspaction_date).year}, ${data.order.vehicle_inspaction_time}`
                                                    : ''}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <form method="POST" onSubmit={uploadDocsForCarInspaction} id="car-inspaction-upload-docs" encType='multipart/form-data'>

                                    <div className='formbx-white uplaod-rc-documents'>
                                        <h3>Upload Documents Now Or At The Time Of The <br />Physical Inspection.</h3>
                                        <div className='form-input uplaod-custombtn'>
                                            <div className="uplaod-btnbx reg-uploadbx">
                                                <div className="uploadtxt" id="customupload">RC Registration Certificate <span>Upload a clear photo of your car’s RC</span></div>
                                                <input type="file" htmlFor="customupload" name="rc_certificate" className="upload-file registration-upload" />
                                                <div className="btn-txt"><span>Upload</span></div>
                                            </div >

                                            <div className="name-upload registrationfile">
                                                <p className="mb-0"></p>
                                                <a className="file-remove registrationfile-remove">Remove</a>
                                            </div>
                                        </div >

                                        <div className='form-input uplaod-custombtn'>
                                            <div className="uplaod-btnbx insurance-uploadbox">
                                                <div className="uploadtxt" id="customupload">Insurance Copy<span>Upload a clear photo of your existing car insurance</span></div>
                                                <input type="file" htmlFor="customupload" name="insurance_copy" className="upload-file insurance-upload" />
                                                <div className="btn-txt"><span>Upload</span></div>
                                            </div >

                                            <div className="name-upload insurance-filename">
                                                <p className="mb-0"></p>
                                                <a className="file-remove insuranceremovefile">Remove</a>
                                            </div>
                                            <small id="requestMobileError" className="error"></small>
                                        </div>

                                        <div className='form-input mg-0'>
                                            <button className='btn arrow-style blue-btn'>
                                                <ButtonSpinner load={tinyLoader} btnName={`Submit`} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-5">
                                <div className="nextstep">
                                    <div className='formbx-white p-0 mobile-view-hide'>
                                        <div className='border-heading relativediv'>
                                            <h3>Car Details</h3>
                                        </div>
                                        <div className='vehicle-list-detail'>
                                            <ul>
                                                {/* <li>Reg. Year<span>{data !== undefined && data.order !== undefined ? data.order.order_car_registration_year : ''}</span></li> */}
                                                <li>Brand<span>{data !== undefined && data.order !== undefined ? data.order.order_brand_name : ''}</span></li>
                                                <li>Model<span>{data !== undefined && data.order !== undefined ? data.order.order_model_name : ''}</span></li>
                                                <li>Variant<span>{data !== undefined && data.order !== undefined ? data.order.order_variant_name : ''}</span></li>
                                                <li>Fuel Type<span>{data !== undefined && data.order !== undefined ? data.order.order_car_fuel_type : ''}</span></li>
                                                <li>KMs Driven<span>{data !== undefined && data.order !== undefined ? numberFormatter(data.order.order_car_kms) : ''}</span></li>
                                            </ul>
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
                        </div >
                    </div>
                </div >
            </section >
            {popUp ? <SmallSuccessPopUp successMessage={callSuccessMessage} errorMessage={callErrorMessage} HidePopup={closePopUp} /> : ''}

        </>
    )
}


export default FinalServiceDetails;
