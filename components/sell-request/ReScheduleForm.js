import React, { useState } from 'react'
import { weekDatesForForms, dateConverterForValue, ButtonSpinner } from '@/components/Helper';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ReScheduleForm(props) {

    const router = useRouter()

    const [dateLimit, setDateLimit] = useState(7);
    const [dateTime, setDateTime] = useState('')
    const [tinyLoader, setTinyLoader] = useState(false);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);

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
        setTinyLoader(true)
        await axios.post(`${process.env.NEXT_PUBLIC_URL}user/reschedule-sell-request`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    // alert(res.data.message)
                    setTinyLoader(false)
                    document.body.classList.remove('hide-scroll-poup')
                    document.body.classList.remove('hide-scroll-poup-new');
                    if (router.pathname === '/dashboard/sell-requests') {
                        router.reload()
                    } else {
                        document.body.classList.remove('hide-scroll-poup-new');
                        router.push('/dashboard/sell-requests')
                    }

                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    // console.log(props.data)
    return (
        <>
            <div className={`common-popup`} style={{ display: "block" }}>
                <div onClick={props.closePop} className="overlay-mob mobile-style"></div>
                <div className='popup-inner'>

                    <div className='popup-close show-mob' onClick={props.closePop}></div>

                    <div className='test-drive' >
                        <form action="#" id="rescheduleForm" method="POST">
                            <h3>Reschedule Evaluation </h3>

                            <div className='scroll-div only-time-slot'>

                                <div className='style-box no-border add-time-date'>
                                    <input type="hidden" name="id" id="" defaultValue={props.sellRequestId} />
                                    <h4>Select Date*</h4>
                                    <div className='dates time-pd'>
                                        {
                                            weekCal && weekCal.map((date, i) => {

                                                return (
                                                    <div className='date' key={i}>
                                                        <input type="radio" name="slot_day" defaultValue={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} d onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_date ? dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`) === props.data.slot_date ? true : false : ''} disabled={(date.day === day) && (hrs >= 16) ? true : false} />
                                                        <label htmlFor={`selected_${i}`} className={`option ${(date.day === day) && (hrs >= 16) ? 'disable-time' : ''}`}>
                                                            {date.day} {date.month} <span>{date.weekDay}</span>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>
                                    </div>
                                </div>

                                <div className='style-box time-slot no-border add-time-date'>
                                    <h4>Select Time Slot</h4>
                                    <div className='dates'>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time" defaultValue="10 AM - 12 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "10 AM - 12 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_day === today && hrs > 8 && hrs >= 10 ? true : false) : ''} />
                                            <label htmlFor="time" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 8 && hrs >= 10 ? 'disable-time' : '')} `}>
                                                10 AM - 12 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time1" defaultValue="12 PM - 2 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "12 PM - 2 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_day === today && hrs > 10 && hrs >= 12 ? true : false) : ''} />
                                            <label htmlFor="time1" className={`option ${dateTime && (dateTime.slot_day === today && hrs > 10 && hrs >= 12 ? 'disable-time' : '')} `}>
                                                12 PM - 2 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time2" defaultValue="2 PM - 4 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "2 PM - 4 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_day === today && hrs >= 14 ? true : false) : ''} />
                                            <label htmlFor="time2" className={`option ${dateTime && (dateTime.slot_day === today && hrs >= 14 ? 'disable-time' : '')} `}>
                                                2 PM - 4 PM
                                            </label>
                                        </div>
                                        <div className='date'>
                                            <input type="radio" name="slot_time" id="time4" defaultValue="4 PM - 6 PM" onChange={(e) => dateTimeHandle(e)} defaultChecked={props.data && props.data.slot_time ? "4 PM - 6 PM" === props.data.slot_time ? true : false : ''} disabled={dateTime ? (dateTime.slot_day === today && hrs >= 16 ? true : false) : ''} />
                                            <label htmlFor="time4" className={`option ${dateTime && (dateTime.slot_day === today && hrs >= 16 ? 'disable-time' : '')} `}>
                                                4 PM - 6 PM
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                {/* <div className='style-box time-slot no-border'>

                                    <div className='message'>You will get a clean and sanitized car for test drive. Our Luxury Ride<br /> executives are screened for normal temperature daily.</div>

                                </div> */}

                            </div>

                            <div className='fixed-button'>
                                <button type='button' onClick={(e) => rescheduleSellRequest(e)}>

                                    <ButtonSpinner load={tinyLoader} btnName="RESCHEDULE EVALUATION" />
                                    <span><i>At</i> Work <i>on</i> {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_date).toLocaleDateString('en-IN', { weekday: 'short' })} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_date).getDate()} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(dateTime && dateTime.slot_day ? dateTime.slot_day : props.data && props.data.slot_date).getFullYear()} <i>from</i> {dateTime && dateTime.slot_time ? dateTime.slot_time : props.data && props.data.slot_time}</span>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}
