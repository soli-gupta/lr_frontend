import WebHead from '@/components/common/WebHead';
import React from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import { ButtonSpinner, dateConverterForValue, weekDatesForForms } from '@/components/Helper';
import ServiceCenters from '@/components/service-center';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function Index() {
    const [Popup, setPopUp] = useState(false)
    const [serviceCenterId, setServiceCenterId] = useState('');
    const [contactInput, setContactInput] = useState('');
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [visitSuccess, setVisitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('')
    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [centerName, setCenterName] = useState('');
    const [user, setUser] = useState('');
    const Url = process.env.NEXT_PUBLIC_URL;
    const [tinyLoader, setTinyLoader] = useState(false);
    const todayDate = new Date();
    const currentDate = todayDate.getDate();
    const todayMonth = todayDate.getMonth() + 1;
    const todayYear = todayDate.getFullYear();
    const todayTime = todayDate.getHours();
    const todayDay = todayYear + '-' + todayMonth + '-' + currentDate
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');

    const openPopup = (e, _id) => {
        // setCenterName(getCenterName);
        document.getElementById('visit-center-for-books').reset();
        e.preventDefault();
        setPopUp(true);

        setServiceCenterId(_id);
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
            document.body.classList.add('hide-scroll-poup-new');
        }
    }

    const HidePopup = () => {
        document.getElementById('visit-center-for-books').reset();
        setPopUp(false);
        setServiceCenterId('');
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
        setVisitSuccess(false);
    }

    const router = useRouter()
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Please enter your first name'),
        last_name: Yup.string()
            .required('Please enter your last name'),
        mobile: Yup.string()
            .required('Please enter your mobile'),
        email: Yup.string()
            .required('Please enter your email id')
            .email('Email is invalid'),
        query_type: Yup.string().required('Please select query type'),
        description: Yup.string()
            .required('Please enter your query'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        console.log(data)

        // const saleForceData = {
        //     "First Name": data.first_name ? data.first_name : '',
        //     "Last Name": data.last_name ? data.last_name : '',
        //     "Email": data.email ? data.email : '',
        //     "WhatsApp": data.mobile ? data.mobile : '',
        //     "Lead Type": "None",
        //     "Lead_Category": "Individual",
        //     "Description": data.description ? data.description : '',
        // }

        // await axios.post(`${process.env.SALES_FORCE_URL}LeadCreate`, saleForceData)
        //     .then(function (response) {
        //         console.log(response);
        await axios.post(`${process.env.NEXT_PUBLIC_URL}contact`, data, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-admin-token") : false,
            }
        }).then(function (res) {

            if (res.data.status == 1) {
                document.getElementById('contactForm').reset()
                setPopUp(false);
                // setVisitSuccess(true);
                document.body.classList.add('hide-scroll-poup-new');
                // setSuccessMessage(res.data.message);
                // alert(res.data.message);
                router.push(`/contact-us/thank-you`)
            }
        }).catch(function (error) {
            console.log(error)

        });
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });


    }

    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }

    useEffect(() => {
        $('.numberonly').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });


        if (typeof window !== "undefined") {

            document.body.classList.add('mobile-menu-show');
        }

        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            const fetchUserData = axios.get(`${Url}user/get-user-profile`, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                setUser(res.data.user);
            }).catch((err) => {
                if (err && err.response && err.response.data.status) {
                    setVisitSuccess(true);
                    document.body.classList.add('hide-scroll-poup-new');
                    setCallErrorMessage('Something went wrong!');
                }
            });
        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('mobile-menu-show');
            }

        }

    }, [])

    const handleCenterBookVisit = async (e, getCenterName) => {
        setCenterName(getCenterName);

    }
    const fetchExperienceCenter = useSWR(`${Url}fetch-experience-center`, fetcher);

    const handleCenterBookVisitFirstName = (e) => {
        setFirstNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));
    }

    const handleCenterBookVisitLastName = (e) => {
        setLastNameInput(e.target.value.replace(/[^A-Za-z]/ig, ''));
    }

    const handleCenterBookVisitContact = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setContactInput(e.target.value);
        }

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

    const getProductBySlugHomePage = (e, brandSlug) => {
        router.push(`/buy?brand=${brandSlug}`);
    }

    const [dateLimit, setDateLimit] = useState(7);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);
    const submitBuyBookVisit = async (e) => {
        let createError = 0;
        e.preventDefault();

        if (e.target.visitor_first_name.value.length <= 0) {
            document.getElementById('visitUserFirstName').innerHTML = 'Please first enter ame';
            document.getElementById("visitUserFirstName").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitUserFirstName').innerHTML = '';
                document.getElementById("visitUserFirstName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.visitor_last_name.value.length <= 0) {
            document.getElementById('visitUserLastName').innerHTML = 'Please last enter name';
            document.getElementById("visitUserLastName").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitUserLastName').innerHTML = '';
                document.getElementById("visitUserLastName").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.visiter_contact.value.length <= 0) {
            document.getElementById('visitUserContact').innerHTML = 'Please enter contact number';
            document.getElementById("visitUserContact").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitUserContact').innerHTML = '';
                document.getElementById("visitUserContact").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.clickExperienceCenter.value.length <= 0) {
            document.getElementById('visitUserCenter').innerHTML = 'Please select experience center';
            document.getElementById("visitUserCenter").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitUserCenter').innerHTML = '';
                document.getElementById("visitUserCenter").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.selectedDate.value.length <= 0) {
            document.getElementById('visitUserDate').innerHTML = 'Please select date';
            document.getElementById("visitUserDate").style.display = "block";
            setTimeout(() => {
                document.getElementById('visitUserDate').innerHTML = '';
                document.getElementById("visitUserDate").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.book_time.value.length <= 0) {
            document.getElementById('selectedTimeError').innerHTML = 'Please select time';
            document.getElementById("selectedTimeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedTimeError').innerHTML = '';
                document.getElementById("selectedTimeError").style.display = "none";
            }, 3000);
            createError++;
        }



        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();

        formData.append('experience_center', e.target.clickExperienceCenter.value);
        formData.append('date', e.target.selectedDate.value);
        formData.append('book_time', e.target.book_time.value);
        formData.append('type', e.target.visitType.value);
        formData.append('visitor_first_name', e.target.visitor_first_name.value);
        formData.append('visitor_last_name', e.target.visitor_last_name.value);
        formData.append('visitor_contact', e.target.visiter_contact.value);

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // } 
        axios.post(`${Url}book-visit`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.data && res.data.status === 1) {
                setPopUp(false);
                setVisitSuccess(true);
                document.body.classList.add('hide-scroll-poup-new');
                setSuccessMessage(res.data.message);
                // HidePopup();
                // router.push('/thank-you');

                // const vsiitDetail = res.data.vistDetail;

                // const leadData = {
                //     "First Name": vsiitDetail.visitor_first_name,
                //     "Last Name": vsiitDetail.visitor_last_name,
                //     "WhatsApp": vsiitDetail.visitor_contact,
                //     "Lead Type": "Buy",
                //     "Lead_Category": "Individual",
                //     "Location": centerName,
                //     "Preferred_Date": vsiitDetail.visit_book_date,
                //     "Preferred_Time": vsiitDetail.visit_book_time
                // };

                // await axios.post(`${SALES_FORCE_URL}LeadCreate`, leadData).then((res) => {

                // }).cathc((e) => {

                // });
            }
        }).catch((e) => {
            setVisitSuccess(true);
            document.body.classList.add('hide-scroll-poup-new');
            if (e.response && e.response.data.status === 0) {
                setCallErrorMessage('Something went wrong. Please fill all details and click agin for Book a Visit.');
            }
        })
    }

    return (
        <>
            <WebHead pageTitle="Contact" />
            {/* <WebsiteLayout> */}

            {/* <div className="home-banner inner-banner">
                <img src="img/contact-banner.png" alt="" className="desktop-banner" />
                <img src="img/contact-banner-mobile.png" alt="" className="mobile-banner" />
                <div className="filter-section service-fliter">
                    <h2><i>Connect With Us </i> </h2>
                    <div className='banner-subheading'>Do you have questions or concerns related to Luxury Ride or our services? Reach out to us!  </div>
                </div>

            </div> */}

            <section className="contactform bg-grey commonm-gap">
                <div className="wrapper">
                    <div className="center-text">
                        <h2>Contact Information </h2>
                        <p>Do you have any queries regarding the pricing, plans, services or anything? Fill up this form to get a prompt response from our team. </p>
                    </div>

                    <div className="row">
                        <div className="col-md-5">
                            <div className="formbx-white">
                                <h3>Our Head Office</h3>

                                <div className="office-img">
                                    <img src="img/head-office.png" alt="" />
                                </div>

                                <div className="office-details">
                                    <h4>Head Office Details</h4>
                                    <ul>
                                        <li className="loction-pointer">261, Ground Floor, Lane Number-5, Westend Marg, Saidulajab, Saket, New Delhi, Delhi 110030 <br />
                                            <Link target="_blank" rel="noopener noreferrer" className="underline-btn" href="https://www.google.com/maps/search/Grapes 261, Ground Floor, Lane Number-5, Westend Marg, Saidulajab, Saket, New Delhi, Delhi 110030">Get Directions</Link>

                                        </li>
                                        <li className="call-blue"><a href="tel:8410084100">+91 8410084100</a></li>
                                        <li className="mail-blue"><a href="mailto:info@luxuryride.in">info@luxuryride.in</a></li>
                                    </ul>

                                    <h4>HR Details</h4>
                                    <ul>
                                        <li className="call-blue"><a href="tel:7015995517">+91 7015995517</a></li>
                                        <li className="mail-blue"><a href="mailto:hr@luxuryride.in">hr@luxuryride.in</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="formbx-white">
                                <h3>Do you have a query? Ask us!</h3>
                                <form id="contactForm" method="POST" onSubmit={handleSubmit(onSubmit)} >
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-input'>
                                                <label>First Name*</label>
                                                <input id="first_name" name='first_name' placeholder='Enter Your First Name ' {...register('first_name')} type="text" />
                                                <div className="invalid-feedback error">{errors.first_name?.message}</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-input'>
                                                <label>Last Name*</label>
                                                <input id="last_name" name='last_name' placeholder='Enter Your Last Name ' {...register('last_name')} type="text" />
                                                <div className="invalid-feedback error">{errors.last_name?.message}</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-input'>
                                                <label>Mobile Number*</label>
                                                <input id="mobile" placeholder='Enter Your Mobile Number '  {...register('mobile')} name="mobile" type="text" className='numberonly' maxLength={10} />
                                                <div className="invalid-feedback error">{errors.mobile?.message}</div>
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-input'>
                                                <label>Email*</label>
                                                <input id="email" name='email' placeholder='Enter Your Email Id ' {...register('email')} type="text" />
                                                <div className="invalid-feedback error">{errors.email?.message}</div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-input'>
                                                <label>Query*</label>
                                                <select name='query_type'  {...register('query_type')}>
                                                    <option value="">Select Query</option>
                                                    <option value="Buy Car">Buy Car</option>
                                                    <option value="Sell car">Sell Car</option>
                                                    <option value="Service">Service</option>
                                                    <option value="Car Care">Car Care</option>
                                                    <option value="service packages">Service Packages</option>
                                                    <option value="Extended Warranty">Extended Warranty</option>
                                                    <option value="Insurance">Insurance</option>
                                                    <option value="Loans">Loans</option>
                                                    <option value="Human Resources">Human Resources</option>
                                                    <option value="Media">Media(Online, Offline)</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                <div className="invalid-feedback error">{errors.query_type?.message}</div>
                                            </div>
                                        </div>

                                        <div className='col-md-12'>
                                            <div className='form-input'>
                                                <label>Describe Your Query*</label>
                                                <textarea name="description" placeholder="Type Here" {...register('description')}></textarea>
                                                <div className="invalid-feedback error">{errors.description?.message}</div>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                                <div className='form-input'>
                                                    <img src="img/captcha.jpg" />
                                                </div>
                                            </div> */}

                                        <div className='col-md-12'>
                                            <div className='form-input mg-0'>
                                                <button className='btn arrow-style blue-btn'>
                                                    {/* <span>Submit</span> */}
                                                    <ButtonSpinner disabled={tinyLoader} btnName="Submit" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="experice-center commonm-gap">
                <div className="wrapper">
                    <div className="center-text">
                        <h2>Our Experience Centres</h2>
                        <p>Test drive, learn about services and more at your nearest showroom.</p>
                    </div>
                    <ul>
                        {
                            fetchExperienceCenter.data && fetchExperienceCenter.data.experience_center.map((center, i) => {
                                return (
                                    <li key={i}>
                                        <img src={`${Url}${center.banner}`} alt="" />
                                        <div className="text">

                                            <h3>{center.name}</h3>
                                            <p>{center.short_description}</p>

                                            <Link onClick={(e) => openPopup(e, center._id)} href="#" className="btn center  arrow-style blueBdr"><span>Book A Visit</span></Link>
                                            <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${center !== undefined ? center.address + ' ' + center.name : ''}`} className='btn center arrow-style blueBdr'>Get Directions</Link>
                                        </div>

                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>

            </section>
            <ServiceCenters user={user} leadType="Service Pack" />

            <section className="hr-queries-bx commonm-gap">
                <div className="catBanner">
                    <div className="wrapper">
                        <div className="banrWrap">
                            <div className="banrImg"><img src="img/luxury-ride-hr.png" alt="" /></div>
                            <div className="banrcontent">
                                <h3>Any queries regarding job</h3>
                                <h2>Get in touch with our HR.</h2>

                                <a href="tel:7015995517" className="btn white-btn-border"><span>Call HR</span></a>
                                <a href="mailto:hr@luxuryride.in" className="btn white-btn-border mail-btn"><span>Email HR</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={`common-popup book-visit with-scroll`} style={{ display: Popup === false ? "none" : "block" }}>

                <form method="POST" onSubmit={submitBuyBookVisit} id="visit-center-for-books">
                    <input type="hidden" name="visitType" value="Visit for Buy" />

                    <div onClick={HidePopup} className="overlay-mob mobile-style"></div>
                    <div className='popup-inner'>



                        <div onClick={HidePopup} className='popup-close'></div>

                        <h3>Book A Visit</h3>
                        <div className='scroll-div small-gap'>

                            <div className='style-box'>


                                <h4>Select Location</h4>
                                <div className='locations'>

                                    {
                                        fetchExperienceCenter.data && fetchExperienceCenter.data.experience_center.map((center, i) => {

                                            return (


                                                <div className='location' key={i}>

                                                    <input id={`center_${center.name}`} type="radio" onChange={(e) => handleCenterBookVisit(e, center.name)} defaultChecked={center._id === serviceCenterId ? true : false} defaultValue={center._id} name="clickExperienceCenter" />
                                                    <label htmlFor={`center_${center.name}`}>
                                                        <span>{center.name}</span>
                                                        {center.address}
                                                    </label>
                                                    <input type="hidden" value={center.name} name="seelcted_service_cener" />
                                                </div>

                                            )
                                        })
                                    }

                                </div>
                                <small id="visitUserCenter" className="error"></small>

                            </div>

                            <div className='style-box'>

                                <h4>Personal Details</h4>

                                <div className="from-row">

                                    <div className='form-div'>

                                        <label>First Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_first_name" onChange={handleCenterBookVisitFirstName} id="visiter-name" defaultValue={user !== undefined && user !== '' ? user.first_name : firstNameInput} />
                                        <small id="visitUserFirstName" className="error"></small>
                                    </div>
                                    <div className='form-div'>

                                        <label>Last Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_last_name" onChange={handleCenterBookVisitLastName} defaultValue={user !== undefined && user !== '' ? user.last_name : lastNameInput} id="visiter-name" />
                                        <small id="visitUserLastName" className="error"></small>

                                    </div>



                                </div>

                                <div className="from-row">
                                    <div className='form-div'>

                                        <label>Mobile Number*</label>

                                        <input type="text" placeholder='Enter Phone Number' name="visiter_contact" minLength={10} maxLength={10} className='numberonly' id="visiter-contact" onChange={handleCenterBookVisitContact} defaultValue={user !== undefined && user !== '' ? user.mobile : contactInput} />
                                        <small id="visitUserContact" className="error"></small>
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
                                                    <input type="radio" name="selectedDate" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_user${i}`} onChange={(e) => manageDateTestDrive(`${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))} disabled={(date.day === currentDate) && (todayTime >= '18') ? true : false} />
                                                    <label htmlFor={`selected_user${i}`} className={`option ${(date.day === currentDate) && (todayTime >= '18') ? 'disable-time' : ''}`}>
                                                        {date.day} {date.month} <span>{date.weekDay}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>
                                </div>


                                <small id="visitUserDate" className="error"></small>
                            </div>

                            <div className='style-box time-slot no-border add-time-date'>

                                <h4>Select Time Slot</h4>

                                <div className='dates'>
                                    {/* {dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} */}

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

                            </div>

                        </div>
                        <div className='submit-div'>
                            <button>Book Visit</button>
                        </div>

                    </div>
                </form>

            </div>

            {visitSuccess ? <SmallSuccessPopUp HidePopup={HidePopup} successMessage={successMessage} errorMessage={callErrorMessage} /> : ""}
        </>
    )
}
