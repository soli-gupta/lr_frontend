import React, { useState } from 'react'
import { weekDatesForForms, dateConverterForValue } from '@/components/Helper';
import axios from 'axios';
import { useRouter } from 'next/router';
import SmallSuccessPopUp from '../smallSuccessPopUp';

export default function ReScheduleCarCare(props) {

    const router = useRouter()

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [popUp, setPopUp] = useState(false);

    const [dateLimit, setDateLimit] = useState(7);
    const [dateTime, setDateTime] = useState('')
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);

    const closePop = () => {
        setPopUp(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hrs = date.getHours()
    let today = `${year}-${month}-${day}`

    const dateTimeHandle = (e) => {
        if (dateTime && dateTime.slot_time && e.target.value === today) {
            var radio = document.querySelector('input[type=radio][name=slot_time]:checked');
            if (radio.checked === true) {
                radio.checked = false;
            }
        }
        setDateTime((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const rescheduleSellRequest = async (e) => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('rescheduleForm'))

        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/reschedule-service-request`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    //alert(res.data.message)
                    setPopUp(true)
                    setSuccessMessage(res.data.message)
                    document.body.classList.remove('hide-scroll-poup')
                    if (router.pathname === '/dashboard/service') {
                        router.reload()
                    } else {
                        router.push('/dashboard/service')
                    }
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <>
            <div className={`common-popup`} style={{ display: "block" }}>
                <div onClick={props.closePop} className="overlay-mob mobile-style"></div>
                <div className='popup-inner'>

                    <div className='popup-close show-mob' onClick={props.closePop}></div>

                    <div className='test-drive' >
                        <form action="#" id="rescheduleForm" method="POST">
                            <h3>Reschedule Appointment </h3>

                            <div className='scroll-div only-time-slot'>

                                <div className='style-box no-border add-time-date'>
                                    <input type="hidden" name="id" id="" defaultValue={props.carCareId} />
                                    <h4>Select Date*</h4>
                                    <div className='dates time-pd'>
                                        {
                                            weekCal && weekCal.map((date, i) => {

                                                return (
                                                    <div className='date' key={i}>
                                                        <input type="radio" name="slot_day" defaultValue={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} d onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_day ? dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`) === props.data.slot_day ? true : false : ''} />
                                                        <label htmlFor={`selected_${i}`} className="option">
                                                            {date.day} {date.month} <span>{date.weekDay}</span>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>
                                    </div>
                                </div>

                                {/* <div className='style-box time-slot no-border add-time-date'>
                                    <h4>Select Time Slot</h4>
                                    <div className='dates'>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time" defaultValue="10 AM - 12 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "10 AM - 12 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_time === today && hrs > 8 && hrs >= 10 ? true : false) : ''} />
                                            <label htmlFor="time" className={`option ${dateTime && (dateTime.slot_time === today && hrs > 8 && hrs >= 10 ? 'disable-time' : '')} `}>
                                                10 AM - 12 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time1" defaultValue="12 PM - 2 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "12 PM - 2 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_time === today && hrs > 10 && hrs >= 12 ? true : false) : ''} />
                                            <label htmlFor="time1" className={`option ${dateTime && (dateTime.slot_time === today && hrs > 10 && hrs >= 12 ? 'disable-time' : '')} `}>
                                                12 PM - 2 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time2" defaultValue="2 PM - 4 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "2 PM - 4 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_time === today && hrs >= 14 ? true : false) : ''} />
                                            <label htmlFor="time2" className={`option ${dateTime && (dateTime.slot_time === today && hrs >= 14 ? 'disable-time' : '')} `}>
                                                2 PM - 4 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time4" defaultValue="4 PM - 6 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "4 PM - 6 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_time === today && hrs >= 14 ? true : false) : ''} />
                                            <label htmlFor="time4" className={`option ${dateTime && (dateTime.slot_time === today && hrs >= 14 ? 'disable-time' : '')} `}>
                                                4 PM - 6 PM
                                            </label>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className='fixed-button'><button type='button' onClick={(e) => rescheduleSellRequest(e)}>RESCHEDULE EVALUATION <span><i>At</i> Work <i>on</i> {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_day).getDate()} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_day).toLocaleDateString('en-IN', { month: 'long' })} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_day).getFullYear()} <i>from</i> {dateTime && dateTime.slot_time ? dateTime.slot_time : props.data && props.data.slot_time}</span> </button></div>

                        </form>

                    </div>
                </div>

            </div>
            {popUp ? <SmallSuccessPopUp successMessage={successMessage} errorMessage={errorMessage} HidePopup={closePop} /> : ''}
        </>
    )
}
