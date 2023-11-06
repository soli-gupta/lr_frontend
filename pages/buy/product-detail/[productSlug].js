import React, { useState, useRef, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Lottie from "lottie-react";

import Congratulationstick from '/public/lotie-icons/tick-circle.json'
import WebHead from '@/components/common/WebHead';


import useSWR from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import FeatureSpecification from '@/components/products/product-detail/FeatureSpecification';
import EMICalculator from '@/components/products/product-detail/EMICalculator';
import CompareProducts from '@/components/products/product-detail/CompareProducts';
import YouMayLike from '@/components/products/product-detail/YouMayLike';
import Link from 'next/link';
import { ButtonSpinner, databaseDateConverter, dateConverterForValue, fullDatabaseDateConverter, getTodayDate, numberFormatter, weekDatesForForms } from '@/components/Helper';
import LoginForm from '@/components/LoginForm';
import Select from 'react-select';
import WebsiteFooter from '@/components/common/WebsiteFooter';
import Loader from '@/components/common/Loader';
import Head from "next/head";

// import { AutoViewer } from "@helloar/auto-viewer";

import dynamic from 'next/dynamic';

import AutoViewerComponent from '@/components/products/product-detail/AutoViewer';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import PixelLoader from '@/components/PixelLoader';

// const { AutoViewer } = dynamic(() => import('@helloar/auto-viewer'), { ssr: false, })
// const AutoViewer = dynamic(
//     async () => (await import("@helloar/auto-viewer")).AutoViewer,
//     {
//         ssr: false,
//     }
// );


const fetcher = (url) => axios.get(url).then(res => res.data);

function ProductDetail() {

    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { productSlug } = router.query;
    const todayDate = new Date();
    const todayTime = todayDate.getHours();
    const todayDay = dateConverterForValue(databaseDateConverter(todayDate).day, databaseDateConverter(todayDate).month, databaseDateConverter(todayDate).year);

    const [Includebefefits, setIncludebefefits] = useState(false);
    const [include, setInclude] = useState(true);
    const [locationAdress, setlocationAdress] = useState(false);
    const [Compare, setCompare] = useState(false);
    const [SelectCar, setSelectCar] = useState(false);
    const [SelectModel, setSelectModel] = useState(false);
    const [SelectBrand, setSelectBrand] = useState(false);
    const [SelectCarPop, setSelectCarPop] = useState(false);
    const [testDriveLogin, setTestDriveLogin] = useState(false);
    const [Location, setLocation] = useState(true);
    const [bookTestDrivePopUp, setBookTestDrivePopUp] = useState(false);
    const [getCities, setGetCities] = useState([]);
    const [bookedAddres, setBookedAddress] = useState('');
    const [bookedDateSlot, setBookedDateSlot] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');
    const [thankYouTestDrive, setThankYouTestDrive] = useState(false);
    const [submitTestDrive, setSubmitTestDrive] = useState(false);
    const [addressAfterLogin, setAddressAfterLogin] = useState('');
    const [user, setUser] = useState('');
    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [lovedPopUp, setLovedPopUp] = useState(true);


    const [GetACall, setGetACall] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');

    const [logInSubmit, setLogInSubmit] = useState(false);
    const [eBookCarLogin, setEBookCarLogin] = useState(false);

    const { data, error } = useSWR(`${Url}fetch-product-detail-by-slug/${productSlug}`, fetcher);
    const fetchLinkedProducts = useSWR(`${Url}fetchlinked-product-for-detail/${productSlug}`, fetcher);
    const compareProducts = useSWR(`${Url}compare-products-for-detail`, fetcher);
    const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);
    const getStates = useSWR(`${Url}states`, fetcher);

    const [tinyLoader, setTinyLoader] = useState(false);
    const [checkUserAddress, setCheckUserAddress] = useState(0);


    const closePop = () => {
        setIncludebefefits(false)
        setlocationAdress(false)

        setTestDriveLogin(false)
        setEBookCarLogin(false)

        setCompare(false)
        setThankYouTestDrive(false)
        setDateLimit(7);
        setBookTestDrivePopUp(false);
        document.getElementById('book-test-drive-form').reset();
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('header-No-Scroll');
            document.body.classList.remove('hide-scroll-poup-new');
        }

        setBookedDateSlot('');
        setBookedTimeSlot('');
        setGetACall(false);

        setCheckUserAddress(0);
        // setLocation(!Location);
        setCheckPinCode('');
        thankYouTestDrive === true ? router.reload() : ''

    }

    const closeLovedPopUp = () => {
        setLovedPopUp(false);
    }

    const IncludebefefitsPopup = () => {
        setIncludebefefits(true)
    }

    const experienceLocation = () => {
        document.getElementById('book-test-drive-form').reset();
        setLocation(true);
        setThankYouTestDrive(false);
    }

    const googleLocation = () => {
        setLocation(false)
    }

    const openCompare = () => {
        setCompare(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll');
        }
    }

    const showBrand = () => {

        setSelectBrand(!SelectBrand)

    }

    const showCarsPop = () => {

        setSelectCarPop(!SelectCarPop)

    }


    const benefitTrue = () => {
        setInclude(false)
    }

    const includeTrue = () => {
        setInclude(true)
    }

    const locationPopup = () => {
        setlocationAdress(true)
    }




    const settings = {

        slidesPerView: 3,
        spaceBetween: 40,
        navigation: false,
        modules: [Pagination],
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span className="' + className + '">' + "<i>" + (index + 1) + "</i>" + "</span>";
        },
    };

    const OpenHamburger = () => {
        setHamburger(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll');
        }
    }


    const HideHam = () => {
        setHamburger(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
        }
    }

    const OpenSearch = () => {
        setCustomSearch(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll');
        }
    }

    const HideSearch = () => {
        setCustomSearch(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
        }
    }



    useEffect(() => {
        if (typeof window !== "undefined") {
            //document.body.classList.add('header-No-Scroll');
            document.body.classList.add('no-top-header');
            document.body.classList.add('sticky-btn-have');

        }



        if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {

        } else {
            const fetchUserData = axios.get(`${Url}user/get-user-profile`, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                setUser(res.data.user);
                setOwnerFirstName(res.data.user.first_name);
                setOwnerLastName(res.data.user.last_name);
                setOwnerEmail(res.data.useer.email);
            }).catch((err) => {
                if (err && err.response && err.response.data.status) {
                    alert('Something went wrong!');
                }
            });
        }

        return () => {

            if (typeof window !== "undefined") {
                document.body.classList.remove('header-No-Scroll');
                document.body.classList.remove('no-top-header');
                document.body.classList.remove('sticky-btn-have');
            }

        }
    }, []);


    const swiperSetting = {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: true,
        loop: true,
        modules: [Navigation],
    }



    const manageBookTestDrive = () => {
        document.body.classList.add('hide-scroll-poup-new');
        setAddressAfterLogin(`/buy/product-detail/${productSlug}`)
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setTestDriveLogin(false);
            if (typeof window !== "undefined") {
                document.body.classList.remove('hide-scroll-poup');
                document.body.classList.remove('hide-scroll-poup-new');
            }
            setBookTestDrivePopUp(true);
            setSubmitTestDrive(true);
            setBookedAddress(data.product.product_location !== undefined ? data.product.product_location.center_name + ` Experience Center` : '');
            // alert(`User Logged in successfully`);
            // router.push({ pathname: '/sell/sell-detail', query: carInfoJson }, '/sell/sell-detail')
        } else {
            // alert('ahdg');
            setTestDriveLogin(true);
            if (typeof window !== "undefined") {
                document.body.classList.add('hide-scroll-poup');
                document.body.classList.add('hide-scroll-poup-new');
            }

        }
    }
    // <LoginForm Login={Login} closePop={closePop} logInHeading={`Log in to schedule a test drive`} />

    const [dateLimit, setDateLimit] = useState(7);
    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);


    const getCitiesByState = async (stateId) => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-cities-by-state-name?state=${stateId}`).then(function (res) {
            if (res.data.status == 1) {
                setGetCities(res.data.cities)

            }
        }).catch(function (error) {
        });
    }

    const manageAddressTestDrive = (e) => {
        setBookedAddress(e.target.value);
    }

    const manageLandMarkTestDrive = () => {

    }

    const [checkPinCode, setCheckPinCode] = useState('');
    const managePinCodetestDrive = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setCheckPinCode(e.target.value);
        }
    }

    const manageCitytestDrive = () => {

    }

    const manageDateTestDrive = (e, radioDate) => {
        setRadioSelectedDate(radioDate);
        setBookedDateSlot(fullDatabaseDateConverter(radioDate));
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

    const submitBookedTestDriveData = async (e) => {
        e.preventDefault();

        let createError = 0

        if (e.target.book_date.value.length <= 0) {
            document.getElementById('selectedDateError').innerHTML = 'Please select date!';
            document.getElementById("selectedDateError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedDateError').innerHTML = '';
                document.getElementById("selectedDateError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (e.target.book_time.value.length <= 0) {
            document.getElementById('selectedTimeError').innerHTML = 'Please select time!';
            document.getElementById("selectedTimeError").style.display = "block";
            setTimeout(() => {
                document.getElementById('selectedTimeError').innerHTML = '';
                document.getElementById("selectedTimeError").style.display = "none";
            }, 3000);
            createError++;
        }

        if (createError > 0) {
            return false;
        }

        // setTinyLoader(true);

        const formData = new FormData(document.getElementById('book-test-drive-form'));

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }

        await axios.post(`${Url}book-test-drive`, formData, {
            headers: {
                'Content-Type': 'application/josn',
                token: localStorage.getItem('lr-user-token')
            }
        }).then((res) => {
            if (res && res.data.status === 1) {
                setThankYouTestDrive(false);
                setSubmitTestDrive(false);
                setTinyLoader(false);
                setBookTestDrivePopUp(false);
                if (res.data.testDrive) {
                    router.replace(`/buy/test-drive/thank-you/${res.data.testDrive._id}`);
                }
                setCheckUserAddress(res.data.checkExperienceCenter);
            }
        }).catch((e) => {
            setTinyLoader(false);
            if (e && e.response && e.response.data.status === 0) {
                alert(e.response.data.message);
            } else if (e && e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            }
        })
    }

    const manageEBookCar = async (e) => {

        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setEBookCarLogin(false);

            if (typeof window !== "undefined") {
                document.body.classList.remove('hide-scroll-poup');
                document.body.classList.remove('hide-scroll-poup-new');
            }
            setTinyLoader(true);
            const productData = {
                product_slug: productSlug,
                order_type: "buy",
                form_step: 1
            }

            await axios.post(`${Url}user/create-new-order`, productData, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                if (res && res.data.status === 1) {
                    setTinyLoader(false);
                    router.push(`/buy/e-book/${res.data.order_id}`);
                }
            }).catch((e) => {
                setGetACall(true);
                document.body.classList.add('hide-scroll-poup-new');
                setTinyLoader(false);
                if (e && e.response && e.response.data.status === 2) {
                    setCallErrorMessage(e.response.data.message);
                } else if (e && e.response && e.response.data.status === 0) {
                    setCallErrorMessage(e.response.data.message);
                }
            });

        } else {
            setEBookCarLogin(true);
            setLogInSubmit(true);

            if (typeof window !== "undefined") {
                document.body.classList.add('hide-scroll-poup');
                document.body.classList.add('hide-scroll-poup-new');
            }
        }
    }
    const [contactNumber, setContactNumber] = useState('');
    const [firstNameCheck, setFirstNameCheck] = useState('');
    const [lastNameCheck, setLastNameCheck] = useState('');

    const popContactNumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setContactNumber(e.target.value);
        }
    }
    const popFirstNameCheck = (e) => {
        setFirstNameCheck(e.target.value.replace(/[^A-Za-z]/ig, ''));
    }
    const popLastNameCheck = (e) => {
        setLastNameCheck(e.target.value.replace(/[^A-Za-z]/ig, ''));
    }

    // const pageHeadData = <Head>

    // </Head>

    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;

    // if (data) {
    //     let $whereQuery = { lookup_id: data.product._id }
    //     let enCodeQuery = encodeURIComponent(JSON.stringify($whereQuery))

    //     axios.get(`${process.env.HELLO_AR_URL}application_products?where=${encodeURIComponent(JSON.stringify($whereQuery))}`, {
    //         headers: {
    //             Authorization: 'SDK YTZkNzNlMmItZDEzNy00ZjdiLWI2NDEtNmZhODZhYmVjMTU4OjZkMGRmYzUzLTIxYTEtNGU1OC04ZTQ5LWNhNmRkYmJiMzg3ZQ==',
    //         },
    //     }, fetcher).then((res) => {
    //         setGalleryViewer(res.data._items);
    //     }).catch((err) => {
    //         setGalleryViewer([]);
    //     });
    // }
    // const fetchGallery = useSWR(`https://api.helloviewer.io/application_products?where=`);
    // console.log(data.product)

    // `https://api.helloviewer.io/application_products?where=${$whereQuery}`
    // const productId = data.product.slug;
    let $helloARUrl = `https://api.helloviewer.io/application_products?where=`;
    // let $whereQuery = {
    //     "lookup_id": `${data.product._id}`
    // }
    // let $whereQuery = {
    //     "lookup_id": `${data.product._id}`
    // }
    // console.log(lookUp_id);
    // const AUTH_STRING = `SDK YTZkNzNlMmItZDEzNy00ZjdiLWI2NDEtNmZhODZhYmVjMTU4OjZkMGRmYzUzLTIxYTEtNGU1OC04ZTQ5LWNhNmRkYmJiMzg3ZQ==`
    // console.log(`https://api.helloviewer.io/application_products?where=${$whereQuery}`);
    // {
    //     headers: {
    //         origin: '*',
    //         'Acess-Control-Allow-Origin': '*'
    //     }
    // },
    // console.log($whereQuery)
    // console.log(`${process.env.HELLO_AR_URL}application_products?where=${$whereQuery}`);


    //     const whereObject = {
    //         lookup_id: YOUR_ID_HERE
    //   };
    //   const whereQuery = encodeURIComponent(JSON.stringify(whereObject));
    //   axios.get(`https://api.helloviewer.io/application_products?where=${whereQuery}`)

    //${process.env.HELLO_AR_URL}application_products?where=${enCodeQuery}
    // Authorization: process.env.HELLO_AR_KEY,
    // 'Content-Type': 'application/x-www-form-urlencoded'

    // params: { where: encodeURIComponent(JSON.stringify($whereQuery)) }
    // console.log(data.product._id)


    const getDirectionsHandler = (address) => {
        router.push(`https://www.google.com/maps/search/Luxury Ride ${address ? address : ''}`);
    }

    // if(logInSubmit === true){
    //     redirectRouteLogin = '/'
    // }

    const submitDataAfterSubmitLogIn = async () => {

        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {

            const productData = {
                product_slug: productSlug,
                order_type: "buy",
                form_step: 1
            }

            await axios.post(`${Url}user/create-new-order`, productData, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                if (res && res.data.status === 1) {
                    // alert(res.data.message);
                    router.push(`/buy/e-book/${res.data.order_id}`);
                }
            }).catch((e) => {
                setGetACall(true);
                document.body.classList.add('hide-scroll-poup-new');

                // if (e && e.message) {
                //     setCallErrorMessage(e.message);
                // } 
                if (e && e.response && e.response.data.status === 2) {
                    setCallErrorMessage(e.response.data.message);
                } else if (e && e.response && e.response.data.status === 0) {
                    setCallErrorMessage(e.response.data.message);
                }
            });
        }
    }

    return (
        <div>

            <WebHead pageTitle={data.product.name} />

            {/* <Head>
                <title>{data.product.name}</title>
            </Head> */}
            {/* <PixelLoader /> */}


            <div className="prductSec01">
                <div className="wrapper">
                    <div className='pro-logo'>
                        <Link href="/">
                            <img src="/website/img/Logo.svg" alt="Luxury Ride" />
                        </Link>

                    </div>

                    <Link href="/buy" className="backLink">Back to all cars</Link>
                    <div className="row">
                        <div className="col-md-6">
                            <h1>{data.product.name}</h1>
                            <ul>
                                <li><span>Regd. Year</span>{data.product.registration_year}</li>
                                <li><span>Reg. State</span>{data.product.registration_state}</li>
                                <li><span>KMs Driven</span>{numberFormatter(data.product.kms_driven)}</li>
                                <li><span>Ownership</span>{data.product.product_ownership}</li>
                                <li><span>Fuel Type</span>{data.product.fuel_type.fuel_name}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6 desktop-style">
                                    <div className="price-detail">
                                        <div className="price">INR <span>{numberFormatter(data.product.price)}/-</span></div>
                                        <div className="emiStarts">EMI <span>INR {numberFormatter(data.product.product_emi)}/-</span></div>
                                    </div>
                                    <div className="linksExpr">
                                        <Link onClick={IncludebefefitsPopup} href="javascript:void(0)" className="lxryRdeBnfitsPopupBtn">Inclusions & Benefits</Link> <Link onClick={locationPopup} href="javascript:void(0)" className="gurExpCenPopupBtn">{data.product.product_location !== undefined ? data.product.product_location.center_name : ''} Experience Centre</Link> </div>
                                </div>
                                <div className="col-md-6 desktop-style">
                                    {/* openLogin */}
                                    <div onClick={manageBookTestDrive} className="btn blueBdr">Book Test Drive</div>
                                    <div className="btn ebookNwBtn reverse" disabled >
                                        {/* onClick={manageEBookCar} */}
                                        <ButtonSpinner load={tinyLoader} btnName="E-Book Now" />
                                        {/* <span>100% Refundable</span> */}
                                        <span>Coming Soon</span>

                                    </div>
                                    {/* {data.product.sell_status === 'booked'? <>
                                    </> :''} */}
                                </div>
                            </div>
                            {/* onClick={() => submitData()} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-bottom-cta mobile-style e-book-style">

                <div onClick={manageBookTestDrive} className="btn blueBdr">Book Test Drive</div>
                <div className="btn ebookNwBtn reverse" >
                    {/* <ButtonSpinner load={tinyLoader} btnName="E-Book Now" /> */}
                    <ButtonSpinner load={tinyLoader} btnName="E-Book Now" />
                    <span>Coming Soon</span></div>
            </div>

            <section className="featrsSpecSec pro-d-page">
                <div className="wrapper">
                    <div className="row">

                        {data.product._id !== undefined && data.product._id !== '' ? <AutoViewerComponent productId={data.product._id} productSlug={productSlug} /> : ''}

                        <div className='prductSec01  mobile-style mob-fix'>
                            <div className="col-md-6">
                                <div className="price-detail">
                                    <div className="price">INR <span>{numberFormatter(data.product.price)}/-</span></div>
                                    <div className="emiStarts">EMI <span>INR {numberFormatter(data.product.product_emi)}/-</span></div>
                                </div>
                                <div className="linksExpr">
                                    <Link onClick={IncludebefefitsPopup} href="javascript:void(0)" className="lxryRdeBnfitsPopupBtn">Inclusions & Benefits</Link> <Link onClick={locationPopup} href="javascript:void(0)" className="gurExpCenPopupBtn">{data.product.product_location !== undefined ? data.product.product_location.center_name : ''} Experience Centre</Link> </div>
                            </div>

                        </div>

                        <FeatureSpecification featureCategory={data !== undefined ? data.featureCategory : ''} Url={Url} productId={data !== undefined && data.product !== undefined ? data.product._id : ''} />




                        <EMICalculator productPrice={data.product.price} />
                    </div>
                </div>
            </section>
            {/* /img/listing_img01.jpg */}

            <CompareProducts showBrand={showBrand} SelectBrand={SelectBrand} SelectModel={SelectModel} SelectCar={SelectCar} closePop={closePop} compareProducts={compareProducts.data !== undefined ? compareProducts.data : ''} brands={fetchBrands.data ? fetchBrands.data : ''} selectProduct={data.product ? data.product : ''} selectFeatureCategory={data.featureCategory !== undefined ? data.featureCategory : ''} />

            {
                fetchLinkedProducts !== undefined && fetchLinkedProducts.data !== undefined && fetchLinkedProducts.data.products.length > 0 ? <YouMayLike settings={settings} pagination={pagination} products={fetchLinkedProducts !== undefined && fetchLinkedProducts.data !== undefined ? fetchLinkedProducts.data : ''} Url={Url} /> : ''
            }




            {Includebefefits ?
                <div className="overlay-new incluBniftsPopup" >
                    <div onClick={closePop} className="overlay-mob"></div>
                    <div className="overlay-w">
                        <div className="popup-wrap">
                            <div onClick={closePop} className="close"></div>
                            <div className="popupContnt">
                                <ul className="inBniftsTab">
                                    <li className={`${include ? "active" : ""}`}><Link onClick={includeTrue} href="javascript:void(0)">What’s Included</Link></li>
                                    <li className={`${include ? "" : "active"}`}><Link onClick={benefitTrue} href="javascript:void(0)">Luxury Ride Benefits</Link></li>
                                </ul>
                                {include ?
                                    <div className="content" id="whatsIncluded">
                                        <div className="clumns"> <span>RC Transfer </span> <span>Included</span> </div>
                                        <div className="clumns"> <span>Doorstep Delivery(Delhi NCR)  </span> <span>Included</span> </div>
                                        <div className="clumns"> <span>Refurbishment and Initial Service Cost </span> <span>Included</span> </div>

                                        <div className="clumns"> <span>Applicable taxes <strong>1% TCS (refunded by govt.)</strong></span> <span>Additional</span> </div>
                                        <div className="clumns"> <span>Insurance
                                            <strong>{data && data.product && data.product.insurance_type ? data.product.insurance_type : ''}</strong></span> <span>{data && data.product && data.product.insurance_valid ? data.product.insurance_valid : ''}</span> </div>

                                    </div>
                                    :
                                    <div className="content" id="whatsBenefits">
                                        <div className="clumns"> <span>15 day Money Back Guarantee</span> <span>Included</span> </div>
                                        <div className="clumns"> <span>30 Days Consumables Warranty </span> <span>Included</span> </div>
                                        <div className="clumns"> <span>6 Months Engine & Gearbox Warranty </span> <span>Included</span> </div>
                                        {/* <div className="clumns"> <span>Evaluated cars with 350+ checks </span> <span>Included</span> </div> */}
                                        <div className="clumns"> <span>Easy Finance Options</span> <span>Included</span> </div>
                                    </div>


                                }

                                <div onClick={closePop} className="popup-close-mob  full top-gap mobile-style">Close</div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }

            {locationAdress ?
                <div className="overlay-new exprCntrPopup" >
                    <div onClick={closePop} className="overlay-mob"></div>
                    <div className="overlay-w">
                        <div className="popup-wrap">
                            <div onClick={closePop} className="close"></div>
                            <div className="popupContnt">
                                {data.product.product_location !== undefined ? <h2>  {data.product.product_location.center_name + ' Experience Centre'} </h2> : ''}
                                {data.product.product_location !== undefined ? <p>{data.product.product_location.center_full_address}</p> : ''}

                                {data.product.product_location !== undefined && data.product.product_location !== '' ?
                                    <>
                                        {/* getDirectionsHandler(data.product.product_location !== undefined ? data.product.product_location.center_full_address + ' ' + data.product.product_location.center_name : '') */}
                                        <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${data.product.product_location !== undefined ? data.product.product_location.center_full_address + ' ' + data.product.product_location.center_name : ''}}`} onClick={closePop} className='btn reverse' >Get Directions</Link>
                                    </>
                                    : ''}
                                <Link href="tel:+91 8410084100" className="btn blueBdr">Call Us Now</Link>

                                <div onClick={closePop} className="popup-close-mob full-btn full top-gap mobile-style">Close</div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }

            {testDriveLogin === true ? <LoginForm Login={testDriveLogin} closePop={closePop} logInHeading={`Log in to schedule a Test Drive`} redirectRoute={addressAfterLogin} submitDataAfterSubmitLogIn={manageBookTestDrive} loginId={`user-book-test-drive`} /> : ''}

            {eBookCarLogin === true ? <LoginForm Login={setEBookCarLogin} closePop={closePop} logInHeading={`Log in to schedule a Test Drive`} redirectRoute={addressAfterLogin} submitDataAfterSubmitLogIn={submitDataAfterSubmitLogIn} loginId={`user-e-book-car`} /> : ''}
            {/* <div className={`${Login ? "open-popup" : ""} common-popup login`} style={{ display: "none" }}>

                <div className='popup-inner'>

                    <div className='popup-close' onClick={closePop}></div>

                    <div className='before-otp'>
                        <img src="/img/login-icon.svg" />

                        <h3>Log in to schedule a test drive</h3>

                        <form>

                            <div className='from-row'>

                                <div className='form-div'>

                                    <label>Email / Mobile Number</label>
                                    <input type="text" />
                                    <div className='error'>error</div>

                                </div>
                            </div>
                            <div className='from-row'>
                                <div className='form-div checkbox'>
                                    <input id='whatsappUpdate' type="checkbox" />
                                    <label htmlFor="whatsappUpdate">Get updates on <span>WhatsApp</span></label>
                                    <div className='clr'></div>
                                    <div className='links'>By logging in, I agree to <Link href='#'>terms</Link> and <Link href='#'> privacy policy</Link></div>

                                </div>
                            </div>

                            <button className='btn'>Request OTP</button>


                        </form>

                    </div>

                    <div className='after-otp' style={{ display: "none" }}>
                        <img src="img/otp-icon.svg" />

                        <h3>Enter OTP</h3>



                        <form>

                            <div className='from-row'>

                                <div className='form-div'>

                                    <p>Please enter the OTP sent to <i>9876543210</i> <span>Change</span></p>
                                    <input type="text" />
                                    <div className='error'>error</div>

                                    <div className='otp-timer'>5:45</div>

                                </div>
                            </div>


                            <button className='btn'>Verify & Proceed</button>

                            <div className='resend-otp'>Didn’t received your OTP? <span>Resend OTP</span></div>


                        </form>

                    </div>

                </div>

            </div> */}


            <div className={`${thankYouTestDrive === false ? "" : "test-thankyou"} book-test-drive-main common-popup`} style={{ display: bookTestDrivePopUp === false ? "none" : "block" }} >

                <form method="POST" id="book-test-drive-form" onSubmit={(e) => submitBookedTestDriveData(e)}>
                    <div onClick={closePop} className="overlay-mob mobile-style"></div>
                    <div className='popup-inner'>

                        <div className='popup-close' onClick={closePop}></div>

                        <div className='test-drive' style={{ display: submitTestDrive === true ? "block" : "none" }}    >

                            <h3>Schedule Free Test Drive</h3>

                            <div className='scroll-div'>

                                <div className="prductSec01">

                                    <div className="row">
                                        <div className='col-md-3'>

                                            <img src={`${data.product.image}`} />


                                        </div>
                                        <div className="col-md-9">
                                            <h1>{data.product.name}</h1>
                                            <ul>
                                                <li><span>Regd. Year</span>{data.product.registration_year}</li>
                                                <li><span>Reg. State</span>{data.product.registration_state}</li>
                                                <li><span>KMs Driven</span>{numberFormatter(data.product.kms_driven)}</li>
                                                <li><span>Ownership</span>{data.product.product_ownership}</li>
                                                <li><span>Fuel Type</span>{data.product.fuel_type !== undefined ? data.product.fuel_type.fuel_name : ''}</li>
                                            </ul>

                                            <div className="price-detail">
                                                <div className="price">INR <span>{numberFormatter(data.product.price)}/-</span></div>
                                                <div className="emiStarts">EMI <span>INR {numberFormatter(data.product.product_emi)}/-</span></div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className='book-now-pop' style={{ display: lovedPopUp === false ? "none" : "block" }}>

                                    <div className="popup-close" onClick={closeLovedPopUp}></div>

                                    <h4>Love it? Make it yours!!</h4>
                                    <p>Book it exclusively for a fully refundable deposit of  <span>INR {numberFormatter(data.product.booking_amount)}.</span></p>

                                    <button className='btn arrow-style reverse auto-width '  >
                                        {/*  onClick={manageEBookCar} */}
                                        <span>
                                            {/* <ButtonSpinner load={tinyLoader} btnName="E-Book Now" /> */}
                                            <ButtonSpinner load={tinyLoader} btnName="E-Book Now" />
                                            <span>Coming Soon</span>
                                        </span>
                                    </button>

                                </div>

                                <div className="style-box no-border">

                                    {/* <h4>Select Location</h4> */}

                                    <div className='tabers'>

                                        <div onClick={experienceLocation} className={`${Location ? "active" : ""} btn blueBdr`}>Experience Centre</div>
                                        {/* <div onClick={googleLocation} className={`${Location ? "" : "active"} btn blueBdr`}>My Location</div> */}

                                    </div>
                                    <input type="hidden" name='experience_center' value={data.product.product_location !== undefined && data.product.product_location !== '' ? data.product.product_location._id : ''} />
                                    <input type="hidden" value={data.product._id} name="product_id" id="product_id" />
                                    <input type="hidden" value={data.product.product_location !== undefined ? data.product.product_location.center_name : ''} name="experience_center_name" id="experience_center_name" />
                                    {Location ?
                                        <div className='centre-adress'>

                                            <h4>{data.product.product_location !== undefined ? data.product.product_location.center_name : ''}</h4>
                                            <p>{data.product.product_location !== undefined ? data.product.product_location.center_full_address : ''}</p>
                                            {/* <p>Plot No 41, Saraswati Kunj, Sector 53, Gurugram, (Haryana) – 122011</p> */}

                                        </div>
                                        :
                                        <div className='google-detect'>

                                            {/* <div className='detect-adress'>3rd Floor, Building No. 261, Lane No 5, Westend Marg, Said-ul-Ajaib, Saket, Saiyad Ul Ajaib Extension…</div>

                                            <div className='detect-location'><span>Detect my location</span></div> */}

                                            <div className="from-row">

                                                <div className='form-div'>

                                                    <label>First Name*</label>



                                                    <input type="text" placeholder='Enter First Name' defaultValue={user !== '' && user !== undefined ? user.first_name : ''} name="first_name" id="first_name" onChange={popFirstNameCheck} />

                                                </div>

                                                <div className='form-div'>

                                                    <label>Last Name*</label>

                                                    <input type="text" placeholder='Enter Last Name' name="last_name" id="last_name" onChange={popLastNameCheck} defaultValue={user !== '' && user !== undefined ? user.last_name : ''} />

                                                </div>

                                            </div>
                                            <div className='full-form'>

                                                <div className="from-row full">

                                                    <div className='form-div'>

                                                        <label>Address</label>

                                                        <textarea placeholder='Enter Address' name="drive_full_address" id="full_address" onChange={manageAddressTestDrive}></textarea>



                                                    </div>

                                                </div>

                                                <div className="from-row">

                                                    <div className='form-div'>

                                                        <label>Landmark</label>

                                                        <input type="text" placeholder='Enter Landmark' name="landmark" id="landmark" onChange={manageLandMarkTestDrive} />

                                                    </div>

                                                    <div className='form-div'>

                                                        <label>Pincode </label>

                                                        <input type="text" placeholder='Enter Pincode' name="pincode" id="pincode" onChange={managePinCodetestDrive} value={checkPinCode} minLength={6} maxLength={6} />

                                                    </div>

                                                </div>


                                                <div className="from-row">

                                                    <div className='form-div'>

                                                        <label>Select State</label>

                                                        <select onChange={(e) => getCitiesByState(e.target.value)} name="state" id="state_name" >
                                                            <option value={``}>Select State</option>
                                                            {
                                                                getStates !== undefined && getStates.data !== undefined && getStates.data.data.map((state, i) => {
                                                                    return (
                                                                        <option value={state.province_title} key={i}>{state.province_title}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className='form-div'>

                                                        <label>Select City</label>

                                                        <select name="city" id="city_name" onChange={manageCitytestDrive}>
                                                            <option value={``}>Select City</option>
                                                            {
                                                                getCities !== undefined && getCities.map((city, i) => {
                                                                    return (
                                                                        <option value={city.name} key={i}>{city.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>

                                                    </div>

                                                </div>



                                            </div>
                                        </div>

                                    }

                                </div>

                                <div className='style-box no-border add-time-date'>

                                    <h4>Select Date*</h4>

                                    <div className='dates time-pd'>

                                        {
                                            weekCal && weekCal.map((date, i) => {
                                                return (
                                                    <div className='date' key={i}>
                                                        <input type="radio" name="book_date" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} onChange={(e) => manageDateTestDrive(`${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))}

                                                        />
                                                        <label htmlFor={`selected_${i}`} className="option">
                                                            {date.day} {date.month} <span>{date.weekDay}</span>
                                                        </label>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>

                                    </div>
                                    <small id="selectedDateError" className="error"></small>

                                </div>

                                <div className='style-box time-slot no-border add-time-date'>

                                    <h4>Select Time Slot*</h4>

                                    <div className='dates'>
                                        {/* {dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} */}

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="11 AM - 12 PM" id="selectTimeOne" onChange={manageTimeSlotOne}
                                                disabled={todayDay === radioSelectedDate && todayTime >= '11' ? true : false} />
                                            <label htmlFor="selectTimeOne" className={`option ${todayDay === radioSelectedDate && todayTime >= '11' ? 'disable-time' : ''}`} >11AM - 12PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="12 PM - 1 PM" id="selectTimeTwo" onChange={manageTimeSlotTwo} disabled={todayDay === radioSelectedDate && todayTime >= '12' ? true : false} />
                                            <label htmlFor="selectTimeTwo" className={`option ${todayDay === radioSelectedDate && todayTime >= '12' ? 'disable-time' : ''}`}>12PM - 1PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="1 PM - 2 PM" id="selectTimeThree" onChange={manageTimeSlotThree} disabled={todayDay === radioSelectedDate && todayTime >= '13' ? true : false} />
                                            <label htmlFor="selectTimeThree" className={`option ${todayDay === radioSelectedDate && todayTime >= '13' ? 'disable-time' : ''}`}>1PM - 2PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="2 PM - 3 PM" id="selectTimeFour" onChange={manageTimeSlotFour} disabled={todayDay === radioSelectedDate && todayTime >= '14' ? true : false} />
                                            <label htmlFor="selectTimeFour" className={`option ${todayDay === radioSelectedDate && todayTime >= '14' ? 'disable-time' : ''}`}>2PM - 3PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="3 PM - 4 PM" id="selectTimeFive" onChange={manageTimeSlotFive} disabled={todayDay === radioSelectedDate && todayTime >= '15' ? true : false} />
                                            <label htmlFor="selectTimeFive" className={`option ${todayDay === radioSelectedDate && todayTime >= '15' ? 'disable-time' : ''}`}>3PM - 4PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="4 PM - 5 PM" id="selectTimeSix" onChange={manageTimeSlotSix} disabled={todayDay === radioSelectedDate && todayTime >= '16' ? true : false} />
                                            <label htmlFor="selectTimeSix" className={`option ${todayDay === radioSelectedDate && todayTime >= '16' ? 'disable-time' : ''}`}>4PM - 5PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="5 PM - 6 PM" id="selectTimeSaven" onChange={manageTimeSlotSaven} disabled={todayDay === radioSelectedDate && todayTime >= '17' ? true : false} />
                                            <label htmlFor="selectTimeSaven" className={`option ${todayDay === radioSelectedDate && todayTime >= '17' ? 'disable-time' : ''}`}>5PM - 6PM</label>
                                        </div>

                                        <div className='date'>
                                            <input type="radio" name="book_time" value="6 PM - 7 PM" id="selectTimeEight" onChange={manageTimeSlotEight} disabled={todayDay === radioSelectedDate && todayTime >= '18' ? true : false} />
                                            <label htmlFor="selectTimeEight" className={`option ${todayDay === radioSelectedDate && todayTime >= '18' ? 'disable-time' : ''}`}>6PM - 7PM</label>
                                        </div>

                                    </div>
                                    <small id="selectedTimeError" className="error"></small>

                                </div>

                                <div className='style-box time-slot no-border'>

                                    <div className='message'>We thoroughly clean and sanitize our cars before each test-drive <br />to ensure a memorable and pleasant experience for you.
                                    </div>

                                </div>



                            </div>

                            <div className='fixed-button'><button>
                                <ButtonSpinner load={tinyLoader} btnName="SCHEDULE TEST DRIVE" />
                                <span>
                                    <i>At </i>
                                    {bookedAddres ? bookedAddres : data.product.product_location !== undefined ? data.product.product_location.center_name + ` Experience Centre` : ''}  <i> </i>
                                    {` ${bookedDateSlot.weekDay !== undefined ? 'on ' + bookedDateSlot.weekDay : ''}${bookedDateSlot.day !== undefined ? ', ' + bookedDateSlot.day : ''} ${bookedDateSlot.month ? bookedDateSlot.month : ''} ${bookedDateSlot.year ? bookedDateSlot.year : ''}`}
                                    {bookedTimeSlot ? <><i> from </i>{bookedTimeSlot}</> : ''}
                                </span>
                            </button></div>

                        </div>

                        <div className='thankyou' style={{ display: thankYouTestDrive === false ? "none" : "block" }}>



                            <div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

                            <h4>Congratulations!!</h4>

                            <p>Your Test Drive is scheduled for  <span>
                                {`${bookedDateSlot.weekDay}, ${bookedDateSlot.day} ${bookedDateSlot.month} ${bookedDateSlot.year}`}
                                ,</span>  <span>{bookedTimeSlot} </span>at

                                <span> {bookedAddres}.</span> <br />Our Sales Manager will connect with you shortly.</p>

                            <Link href={`/buy`} className='btn reverse'>Back To Cars</Link>

                            {checkUserAddress === 1 && data.product.product_location !== undefined && data.product.product_location !== '' ?
                                <>
                                    {/* <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${data.product.product_location !== undefined ? data.product.product_location.center_full_address + ' ' + data.product.product_location.center_name : ''}}`} onClick={closePop} className='btn reverse' >Get Directions</Link> */}
                                    <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${data.product.product_location !== undefined ? data.product.product_location.center_full_address + ' ' + data.product.product_location.center_name : ''}}`} onClick={closePop} className='btn reverse' >Get Directions</Link>
                                </>
                                : ''}

                        </div>

                    </div>


                </form>

            </div>
            {GetACall ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}

        </div>
    )
}

export default ProductDetail
