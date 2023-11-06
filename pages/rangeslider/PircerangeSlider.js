import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { numberFormatter } from "@/components/Helper";
// import "./multiRangeSlider.css";

const PricerangeSlider = ({ min, max, onChange, step, checkPriceRangeFilterCountFilter, minPriceVal, maxPriceVal }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    let minValRef = useRef(min);
    let maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [priceRangeCount, setPriceRangeCount] = useState(0);
    const [getMinPriceVal, setgetMinPriceVal] = useState(minVal);
    const [getMaxPriceVal, setGetMaxPriceVal] = useState(maxVal);
    const [checkCrPrice, setCheckCrPrice] = useState(true);
    const [checkMinPriceVal, setCheckMinPriceVal] = useState(minPriceVal);
    const [checkMaxPriceVal, setCheckMaxPriceVal] = useState(maxPriceVal)

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );


    const handleBtnOnePrice = () => {
        setMinVal(min);
        setMaxVal(1500000);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);
        // setCheckMaxPriceVal(1500000);
        setCheckMaxPriceVal(1500000);
        setCheckMinPriceVal(min);
        minValRef.current = min;
        maxValRef.current = 1500000;
    }

    const handleBtnTwoPrice = () => {
        setMinVal(1500000);
        setMaxVal(2500000);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);

        setCheckMinPriceVal(1500000);
        setCheckMaxPriceVal(2500000);

        minValRef.current = 1500000;
        maxValRef.current = 2500000;
    }

    const handleBtnThreePrice = () => {
        setMinVal(2500000);
        setMaxVal(3500000);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);
        setCheckMinPriceVal(2500000);
        setCheckMaxPriceVal(3500000);
        minValRef.current = 2500000;
        maxValRef.current = 3500000;
    }

    const handleBtnFourPrice = () => {
        setMinVal(3500000);
        setMaxVal(4500000);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);
        setCheckMinPriceVal(3500000);
        setCheckMaxPriceVal(4500000);
        minValRef.current = 3500000;
        maxValRef.current = 4500000;
    }

    const handleBtnFivePrice = () => {
        setMinVal(4500000);
        setMaxVal(5500000);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);
        setCheckMinPriceVal(4500000);
        setCheckMaxPriceVal(5500000);
        minValRef.current = 4500000;
        maxValRef.current = 5500000;
    }

    const handleBtnSixPrice = () => {
        setMinVal(5000000);
        setMaxVal(max);
        checkPriceRangeFilterCountFilter();
        setPriceRangeCount(1);
        setCheckCrPrice(false);
        setCheckMinPriceVal(5000000);
        setCheckMaxPriceVal(max);
        minValRef.current = 5000000;
        maxValRef.current = max;
        console.log(max)
    }


    const checkPriceRangeFilterCount = () => {
        setPriceRangeCount(1);
        checkPriceRangeFilterCountFilter();
        setCheckCrPrice(false);
        // setCheckMinPriceVal(minVal);
    }

    const clickMinPriceRangeSliderHandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        // console.log(minValRef.current);
        setCheckMinPriceVal('');
        maxPriceVal = value;
        setgetMinPriceVal(value);
        setPriceRangeCount(1);
        // setCheckCrPrice(false);
        // setCheckMinPriceVal(minVal);
    }

    const clickMaxPricerangeSliderHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setCheckMaxPriceVal('')
        setGetMaxPriceVal(value);
        // console.log(maxValRef.current)
        setPriceRangeCount(1);
        // setCheckCrPrice(false);
        // setCheckMinPriceVal(minVal);
    }
    // if (priceRangeCount > 0) {


    // console.log('checkMinPriceVal : ', checkMinPriceVal)
    // console.log('checkMaxPriceVal : ', checkMaxPriceVal)
    // if (getMinPriceVal >= 1000000 && getMaxPriceVal <= 1500000 || checkMinPriceVal >= 1000000 && checkMaxPriceVal <= 1500000) {
    //     const $under15Radio = document.getElementById("under15");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("under15");
    //     if ($under15Radio) {

    //         $under15Radio.checked = false;
    //     }
    // }

    // if (getMinPriceVal >= 1500000 && getMaxPriceVal <= 2500000 || checkMinPriceVal >= 1500000 && checkMaxPriceVal <= 2500000) {
    //     const $under15Radio = document.getElementById("15-25");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("15-25");
    //     if ($under15Radio) {
    //         $under15Radio.checked = false;
    //     }
    // }

    // if (getMinPriceVal >= 2500000 && getMaxPriceVal <= 3500000 || checkMinPriceVal >= 2500000 && checkMaxPriceVal <= 3500000) {
    //     const $under15Radio = document.getElementById("25-35");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("25-35");
    //     if ($under15Radio) {
    //         $under15Radio.checked = false;
    //     }
    // }

    // if (getMinPriceVal >= 3500000 && getMaxPriceVal <= 4500000 || checkMinPriceVal >= 3500000 && checkMaxPriceVal <= 4500000) {
    //     const $under15Radio = document.getElementById("35-45");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("35-45");
    //     if ($under15Radio) {
    //         $under15Radio.checked = false;
    //     }
    // }

    // if (getMinPriceVal >= 4500000 && getMaxPriceVal <= 5500000 || checkMinPriceVal >= 4500000 && checkMaxPriceVal <= 5500000) {
    //     const $under15Radio = document.getElementById("45-55");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("45-55");
    //     if ($under15Radio) {
    //         $under15Radio.checked = false;
    //     }
    // }

    // if (getMinPriceVal >= 5500000 && getMaxPriceVal >= 5500000 || checkMinPriceVal >= 5500000 && checkMaxPriceVal <= 5500000) {
    //     const $under15Radio = document.getElementById("above50");
    //     if ($under15Radio) {
    //         $under15Radio.checked = true;
    //     }
    // }
    // else {
    //     const $under15Radio = document.getElementById("above50");
    //     if ($under15Radio) {
    //         $under15Radio.checked = false;
    //     }
    // }
    // }

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(checkMinPriceVal !== undefined && checkMinPriceVal !== '' ? checkMinPriceVal : minVal);
        const maxPercent = getPercent(checkMaxPriceVal !== undefined && checkMaxPriceVal !== '' ? checkMaxPriceVal === '1Cr' ? checkMaxPriceVal : checkMaxPriceVal : maxValRef.current);
        console.log
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

    }, [minVal, getPercent, minValRef, maxValRef, checkPriceRangeFilterCountFilter]);

    // console.log(checkMaxPriceVal === '1Cr' ? checkMaxPriceVal : checkMaxPriceVal);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(checkMinPriceVal !== undefined && checkMinPriceVal !== '' ? checkMinPriceVal : minValRef.current);
        const maxPercent = getPercent(checkMaxPriceVal !== undefined && checkMaxPriceVal !== '' ? checkMaxPriceVal === '1Cr' ? maxVal : checkMaxPriceVal : maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent, minValRef.current, maxValRef.current, checkPriceRangeFilterCountFilter]);

    // Get min and max values when their state changes


    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange, checkPriceRangeFilterCountFilter]);



    return (
        <>
            <div className="custom-range">

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value min-price" id="min-price" >{numberFormatter(checkMinPriceVal !== undefined && checkMinPriceVal !== '' ? checkMinPriceVal : minVal)}</div>
                    <div className="slider__right-value max-price">
                        {checkMaxPriceVal !== undefined && checkMaxPriceVal !== '' ? checkMaxPriceVal !== '1Cr' ? numberFormatter(checkMaxPriceVal) : '1Cr+' : maxVal === 10000000 ? '1Cr+' : maxVal}
                        {/* {checkCrPrice === false ? maxPriceVal !== undefined && maxPriceVal !== '' ? maxPriceVal !== '1Cr+' ? numberFormatter(maxPriceVal) : '1Cr+' : maxVal : '1Cr+'} */}
                        {/* {checkCrPrice === false ? numberFormatter(maxPriceVal !== undefined && maxPriceVal !== '' ? maxPriceVal : maxVal) : maxPriceVal !== '1Cr+' ? maxPriceVal : '1Cr+'} */}
                    </div>
                </div>
                {/* {console.log(maxPriceVal)}
                {console.log(checkCrPrice)} */}
                {/* checkMinPriceVal !== undefined && checkMinPriceVal !== '' ? checkMinPriceVal :  */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMinPriceVal !== undefined && checkMinPriceVal !== '' ? checkMinPriceVal : minVal}
                    onChange={(event) => clickMinPriceRangeSliderHandler(event.target.value)}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 && "5" }}
                    id="radio-price-min" onClick={checkPriceRangeFilterCount}
                />
                {/* maxPriceVal !== undefined && maxPriceVal !== '' ? maxPriceVal :  */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMaxPriceVal !== undefined && checkMaxPriceVal !== '' ? checkMaxPriceVal !== '1Cr' ? checkMaxPriceVal : 10000000 : maxVal}
                    onChange={(event) => clickMaxPricerangeSliderHandler(event.target.value)}
                    className="thumb thumb--right" onClick={checkPriceRangeFilterCount}
                />

                <input type="hidden" value={checkMinPriceVal === undefined && checkMinPriceVal === '' && checkMaxPriceVal === undefined && checkMaxPriceVal === '' ? priceRangeCount : 1} name="price-range-count" id="price-range-count" />


            </div>

            <div className='filter-sugestion'>

                <h2>Suggestions</h2>

                <div className='radio-div'>
                    <input id='under15' type="radio" onClick={handleBtnOnePrice} name="radio-price" />
                    <label htmlFor="under15">
                        Under 15 Lakhs
                    </label>
                </div>

                <div className='radio-div'>
                    <input id='15-25' type="radio" onClick={handleBtnTwoPrice} name="radio-price" />
                    <label htmlFor="15-25">
                        15-25 Lakhs
                    </label>
                </div>

                <div className='radio-div'>
                    <input id='25-35' type="radio" onClick={handleBtnThreePrice} name="radio-price" />
                    <label htmlFor="25-35">
                        25-35 Lakhs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='35-45' type="radio" onClick={handleBtnFourPrice} name="radio-price" />
                    <label htmlFor="35-45">
                        35-45 Lakhs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='45-55' type="radio" onClick={handleBtnFivePrice} name="radio-price" />
                    <label htmlFor="45-55">
                        45-55 Lakhs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='above50' type="radio" onClick={handleBtnSixPrice} name="radio-price" />
                    <label htmlFor="above50">
                        50 Lakhs & Above

                    </label>
                </div>

            </div>

        </>
    );
};

PricerangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PricerangeSlider;
