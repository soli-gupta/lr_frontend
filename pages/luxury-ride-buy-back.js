import React, { useState, useRef, useEffect } from 'react';
import { Navigation, Autoplay } from "swiper";
import { $ } from 'react-jquery-plugin'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import "swiper/css";
import "swiper/css/pagination";
import WebsiteLayout from '@/components/common/WebsiteLayout';
import WebHead from '@/components/common/WebHead';
import Loader from '@/components/common/Loader';
import FrequentlyAskedQuestions from '@/components/frequently-asked-questions/FrequentlyAskedQuestions';
import Link from 'next/link';


function BuyBack({ cmsPage }) {

    const Url = process.env.NEXT_PUBLIC_URL;

    const [scroll, setScroll] = useState(false);
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

    useEffect(() => {

        if (typeof window !== "undefined") {

            document.body.classList.add('sticky-btn-have');
        }



        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => {
                setScroll(window.scrollY > 10)
            })
            if (typeof window !== "undefined") {
                document.body.classList.remove('header-No-Scroll');
            }
            $(window).scroll(function () {

                // Add parallax scrolling to all images in .paralax-image container
                $('.parallax-image').each(function () {
                    // only put top value if the window scroll has gone beyond the top of the image
                    if ($(this).offset().top < $(window).scrollTop()) {
                        // Get ammount of pixels the image is above the top of the window
                        var difference = $(window).scrollTop() - $(this).offset().top;
                        // Top value of image is set to half the amount scrolled
                        // (this gives the illusion of the image scrolling slower than the rest of the page)
                        var half = (difference / 2) + 'px',
                            transform = 'translate3d( 0, ' + half + ',0)';

                        $(this).find('img').css('transform', transform);
                    } else {
                        // if image is below the top of the window set top to 0
                        $(this).find('img').css('transform', 'translate3d(0,0,0)');
                    }
                });
            });

        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('sticky-btn-have');
            }

        }
    }, []);


    const swiperSetting = {
        slidesPerView: 5,
        navigation: true,
        loop: true,
        modules: [Navigation, Autoplay],
    }


    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }


    if (!cmsPage) return <Loader loaderTitle={`Something went wrong.`} />

    return (
        <div>
            <WebHead pageTitle={cmsPage.page_title} />
            {/* <WebsiteLayout> */}
            <div className="home-banner inner-banner">
            <img src={`${Url}${cmsPage.page_banner}`} alt="" className="desktop-banner" />
                <img src={`${Url}${cmsPage.mobile_banner}`} alt="" className="mobile-banner" />
                <div className="filter-section service-fliter">

                    <div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
                    {/* 
                        <h2>Luxury Ride <i>Buyback</i></h2>
                        <div className='banner-subheading'>Assured future resale and upgrade value of your Luxury Ride Assured® car</div>

                        <a href="/" className="btn center arrow-style blueBdr">View Inventory</a> */}

                </div>

            </div>

            <div className="banner-bottom-cta desktop-hide-div mobile-show-div"><Link href="/buy" class="btn arrow-style blue-btn">View Inventory</Link></div>

            <section className='made-simple buyback'>
                <div className='shadow-text'>



                </div>
                <div className="wrapper">
                    <div className='row'>
                        <div className='col-md-7'>

                            <div dangerouslySetInnerHTML={{ __html: cmsPage.content_two }}></div>

                            {/* 
                                <h2>The freedom that comes with a car</h2>

                                <p>Luxury Ride Buyback makes resale of your car and upgrading it, rewarding and hassle-free. You get assured future resale value of your car upon purchase, extending to periods of ownership from six months to a year to eighteen months. Backpack benefits includes <span>Flexible ownership tenures, Guaranteed future resale value & Easy upgrade.</span></p> */}




                        </div>

                    </div>
                </div>
            </section>

            <section className='paralex-banners'>

                <div dangerouslySetInnerHTML={{ __html: cmsPage.content_three }}></div>

                {/* <div className="parallax-image">
                        <img src="/img/owner-banner.jpg" alt="" />

                        <div className='banner-text'>
                            <h3>Ownership, your way</h3>
                            <p>Drive a car model that you’ve always wanted, in a color that you like, with a transmission that you prefer, for a tenure of your choice.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>

                    </div>
                    <div className="parallax-image">
                        <img src="/img/easy-return.jpg" alt="" />
                        <div className='banner-text'>
                            <h3>Easy return, exchange and upgrade</h3>
                            <p>At the end of your tenure, either hold on to your car, exchange it for an upgrade or return it for the assured buyback value.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>
                    </div>

                    <div className="parallax-image">
                        <img src="/img/resale-banner.jpg" alt="" />
                        <div className='banner-text'>
                            <h3>Guaranteed future resale value</h3>
                            <p>Upfront buyback value assurance at purchase. Buyback is valid for a period of 6, 12 and 18 months from the date of purchase.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>
                    </div> */}



            </section>


            <div className='banner-bottom commonm-gap mobile-assurance'>

                {/* "/img/assurance-banner.jpg" */}
                <div className="wrapper">
                    <img src="/img/assurance-bottom.png" className="desktop-hide-div mobile-show-div image-radious" alt="" />
                    <div className='banner-text' style={{ backgroundImage: `url(/img/assurance-top.png)`, backgroundRepeat: "no-repeat", backgroundPosition: "left top", backgroundSize: "cover" }}>
                        <div dangerouslySetInnerHTML={{ __html: cmsPage.content_four }}></div>
                        {/* <h3>Luxury Ride <i>Assurance</i></h3>
                            <p>We believe in making simple and fair deals, also assure best<br /> pricing either you are buying or selling a car</p>
                            <a href="#" className="btn center arrow-style blueBdr"><span>Know More</span></a> */}
                    </div>

                </div>

            </div>

            {/* <section className='faq-for-sell commonm-gap'>
                <div className="wrapper">
                    <div className="center-text">
                        <h2>Frequently Asked Questions On Extended Warranty</h2>
                        <p>Have questions? We’re here to help.</p>
                    </div>

                    <div className='common-sell-faq'>
                        <Accordion preExpanded={['a']}>
                            <AccordionItem uuid="a" >
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Lorem ipsum dolor sit amet
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Engine & Transmission
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Hybrid System
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className="accordion-item">
                                    <AccordionItemButton className='acrd-title'>
                                        Performance & Efficiency
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section> */}

            {/* <section className='get-in-touch commonm-gap pt-0'>
                <div className="wrapper">
                    <div className='still-quebx'>
                        <div className='left-que-bx'>
                            <div className='que-icon-img'>
                                <img src="/img/get-in-touch.png" alt="" />
                            </div>
                            <div className='que-txt'>
                                <h3>Still have questions?</h3>
                                <p>Cant’t find the answer you’re looking for? Please chat to our friendly team.</p>
                            </div>
                        </div>
                        <div className='right-que-bx'>
                            <a href="#" className="btn arrow-style blue-btn"><span>Get In Touch</span></a>
                        </div>
                    </div>
                </div>
            </section> */}

            
            <FrequentlyAskedQuestions heading="Frequently Asked Questions On Luxury Ride Buy Back" pageType={cmsPage.slug} />

            {/* </WebsiteLayout > */}

        </div >

    )
}

export default BuyBack

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/luxury-ride-buy-back`);
    const data = await response.json();

    return {
        props: {
            cmsPage: data.cms_page ? data.cms_page : undefined,
        }
    }
}