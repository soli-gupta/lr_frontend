import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import "./multiRangeSlider.css";

const SingleRangeSlider = ({ min, max, onChange, defaultValue }) => {
    const [minVal, setMinVal] = useState(defaultValue);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);
    const leftToolTip = useRef(null);
    const rightToolTip = useRef(null);



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
            //range.current.style.width = `${maxPercent - minPercent}%`;

        }




    }, [maxVal, getPercent]);
    // console.log(min)
    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="custom-range">

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />

                <div className="slider__right-value">{minVal}</div>
            </div>



            <input
                type="range"
                min={min}
                max={max}
                step={1}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />



        </div>
    );
};

SingleRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SingleRangeSlider;
