import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import "./multiRangeSlider.css";

const YearFilter = ({ min, max, onChange, step }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [yearCount, setYearCount] = useState(0);



    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }



    }, [minVal, getPercent]);



    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

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

    }

    const handleBtnTwoYear = () => {
        setMinVal(2019);
        setMaxVal(max);
    }

    const handleBtnThreeYear = () => {
        setMinVal(2017);
        setMaxVal(max);
    }

    const handleBtnFourYear = () => {
        setMinVal(2015);
        setMaxVal(max);
    }

    const handleBtnFiveYear = () => {
        setMinVal(2013);
        setMaxVal(max);
    }

    const minYearFilterHandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        setYearCount(1);
    }

    const maxYearFilterHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setYearCount(1);
    }

    return (
        <>
            <div className="custom-range">

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value min-year" id="min-year" >{minVal}</div>
                    <div className="slider__right-value max-year">{maxVal}</div>
                </div>



                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={minVal}
                    onChange={(event) => minYearFilterHandler(event.target.value)}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 && "5" }}
                    id="radio-price-min"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={maxVal}
                    onChange={(event) => maxYearFilterHandler(event.target.value)}
                    className="thumb thumb--right"
                />



                <input type="hidden" id="year-range-count-header" value={yearCount} />
            </div>
        </>
    );
};

YearFilter.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default YearFilter;
