import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect,useRef, useState } from "react";
import { ButtonSpinner, numberFormatter } from "../Helper";
import LoginForm from "../LoginForm";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import SmallSuccessPopUp from "../smallSuccessPopUp";
import Slider from "react-slick";

const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);

const fetcher = (url) => axios.get(url).then(res => res.data);

function ProductList({ product, productBanner, i, productCount, fetchBrands, fetchBodyTypes, fetchFuelTypes }) {
    // console.log(product)
    // console.log(product);
    const [openBrandTab, setOpenBrandTab] = useState(false);
    const [openYearTab, setOpenYearTab] = useState(false);
    const [openModelTab, setOpenModeltab] = useState(false);
    const [openVariantTab, setOpenvariantTab] = useState(false);
    const [openKMstab, setOpenKMsTab] = useState(false);
    const [brandModlesList, setBrandModelsList] = useState([]);
    const [fetchYear, setFetchYear] = useState([]);
    const [fetchVariants, setFetchVariants] = useState([]);
    const [kmsInput, setKmsInput] = useState('');

    const [brandName, setBrandName] = useState('');
    const [selectYear, setSelectYear] = useState('');
    const [modelName, setModelName] = useState('');
    const [variantName, setVariantName] = useState('');
    const [enterKMs, setEnetrKMs] = useState('');

    const [disabled, setDisabled] = useState(true);
    const [checkLoginStatus, setCheckLoginStatus] = useState(false);

    const [locationAdress, setlocationAdress] = useState(false);


    const [galleryViewer, setGalleryViewer] = useState([]);

    const [leadSuccess, setLeadSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [buyLeadPopUp, setBuyLeadPopUp] = useState(false);
    const [callSuccessMessage, setCallSuccessMessage] = useState('');
    const [callErrorMessage, setCallErrorMessage] = useState('');

    const [user, setUser] = useState('');
    const [tinyLoader, setTinyLoader] = useState(false);

    const Url = process.env.NEXT_PUBLIC_URL;
    const SALES_FORCE_URL = process.env.SALES_FORCE_URL;

    const router = useRouter()

    const brandTab = () => {
        setOpenBrandTab(openBrandTab === false ? true : false);
        setOpenYearTab(false);
        setOpenModeltab(false);
        setOpenvariantTab(false);
        setOpenKMsTab(false);
    }

    const yearTab = () => {
        setOpenYearTab(openYearTab === false ? true : false);
        setOpenBrandTab(false);
        setOpenModeltab(false);
        setOpenvariantTab(false);
        setOpenKMsTab(false);
    }

    const modelTab = () => {
        setOpenModeltab(openModelTab === false ? true : false);
        setOpenBrandTab(false);
        setOpenYearTab(false);
        setOpenvariantTab(false);
        setOpenKMsTab(false);
    }

    const variantTab = () => {
        setOpenvariantTab(openVariantTab === false ? true : false);
        setOpenBrandTab(false);
        setOpenYearTab(false);
        setOpenModeltab(false);
        setOpenKMsTab(false);
    }

    const kmsTab = () => {
        setOpenKMsTab(openKMstab === false ? true : false);
        setOpenYearTab(false);
        setOpenBrandTab(false);
        setOpenModeltab(false);
        setOpenvariantTab(false);
    }

    const fetchModelsByBrand = async (brandSlug, brand_name) => {
        setBrandName(brand_name);
        setFetchVariants([]);
        setModelName('');
        setVariantName('');
        const fetchModels = await axios.get(`${Url}fetch-models-by-brand-buy-page/${brandSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                alert(e.reponse.data.message);
            }
        })
        setBrandModelsList(fetchModels);
        yearTab();
    }

    const getAllYears = async () => {
        const years = await fetch(`${process.env.NEXT_PUBLIC_URL}get-year`)
        const yearData = await years.json();
        setFetchYear(yearData.year)
    }
    const ref = useRef()

    useEffect(() => {

        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref.current && !ref.current.contains(e.target)) {
                setOpenKMsTab(false);
                setOpenYearTab(false);
                setOpenBrandTab(false);
                setOpenModeltab(false);
                setOpenvariantTab(false);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        getAllYears();
    }, []);

    const selectYearOnChange = (selectedYear) => {
        setSelectYear(selectedYear);
        modelTab();
    }

    const fetchVariantsByBrandAndModel = async (modelSlug, model_name) => {
        setModelName(model_name);
        setVariantName('');
        const fetchvariantsByModel = await axios.get(`${Url}fetch-variantsby-model-buy-page/${modelSlug}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 2) {
                // alert(e.response.data.message);
            } else if (e.response && e.response.data.status === 0) {
                // alert(e.reponse.data.message);
            }
        });

        if (fetchvariantsByModel.data.model_variants.length > 0) {

            setFetchVariants(fetchvariantsByModel)
            variantTab();
        }
    }

    const manageSelectVariantOnChange = (variantSlug, variant_name) => {
        setVariantName(variant_name)
        kmsTab();
    }

    const manageKmsHandlerOnChange = (e) => {
        setEnetrKMs(e);
        setKmsInput(e);
        setOpenKMsTab(false);
        // const regex = /^[0-9\b]+$/;
        // if (e === "" || regex.test(e)) {

        // }
    }

    const submitHandlerForGenerateBuyLead = async (e) => {
        e.preventDefault();

        if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
            setCheckLoginStatus(false);


            if (brandName === '' || modelName === '' || variantName === '' || selectYear === '' || enterKMs === '') {
                // setLeadSuccess(true);
                // document.body.classList.add('hide-scroll-poup-new');
                // setErrorMessage('Please select all values.');

                // // setDisabled(true);
                // // var disableBtn = document.getElementById('submitLead');
                // // disableBtn.classList.add("disableBtn");
                // return false;

                document.getElementById('errMsg').innerHTML = 'Please select all values.';
                document.getElementById("errMsg").style.display = "block";
                setTimeout(() => {
                    document.getElementById('errMsg').innerHTML = '';
                    document.getElementById("errMsg").style.display = "none";
                }, 3000);
                return false;
            }
            // setTinyLoader(true);


            const formData = new FormData(document.getElementById('generate-buy-lead'));
            formData.append('brandName', brandName);
            formData.append('modelName', modelName);
            formData.append('variantName', variantName);
            formData.append('selectYear', selectYear);
            formData.append('enterKms', enterKMs);
            formData.append('lead_type', "Buy");

            await axios.post(`${Url}generate-buy-page-lead`, formData, {
                headers: {
                    token: localStorage.getItem('lr-user-token'),
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                if (res && res.data.status === 1) {
                    // setSuccessMessage(`${res.data.message}`);
                    document.getElementById('generate-buy-lead').reset();
                    // setLeadSuccess(true);
                    document.body.classList.remove('hide-scroll-poup-new');
                    document.body.classList.remove('header-No-Scroll');
                    // brandName,selectYear,modelName,variantName,enterKMs
                    setTinyLoader(false);
                    router.push(`/buy/lead/thank-you/${res.data.lead._id}`);
                }
            }).catch((e) => {
                // setLeadSuccess(true);
                setTinyLoader(false);
                document.body.classList.remove('hide-scroll-poup-new');
                if (e && e.message) {
                    setErrorMessage(`Something went wrong.`)

                    document.getElementById('errMsg').innerHTML = 'Something went wrong.';
                    document.getElementById("errMsg").style.display = "block";
                    setTimeout(() => {
                        document.getElementById('errMsg').innerHTML = '';
                        document.getElementById("errMsg").style.display = "none";
                    }, 3000);
                    return false;
                } else if (e && e.response.data.status === 0) {
                    // setErrorMessage(`${e.response.data.message}`);

                    document.getElementById('errMsg').innerHTML = e.response.data.message;
                    document.getElementById("errMsg").style.display = "block";
                    setTimeout(() => {
                        document.getElementById('errMsg').innerHTML = '';
                        document.getElementById("errMsg").style.display = "none";
                    }, 3000);
                    return false;
                } else if (e && e.response.data.status === 2) {
                    // setErrorMessage(`${e.response.data.message}`);

                    document.getElementById('errMsg').innerHTML = e.response.data.message;
                    document.getElementById("errMsg").style.display = "block";
                    setTimeout(() => {
                        document.getElementById('errMsg').innerHTML = '';
                        document.getElementById("errMsg").style.display = "none";
                    }, 3000);
                    return false;
                }
            })
        } else {
            setCheckLoginStatus(true);
        }
        // } else {
        //     alert('Details not submitted. Please select all values!');
        //     return false;
        // }

        // let brand = {};
        // if (document.querySelector('input[name="select_brand"]:checked')) {
        //     const $brandSlug = document.querySelector('input[name="select_brand"]:checked').value;
        //     if ($brandSlug.length > 0 && $brandSlug !== '') {
        //         brand = 'brand' + $brandSlug;
        //     }
        // }

        // let year = {};
        // if (document.querySelector('input[name="select_year"]:checked')) {
        //     const $year = document.querySelector('input[name="select_year"]:checked').value;
        //     if ($year.length > 0 && $year !== '') {
        //         year = '&year' + $year;
        //     }
        // }

        // let model = {};
        // if (document.querySelector('input[name="select_model"]:checked')) {
        //     const $modelSlug = document.querySelector('input[name="select_model"]:checked').value;
        //     if ($modelSlug.length > 0 && $modelSlug !== '') {
        //         model = '&model' + $modelSlug;
        //     }
        // }

        // let variant = {};
        // if (document.querySelector('input[name="select_variant"]:checked')) {
        //     const $variantSlug = document.querySelector('input[name="select_variant"]:checked').value;
        //     if ($variantSlug.length > 0 && $variantSlug !== '') {
        //         variant = '&variant' + $variantSlug;
        //     }
        // }
        // console.log(document.getElementsByName('input[name="enter_kms"]'));
        // let kms = {};
        // if (document.getElementsByName('input[name="enter_kms"]')) {
        //     const $kmsVal = document.getElementsByName('input[name="enter_kms"]').value;
        //     if ($kmsVal.length > 0 && $kmsVal !== '') {
        //         kms = '&kms' + $kmsVal;
        //     }
        // }

        // const createUrl = brand + year + model + variant + kms
        // console.log(createUrl);
    }

    const checkAllSelectedValues = (e) => {
        let getFormValues = document.getElementById('generate-buy-lead');
        let error = 0;

        Array.prototype.slice.call(getFormValues).forEach(function (form) {
            if (form.required && !form.value) {
                error++;
            }
        })

        if (!error) {
            // setDisabled(false);
            // var disableBtn = document.getElementById('submitLead');
            // disableBtn.classList.remove("disableBtn")
        }
        // if (typeof window !== "undefined" && localStorage.getItem("lr-user-token")) {
        //     setCheckLoginStatus(false);
        // } else {
        //     setCheckLoginStatus(true);
        // }
    }

    const closePop = () => {
        setCheckLoginStatus(false);
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
            document.body.classList.remove('hide-scroll-poup');
            document.body.classList.remove('hide-scroll-poup-new');
        }
        setlocationAdress(false);
        if (leadSuccess === true) {
            // document.getElementById('generate-buy-lead').reset();
            setLeadSuccess(false);
            setSuccessMessage('');
            setErrorMessage('');

            setBrandModelsList([]);
            setFetchVariants([]);

            setBrandName('');
            setSelectYear('');
            setModelName('');
            setVariantName('');
            setEnetrKMs('');
            setKmsInput('');
            router.reload();
        }


        setOpenKMsTab(false);
        setDisabled(false);
    }

    const checkClick = () => {
        setlocationAdress(true);
    }
    // console.log(product)

    useEffect(() => {

        let $whereQuery = { lookup_id: product._id }
        let enCodeQuery = encodeURIComponent(JSON.stringify($whereQuery))

        axios.get(`${process.env.HELLO_AR_URL}application_products?where=${encodeURIComponent(JSON.stringify($whereQuery))}`, {
            headers: {
                Authorization: 'SDK YTZkNzNlMmItZDEzNy00ZjdiLWI2NDEtNmZhODZhYmVjMTU4OjZkMGRmYzUzLTIxYTEtNGU1OC04ZTQ5LWNhNmRkYmJiMzg3ZQ==',
            },
        }, fetcher).then((res) => {
            setGalleryViewer(res.data._items[0].slot_images[0].images);
            // console.log(res.data._items[0].slot_images[0].images);
        }).catch((err) => {
            setGalleryViewer([]);
        });

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
                    setCallErrorMessage('Something went wrong!');
                }
            });
        }

    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const swiperSetting = {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: true,
        loop: true,
        allowTouchMove: true,
        modules: [Navigation, Pagination]
    }


    return (
        <>


            {
                product.sell_status === "live" ? <>

                    <li>

                        <div className="proInner">

                            <Link href={`/buy/product-detail/${product.slug}`}></Link>

                            {product.image_360 && product.image_360 === '1' ? <div className="threSixtyIcon"></div> : ''}
                            <div className="pro-img">
                                {/* <Slider {...settings}  >
                                    {
                                        galleryViewer !== undefined && galleryViewer !== '' && galleryViewer.map((gallery, i) => {
                                            console.log(gallery)
                                            return ( */}
                                {/* <img src={`${Url}${product.image}`} /> */}

                                {/* <Slider {...settings}  > */}
                                <Swiper {...swiperSetting} pagination={{ clickable: true }}>
                                    {
                                        product !== undefined && product !== '' && product.image_carousel !== undefined && product.image_carousel.map((carousel, i) => {
                                            if (carousel !== null) {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="item">
                                                            <Link className="pro-img-link" href={`/buy/product-detail/${product.slug}`}>
                                                                <img src={carousel} alt={product.name} />
                                                            </Link>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })
                                    }
                                </Swiper>
                                {/* </Slider> */}
                            </div>

                            <div className="pro-name">{product.name}</div>

                            <div className="pro-spec">
                                <div className="spec-item"> <span> Regd. Year</span> {product.registration_year} </div>
                                <div className="spec-item"> <span>KMs Driven</span>{numberFormatter(product.kms_driven)} </div>
                                <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                            </div>
                            <div className="price-detail">
                                <div className="price">INR <span>{numberFormatter(product.price)}/-</span></div>
                                {product.product_emi !== '' && product.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(product.product_emi)}/-</span> </div> : ''}
                            </div>
                        </div>
                    </li>
                </> : product.sell_status === "booked" ? <>
                    <li>
                        <div className="proInner">
                            {product.image_360 && product.image_360 === '1' ? <div className="threSixtyIcon"></div> : ''}
                            <div className="pro-img">
                                <Swiper {...swiperSetting} pagination={{ clickable: true }}>
                                    {
                                        product !== undefined && product !== '' && product.image_carousel !== undefined && product.image_carousel.map((carousel, i) => {
                                            if (carousel !== null) {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="item">
                                                            <img src={carousel} />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })
                                    }
                                </Swiper>
                                <div className="flag booked">Booked</div>
                            </div>

                            <div className="pro-name">{product.name}</div>

                            <div className="pro-spec">
                                <div className="spec-item"> <span> Regd. Year</span> {product.registration_year} </div>
                                <div className="spec-item"> <span>KMs Driven</span>{numberFormatter(product.kms_driven)} </div>
                                <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                            </div>
                            {/* <div className="price-detail">
                                <div className="price">INR <span>{numberFormatter(product.price)}/-</span></div>
                                {product.product_emi !== '' && product.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(product.product_emi)}/-</span> </div> : ''}
                            </div> */}
                        </div>
                    </li>
                </> : product.sell_status === "sold" ? <>
                    <li>
                        <div className="proInner">
                            {/* <Link href={`/buy/product-detail/${product.slug}`}></Link> */}
                            {product.image_360 && product.image_360 === '1' ? <div className="threSixtyIcon"></div> : ''}
                            <div className="pro-img">
                                <Swiper {...swiperSetting} pagination={{ clickable: true }}>
                                    {
                                        product !== undefined && product !== '' && product.image_carousel !== undefined && product.image_carousel.map((carousel, i) => {
                                            if (carousel !== null) {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="item">
                                                            <img src={carousel} />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })
                                    }
                                </Swiper>
                                <div className="flag sold">Sold</div>
                            </div>

                            <div className="pro-name">{product.name}</div>

                            <div className="pro-spec">
                                <div className="spec-item"> <span> Regd. Year</span> {product.registration_year} </div>
                                <div className="spec-item"> <span>KMs Driven</span>{numberFormatter(product.kms_driven)} </div>
                                <div className="spec-item"> <span>Fuel Type</span> {product.fuel_type.fuel_name} </div>
                            </div>
                            {/* <div className="price-detail">
                                <div className="price">INR <span>{numberFormatter(product.price)}/-</span></div>
                                {product.product_emi !== '' && product.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(product.product_emi)}/-</span> </div> : ''}
                            </div> */}
                        </div>
                    </li>
                </> : ''
            }

            {/* ?brand=audi,mercedes&body_type=sedan,coupe&price=1000000,2500000&year=2017,2023&kms=0,30000 */}

            {/* {productBanner !== undefined && productBanner !== '' ? <>
                {
                    i === 5 || i === 2 && product.productBanner !== undefined && product.productBanner ? <><li className='full-banner proInner'>
                        <Link href={`/buy/product-detail/${productBanner.slug}`}></Link>

                        <div className="pro-img">
                            <Swiper {...swiperSetting} pagination={{ clickable: true }}>
                                {
                                    productBanner !== undefined && productBanner !== '' && productBanner.image_carousel !== undefined && productBanner.image_carousel.map((carousel, i) => {
                                        if (carousel !== null) {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <div className="item">
                                                        <img src={carousel} />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        }
                                    })
                                }
                            </Swiper>
                        </div>

                        <div className='pro-info'>

                            <div className='showroom-location' onClick={checkClick}><span>
                                {`${productBanner.product_location !== undefined ? productBanner.product_location.center_name : ''} Experience Centre `}
                            </span></div>

                            <div className="pro-name">{productBanner.name}</div>

                            <div className="pro-spec">
                                <div className="spec-item"> <span> Regd. Year</span> {productBanner.registration_year} </div>
                                <div className="spec-item"> <span>KMs Driven</span>{numberFormatter(productBanner.kms_driven)} </div>
                                <div className="spec-item"> <span>Fuel Type</span> {productBanner.fuel_type && productBanner.fuel_type.fuel_name} </div>
                            </div>
                            <div className="price-detail">
                                <div className="price">INR <span>{numberFormatter(productBanner.price)}/-</span></div>
                                {productBanner.product_emi !== '' && productBanner.product_emi !== undefined ? <div className="emiStarts">EMI starts from <span>INR {numberFormatter(productBanner.product_emi)}/-</span> </div> : ''}
                            </div>
                        </div>
                    </li>
                        {locationAdress ?
                            <div className="overlay-new exprCntrPopup" >
                                <div className="overlay-w">
                                    <div className="popup-wrap">
                                        <div onClick={closePop} className="close"></div>
                                        <div className="popupContnt">
                                            {productBanner.product_location !== undefined ? <h2>  {productBanner.product_location !== undefined ? productBanner.product_location.center_name + ' Experience Centre' : ''} </h2> : ''}
                                            {productBanner.product_location !== undefined ? <p>{productBanner.product_location.center_full_address}</p> : ''}

                                            {productBanner.product_location !== undefined && productBanner.product_location !== '' ?
                                                <>
                                                    <Link href={`https://www.google.com/maps/search/Luxury Ride ${productBanner.product_location !== undefined ? productBanner.product_location.center_full_address + ' ' + productBanner.product_location.center_name : ''}`} className='btn reverse' target="_blank">Get Directions</Link>
                                                </>
                                                : ''}
                                            <Link href="tel:+91 8410084100" className="btn blueBdr">Call Us Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""
                        }


                    </> : ''
                }
            </> : ''} */}


            {i === 7 ? <li className='add-banner'>

                <div className="proInner" style={{ backgroundImage: 'url("/img/pro-inner-img.png")', backgroundRepeat: "no-repeat", backgroundPosition: "left top", backgroundSize: "cover", height: "100%" }}>

                    <Link href={`/luxury-ride-buy-back`}></Link>

                    <div className='add-text'>
                        <h3>Luxury Ride Buyback</h3>

                        <p>We want you to enjoy the freedom that comes with a car. Luxury Ride Buyback makes resale of your car or upgrading it, rewarding and hassle-free.</p>
                    </div>

                </div>


            </li> : ''}

            {
                i === 10 ?
                    <li className='full-banner'>

                        <div className="proInner" style={{ backgroundImage: 'url("/img/pro-form-banner.png")', backgroundRepeat: "no-repeat", backgroundPosition: "left top", backgroundSize: "cover", height: "100%" }}>

                            <div className='pro-form'>

                                <h3>Couldn’t Find What You Were Looking For?  </h3>

                                <div className='car-search buypro'  ref={ref}>
                                    <form onInput={checkAllSelectedValues} id="generate-buy-lead" method="POST">
                                        <div className={`div-data  ${brandName !== '' ? 'added' : ''}`} onClick={brandTab} >

                                            <div className='data'>
                                                <span>Brand</span>
                                                {brandName !== '' ? <i>{brandName}</i> : ''}

                                            </div>

                                            <div className="car-data" style={{ display: openBrandTab === false ? "none" : "block" }}>

                                                <div className='brands no-after-radio'>
                                                    {
                                                        fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
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
                                        <div className={`div-data  ${selectYear !== '' ? 'added' : ''} disabled`} onClick={yearTab}>
                                            <div className='data'>
                                                <span>Year</span>
                                                {selectYear !== '' ? <i>{selectYear}</i> : ''}
                                            </div>

                                            <div className="car-data small-box four-bxgrid " style={{ display: openYearTab === false ? "none" : "block" }}>

                                                <h5>Select Year</h5>

                                                <div className='brands'>

                                                    {
                                                        fetchYear !== undefined && fetchYear.map((year, i) => {
                                                            return (
                                                                <div className="form-group" key={i}>
                                                                    <input type="radio" name="select_year" id={`year_${year}`} onChange={(e) => selectYearOnChange(e.target.value)} value={year} required />
                                                                    <label htmlFor={`year_${year}`}>{year} </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>

                                        </div>
                                        <div className={`div-data  ${modelName !== '' ? 'added' : ''}`} onClick={modelTab}>
                                            <div className='data'>
                                                <span>Model</span>
                                                {modelName !== '' ? <i>{modelName}</i> : ''}
                                            </div>

                                            <div className="car-data small-box" style={{ display: openModelTab === false ? "none" : "block" }}>

                                                <h5>Select Model</h5>
                                                <div className="scroller-cars-data">      
                                                <div className='brands'>

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

                                        </div>
                                        <div className={`div-data  ${variantName !== '' ? 'added' : ''} active`} onClick={variantTab}>
                                            <div className='data'>
                                                <span>Variant</span>
                                                {variantName !== '' ? <i>{variantName}</i> : ''}
                                            </div>

                                            <div className="car-data small-box" style={{ display: openVariantTab === false ? "none" : "block" }}>
                                                <h5>Select Variant</h5>
                                                <div className="scroller-cars-data">
                                                <div className='brands'>

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

                                        </div>

                                        <div className={`div-data  ${enterKMs !== '' ? 'added' : ''} right-style`}>
                                            <div className='data' onClick={kmsTab}>
                                                <span>KMs Driven</span>
                                                {enterKMs !== '' ? <i>{enterKMs}</i> : ''}
                                            </div>

                                            {/* <div className="car-data" style={{ display: openKMstab === false ? "none" : "block" }}>

                                                <h5>KMs Range</h5>

                                                <div className='filter-txtbx form-input'>
                                                    <input type='text' placeholder='Enter KMs Range' name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value={kmsInput} minLength={4} maxLength={5} required />
                                                </div>
                                            </div> */}

                                            <div className="car-data small-box" style={{ display: openKMstab === false ? "none" : "block" }}>
                                                <h5>Select Variant</h5>
                                                <div className='brands'>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_0_to_10" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="0 - 10,000" required />
                                                        <label htmlFor="kms_0_to_10">{`0 - ${numberFormatter(10000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_10_to_20" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="10,000 - 20,000" required />
                                                        <label htmlFor="kms_10_to_20">{`${numberFormatter(10000)} - ${numberFormatter(20000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_20_to_30" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="20,000 - 30,000" required />
                                                        <label htmlFor="kms_20_to_30">{`${numberFormatter(20000)} - ${numberFormatter(30000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_30_to_40" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="30,000 - 40,000" required />
                                                        <label htmlFor="kms_30_to_40">{`${numberFormatter(30000)} - ${numberFormatter(40000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_40_to_50" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="40,000 - 50,000" required />
                                                        <label htmlFor="kms_40_to_50">{`${numberFormatter(40000)} - ${numberFormatter(50000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_50_to_60" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="50,000 - 60,000" required />
                                                        <label htmlFor="kms_50_to_60">{`${numberFormatter(50000)} - ${numberFormatter(60000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_60_to_70" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="60,000 - 70,000" required />
                                                        <label htmlFor="kms_60_to_70">{`${numberFormatter(60000)} - ${numberFormatter(70000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_70_to_80" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="70,000 - 80,000" required />
                                                        <label htmlFor="kms_70_to_80">{`${numberFormatter(70000)} - ${numberFormatter(80000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_80_to_90" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="80,000 - 90,000" required />
                                                        <label htmlFor="kms_80_to_90">{`${numberFormatter(80000)} - ${numberFormatter(90000)}`}</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="radio" id="kms_90_to_100" name="enter_kms" onChange={(e) => manageKmsHandlerOnChange(e.target.value)} value="90,000 - 1,00,000" required />
                                                        <label htmlFor="kms_90_to_100">{`${numberFormatter(90000)} - ${numberFormatter(100000)}`}</label>
                                                    </div>
                                                    {/* id={`variant_${variant.slug}`}  {`variant_${variant.slug}`}*/}
                                                </div>


                                            </div>

                                        </div>
                                        <div className='div-data'>
                                            <button onClick={submitHandlerForGenerateBuyLead} id="submitLead">
                                                <ButtonSpinner load={tinyLoader} btnName="Submit" />
                                                {/* <span>Submit</span> */}
                                            </button>


                                        </div>
                                    </form>
                                    <span className='error banner-error' id="errMsg"></span>
                                    {checkLoginStatus !== false ? <LoginForm Login={checkLoginStatus} logInHeading={`Log in to submit values`} redirectRoute={``} closePop={closePop} loginId={`buy-lead-login`} /> : ''}
                                </div>

                            </div>


                        </div>


                        {leadSuccess ? <SmallSuccessPopUp HidePopup={closePop} successMessage={successMessage} errorMessage={errorMessage} /> : ""}
                    </li >
                    : ''
            }


        </>
    )
}

export default ProductList;