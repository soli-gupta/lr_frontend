import React, { useEffect, useState } from 'react'
import Lottie from "lottie-react";
import axios from 'axios';
import noData from "@/public/lotie-icons/not-data-found.json"
import Link from 'next/link';
import ReScheduleCarCare from './ReScheduleCarCare';
import SmallSuccessPopUp from '../smallSuccessPopUp';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useRouter } from 'next/router';
import ServicePartner from '../ServicePartner';

export default function CarCareComponent(carCare) {
    const router = useRouter()
    const [data, setData] = useState(carCare.data)
    const [allData, setAllData] = useState('all');
    const [CancelTestDrive, setCancelTestDrive] = useState(false);
    const [ReSchedule, setReSchedule] = useState(false);
    const [rescheduleData, setRescheduleData] = useState('')
    const [carCareId, setCarCareId] = useState('')
    const [tinyLoader, setTinyLoader] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [popUp, setPopUp] = useState(false);


    const swiperSettingMenuUser = {
        slidesPerView: "auto",
        spaceBetween: 10,
        loop: false,
        modules: [Pagination],

    }

    const TestDrive = (id) => {
        setCarCareId(id)
        setCancelTestDrive(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }

    const handleBtns = (id) => {
        setAllData(id);
    };


    const closePop = () => {
        setCancelTestDrive(false)
        setReSchedule(false)
        setPopUp(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    const HidePopup = () => {
        setCancelTestDrive(false)
        setReSchedule(false)
        setPopUp(false)
        router.reload()
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }


    const openDescriptionDiv = () => {
        var reason = document.querySelector('input[name = cancel_reason]:checked').value;
        if (reason == "Others") {
            document.getElementById('reasonDiv').style.display = 'block';
            document.getElementById('cancel_reason_dscription').setAttribute('required', '');
            document.getElementById('cancelDescription').innerHTML = 'Please describe your cancel reason.';
            document.getElementById("cancelDescription").style.display = "block";
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
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/cancel-car-care-request`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setPopUp(true)
                    setSuccessMessage(res.data.message)
                    document.body.classList.remove('hide-scroll-poup')
                    document.getElementById("cancelEvaluationForm").reset();
                    setCancelTestDrive(false)

                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const ReScheduleTest = (id, data) => {
        setRescheduleData(data)
        setCarCareId(id)
        setReSchedule(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }
    useEffect(() => {
        if (allData === 'all') {
            setData(carCare.data);
        } else {
            const filtered = carCare.data.filter((card) => {

                return (
                    card.status === allData
                );
            });
            setData(filtered);
        }

    }, [allData, carCare])

    return (
        <>
            <div className='car-user-filter'>
                <ul>
                    <Swiper {...swiperSettingMenuUser}>
                        <SwiperSlide> <li className={`${allData === 'all' ? 'active' : ''}`} onClick={(e) => handleBtns('all')} >All</li></SwiperSlide>
                        <SwiperSlide>  <li className={`${allData === 1 ? 'active' : ''}`} onClick={(e) => handleBtns(1)}>Upcoming</li></SwiperSlide>
                        <SwiperSlide>  <li className={`${allData === 5 ? 'active' : ''}`} onClick={(e) => handleBtns(5)}>Pending</li></SwiperSlide>
                        <SwiperSlide>   <li className={`${allData === 4 ? 'active' : ''}`} onClick={(e) => handleBtns(4)}>On-going</li></SwiperSlide>
                        <SwiperSlide>   <li className={`${allData === 2 ? 'active' : ''}`} onClick={(e) => handleBtns(2)}>Completed</li></SwiperSlide>
                        <SwiperSlide>   <li className={`${allData === 3 ? 'active' : ''}`} onClick={(e) => handleBtns(3)}>Cancelled</li></SwiperSlide>
                    </Swiper>
                </ul>
            </div>

            <div className='list-box gap'>
                {data !== undefined && data.length > 0 && data ? data.map((carcare, i) => {
                    return (
                        <>
                            {/* <div className={`list ${carcare.status === 2 ? 'completed' : carcare.status === 3 ? 'cancelled' : carcare.step_form === '5' ? 'pending' : carcare.status === 1 ? 'Upcoming' : ''}`} key={i}> */}

                            <div className={`list ${carcare.step_form !== 6 ? 'pending' : carcare.status === 2 ? 'completed' : carcare.status === 3 ? 'cancelled' : ''}`} key={i}>
                                <div className='date'>{new Date(carcare.createdAt).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(carcare.createdAt).getDate()} {new Date(carcare.createdAt).toLocaleDateString('en-IN', { month: 'long' })}  {new Date(carcare.createdAt).getFullYear()}</div>
                                <div className='grey-bg'>
                                    <div className="prductSec01">
                                        <div className='flag'>{carcare.step_form !== 6 ? 'Pending' : carcare.status === 1 ? 'Upcoming' : carcare.status === 2 ? 'Completed' : carcare.status === 3 ? 'Cancelled' : carcare.status === 4 ? 'On-going' : ''} </div>
                                        <div className="row">
                                            <div className="col-md-9 right-broder">
                                                <div className='order-id'>Order ID: {carcare.order_id}</div>
                                                <h1>{`${carcare.brand_name} ${carcare.model_name}`}</h1>
                                                <ul>
                                                    <li>{carcare.color}</li>
                                                </ul>
                                            </div>

                                            <div className="price-detail col-md-3 no-border text-right">
                                                <div className='expected-price'>Amount Pending</div>
                                                <div className="price">INR <span>34,999/-</span></div>
                                            </div>
                                            <div className="car-div-dashboard for-mobile actions mobile-style">
                                                {carcare.step_form !== 6 && <Link href={`/dashboard/car-care/${carcare._id}`} className='btn  reverse'>Complete Your Form</Link>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Service Detail */}
                                    <div className='car-user-info two-colum align-top gap-b'>
                                        <div className='car-div-dashboard no-border'>
                                            {/* <h4>PPF (Paint Protection Film) 3 Years</h4> */}
                                            {carcare.status === 3 ?
                                                <>
                                                    <h3 className='assigned'>Appointment Cancelled</h3>
                                                    <p><span>Reason:</span> Getting better offer</p>
                                                </>
                                                : ""}
                                        </div>

                                        {carcare.status === 3 ? <>
                                            <div className='car-div-dashboard no-block actions'>
                                                <div>
                                                    <div onClick={() => ReScheduleTest(carcare._id, carcare)} className='btn  reverse'>
                                                        Reschedule Appointment</div>
                                                </div>
                                            </div>
                                            <div className='car-div-dashboard no-block actions'>

                                            </div>
                                        </> : ''}

                                        {carcare.status === 4 ? <div className='car-div-dashboard no-border align-right'>
                                            <h5 className='gap-b2'>Proforma Invoice</h5>
                                            <div className='view-detail blue-border-style'>View</div>
                                            <div className='view-detail blue-border-style green'>Make Payment</div>
                                        </div> : ''}
                                    </div>

                                    {/* {carcare.status === 4 || carcare.status === 2 ?
                                        <div className='evaluator-person'>
                                            <div className='E-person'>
                                                <img src="../img/evaluator-img.png" alt="" />
                                                Hi I’m Rohit Kumar
                                                <span>I’m your Service Buddy and will be managing your complete service experience. Please get in touch in case of any queries.</span>
                                            </div>
                                            <div className="e-action">
                                                <a className="Call-now" href="tel:9898973240">Call Now</a>
                                            </div>
                                            {carcare.status !== 4 && carcare.status === 2 ?
                                                <div className='user-rating'>Rate your experience

                                                    <div className='ratings'>

                                                        <div className='star active'><span>1</span></div>
                                                        <div className='star active'><span>2</span></div>
                                                        <div className='star active'><span>3</span></div>
                                                        <div className='star'><span>4</span></div>
                                                        <div className='star'><span>5</span></div>

                                                        <div className='rating-text'>Good 😊</div>

                                                    </div>

                                                </div> : ''}

                                        </div>
                                        : ''} */}

                                    {carcare.status === 1 && <div className='service-person'>A service buddy will be assigned soon. For any queries, call  <a className='blue-border-style' href='tel:84100–84100'> 84100–84100</a></div>}

                                    {/* // Cancelled Service */}
                                    {carcare.status === 3 ?
                                        <>
                                            <div className='car-user-info border-top-dashed align-top'>
                                                <div className='car-div-dashboard'>
                                                    <h3 className='greay-head'>Preferred Service Centre</h3>
                                                    <div className="grey-text adress">
                                                        {carcare.center_name}, {carcare.center_address}

                                                    </div>


                                                </div>

                                                <div className='car-div-dashboard'>

                                                    <h3 className='greay-head'> Date & Time</h3>

                                                    <div className="grey-text calender">

                                                        {new Date(carcare.slot_day).toLocaleDateString('en-IN', { weekday: 'long' })}, {new Date(carcare.slot_day).getDate()} {new Date(carcare.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(carcare.slot_day).getFullYear()} {carcare.slot_time}

                                                    </div>

                                                </div>

                                                <div className='car-div-dashboard'>




                                                    {carcare.pickup_car === 'yes' ?
                                                        <>
                                                            <h3 className='greay-head'>Car Pickup Address</h3>
                                                            <div className="grey-text adress">
                                                                {carcare.pickup_car_address_type}, {carcare.pickup_car_address}
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <h3 className='greay-head'>Dropping By</h3>
                                                            <div className="grey-text adress">
                                                                {carcare.pickup_person_name}, {carcare.pickup_person_mobile}
                                                            </div>
                                                        </>
                                                    }
                                                </div>

                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='car-user-info align-top'>
                                                <div className='car-div-dashboard'>
                                                    <h3>Preferred Service Centre</h3>
                                                    <div className='location'>{carcare.center_name} </div>
                                                    <p>{carcare.center_address}</p>
                                                    <div className='user-email'>
                                                        {carcare.center_name !== '' && carcare.center_name !== undefined && carcare.center_address !== '' && carcare.center_address !== undefined ?
                                                            <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${carcare.center_name}${carcare.center_address}`} className='blue-border-style'>Get Directions</Link> : ''}
                                                    </div>
                                                </div>
                                                <div className='car-div-dashboard'>
                                                    <h3> Date & Time</h3>
                                                    {carcare.slot_day ?
                                                        <div className='date icons'><span>Date</span>
                                                            {new Date(carcare.slot_day).toLocaleDateString('en-IN', { weekday: 'long' })}, {new Date(carcare.slot_day).getDate()} {new Date(carcare.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(carcare.slot_day).getFullYear()}
                                                        </div>
                                                        : ''}
                                                    {carcare.slot_time ? <div className='time icons'><span>Time</span>
                                                        {carcare.slot_time ? carcare.slot_time : '-'}
                                                    </div> : ''}

                                                </div>
                                                {carcare.pickup_car === 'yes' ?
                                                    <div className='car-div-dashboard'>
                                                        <h3>Car Pickup Address</h3>
                                                        <div className='location'>{carcare.pickup_car_address_type}</div>
                                                        <p>{carcare.pickup_car_address}</p>
                                                    </div>
                                                    :
                                                    <div className='car-div-dashboard'>
                                                        <h3>Dropping By</h3>
                                                        <div className=''>{carcare.pickup_person_name}</div>
                                                        <p>{carcare.pickup_person_mobile}</p>
                                                    </div>
                                                }
                                            </div>
                                        </>
                                    }

                                    <div className='car-user-info two-colum tab-full top-border-gap'>
                                        {carcare.status !== 3 ?
                                            <div className='car-div-dashboard no-border'>
                                                <ServicePartner />
                                            </div>
                                            : ''}

                                        <div className='car-div-dashboard new-two-btn no-block actions'>
                                            <div>
                                                {carcare.status === 1 ?
                                                    <>
                                                        <div className='btn blueBdr' onClick={() => TestDrive(carcare._id)} >Cancel Appointment</div>
                                                        <div onClick={() => ReScheduleTest(carcare._id, carcare)} className='btn  reverse'>
                                                            Reschedule Appointment</div>
                                                    </> : ''}

                                                {/* {carcare.status === 2 ? <>
                                                    <div className='btn reverse'>Book Another Service</div>
                                                </> : ''} */}

                                                {carcare.step_form !== 6 && <Link href={`/dashboard/car-care/${carcare._id}`} className='btn desktop-style single-btn-full reverse'>Complete Your Form</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }) :

                    <div className='no-data-found'>

                        <div className='lotie'> <Lottie animationData={noData} loop={true} /></div>
                        <h3>Data not found</h3>
                    </div>

                }
            </div >

            {
                CancelTestDrive ?

                    <div style={{ display: "block" }
                    } className={`common-popup login mob-radio cancel-test`}>
                        <div onClick={closePop} className="overlay-mob mobile-style"></div>
                        <div className='popup-inner'>

                            <div className='popup-close' onClick={closePop}></div>

                            <div className='before-otp'>


                                <h3>Cancel Car Care Appointment</h3>

                                <p>Please specify reason for cancellation.*</p>

                                <form name="cancelEvaluation" id="cancelEvaluationForm" method='POST' onSubmit={cancelEvaluation}>

                                    <div className='from-row border-style'>

                                        <div className='form-div'>
                                            <small id="cancelError" className="error"></small>
                                            <div className='radio-div'>
                                                <input id='better' type="radio" name="cancel_reason" defaultValue="Changed my mind" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="better">
                                                    Changed my mind

                                                </label>

                                            </div>

                                            <div className='radio-div'>
                                                <input id='station' type="radio" name="cancel_reason" defaultValue="Given to other detailing centres" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="station">
                                                    Given to other detailing centres

                                                </label>
                                            </div>

                                            <div className='radio-div'>
                                                <input id='accident' type="radio" name="cancel_reason" defaultValue="Don’t live in Delhi NCR" onClick={() => openDescriptionDiv()} />
                                                <label htmlFor="accident">
                                                    Don’t live in Delhi NCR

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
                                            <input type="hidden" name="id" id="" defaultValue={carCareId} />
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
            {
                ReSchedule ?
                    <ReScheduleCarCare closePop={closePop} carCareId={carCareId} data={rescheduleData} />
                    : ""
            }
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={HidePopup} /> : ''}
        </>
    )
}
