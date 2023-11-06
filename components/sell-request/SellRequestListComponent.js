import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json";
import noData from "@/public/lotie-icons/not-data-found.json"
import { Swiper, SwiperSlide } from "swiper/react";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import axios from 'axios';
import useSWR from 'swr'
import { ButtonSpinner, ConfirmationModal, capitalizeFirstLetter } from '@/components/Helper';
import ReScheduleForm from '@/components/sell-request/ReScheduleForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '@/components/common/Loader';
import { Navigation, Pagination } from "swiper";
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import { $ } from 'react-jquery-plugin'

const fetcher = (url) => axios.get(url, { headers: { token: localStorage.getItem('lr-user-token') } }).then(res => res.data);

function SellRequestListComponent(sell) {

    const router = useRouter()
    const { type } = router.query;

    const [CancelTestDrive, setCancelTestDrive] = useState(false);
    const [ReSchedule, setReSchedule] = useState(false);
    const [ExpectedPrice, setExpectedPrice] = useState(false);
    const [GetACall, setGetACall] = useState(false);
    const [sellRequestId, setSellRequestId] = useState('')
    const [tinyLoader, setTinyLoader] = useState(false);
    const [price, setPrice] = useState('')
    const [rescheduleData, setRescheduleData] = useState('')
    const [user, setUser] = useState('')

    const [currentCard, setCurrentCard] = useState('all');
    const [datas, setDatas] = useState(sell.data)
    const [allData, setAllData] = useState('all');

    const handleBtns = (id) => {
        setAllData(id);
    };


    const [confirmModel, setConfirmModel] = useState(false)

    const [docName, setDocName] = useState('')
    const [docThumbnail, setDocThumbnail] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [popUp, setPopUp] = useState(false);

    const swiperSettingMenuUser = {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: false,
        modules: [Pagination],

    }

    const openConfirmModel = (id, doc_name, doc_thumbnail) => {
        setSellRequestId(id)
        setDocName(doc_name)
        setDocThumbnail(doc_thumbnail)
        setConfirmModel(true)
    }


    const TestDrive = (id) => {
        setSellRequestId(id)
        setCancelTestDrive(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }

    const filterSellRequestStatus = async (e, status) => {
        setCurrentCard('requested')
        e.preventDefault();
        router.push(`?type=${status}`)
    }

    const EditPrice = (id) => {
        setSellRequestId(id)
        setExpectedPrice(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const ReScheduleTest = (id, data) => {
        setRescheduleData(data)
        setSellRequestId(id)
        setReSchedule(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }

    const GetCall = async (id) => {
        setGetACall(true)
        const data = {
            id: id,
        }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/sell-request-call-back`, data, {
            headers: {
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
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }

    const closePop = () => {
        setConfirmModel(false)
        setCancelTestDrive(false)
        setReSchedule(false)
        setExpectedPrice(false)
        setGetACall(false)
        setPopUp(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }

    }

    const hidePop = () => {
        setConfirmModel(false)
        setCancelTestDrive(false)
        setReSchedule(false)
        setExpectedPrice(false)
        setGetACall(false)
        setPopUp(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
        router.reload()
    }



    const openDescriptionDiv = () => {
        var reason = document.querySelector('input[name = cancel_reason]:checked').value;
        if (reason == "Others") {
            document.getElementById('reasonDiv').style.display = 'block';
            document.getElementById('cancel_reason_dscription').setAttribute('required', '');
            document.getElementById('cancelDescription').innerHTML = 'Please describe your cancel reason.';
            document.getElementById("cancelDescription").style.display = "block";
            setTimeout(() => {
                document.getElementById('cancelDescription').innerHTML = '';
                document.getElementById("cancelDescription").style.display = "none";
            }, 3000);
        } else {
            document.getElementById('reasonDiv').style.display = 'none';
            document.getElementById('cancel_reason_dscription').removeAttribute('required');
        }
    }

    const cancelEvaluation = async (e) => {
        e.preventDefault()
        let createError = 0;
        if (e.target.cancel_reason.value.length <= 0) {
            document.getElementById('cancelError').innerHTML = 'Please select your cancel reason.';
            document.getElementById("cancelError").style.display = "block";
            setTimeout(() => {
                document.getElementById('cancelError').innerHTML = '';
                document.getElementById("cancelError").style.display = "none";
            }, 3000);
            createError++;
        }
        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        const formData = new FormData(document.getElementById('cancelEvaluationForm'))
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/cancel-sell-data`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    // alert(res.data.message)
                    setPopUp(true)
                    setSuccessMessage(res.data.message)
                    document.body.classList.remove('hide-scroll-poup')
                    document.getElementById("cancelEvaluationForm").reset();
                    setCancelTestDrive(false)
                    // router.push('/dashboard/sell-requests')
                }
            })
            .catch(function (error) {
                setPopUp(true)
                setErrorMessage(error)
                console.log(error)
            });
    }



    const submitExpectedPrice = async (e) => {
        e.preventDefault()
        let createError = 0;
        let formData = ''

        if (e.target.expected_sell_price.value.length <= 0) {
            document.getElementById('errorPrice').innerHTML = 'Please enter your expected selling price';
            document.getElementById("errorPrice").style.display = "block";
            setTimeout(() => {
                document.getElementById('errorPrice').innerHTML = '';
                document.getElementById("errorPrice").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        setTinyLoader(true);
        formData = new FormData(document.getElementById('expectedPriceForm'))
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-data`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    document.body.classList.remove('hide-scroll-poup')
                    setTinyLoader(false)
                    setPrice(res.data.price)
                    setExpectedPrice(false)
                    router.push('/dashboard/sell-requests')
                }
            })
            .catch(function (error) {
                setTinyLoader(false)
                console.log(error)

            });
    }

    const removeEvaluationDoc = async (id, doc_name, doc_thumbnail) => {
        const data = {
            id: id,
            doc_name: doc_name,
            doc_thumbnail: doc_thumbnail
        }
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/remove-evaluation-doc`, data, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setConfirmModel(false)
                    router.reload()
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const submitRCAndInsurance = async (e, key) => {
        e.preventDefault()
        let createError = 0;
        if (document.getElementById('insurance_id_' + key).value === '' && document.getElementById('registration_id_' + key).value === '') {
            if (document.getElementById('car_insurance_' + key).value === '' && document.getElementById('rc_registration_certificate_' + key).value === '') {
                // setPopUp(true)
                // setErrorMessage('Please upload at least one doc or both.')
                document.getElementById('bothDocError_' + key).innerHTML = 'Please upload at least one doc or both.';
                document.getElementById("bothDocError_" + key).style.display = "block";
                setTimeout(() => {
                    document.getElementById('bothDocError_' + key).innerHTML = '';
                    document.getElementById("bothDocError_" + key).style.display = "none";
                }, 3000);

                return false
            }
        }

        if (document.getElementById('insurance_id_' + key).value && e.target.rc_registration_certificate.value.length <= 0) {
            // setPopUp(true)
            // setErrorMessage('Please upload rc_registration_certificate.')
            document.getElementById('rcImage_' + key).innerHTML = 'Please upload rc registration certificate.';
            document.getElementById("rcImage_" + key).style.display = "block";
            setTimeout(() => {
                document.getElementById('rcImage_' + key).innerHTML = '';
                document.getElementById("rcImage_" + key).style.display = "none";
            }, 3000);
            return false

        } else if (document.getElementById('registration_id_' + key).value && e.target.car_insurance.value.length <= 0) {
            document.getElementById('insuranceImage_' + key).innerHTML = 'Please upload car insurance copy.';
            document.getElementById("insuranceImage_" + key).style.display = "block";
            setTimeout(() => {
                document.getElementById('insuranceImage_' + key).innerHTML = '';
                document.getElementById("insuranceImage_" + key).style.display = "none";
            }, 3000);
            return false
        }

        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }
        setTinyLoader(true);
        const formData = new FormData(document.getElementById(`uploadFileForm_${key}`))

        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/update-sell-data`, formData, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    console.log(res.data)
                    setPopUp(true)
                    setSuccessMessage(res.data.messages)
                    setTinyLoader(false)

                }
            })
            .catch(function (error) {
                setTinyLoader(false)
                console.log(error)

            });
    }

    setTimeout(() => {
        if (typeof window !== "undefined") {
            $(".registration-upload").on("change", function (e) {
                e.preventDefault();
                var filename = e.target.files[0].name
                $(".registrationfile p").text(filename)
                $(".reg-uploadbx").hide();
                $(".registrationfile").show();
            })

            $(".registrationfile .registrationfile-remove").on("click", function (e) {
                e.preventDefault();
                $(".reg-uploadbx").show();
                $("#rc_registration_certificate").val('')
                $(".registrationfile").hide();
            })


            $(".insurance-upload").on("change", function (e) {
                e.preventDefault();
                var filename = e.target.files[0].name
                $(".insurance-filename p").text(filename)
                $(".insurance-uploadbox").hide();
                $(".insurance-filename").show();
            })

            $(".insurance-filename .insuranceremovefile").on("click", function (e) {
                e.preventDefault();
                $(".insurance-uploadbox").show();
                $("#car_insurance").val('')
                $(".insurance-filename").hide();
            })
        }

    }, 100);

    useEffect(() => {
        if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
            router.push("/");
        }
        $('.numberonly').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });
        if (allData === 'all') {
            setDatas(sell.data);
        } else {
            const filtered = sell.data.filter((card) => {
                return (
                    card.status === allData
                );
            });
            setDatas(filtered);
        }

        axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-user-profile`, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            setUser(res.data.user);

        }).catch((err) => {
            if (err && err.response && err.response.data.status) {
                alert('Something went wrong!');
            }
        });

        setTimeout(() => {
            Fancybox.bind('[data-fancybox]', {
            });

        }, 1000);


    }, [allData, sell])

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}user/user-sell-request-list?type=${type}`, fetcher);

    // if (error) console.log(error)

    // if (!data) return 'Please wait....'


    // if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    // if (!data) return <Loader loaderTitle={`Loading...`} />;
    // console.log(data)
    return (
        <>

            <div className='white-inner'>
                <div className='car-user-filter'>
                    <ul>
                        <Swiper {...swiperSettingMenuUser}>
                            <SwiperSlide> <li className={`${allData === 'all' ? 'active' : ''}`} onClick={(e) => handleBtns('all')} >All</li></SwiperSlide>
                            <SwiperSlide>  <li className={`${allData === 1 ? 'active' : ''}`} onClick={(e) => handleBtns(1)}>Requested</li></SwiperSlide>
                            <SwiperSlide>  <li className={`${allData === 5 ? 'active' : ''}`} onClick={(e) => handleBtns(5)}>Pending</li></SwiperSlide>
                            <SwiperSlide>   <li className={`${allData === 2 ? 'active' : ''}`} onClick={(e) => handleBtns(2)}>Completed</li></SwiperSlide>
                            <SwiperSlide>   <li className={`${allData === 3 ? 'active' : ''}`} onClick={(e) => handleBtns(3)}>Cancelled</li></SwiperSlide>
                        </Swiper>

                    </ul>
                </div>
                <div className='list-box gap'>
                    {datas !== undefined && datas.length > 0 && datas ? datas.map((sellRequest, i) => {
                        return (
                            <>
                                <div className={`list  ${sellRequest.step_form !== 5 && sellRequest.status === 5 ? 'pending' : sellRequest.status === 2 ? 'completed' : sellRequest.status === 3 ? 'cancelled' : ''}`} key={i}>
                                    <div className='date'>{new Date(sellRequest.createdAt).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(sellRequest.createdAt).getDate()} {new Date(sellRequest.createdAt).toLocaleDateString('en-IN', { month: 'long' })}  {new Date(sellRequest.createdAt).getFullYear()}</div>

                                    <div className='grey-bg'>
                                        <div className="prductSec01">
                                            <div className='flag'>{sellRequest.step_form !== 5 && sellRequest.status === 5 ? 'Pending' : sellRequest.status === 1 ? 'Requested' : sellRequest.status === 2 ? 'Completed' : sellRequest.status === 3 ? 'Cancelled' : sellRequest.status === 4 ? 'Evaluator Assigned' : ''}</div>

                                            <div className="row">
                                                <div className="col-md-8 right-broder">
                                                    <div className='order-id'>Request ID: {sellRequest.request_id}</div>
                                                    <h1>{sellRequest.brand_name} {sellRequest.model_name} {sellRequest.variant_name}</h1>
                                                    <ul>
                                                        <li>{sellRequest.year}</li>
                                                        <li>{sellRequest.ownership}{sellRequest.ownership === "1" ? 'st' : sellRequest.ownership === "2" ? 'nd' : sellRequest.ownership === "3" ? 'rd' : ''}</li>
                                                        <li>{sellRequest.kms && Number(sellRequest.kms).toLocaleString('en-US')}</li>

                                                    </ul>
                                                </div>
                                                <div className="price-detail col-md-4 no-border" >
                                                    <div className='expected-price'>Expected Selling Price</div>

                                                    {sellRequest.status === 3 ?
                                                        <div className="price">
                                                            {sellRequest.expected_sell_price ?
                                                                <span style={{ color: 'gray' }}>
                                                                    {Number(sellRequest.expected_sell_price).toLocaleString('en-US')}/-
                                                                </span>
                                                                : <span style={{ color: 'gray' }}>
                                                                    ----
                                                                </span>}
                                                            <span className='Edit-Price' style={{ color: 'gray' }}>
                                                            </span>
                                                        </div>
                                                        :
                                                        <div className="price">
                                                            {price ?
                                                                <span>
                                                                    {Number(price).toLocaleString('en-US')}/-
                                                                </span>
                                                                : sellRequest.expected_sell_price ?
                                                                    <span>
                                                                        {Number(sellRequest.expected_sell_price).toLocaleString('en-US')}/-
                                                                    </span> : ''}

                                                            <span style={{ marginLeft: "8px", position: "relative", top: "-3px" }} onClick={() => EditPrice(sellRequest._id)} className='Edit-Price'>
                                                                {sellRequest.expected_sell_price ? 'Edit' : 'Add Price'}
                                                            </span>
                                                        </div>
                                                    }

                                                </div>

                                            </div>

                                        </div>
                                        {/** for Evaluation Completed*/}
                                        {sellRequest.status === 2 ?
                                            <div className='car-user-info  two-colum align-top gap-b'>

                                                <div className='car-div-dashboard no-border'>
                                                    <h3 className='assigned'>Evaluation Completed</h3>
                                                </div>
                                                <div className='car-div-dashboard no-block actions'>
                                                    <div onClick={() => GetCall(sellRequest._id)} className='get-a-call-back no-gap'>Get A Call Back</div>

                                                </div>

                                            </div>
                                            //  for Evaluation cancelled
                                            :
                                            sellRequest.status === 3 ?
                                                <div className='car-user-info two-colum align-top gap-b'>
                                                    <div className='car-div-dashboard no-border'>
                                                        <h3 className='assigned'>Evaluation Cancelled</h3>
                                                        <p><span>Reason:</span> {sellRequest.cancel_reason}</p>
                                                    </div>

                                                    <div className='car-div-dashboard  no-block actions'>
                                                        <div onClick={() => GetCall(sellRequest._id)} className='get-a-call-back' onC>Get A Call Back</div>
                                                    </div>
                                                </div>
                                                //  for Request Evaluation
                                                : sellRequest.status === 5 ?
                                                    <div className='car-user-info two-colum align-top gap-b'>
                                                        <div className='car-div-dashboard no-border'>
                                                            <h3>Evaluation Requested</h3>
                                                            <p>We will soon assign a luxury car evaluator for your doorstep car evaluation</p>
                                                        </div>

                                                        <div className='car-div-dashboard no-block actions'>
                                                            <div>
                                                                <Link href={`/dashboard/sell-requests/${sellRequest._id}`}>
                                                                    <div className='btn  reverse'>Complete Your Form</div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : <div className='car-user-info two-colum align-top gap-b'>
                                                        <div className='car-div-dashboard no-border'>
                                                            <h3>Evaluation Requested</h3>
                                                            <p>We will soon assign a luxury car evaluator for your doorstep car evaluation</p>
                                                        </div>

                                                        <div className='car-div-dashboard mobile-view-hide no-block actions'>
                                                            <div>
                                                                <div className='btn blueBdr' onClick={() => TestDrive(sellRequest._id)} >Cancel Evaluation</div>
                                                                <div onClick={() => ReScheduleTest(sellRequest._id, sellRequest)} className='btn  reverse'>Reschedule Evaluation</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                        }


                                        {sellRequest.status === 2 &&
                                            <div className='evaluator-person'>
                                                <div className='E-person'>
                                                    <img src="../img/evaluator-img.png" alt="" />
                                                    Hi I’m Rohit Kumar
                                                    <span>I’m your evaluator for Audi A3 35 TDI Attraction</span>
                                                </div>

                                                <div className='user-rating'>Rate your experience

                                                    <div className='ratings'>

                                                        <div className='star active'><span>1</span></div>
                                                        <div className='star active'><span>2</span></div>
                                                        <div className='star active'><span>3</span></div>
                                                        <div className='star'><span>4</span></div>
                                                        <div className='star'><span>5</span></div>
                                                        <div className='rating-text'>Good 😊</div>
                                                    </div>
                                                </div>
                                            </div>
                                        }


                                        <div className='car-user-info align-top'>

                                            <div className='car-div-dashboard'>

                                                <h3>Car Owner Details</h3>

                                                <div className="user-name-in">{sellRequest.user_name}</div>
                                                <div className="user-email"> {sellRequest.user_email}</div>

                                            </div>

                                            <div className='car-div-dashboard'>

                                                <h3>Evaluation Location</h3>
                                                {sellRequest.address_type ?
                                                    <div className='location'>
                                                        {sellRequest.address_type && capitalizeFirstLetter(sellRequest.address_type)}
                                                    </div>
                                                    : ''

                                                }
                                                {sellRequest.full_address ?
                                                    <p>{sellRequest.full_address}, {sellRequest.state}, ({sellRequest.city}) – {sellRequest.pincode}</p>
                                                    : ''}


                                            </div>

                                            <div className='car-div-dashboard'>

                                                <h3>Evaluation Date & Time</h3>
                                                {sellRequest.slot_date ?
                                                    <div className='date icons'><span>Date</span>{new Date(sellRequest.slot_date).toLocaleDateString('en-IN', { weekday: 'long' })}, {new Date(sellRequest.slot_date).getDate()} {new Date(sellRequest.slot_date).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(sellRequest.slot_date).getFullYear()}</div>
                                                    : ''
                                                }
                                                {sellRequest.slot_time ? <div className='time icons'><span>Time</span>{sellRequest.slot_time}</div> : ''}


                                            </div>
                                        </div>
                                        {sellRequest.status !== 3 &&
                                            <>
                                                <form id={`uploadFileForm_${i}`} method='POST' onSubmit={(e) => submitRCAndInsurance(e, i)}>
                                                    <input type="hidden" name="" id="keyValue" defaultValue={i} />
                                                    <div className='dahsboard-upload'>
                                                        {sellRequest.rc_registration_certificate ?
                                                            <>
                                                                <div className='form-input uplaod-custombtn  upload2'>
                                                                    <div className="uploadtxt" id="customupload2">Registration Certificate
                                                                        <span> Uploaded a photo of your car’s RC</span>
                                                                    </div>
                                                                    <div className='after-upload'>

                                                                        <div className='delete-view'>
                                                                            <span style={{ cursor: 'pointer' }} onClick={() => openConfirmModel(sellRequest._id, sellRequest.rc_registration_image_name, sellRequest.rc_registration_thumbnail)}>Remove</span>
                                                                            <a data-fancybox="" href={`${process.env.NEXT_PUBLIC_URL}${sellRequest.rc_registration_certificate}`}>View</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='form-input uplaod-custombtn'>
                                                                <div className="uplaod-btnbx reg-uploadbx">
                                                                    <div className="uploadtxt" id="rcUpload">RC Registration Certificate <span>Upload a clear photo of your car’s RC</span></div>
                                                                    <input type="hidden" id={`registration_id_${i}`} defaultValue={sellRequest.rc_registration_certificate} />
                                                                    <input type="hidden" id={`insurance_id_${i}`} defaultValue={sellRequest.car_insurance} />
                                                                    <input type="file" htmlFor="rcUpload" className="upload-file registration-upload" accept="image/*,.pdf" name="rc_registration_certificate" id={`rc_registration_certificate_${i}`} />
                                                                    <div className="btn-txt"><span>Upload</span></div>
                                                                    <small id={`rcImage_${i}`} className="error"></small>
                                                                </div >

                                                                <div className="name-upload registrationfile">
                                                                    <p className="mb-0"></p>
                                                                    <Link href="#" className="file-remove registrationfile-remove">Remove</Link>
                                                                </div>
                                                            </div >
                                                        }
                                                        {
                                                            sellRequest.car_insurance ?
                                                                <>
                                                                    <div className='form-input uplaod-custombtn  upload2'>
                                                                        <div className="uploadtxt" id="customupload2">Insurance Copy <span>Uploaded a clear photo of your existing car insurance</span></div>
                                                                        <div className='after-upload'>
                                                                            <div className='delete-view'>
                                                                                <span style={{ cursor: 'pointer' }} onClick={() => openConfirmModel(sellRequest._id, sellRequest.car_insurance_image_name, sellRequest.car_insurance_thumbnail)}>Remove</span>
                                                                                <a data-fancybox href={`${process.env.NEXT_PUBLIC_URL}${sellRequest.car_insurance}`}>View</a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>

                                                                    <div className='form-input uplaod-custombtn'>
                                                                        <div className="uplaod-btnbx insurance-uploadbox">
                                                                            <div className="uploadtxt" id="insuranceUpload">Insurance Copy<span>Upload a clear photo of your existing car insurance</span></div>
                                                                            <input type="hidden" id={`registration_id_${i}`} defaultValue={sellRequest.rc_registration_certificate} />
                                                                            <input type="hidden" id={`insurance_id_${i}`} defaultValue={sellRequest.car_insurance} />
                                                                            <input type="file" htmlFor="insuranceUpload" className="upload-file insurance-upload" accept="image/*,.pdf" name="car_insurance" id={`car_insurance_${i}`} />
                                                                            <div className="btn-txt"><span>Upload</span></div>
                                                                            <small id={`insuranceImage_${i}`} className="error"></small>
                                                                        </div >

                                                                        <div className="name-upload insurance-filename">
                                                                            <p className="mb-0"></p>
                                                                            <Link href="#" className="file-remove insuranceremovefile">Remove</Link>
                                                                        </div>
                                                                    </div >
                                                                </>
                                                        }
                                                        <input type="hidden" defaultValue={sellRequest._id} name="id" />
                                                        <small id={`bothDocError_${i}`} className="error"></small>
                                                        <button className="btn arrow-style blue-btn"><span>Upload</span></button>
                                                    </div >
                                                </form >

                                            </>

                                        }

                                        {sellRequest.status === 1 ?

                                            <div className='car-div-dashboard desktop-hide-div mobile-show-div actions'>
                                                <div>
                                                    <div className='btn blueBdr' onClick={() => TestDrive(sellRequest._id)} >Cancel Evaluation</div>
                                                    <div onClick={() => ReScheduleTest(sellRequest._id, sellRequest)} className='btn  reverse'>Reschedule Evaluation</div>
                                                </div>
                                            </div>

                                            : ""}

                                        <div className='query-call'>For inquiries or assistance, reach us at <a href='tel:+9184100-84100'>+91 8410084100</a> or <a href='mailto:info@luxuryride.in'>info@luxuryride.in.</a></div>
                                    </div >
                                </div >
                            </>
                        )
                    }) :
                        <div className='no-data-found'>

                            <div className='lotie'> <Lottie animationData={noData} loop={true} /></div>
                            <h3>No Requests Found</h3>
                        </div>
                    }

                </div >

            </div >

            {
                CancelTestDrive ?

                    <div style={{ display: "block" }
                    } className={`common-popup login mob-radio cancel-test`}>
                        <div onClick={closePop} className="overlay-mob mobile-style"></div>
                        <div className='popup-inner'>

                            <div className='popup-close' onClick={closePop}></div>

                            <div className='before-otp'>


                                <h3>Cancel Car Evaluation</h3>

                                <p>Please specify reason for cancellation.*</p>

                                <form name="cancelEvaluation" id="cancelEvaluationForm" method='POST' onSubmit={cancelEvaluation}>

                                    <div className='from-row border-style'>

                                        <div className='form-div'>
                                            <small id="cancelError" className="error"></small>
                                            <div className='radio-div'>
                                                <input id='better' type="radio" name="cancel_reason" defaultValue="Already sold the car" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="better">
                                                    Already sold the car

                                                </label>

                                            </div>

                                            <div className='radio-div'>
                                                <input id='station' type="radio" name="cancel_reason" defaultValue="Not looking to sell" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="station">
                                                    Not looking to sell

                                                </label>
                                            </div>

                                            <div className='radio-div'>
                                                <input id='accident' type="radio" name="cancel_reason" defaultValue="Going on a vacation" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="accident">
                                                    Going on a vacation

                                                </label>
                                            </div>

                                            <div className='radio-div'>
                                                <input id='sold' type="radio" name="cancel_reason" defaultValue="Exploring only" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="sold">
                                                    Exploring only

                                                </label>
                                            </div>

                                            <div className='radio-div'>
                                                <input id='Others' type="radio" name="cancel_reason" defaultValue="Others" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="Others"  >
                                                    Others
                                                </label>

                                            </div>
                                            <div id="reasonDiv" style={{ display: 'none' }}>
                                                <textarea className='grey-bg' placeholder='Please mention your reason*' name="cancel_reason_dscription" id="cancel_reason_dscription" cols="30" rows="10"></textarea>
                                                <small id="cancelDescription" className="error"></small>
                                            </div>
                                            <input type="hidden" name="id" id="" defaultValue={sellRequestId} />
                                            <input type='hidden' name="status" defaultValue="3" />


                                        </div>
                                    </div>
                                    <div className='center-btns two-btn'>
                                        <div className='popup-close-mob mobile-style' onClick={closePop}>Close</div>
                                        <button className='btn reverse'>Cancel Evaluation</button>
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div >


                    : ""

            }

            {confirmModel ? <ConfirmationModal confirm={confirmModel} msg="Are you sure to delete this record?" closePop={closePop} method={() => removeEvaluationDoc(sellRequestId, docName, docThumbnail)} /> : ''}

            {
                ExpectedPrice ?
                    <div style={{ display: "block" }} className={`common-popup login cancel-test expected`}>
                        <div className="overlay-mob mobile-style" onClick={closePop}></div>
                        <div className='popup-inner'>
                            <div className='popup-close' onClick={closePop}></div>
                            <div className='before-otp'>
                                <h3>Expected Selling Price</h3>
                                <form id="expectedPriceForm" method='POST' onSubmit={(e) => submitExpectedPrice(e)}>
                                    <div className='row' id="expectedPriceDiv">
                                        <div className='col-md-12'>
                                            <div className='form-input'>
                                                <input type="hidden" defaultValue={sellRequestId} name="id" />
                                                <input type='text' placeholder='Expected Selling Price' name="expected_sell_price" onChange={(e) => handlePrice(e)} className="numberonly1" defaultValue={price} minLength={4} maxLength={7} />
                                                <small id="errorPrice" className="error"></small>
                                            </div>
                                        </div>
                                        <div className='col-md-12 center-btns'>
                                            <div className='form-input mb-0'>
                                                <button type='submit' className='btn arrow-style blue-btn'>
                                                    <span>
                                                        <ButtonSpinner load={tinyLoader} btnName="Submit" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    : ""
            }

            {
                ReSchedule ?
                    <ReScheduleForm closePop={closePop} sellRequestId={sellRequestId} data={rescheduleData} />
                    : ""
            }

            {
                GetACall ?
                    <div style={{ display: "block" }} className={`common-popup login get-acall`}>
                        <div className="overlay-mob mobile-style" onClick={closePop}></div>
                        <div className='popup-inner'>
                            <div className='popup-close' onClick={closePop}></div>

                            <div className='thankyou'>
                                <div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

                                <p>Our Luxury Ride executive will<br /> get in touch with you shortly.</p>

                            </div>
                        </div>

                    </div>
                    : ""

            }
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={hidePop} /> : ''}


        </>
    )
}

export default SellRequestListComponent
