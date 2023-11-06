import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import MultiRangeSlider from '../rangeslider/MultiRangeSlider';
import { $ } from 'react-jquery-plugin'
import WebHead from '@/components/common/WebHead';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

function ExtendedWarrantydetails() {

    const [ShowOption, setShowOption] = useState(false);
    const [ShowOption1, setShowOption1] = useState(false);

    const [popUp, setPopUp] = useState(false);



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
    const swiperSetting = {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: true,
        loop: true,
        modules: [Navigation],
    }

    useEffect(() => {
        var numToShow = 1;
        $(".list li").hide();
        $('.points-service-pack ul').each(function () {
            var list = $(this).children("li");
            var button = $(this).siblings(".next-btn");
            var less = $(this).siblings('.less-btn');
            less.hide();
            button.hide();
            var numInList = list.length;
            if (numInList > numToShow) {
                button.show();
                less.hide();
            }
            //$(this).children("li:lt('+ numToShow +')").show();
            list.slice(0, numToShow).show();
        });

        $('button.next-btn').click(function () {
            var list = $(this).siblings(".list").children("li");
            var numInList = list.length;
            var showing = list.filter(':visible').length;
            list.slice(showing - 1, showing + 100).show();
            var nowShowing = list.filter(':visible').length;
            if (nowShowing >= numInList) {
                $(this).hide();
                $(this).next('button.less-btn').show();
            }
        });

        $('button.less-btn').click(function () {
            $(this).siblings(".list").children("li").not(':lt(1)').hide();
            $(this).siblings('button.next-btn').show();
            $(this).hide();
        });

        const checkIfClickedOutside1 = e => {
            //     If the menu is open and the clicked target is not within the menu,
            //     then close the menu
            //     if (ref1.current && !ref1.current.contains(e.target)) {
            //         setShowOption(false)
            //     }
        }

        document.addEventListener("mousedown", checkIfClickedOutside1)

        const checkIfClickedOutside2 = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            // if (ref2.current && !ref2.current.contains(e.target)) {
            //     setShowOption1(false)
            // }
        }

        document.addEventListener("mousedown", checkIfClickedOutside2)


    })

    const OpenOption = () => {

        setShowOption(!ShowOption)

    }

    const OpenOption1 = () => {

        setShowOption1(!ShowOption1)

    }

    const CloseMobPopup = () => {

        setShowOption(false)
        setShowOption1(false)
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
        <div>
            <WebHead pageTitle="Final Details" />

            <section className="extented-warranty-parts bg-grey comPad">

                <div className='extra-pd-rightleft'>
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
                                                        <form>
                                                            <div className='form-input white-bgform'>
                                                                <div className="carFiltrs custom-dropdown">

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
                                                                                        <input type="radio" id="km" value="all" checked="" />
                                                                                        <label htmlFor='km'>Diamond Package</label>
                                                                                    </li>

                                                                                </ul>
                                                                                <div onClick={CloseMobPopup} className='mob-close'>Close</div>
                                                                            </div>
                                                                        </>

                                                                        : ""}
                                                                </div>

                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-md-7 text-end">
                                                        <div className="pckTxt01">Save INR 10,000/- if you buy today.</div>
                                                        <div className="d-flex justify-content-end align-items-center price-txt">
                                                            <div className="newPrice blue-txt"><span>INR </span> 79,999/-</div>
                                                            <div className="oldPrice">INR 89,000</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordionbox allpackagesec">
                                                    <Accordion preExpanded={['a']}>
                                                        <AccordionItem uuid="a" >
                                                            <AccordionItemHeading className="accordion-item">
                                                                <AccordionItemButton className='acrd-title'>
                                                                    1<sup>st</sup> Comprehensive Service
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel>
                                                                <div className="points-service-pack li-wd-25">
                                                                    <ul className="list">
                                                                        <li>
                                                                            <span>Replacements & Top-ups</span>
                                                                            <div className="points-bx d-flex flex-wrap">
                                                                                <div className="txtpoints">Wiper fluid</div>
                                                                                <div className="txtpoints">Engine oil</div>
                                                                                <div className="txtpoints">Oil filter</div>
                                                                                <div className="txtpoints">Air filter</div>
                                                                                <div className="txtpoints">Coolant</div>
                                                                                <div className="txtpoints">Brake fluid</div>
                                                                                <div className="txtpoints">AC Filter</div>
                                                                                <div className="txtpoints">Fuel filter</div>
                                                                                <div className="txtpoints">Ignition coil</div>
                                                                                <div className="txtpoints">Spark plug</div>
                                                                                <div className="txtpoints">ATF filter</div>
                                                                                <div className="txtpoints">ATF oil</div>
                                                                                <div className="txtpoints">V-Belt bearing set</div>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <span>Checkup</span>
                                                                            <div className="points-bx d-flex flex-wrap">
                                                                                <div className="txtpoints">Battery testing</div>
                                                                                <div className="txtpoints">Updating service</div>
                                                                                <div className="txtpoints">Scanning</div>
                                                                                <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                    <button id="next" className="next-btn">Read More</button>
                                                                    <button id="less" className="less-btn">Read Less</button>
                                                                </div>
                                                            </AccordionItemPanel>
                                                        </AccordionItem>

                                                        <AccordionItem  >
                                                            <AccordionItemHeading className="accordion-item">
                                                                <AccordionItemButton className='acrd-title'>
                                                                    2<sup>st</sup> Comprehensive Service
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel>
                                                                <div className="points-service-pack li-wd-25">
                                                                    <ul className="list">
                                                                        <li>
                                                                            <span>Replacements & Top-ups</span>
                                                                            <div className="points-bx d-flex flex-wrap">
                                                                                <div className="txtpoints">Wiper fluid</div>
                                                                                <div className="txtpoints">Engine oil</div>
                                                                                <div className="txtpoints">Oil filter</div>
                                                                                <div className="txtpoints">Air filter</div>
                                                                                <div className="txtpoints">Coolant</div>
                                                                                <div className="txtpoints">Brake fluid</div>
                                                                                <div className="txtpoints">AC Filter</div>
                                                                                <div className="txtpoints">Fuel filter</div>
                                                                                <div className="txtpoints">Ignition coil</div>
                                                                                <div className="txtpoints">Spark plug</div>
                                                                                <div className="txtpoints">ATF filter</div>
                                                                                <div className="txtpoints">ATF oil</div>
                                                                                <div className="txtpoints">V-Belt bearing set</div>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <span>Checkup</span>
                                                                            <div className="points-bx d-flex flex-wrap">
                                                                                <div className="txtpoints">Battery testing</div>
                                                                                <div className="txtpoints">Updating service</div>
                                                                                <div className="txtpoints">Scanning</div>
                                                                                <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                    <button id="next" className="next-btn">Read More</button>
                                                                    <button id="less" className="less-btn">Read Less</button>
                                                                </div>
                                                            </AccordionItemPanel>
                                                        </AccordionItem>


                                                    </Accordion>
                                                </div>
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

                                        <div className="formbx-white package-ordersummary pb-0 scroll-summery">
                                            <h3>Order Summary</h3>
                                            <div className='service-summary-list p-0'>
                                                <ul className='inner-scroll'>
                                                    <li className="extended-year-li align-items-start light-blue-bg">
                                                        <div className="left-sec">
                                                            <div className="icon"><img src="/img/sheld-icon.png" alt="" /></div>
                                                            <div className="blue-txt sum-package-name">Extended Warranty</div>

                                                            <div className="carFiltrs custom-dropdown small" >

                                                                <label onClick={OpenOption1} className={`${ShowOption1 ? "open" : ""} label`} >
                                                                    Diamond Package
                                                                </label>

                                                                {ShowOption1 ?
                                                                    <>
                                                                        <div onClick={CloseMobPopup} className='overlay-mob'></div>
                                                                        <div className='mob-filter'>
                                                                            {/* <div className='mob-heading'>Sort By</div>       */}
                                                                            <ul className="filterListComan shortByCars">
                                                                                <li>
                                                                                    <input type="radio" id="km" value="all" checked="" />
                                                                                    <label htmlFor='km'>Diamond Package</label>
                                                                                </li>

                                                                            </ul>
                                                                            <div onClick={CloseMobPopup} className='mob-close'>Close</div>
                                                                        </div>
                                                                    </>

                                                                    : ""}
                                                            </div>
                                                            <span>This extended warranty is valid upto 1 years or 15,000 KM whichever comes first.</span>


                                                        </div>
                                                        <div className="right-sec">
                                                            <div className="blue-txt discount-price">INR 55,999/-</div>
                                                            <div className="cut-price">INR 60,999/-</div>
                                                            <button className="delete-btn"></button>
                                                        </div>
                                                    </li>
                                                    <li className="package-price-quote white-bg">
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
                                                    <li className="upgradeto extended-year-li no-pad">
                                                        <div className="left-sec no-pad">
                                                            <p className="mb-0">Upgrade to</p>
                                                            <p className="blue-txt mb-0">
                                                                <b>Diamond Package </b>INR <b>667</b>/month
                                                            </p>
                                                        </div>
                                                        <div className="right-sec">
                                                            <button className="btn reverse">Upgrade Now</button>
                                                        </div>
                                                    </li>

                                                </ul>

                                                <ul>



                                                    <li className="subtotal">
                                                        <div className="left-sec">
                                                            <p className="mb-0">Grand Total<span>Subtotal includes applicable taxes <a onClick={ViewBreakup} className="underline-btn">View Breakup</a></span></p>
                                                        </div>
                                                        <div className="right-sec">
                                                            <div className="">INR 55,999/-</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span className='green-txtorder text-center'>Nice! You saved INR 5,000/- on your order.</span>
                                                    </li>
                                                </ul>

                                                <div className="btn-space edge"><a className="btn reverse fullwd-btn ">Proceed To Checkout</a></div>
                                            </div>
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

                : ""}


        </div>
    )
}


export default ExtendedWarrantydetails;
