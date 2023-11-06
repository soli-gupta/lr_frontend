import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { numberFormatter } from "@/components/Helper";
// import "./multiRangeSlider.css";

const KMsRangeSlider = ({ min, max, onChange, step, clickKMSRangeCountFilter, minKMSVal, maxKMSVal }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [kmsRangeCount, setKmsRangeCount] = useState(0);
    const [getMinKMSRange, setGetMinKMSRange] = useState(minVal);
    const [getMaxKMSRange, setGetMaxKMSRange] = useState(maxVal);
    const [checkMinKmsRange, setCheckMinYearRange] = useState(minKMSVal);
    const [checkMaxKmsRange, setCheckMaxKmsRange] = useState(maxKMSVal);


    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(checkMinKmsRange !== undefined && checkMinKmsRange !== '' ? checkMinKmsRange : minVal);
        const maxPercent = getPercent(checkMaxKmsRange !== undefined && checkMaxKmsRange !== '' ? checkMaxKmsRange : maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }



    }, [minVal, getPercent]);



    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(checkMinKmsRange !== undefined && checkMinKmsRange !== '' ? checkMinKmsRange : minValRef.current);
        const maxPercent = getPercent(checkMaxKmsRange !== undefined && checkMaxKmsRange !== '' ? checkMaxKmsRange : maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;

        }




    }, [maxVal, getPercent]);
    // console.log(min)
    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);


    const handleBtnOneKMs = () => {
        setMinVal(min);
        setMaxVal(10000);
        setKmsRangeCount(1);
        clickKMSRangeCountFilter();
        minValRef.current = min;
        maxValRef.current = 10000;
        setCheckMinYearRange('');
        setCheckMaxKmsRange('');
    }

    const handleBtnTwoKMs = () => {
        setMinVal(min);
        setMaxVal(20000);
        setKmsRangeCount(1);
        clickKMSRangeCountFilter();
        minValRef.current = min;
        maxValRef.current = 20000;
        setCheckMinYearRange('');
        setCheckMaxKmsRange('');
    }

    const handleBtnThreeKMs = () => {
        setMinVal(min);
        setMaxVal(30000);
        setKmsRangeCount(1);
        clickKMSRangeCountFilter();
        minValRef.current = min;
        maxValRef.current = 30000;
        setCheckMinYearRange('');
        setCheckMaxKmsRange('');
    }

    const handleBtnFourKMs = () => {
        setMinVal(min);
        setMaxVal(40000);
        setKmsRangeCount(1);
        clickKMSRangeCountFilter();
        minValRef.current = min;
        maxValRef.current = 40000;
        setCheckMinYearRange('');
        setCheckMaxKmsRange('');
    }

    const clickKMSRangeCount = () => {
        setKmsRangeCount(1);
        clickKMSRangeCountFilter();
    }

    const manageMinKMSHandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        setGetMinKMSRange(value);
        setCheckMinYearRange('');
    }

    const manageMaxKMSHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setGetMaxKMSRange(value);
        setCheckMaxKmsRange('');
    }

    // if (kmsRangeCount > 0) {


    //     if (getMinKMSRange === 0 && getMaxKMSRange === 10000) {
    //         const $under15Radio = document.getElementById("upto10");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("upto10");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinKMSRange === 0 && getMaxKMSRange === 20000) {
    //         const $under15Radio = document.getElementById("upto20");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("upto20");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinKMSRange === 0 && getMaxKMSRange === 30000) {
    //         const $under15Radio = document.getElementById("upto30");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("upto30");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinKMSRange === 0 && getMaxKMSRange === 40000) {
    //         const $under15Radio = document.getElementById("upto40");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("upto40");
    //         $under15Radio.checked = false;
    //     }

    // }


    return (
        <>
            <div className="custom-range">

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value min-kms" id="min-year" >{numberFormatter(checkMinKmsRange !== undefined && checkMinKmsRange !== '' ? checkMinKmsRange : minVal)}</div>
                    <div className="slider__right-value max-kms">{numberFormatter(checkMaxKmsRange !== undefined && checkMaxKmsRange !== '' ? checkMaxKmsRange : maxVal)}</div>
                </div>



                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMinKmsRange !== undefined && checkMinKmsRange !== '' ? checkMinKmsRange : minVal}
                    onChange={(event) => manageMinKMSHandler(event.target.value)}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 && "5" }}
                    id="radio-price-min" onClick={clickKMSRangeCount}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMaxKmsRange !== undefined && checkMaxKmsRange !== '' ? checkMaxKmsRange : maxVal}
                    onChange={(event) => manageMaxKMSHandler(event.target.value)}
                    className="thumb thumb--right" onClick={clickKMSRangeCount}
                />


                <input type="hidden" value={kmsRangeCount} name="kms-range-count" id="kms-range-count" />

            </div>

            <div className='filter-sugestion'>

                <h2>Suggestions</h2>

                <div className='radio-div'>
                    <input id='upto10' type="radio" onClick={handleBtnOneKMs} name="radio-group" />
                    <label htmlFor="upto10">
                        Upto 10,000 KMs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='upto20' type="radio" onClick={handleBtnTwoKMs} name="radio-group" />
                    <label htmlFor="upto20">
                        Upto 20,000 KMs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='upto30' type="radio" onClick={handleBtnThreeKMs} name="radio-group" />
                    <label htmlFor="upto30">
                        Upto 30,000 KMs

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='upto40' type="radio" onClick={handleBtnFourKMs} name="radio-group" />
                    <label htmlFor="upto40">
                        Upto 40,000 KMs

                    </label>
                </div>





            </div>

        </>
    );
};

KMsRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default KMsRangeSlider;
