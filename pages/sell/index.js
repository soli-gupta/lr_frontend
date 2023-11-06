import WebHead from '@/components/common/WebHead'
import React, { useEffect, useRef, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { ButtonSpinner, dateConverterForValue, weekDatesForForms } from '@/components/Helper';
import LoginForm from '@/components/LoginForm';
import { $ } from 'react-jquery-plugin';
import ReviewComponent from '@/components/customer-review/ReviewComponent';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import FrequentlyAskedQuestions from '@/components/frequently-asked-questions/FrequentlyAskedQuestions';
import Slider from "react-slick";
import PixelLoader from '@/components/PixelLoader';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function Index() {



    const router = useRouter()
    const [tinyLoader, setTinyLoader] = useState(false);
    const [Popup, setPopUp] = useState(false);
    const [year, setYear] = useState('')
    const [review, setReview] = useState('')

    const [formDatas, setFormDatas] = useState('')

    const [contactInput, setContactInput] = useState('');
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [visitSuccess, setVisitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('')

    // show select data name
    const [brandNameData, setBrandNameData] = useState('')
    const [yearDataName, setYearDataName] = useState('')
    const [modelNameData, setModelNameData] = useState('')
    const [variantNameData, setVariantNameData] = useState('')
    const [ownershipNameData, setOwnerShipNameData] = useState('')
    const [modelId, setModelId] = useState('')
    const [variantId, setVariantId] = useState('')
    const [kmsData, setKmsData] = useState('')
    const [brand, setBrand] = useState('')

    // store All Model, Variant Data
    const [modelName, setModelName] = useState('')
    const [variantName, setVariantName] = useState('')

    const [serviceCenterId, setServiceCenterId] = useState('');

    // Display All form 
    const [brandValue, setBrandValue] = useState(false)
    const [yearValue, setYearValue] = useState(false)
    const [modelValue, setModelValue] = useState(false)
    const [variantValue, setVariantValue] = useState(false)
    const [OwnershipValue, setOwnerShipValue] = useState(false)
    const [kmsValue, setKmsValue] = useState(false)

    const [Login, setLogin] = useState(false);
    const [disabled, setDisabled] = useState(true)

    const [user, setUser] = useState('');

    const [radioSelectedDate, setRadioSelectedDate] = useState('');
    const [bookedTimeSlot, setBookedTimeSlot] = useState('');


    const todayDate = new Date();
    const currentDate = todayDate.getDate();
    const todayMonth = todayDate.getMonth() + 1;
    const todayYear = todayDate.getFullYear();
    const todayTime = todayDate.getHours();
    const todayDay = todayYear + '-' + todayMonth + '-' + currentDate


    const HidePopup = () => {
        setPopUp(false)
        setDateLimit(7);
        setServiceCenterId('');

        setContactInput('');
        setFirstNameInput('');
        setLastNameInput('');

        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
        setVisitSuccess(false);
    }

    const closePop = () => {
        setTinyLoader(false)
        setLogin(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
    }

    const openPopup = (e, _id) => {
        document.getElementById('visit-center-for-book').reset();
        e.preventDefault();
        setPopUp(true);
        setServiceCenterId(_id);
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll-poup');
            document.body.classList.add('hide-scroll-poup-new');
        }
    }

    const brandList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}get-brands-sorting`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setBrand(res.data.brands)
                } else if (res.data.status == 0) {
                    // alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    // alert(error.response.data.message);
                }
            });
    }

    const selectModelsByBrand = async (brandId, brandName) => {
        setBrandNameData(brandName)
        setDisabled(true)
        document.getElementById("btSubmit").classList.add("disableBtn");
        document.getElementById('carFormData').reset()
        var year = document.querySelector('input[type=radio][name=year]:checked');
        if (year && year.checked === true) {
            year.checked = false
        }

        var model = document.querySelector('input[type=radio][name=model_name]:checked');
        if (model && model.checked === true) {
            model.checked = false
        }

        var variant = document.querySelector('input[type=radio][name=variant_name]:checked');
        if (variant && variant.checked === true) {
            variant.checked = false
        }

        var ownership = document.querySelector('input[type=radio][name=ownership]:checked');
        if (ownership && ownership.checked === true) {
            ownership.checked = false
        }

        setModelName('')
        setModelNameData('')
        setVariantName('')
        setModelNameData('')
        setVariantNameData('')
        setOwnerShipNameData('')
        setKmsData('')
        setYearDataName('')
        await axios.get(`${process.env.NEXT_PUBLIC_URL}model-by-brand-id?id=${brandId}`)
            .then(function (res) {
                if (res.data.status === 1) {
                    setModelName(res.data.brand_model)
                    setYearValue(!yearValue)
                    setBrandValue(brandValue)
                } else if (res.data.status === 0) {
                    // alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    // NotificationManager.info(error.response.data.message);
                    // alert(error.response.data.message);
                }
            });
    }

    const selectYear = (year) => {
        setYearDataName(year)
        setModelValue(modelName)
        setYearValue(yearValue)
    }

    const fetchVariantsByModel = async (modelId, modelName) => {

        var variant = document.querySelector('input[type=radio][name=variant_name]:checked');
        if (variant && variant.checked === true) {
            variant.checked = false
        }

        var ownership = document.querySelector('input[type=radio][name=ownership]:checked');
        if (ownership && ownership.checked === true) {
            ownership.checked = false
        }

        setVariantName('')
        setVariantNameData('')
        setOwnerShipNameData('')
        setKmsData('')
        setDisabled(true)
        document.getElementById("btSubmit").classList.add("disableBtn");
        await axios.get(`${process.env.NEXT_PUBLIC_URL}variant-by-model-id?id=${modelId}`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setModelId(modelId)
                    setVariantName(res.data.model_variant)
                    setModelValue(modelValue)
                    setVariantValue(!variantValue)
                    setModelNameData(modelName)
                } else if (res.data.status == 0) {
                    // alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response.data.status === 0) {
                    // alert(error.response.data.message);
                }
            });
    }

    const selectVariant = (variantId, variantName) => {
        var ownership = document.querySelector('input[type=radio][name=ownership]:checked');
        if (ownership && ownership.checked === true) {
            ownership.checked = false
        }

        setOwnerShipNameData('')
        setKmsData('')
        setVariantId(variantId)
        setVariantNameData(variantName)
        setVariantValue(variantValue)
        setOwnerShipValue(!OwnershipValue)
    }

    const selectOwnerShip = (owner) => {
        if ((brandNameData === '') && (yearDataName === '') && (modelNameData === '') && (variantNameData === '') || (kmsData === '')) {
            setOwnerShipNameData(owner)
            setOwnerShipValue(OwnershipValue)
            setKmsValue(!kmsValue)
            setKmsData('')
            setDisabled(true)
            document.getElementById('btSubmit').classList.add('disableBtn')
        } else {
            setDisabled(false)
            document.getElementById('btSubmit').classList.remove('disableBtn')
            setOwnerShipNameData(owner)
            setKmsData('')
            setOwnerShipValue(OwnershipValue)
            setKmsValue(!kmsValue)
        }
    }

    const setkmsDriveData = () => {
        if ((brandNameData === '') || (yearDataName === '') || (modelNameData === '') || (variantNameData === '') || (ownershipNameData === '')) {
            setKmsData('')
            setDisabled(true)
            document.getElementById('btSubmit').classList.add('disableBtn')
        } else {
            setDisabled(false)
            document.getElementById('btSubmit').classList.remove('disableBtn')
        }

    }
    const setKmsValueData = (e) => {
        setKmsData(e.target.value)
    }
    const openBrandForm = () => {
        setBrandValue(!brandValue)
        setYearValue(false)
        setModelValue(false)
        setVariantValue(false)
        setOwnerShipValue(false)
        setKmsValue(false)
    }

    const openYearForm = () => {
        setYearValue(!yearValue)
        setBrandValue(false)
        setModelValue(false)
        setVariantValue(false)
        setOwnerShipValue(false)
        setKmsValue(false)
    }

    const openModelForm = () => {
        setModelValue(!modelValue)
        setBrandValue(false)
        setYearValue(false)
        setVariantValue(false)
        setOwnerShipValue(false)
        setKmsValue(false)
    }

    const openVariantForm = () => {
        setVariantValue(!variantValue)
        setModelValue(false)
        setBrandValue(false)
        setYearValue(false)
        setOwnerShipValue(false)
        setKmsValue(false)
    }

    const openOwnshipForm = () => {
        setOwnerShipValue(!OwnershipValue)
        setVariantValue(false)
        setModelValue(false)
        setBrandValue(false)
        setYearValue(false)
        setKmsValue(false)
    }

    const openKmsForm = () => {
        setOwnerShipValue(false)
        setVariantValue(false)
        setModelValue(false)
        setBrandValue(false)
        setYearValue(false)
        setKmsValue(!kmsValue)
    }

    const allYear = async () => {
        const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
        const yearData = await years.json()
        setYear(yearData.year)
    }

    const hideKmInput = () => {
        setKmsValue(false)
    }

    const checkFormChange = () => {
        let forms = document.getElementById('carFormData')
        let error = 0;

        Array.prototype.slice.call(forms).forEach(function (form) {
            if (form.required && !form.value) {
                console.log('err')
                error++;
            }
        })

        if (!error) {
            setDisabled(false)
            var element = document.getElementById("btSubmit");
            element.classList.remove("disableBtn");
        }

    }

    const saveDataAfterLogin = async () => {
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-sell-data`, formDatas, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        router.push(`/sell/sell-detail?id=${res.data.lastInsertId}`);
                    }
                })
                .catch(function (error) {
                    setTinyLoader(false)
                    console.log(error)

                });

        }
    }

    const submitData = async (e) => {
        let formData = new FormData(document.getElementById('carFormData'))
        var carInfo = {};
        formData.forEach(function (value, key) {
            carInfo[key] = value;
        });
        setFormDatas(carInfo)
        if (brandNameData == '' || yearDataName == '' || modelNameData == '' || variantNameData == '' || ownershipNameData == '' || kmsData == '') {
            document.getElementById('errMsg').innerHTML = 'Please select all values to continue.';
            document.getElementById("errMsg").style.display = "block";
            setTimeout(() => {
                document.getElementById('errMsg').innerHTML = '';
                document.getElementById("errMsg").style.display = "none";
            }, 3000);
            // setVisitSuccess(true);
            // document.body.classList.add('hide-scroll-poup-new');
            // setCallErrorMessage('Please select all values.');
            return false
        }
        setTinyLoader(true)
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-sell-data`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        router.push(`/sell/sell-detail?id=${res.data.lastInsertId}`);
                    }
                })
                .catch(function (error) {
                    if (error) {
                        setVisitSuccess(true);
                        document.body.classList.add('hide-scroll-poup-new');
                        setCallErrorMessage('Oops Something went wrong.');
                    }
                    setTinyLoader(false)
                });

        } else {
            document.body.classList.add('hide-scroll-poup-new');
            setLogin(true)
        }
    }
    const Url = process.env.NEXT_PUBLIC_URL;
    const fetchExperienceCenter = useSWR(`${Url}fetch-experience-center`, fetcher);
    const cmspage = useSWR(`${Url}cms-page/sell`, fetcher);
    const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);



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
    const handleCenterBookVisit = async (e) => {

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

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            axios.post(`${Url}book-visit`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.data && res.data.status === 1) {
                    setPopUp(false);
                    setVisitSuccess(true);
                    setSuccessMessage(res.data.message);
                }
            }).catch((e) => {
                if (e.response && e.response.data.status === 0) {
                    setCallErrorMessage('Something went wrong. Please fill all details and click agin for Book a Visit.');
                }
            })

        } else {
            document.body.classList.add('hide-scroll-poup-new');
            setLogin(true)
        }

    }


    const ref = useRef()

    useEffect(() => {

        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref.current && !ref.current.contains(e.target)) {
                setBrandValue(false)
                setYearValue(false)
                setModelValue(false)
                setVariantValue(false)
                setOwnerShipValue(false)
                setKmsValue(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)



        if (typeof window !== "undefined") {
            document.body.className = "sticky-btn-have";
        }

        allYear()
        brandList()
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            axios.get(`${Url}user/get-user-profile`, {
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

        $('.numberonly').keypress(function (e) {
            var charCode = (e.which) ? e.which : event.keyCode
            if (String.fromCharCode(charCode).match(/[^0-9]/g))
                return false;
        });

        return () => {
            if (typeof window !== "undefined") {
                document.body.className = "";
            }
        }

    }, [typeof window !== "undefined" ? localStorage.getItem("car-sell-detail") : false])

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,

    };


    return (
        <>
            <WebHead pageTitle="Sell" />
            {/* <PixelLoader /> */}


            <div className="home-banner inner-banner mobile-view-hide sell-main-banner">

                <Slider {...settings}  >
                    <img src="/img/sell-banner-new1.png" alt="" />
                    <img src="/img/sell-banner-new2.png" alt="" />
                    <img src="/img/sell-banner-new.png" alt="" />


                </Slider>
                <div className="filter-section wd-filter">

                    <h2>Sell Your Car At Highest Price in <span>59 Minutes</span></h2>
                    <ul>
                        <li><span><img src="/img/selling-icon1.svg" />  Instant Call Back</span> </li>
                        <li><span><img src="/img/selling-icon2.svg" /> Doorstep Evaluation</span> </li>
                        <li><span><img src="/img/selling-icon3.svg" /> Instant Payment </span> </li>

                    </ul>




                    <div className='car-search' ref={ref}>
                        <form id="carFormData" method='POST' onInput={checkFormChange} autoComplete='off'>
                            <div className={`div-data ${brandNameData ? 'added' : ''}`} onClick={openBrandForm}>
                                <div className='data'>
                                    <span>Brand</span>
                                    <i>{brandNameData ? brandNameData : ''}</i>

                                </div>
                                <div className="car-data" style={{ display: `${brandValue ? 'block' : 'none'}` }}>
                                    <div className='brands no-after-radio'>
                                        {brand && brand.map((brand, i) => {
                                            return (

                                                <div className="form-group" key={i}>
                                                    <input type="radio" id={`brand_${brand.slug}`} name="brand_name" onChange={() => selectModelsByBrand(brand._id, brand.name)} defaultValue={brandNameData ? brandNameData : ''} defaultChecked={brandNameData === brand.name ? true : false} />
                                                    <label htmlFor={`brand_${brand.slug}`}>
                                                        <img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} />
                                                        <span>{brand.name}</span>
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                            </div>

                            <div className={`div-data ${yearDataName ? 'added' : ''}`} onClick={openYearForm}>
                                <div className='data'>
                                    <span>Year</span>
                                    <i>{yearDataName ? yearDataName : ''}</i>
                                </div>

                                <div className="car-data small-box four-bxgrid" style={{ display: `${yearValue ? 'block' : 'none'}` }}>

                                    <h5>Select Reg. Year</h5>
                                    <div className='brands' id="carYear">
                                        {year && year.map((year, i) => {
                                            return (
                                                <>
                                                    <div className="form-group" key={i}>
                                                        <input type="radio" name="year" id={year} defaultValue={year} onChange={(e) => selectYear(year)} defaultChecked={yearDataName === year ? true : false} required />
                                                        <label htmlFor={year}>{year}</label>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>

                                </div>

                            </div>

                            <div className={`div-data ${modelNameData ? 'added' : ''}`} onClick={() => openModelForm()}>
                                <div className='data'>
                                    <span>Model</span>
                                    <i>{modelNameData ? modelNameData : ''}</i>
                                </div>

                                <div className="car-data small-box" style={{ display: `${modelValue ? 'block' : 'none'}` }}>

                                    <h5>Select Model</h5>
                                    <div className='scroller-cars-data'>
                                        <div className='brands'>
                                            {modelName && modelName.map((model, i) => {
                                                return (
                                                    <>
                                                        <div className="form-group" key={i}>
                                                            <input type="radio" name="model_name" id={model.slug} defaultValue={model.name} onChange={(e) => fetchVariantsByModel(model._id, model.name)} required />
                                                            <label htmlFor={model.slug}> {model.name} </label>
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className={`div-data ${variantNameData ? 'added' : ''}`} onClick={openVariantForm}>
                                <div className='data'>
                                    <span>Variant</span>
                                    <i>{variantNameData ? variantNameData : ''}</i>
                                </div>

                                <div className="car-data small-box" style={{ display: `${variantValue ? 'block' : 'none'}` }}>
                                    <h5>Select Variant</h5>
                                    <div className='scroller-cars-data'>
                                        <div className='brands'>
                                            {variantName && variantName.map((variant, i) => {
                                                return (
                                                    <>
                                                        <div className="form-group" key={i}>
                                                            <input type="radio" name="variant_name" id={variant.slug} defaultValue={variant.name} onChange={() => selectVariant(variant._id, variant.name)} required />
                                                            <label htmlFor={variant.slug}>{variant.name}</label>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className={`div-data ${ownershipNameData ? 'added' : ''}`} onClick={openOwnshipForm} >
                                <div className='data'>
                                    <span>Ownership</span>
                                    <i>{ownershipNameData ? ownershipNameData : ''}</i>
                                </div>

                                <div className="car-data mob-right-box small-box" style={{ display: `${OwnershipValue ? 'block' : 'none'}` }}>
                                    <h5>Select Ownership</h5>
                                    <div className='brands'>

                                        <div className="form-group">
                                            <input type="radio" name="ownership" defaultValue="1" id="1st Owner" onChange={() => selectOwnerShip("1")} defaultChecked={ownershipNameData === '1' ? true : false} />
                                            <label htmlFor="1st Owner">1st Owner </label>
                                        </div>

                                        <div className="form-group">
                                            <input type="radio" name="ownership" defaultValue="2" id="2nd Owner" onChange={() => selectOwnerShip("2")} defaultChecked={ownershipNameData === '2' ? true : false} />
                                            <label htmlFor="2nd Owner">2nd Owner </label>
                                        </div>

                                        <div className="form-group">
                                            <input type="radio" name="ownership" defaultValue="3" id="3rd Owner" onChange={() => selectOwnerShip("3")} defaultChecked={ownershipNameData === '3' ? true : false} />
                                            <label htmlFor="3rd Owner">3rd Owner </label>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className={`div-data ${kmsData ? 'added' : ''} right-style`}>
                                <div className='data' onClick={openKmsForm}>
                                    <span>KMs Driven</span>

                                    <i>{kmsData ? Number(kmsData).toLocaleString('en-US') : ''}</i>
                                </div>

                                <div className="car-data" style={{ display: `${kmsValue ? 'block' : 'none'}` }} onMouseLeave={hideKmInput}>

                                    <h5>KMs Range</h5>

                                    <div className='filter-txtbx form-input' >
                                        <input type='text' placeholder='Enter KMs Range' id="kms" className='numberonly' onChange={(e) => { setKmsValueData(e), setkmsDriveData() }} name='kms' defaultValue={kmsData} required maxLength={6} />
                                    </div>
                                </div>

                            </div>
                            <input type="hidden" name="step_form" value="1" />
                            <div className='div-data'>
                                <button type="button" id="btSubmit" className='disableBtn' onClick={() => submitData()}>
                                    <ButtonSpinner load={tinyLoader} btnName="Submit" />
                                </button>

                            </div>
                        </form>
                        <span className='error banner-error' id="errMsg"></span>
                    </div>






                </div >

                <div className='sell-logo'>
                    <h4><span>Brands We Deal In</span></h4>
                    {
                        fetchBrands.data && fetchBrands.data.brands.map((brand, i) => {
                            return (
                                <div className="item" key={brand.slug}>
                                    <div className="brand-logo">

                                        <img src={`${Url}${brand.logo}`} />

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
            <div className="inner-mobile-banner desktop-hide-div mobile-show-div sell-main-banner">
                {/* <img src={`${Url}${cmspage.data !== undefined && cmspage.data.cms_page.mobile_banner}`} alt="" /> */}
                <Slider {...settings}  >
                    <img src="/img/sell-banner-new1-mobile.png" alt="" />
                    <img src="/img/sell-banner-new2-mobile.png" alt="" />
                    <img src="/img/sell-banner-new-mobile.png" alt="" />


                </Slider>
                <div className="mobile-txt-banner">
                    <div className="wrapper">
                        <h2>Sell Your Car At Highest Price in <span>59 Minutes</span></h2>
                        <ul>
                            <li><span><img src="/img/selling-icon1.svg" />  Instant Call Back</span> </li>
                            <li><span><img src="/img/selling-icon2.svg" /> Doorstep Evaluation</span> </li>
                            <li><span><img src="/img/selling-icon3.svg" /> Instant Payment </span> </li>

                        </ul>
                        {/* <Link className="btn" href="sell/sellMobileFilter">Get Started</Link> */}
                    </div>
                </div>
                <div className='sell-logo'>
                    <h4><span>Brands We Deal In</span></h4>
                    {
                        fetchBrands.data && fetchBrands.data.brands.map((brand, i) => {
                            return (
                                <div className="item" key={brand.slug}>
                                    <div className="brand-logo">

                                        <img src={`${Url}${brand.logo}`} />

                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="banner-bottom-cta desktop-hide-div mobile-show-div"> <Link className="btn" href="sell/sellMobileFilter">Get Started</Link></div>
                </div>

            </div>
            {/* 
               content one */}
            <section className='made-simple'>
                <div className="wrapper">
                    {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_one }}></div>}

                </div>
            </section>
            {/* content two */}
            {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_two }}></div>}


            <section className='why-sell-lr-car commonm-gap'>
                <div className="wrapper">
                    {cmspage.data !== undefined && cmspage.data.cms_page && <div dangerouslySetInnerHTML={{ __html: cmspage.data.cms_page.content_three }}></div>}
                </div>
            </section>

            <section className="experice-center commonm-gap sell-experience">
                <div className="wrapper">
                    <ul>
                        {
                            fetchExperienceCenter.data && fetchExperienceCenter.data.experience_center.map((center, i) => {
                                return (
                                    <li key={i}>
                                        <img src={`${Url}${center.banner}`} alt="" />
                                        <div className="text">

                                            <h3>{center.title}</h3>
                                            <p>{center.short_description}</p>

                                            <Link onClick={(e) => openPopup(e, center._id)} href="#" className="btn center  arrow-style blueBdr"><span>Book An Appointment</span></Link>
                                            <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${center !== undefined ? center.address + ' ' + center.name : ''}`} className='btn center arrow-style blueBdr'>Get Directions</Link>

                                        </div>

                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>

            </section>

            <section className="luxxry-app commonm-gap">


                <div className="wrapper">

                    <div className="cont-box">

                        <img className="app-icon" src="img/app-icon.png" />

                        <div className="text">

                            <h2>Get the Luxury Ride App</h2>
                            <p>Enter your number, and we will send you a link.<br /> Open it on your phone to download the app.</p>

                            <form>

                                <div className="input-div">
                                    <div className="country-code">+91</div>
                                    <input placeholder="XXXX-XXX-XXX" type="text" />
                                    <div className="error"></div>
                                </div>
                                <button>Send</button>
                            </form>

                            <div className="app-icons">

                                <a href="#"><svg width="130" height="31" viewBox="0 0 649 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_71_390)">
                                        <path d="M102.815 79.4406C102.643 60.331 118.466 51.0341 119.19 50.6013C110.229 37.5394 96.339 35.7547 91.458 35.6124C79.7923 34.3851 68.4765 42.591 62.5339 42.591C56.4728 42.591 47.3217 35.731 37.4589 35.9326C24.7672 36.1283 12.8939 43.4745 6.38201 54.8821C-7.05697 78.1421 2.96592 112.324 15.8415 131.125C22.2822 140.339 29.8083 150.614 39.6592 150.252C49.2966 149.861 52.8965 144.116 64.5267 144.116C76.05 144.116 79.4305 150.252 89.4771 150.021C99.8203 149.861 106.332 140.772 112.548 131.481C119.991 120.933 122.98 110.533 123.098 109.999C122.861 109.916 103.017 102.339 102.815 79.4406ZM83.837 23.2442C89.0205 16.7637 92.567 7.94707 91.5825 -1C84.0802 -0.667968 74.6978 4.188 69.2949 10.5262C64.5148 16.1115 60.2447 25.2661 61.3478 33.8752C69.7753 34.5037 78.4282 29.624 83.837 23.2442Z" fill="white" />
                                        <path d="M242.406 148.93H228.938L221.56 125.753H195.916L188.888 148.93H175.775L201.188 70.0251H216.881L242.406 148.93ZM219.336 116.029L212.664 95.4255C211.958 93.3207 210.63 88.3639 208.684 80.5612H208.447C207.664 83.9171 206.413 88.8738 204.699 95.4255L198.14 116.029H219.336ZM307.632 119.782C307.632 129.459 305.005 137.107 299.744 142.722C295.035 147.721 289.182 150.217 282.201 150.217C274.664 150.217 269.243 147.531 265.951 142.147V172H253.307V110.735C253.307 104.657 253.147 98.4257 252.839 92.0341H263.959L264.664 101.052H264.902C269.118 94.2575 275.518 90.8601 284.105 90.8601C290.819 90.8601 296.423 93.5104 300.907 98.817C305.385 104.135 307.632 111.12 307.632 119.782ZM294.751 120.245C294.751 114.707 293.505 110.142 291.003 106.543C288.269 102.801 284.597 100.928 279.995 100.928C276.876 100.928 274.041 101.971 271.508 104.029C268.97 106.104 267.309 108.814 266.533 112.169C266.186 113.424 265.989 114.716 265.945 116.017V125.51C265.945 129.643 267.215 133.135 269.753 135.993C272.291 138.839 275.589 140.268 279.645 140.268C284.408 140.268 288.114 138.424 290.765 134.765C293.422 131.095 294.751 126.257 294.751 120.245ZM373.09 119.782C373.09 129.459 370.462 137.107 365.202 142.722C360.487 147.721 354.639 150.217 347.653 150.217C340.115 150.217 334.694 147.531 331.403 142.147V172H318.758V110.735C318.758 104.657 318.598 98.4257 318.29 92.0341H329.41L330.116 101.052H330.353C334.564 94.2575 340.963 90.8601 349.557 90.8601C356.264 90.8601 361.869 93.5104 366.364 98.817C370.836 104.135 373.09 111.12 373.09 119.782ZM360.202 120.245C360.202 114.707 358.951 110.142 356.448 106.543C353.714 102.801 350.055 100.928 345.452 100.928C342.333 100.928 339.498 101.971 336.954 104.029C334.415 106.104 332.761 108.814 331.984 112.169C331.598 113.735 331.391 115.009 331.391 116.017V125.51C331.391 129.643 332.666 133.135 335.192 135.993C337.731 138.833 341.028 140.268 345.097 140.268C349.865 140.268 353.572 138.424 356.217 134.765C358.874 131.095 360.202 126.257 360.202 120.245ZM446.274 126.797C446.274 133.514 443.926 138.975 439.258 143.191C434.122 147.792 426.952 150.098 417.76 150.098C409.267 150.098 402.458 148.462 397.322 145.183L400.246 134.647C405.791 137.932 411.882 139.568 418.513 139.568C423.281 139.568 426.988 138.489 429.633 136.348C432.284 134.202 433.624 131.332 433.624 127.751C433.624 124.544 432.515 121.858 430.339 119.67C428.15 117.488 424.532 115.454 419.45 113.586C405.631 108.434 398.716 100.898 398.716 90.9846C398.716 84.51 401.16 79.2094 406.035 75.0649C410.91 70.9263 417.374 68.8571 425.416 68.8571C432.598 68.8571 438.582 70.1081 443.333 72.6043L440.16 82.9091C435.688 80.49 430.641 79.2805 424.995 79.2805C420.535 79.2805 417.036 80.3774 414.533 82.5593C412.428 84.51 411.36 86.8876 411.36 89.7099C411.36 92.8227 412.576 95.4078 414.996 97.4355C417.095 99.3032 420.927 101.337 426.466 103.519C433.262 106.258 438.256 109.448 441.453 113.112C444.673 116.776 446.274 121.348 446.274 126.797ZM488.187 101.521H474.25V129.145C474.25 136.171 476.705 139.675 481.627 139.675C483.887 139.675 485.761 139.485 487.244 139.088L487.594 148.687C485.103 149.618 481.823 150.086 477.761 150.086C472.767 150.086 468.865 148.562 466.047 145.515C463.242 142.467 461.831 137.362 461.831 130.176V101.497H453.528V92.0104H461.831V81.5929L474.25 77.8456V92.0104H488.187V101.521ZM550.946 120.014C550.946 128.759 548.443 135.939 543.449 141.554C538.224 147.335 531.273 150.217 522.609 150.217C514.246 150.217 507.598 147.448 502.64 141.916C497.682 136.372 495.203 129.388 495.203 120.962C495.203 112.146 497.765 104.924 502.871 99.3091C507.989 93.6883 514.881 90.8779 523.546 90.8779C531.896 90.8779 538.604 93.6527 543.68 99.1905C548.532 104.562 550.946 111.499 550.946 120.014ZM537.839 120.304C537.839 115.092 536.712 110.622 534.452 106.881C531.801 102.363 528.006 100.104 523.089 100.104C518.024 100.104 514.14 102.363 511.494 106.881C509.229 110.622 508.102 115.17 508.102 120.541C508.102 125.759 509.229 130.241 511.494 133.971C514.229 138.489 518.042 140.748 522.982 140.748C527.816 140.748 531.605 138.441 534.345 133.858C536.67 130.028 537.839 125.528 537.839 120.304ZM592.063 103.151C590.748 102.914 589.414 102.797 588.078 102.801C583.63 102.801 580.19 104.473 577.77 107.841C575.671 110.806 574.615 114.553 574.615 119.077V148.93H561.971V109.952C561.982 103.979 561.859 98.0072 561.603 92.04H572.616L573.079 102.926H573.429C574.769 99.1846 576.869 96.1667 579.751 93.9077C582.389 91.9337 585.595 90.8648 588.89 90.8601C590.059 90.8601 591.114 90.9431 592.051 91.0913L592.063 103.151ZM648.612 117.79C648.644 119.712 648.49 121.632 648.15 123.524H610.217C610.359 129.145 612.198 133.449 615.721 136.414C618.917 139.058 623.051 140.386 628.128 140.386C633.744 140.386 638.868 139.497 643.476 137.7L645.457 146.469C640.072 148.817 633.714 149.985 626.378 149.985C617.553 149.985 610.626 147.388 605.585 142.206C600.556 137.018 598.035 130.046 598.035 121.312C598.035 112.739 600.378 105.594 605.069 99.8961C609.98 93.8128 616.616 90.7712 624.967 90.7712C633.169 90.7712 639.378 93.8128 643.595 99.8961C646.934 104.716 648.612 110.693 648.612 117.79ZM636.555 114.511C636.644 110.758 635.814 107.527 634.1 104.794C631.912 101.272 628.543 99.5166 624.03 99.5166C619.896 99.5166 616.527 101.23 613.965 104.669C611.86 107.402 610.608 110.687 610.223 114.5L636.555 114.511Z" fill="white" />
                                        <path d="M192.268 42.1285C188.751 42.1285 185.709 41.9566 183.177 41.6661V3.518C186.718 2.97101 190.298 2.7014 193.881 2.71164C208.382 2.71164 215.06 9.84439 215.06 21.4714C215.06 34.8831 207.172 42.1285 192.268 42.1285ZM194.391 7.60318C192.434 7.60318 190.768 7.72176 189.386 8.00636V37.0058C190.133 37.1243 191.568 37.1777 193.585 37.1777C203.086 37.1777 208.495 31.7703 208.495 21.6434C208.495 12.6133 203.602 7.60318 194.391 7.60318ZM235.871 42.4191C227.698 42.4191 222.402 36.318 222.402 28.035C222.402 19.4022 227.811 13.2477 236.333 13.2477C244.387 13.2477 249.802 19.0583 249.802 27.5784C249.802 36.318 244.221 42.4191 235.871 42.4191ZM236.108 17.7894C231.619 17.7894 228.742 21.9873 228.742 27.8571C228.742 33.6143 231.678 37.8121 236.049 37.8121C240.42 37.8121 243.355 33.3238 243.355 27.7385C243.355 22.0466 240.479 17.7894 236.108 17.7894ZM296.406 13.8228L287.658 41.7846H281.958L278.335 29.6418C277.434 26.6715 276.684 23.6577 276.087 20.6117H275.968C275.512 23.6593 274.646 26.7128 273.727 29.6418L269.872 41.7846H264.113L255.881 13.8228H262.268L265.435 27.116C266.183 30.2821 266.811 33.2704 267.333 36.0927H267.452C267.909 33.7388 268.656 30.798 269.753 27.1753L273.727 13.8288H278.791L282.593 26.8907C283.512 30.0568 284.259 33.1637 284.841 36.0986H285.007C285.41 33.223 286.045 30.1695 286.905 26.8907L290.303 13.8288L296.406 13.8228ZM328.609 41.7846H322.394V25.7285C322.394 20.7836 320.496 18.3053 316.754 18.3053C313.071 18.3053 310.538 21.4714 310.538 25.1534V41.7846H304.323V21.8153C304.323 19.3429 304.264 16.6925 304.092 13.8169H309.56L309.85 18.1333H310.022C311.695 15.145 315.087 13.2477 318.889 13.2477C324.76 13.2477 328.615 17.7361 328.615 25.0408L328.609 41.7846ZM345.749 41.7846H339.528V0.992188H345.749V41.7846ZM368.41 42.4191C360.244 42.4191 354.942 36.318 354.942 28.035C354.942 19.4022 360.35 13.2477 368.867 13.2477C376.927 13.2477 382.336 19.0583 382.336 27.5784C382.342 36.318 376.755 42.4191 368.41 42.4191ZM368.642 17.7894C364.152 17.7894 361.276 21.9873 361.276 27.8571C361.276 33.6143 364.217 37.8121 368.576 37.8121C372.953 37.8121 375.883 33.3238 375.883 27.7385C375.889 22.0466 373.018 17.7894 368.642 17.7894ZM406.841 41.7846L406.391 38.5651H406.224C404.327 41.1562 401.557 42.4191 398.046 42.4191C393.035 42.4191 389.476 38.909 389.476 34.1894C389.476 27.2879 395.46 23.7186 405.821 23.7186V23.2027C405.821 19.5207 403.87 17.6768 400.015 17.6768C397.257 17.6768 394.838 18.3705 392.708 19.752L391.445 15.6668C394.031 14.0541 397.257 13.2477 401.047 13.2477C408.354 13.2477 412.042 17.1017 412.042 24.8155V35.1144C412.042 37.9366 412.167 40.1245 412.446 41.7906L406.841 41.7846ZM405.987 27.8571C399.084 27.8571 395.62 29.5291 395.62 33.4957C395.62 36.4306 397.406 37.8655 399.885 37.8655C403.046 37.8655 405.987 35.4523 405.987 32.1735V27.8571ZM442.224 41.7846L441.933 37.2963H441.761C439.976 40.6878 436.975 42.4191 432.782 42.4191C426.039 42.4191 421.045 36.4899 421.045 28.1476C421.045 19.4022 426.223 13.2418 433.292 13.2418C437.034 13.2418 439.686 14.5047 441.18 17.0424H441.305V0.992188H447.526V34.2487C447.526 36.9524 447.591 39.4841 447.757 41.7846H442.224ZM441.305 25.3313C441.305 21.4181 438.713 18.08 434.757 18.08C430.149 18.08 427.332 22.1651 427.332 27.9164C427.332 33.555 430.256 37.4149 434.633 37.4149C438.541 37.4149 441.305 34.0175 441.305 29.9916V25.3313ZM486.971 42.4191C478.804 42.4191 473.508 36.318 473.508 28.035C473.508 19.4022 478.917 13.2477 487.434 13.2477C495.493 13.2477 500.902 19.0583 500.902 27.5784C500.908 36.318 495.327 42.4191 486.971 42.4191ZM487.202 17.7894C482.719 17.7894 479.842 21.9873 479.842 27.8571C479.842 33.6143 482.778 37.8121 487.143 37.8121C491.52 37.8121 494.45 33.3238 494.45 27.7385C494.462 22.0466 491.585 17.7894 487.202 17.7894ZM534.328 41.7846H528.106V25.7285C528.106 20.7836 526.209 18.3053 522.466 18.3053C518.783 18.3053 516.257 21.4714 516.257 25.1534V41.7846H510.036V21.8153C510.036 19.3429 509.976 16.6925 509.804 13.8169H515.272L515.563 18.1333H515.735C517.401 15.145 520.8 13.2418 524.595 13.2418C530.467 13.2418 534.328 17.7301 534.328 25.0348V41.7846ZM576.145 18.4831H569.307V32.0609C569.307 35.5176 570.505 37.2429 572.925 37.2429C574.022 37.2429 574.941 37.1243 575.683 36.9524L575.855 41.672C574.651 42.1345 573.037 42.3657 571.033 42.3657C566.134 42.3657 563.204 39.662 563.204 32.5826V18.4831H559.124V13.8228H563.204V8.70007L569.307 6.8561V13.8169H576.145V18.4831ZM609.049 41.7846H602.839V25.8471C602.839 20.8429 600.947 18.3112 597.199 18.3112C593.979 18.3112 590.978 20.499 590.978 24.9281V41.7846H584.768V0.992188H590.978V17.7894H591.102C593.06 14.7419 595.894 13.2418 599.512 13.2418C605.431 13.2418 609.049 17.8428 609.049 25.1534V41.7846ZM642.759 29.2979H624.107C624.225 34.5926 627.73 37.5809 632.92 37.5809C635.678 37.5809 638.216 37.1184 640.458 36.2587L641.424 40.5751C638.779 41.7254 635.666 42.3005 632.042 42.3005C623.294 42.3005 618.117 36.7745 618.117 28.2069C618.117 19.6334 623.419 13.1884 631.342 13.1884C638.489 13.1884 642.972 18.4831 642.972 26.4815C643.013 27.4255 642.941 28.3708 642.759 29.2979ZM637.059 24.8688C637.059 20.5524 634.883 17.5048 630.909 17.5048C627.339 17.5048 624.516 20.6117 624.113 24.8688H637.059Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_71_390">
                                            <rect width="649" height="171" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                </a>
                                <a href="#"><svg width="130" height="31" viewBox="0 0 661 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M544.237 130.515H554.46V65.4407H544.237V130.515ZM636.317 88.8838L624.599 117.095H624.248L612.086 88.8838H601.074L619.318 128.313L608.914 150.248H619.575L647.686 88.8857L636.317 88.8838ZM578.338 123.124C574.996 123.124 570.323 121.531 570.323 117.597C570.323 112.575 576.142 110.649 581.16 110.649C585.653 110.649 587.773 111.569 590.501 112.825C589.707 118.854 584.244 123.124 578.338 123.124ZM579.577 87.4604C572.175 87.4604 564.51 90.559 561.338 97.4236L570.411 101.022C572.35 97.4236 575.961 96.2526 579.752 96.2526C585.039 96.2526 590.413 99.2637 590.501 104.623V105.292C588.649 104.288 584.683 102.781 579.84 102.781C570.055 102.781 560.1 107.886 560.1 117.43C560.1 126.137 568.121 131.747 577.106 131.747C583.976 131.747 587.773 128.816 590.145 125.383H590.501V130.409H600.373V105.459C600.373 93.9057 591.29 87.4604 579.577 87.4604ZM516.396 96.8052H501.855V74.5009H516.396C524.038 74.5009 528.377 80.5114 528.377 85.6529C528.377 90.6956 524.038 96.8052 516.396 96.8052ZM516.133 65.4422H491.637V130.517H501.856V105.864H516.133C527.463 105.864 538.601 98.0724 538.601 85.6552C538.601 73.2403 527.463 65.4422 516.133 65.4422ZM382.559 123.134C375.496 123.134 369.586 117.514 369.586 109.803C369.586 102.001 375.496 96.3016 382.559 96.3016C389.532 96.3016 395.004 102.001 395.004 109.803C395.004 117.514 389.532 123.134 382.559 123.134ZM394.297 92.5265H393.944C391.65 89.9276 387.235 87.5795 381.677 87.5795C370.024 87.5795 359.345 97.3084 359.345 109.803C359.345 122.212 370.024 131.855 381.677 131.855C387.235 131.855 391.65 129.506 393.944 126.825H394.297V130.009C394.297 138.482 389.532 143.007 381.853 143.007C375.588 143.007 371.705 138.731 370.114 135.126L361.201 138.648C363.759 144.515 370.553 151.73 381.853 151.73C393.859 151.73 404.009 145.02 404.009 128.666V88.9206H394.298L394.297 92.5265ZM411.072 130.513H421.306V65.4387H411.072V130.513ZM436.4 109.046C436.136 100.492 443.376 96.133 448.581 96.133C452.643 96.133 456.082 98.0625 457.234 100.828L436.4 109.046ZM468.174 101.666C466.233 96.7209 460.32 87.5795 448.228 87.5795C436.222 87.5795 426.249 96.5519 426.249 109.717C426.249 122.128 436.136 131.855 449.373 131.855C460.052 131.855 466.233 125.652 468.794 122.045L460.85 117.013C458.201 120.703 454.584 123.135 449.373 123.135C444.168 123.135 440.46 120.87 438.08 116.426L469.233 104.183L468.174 101.666ZM219.949 94.3723V103.764H243.603C242.896 109.047 241.043 112.903 238.218 115.587C234.775 118.857 229.391 122.464 219.948 122.464C205.385 122.464 194 111.311 194 97.4751C194 83.6388 205.385 72.4849 219.948 72.4849C227.804 72.4849 233.54 75.4206 237.777 79.1942L244.752 72.5681C238.836 67.2021 230.982 63.0932 219.948 63.0932C199.998 63.0932 183.229 78.5231 183.229 97.4751C183.229 116.425 199.998 131.855 219.948 131.855C230.715 131.855 238.837 128.501 245.19 122.212C251.722 116.006 253.753 107.286 253.753 100.241C253.753 98.0629 253.575 96.0502 253.222 94.3723H219.949ZM280.648 123.134C273.585 123.134 267.495 117.6 267.495 109.717C267.495 101.751 273.585 96.302 280.648 96.302C287.708 96.302 293.798 101.751 293.798 109.717C293.798 117.6 287.708 123.134 280.648 123.134ZM280.648 87.5795C267.758 87.5795 257.256 96.8872 257.256 109.717C257.256 122.464 267.758 131.855 280.648 131.855C293.533 131.855 304.037 122.464 304.037 109.717C304.037 96.8872 293.533 87.5795 280.648 87.5795ZM331.67 123.134C324.613 123.134 318.52 117.6 318.52 109.717C318.52 101.751 324.613 96.302 331.67 96.302C338.733 96.302 344.821 101.751 344.821 109.717C344.821 117.6 338.733 123.134 331.67 123.134ZM331.67 87.5795C318.785 87.5795 308.284 96.8872 308.284 109.717C308.284 122.464 318.785 131.855 331.67 131.855C344.56 131.855 355.062 122.464 355.062 109.717C355.062 96.8872 344.56 87.5795 331.67 87.5795Z" fill="white" />
                                    <path d="M71.8669 75.4659L13.5427 134.283C13.5449 134.295 13.5493 134.305 13.5514 134.317C15.3401 140.704 21.4802 145.407 28.7672 145.407C31.6802 145.407 34.4152 144.659 36.7606 143.345L36.9469 143.241L102.602 107.247L71.8669 75.4659Z" fill="#EB3131" />
                                    <path d="M130.878 65.4524L130.822 65.4161L102.476 49.8043L70.542 76.8023L102.587 107.244L130.783 91.7875C135.726 89.2521 139.082 84.3009 139.082 78.5914C139.082 72.9229 135.772 67.9962 130.878 65.4524Z" fill="#F6B60B" />
                                    <path d="M13.5349 22.6497C13.1843 23.8782 13 25.1649 13 26.501V130.435C13 131.769 13.1821 133.06 13.5371 134.284L73.8747 76.9705L13.5349 22.6497Z" fill="#5778C5" />
                                    <path d="M72.2987 78.4681L102.489 49.7934L36.9085 13.6687C34.5247 12.3123 31.7426 11.5294 28.7655 11.5294C21.4785 11.5294 15.3301 16.2407 13.541 22.6349C13.5388 22.6412 13.5388 22.6455 13.5388 22.6509L72.2987 78.4681Z" fill="#3BAD49" />
                                    <path d="M218.031 25.2732H202.048V29.0307H214.025C213.699 32.0971 212.415 34.5044 210.249 36.253C208.084 38.0019 205.318 38.88 202.048 38.88C198.462 38.88 195.423 37.6927 192.932 35.3343C190.492 32.927 189.251 29.95 189.251 26.3635C189.251 22.7772 190.492 19.8002 192.932 17.3931C195.423 15.0346 198.462 13.8552 202.048 13.8552C203.889 13.8552 205.644 14.156 207.253 14.815C208.863 15.4734 210.155 16.3926 211.165 17.5721L214.204 14.6849C212.826 13.1962 211.08 12.0578 208.913 11.2282C206.748 10.3985 204.488 10.0003 202.048 10.0003C197.263 10.0003 193.206 11.5779 189.893 14.7256C186.58 17.8809 184.919 21.7687 184.919 26.3636C184.919 30.9585 186.58 34.8546 189.893 38.0024C193.205 41.1494 197.263 42.7277 202.048 42.7277C207.073 42.7277 211.079 41.1984 214.161 38.0914C216.875 35.5055 218.261 32.0083 218.261 27.6328C218.261 26.8926 218.168 26.1029 218.031 25.2732ZM224.222 10.699V42.0277H243.474V38.1806H228.459V28.2424H242.002V24.4848H228.459V14.5544H243.474V10.6989L224.222 10.699ZM270.47 14.5545V10.699H247.81V14.5545H257.022V42.0276H261.259V14.5545H270.47ZM290.984 10.699H286.747V42.0277H290.984V10.699ZM318.953 14.5545V10.699H296.294V14.5545H305.504V42.0276H309.742V14.5545H318.953ZM361.712 14.7741C358.442 11.5777 354.436 10 349.65 10C344.857 10 340.851 11.5777 337.58 14.7253C334.31 17.8323 332.701 21.7278 332.701 26.3633C332.701 30.9988 334.31 34.895 337.58 38.0021C340.851 41.1491 344.857 42.7274 349.65 42.7274C354.393 42.7274 358.442 41.1492 361.712 38.0021C364.982 34.8952 366.591 30.9992 366.591 26.3633C366.591 21.7684 364.982 17.8805 361.712 14.7741ZM340.619 17.3928C343.059 15.0344 346.055 13.8549 349.65 13.8549C353.237 13.8549 356.233 15.0344 358.63 17.3928C361.07 19.7106 362.268 22.7357 362.268 26.3632C362.268 29.999 361.07 33.0159 358.63 35.3341C356.233 37.6925 353.237 38.8798 349.65 38.8798C346.055 38.8798 343.059 37.6925 340.619 35.3341C338.231 32.9673 337.033 29.999 337.033 26.3632C337.033 22.7358 338.231 19.7594 340.619 17.3928ZM376.658 22.5167L376.479 16.4734H376.658L393.42 42.0274H397.845V10.6987H393.608V29.0304L393.787 35.0737H393.608L377.583 10.6987H372.421V42.0274H376.658V22.5167Z" fill="white" stroke="white" strokeWidth="0.26666" strokeMiterlimit="10" />
                                </svg>
                                </a>

                            </div>

                        </div>



                    </div>

                </div>

            </section>
            <FrequentlyAskedQuestions heading="Frequently Asked Questions On Sell" pageType={cmspage.data !== undefined && cmspage.data.cms_page != undefined && cmspage.data.cms_page.slug} />

            <ReviewComponent type={cmspage.data !== undefined && cmspage.data.cms_page.slug} />

            <div className={`common-popup book-visit with-scroll`} style={{ display: Popup === false ? "none" : "block" }}>
                {/* <BookAVisitComponent /> */}
                <form method="POST" onSubmit={submitBuyBookVisit} id="visit-center-for-book">
                    <input type="hidden" name="visitType" value="Visit for Sell" />

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
                                <small id="visitCenter" className="error"></small>

                            </div>

                            <div className='style-box'>

                                <h4>Personal Details</h4>

                                <div className="from-row">

                                    <div className='form-div'>

                                        <label>First Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_first_name" onChange={handleCenterBookVisitFirstName} id="visiter-name" defaultValue={user !== undefined && user !== '' ? user.first_name : firstNameInput} />
                                        <small id="visitFirstName" className="error"></small>

                                    </div>
                                    <div className='form-div'>

                                        <label>Last Name*</label>

                                        <input type="text" placeholder='Enter Name' name="visitor_last_name" onChange={handleCenterBookVisitLastName} defaultValue={user !== undefined && user !== '' ? user.last_name : lastNameInput} id="visiter-name" />
                                        <small id="visitLastName" className="error"></small>

                                    </div>

                                    <div className='form-div'>

                                        <label>Mobile Number*</label>

                                        <input type="text" placeholder='Enter Phone Number' name="visiter_contact" minLength={10} maxLength={10} id="visiter-contact" onChange={handleCenterBookVisitContact} defaultValue={user !== undefined && user !== '' ? user.mobile : contactInput} />
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
                                                    <input type="radio" name="selectedDate" value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} onChange={(e) => manageDateTestDrive(`${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))}
                                                        disabled={date.day === currentDate && todayTime >= '18' ? true : false} />
                                                    <label htmlFor={`selected_${i}`} className={`option ${date.day === currentDate && todayTime >= '18' ? 'disable-time' : ''}`} >
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

                            <div className='style-box time-slot no-border add-time-date'>

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

                            </div>

                        </div>
                        <div className='submit-div'>
                            <button>Book Visit</button>
                        </div>

                    </div>
                </form>

            </div>
            {visitSuccess ? <SmallSuccessPopUp HidePopup={HidePopup} successMessage={successMessage} errorMessage={callErrorMessage} /> : ""}
            <NotificationContainer />
            <LoginForm Login={Login} logInHeading="Log in to book FREE evaluation" closePop={closePop} redirectRoute={``} submitDataAfterSubmitLogIn={saveDataAfterLogin} loginId={`user-sell-car`} />
        </>
    )
}