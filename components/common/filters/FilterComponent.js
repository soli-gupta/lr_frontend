import KMsRangeSlider from "@/pages/rangeslider/KmsRangeSlider";
import PricerangeSlider from "@/pages/rangeslider/PircerangeSlider";
import YearRangeSlider from "@/pages/rangeslider/YearRangeSlider";
import { useEffect, useState } from "react";
import ClearAllBtn from "./ClearAllBtn";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';


function FilterComponent({ fetchBrands, fetchBodyTypes, fetchFuelTypes, productMinMax, noDataFoundOpen, BrandTab,
    PriceTab,
    BodyTab,
    FuelTab,
    YearTab,

    KmTab, FilterClose, BrandTabs, PriceTabs, BodyTabs, FuelTabs, YearTabs, KmTabTabs,
    brandSlug }) {
    const Url = process.env.NEXT_PUBLIC_URL
    const router = useRouter();

    const { brand, body_type, fuel_type, price, year, kms, availability, filter } = router.query
    let urlPrice = price ? price.split(',') : price;
    let urlYear = year ? year.split(',') : year;
    let urlKMS = kms ? kms.split(',') : kms;

    // const [BrandTabs, setBrandTabs] = useState(false);
    // const [PriceTabs, setPriceTabs] = useState(false);
    // const [BodyTabs, setBodyTabs] = useState(false);
    // const [FuelTabs, setFuelTabs] = useState(false);
    // const [YearTabs, setYearTabs] = useState(false);
    // const [KmTabTabs, setKmTabTabs] = useState(false);

    const [priceMinVal, setPriceMinVal] = useState(1000000);
    const [priceMaxVal, setPriceMaxVal] = useState(10000000);


    const applyAllFilters = (e) => {
        e.preventDefault();

        let $brandName = document.querySelectorAll('input[name="brand_name[]"]:checked');

        let brandName = [];
        $brandName.forEach((brand) => {
            brandName.push(brand.value);
        });
        let brand = '';
        if (brandName.length > 0) {
            brand = "brand=" + brandName
        }

        let $bodyType = document.querySelectorAll('input[name="body_type[]"]:checked');

        let bodyType = [];
        $bodyType.forEach((body) => {
            bodyType.push(body.value);
        });
        let body_type = '';
        if (bodyType.length > 0) {
            body_type = "&body_type=" + bodyType
        }

        let $fuelType = document.querySelectorAll('input[name="fuel_type[]"]:checked');

        let fuelType = [];
        $fuelType.forEach((fuel) => {
            fuelType.push(fuel.value);
        });
        let fuel_type = '';
        if (fuelType.length > 0) {
            fuel_type = "&fuel_type=" + fuelType
        }

        const $minVal = document.getElementsByClassName('min-price');
        const $maxPrice = document.getElementsByClassName('max-price');
        for (var i = 0; i < $minVal.length; i++) {
            var minPrice = $minVal[i].innerText;
        }
        for (var i = 0; i < $maxPrice.length; i++) {
            var maxPrice = $maxPrice[i].innerText;
        }
        let price = '';
        // const $getPriceVal = document.getElementById('price-range-count').value;
        const $getPriceVal = priceRangeCount;
        if ($getPriceVal > 0) {
            if (minPrice !== undefined && maxPrice !== undefined && $getPriceVal !== 0) {
                price = '&price=' + minPrice.replaceAll(',', '') + ',' + maxPrice.replaceAll(',', '');
            }
        }

        const $minYear = document.getElementsByClassName('min-year');
        const $maxYear = document.getElementsByClassName('max-year');
        for (var i = 0; i < $minYear.length; i++) {
            var minYear = $minYear[i].innerText;
        }
        for (var i = 0; i < $maxYear.length; i++) {
            var maxYear = $maxYear[i].innerText;
        }
        let year = '';
        const $getYearval = document.getElementById('year-range-count').value;
        if ($getYearval > 0) {

            if (minYear !== undefined && maxYear !== undefined) {
                year = '&year=' + minYear + ',' + maxYear;
            }
        }
        const $minKMs = document.getElementsByClassName('min-kms');
        const $maxKMs = document.getElementsByClassName('max-kms');
        for (var i = 0; i < $minKMs.length; i++) {
            var minKMs = $minKMs[i].innerText;
        }
        for (var i = 0; i < $maxKMs.length; i++) {
            var maxKMs = $maxKMs[i].innerText;
        }
        let kms = '';
        const $getKMsVal = document.getElementById('kms-range-count').value;
        if ($getKMsVal > 0) {

            if (minKMs !== undefined && maxKMs !== undefined) {
                kms = '&kms=' + minKMs.replaceAll(',', '') + ',' + maxKMs.replaceAll(',', '');
            }
        }

        let appliedFilter = '';
        if (filter !== undefined && filter !== '') {
            appliedFilter = '&filter=' + filter;
        }

        let appliedAvailability = ''
        if (availability !== undefined && availability !== '') {
            appliedAvailability = '&availability=' + availability;
        }

        router.push('/buy/?' + brand + body_type + fuel_type + price + year + kms + appliedAvailability + appliedFilter, null, { shallow: true })
        FilterClose();
    }



    // const [BrandTabs, setBrandTabs] = useState(false);
    // const [PriceTabs, setPriceTabs] = useState(false);
    // const [BodyTabs, setBodyTabs] = useState(false);
    // const [FuelTabs, setFuelTabs] = useState(false);
    // const [YearTabs, setYearTabs] = useState(false);
    // const [KmTabTabs, setKmTabTabs] = useState(false);

    // const BrandTab = () => {
    //     setBrandTabs(!BrandTabs)
    //     setPriceTabs(false)
    //     setBodyTabs(false)
    //     setKmTabTabs(false)
    //     setYearTabs(false)
    //     setFuelTabs(false)
    //     handleCheckBox();
    // }
    // const PriceTab = () => {
    //     setBrandTabs(false)
    //     setBodyTabs(false)
    //     setYearTabs(false)
    //     setPriceTabs(!PriceTabs)
    //     setFuelTabs(false)
    //     setKmTabTabs(false)
    //     handleCheckBox();
    // }

    // const BodyTab = () => {
    //     setBrandTabs(false)
    //     setYearTabs(false)
    //     setBodyTabs(!BodyTabs)
    //     setPriceTabs(false)
    //     setKmTabTabs(false)
    //     setFuelTabs(false)
    //     handleCheckBox();
    // }

    // const FuelTab = () => {
    //     setBrandTabs(false)
    //     setBodyTabs(false)
    //     setPriceTabs(false)
    //     setYearTabs(false)
    //     setKmTabTabs(false)
    //     setFuelTabs(!FuelTabs)
    //     handleCheckBox();
    // }

    // const YearTab = () => {
    //     setBrandTabs(false)
    //     setBodyTabs(false)
    //     setPriceTabs(false)
    //     setFuelTabs(false)
    //     setKmTabTabs(false)
    //     setYearTabs(!YearTabs)
    //     handleCheckBox();
    // }

    // const KmTab = () => {
    //     setBrandTabs(false)
    //     setBodyTabs(false)
    //     setPriceTabs(false)
    //     setFuelTabs(false)
    //     setYearTabs(false)
    //     setKmTabTabs(!KmTabTabs)
    //     handleCheckBox();
    // }

    // const FilterClose = () => {
    //     setBrandTabs(false)
    //     setBodyTabs(false)
    //     setPriceTabs(false)
    //     setFuelTabs(false)
    //     setYearTabs(false)
    //     setKmTabTabs(false)

    // }



    const [checkBrand, setCheckBrand] = useState(0);
    const [checkBodyType, setCheckBodyType] = useState(0);
    const [checkFuelType, setCheckFuelType] = useState(0);
    const [countAllFilter, setCountAllFilter] = useState(0);


    const [priceRangeCount, setPriceRangeCount] = useState(0);
    const [yearRangeCount, setYearRangeCount] = useState(0);
    const [kmsRangeCount, setKmsRangeCount] = useState(0);
    const [brandFilterCount, setBrandFilterCount] = useState(0);
    const [bodyTypeFilterCount, setBodyTypeFilterCount] = useState(0);
    const [fuelTypeFilterCount, setFuelTypeFilterCount] = useState(0);

    const handleCheckBox = (e) => {
        let $brandName = document.querySelectorAll('input[name="brand_name[]"]:checked');
        setCheckBrand($brandName.length);
        let $bodyType = document.querySelectorAll('input[name="body_type[]"]:checked');
        setCheckBodyType($bodyType.length);
        let $fuelType = document.querySelectorAll('input[name="fuel_type[]"]:checked');
        setCheckFuelType($fuelType.length);
        setBrandFilterCount($brandName.length > 0 ? 1 : 0);
        setBodyTypeFilterCount($bodyType.length > 0 ? 1 : 0);
        setFuelTypeFilterCount($fuelType.length > 0 ? 1 : 0);
    }


    const checkPriceRangeFilterCountFilter = () => {
        setPriceRangeCount(1);
        // localStorage.setItem('priceSlider', '1');
        Cookies.set('priceSlider', '1');
    }

    const clickYearRangeCountFilter = () => {
        setYearRangeCount(1);
        // localStorage.setItem('yearSlider', '1');
        Cookies.set('yearSlider', '1');
    }

    const clickKMSRangeCountFilter = () => {
        setKmsRangeCount(1);
        // localStorage.setItem('kmsSlider', '1');
        Cookies.set('kmsSlider', '1');
    }

    if (urlPrice !== undefined && urlPrice !== '' && urlPrice.length > 0) {
        // localStorage.setItem('priceSlider', '1');
        Cookies.set('priceSlider', '1');
    }

    if (urlYear !== undefined && urlYear !== '' && urlYear.length > 0) {
        // localStorage.setItem('yearSlider', '1');
        Cookies.set('yearSlider', '1');
    }

    if (urlKMS !== undefined && urlKMS !== '' && urlKMS.length > 0) {
        // localStorage.setItem('kmsSlider', '1');
        Cookies.set('kmsSlider', '1');
    }


    const handlePriceRange = (e) => { }
    const handleYearRange = (e) => { }
    const handleKMsRange = (e) => { }



    const resetFormValues = () => {
        document.getElementById('homepage-filter').reset();
        let $brandName = document.querySelectorAll('input[name="brand_name[]"]');
        $brandName.checked = false;
        let $bodyType = document.querySelectorAll('input[name="body_type[]"]');
        $bodyType.checked = false
        let $fuelType = document.querySelectorAll('input[name="fuel_type[]"]:checked');
        $fuelType.checked = false;
        setCheckBrand(0);
        setCheckBodyType(0);
        setCheckFuelType(0);
        setPriceRangeCount(0);
        setYearRangeCount(0);
        setKmsRangeCount(0);
        setBrandFilterCount(0);
        setBodyTypeFilterCount(0);
        setFuelTypeFilterCount(0);

        fetchBrands !== undefined && fetchBrands.data !== undefined && fetchBrands.data.brands.map((brand) => {
            brand.isChecked = false
            return brand;
        });
        fetchBodyTypes !== undefined && fetchBodyTypes.data !== undefined && fetchBodyTypes.data.body_type.map((bodyT) => {
            bodyT.isChecked = false;
            return bodyT;
        });

        fetchFuelTypes !== undefined && fetchFuelTypes.data !== undefined && fetchFuelTypes.data.fuel_type.map((fuelT) => {
            fuelT.isChecked = false;
            return fuelT;
        });

        setPriceMinVal(1000000);
        setPriceMaxVal(10000000);

        // localStorage.getItem('priceSlider') ? localStorage.removeItem('priceSlider') : ''
        // localStorage.getItem('yearSlider') ? localStorage.removeItem('yearSlider') : ''
        // localStorage.getItem('kmsSlider') ? localStorage.removeItem('kmsSlider') : ''

        // localStorage.removeItem('priceSlider');
        // localStorage.removeItem('yearSlider');
        // localStorage.removeItem('kmsSlider');

        setTimeout(() => {
            Cookies.remove('priceSlider');
            Cookies.remove('yearSlider');
            Cookies.remove('kmsSlider');
            router.reload(router.pathname);
        }, 300);


        // router.pathname === '/buy/[brandSlug]' || router.pathname === '/buy' ? router.replace('/buy') : router.replace(router.pathname);
        router.pathname === '/used-luxury-cars/[brandSlug]' || router.pathname === '/buy' ? router.replace('/buy') : router.replace(router.pathname);
    }

    useEffect(() => {
        handleCheckBox();
        if (typeof window !== 'undefined' && Cookies.get('priceSlider')) {
            //localStorage.getItem('priceSlider')
            setPriceRangeCount(1);
        }
        if (typeof window !== 'undefined' && Cookies.get('yearSlider')) {
            // localStorage.getItem('yearSlider')
            setYearRangeCount(1);
        }
        if (typeof window !== 'undefined' && Cookies.get('kmsSlider')) {
            // localStorage.getItem('kmsSlider')
            setKmsRangeCount(1);
        }
        if (brandSlug) {
            setCheckBrand(1);
            setBrandFilterCount(1);
        }
    }, [checkBrand, priceRangeCount]);

    return (
        <div className="filterSec">
            <div className="filters">
                <div className="filtersTaber">
                    <div className={`allFilterBtn ${brandFilterCount !== 0 || priceRangeCount !== 0 || bodyTypeFilterCount !== 0 || fuelTypeFilterCount !== 0 || yearRangeCount !== 0 || kmsRangeCount !== 0 ? 'selcted' : ''} `}>

                        <i onClick={BrandTab}>
                            <span>

                                {brandFilterCount !== 0 || priceRangeCount !== 0 || bodyTypeFilterCount !== 0 || fuelTypeFilterCount !== 0 || yearRangeCount !== 0 || kmsRangeCount !== 0 ? brandFilterCount + priceRangeCount + bodyTypeFilterCount + fuelTypeFilterCount + yearRangeCount + kmsRangeCount : ''}

                            </span>
                            Filters
                        </i>
                        {brandFilterCount !== 0 || priceRangeCount !== 0 || bodyTypeFilterCount !== 0 || fuelTypeFilterCount !== 0 || yearRangeCount !== 0 || kmsRangeCount !== 0 ? <div style={{ zIndex: "2" }} className="closeBtn" onClick={resetFormValues}></div> : ''}


                    </div>
                    <ul className="tablist">
                        <li onClick={BrandTab} className={`${BrandTabs ? "active " : ""}`} >
                            <span>
                                {checkBrand !== 0 ? <i>{checkBrand}</i> : ''}
                                Brand
                            </span>
                        </li>
                        <li onClick={PriceTab} className={`${PriceTabs ? "active" : ""}`}>
                            <span>
                                {priceRangeCount !== 0 ? <i>{priceRangeCount}</i> : ''}
                                Price Range
                            </span>
                        </li>
                        <li onClick={BodyTab} className={`${BodyTabs ? "active" : ""}`} ><span>
                            {checkBodyType !== 0 ? <i>{checkBodyType}</i> : ''}
                            Body Type
                        </span></li>
                        <li onClick={FuelTab} className={`${FuelTabs ? "active" : ""}`} ><span>
                            {checkFuelType !== 0 ? <i>{checkFuelType}</i> : ''}
                            Fuel</span></li>
                        <li onClick={YearTab} className={`${YearTabs ? "active" : ""}`}>
                            <span>
                                {yearRangeCount !== 0 ? <i>{yearRangeCount}</i> : ''}
                                Year
                            </span>
                        </li>
                        <li onClick={KmTab} className={`${KmTabTabs ? "active" : ""}`}>
                            <span>
                                {kmsRangeCount !== 0 ? <i>{kmsRangeCount}</i> : ''}
                                KMs Driven
                            </span>
                        </li>
                    </ul>
                    <div className={`${BrandTabs || PriceTabs || BodyTabs || FuelTabs || YearTabs || KmTabTabs ? "showHide" : ""} tabcontainer allTabcontainer`}>
                        <div className='overlay-mob' onClick={FilterClose}></div>
                        <div className="mob-style-fil">
                            <div className='mob-heading'>Filters</div>

                            <ul className="tablist-left">
                                <li className={`${BrandTabs ? "active" : ""}`} ><span onClick={BrandTab}><i>Brand</i></span></li>
                                <li className={`${PriceTabs ? "active" : ""}`}><span onClick={PriceTab}><i>Price Range</i></span></li>
                                <li className={`${BodyTabs ? "active" : ""}`} ><span onClick={BodyTab}><i>Body Type</i></span></li>
                                <li className={`${FuelTabs ? "active" : ""}`} ><span onClick={FuelTab}><i>Fuel</i></span></li>
                                <li className={`${YearTabs ? "active" : ""}`}><span onClick={YearTab}><i>Year</i></span></li>
                                <li className={`${KmTabTabs ? "active" : ""}`}><span onClick={KmTab}><i>KMs Driven</i></span></li>
                            </ul>


                            <form onSubmit={applyAllFilters} id="homepage-filter">


                                <div id="tab1" className={`${BrandTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />
                                    <h2>All Brands</h2>
                                    <div className="car-data">

                                        <div className='brands'>

                                            {
                                                brandSlug ? <>
                                                    {
                                                        fetchBrands.data && fetchBrands.data.brands.map((brand, i) => {
                                                            return (
                                                                <div className="form-group" key={brand.slug}>
                                                                    <input type="checkbox" id={`brand_${brand.slug}`} className="brandBtn" onChange={handleCheckBox} name="brand_name[]" defaultValue={brand.slug} defaultChecked={brand.isChecked !== undefined && brand.isChecked !== '' ? brand.isChecked : brandSlug !== undefined && brandSlug !== '' && brandSlug === brand.slug ? true : false} />
                                                                    <label htmlFor={`brand_${brand.slug}`}>
                                                                        <div>
                                                                            <img src={`${Url}${brand.logo}`} />
                                                                            <span>{brand.name}</span>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                                    : <>
                                                        {
                                                            fetchBrands.data && fetchBrands.data.brands.map((brand, i) => {
                                                                return (
                                                                    <div className="form-group" key={brand.slug}>
                                                                        <input type="checkbox" id={`brand_${brand.slug}`} className="brandBtn" onChange={handleCheckBox} name="brand_name[]" defaultValue={brand.slug} defaultChecked={brand.isChecked !== undefined && brand.isChecked !== '' ? brand.isChecked : brandSlug !== undefined && brandSlug !== '' && brandSlug === brand.slug ? true : false} />
                                                                        <label htmlFor={`brand_${brand.slug}`}>
                                                                            <div>
                                                                                <img src={`${Url}${brand.logo}`} />
                                                                                <span>{brand.name}</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </>



                                            }



                                        </div>
                                    </div>
                                </div>
                                <div id="tab2" className={`${PriceTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />

                                    <div className="car-data">

                                        <h2>Select Price Range (INR)</h2>

                                        <PricerangeSlider
                                            min={priceMinVal}
                                            max={priceMaxVal}
                                            step={100000}
                                            onChange={handlePriceRange} checkPriceRangeFilterCountFilter={checkPriceRangeFilterCountFilter}
                                            minPriceVal={urlPrice !== undefined && urlPrice[0] !== undefined ? urlPrice[0] : ''}
                                            maxPriceVal={urlPrice !== undefined && urlPrice[1] !== undefined ? urlPrice[1] !== '1Cr ' ? urlPrice[1] : urlPrice[1] === '1Cr ' ? '1Cr' : '' : ''}
                                        />
                                    </div>
                                </div>
                                <div id="tab3" className={`${BodyTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />
                                    <h2>Select Body Type</h2>
                                    <div className="car-data">

                                        <div className='brands'>

                                            {
                                                fetchBodyTypes.data && fetchBodyTypes.data.body_type.map((bodyType) => {
                                                    return (
                                                        <div className="form-group body-type" key={bodyType.body_slug}>
                                                            <input type="checkbox" id={`body_${bodyType.body_slug}`} onChange={handleCheckBox} defaultChecked={bodyType.isChecked !== undefined && bodyType.isChecked !== '' ? bodyType.isChecked : ''} defaultValue={bodyType.body_slug} name="body_type[]" />
                                                            <label htmlFor={`body_${bodyType.body_slug}`}> <p> <span>{bodyType.body_name}</span>
                                                                <img src={`${Url}${bodyType.body_image}`} /></p></label>
                                                        </div >
                                                    )
                                                })
                                            }
                                        </div >


                                    </div >
                                </div >
                                <div id="tab4" className={`${FuelTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />
                                    <h2>Select Fuel Type</h2>
                                    <div className="car-data">

                                        <div className='brands'>

                                            {
                                                fetchFuelTypes.data && fetchFuelTypes.data.fuel_type.map((fuel) => {
                                                    return (
                                                        <div className="form-group body-type" key={fuel.fuel_slug}>
                                                            <input type="checkbox" id={`fuel_${fuel.fuel_slug}`} onChange={handleCheckBox} defaultChecked={fuel.isChecked !== undefined && fuel.isChecked !== '' && fuel.isChecked !== false ? fuel.isChecked : ''} defaultValue={fuel.fuel_slug} name="fuel_type[]" />
                                                            <label htmlFor={`fuel_${fuel.fuel_slug}`}>
                                                                <p> <img src={`${Url}${fuel.fuel_image}`} />
                                                                    <span>{fuel.fuel_name}</span>
                                                                </p>
                                                            </label>
                                                        </div >
                                                    )
                                                })
                                            }
                                        </div >


                                    </div >
                                </div >
                                <div id="tab5" className={`${YearTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />
                                    <div className="car-data">

                                        <h2>Select Model Year</h2>

                                        <YearRangeSlider
                                            min={2013}
                                            max={2023}
                                            step={1}
                                            onChange={handleYearRange} clickYearRangeCountFilter={clickYearRangeCountFilter}
                                            minYearVal={urlYear !== undefined && urlYear !== '' ? urlYear[0] : ''}
                                            maxYearVal={urlYear !== undefined && urlYear !== '' ? urlYear[1] : ''}
                                        />


                                    </div>
                                </div>
                                <div id="tab6" className={`${KmTabTabs ? "showHide" : ""} tabscont`}>
                                    <ClearAllBtn resetFormValues={resetFormValues} />
                                    <div className="car-data">

                                        <h2>Select KMs Range</h2>

                                        <KMsRangeSlider
                                            min={0}
                                            max={40000}
                                            step={1000}
                                            onChange={handleKMsRange} clickKMSRangeCountFilter={clickKMSRangeCountFilter}
                                            minKMSVal={urlKMS !== undefined && urlKMS !== '' ? urlKMS[0] : ''}
                                            maxKMSVal={urlKMS !== undefined && urlKMS !== '' ? urlKMS[1] : ''}
                                        />



                                    </div>


                                </div>

                                <div className="btnGroup">
                                    <button type="button" onClick={FilterClose} className="btn inactiveBtn btnSml allFilterCloseBtn">Close</button>
                                    <button className="btn btnSml">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default FilterComponent;