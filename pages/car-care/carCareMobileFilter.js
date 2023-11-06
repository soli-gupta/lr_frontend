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

export default function carCareMobileFilter() {

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


    const [brand, setBrand] = useState([])
    const [brandName, setBrandName] = useState()


    const [model, setModel] = useState('')
    const [modelName, setModelName] = useState('')

    const [colorInput, setColorInput] = useState(false)
    const [colorValue, setColorValue] = useState('')

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}all-color-list`, fetcher);
    const [colorName, setColorName] = useState('')

    const Color = useSWR(`${process.env.NEXT_PUBLIC_URL}all-color-list`, fetcher);
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

    const selectBrand = async (brand_name, brand_slug) => {
        SetStep1(false)
        SetStep2(false)
        SetStep3(false)
        setModelName('')
        setColorName('')
        setColorValue('')
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

    const selectModel = async (model_slug, model_name) => {
        setModelName(model_name)
        await axios.get(`${process.env.NEXT_PUBLIC_URL}fetch-variantsby-model-buy-page/${model_slug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            if (res.data.status === 1) {
                SetStep2(true)
                setTimeout(() => {
                    scrollTo(screenwidth - 60)
                }, 500)
            }
        }).catch(function (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.status === 0) {
                console.log(error)

            }
        })

    }

    const openColorInputDiv = () => {
        var reason = document.querySelector('input[name = color]:checked').value;
        if (reason == "others") {
            setColorName('')
            setColorInput(true)
            SetStep3(false)

        } else {
            setColorInput(false)
        }
    }

    const onInputValue = (e) => {
        console.log("data", colorValue)


    }

    const getColorInputValue = (e) => {
        setColorName('')
        var radio = document.querySelector('input[type=radio][name=color]:checked');
        if (radio && radio.checked === true) {
            radio.checked = false;
        }
        if (e.target.value === '') {
            SetStep3(false)
            setColorValue('')
        } else {
            SetStep3(true)
            setColorValue(e.target.value)
        }

        // SetStep3(true)
    }

    const selectColor = (color_name) => {
        setColorName(color_name)
        SetStep3(true)
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500)
    }

    const saveDataAfterLogin = async () => {
        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setLogin(false)
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-user-car-care`, formDatas, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        router.push(`/car-care/final-details-address?id=${res.data.insertId}`);
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
            await axios.post(`${process.env.NEXT_PUBLIC_URL}user/save-user-car-care`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
                }
            })
                .then(function (res) {
                    if (res.data.status == 1) {
                        setTinyLoader(false);
                        console.log(res.data)
                        router.push(`/car-care/final-details-address?id=${res.data.insertId}`)
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
        if (typeof window !== "undefined") {
            document.body.className = "mobile-menu-show nofooter";
        }
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
                        {modelName ? <li>Model<span>{modelName}</span></li> : ''}
                        {colorName || colorValue ? <li>Color<span>{colorName ? colorName : colorValue}</span></li> : ''}
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
                                    <div className='step-number'>1/3</div>
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
                                        <h3>Select Model</h3>
                                        <div className='step-number'>2/3</div>

                                        <div className="years-box brands">
                                            {model && model.length > 0 ? model.map((models, i) => {
                                                return (
                                                    <div className="form-group" key={i}>
                                                        <input onClick={() => selectModel(models.slug, models.name)} type="radio" name="model_name" id={`model_${models.slug}_${i}`} required="" defaultValue={models.name} />
                                                        <label htmlFor={`model_${models.slug}_${i}`}>{models.name}</label>
                                                    </div>
                                                )
                                            }) : 'Model not available'}

                                        </div>

                                    </div>

                                </div>
                                : ""
                            }

                            {Step2 ?
                                <div className='mobFilter_cards color-filter'>
                                    <div className="formbx-white car-data year-filter">
                                        <h3>Select Color</h3>
                                        <div className='step-number'>3/3</div>
                                        <div className="years-box brands">
                                            {Color && Color.data !== undefined && Color.data.data.map((color, i) => {
                                                return (
                                                    <div className="form-group" key={color._id}>
                                                        <input type="radio" id={`color_${color.color_code}`} name="color" onChange={() => selectColor(`${color.name}`)} defaultValue={colorName ? colorName : ''} onClick={openColorInputDiv} required />
                                                        <label for={`color_${color.color_code}`}>
                                                            <div className='wraped-div'>
                                                                <div className="color-dot" style={{ background: `${color.color_code}` }}></div>
                                                                <span>{color.name}</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                            <div className="form-group">
                                                <input type="radio" name="color" id="others" onClick={openColorInputDiv} defaultValue="others" />
                                                <label for="others">
                                                    <div className='wraped-div'>
                                                        <div className="color-dot" style={{ backgroundImage: 'url(../img/others.png)', backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                                                        <span>Others</span>
                                                    </div>
                                                </label>
                                            </div>



                                        </div>

                                        {colorInput ?
                                            <div id="colorinput">
                                                <div className='filter-txtbx form-input'>
                                                    <input type='text' placeholder='Enter color name' id="color_id" onChange={(e) => getColorInputValue(e)} maxLength={15} />
                                                </div>
                                            </div>
                                            : ''}
                                    </div>

                                    {Step3 ?

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
