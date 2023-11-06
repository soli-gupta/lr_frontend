import React, { useState, useRef, useEffect } from 'react';

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
import { useRouter } from 'next/router';
import ProductList from '@/components/products';
import { numberFormatter } from '@/components/Helper';
import KMsRangeSlider from '../rangeslider/KmsRangeSlider';
import PricerangeSlider from '../rangeslider/PircerangeSlider';
import YearRangeSlider from '../rangeslider/YearRangeSlider';
import FilterComponent from '@/components/common/filters/FilterComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRInfinite from 'swr/infinite';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Loader from '@/components/common/Loader';
import Lottie from "lottie-react";
import noData from "@/public/lotie-icons/not-data-found.json"
import Link from 'next/link';
import NoDataProduct from '@/components/products/noDataProduct';
import PixelLoader from '@/components/PixelLoader';
import Head from 'next/head';


const fetcher = (url) => axios.get(url).then(res => res.data);





function Buy({ page, pageBrand }) {

    const router = useRouter();
    const Url = process.env.NEXT_PUBLIC_URL;

    const { brandSlug } = router.query;

    const fetchBrands = useSWR(`${Url}fetch-all-brands`, fetcher);
    const fetchBodyTypes = useSWR(`${Url}fetch-all-body-type`, fetcher);
    const fetchFuelTypes = useSWR(`${Url}fetch-all-fuel-type`, fetcher);
    const fetchLatestProducts = useSWR(`${Url}fetch-homepage-products`, fetcher);
    const fetchExperienceCenter = useSWR(`${Url}fetch-experience-center`, fetcher);

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
    const [filterName, setFiltername] = useState('Price - High to Low');
    const [availableFilter, setAvailableFilter] = useState('All Cars');

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

    var productData = [];

    const getAllProductsAfterNoDataFound = async () => {


        // console.log(productData && productData.length)
        // console.log(productData === undefined)

        if (productData.length <= 0 || productData === undefined || productData === '') {
            // setNoDataProduct
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
        getAllProductsAfterNoDataFound();
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => {
                setScroll(window.scrollY > 10)
            })
        }

        if (typeof window !== "undefined") {
            document.body.classList.add('header-No-Scroll');

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


        return () => {
            if (typeof window !== "undefined") {
                document.body.classList.remove('header-No-Scroll');

            }

        }


    }, []);


    const { brand, body_type, fuel_type, price, year, kms, availability, filter } = router.query


    let getBrandSlug = '';
    let brandSlugsVal = ''
    if (brand !== '' && brand !== undefined && brand.length > 0) {
        getBrandSlug = 'brands=' + brand;
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
    // const { data, error } = useSWR(`${Url}buy-products/${brandSlug}`, fetcher);

    const { data: createFlatArray, mutate, size, setSize, isValidating, isLoading, error } = useSWRInfinite((index) => {
        const aofs = parseInt(index) + parseInt(1);
        return `${Url}buy-products/${brandSlug}?${getFilters}${getAvailability}`
    }
        , fetcher);



    // ?` + brandSlug + bodyType + fuelType + searchPrice + searchYear + searchKMs, fetcher


    // console.log(`${Url}/buy/?` + brandSlug + '&' + bodyType + '&' + fuelType + '&' + searchPrice + '&' + searchYear + '&' + searchKMs)

    const [checkBrand, setCheckBrand] = useState(false);
    const [checkBodyType, setCheckBodyType] = useState(false);



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
        //     if (minPrice !== undefined && maxPrice !== undefined) {
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
        // FilterClose()


        let appliedBrand = '';
        if (brand !== '' && brand !== undefined && brand.length > 0) {
            appliedBrand = 'brand=' + brand;
        }

        let appliedBodyType = '';
        if (body_type !== '' && body_type !== undefined && body_type.length > 0) {
            appliedBodyType = '&body_type=' + body_type;
        }

        let appliedFuelType = '';
        if (fuel_type !== '' && fuel_type !== undefined && fuel_type.length > 0) {
            appliedFuelType = '&fuel_type=' + fuel_type;
        }

        let appliedPrice = '';
        if (price !== '' && price !== undefined && price.length > 0) {
            appliedPrice = '&price=' + price;
        }

        let appliedYear = '';
        if (year !== '' && year !== undefined && year.length > 0) {
            appliedYear = '&year=' + year;
        }

        let appliedKMs = '';
        if (kms !== '' && kms !== undefined && kms.length > 0) {
            appliedKMs = '&kms=' + kms;
        }
        let getAvailability = '';
        if (availability !== '' && availability !== undefined && availability.length > 0) {
            getAvailability = '&availability=' + availability;
        }
        let getFilters = '';
        if (filter !== '' && filter !== undefined && filter.length > 0) {
            getFilters = '&filter=' + filter;
        }

        let appliedFilter = '';
        const $getCheckedFilter = document.querySelectorAll('input[name=relevance]:checked');
        if ($getCheckedFilter.length > 0) {
            appliedFilter = '&filter=' + $getCheckedFilter[0].value;
        }

        let appliedAvailability = ''
        const $getCheckedAvailability = document.querySelectorAll('input[name=AvailableCars]:checked');
        if ($getCheckedAvailability.length > 0) {
            appliedAvailability = '&availability=' + $getCheckedAvailability[0].value;
        }

        if (brandSlug !== undefined && brandSlug !== '') {
            appliedBrand = 'brand=' + brandSlug;
        }

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

    const seeAllCarsBtn = () => {
        router.push('/buy');
    }


    const CloseMobPopup = () => {

        setShowRelevance(false)
        setShowAvailable(false)

    }

    let pageHead = <Head>
        <title>{`${pageBrand !== undefined ? pageBrand.page_title : page.page_title} | Luxury Ride`}</title>
        {/* <meta name="description" content="Generated by create next app" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}

        <link href="/img/lr-favicon.ico" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/img/lr-favicon-dark.ico" rel="icon" media="(prefers-color-scheme: dark)" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"></link>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />

        <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' defer />

        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js" defer></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"
        />

        <meta property="og:site_name" content="luxuryride.in" key="og-site" />
        <meta property="og:type" content="website" />
        <meta name="description" content={pageBrand !== undefined ? pageBrand.meta_description : ''} />

    </Head>


    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!createFlatArray) return <Loader loaderTitle={'Loading...'} />;

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

    var productData = [].concat.apply([], createFlatArray.map(x => x.products))
    // const isReached = productData && productData[productData - 1]?.length < 6;
    const isReached = productData && productData.length === data.productCount;
    const loadingMore = productData && typeof productData[size - 1] === "undefined";


    // brandDetail
    return (
        <div>
            {/* <WebHead pageTitle={data !== undefined && data.brandDetail ? data.brandDetail.page_title : page.page_title} /> */}
            {/* <PixelLoader /> */}
            {/* <WebsiteLayout> */}

            {pageHead}

            <nav className='breadcrum-main' aria-label="breadcrumb">
                <div className="wrapper">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
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

                    <FilterComponent applyAllFilters={applyAllFilters} fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} BrandTab={BrandTab}
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
                        brandSlug={brandSlug} />


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

                        {/* {ShowRelevance ?

                            <ul className="filterListComan sortByList">

                                <li>
                                    <input type="radio" id="relevance1" value="recently-added" defaultChecked={filter === 'recently-added' ? true : false} onChange={recenltAdded} onClick={applyAllFilters} name="relevance" />
                                    <label htmlFor="relevance1"> <span></span>Recently Added</label>
                                </li>
                                <li>
                                    <input type="radio" id="relevance2" name="relevance" defaultChecked={filter === 'price-low-to-high' ? true : false} onChange={priceLowToHigh} onClick={applyAllFilters} value="price-low-to-high" />
                                    <label htmlFor="relevance2"> <span></span>Price - Low to High</label>
                                </li>
                                <li>
                                    <input type="radio" id="relevance3" name="relevance" defaultChecked={filter === 'price-high-to-low' ? true : false} onChange={priceHighToLow} onClick={applyAllFilters} value="price-high-to-low" />
                                    <label htmlFor="relevance3"> <span></span>Price - High to Low</label>
                                </li>
                                <li>
                                    <input type="radio" id="relevance4" name="relevance" defaultChecked={filter === 'km-high-to-low' ? true : false} onChange={kmHighToLow} onClick={applyAllFilters} value="km-high-to-low" />
                                    <label htmlFor="relevance4"> <span></span>KM Driven - High to Low</label>
                                </li>
                                <li>
                                    <input type="radio" id="relevance5" name="relevance" defaultChecked={filter === 'km-low-to-high' ? true : false} onChange={kmLowToHigh} onClick={applyAllFilters} value="km-low-to-high" />
                                    <label htmlFor="relevance5"> <span></span>KM Driven - Low to High</label>
                                </li>
                            </ul>
                            : ""
                        } */}

                        {ShowRelevance ?
                            <>
                                <div onClick={CloseMobPopup} className='overlay-mob'></div>
                                <div className='mob-filter'>
                                    <div className='mob-heading'>Sort By</div>
                                    <ul className="filterListComan sortByList">

                                        <li>
                                            <input type="radio" id="relevance1" value="recently-added" defaultChecked={filter === 'recently-added' ? true : false} onChange={recenltAdded} onClick={applyAllFilters} name="relevance" />
                                            <label htmlFor="relevance1"> <span></span>Recently Added</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance2" name="relevance" defaultChecked={filter === 'price-low-to-high' ? true : false} onChange={priceLowToHigh} onClick={applyAllFilters} value="price-low-to-high" />
                                            <label htmlFor="relevance2"> <span></span>Price - Low to High</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance3" name="relevance" defaultChecked={filter === 'price-high-to-low' ? true : false} onChange={priceHighToLow} onClick={applyAllFilters} value="price-high-to-low" />
                                            <label htmlFor="relevance3"> <span></span>Price - High to Low</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance4" name="relevance" defaultChecked={filter === 'km-high-to-low' ? true : false} onChange={kmHighToLow} onClick={applyAllFilters} value="km-high-to-low" />
                                            <label htmlFor="relevance4"> <span></span>KM Driven - High to Low</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="relevance5" name="relevance" defaultChecked={filter === 'km-low-to-high' ? true : false} onChange={kmLowToHigh} onClick={applyAllFilters} value="km-low-to-high" />
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

                                <p>Try removing some <span onClick={BrandTab}>applied filters</span></p>
                                {/* 
                            <div className='or'>OR</div>
                            
                        <div className="btn arrow-style blue-btn" onClick={seeAllCarsBtn}>See all cars</div> */}

                            </div>
                            <NoDataProduct />

                        </>
                        : <InfiniteScroll next={() => setSize(size + parseInt(1))} loader={<h6>Loading</h6>} endMessage={''} dataLength={productData !== undefined ? productData.length : 0} hasMore={!isReached}>
                            <div className="commonm-gap">

                                <ul>
                                    {
                                        productData !== undefined && productData.map((product, i) => {
                                            return (<>
                                                <ProductList key={product._id} product={product} productBanner={data.productBanner ? data.productBanner : ''} i={i} productCount={data.productCount} fetchBrands={fetchBrands} fetchBodyTypes={fetchBodyTypes} fetchFuelTypes={fetchFuelTypes} />
                                            </>

                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </InfiniteScroll>}



                </div>
            </div>

            {/* </WebsiteLayout> */}

        </div>
    )
}

export default Buy


export async function getServerSideProps({ params }) {
    const { brandSlug } = params
    const API_URL = process.env.NEXT_PUBLIC_URL

    const response = await fetch(`${API_URL}cms-page/buy`);
    const data = await response.json();

    const getBrandDetails = await fetch(`${API_URL}fetch-brand-detailsfor-page/${brandSlug}`);
    const brandResponse = await getBrandDetails.json();
    return {
        props: {
            page: data.cms_page,
            pageBrand: brandResponse.brand
        }
    }
}