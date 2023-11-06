import axios from 'axios';
import useSWR from 'swr';
import Loader from './common/Loader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dateConverterForValue, weekDatesForForms } from './Helper';
import SmallSuccessPopUp from './smallSuccessPopUp';



const fetcher = (url) => axios.get(url).then(res => res.data);

function AllServiceCenter({ user, leadType }) {

    const Url = process.env.NEXT_PUBLIC_URL;
    const SALES_FORCE_URL = process.env.SALES_FORCE_URL;

    const todayDate = new Date();
    const currentDate = todayDate.getDate();
    const todayMonth = todayDate.getMonth() + 1;
    const todayYear = todayDate.getFullYear();
    const todayTime = todayDate.getHours();
    const todayDay = todayYear + '-' + todayMonth + '-' + currentDate

    const [Popup, setPopUp] = useState(false);
    const [contactInput, setContactInput] = useState('');
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [serviceCenterId, setServiceCenterId] = useState('');
    const [GetACall, setGetACall] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false)


    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');

    const [centerName, setCenterName] = useState('');

    const [dateLimit, setDateLimit] = useState(7);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }

    const { data, error } = useSWR(`${Url}fetch-car-care-service-center`, fetcher);

    const openPopup = (e, _id, getCenterName) => {
        setCenterName(getCenterName);
        document.getElementById('visit-center-for-book').reset();
        e.preventDefault();
        setPopUp(true);

        setServiceCenterId(_id);
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
            document.body.classList.add('hide-scroll-poup-new');
        }
    }

    const HidePopup = () => {
        document.getElementById('visit-center-for-book').reset();
        setPopUp(false);
        setDateLimit(7);


        setContactInput('');
        setFirstNameInput('');
        setLastNameInput('');

        setGetACall(false);

        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
    }


    const weekCal = weekDatesForForms(dateLimit);

    const handleCenterBookVisit = async (e, getCenterName) => {
        setCenterName(getCenterName);
    }

    const handleCenterBookVisitContact = (e) => {

        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setContactInput(e.target.value);
        }

    }
    const handleCenterBookVisitFirstName = (e) => {
        setFirstNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));

    }

    const handleCenterBookVisitLastName = (e) => {
        setLastNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));
    }




    const submitServiceCenterBookVisit = async (e) => {
        let createError = 0;
        e.preventDefault();

        if (e.target.visitor_first_name.value.length <= 0) {
            document.getElementById('visitFirstName').innerHTML = 'Please first enter Name';
            document.getElementById("visitFirstName").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitFirstName').innerHTML = '';
                document.getElementById("visitFirstName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.visitor_last_name.value.length <= 0) {
            document.getElementById('visitLastName').innerHTML = 'Please last enter Name';
            document.getElementById("visitLastName").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitLastName').innerHTML = '';
                document.getElementById("visitLastName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.visiter_contact.value.length <= 0) {
            document.getElementById('visitContact').innerHTML = 'Please enter Contact Number';
            document.getElementById("visitContact").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitContact').innerHTML = '';
                document.getElementById("visitContact").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.clickExperienceCenter.value.length <= 0) {
            document.getElementById('visitCenter').innerHTML = 'Please select experience center';
            document.getElementById("visitCenter").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitCenter').innerHTML = '';
                document.getElementById("visitCenter").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.selectedDate.value.length <= 0) {
            document.getElementById('visitDate').innerHTML = 'Please select date';
            document.getElementById("visitDate").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitDate').innerHTML = '';
                document.getElementById("visitDate").style.display = "none";
            }, 3000);
            createError++;
        }

        // if (e.target.book_time.value.length <= 0) {
        //     document.getElementById('selectedTimeError').innerHTML = 'Please select time.';
        //     document.getElementById("selectedTimeError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('selectedTimeError').innerHTML = '';
        //         document.getElementById("selectedTimeError").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }


        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();

        formData.append('experience_center', e.target.clickExperienceCenter.value);
        formData.append('date', e.target.selectedDate.value);
        // formData.append('book_time', e.target.book_time.value);
        formData.append('type', e.target.visitType.value);
        formData.append('visitor_first_name', e.target.visitor_first_name.value);
        formData.append('visitor_last_name', e.target.visitor_last_name.value);
        formData.append('visitor_contact', e.target.visiter_contact.value);


        axios.post(`${Url}book-visit`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.data && res.data.status === 1) {
                // alert(res.data.message);
                // HidePopup();
                setPopUp(false);
                setGetACall(true);
                document.body.classList.add('hide-scroll-poup-new');
                setCallSuccessMessage(res.data.message);
                // router.push('/');


                // const visitDetail = res.data.vistDetail;
                // console.group(visitDetail)
                // const leadData = {
                //     "First Name": visitDetail.visitor_first_name,
                //     "Last Name": visitDetail.visitor_last_name,
                //     "WhatsApp": visitDetail.visitor_contact,
                //     "Lead Type": leadType,
                //     "Lead_Category": "Individual",
                //     "Location": centerName,
                //     "Preferred_Date": visitDetail.visit_book_date,
                //     "Preferred_Time": visitDetail.visit_book_time
                // };

                // await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

                // }).cathc((e) => {

                // });


            }
        }).catch((e) => {
            setGetACall(true);
            document.body.classList.add('hide-scroll-poup-new');
            if (e.response && e.response.data.status === 0) {
                setCallErrorMessage('Something went wrong. Please fill all details and click agin for Book a Visit.');
            }
        })
    }


    const manageDateTestDrive = (e, radioDate) => {
        setRadioSelectedDate(radioDate);
        const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
        if (todayDay === radioDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
            chekcedDateCheck.checked = false;
        }
    }


    const manageTimeSlotOne = () => {
        setBookedTimeSlot('11 AM to 12 PM');
    }

    const manageTimeSlotTwo = () => {
        setBookedTimeSlot('12 PM to 1 PM');
    }

    const manageTimeSlotThree = () => {
        setBookedTimeSlot('1 PM to 2 PM');
    }

    const manageTimeSlotFour = () => {
        setBookedTimeSlot('2 PM to 3 PM');
    }

    const manageTimeSlotFive = () => {
        setBookedTimeSlot('3 PM to 4 PM');
    }

    const manageTimeSlotSix = () => {
        setBookedTimeSlot('4 PM to 5 PM');
    }

    const manageTimeSlotSaven = () => {
        setBookedTimeSlot('5 PM to 6 PM');
    }

    const manageTimeSlotEight = () => {
        setBookedTimeSlot('6 PM to 7 PM');
    }

    if (error) return 'Something went wrong.'
    if (!data) return 'Loading...'

    return (
        <div>
            <section className="custom-servicebx commonm-gap">
                <div className="wrapper">
                    <div className="center-text">
                        <h2>Explore Our Car Care Centres</h2>
                        <p>We provide the best in class car customisation & detailing services in our car care centres, <br />and that too keeping the originality intact through harmless technology.</p>
                    </div>

                    <div className='row center-boxes-row'>
                        {
                            data !== undefined && data.experience_center !== undefined && data.experience_center.map((center) => {
                                return (

                                    <div className='col-lg-4 col-md-6' key={center._id}>
                                        <div className='service-centerdiv'>
                                            <div className='img-servicecenter'>
                                                <img src={`${Url}${center.car_care_banner}`} alt="" />
                                            </div>
                                            <div className='txt-service-details'>
                                                {/* <ul>
                                                    {center.center_area !== '' && center.center_area !== undefined ? <li><span>{center.center_area}</span>sq. ft. area</li> : ''}
                                                    {center.center_car_bay !== undefined && center.center_car_bay !== '' ? <li><span>{center.center_car_bay}</span>parallel bay</li> : ''}
                                                    {center.center_daily_service !== undefined && center.center_daily_service !== '' ? <li><span>{center.center_daily_service}</span>daily service</li> : ''}
                                                </ul> */}
                                                <h2>{center.name === 'Head Office' ? 'Delhi' : center.name} Car Care Centre {center.city === 'Saket' ? '(Saket)' : center.city === 'Alipur' ? '(Alipur)' : ''}</h2>
                                                <p>{center.address}</p>

                                                <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${center !== undefined ? center.address + ' ' + center.name : ''}`} className='btn reverse'>Get Directions</Link>
                                                <Link onClick={(e) => openPopup(e, center._id, center.name)} href="#" className="btn blueBdr">Book Visit</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                {GetACall ? <SmallSuccessPopUp HidePopup={HidePopup} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
            </section>
            <div className={`common-popup book-visit with-scroll`} style={{ display: Popup === false ? "none" : "block" }}>

                <form method="POST" onSubmit={submitServiceCenterBookVisit} id="visit-center-for-book">
                    <input type="hidden" name="visitType" value="Visit for Service Center" />

                    <div onClick={HidePopup} className="overlay-mob mobile-style"></div>
                    <div className='popup-inner'>

                        <div onClick={HidePopup} className='popup-close'></div>
                        <h3>Book A Visit</h3>
                        <div className="scroll-div small-gap">

                            <div className='style-box'>

                                <h4>Select Location</h4>
                                <div className='locations'>

                                    {
                                        data && data.experience_center.map((center, i) => {
                                            return (


                                                <div className='location' key={i}>

                                                    <input id={`center_${center.name}`} type="radio" onChange={(e) => handleCenterBookVisit(e, center.name)} defaultChecked={center._id === serviceCenterId ? true : false} defaultValue={center._id} name="clickExperienceCenter" />
                                                    <label htmlFor={`center_${center.name}`}>
                                                        <span>{center.name === 'Head Office' ? 'Delhi (Saket)' : center.name === 'Delhi' ? 'Delhi (Alipur)' : center.name}</span>
                                                        {center.address}
                                                    </label>
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                                <small id="visitCenter" className="error"></small>

                            </div>

                            <div className='style-box'>

                                <h4>Personal Details</h4>

                                <div className="from-row">

                                    <div className='form-div'>

                                        <label>First Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_first_name" onChange={handleCenterBookVisitFirstName} value={user !== undefined && user !== '' ? user.first_name : firstNameInput} id="visiter-name" />
                                        <small id="visitFirstName" className="error"></small>

                                    </div>
                                    <div className='form-div'>

                                        <label>Last Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_last_name" onChange={handleCenterBookVisitLastName} value={user !== undefined && user !== '' ? user.last_name : lastNameInput} id="visiter-name" />
                                        <small id="visitLastName" className="error"></small>

                                    </div>

                                    <div className='form-div'>

                                        <label>Mobile Number*</label>

                                        <input type="text" placeholder='Enter Phone Number' name="visiter_contact" minLength={10} maxLength={10} id="visiter-contact" onChange={handleCenterBookVisitContact} value={user !== undefined && user !== '' ? user.mobile : contactInput} />
                                        <small id="visitContact" className="error"></small>
                                    </div>

                                </div>

                            </div>

                            <div className='style-box no-gap add-time-date'>

                                <h4>Select Date*</h4>

                                <div className='dates time-pd'>

                                    {
                                        weekCal && weekCal.map((date, i) => {
                                            return (
                                                <div className='date' key={i}>
                                                    <input type="radio" name="selectedDate" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} onChange={(e) => manageDateTestDrive(`${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))} disabled={(date.day === currentDate) && (todayTime >= '16') ? true : false} />
                                                    <label htmlFor={`selected_${i}`} className={`option ${(date.day === currentDate) && (todayTime >= '16') ? 'disable-time' : ''}`}>
                                                        {date.day} {date.month} <span>{date.weekDay}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>
                                </div>
                                <small id="visitDate" className="error"></small>
                            </div>

                            {/* <div className='style-box time-slot no-border add-time-date'>

                                <h4>Select Time Slot</h4>

                                <div className='dates'>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="11AM - 12PM" id="selectTimeOne" onChange={manageTimeSlotOne}
                                            disabled={todayDay === radioSelectedDate && todayTime >= '11' ? true : false} />
                                        <label htmlFor="selectTimeOne" className={`option ${todayDay === radioSelectedDate && todayTime >= '11' ? 'disable-time' : ''}`} >11AM - 12PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="12PM - 1PM" id="selectTimeTwo" onChange={manageTimeSlotTwo} disabled={todayDay === radioSelectedDate && todayTime >= '12' ? true : false} />
                                        <label htmlFor="selectTimeTwo" className={`option ${todayDay === radioSelectedDate && todayTime >= '12' ? 'disable-time' : ''}`}>12PM - 1PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="1PM - 2PM" id="selectTimeThree" onChange={manageTimeSlotThree} disabled={todayDay === radioSelectedDate && todayTime >= '13' ? true : false} />
                                        <label htmlFor="selectTimeThree" className={`option ${todayDay === radioSelectedDate && todayTime >= '13' ? 'disable-time' : ''}`}>1PM - 2PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="2PM - 3PM" id="selectTimeFour" onChange={manageTimeSlotFour} disabled={todayDay === radioSelectedDate && todayTime >= '14' ? true : false} />
                                        <label htmlFor="selectTimeFour" className={`option ${todayDay === radioSelectedDate && todayTime >= '14' ? 'disable-time' : ''}`}>2PM - 3PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="3PM - 4PM" id="selectTimeFive" onChange={manageTimeSlotFive} disabled={todayDay === radioSelectedDate && todayTime >= '15' ? true : false} />
                                        <label htmlFor="selectTimeFive" className={`option ${todayDay === radioSelectedDate && todayTime >= '15' ? 'disable-time' : ''}`}>3PM - 4PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="4PM - 5PM" id="selectTimeSix" onChange={manageTimeSlotSix} disabled={todayDay === radioSelectedDate && todayTime >= '16' ? true : false} />
                                        <label htmlFor="selectTimeSix" className={`option ${todayDay === radioSelectedDate && todayTime >= '16' ? 'disable-time' : ''}`}>4PM - 5PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="5PM - 6PM" id="selectTimeSaven" onChange={manageTimeSlotSaven} disabled={todayDay === radioSelectedDate && todayTime >= '17' ? true : false} />
                                        <label htmlFor="selectTimeSaven" className={`option ${todayDay === radioSelectedDate && todayTime >= '17' ? 'disable-time' : ''}`}>5PM - 6PM</label>
                                    </div>

                                    <div className='date'>
                                        <input type="radio" name="book_time" value="6PM - 7PM" id="selectTimeEight" onChange={manageTimeSlotEight} disabled={todayDay === radioSelectedDate && todayTime >= '18' ? true : false} />
                                        <label htmlFor="selectTimeEight" className={`option ${todayDay === radioSelectedDate && todayTime >= '18' ? 'disable-time' : ''}`}>6PM - 7PM</label>
                                    </div>

                                </div>
                                <small id="selectedTimeError" className="error"></small>

                            </div> */}


                        </div>
                        <div className='submit-div'>
                            <button>Book Visit</button>
                        </div>
                    </div>
                </form>

            </div>


        </div>
    )
}

export default AllServiceCenter;