import React, { useState, useRef, useEffect } from 'react';
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ParallaxBanner, Parallax, ParallaxBannerLayer } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css'
import WebHead from '@/components/common/WebHead';
import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import { dateConverterForValue, weekDatesForForms } from '@/components/Helper';
import ServiceCenters from '@/components/service-center';


const fetcher = (url) => axios.get(url).then(res => res.data);



function AboutUs() {

    const Url = process.env.NEXT_PUBLIC_URL;

    const [user, setUser] = useState('');
    const [Popup, setPopUp] = useState(false);

    const [contactInput, setContactInput] = useState('');
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');


    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }

    const userProfile = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-user-profile`, {
            headers: {
                token: localStorage.getItem('lr-user-token')
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setUser(res.data.user);
                } else if (res.data.status == 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    alert(error.response.data.message);
                }
            });
    }


    useEffect(() => {
        userProfile()
        Fancybox.bind('[data-fancybox="aboutvideo"]', {
        });
        AOS.init();

        if (typeof window !== "undefined") {

            document.body.classList.add('mobile-menu-show');
        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('mobile-menu-show');
            }

        }


    }, [])

    const swiperSetting = {
        slidesPerView: 5,
        navigation: true,
        loop: true,
        modules: [Navigation, Autoplay],
    }


    const fetchExperienceCenter = useSWR(`${Url}fetch-experience-center`, fetcher);
    const cmspage = useSWR(`${process.env.NEXT_PUBLIC_URL}cms-page/about-us`, fetcher);

    const openPopup = (e, _id) => {
        document.getElementById('visit-center-for-books').reset();
        e.preventDefault();
        setPopUp(true);

        setServiceCenterId(_id);
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
        }
    }



    const HidePopup = () => {
        document.getElementById('visit-center-for-books').reset();
        setPopUp(false);
        setDateLimit(7);
        setServiceCenterId('');

        setContactInput('');
        setFirstNameInput('');
        setLastNameInput('');

        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    const [serviceCenterId, setServiceCenterId] = useState('');

    const [visitorContact, setVisitorContact] = useState('');

    const handleCenterBookVisit = async (e) => {
        // // const regexNumber = /^[0-9\b]+$/;
        // const regexNumber = new RegExp("[0-9]");
        // const $visitorContact = document.getElementById('visiter-contact').value;
        // // const $visitorName = document.getElementById('visitor-name').value;
        // // if (e.target.visiter_contact.value) {

        // // }
        // // console.log(regexNumber.test(document.getElementById('visiter-contact').value));
        // console.log(Number(document.getElementById('visiter-contact').value));
        // if ($visitorContact === undefined || isNaN(document.getElementById('visiter-contact').value) === false) {
        //     // const checkContact = document.getElementById('visiter-contact').value.replace('!/[0-9]/', '')
        //     document.getElementById('visiter-contact').value = '';
        //     // console.log(checkContact)


        // }
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

    const [dateLimit, setDateLimit] = useState(7);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);


    const submitBuyBookVisit = async (e) => {
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

        // if (e.target.visitType.value.length <= 0) {
        //     document.getElementById('nameError').innerHTML = 'Please enter product name';
        //     document.getElementById("nameError").style.display = "block";
        //     setTimeout(() => {
        //         document.getElementById('nameError').innerHTML = '';
        //         document.getElementById("nameError").style.display = "none";
        //     }, 3000);
        //     createError++;
        // }

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


        if (createError > 0) {
            setTinyLoader(false);
            return false;
        }

        const formData = new FormData();

        formData.append('experience_center', e.target.clickExperienceCenter.value);
        formData.append('date', e.target.selectedDate.value);
        formData.append('type', e.target.visitType.value);
        formData.append('visitor_first_name', e.target.visitor_first_name.value);
        formData.append('visitor_last_name', e.target.visitor_last_name.value);
        formData.append('visitor_contact', e.target.visiter_contact.value);




        axios.post(`${Url}book-visit`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.data && res.data.status === 1) {
                alert(res.data.message);
                HidePopup();
                router.push('/');
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 0) {
                alert('Something went wrong. Please fill all details and click agin for Book a Visit.');
            }
        })
    }


    return (
        <div>
            <WebHead pageTitle={`About Us`} />
            {/* <WebsiteLayout> */}

            <section className='made-simple loan-calculator about'>
                <div className="wrapper">
                    {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_one }}></div>}
                </div>
            </section>
            <ParallaxProvider>
                <ParallaxBanner className="careers-equity mobile-paralax-carrer abt" style={{ aspectRatio: '2 / 1' }}>
                    <ParallaxBannerLayer image="img/gurgaon-banner.png" speed={-5} />
                </ParallaxBanner>

                <div className='about-boxes'>
                    <div className="wrapper">
                        <Parallax speed={100} className="slideeffectabout">
                            {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_two }}></div>}
                        </Parallax>

                    </div>

                </div>

            </ParallaxProvider>

            <section className="experice-center commonm-gap">
                {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_three }}></div>}
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

            <ServiceCenters user={user} />

            <section className="about-career commonm-gap">

                {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_four }}></div>}
            </section>

            <div className={`${Popup === false ? "open-popup" : ""} common-popup book-visit with-scroll`} style={{ display: Popup === false ? "none" : "block" }}>

                <form method="POST" onSubmit={submitBuyBookVisit} id="visit-center-for-books">
                    <input type="hidden" name="visitType" value="Visit for Buy" />
                    <div onClick={HidePopup} className="overlay-mob mobile-style"></div>
                    <div className='popup-inner'>

                        <div onClick={HidePopup} className='popup-close'></div>

                        <h3>Book A Visit</h3>
                        <div className="scroll-div small-gap">
                            <div className='style-box'>

                                <h4>Select Location</h4>
                                <div className='locations'>

                                    {
                                        fetchExperienceCenter.data && fetchExperienceCenter.data.experience_center.map((center, i) => {
                                            return (


                                                <div className='location' key={i}>

                                                    <input id={`centers_${center.name}`} type="radio" onChange={handleCenterBookVisit} defaultChecked={center._id === serviceCenterId ? true : false} defaultValue={center._id} name="clickExperienceCenter" />
                                                    <label htmlFor={`centers_${center.name}`}>
                                                        <span>{center.name}</span>
                                                        {/* Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011 */}
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

                                        <input type="text" placeholder='Enter Name' name="visitor_first_name" onChange={handleCenterBookVisitFirstName} value={firstNameInput} id="visiter-name" />
                                        <small id="visitFirstName" className="error"></small>

                                    </div>
                                    <div className='form-div'>

                                        <label>Last Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_last_name" onChange={handleCenterBookVisitLastName} value={lastNameInput} id="visiter-name" />
                                        <small id="visitLastName" className="error"></small>

                                    </div>

                                    <div className='form-div'>

                                        <label>Mobile Number*</label>

                                        <input type="text" placeholder='Enter Phone Number' name="visiter_contact" minLength={10} maxLength={10} id="visiter-contact" onChange={handleCenterBookVisitContact} value={contactInput} />
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
                                                    <input type="radio" name="selectedDate" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selecteds_${i}`} />
                                                    <label htmlFor={`selecteds_${i}`} className="option">
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
                        </div>
                        <div className='submit-div'>
                            <button>Book Visit</button>
                        </div>

                    </div>
                </form>

            </div>
            {/* </WebsiteLayout> */}

        </div>
    )
}

export default AboutUs
