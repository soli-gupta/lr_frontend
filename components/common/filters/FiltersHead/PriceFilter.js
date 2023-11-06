import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { numberFormatter } from "@/components/Helper";
// import "./multiRangeSlider.css";

const PriceFilter = ({ min, max, onChange, step }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [maxStep, setMaxStep] = useState(step);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);
    const [priceCount, setPriceCount] = useState(0);



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


    const handleBtnOnePrice = () => {
        setMinVal(min);
        setMaxVal(1500000);

    }

    const handleBtnTwoPrice = () => {
        setMinVal(1500000);
        setMaxVal(2500000);
        // const $sliderRange = document.getElementsByClassName('slider__range');
        // $sliderRange.style.left = '6%';
        // $sliderRange.style.width = '17%';
    }

    const handleBtnThreePrice = () => {
        setMinVal(2500000);
        setMaxVal(3500000);
    }

    const handleBtnFourPrice = () => {
        setMinVal(3500000);
        setMaxVal(4500000);
    }

    const handleBtnFivePrice = () => {
        setMinVal(4500000);
        setMaxVal(5500000);
    }

    const handleBtnSixPrice = () => {
        setMinVal(5000000);
        setMaxVal(max)
    }


    const minPriceFilterhandler = (event) => {
        const value = Math.min(Number(event), maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
        // setMinVal()
    }

    const maxPriceFilterHandler = (event) => {
        const value = Math.max(Number(event), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
    }
    const checkClickCountForPriceFilter = () => {
        setPriceCount(1);
    }

    return (
        <div className="custom-range">

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value min-price" id="min-price" >{numberFormatter(minVal)}</div>
                <div className="slider__right-value max-price">{numberFormatter(maxVal)}</div>
            </div>



            <input
                type="range"
                min={min}
                max={max}
                step={maxStep}
                value={minVal}
                onChange={(event) => minPriceFilterhandler(event.target.value)}
                className="thumb thumb--left"

                id="radio-price-min" onClick={checkClickCountForPriceFilter}
                suppressHydrationWarning />
            <input
                type="range"
                min={min}
                max={max}
                step={maxStep}
                value={maxVal}
                onChange={(event) => maxPriceFilterHandler(event.target.value)}
                className="thumb thumb--right" onClick={checkClickCountForPriceFilter}
            />
            {/* style={{ zIndex: minVal > max - 100 && "5" }} */}

            <input type="hidden" id="price-range-count-header" value={priceCount} />

        </div>
    );
};

PriceFilter.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PriceFilter;
