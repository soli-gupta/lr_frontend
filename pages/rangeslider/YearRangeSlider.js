import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import "./multiRangeSlider.css";

const YearRangeSlider = ({ min, max, onChange, step, clickYearRangeCountFilter, minYearVal, maxYearVal }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [yearRangeCount, setYearRangeCount] = useState(0);
    const [getMinYearVal, setGetMinYearVal] = useState(minVal);
    const [getMaxYearVal, setGetMaxYearVal] = useState(maxVal);
    const [checkMinYearVal, setCheckMinYearVal] = useState(minYearVal);
    const [checkMaxYearVal, setCheckMaxYearVal] = useState(maxYearVal);


    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(checkMinYearVal !== undefined && checkMinYearVal !== '' ? checkMinYearVal : minVal);
        const maxPercent = getPercent(checkMaxYearVal !== undefined && checkMaxYearVal !== '' ? checkMaxYearVal : maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }



    }, [minVal, getPercent]);



    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(checkMinYearVal !== undefined && checkMinYearVal !== '' ? checkMinYearVal : minValRef.current);
        const maxPercent = getPercent(checkMaxYearVal !== undefined && checkMaxYearVal !== '' ? checkMaxYearVal : maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;

        }




    }, [maxVal, getPercent]);
    // console.log(min)
    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);


    const handleBtnOneYear = () => {
        setMinVal(2021);
        setMaxVal(max);
        setYearRangeCount(1);
        clickYearRangeCountFilter();
        minValRef.current = 2021;
        maxValRef.current = max;
        setCheckMinYearVal('');
        setCheckMaxYearVal('');
    }

    const handleBtnTwoYear = () => {
        setMinVal(2019);
        setMaxVal(max);
        setYearRangeCount(1);
        clickYearRangeCountFilter();
        minValRef.current = 2019;
        maxValRef.current = max;
        setCheckMinYearVal('');
        setCheckMaxYearVal('');
    }

    const handleBtnThreeYear = () => {
        setMinVal(2017);
        setMaxVal(max);
        setYearRangeCount(1);
        clickYearRangeCountFilter();
        minValRef.current = 2017;
        maxValRef.current = max;
        setCheckMinYearVal('');
        setCheckMaxYearVal('');
    }

    const handleBtnFourYear = () => {
        setMinVal(2015);
        setMaxVal(max);
        setYearRangeCount(1);
        clickYearRangeCountFilter();
        minValRef.current = 2015;
        maxValRef.current = max;
        setCheckMinYearVal('');
        setCheckMaxYearVal('');
    }

    const handleBtnFiveYear = () => {
        setMinVal(2013);
        setMaxVal(max);
        setYearRangeCount(1);
        minValRef.current = 2013;
        maxValRef.current = max;
        setCheckMinYearVal('');
        setCheckMaxYearVal('');
        clickYearRangeCountFilter();
    }

    const clickYearRangeCount = () => {
        setYearRangeCount(1);
        clickYearRangeCountFilter();
    }

    const manageMinYearHandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        setGetMinYearVal(value);
        setCheckMinYearVal('');
    }

    const managemaxYearHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setGetMaxYearVal(value);
        setCheckMaxYearVal('');
    }

    // if (yearRangeCount > 0) {


    //     if (getMinYearVal === 2021 && getMaxYearVal === 2023) {
    //         const $under15Radio = document.getElementById("under21");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("under21");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinYearVal === 2019 && getMaxYearVal === 2023) {
    //         const $under15Radio = document.getElementById("above2019");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("above2019");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinYearVal === 2017 && getMaxYearVal === 2023) {
    //         const $under15Radio = document.getElementById("above2017");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("above2017");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinYearVal === 2015 && getMaxYearVal === 2023) {
    //         const $under15Radio = document.getElementById("above2015");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("above2015");
    //         $under15Radio.checked = false;
    //     }

    //     if (getMinYearVal === 2013 && getMaxYearVal === 2023) {
    //         const $under15Radio = document.getElementById("above2013");
    //         $under15Radio.checked = true;
    //     } else {
    //         const $under15Radio = document.getElementById("above2013");
    //         $under15Radio.checked = false;
    //     }

    // }


    return (
        <>
            <div className="custom-range">

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value min-year" id="min-year" >{checkMinYearVal !== undefined && checkMinYearVal !== '' ? checkMinYearVal : minVal}</div>
                    <div className="slider__right-value max-year">{checkMaxYearVal !== undefined && checkMaxYearVal !== '' ? checkMaxYearVal : maxVal}</div>
                </div>



                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMinYearVal !== undefined && checkMinYearVal !== '' ? checkMinYearVal : minVal}
                    onChange={(event) => manageMinYearHandler(event.target.value)}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 && "5" }}
                    id="radio-price-min" onClick={clickYearRangeCount}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={checkMaxYearVal !== undefined && checkMaxYearVal !== '' ? checkMaxYearVal : maxVal}
                    onChange={(event) => managemaxYearHandler(event.target.value)}
                    className="thumb thumb--right" onClick={clickYearRangeCount}
                />


                <input type="hidden" value={yearRangeCount} name="year-range-count" id="year-range-count" />

            </div>

            <div className='filter-sugestion'>

                <h2>Suggestions</h2>

                <div className='radio-div'>
                    <input id='under21' type="radio" onClick={handleBtnOneYear} name="radio-group" />
                    <label htmlFor="under21">
                        2021 and above

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='above2019' type="radio" onClick={handleBtnTwoYear} name="radio-group" />
                    <label htmlFor="above2019">
                        2019 and above

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='above2017' type="radio" onClick={handleBtnThreeYear} name="radio-group" />
                    <label htmlFor="above2017">
                        2017 and above

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='above2015' type="radio" onClick={handleBtnFourYear} name="radio-group" />
                    <label htmlFor="above2015">
                        2015 and above

                    </label>
                </div>

                <div className='radio-div'>
                    <input id='above2013' type="radio" onClick={handleBtnFiveYear} name="radio-group" />
                    <label htmlFor="above2013">
                        2013 and above

                    </label>
                </div>



            </div>

        </>
    );
};

YearRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default YearRangeSlider;
