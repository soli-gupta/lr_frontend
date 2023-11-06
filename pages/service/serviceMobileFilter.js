import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import WebHead from '@/components/common/WebHead'
import 'swiper/css';
import "swiper/css/pagination";
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import { $ } from 'react-jquery-plugin';
import { ButtonSpinner } from '@/components/Helper';
import LoginForm from '@/components/LoginForm';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';
import { useRouter } from 'next/router';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function serviceMobileFilter() {

    const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();
    const router = useRouter()
    const [tinyLoader, setTinyLoader] = useState(false)
    const [Login, setLogin] = useState(false);
    const [formDatas, setFormDatas] = useState('')
    const [Popup, setPopUp] = useState(false);
    const [visitSuccess, setVisitSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('')

    const [Step1, SetStep1] = useState(false)
    const [Step2, SetStep2] = useState(false)
    const [Step3, SetStep3] = useState(false)
    const [Step4, SetStep4] = useState(false)
    const [Step5, SetStep5] = useState(false)

    const [brand, setBrand] = useState([])
    const [brandName, setBrandName] = useState()

    const [year, setYear] = useState()
    const [yearName, setYearName] = useState('')

    const [model, setModel] = useState('')
    const [modelName, setModelName] = useState('')

    const [variant, setVariant] = useState('')
    const [variantName, setVariantName] = useState()

    const Fuel = useSWR(`${process.env.NEXT_PUBLIC_URL}get-all-fuels`, fetcher);
    const [fuelName, setFuelName] = useState('')

    if (typeof window !== "undefined") {
        var screenwidth = screen.width;
    }

    const closePop = () => {
        setTinyLoader(false)
        setLogin(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
    }

    const HidePopup = () => {
        setPopUp(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll-poup');
        }
        setVisitSuccess(false);
    }

    const brandList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}brands-list`)
            .then(function (res) {
                if (res.data.status == 1) {
                    setBrand(res.data.brands)
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

    const allYear = async () => {
        const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
        const yearData = await years.json()
        setYear(yearData.year)
    }

    const selectBrand = async (brand_name, brand_slug) => {
        SetStep1(false)
        SetStep2(false)
        SetStep3(false)
        SetStep4(false)
        SetStep5(false)
        setYearName('')
        setModel('')
        setModelName('')
        setVariantName('')
        setFuelName('')
        setBrandName(brand_name)
        await axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-models-by-brand-buy-page/${brand_slug}`)
            .then(function (res) {
                if (res.data.status === 1) {
                    setModel(res.data.brand_models)
                    SetStep1(true)
                    setTimeout(() => {
                        scrollTo(screenwidth - 60)
                    }, 500)
                } else if (res.data.status === 0) {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.status === 0) {
                    console.log(error)

                }
            })
    }
    const selectYear = (years) => {
        setYearName(years)
        SetStep2(true)
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500)
    }

    const selectModel = async (model_name, model_slug) => {
        SetStep1(true)
        SetStep2(true)
        SetStep3(false)
        SetStep4(false)
        SetStep5(false)
        setVariantName('')
        setFuelName('')
        setModelName(model_name)
        await axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-variantsby-model-buy-page/${model_slug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            setVariant(res.data.model_variants)
            SetStep3(true)
            setTimeout(() => {
                scrollTo(screenwidth - 60)
            }, 500)
        }).catch(function (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.status === 0) {
                console.log(error)

            }
        })
    }
    const selectVariant = async (variant_name) => {
        setVariantName(variant_name)
        SetStep4(true)
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500)
    }

    const selectFuel = (fuel) => {
        setFuelName(fuel)
        SetStep5(true)
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500)
    }

    const saveDataAfterLogin = async () => {
        console.log("LoginData", formDatas)
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-user-service`, formDatas, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        console.log(res.data.insertId)
                        router.push(`/service/${res.data.insertId}`);
                        // setOpenSuccessPopup(true);
                        // setCallSuccessMessage(res.data.message);
                        //router.push('/')
                    }
                })
                .catch(function (e) {
                    setTinyLoader(false)
                    if (e && e.message) {
                        setCallErrorMessage(e.message)
                    } else if (e && e.response.data.status === 0) {
                        setCallErrorMessage(e.response.data.message);
                    } else if (e && e.response.data.status === 2) {
                        setCallErrorMessage(e.response.data.message);
                    }
                });
        }
    }

    const submitData = async (e) => {
        let formData = new FormData(document.getElementById('serviceFormMobile'))
        setTinyLoader(true);
        setFormDatas(formDatas)
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-user-service`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        console.log(res.data)

                        router.push(`/service/${res.data.insertId}`);
                    }
                })
                .catch(function (e) {
                    setTinyLoader(false)
                    if (e && e.message) {
                        setCallErrorMessage(e.message)
                    } else if (e && e.response.data.status === 0) {
                        setCallErrorMessage(e.response.data.message);
                    } else if (e && e.response.data.status === 2) {
                        setCallErrorMessage(e.response.data.message);
                    }
                });
        } else {
            setLogin(true)
        }
    }
    useEffect(() => {
        brandList()
        allYear()
        if (typeof window !== "undefined") {
            document.body.className = "mobile-menu-show nofooter";
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
    }, [])
    return (
        <>
            <WebHead pageTitle="Sell" />
            {/* <WebsiteLayout> */}

            <section className="filter-input-detail vehicle-list-detail com-pad">
                <div className="wrapper">
                    <ul>
                        {brandName ? <li>Brand<span>{brandName}</span></li> : ''}
                        {yearName ? <li>Year<span>{yearName}</span></li> : ''}
                        {modelName ? <li>Model<span>{modelName}</span></li> : ''}
                        {variantName ? <li>Variant<span>{variantName}</span></li> : ''}
                        {fuelName ? <li>Fuel<span>{fuelName}</span></li> : ''}
                    </ul>
                </div>
            </section>

            <section className="filterSlider com-pad">
                <div className="wrapper">
                    <form id="serviceFormMobile">
                        <div className="mobile-custom-filter" ref={scrollContainerRef} onScroll={handleScroll}>

                            <div className='mobFilter_cards logos'>
                                <div className="formbx-white brand-filter ">
                                    <h3>Select Brand</h3>
                                    <div className='step-number'>1/5</div>
                                    <div className="car-data">
                                        <div className="brands no-after-radio">
                                            {brand != undefined && brand.map((brands, i) => {
                                                return (
                                                    <div className="form-group" key={i}>
                                                        <input onClick={() => selectBrand(brands.name, brands.slug)} type="radio" id={`brand_${brands.slug}`} name="brand_name" defaultValue={brands.slug} />
                                                        <label htmlFor={`brand_${brands.slug}`}>
                                                            <img src={`${process.env.NEXT_PUBLIC_URL}${brands.image}`} />
                                                            <span>{brands.name}</span>
                                                        </label>
                                                    </div>
                                                )
                                            })

                                            }
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {Step1 ?

                                <div className='mobFilter_cards'>
                                    <div className="formbx-white car-data year-filter">
                                        <h3>Select Year</h3>
                                        <div className='step-number'>2/5</div>

                                        <div className="years-box brands">
                                            {year && year.map((years, i) => {
                                                return (
                                                    <div className="form-group" key={i}>
                                                        <input onClick={() => selectYear(years)} type="radio" name="year" id={years} required="" defaultValue="2023" />
                                                        <label htmlFor={years}>{years}</label>
                                                    </div>
                                                )
                                            })}

                                        </div>

                                    </div>

                                </div>
                                : ""
                            }

                            {Step2 ?
                                <div className='mobFilter_cards'>
                                    <div className="formbx-white car-data year-filter">
                                        <h3>Select Model</h3>
                                        <div className='step-number'>3/5</div>

                                        <div className="years-box brands">
                                            {model && model.length > 0 ? model.map((models, i) => {
                                                return (
                                                    <div className="form-group" key={i}>
                                                        <input onClick={() => selectModel(models.name, models.slug)} type="radio" name="model_name" id={`model_${models.slug}_${i}`} required="" defaultValue={models.name} />
                                                        <label htmlFor={`model_${models.slug}_${i}`}>{models.name}</label>
                                                    </div>
                                                )
                                            }) : 'Model not available'}

                                        </div>

                                    </div>

                                </div>

                                : ""
                            }

                            {Step3 ?
                                <div className='mobFilter_cards car-data four-bxgrid'>
                                    <div className="formbx-white year-filter">
                                        <h3>Select Variant</h3>
                                        <div className='step-number'>4/5</div>
                                        <div className="years-box brands varient-box">
                                            {variant && variant.length > 0 ? variant.map((variants, i) => {
                                                return (
                                                    <div className="form-group" key={i}>
                                                        <input type="radio" name="variant_name" id={`variant_${variants.slug}_${i}`} onClick={() => selectVariant(variants.name)} defaultValue={variants.name} required="" />
                                                        <label htmlFor={`variant_${variants.slug}_${i}`}>{variants.name}</label>
                                                    </div>
                                                )
                                            }) : 'Variant not available'}

                                        </div>
                                    </div>

                                </div>
                                : ""
                            }

                            {Step4 ?

                                <div className='mobFilter_cards logos'>
                                    <div className="formbx-white car-data year-filter">
                                        <h3>Select Fuel</h3>
                                        <div className='step-number'>5/5</div>
                                        <div className="brands no-after-radio">
                                            {Fuel && Fuel.data !== undefined && Fuel.data.fuels.map((fuels, i) => {
                                                return (
                                                    <div className="form-group" key={fuels._id}>
                                                        <input type="radio" id={`fuel_${fuels.fuel_slug}`} defaultValue={fuelName ? fuelName : ''} name="fuel_type" onChange={() => selectFuel(fuels.fuel_name)} required />
                                                        <label htmlFor={`fuel_${fuels.fuel_slug}`}>

                                                            <img src={`${process.env.NEXT_PUBLIC_URL}${fuels.fuel_image}`} />
                                                            <span>{fuels.fuel_name}</span>

                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {Step5 ?

                                        <div className="formbx-white km-drive-filter">
                                            <input type="hidden" defaultValue={1} name="step_form" />
                                            <button type='button' className="btn arrow-style blue-btn" onClick={() => submitData()}>
                                                <ButtonSpinner load={tinyLoader} btnName="Submit" />
                                            </button>
                                        </div>
                                        : ""
                                    }

                                </div>
                                : ""
                            }
                        </div>
                    </form>
                </div>

            </section >
            {visitSuccess ? <SmallSuccessPopUp HidePopup={HidePopup} successMessage={successMessage} errorMessage={callErrorMessage} /> : ""}
            <LoginForm Login={Login} logInHeading="Log in" closePop={closePop} submitDataAfterSubmitLogIn={saveDataAfterLogin} redirectRoute={``} />
            {/* </WebsiteLayout> */}
        </>
    )
}
