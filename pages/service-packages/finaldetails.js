import React, { useState,useRef, useEffect } from 'react';
import 'swiper/css';
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';

function FinalServiceDetails() {
    const [Readmore, setReadmore] = useState(false);
    const [ShowOption, setShowOption] = useState(false);
    const [popUp, setPopUp] = useState(false);

    const ref1 = useRef()
    useEffect(() => {

        const checkIfClickedOutside1 = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (ref1.current && !ref1.current.contains(e.target)) {
                setShowOption(false)
            }
          }

          document.addEventListener("mousedown", checkIfClickedOutside1)


    })

    const Moreinfo = () => {
        setReadmore(!Readmore)
    }

    const OpenOption = () => {

        setShowOption(!ShowOption)
       
    }

    const CloseMobPopup = () => {

        setShowOption(false)
    }

    const closePopUp = () => {
        setPopUp(false);
        document.body.classList.remove('hide-scroll-poup-new');
       
       
    }

    const ViewBreakup = () => {
        setPopUp(true);
        document.body.classList.add('hide-scroll-poup-new');

    }

    return (
        <>
            <WebHead />
           
                <section className="package-service bg-grey comPad">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-7">
                                <div className='formbx-white extended-radio-btn'>
                                    <div className="golden-bg-tag">Recommended</div>
                                    <ul>
                                        <li>
                                            <div className="chckbx">
                                                <input type="radio" id="product_1" name="product_2" value="" />
                                                <label htmlFor="product_1"> <span></span>Upgrade Service package that’s right for you</label>
                                                <div className="allPrices row pl-20">
                                                    <div className="col-md-5">
                                                    <div className="carFiltrs custom-dropdown" ref={ref1}>

<label onClick={OpenOption} className={`${ShowOption ? "open" : ""} label`} >
Diamond Package
</label>

{ShowOption ?
    <>
        <div onClick={CloseMobPopup} className='overlay-mob'></div>
        <div className='mob-filter'>
            {/* <div className='mob-heading'>Sort By</div>       */}
            <ul className="filterListComan shortByCars">
                <li>
                <input type="radio" id="km"  value="all" checked="" />
                <label htmlFor='km'>Diamond Package</label> 
                </li>
        
            </ul>
            <div onClick={CloseMobPopup} className='mob-close'>Close</div>
        </div>
    </>

    : ""}
</div>

                                                    </div>
                                                    <div className="col-md-7 text-end">
                                                        <div className="pckTxt01">Save INR 8709/- if you buy today.</div>
                                                        <div className="d-flex justify-content-end align-items-center price-txt">
                                                            <div className="newPrice blue-txt"><span>INR </span> 41,291/-</div>
                                                            <div className="oldPrice">INR 50,000</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="txtBoxAll pl-20">
                                                    <h2>Parts Covered Under Warranty</h2>
                                                    <div className="showContent">
                                                        <p>Engine, Manual Gearbox, Automatic Gearbox, Front & Rear Wheel Drives, Propeller shaft, Steering, Braking System, Fuel System, Diesel Injection System, Air Conditioning, Electrical System</p>
                                                    </div>

                                                    {Readmore ?
                                                        <div className="moreTextAll" >
                                                            <h3>Engine</h3>
                                                            <p>Oil pump, crankshaft &amp; pulley, big end &amp; main bearings, connecting rods, gudgeon pins, piston and rings, inlet and exhaust valves (excluding burntand pitted valves), springs and guides, cylinder block and cylinder head, head gasket, camshaft, rocker arms and shaft, timing gears, tensionerbearing, inter cooler engine, water Pump (failure due to external damage or corrosion is not covered), inlet and exhaust manifold, turbo charger,elastic bolts.</p>

                                                            <h3>Manual Gearbox</h3>
                                                            <p>Gears, shafts, synchromesh hubs, rings, selectors, bearings, transfer gears</p>

                                                            <h3>Front &amp; Rear Wheel Drives</h3>
                                                            <p>Gears, differential units, wheel bearings, Axle Shafts, CV Joints</p>

                                                            <h3>Propeller shaft</h3>
                                                            <p>Propeller shaft, universal joints.</p>

                                                            <h3>Steering</h3>
                                                            <p>Rack &amp; pinion, steering column, steering box, and power steering pump, EPS</p>

                                                            <h3>Braking System</h3>
                                                            <p>Master cylinder, brake booster and vacuum pump, Wheel bearing, Callipers</p>

                                                            <h3>Fuel System</h3>
                                                            <p>Mechanical &amp; Electrical Fuel Pump, Fuel Injection Pump, Fuel accumulator, fuel distributor, fuel rail, warm up regulator, cold start valve, pressuredamper, throttle body, High and low pressure pumps</p>

                                                            <h3>Diesel Injection System</h3> <p>Injection pump, electromagnetic cut off.</p>

                                                            <h3>Air Conditioning</h3> <p>Compressor, condenser, evaporator, reservoir, thermostat switch, AC fan motor, heater core &amp; AC switch, Control unit , Blower motor , High and Lowpressure pipelines , Clutch magnate</p>

                                                            <h3>Electrical System</h3>
                                                            <p>Engine management sensors &amp; actuators, starter motor, solenoid switch, alternator, rectifier, regulator, ignition coil, cooling fan motor, powerwindow motor, power window switch, combination switch, ignition switch, fuel rail, thermostat switch, oil Pressure switch, temperature gauge, fuelgauge, Hazard switch , Electronic control unit , Body control unit , HT cable , Wiper washer motor , Immobilizer ECU,ECM, Speedometer</p>
                                                        </div>
                                                        : ""
                                                    }

                                                    <div className={Readmore ? "less-btn" : "next-btn"} onClick={Moreinfo}> {Readmore ? "Read Less" : "Read More"} </div>
                                                </div>

                                                <p className="pl-20 mb-0"><a href="#" className="sky-blue-btn">Warranty Can Only Be Sold On Following Vehicles</a></p>
                                                <p className="pl-20"><a href="#" className="sky-blue-btn">Warranty Shall Not Apply To</a></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="chckbx">
                                                <input type="radio" id="product_2" name="product_2" value="" />
                                                <label htmlFor="product_2"> <span></span>No thanks</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-5">
                            <div className="sticky-div">
                                <div className="nextstep">
                                    <div className='formbx-white p-0'>
                                        <div className='border-heading relativediv'>
                                            <h3>Vehicle Details</h3>
                                            <a href='' className='editcta'>Edit</a>
                                        </div>
                                        <div className='vehicle-list-detail'>
                                            <ul>
                                                <li>Year<span>2018</span></li>
                                                <li>Brand<span>Audi</span></li>
                                                <li>Model<span>A3</span></li>
                                                <li>Variant<span>35 TDI Attraction</span></li>
                                                <li>Fuel Type<span>Diesel</span></li>
                                                <li>KMs Driven<span>45,000</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="formbx-white package-ordersummary pb-0">
                                        <h3>Order Summary</h3>
                                        <div className='service-summary-list p-0'>
                                            <ul>
                                                <li className="package-price-quote">
                                                    <div className="left-sec">
                                                        <div className="icon"><img src="/img/package-service-icon.svg" alt="" /></div>
                                                        <div className="blue-txt sum-package-name">Gold Package <a className="underline-btn">Edit Package</a></div>
                                                        <span>This gold package consist <b>3 services & valid upto 3 years or 45,000 KM</b> whichever comes first.</span>
                                                    </div>
                                                    <div className="right-sec">
                                                        <div className="blue-txt discount-price">INR 55,999/-</div>
                                                        <div className="cut-price">INR 60,999/-</div>
                                                        <button className="delete-btn"></button>
                                                    </div>
                                                </li>
                                                <li className="upgradeto">
                                                    <div className="left-sec">
                                                        <p className="mb-0">Upgrade to</p>
                                                        <p className="blue-txt mb-0">
                                                            <b>Diamond Package </b>INR <b>667</b>/month
                                                        </p>
                                                    </div>
                                                    <div className="right-sec">
                                                        <button className="btn reverse">Upgrade Now</button>
                                                    </div>
                                                </li>
                                                <li className="subtotal">
                                                    <div className="left-sec">
                                                        <p className="mb-0">Subtotal Total<span>Subtotal includes applicable taxes <a className="underline-btn" onClick={ViewBreakup}>View Breakup</a></span></p>
                                                    </div>
                                                    <div className="right-sec">
                                                        <div className="">INR 55,999/-</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <span className='green-txtorder text-center'>Nice! You saved INR 5,000/- on your order.</span>
                                                </li>
                                            </ul>

                                            <div className="btn-space"><a className="btn reverse fullwd-btn">Proceed To Checkout</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            

                            </div>
                        </div>
                    </div>
                </section>


            {popUp ?

<div style={{ display: "block" }} className={`common-popup price-breakup  get-acall`}>
<div className="overlay-mob mobile-style " onClick={closePopUp}></div>
<div className='popup-inner'>

    <div className='popup-close' onClick={closePopUp} ></div>

    <h4>Price Break Up</h4>      

    <ul>
       <li><span>Extended Warranty 1 Year/10,000 Km </span>INR 37,498/-</li> 
       <li><span>TCS</span>INR 37,498/-</li>
       <li><span>GST</span>INR 2,293/-</li>
       <li className='grandTotal'><span>Total</span>INR 41,291/-</li>                                 
    </ul>                                  
   
</div>

</div>

:"" }
         
        </>
    )
}


export default FinalServiceDetails;
