import React, { useEffect, useState, useRef } from 'react';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";

import WebHead from '@/components/common/WebHead'
import 'swiper/css';
import "swiper/css/pagination";
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ButtonSpinner, numberFormatter } from '@/components/Helper';
import LoginForm from '@/components/LoginForm';
import SmallSuccessPopUp from '@/components/smallSuccessPopUp';

function MobileFilter({ cmsPage }) {


    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();


    const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();
    const [test, setTest] = useState('s')

    const [Step1, SetStep1] = useState(false)
    const [Step2, SetStep2] = useState(false)
    const [Step3, SetStep3] = useState(false)
    const [Step4, SetStep4] = useState(false)
    const [Step5, SetStep5] = useState(false)


    const [fetchYear, setFetchYear] = useState([]);

    const [selectedYear, setSelectedYear] = useState('');
    const [brandName, setBrandName] = useState('');
    const [modelName, setModelName] = useState('');
    const [variantName, setVariantName] = useState('');
    const [selectFuelName, setSelectFuelName] = useState('');
    const [enterKMs, setEnterKMs] = useState('');
    const [kmsInput, setKmsInput] = useState('');

    const [brandSlug, setBrandSlug] = useState('');
    const [modelSlug, setModelSlug] = useState('');
    const [variantSlug, setVariantSlug] = useState('');
    const [fuelSlug, setFuelSlug] = useState('');
    const [fetchVariants, setFetchVariants] = useState([]);

    const [disabled, setDisabled] = useState(true);
    const [tinyLoader, setTinyLoader] = useState(false);
    const [checkLoginStatus, setCheckLoginStatus] = useState(false);


    const [servicePackageSuccess, setServicePackageSuccess] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');


    const [fetchBrands, setFetchBrands] = useState([]);
    const [brandModlesList, setBrandModelsList] = useState([]);
    const [fetchFuelType, setFetchFuelType] = useState([]);
    const [getOrderId, setGetOrderId] = useState('');

    const fetchAllBrands = async () => {
        const getBrands = await axios.get(`${Url}get-brands-sorting`).then((res) => {
            setFetchBrands(res.data.brands);
        }).catch((e) => {
            setFetchBrands([]);
        });
    }

    const fetchModelsByBrand = async (brandSlug, brand_name) => {
        setBrandName(brand_name);
        setBrandSlug(brandSlug);
        setFetchVariants([]);
        setModelName('');
        setVariantName('');
        const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            setBrandModelsList([]);
        })

        if (fetchModels.data.brand_models.length > 0) {
            setBrandModelsList(fetchModels);
            SetStep2(true);
            setTimeout(() => {
                scrollTo(screenwidth - 60)
            }, 500);
        } else {
            setBrandModelsList([]);
        }
    }

    const fetchVariantsByBrandAndModel = async (modelSlug, model_name) => {
        setModelName(model_name);
        setModelSlug(modelSlug);
        setFetchVariants([]);
        setVariantName('');
        const fetchvariantsByModel = await axios.get(`${Url}fetch-variantsby-model-buy-page/${modelSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            setFetchVariants([]);
        });

        if (fetchvariantsByModel.data.model_variants.length > 0) {
            setFetchVariants(fetchvariantsByModel);

            SetStep3(true);
            setTimeout(() => {
                scrollTo(screenwidth - 60)
            }, 500);
        } else {
            setFetchVariants([]);
        }
    }

    const manageSelectVariantOnChange = (variantSlug, variant_name) => {
        setVariantName(variant_name);
        setVariantSlug(variantSlug);

        SetStep4(true);
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500);
    }

    const manageSelectFuelType = (e, fuelName) => {
        setSelectFuelName(fuelName);
        setFuelSlug(e);

        SetStep5(true);
        setTimeout(() => {
            scrollTo(screenwidth - 60);
        }, 500);
    }

    const fetchAllFuelType = async () => {
        const getAllFuelType = await axios.get(`${Url}get-all-fuels`).then((res) => {
            setFetchFuelType(res.data.fuels);
        }).catch((e) => {
            setFetchFuelType([]);
        });
    }

    const manageKmsHandlerOnChange = (e) => {
        const regex = /^[0-9\b]+$/;

        if (e !== " " && regex.test(e)) {
            setEnterKMs(e);
            setKmsInput(e);
            setDisabled(false);
            var disableBtn = document.getElementById('submitServicePackage');
            disableBtn.classList.remove("disableBtn");
        } else {
            setKmsInput('');
            setEnterKMs('');
        }
    }

    if (typeof window !== "undefined") {
        var screenwidth = screen.width;
    }
    // console.log(screenwidth)

    const swiperfilterslider = {
        modules: [Pagination],
        spaceBetween: 20,
        allowTouchMove: true
    }

    useEffect(() => {
        if (typeof window !== "undefined") {

            document.body.className = "mobile-menu-show nofooter";
        }

        return () => {
            if (typeof window !== "undefined") {
                document.body.className = "";
            }
        }
    }, [])


    const selectYear = () => {
        SetStep1(true);
        setTimeout(() => {
            scrollTo(screenwidth - 60)
        }, 500);
    }


    const checkAllSelectedValues = (e) => {
        // let getFormValues = document.getElementById('service-package-form');
        // let error = 0;

        // Array.prototype.slice.call(getFormValues).forEach(function (form) {
        //     if (form.required && !form.value) {
        //         error++;
        //     }
        // })

        // if (!error) {
        //     setDisabled(false);
        //     var disableBtn = document.getElementById('submitServicePackage');
        //     disableBtn.classList.remove("disableBtn");
        // }
    }


    const selectYearOnChange = (selectedYear) => {
        setSelectedYear(selectedYear);

    }

    const getAllYears = async () => {
        const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
        const yearData = await years.json();
        setFetchYear(yearData.year)
    }


    useEffect(() => {
        getAllYears();
        fetchAllBrands();
        fetchAllFuelType();
    }, []);

    const submitServicePackageDetails = async (e) => {
        e.preventDefault();
        if (brandName === '' || modelName === '' || variantName === '' || selectFuelName === '' || enterKMs === '') {
            // selectedYear === '' ||
            setServicePackageSuccess(true);
            document.body.classList.add('hide-scroll-poup-new');
            setCallErrorMessage('Please select all values.');
            setDisabled(true);
            var disableBtn = document.getElementById('submitServicePackage');
            disableBtn.classList.add("disableBtn");
            return false;
        }



        if (typeof window !== "undefined" && localStorage.getItem('lr-user-token')) {
            setCheckLoginStatus(false);
            setTinyLoader(true);
            const getServicePackageData = {
                brand: brandName,
                model: modelName,
                variant: variantName,
                year: selectedYear,
                fuel: selectFuelName,
                kms: kmsInput,
                order_type: "service-package",
                form_step: 1,
            }


            await axios.post(`${Url}book-service-package`, getServicePackageData, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                if (res && res.data.status === 1) {
                    // setGetOrderId(res.data.orderId);
                    router.push(`/service-packages/${res.data.orderId}`);
                    document.getElementById('service-package-form').reset();
                    setTinyLoader(false);
                }
            }).catch((e) => {
                setServicePackageSuccess(true);
                document.body.classList.add('hide-scroll-poup-new');
                setTinyLoader(false);
                if (e && e.message) {
                    setCallErrorMessage(e.message);
                } else if (e && e.response.data === 0) {
                    setCallErrorMessage(e.response.data.message);
                } else if (e && e.response.data.status === 2) {
                    setCallErrorMessage(e.response.data.message);
                }
            });
        } else {
            setCheckLoginStatus(true);
        }

    }


    const submitDataAfterSubmitLogIn = async () => {
        if (typeof window !== "undefined" && localStorage.getItem('lr-user-token')) {
            setCheckLoginStatus(false);
            setTinyLoader(true);
            const getServicePackageData = {
                brand: brandName,
                model: modelName,
                variant: variantName,
                year: selectedYear,
                fuel: selectFuelName,
                kms: kmsInput,
                order_type: "service-package",
                form_step: 1,
            }


            await axios.post(`${Url}book-service-package`, getServicePackageData, {
                headers: {
                    token: localStorage.getItem('lr-user-token')
                }
            }).then((res) => {
                if (res && res.data.status === 1) {
                    setTinyLoader(false);
                    // setGetOrderId(res.data.orderId);
                    router.push(`/service-packages/${res.data.orderId}`);
                    document.getElementById('service-package-form').reset();
                }
            }).catch((e) => {
                setServicePackageSuccess(true);
                document.body.classList.add('hide-scroll-poup-new');
                setTinyLoader(false);
                if (e && e.message) {
                    setCallErrorMessage(e.message);
                } else if (e && e.response.data.status === 0) {
                    setCallErrorMessage(e.response.data.message);
                } else if (e && e.response.data.status === 2) {
                    setCallErrorMessage(e.response.data.message);
                }
            });
        }
    }

    const closePop = () => {
        setCheckLoginStatus(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
            document.body.classList.remove('hide-scroll-poup-new');
        }
        setServicePackageSuccess(false);
        setCallSuccessMessage('');
        setCallErrorMessage('');
    }

    return (
        <>
            <WebHead pageTitle={`${cmsPage.page_title}`} />
            <WebsiteLayout>

                <section className="filter-input-detail vehicle-list-detail com-pad">
                    <div className="wrapper">
                        <ul>
                            {selectedYear !== '' && selectedYear !== undefined ? <li>Year<span>{selectedYear}</span></li> : ''}
                            {brandName !== '' && brandName !== undefined ? <li>Brand<span>{brandName}</span></li> : ''}
                            {modelName !== '' && modelName !== undefined ? <li>Model<span>{modelName}</span></li> : ''}
                            {variantName !== '' && variantName !== undefined ? <li>Variant<span>{variantName}</span></li> : ''}
                            {selectFuelName !== '' && selectFuelName !== undefined ? <li>Fuel<span>{selectFuelName}</span></li> : ''}
                            {enterKMs !== '' && enterKMs !== undefined ? <li>KMs Driven<span>{numberFormatter(enterKMs)}</span></li> : ''}
                        </ul>
                    </div>
                </section>

                <section className="filterSlider com-pad">
                    <div className="wrapper">
                        {/* <Swiper {...swiperfilterslider} pagination={{ type: "fraction" }}>
                            <SwiperSlide>
                                <div className="formbx-white brand-filter">
                                    <h3>Select Brand</h3>

                                    <div className="car-data">
                                        <div className="brands no-after-radio">
                                            <div className="form-group">
                                                <input type="radio" id="brand_mini-cooper" name="brand_id" value="6405a08cb85e46234f526eff" /><label for="brand_mini-cooper"><img src="http://3.111.141.162:4000/public/brands/logo-cooper.png" /><span>Mini Cooper</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_porche" name="brand_id" value="6405a017b85e46234f526d12" checked="" /><label for="brand_porche"><img src="http://3.111.141.162:4000/public/brands/logo-porche.png" /><span>Porche</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_jaguar" name="brand_id" value="64059ff5b85e46234f526c3e" /><label for="brand_jaguar"><img src="http://3.111.141.162:4000/public/brands/logo-jaguar.png" /><span>Jaguar</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_land-rover" name="brand_id" value="64059fd1b85e46234f526b6a" /><label for="brand_land-rover"><img src="http://3.111.141.162:4000/public/brands/logo-land-rover.png" /><span>Land Rover</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_bmw" name="brand_id" value="64059f87b85e46234f526792" /><label for="brand_bmw"><img src="http://3.111.141.162:4000/public/brands/logo-bmw.png" /><span>BMW</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_lexus" name="brand_id" value="63f5f414c5713efa061fefaf" /><label for="brand_lexus"><img src="http://3.111.141.162:4000/public/brands/logo-lexus.png" /><span>Lexus</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_mercedes" name="brand_id" value="63f5f397ebccc24bbb7fe330" /><label for="brand_mercedes"><img src="http://3.111.141.162:4000/public/brands/logo-mercedez.png" /><span>Mercedes</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_volvo" name="brand_id" value="63eb3da82d344767a5560b69" /><label for="brand_volvo"><img src="http://3.111.141.162:4000/public/brands/logo-volvo.png" /><span>Volvo</span></label>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" id="brand_audi" name="brand_id" value="63eb3d3e09c9fbfc761b5784" /><label for="brand_audi"><img src="http://3.111.141.162:4000/public/brands/logo-audi.png" /><span>Audi</span></label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>

                            <SwiperSlide className="car-data four-bxgrid">
                                <div className="formbx-white year-filter">
                                    <h3>Select Year</h3>
                                    <div class="years-box brands">
                                        <div class="form-group"><input type="radio" name="year" id="2023" required="" value="2023" /><label for="2023">2023</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2022" required="" value="2022" /><label for="2022">2022</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2021" required="" value="2021" /><label for="2021">2021</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2020" required="" value="2020" /><label for="2020">2020</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2019" required="" value="2019" /><label for="2019">2019</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2018" required="" value="2018" /><label for="2018">2018</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2017" required="" value="2017" /><label for="2017">2017</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2016" required="" value="2016" /><label for="2016">2016</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2015" required="" value="2015" /><label for="2015">2015</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2014" required="" value="2014" /><label for="2014">2014</label></div>
                                    </div>

                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="car-data four-bxgrid">
                                <div className="formbx-white year-filter">
                                    <h3>Select Model</h3>

                                    <div class="years-box brands">
                                        <div class="form-group"><input type="radio" name="year" id="2023" required="" value="2023" /><label for="2023">2023</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2022" required="" value="2022" /><label for="2022">2022</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2021" required="" value="2021" /><label for="2021">2021</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2020" required="" value="2020" /><label for="2020">2020</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2019" required="" value="2019" /><label for="2019">2019</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2018" required="" value="2018" /><label for="2018">2018</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2017" required="" value="2017" /><label for="2017">2017</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2016" required="" value="2016" /><label for="2016">2016</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2015" required="" value="2015" /><label for="2015">2015</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2014" required="" value="2014" /><label for="2014">2014</label></div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className="car-data four-bxgrid">
                                <div className="formbx-white year-filter">
                                    <h3>Select Variant</h3>

                                    <div class="years-box brands varient-box">
                                        <div class="form-group"><input type="radio" name="year" id="2023" required="" value="2023" /><label for="2023">2023</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2022" required="" value="2022" /><label for="2022">2022</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2021" required="" value="2021" /><label for="2021">2021</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2020" required="" value="2020" /><label for="2020">2020</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2019" required="" value="2019" /><label for="2019">2019</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2018" required="" value="2018" /><label for="2018">2018</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2017" required="" value="2017" /><label for="2017">2017</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2016" required="" value="2016" /><label for="2016">2016</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2015" required="" value="2015" /><label for="2015">2015</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2014" required="" value="2014" /><label for="2014">2014</label></div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide className="car-data four-bxgrid">
                                <div className="formbx-white year-filter">
                                    <h3>Select Ownership</h3>

                                    <div class="years-box brands varient-box">
                                        <div class="form-group"><input type="radio" name="year" id="2023" required="" value="2023" /><label for="2023">2023</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2022" required="" value="2022" /><label for="2022">2022</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2021" required="" value="2021" /><label for="2021">2021</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2020" required="" value="2020" /><label for="2020">2020</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2019" required="" value="2019" /><label for="2019">2019</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2018" required="" value="2018" /><label for="2018">2018</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2017" required="" value="2017" /><label for="2017">2017</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2016" required="" value="2016" /><label for="2016">2016</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2015" required="" value="2015" /><label for="2015">2015</label></div>
                                        <div class="form-group"><input type="radio" name="year" id="2014" required="" value="2014" /><label for="2014">2014</label></div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="formbx-white km-drive-filter">
                                    <h3>Enter Kilometers Driven</h3>
                                    <div class="filter-txtbx form-input">
                                        <input type="text" placeholder="Enter Kms Driven" class="numberonly" name="kms" required="" maxlength="6" value="" />
                                        <button class="btn arrow-style blue-btn">Submit</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper> */}
                        <form onInput={checkAllSelectedValues} id="service-package-form" method='POST'>
                            <div className="mobile-custom-filter" ref={scrollContainerRef} onScroll={handleScroll}>


                                {/* <div className='mobFilter_cards'>
                                    <div className="formbx-white car-data year-filter">
                                        <h3>Select Year</h3>
                                        <div className='step-number'>1/6</div>

                                        <div class="years-box brands">
                                            {
                                                fetchYear !== undefined && fetchYear.map((year, i) => {
                                                    return (
                                                        <div className="form-group" key={i}>
                                                            <input type="radio" name="select_year" id={`year_${year}`} onChange={(e) => selectYearOnChange(e.target.value)} value={year} required onClick={selectYear} />
                                                            <label htmlFor={`year_${year}`}>{year} </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>

                                </div> */}



                                {/* {Step1 ? */}
                                <div className='mobFilter_cards logos'>
                                    <div className="formbx-white brand-filter ">
                                        <h3>Select Brand</h3>
                                        <div className='step-number'>2/6</div>
                                        <div className="car-data">
                                            <div className="brands no-after-radio">
                                                {
                                                    fetchBrands !== undefined && fetchBrands.map((brand) => {
                                                        return (
                                                            <div className="form-group" key={brand.slug}>
                                                                <input type="radio" id={`brand_${brand.name}`} onChange={(e) => fetchModelsByBrand(e.target.value, brand.name)} name="select_brand" value={brand.slug} required />
                                                                <label htmlFor={`brand_${brand.name}`}>
                                                                    <img src={`${process.env.NEXT_PUBLIC_URL}${brand.logo}`} />
                                                                    <span>{brand.name}</span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                {/* : ""

                                } */}

                                {Step2 ?

                                    <div className='mobFilter_cards'>
                                        <div className="formbx-white car-data year-filter">
                                            <h3>Select Model</h3>
                                            <div className='step-number'>3/6</div>

                                            <div class="years-box brands">
                                                {
                                                    brandModlesList.data !== undefined && brandModlesList.data.brand_models.map((model, i) => {
                                                        return (
                                                            <div className="form-group" key={model.slug}>
                                                                <input type="radio" name="select_model" id={`model_${model.slug}_${i}`} onChange={(e) => fetchVariantsByBrandAndModel(e.target.value, model.name)} value={model.slug} required />
                                                                <label htmlFor={`model_${model.slug}_${i}`}>{model.name} </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    : ""

                                }

                                {Step3 ?

                                    <div className='mobFilter_cards car-data four-bxgrid'>
                                        <div className="formbx-white car-data year-filter">
                                            <h3>Select Variant</h3>
                                            <div className='step-number'>4/6</div>


                                            <div className="years-box brands varient-box">
                                                {
                                                    fetchVariants.data !== undefined && fetchVariants.data.model_variants.map((variant) => {
                                                        return (
                                                            <div className="form-group" key={variant.slug}>
                                                                <input type="radio" name="select_variant" id={`variant_${variant.slug}`} onChange={(e) => manageSelectVariantOnChange(e.target.value, variant.name)} value={variant.slug} required />
                                                                <label htmlFor={`variant_${variant.slug}`}>{variant.name}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    : ""

                                }

                                {Step4 ?

                                    <div className='mobFilter_cards logos'>
                                        <div className="formbx-white car-data year-filter">
                                            <h3>Select Fuel Type</h3>

                                            <div className='step-number'>5/6</div>

                                            <div className="brands no-after-radio">
                                                {
                                                    fetchFuelType !== undefined && fetchFuelType.map((fuel) => {
                                                        return (
                                                            <div className="form-group body-type" key={fuel._id}>
                                                                <input type="radio" id={`fuel_${fuel.fuel_slug}`} value={fuel.fuel_slug} name="fuel_type" onChange={(e) => manageSelectFuelType(e.target.value, fuel.fuel_name)} required />
                                                                <label htmlFor={`fuel_${fuel.fuel_slug}`}>
                                                                    <p>
                                                                        <img src={`${Url}${fuel.fuel_image}`} />
                                                                        <span>{fuel.fuel_name}</span>
                                                                    </p>
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    : ""

                                }


                                {Step5 ?

                                    <div className='mobFilter_cards'>
                                        <div className="formbx-white km-drive-filter">
                                            <h3>Enter Kilometers Driven</h3>
                                            <div className='step-number'>6/6</div>
                                            <div class="filter-txtbx form-input">
                                                <input type='text' placeholder='Enter KMs Range' name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value={kmsInput !== '' && kmsInput !== undefined ? kmsInput : ''} minLength={4} maxLength={5} required />
                                                <button disabled={disabled} onClick={submitServicePackageDetails} id="submitServicePackage" className="btn arrow-style blue-btn">
                                                    <ButtonSpinner load={tinyLoader} btnName="Submit" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    : ""

                                }
                            </div>
                        </form>
                        {checkLoginStatus !== false ? <LoginForm Login={checkLoginStatus} logInHeading={`Log in to submit values`} redirectRoute={``} closePop={closePop} submitDataAfterSubmitLogIn={submitDataAfterSubmitLogIn} /> : ''}
                    </div>
                </section>
                {servicePackageSuccess ? <SmallSuccessPopUp HidePopup={closePop} successMessage={callSuccessMessage} errorMessage={callErrorMessage} /> : ""}
            </WebsiteLayout>
        </>
    )
}



export default MobileFilter;


export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/service-packages`);
    const data = await response.json();

    return {
        props: {
            cmsPage: data.cms_page,
        }
    }
}
