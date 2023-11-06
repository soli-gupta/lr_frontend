import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import MultiRangeSlider from '../rangeslider/MultiRangeSlider';
import { $ } from 'react-jquery-plugin'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';

function ServiceDetails() {

    const [Hamburger, setHamburger] = useState(false);
    const [CustomSearch, setCustomSearch] = useState(false);

    const OpenHamburger = () => {
        setHamburger(true)
        if (typeof window !== "undefined") {
            document.body.classList.add('hide-scroll');
        }
    }
    const HideHam = () => {
        setHamburger(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('hide-scroll');
        }
    }

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
        if (typeof window !== "undefined") { 
        setTimeout(() => { 

            
        var numToShow = 2;
        $(".list li").hide();
        $('.points-service-pack ul').each(function () {
            var list = $(this).children("li");
            var button = $(this).siblings(".next-btn");
            var less = $(this).siblings('.less-btn');
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
            list.slice(showing - 2, showing + 100).show();
            var nowShowing = list.filter(':visible').length;
            if (nowShowing >= numInList) {
                $(this).hide();
                $(this).next('button.less-btn').show();
            }
        });

        $('button.less-btn').click(function () {
            $(this).siblings(".list").children("li").not(':lt(2)').hide();
            $(this).siblings('button.next-btn').show();
            $(this).hide();
        });

   

    }, 1000)

 }


    })

    return (
        <>
            <WebHead />
           
                <section className="vehicledetailssec bg-grey comPad">
                    <div className="wrapper">
                        <div className="center-text">
                            <h2>Service Packages For</h2>
                        </div>
                        <div className="allslctdPckg">
                            <div className="col">
                                <label>Year</label>2017
                            </div>
                            <div className="col">
                                <label>Brand</label>Audi
                            </div>
                            <div className="col">
                                <label>Model</label>A3
                            </div>
                            <div className="col">
                                <label>Variant</label>35 TDI Attraction
                            </div>
                            <div className="col">
                                <label>Fuel Type</label>Diesel
                            </div>
                            <div className="col">
                                <label>KMs Driven</label>45,000
                            </div>
                            <div className="col"><a href="">Edit</a></div>
                        </div>
                        <ul>
                            <li>Service recommended every <strong>15,000 Kms</strong></li>
                            <li>Package valid for <strong>3 Years or 45,000 KMs</strong></li>
                        </ul>
                    </div>
                </section>

                <section className="allpackagesec comPad pb-0">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="packBox packBox01">
                                    <div className="golden-bg-tag">Recommended </div>
                                    <div className="packBoxTp01 d-flex flex-wrap justify-content-between">
                                        <div className="left">
                                            <div className="pckTxt01">Save INR 13,000/- if you buy today.</div>
                                            <div className="pckTxt02">Silver Packages</div>
                                            <div className="pckPrice">
                                                <span className="priceNew">INR </span>
                                                31,999/- <
                                                    span className="oldPrice">INR 45,000</span>
                                            </div>
                                        </div>

                                        <div className="right align-items-end">
                                            <button className="btn arrow-style blue-btn"><span>Buy Now</span></button>
                                        </div>
                                    </div>

                                    <div className="accordionbox">
                                        <Accordion preExpanded={['a']}>
                                            <AccordionItem uuid="a" >
                                                <AccordionItemHeading className="accordion-item">
                                                    <AccordionItemButton className='acrd-title'>
                                                        1st Basic Service
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className="points-service-pack li-wd-50">
                                                        <ul className="list">
                                                            <li>
                                                               <span> Replacements & Top-ups </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Wiper Fluid Replacement</div>
                                                                    <div className="txtpoints">Battery Testing</div>
                                                                    <div className="txtpoints">Vehicle Washing</div>
                                                                    <div className="txtpoints">Interior Vacuuming (Carpet & Seats)</div>
                                                                    <div className="txtpoints">Engine Oil Replacement</div>
                                                                    <div className="txtpoints">Oil Filter Replacement</div>
                                                                    <div className="txtpoints">Antifreeze/ Coolant Top Up</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                            <span> Checkup </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Battery testing</div>
                                                                    <div className="txtpoints">Updating service</div>
                                                                    <div className="txtpoints">Scanning</div>
                                                                    <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                            <span> Cleaning </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Vehicle washing</div>
                                                                    <div className="txtpoints">Lubrication</div>
                                                                    <div className="txtpoints">Sunroof cleaning</div>
                                                                    <div className="txtpoints">Interior vacuuming (Carpet & Seats)</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <button id="next" className="next-btn">Read More</button>
                                                        <button id="less" className="less-btn">Read Less</button>
                                                    </div >
                                                </AccordionItemPanel >
                                            </AccordionItem >

                                            <AccordionItem  >
                                                <AccordionItemHeading className="accordion-item">
                                                    <AccordionItemButton className='acrd-title'>
                                                        1st Basic Service
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className="points-service-pack li-wd-50">
                                                        <ul className="list">
                                                            <li>
                                                               <span> Replacements & Top-ups </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Wiper Fluid Replacement</div>
                                                                    <div className="txtpoints">Battery Testing</div>
                                                                    <div className="txtpoints">Vehicle Washing</div>
                                                                    <div className="txtpoints">Interior Vacuuming (Carpet & Seats)</div>
                                                                    <div className="txtpoints">Engine Oil Replacement</div>
                                                                    <div className="txtpoints">Oil Filter Replacement</div>
                                                                    <div className="txtpoints">Antifreeze/ Coolant Top Up</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                            <span> Checkup </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Battery testing</div>
                                                                    <div className="txtpoints">Updating service</div>
                                                                    <div className="txtpoints">Scanning</div>
                                                                    <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                            <span> Cleaning </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Vehicle washing</div>
                                                                    <div className="txtpoints">Lubrication</div>
                                                                    <div className="txtpoints">Sunroof cleaning</div>
                                                                    <div className="txtpoints">Interior vacuuming (Carpet & Seats)</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <button id="next" className="next-btn">Read More</button>
                                                        <button id="less" className="less-btn">Read Less</button>
                                                    </div >
                                                </AccordionItemPanel >
                                            </AccordionItem >



                                        </Accordion >
                                    </div >
                                </div >
                            </div >

                            <div className="col-md-4">
                                <div className="packBox packBox01">
                                    
                                    <div className="packBoxTp01 d-flex flex-wrap justify-content-between">
                                        <div className="left">
                                            <div className="pckTxt01">Save INR 13,000/- if you buy today.</div>
                                            <div className="pckTxt02">Silver Packages</div>
                                            <div className="pckPrice">
                                                <span className="priceNew">INR </span>
                                                31,999/- <
                                                    span className="oldPrice">INR 45,000</span>
                                            </div>
                                        </div>

                                        <div className="right align-items-end">
                                            <button className="btn arrow-style blue-btn"><span>Buy Now</span></button>
                                        </div>
                                    </div>

                                    <div className="accordionbox">
                                        <Accordion preExpanded={['a']}>
                                            <AccordionItem uuid="a" >
                                                <AccordionItemHeading className="accordion-item">
                                                    <AccordionItemButton className='acrd-title'>
                                                        1st Basic Service
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className="points-service-pack li-wd-50">
                                                        <ul className="list">
                                                            <li>
                                                               <span> Replacements & Top-ups </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Wiper Fluid Replacement</div>
                                                                    <div className="txtpoints">Battery Testing</div>
                                                                    <div className="txtpoints">Vehicle Washing</div>
                                                                    <div className="txtpoints">Interior Vacuuming (Carpet & Seats)</div>
                                                                    <div className="txtpoints">Engine Oil Replacement</div>
                                                                    <div className="txtpoints">Oil Filter Replacement</div>
                                                                    <div className="txtpoints">Antifreeze/ Coolant Top Up</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                            <span> Checkup </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Battery testing</div>
                                                                    <div className="txtpoints">Updating service</div>
                                                                    <div className="txtpoints">Scanning</div>
                                                                    <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                            <span> Cleaning </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Vehicle washing</div>
                                                                    <div className="txtpoints">Lubrication</div>
                                                                    <div className="txtpoints">Sunroof cleaning</div>
                                                                    <div className="txtpoints">Interior vacuuming (Carpet & Seats)</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <button id="next" className="next-btn">Read More</button>
                                                        <button id="less" className="less-btn">Read Less</button>
                                                    </div >
                                                </AccordionItemPanel >
                                            </AccordionItem >

                                            <AccordionItem  >
                                                <AccordionItemHeading className="accordion-item">
                                                    <AccordionItemButton className='acrd-title'>
                                                        1st Basic Service
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <div className="points-service-pack li-wd-50">
                                                        <ul className="list">
                                                            <li>
                                                               <span> Replacements & Top-ups </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Wiper Fluid Replacement</div>
                                                                    <div className="txtpoints">Battery Testing</div>
                                                                    <div className="txtpoints">Vehicle Washing</div>
                                                                    <div className="txtpoints">Interior Vacuuming (Carpet & Seats)</div>
                                                                    <div className="txtpoints">Engine Oil Replacement</div>
                                                                    <div className="txtpoints">Oil Filter Replacement</div>
                                                                    <div className="txtpoints">Antifreeze/ Coolant Top Up</div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                            <span> Checkup </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Battery testing</div>
                                                                    <div className="txtpoints">Updating service</div>
                                                                    <div className="txtpoints">Scanning</div>
                                                                    <div className="txtpoints">Overhaul vehicle inspection</div>
                                                                </div>
                                                            </li>

                                                            <li>
                                                            <span> Cleaning </span>
                                                                <div className="points-bx d-flex flex-wrap">
                                                                    <div className="txtpoints">Vehicle washing</div>
                                                                    <div className="txtpoints">Lubrication</div>
                                                                    <div className="txtpoints">Sunroof cleaning</div>
                                                                    <div className="txtpoints">Interior vacuuming (Carpet & Seats)</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <button id="next" className="next-btn">Read More</button>
                                                        <button id="less" className="less-btn">Read Less</button>
                                                    </div >
                                                </AccordionItemPanel >
                                            </AccordionItem >



                                        </Accordion >
                                    </div >
                                </div >
                            </div >

                           

                        </div >
                    </div >
                </section >

                <section className="faq-terms-condition comPad">
                    <div className="wrapper">
                        <Accordion allowZeroExpanded>
                            <AccordionItem >
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Terms And Conditions
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Recommendation
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            
        </>
    )
}


export default ServiceDetails
