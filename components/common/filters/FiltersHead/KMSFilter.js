import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { numberFormatter } from "@/components/Helper";
// import "./multiRangeSlider.css";

const KMSFilter = ({ min, max, onChange, step }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [kmsCount, setKMSCount] = useState(0);



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


    const handleBtnOneKMs = () => {
        setMinVal(min);
        setMaxVal(10000);

    }

    const handleBtnTwoKMs = () => {
        setMinVal(min);
        setMaxVal(20000);
    }

    const handleBtnThreeKMs = () => {
        setMinVal(min);
        setMaxVal(30000);
    }

    const handleBtnFourKMs = () => {
        setMinVal(min);
        setMaxVal(40000);
    }

    const minKSMFilterHandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        setKMSCount(1);
    }

    const maxKMSFilterHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setKMSCount(1);
    }


    return (
        <>
            <div className="custom-range">

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    <div className="slider__left-value min-kms" id="min-year" >{numberFormatter(minVal)}</div>
                    <div className="slider__right-value max-kms">{numberFormatter(maxVal)}</div>
                </div>



                <input
                    type="range"
                    min={min}
                    max={max}
                    step={maxStep}
                    value={minVal}
                    onChange={(event) => minKSMFilterHandler(event.target.value)}
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
                    onChange={(event) => maxKMSFilterHandler(event.target.value)}
                    className="thumb thumb--right"
                />


                <input type="hidden" id="kms-range-count-header" value={kmsCount} />

            </div>
        </>
    );
};

KMSFilter.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default KMSFilter;
