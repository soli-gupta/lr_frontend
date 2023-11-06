import React, { useState, useRef, useEffect, useCallback } from 'react';

import Script from 'next/script';
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
import MultiRangeSlider from '../rangeslider/MultiRangeSlider';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import { $ } from 'react-jquery-plugin';
import WebHead from '@/components/common/WebHead';
import axios from 'axios';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useRouter } from 'next/router';
import ProductList from '@/components/products';
import { numberFormatter } from '@/components/Helper';
import KMsRangeSlider from '../rangeslider/KmsRangeSlider';
import PricerangeSlider from '../rangeslider/PircerangeSlider';
import YearRangeSlider from '../rangeslider/YearRangeSlider';
import FilterComponent from '@/components/common/filters/FilterComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Link from 'next/link';
import Loader from '@/components/common/Loader';
import Lottie from "lottie-react";
import noData from "@/public/lotie-icons/not-data-found.json"
import AOS from 'aos';
import 'aos/dist/aos.css';
import NoDataProduct from '@/components/products/noDataProduct';
import PixelLoader from '@/components/PixelLoader';

const fetcher = (url) => axios.get(url).then(res => res.data);





function Buy({ page }) {



    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;



    const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);
    const fetchBodyTypes = useSWR(`${Url}fetch-all-body-type`, fetcher);
    const fetchFuelTypes = useSWR(`${Url}fetch-all-fuel-type`, fetcher);
    const fetchLatestProducts = useSWR(`${Url}fetch-homepage-products`, fetcher);
    const fetchExperienceCenter = useSWR(`${Url}fetch-experience-center`, fetcher);
    const fetchMinMaxProductPrice = useSWR(`${Url}fetch-product-min-max-price`, fetcher);

    const [scroll, setScroll] = useState(false);
    const [Hamburger, setHamburger] = useState(false);
    const [CustomSearch, setCustomSearch] = useState(false);
    const [ShowAvailable, setShowAvailable] = useState(false);
    const [ShowRelevance, setShowRelevance] = useState(false);
    const [BrandTabs, setBrandTabs] = useState(false);
    const [PriceTabs, setPriceTabs] = useState(false);
    const [BodyTabs, setBodyTabs] = useState(false);
    const [FuelTabs, setFuelTabs] = useState(false);
    const [YearTabs, setYearTabs] = useState(false);
    const [KmTabTabs, setKmTabTabs] = useState(false);
    const [pageValue, setPagevalue] = useState(0);
    const [filterName, setFiltername] = useState('Price - High to Low');
    const [availableFilter, setAvailableFilter] = useState('All Cars');
    const [noDataFoundOpen, setNoDataFoundOpen] = useState(0);
    // const [data, setData] = useState([]);

    const [noDataProduct, setNoDataProduct] = useState([]);

    const BrandTab = () => {
        setBrandTabs(!BrandTabs)
        setPriceTabs(false)
        setBodyTabs(false)
        setKmTabTabs(false)
        setYearTabs(false)
        setFuelTabs(false)
    }
    const PriceTab = () => {
        setBrandTabs(false)
        setBodyTabs(false)
        setYearTabs(false)
        setPriceTabs(!PriceTabs)
        setFuelTabs(false)
        setKmTabTabs(false)

    }

    const BodyTab = () => {
        setBrandTabs(false)
        setYearTabs(false)
        setBodyTabs(!BodyTabs)
        setPriceTabs(false)
        setKmTabTabs(false)
        setFuelTabs(false)
    }

    const FuelTab = () => {
        setBrandTabs(false)
        setBodyTabs(false)
        setPriceTabs(false)
        setYearTabs(false)
        setKmTabTabs(false)
        setFuelTabs(!FuelTabs)
    }

    const YearTab = () => {
        setBrandTabs(false)
        setBodyTabs(false)
        setPriceTabs(false)
        setFuelTabs(false)
        setKmTabTabs(false)
        setYearTabs(!YearTabs)
    }

    const KmTab = () => {
        setBrandTabs(false)
        setBodyTabs(false)
        setPriceTabs(false)
        setFuelTabs(false)
        setYearTabs(false)
        setKmTabTabs(!KmTabTabs)
    }

    const FilterClose = () => {
        setBrandTabs(false)
        setBodyTabs(false)
        setPriceTabs(false)
        setFuelTabs(false)
        setYearTabs(false)
        setKmTabTabs(false)

    }


    const AvailableCars = () => {

        setShowAvailable(!ShowAvailable)
        setShowRelevance(false)

    }

    const Relevance = () => {

        setShowRelevance(!ShowRelevance)
        setShowAvailable(false)

    }

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




    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };


    const [scrollY, setScrollY] = useState(0);
    const onScroll = useCallback(event => {
        const { pageYOffset, scrollY } = window;
        // console.log("yOffset", pageYOffset, "scrollY", scrollY);
        setScrollY(window.pageYOffset);
        // console.log('Top:', document.documentElement.scrollTop);
        // console.log('Window:', window.innerHeight);
        // console.log('Height:', document.documentElement.scrollHeight);
        // console.log('Top:', event.target.documentElement.scrollTop);
        // console.log('Window:', window.innerHeight);
        // console.log('Height:', event.target.documentElement.scrollHeight);
        if (window.innerHeight + document.documentElement.scrollHeight + 1 >= document.documentElement.scrollTop) {
            // alert('Loading')
            // console.log('Loading');
        }
        if (window.innerHeight + event.target.documentElement.scrollTop + 1 >= event.target.documentElement.scrollHeight) {
            // console.log('Bottom hitted!');
        }
    }, []);
    // console.log(scrollY)
    var productData = [];

    const getAllProductsAfterNoDataFound = async () => {

        if (productData.length <= 0 || productData === undefined || productData === '') {

            await axios.get(`${Url}get-product-after-no-data-found`).then((res) => {
                if (res.data.status === 1) {
                    setNoDataProduct(res.data.products);
                }
            }).catch((e) => {
                setNoDataProduct([]);
            })
        }
    }

    const ref = useRef()
    const ref1 = useRef()
    const ref2 = useRef()

    useEffect(() => {
        // setTimeout(() => {
        getAllProductsAfterNoDataFound();
        // }, 300);

        if (typeof window !== "undefined") {
            document.body.classList.add('header-No-Scroll');

        }

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => {
                setScroll(window.scrollY > 10)
            })
        }

        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref.current && !ref.current.contains(e.target)) {
                setBrandTabs(false)
                setPriceTabs(false)
                setBodyTabs(false)
                setKmTabTabs(false)
                setYearTabs(false)
                setFuelTabs(false)
            }
        }

        const checkIfClickedOutside1 = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref1.current && !ref1.current.contains(e.target)) {
                setShowAvailable(false)
            }
        }

        const checkIfClickedOutside2 = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref2.current && !ref2.current.contains(e.target)) {
                setShowRelevance(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)
        document.addEventListener("mousedown", checkIfClickedOutside1)
        document.addEventListener("mousedown", checkIfClickedOutside2)

        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            if (typeof window !== "undefined") {
                document.body.classList.remove('header-No-Scroll');
                document.body.classList.remove('mobile-menu-show');
                window.removeEventListener("scroll", onScroll, { passive: true });
            }

        }



    }, []);


    const { brand, body_type, fuel_type, price, year, kms, availability, filter } = router.query
    let urlBrand = brand ? brand.split(',') : brand;
    let urlBodyType = body_type ? body_type.split(',') : body_type;
    let urlFuelType = fuel_type ? fuel_type.split(',') : fuel_type;

    let brandSlug = '';
    let brandSlugsVal = ''
    if (brand !== '' && brand !== undefined && brand.length > 0) {
        brandSlug = 'brands=' + brand;
        brandSlugsVal = brand.split(',')
    }

    let bodyType = '';
    let bodyTypeSlugsVal = ''
    if (body_type !== '' && body_type !== undefined && body_type.length > 0) {
        bodyType = '&body_type=' + body_type;
        bodyTypeSlugsVal = body_type.split(',');
    }

    let fuelType = '';
    if (fuel_type !== '' && fuel_type !== undefined && fuel_type.length > 0) {
        fuelType = '&fuel_type=' + fuel_type;
    }

    let searchPrice = '';
    if (price !== '' && price !== undefined && price.length > 0) {
        searchPrice = '&price=' + price;
    }

    let searchYear = '';
    if (year !== '' && year !== undefined && year.length > 0) {
        searchYear = '&year=' + year;
    }

    let searchKMs = '';
    if (kms !== '' && kms !== undefined && kms.length > 0) {
        searchKMs = '&kms=' + kms;
    }
    let getAvailability = '';
    if (availability !== '' && availability !== undefined && availability.length > 0) {
        getAvailability = '&availability=' + availability;
    }
    let getFilters = '';
    if (filter !== '' && filter !== undefined && filter.length > 0) {
        getFilters = '&filter=' + filter;
    }


    const PAGE_SIZE = 6;
    const { data: createFlatArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
        const aofs = parseInt(index) + parseInt(1);

        return `${Url}buy-products/?` + brandSlug + bodyType + fuelType + searchPrice + searchYear + searchKMs + getAvailability + '&page=' + aofs + getFilters;
    }
        , fetcher);

    // const { data: createFlatArrayNoData, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
    //     const aofs = parseInt(index) + parseInt(1);

    //     return `${Url}get-product-after-no-data-found`
    //     ///?` + brandSlug + bodyType + fuelType + searchPrice + searchYear + searchKMs + getAvailability + '&page=' + aofs + getFilters;
    // }
    //     , fetcher);




    const applyAllFilters = (e) => {
        e.preventDefault();

        // let $brandName = document.querySelectorAll('input[name="brand_name[]"]:checked');

        // let brandName = [];
        // $brandName.forEach((brand) => {
        //     brandName.push(brand.value);
        // });
        // let brand = '';
        // if (brandName.length > 0) {
        //     brand = "brand=" + brandName
        // }

        // let $bodyType = document.querySelectorAll('input[name="body_type[]"]:checked');

        // let bodyType = [];
        // $bodyType.forEach((body) => {
        //     bodyType.push(body.value);
        // });
        // let body_type = '';
        // if (bodyType.length > 0) {
        //     body_type = "&body_type=" + bodyType
        // }

        // let $fuelType = document.querySelectorAll('input[name="fuel_type[]"]:checked');

        // let fuelType = [];
        // $fuelType.forEach((fuel) => {
        //     fuelType.push(fuel.value);
        // });
        // let fuel_type = '';
        // if (fuelType.length > 0) {
        //     fuel_type = "&fuel_type=" + fuelType
        // }

        // const $minVal = document.getElementsByClassName('min-price');
        // const $maxPrice = document.getElementsByClassName('max-price');
        // for (var i = 0; i < $minVal.length; i++) {
        //     var minPrice = $minVal[i].innerText;
        // }
        // for (var i = 0; i < $maxPrice.length; i++) {
        //     var maxPrice = $maxPrice[i].innerText;
        // }
        // let price = '';
        // const $getPriceVal = document.getElementById('price-range-count').value;
        // if ($getPriceVal > 0) {
        //     if (minPrice !== undefined && maxPrice !== undefined && $getPriceVal !== 0) {
        //         price = '&price=' + minPrice.replaceAll(',', '') + ',' + maxPrice.replaceAll(',', '');
        //     }
        // }

        // const $minYear = document.getElementsByClassName('min-year');
        // const $maxYear = document.getElementsByClassName('max-year');
        // for (var i = 0; i < $minYear.length; i++) {
        //     var minYear = $minYear[i].innerText;
        // }
        // for (var i = 0; i < $maxYear.length; i++) {
        //     var maxYear = $maxYear[i].innerText;
        // }
        // let year = '';
        // const $getYearval = document.getElementById('year-range-count').value;
        // if ($getYearval > 0) {

        //     if (minYear !== undefined && maxYear !== undefined) {
        //         year = '&year=' + minYear + ',' + maxYear;
        //     }
        // }
        // const $minKMs = document.getElementsByClassName('min-kms');
        // const $maxKMs = document.getElementsByClassName('max-kms');
        // for (var i = 0; i < $minKMs.length; i++) {
        //     var minKMs = $minKMs[i].innerText;
        // }
        // for (var i = 0; i < $maxKMs.length; i++) {
        //     var maxKMs = $maxKMs[i].innerText;
        // }
        // let kms = '';
        // const $getKMsVal = document.getElementById('kms-range-count').value;
        // if ($getKMsVal > 0) {

        //     if (minKMs !== undefined && maxKMs !== undefined) {
        //         kms = '&kms=' + minKMs.replaceAll(',', '') + ',' + maxKMs.replaceAll(',', '');
        //     }
        // }

        // router.push('/buy/?' + brand + body_type + fuel_type + price + year + kms, null, { shallow: true })
        // FilterClose();

        let appliedBrand = '';
        if (brand !== '' && brand !== undefined && brand.length > 0) {
            appliedBrand = 'brand=' + brand + '&';
        }

        let appliedBodyType = '';
        if (body_type !== '' && body_type !== undefined && body_type.length > 0) {
            appliedBodyType = 'body_type=' + body_type + '&';
        }

        let appliedFuelType = '';
        if (fuel_type !== '' && fuel_type !== undefined && fuel_type.length > 0) {
            appliedFuelType = 'fuel_type=' + fuel_type + '&';
        }

        let appliedPrice = '';
        if (price !== '' && price !== undefined && price.length > 0) {
            appliedPrice = 'price=' + price + '&';
        }

        let appliedYear = '';
        if (year !== '' && year !== undefined && year.length > 0) {
            appliedYear = 'year=' + year + '&';
        }

        let appliedKMs = '';
        if (kms !== '' && kms !== undefined && kms.length > 0) {
            appliedKMs = 'kms=' + kms + '&';
        }
        let getAvailability = '';
        if (availability !== '' && availability !== undefined && availability.length > 0) {
            getAvailability = 'availability=' + availability + '&';
        }
        let getFilters = '';
        if (filter !== '' && filter !== undefined && filter.length > 0) {
            getFilters = 'filter=' + filter + '&';
        }

        let appliedFilter = '';
        const $getCheckedFilter = document.querySelectorAll('input[name=relevance]:checked');
        if ($getCheckedFilter.length > 0) {
            appliedFilter = 'filter=' + $getCheckedFilter[0].value + '&';
        }

        let appliedAvailability = ''
        const $getCheckedAvailability = document.querySelectorAll('input[name=AvailableCars]:checked');
        if ($getCheckedAvailability.length > 0) {
            appliedAvailability = 'availability=' + $getCheckedAvailability[0].value + '&';
        }

        // console.log('/buy/?' + appliedBrand + appliedBodyType + appliedFuelType + appliedPrice + appliedYear + appliedKMs + appliedAvailability + appliedFilter)

        // router.push('/buy/?' + brand + body_type + fuel_type + price + year + kms + appliedAvailability + appliedFilter, null, { shallow: true })
        router.push('/buy/?' + appliedBrand + appliedBodyType + appliedFuelType + appliedPrice + appliedYear + appliedKMs + appliedAvailability + appliedFilter, null, { shallow: true });
        FilterClose();

        setShowRelevance(false);
        setShowAvailable(false);
    }

    const recenltAdded = () => {
        setFiltername('Recently Added');
        // router.push('/buy/?filter=recently-added');
        // Relevance();
    }

    const priceLowToHigh = () => {
        setFiltername('Price - Low to High');
        // router.push('/buy/?filter=price-low-to-high');
        // Relevance();
    }

    const priceHighToLow = () => {
        setFiltername('Price - High to Low');
        // router.push('/buy/?filter=price-high-to-low');
        // Relevance();
    }

    const kmHighToLow = () => {
        setFiltername('KM Driven - High to Low');
        // router.push('/buy/?filter=km-high-to-low');
        // Relevance();
    }

    const kmLowToHigh = () => {



        setFiltername('KM Driven - Low to High');
        // router.push('/buy/?filter=km-low-to-high');
        // Relevance();
    }


    const fetchAllProducts = () => {
        setAvailableFilter('All Cars');
        // router.push('/buy/?availability=live');
        // setShowAvailable(false);
    }

    const fetchAvailableProducts = () => {
        setAvailableFilter('Available Cars');
        // router.push('/buy/?availability=live');
        // setShowAvailable(false);
    }

    const fetchBookedProducts = () => {
        setAvailableFilter('Booked Cars');
        // router.push('/buy/?availability=booked');
        // setShowAvailable(false);
    }

    const fetchSoldProducts = () => {
        setAvailableFilter('Sold Cars');
        // router.push('/buy/?availability=sold');
        // setShowAvailable(false);
    }
    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!createFlatArray) return <Loader loaderTitle={`Loading...`} />;

    const returnFlattenObject = (arr) => {
        const flatObject = {};
        for (let i = 0; i < arr.length; i++) {
            for (const property in arr[i]) {
                flatObject[`${property}`] = arr[i][property];
                // setPagevalue(i);
            }
        };
        return flatObject;
    }
    const data = returnFlattenObject(createFlatArray);



    productData = [].concat.apply([], createFlatArray.map(x => x.products))
    // const isReached = productData && productData[productData - 1]?.length < 6;
    const isReached = productData && productData.length === data.productCount;
    const loadingMore = productData && typeof productData[size - 1] === "undefined";


    const isLoadingMore = isLoading || (size > 0 && productData && typeof productData[size - 1] === "undefined");
    const isEmpty = productData?.[0]?.length === 0;


    fetchBrands !== undefined && fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
        brand.isChecked = false
        if (urlBrand !== undefined) {
            const getChecked = urlBrand.filter((check) => {
                if (check === brand.slug) {
                    return brand.isChecked = true
                }
            });
        }
        return brand;
    });

    fetchBodyTypes !== undefined && fetchBodyTypes.data !== undefined && fetchBodyTypes.data.body_type.map((bodyT) => {
        bodyT.isChecked = false;
        if (urlBodyType !== undefined) {
            urlBodyType.map((check) => {
                if (check === bodyT.body_slug) {
                    return bodyT.isChecked = true;
                }
            });
        }
        return bodyT;
    });

    fetchFuelTypes !== undefined && fetchFuelTypes.data !== undefined && fetchFuelTypes.data.fuel_type.map((fuelT) => {
        fuelT.isChecked = false;
        if (urlFuelType !== undefined) {
            urlFuelType.map((check) => {
                if (check === fuelT.fuel_slug) {
                    return fuelT.isChecked = true;
                }
            });
        }
    });

    const refershAllFilters = () => {
        router.push('/buy');
    }


    const CloseMobPopup = () => {

        setShowRelevance(false)
        setShowAvailable(false)

    }

    if (!page) return <Loader loaderTitle={`Something went wrong.`} />


    return (
        <div>
            <WebHead pageTitle={page.page_title} />
            {/* <PixelLoader /> */}

            <nav className='breadcrum-main' aria-label="breadcrumb">
                <div className="wrapper">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href={`/`}>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Buy</li>
                    </ol>
                </div>
            </nav>

            <div className="catBanner mob-top-margin buy-main">
                <div className="wrapper">
                    <div dangerouslySetInnerHTML={{ __html: page.content_one }}></div>
                </div>
            </div>



            <div className="wrapper">



                <div className="filterSec" ref={ref}>



                    <FilterComponent fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} productMinMax={fetchMinMaxProductPrice !== undefined && fetchMinMaxProductPrice.data !== undefined && fetchMinMaxProductPrice.data.price !== undefined ? fetchMinMaxProductPrice.data.price : ''} noDataFoundOpen={noDataFoundOpen} BrandTab={BrandTab}
                        PriceTab={PriceTab}
                        BodyTab={BodyTab}
                        FuelTab={FuelTab}
                        YearTab={YearTab}
                        KmTab={KmTab} FilterClose={FilterClose}
                        BrandTabs={BrandTabs}
                        PriceTabs={PriceTabs}
                        BodyTabs={BodyTabs}
                        FuelTabs={FuelTabs}
                        YearTabs={YearTabs}
                        KmTabTabs={KmTabTabs}

                    />





                    <div className="carFiltrs" ref={ref1}>

                        <label onClick={AvailableCars} className={`${ShowAvailable ? "open" : ""} label`} >
                            {availability === 'all' ? 'All Cars' : availability === 'live' ? 'Available Cars' : availability === 'booked' ? 'Booked Cars' : availability === 'sold' ? 'Sold Cars' : availableFilter}
                        </label>

                        {ShowAvailable ?
                            <>
                                <div onClick={CloseMobPopup} className='overlay-mob'></div>
                                <div className='mob-filter'>
                                    {/* <div className='mob-heading'>Sort By</div>       */}
                                    <ul className="filterListComan shortByCars">
                                        <li>
                                            <input type="radio" defaultChecked={availability === 'all' || availability === undefined ? true : false} onChange={fetchAllProducts} onClick={applyAllFilters} id="fetch-all-cars" name="AvailableCars" defaultValue="all" />
                                            <label htmlFor="fetch-all-cars">  All Cars </label>
                                            {/* <strong>({parseInt(data.liveProductCount) + parseInt(data.bookedProductCount) + parseInt(data.soldProductCount)})</strong> */}
                                        </li>
                                        <li>
                                            <input type="radio" defaultChecked={availability === 'live' ? true : false} onChange={fetchAvailableProducts} onClick={applyAllFilters} id="fetch-available" name="AvailableCars" defaultValue="live" />
                                            <label htmlFor="fetch-available">  Available Cars </label>
                                            {/* <strong>({data.liveProductCount})</strong> */}
                                        </li>
                                        <li>
                                            <input type="radio" id="fetch-booked" name="AvailableCars" defaultChecked={availability === 'booked' ? true : false} onChange={fetchBookedProducts} onClick={applyAllFilters} defaultValue="booked" />
                                            <label htmlFor="fetch-booked"> Booked Cars </label>
                                            {/* <strong>({data.bookedProductCount})</strong> */}
                                        </li>
                                        <li>
                                            <input type="radio" id="fetch-sold" defaultChecked={availability === 'sold' ? true : false} onChange={fetchSoldProducts} onClick={applyAllFilters} name="AvailableCars" defaultValue="sold" />
                                            <label htmlFor="fetch-sold"> Sold Cars </label>
                                            {/* <strong>({data.soldProductCount})</strong> */}
                                        </li>
                                    </ul>
                                    <div onClick={CloseMobPopup} className='mob-close'>Close</div>
                                </div>
                            </>

                            : ""}
                    </div>
                    <div className="carSortBy" ref={ref2}>
                        <label onClick={Relevance} className={`${ShowRelevance ? "open" : ""} label`}><span>Sort by:</span>
                            {
                                filter === 'recently-added' ? 'Recently Added' : filter === 'price-low-to-high' ? 'Price - Low to High' : filter === 'price-high-to-low' ? 'Price - High to Low' : filter === 'km-high-to-low' ? 'KM Driven - High to Low' : filter === 'km-low-to-high' ? 'KM Driven - Low to High' : filterName}
                        </label>

                        {ShowRelevance ?
                            <>
                                <div onClick={CloseMobPopup} className='overlay-mob'></div>
                                <div className='mob-filter'>
                                    <div className='mob-heading'>Sort By</div>
                                    <ul className="filterListComan sortByList">

                                        <li>
                                            <input type="radio" id="relevance1" defaultValue="recently-added" defaultChecked={filter === 'recently-added' ? true : false} onChange={recenltAdded} onClick={applyAllFilters} name="relevance" />
                                            <label htmlFor="relevance1"> <span></span>Recently Added</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance2" name="relevance" defaultChecked={filter === 'price-low-to-high' ? true : false} onChange={priceLowToHigh} onClick={applyAllFilters} defaultValue="price-low-to-high" />
                                            <label htmlFor="relevance2"> <span></span>Price - Low to High</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance3" name="relevance" defaultChecked={filter === 'price-high-to-low' ? true : false} onChange={priceHighToLow} onClick={applyAllFilters} defaultValue="price-high-to-low" />
                                            <label htmlFor="relevance3"> <span></span>Price - High to Low</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance4" name="relevance" defaultChecked={filter === 'km-high-to-low' ? true : false} onChange={kmHighToLow} onClick={applyAllFilters} defaultValue="km-high-to-low" />
                                            <label htmlFor="relevance4"> <span></span>KM Driven - High to Low</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance5" name="relevance" defaultChecked={filter === 'km-low-to-high' ? true : false} onChange={kmLowToHigh} onClick={applyAllFilters} defaultValue="km-low-to-high" />
                                            <label htmlFor="relevance5"> <span></span>KM Driven - Low to High</label>
                                        </li>
                                    </ul>

                                    <div onClick={CloseMobPopup} className='mob-close'>Close</div>

                                </div>
                            </>
                            : ""
                        }

                    </div>
                </div>

                <div className="product-listing shadow-margin">
                    {productData.length <= 0 || productData === undefined || productData === '' ?
                        <>
                            <div className='no-data-found'>

                                <div className='lotie'> <Lottie animationData={noData} loop={true} /></div>

                                <h3>Sorry we couldn’t find any car matching your preference. </h3>

                                <p>Try removing some <span onClick={(e) => BrandTab()}>applied filters</span></p>

                                {/* <div className='or'>OR</div>

                            <div className="btn arrow-style blue-btn" onClick={refershAllFilters}>See all cars</div> */}

                            </div>
                            {/* <InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={noDataProduct !== undefined ? noDataProduct.length : 0} hasMore={!isReached}>
                                <div className="commonm-gap">

                                    <ul>
                                        {
                                            noDataProduct !== undefined && noDataProduct.map((product, i) => {
                                                return (<>
                                                    <ProductList key={product._id} product={product} productBanner={data.productBanner !== undefined && data.productBanner !== '' ? data.productBanner : ''} i={i} productCount={data.productCount} fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} />
                                                </>

                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </InfiniteScroll> */}

                            <NoDataProduct />
                        </>
                        : ''}


                    <InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={data !== undefined ? productData.length : 0} hasMore={!isReached}>
                        <div className="commonm-gap">

                            <ul>
                                {
                                    productData !== undefined && productData.map((product, i) => {
                                        return (
                                            <ProductList key={product._id} product={product} productBanner={data.productBanner !== undefined && data.productBanner !== '' ? data.productBanner : ''} i={i} productCount={data.productCount} fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </InfiniteScroll>
                </div>

            </div>
            {/* </WebsiteLayout> */}

        </div>
    )
}

export default Buy


export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/buy`);
    const data = await response.json();

    return {
        props: {
            page: data.cms_page ? data.cms_page : undefined
        }
    }
}


