import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head'
import { Swiper, SwiperSlide } from "swiper/react";
import MultiRangeSlider from '@/pages/rangeslider/MultiRangeSlider';
import { Navigation, Autoplay } from "swiper";
import { $ } from 'react-jquery-plugin'
import FsLightbox from 'fslightbox-react';

import "swiper/css";
import "swiper/css/pagination";
import WebsiteLayout from '@/components/common/WebsiteLayout';
import WebHead from '@/components/common/WebHead';
import CustomerReviews from '@/components/CustomerReviews';



function LuxuryRideAssurance() {

    const [scroll, setScroll] = useState(false);
    const [Hamburger, setHamburger] = useState(false);
    const [toggler, setToggler] = useState(false);
    const [CustomSearch, setCustomSearch] = useState(false);
    const [VideoUrl, setVideoUrl] = useState();

    const VideoPlay = (e) => {
        setVideoUrl(e.currentTarget.id)
        setToggler(!toggler)

    }

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



    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }

    useEffect(() => {

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
    }, []);



    const swiperSetting = {
        slidesPerView: 1.5,
        spaceBetween: 50,
        navigation: true,
        autoplay: {
            delay: 100,
        },
        modules: [Navigation, Autoplay],
        breakpoints: {
            1200: {
                slidesPerView: 3.5,
            },
            768: {
                slidesPerView: 2.5,
            },
        }
    }

    return (
        <div>
            <WebHead pageTitle={`Luxury Ride Assurance`} />
            <WebsiteLayout>



                <div className="home-banner inner-banner">
                    <img src="img/assurance-banner.jpg" alt="" className="desktop-banner" />
                    <img src="img/banner-bottom-mobile.png" alt="" className="mobile-banner" />

                    <div className="filter-section service-fliter">

                        <h2>Luxury Ride <i>Assurance</i></h2>
                        <div className='banner-subheading'>We believe in making simple and fair deals, also assure best pricing either you are buying or selling a car</div>

                        <a href="#" className="btn center arrow-style blueBdr">View Inventory</a>

                    </div>

                </div >

                <div className="banner-bottom-cta desktop-hide-div mobile-show-div"><a href="#" class="btn arrow-style blue-btn">View Inventory</a></div>

                <section className='made-simple  buyback'>
                    <div className='shadow-text'>



                    </div>
                    <div className="wrapper">
                        <div className='row'>
                            <div className='col-md-7'>

                                <h2>The sure road to car joy</h2>

                                <p>Luxury Ride Assured® is our promise of making your car buying and ownership journey completely convenient and confident. Through benefits such as our <span>350-point inspection, one-year warranty, 5-day money back guarantee, Fixed Price Assurance and Buyback,</span> you can trust Luxury Ride to bring you car joy.</p>




                            </div>

                        </div>
                    </div>
                </section>

                <section className='paralex-banners'>

                    <div className="parallax-image">
                        <img src="img/money-back-banner.jpg" alt="" />

                        <div className='banner-text'>
                            <h3>15 days Money Back Guarantee</h3>
                            <p>At Luxury Ride, we are only happy when you are. And that is why every Luxury Ride Assured® car comes with a no-questions-asked five day money back guarantee.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>

                    </div>
                    <div className="parallax-image">
                        <img src="img/certified-banner.jpg" alt="" />
                        <div className='banner-text'>
                            <h3>Certified evaluated cars with 350+ checks</h3>
                            <p>Every Luxury car is carefully handpicked. In addition to being in excellent driving condition and transparent history, it must pass our strict two hundred-point quality inspection.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>
                    </div>

                    <div className="parallax-image">
                        <img src="img/warranty-banner.jpg" alt="" />
                        <div className='banner-text'>
                            <h3>6 Months Engine & Gearbox Warranty</h3>
                            <p>Car ownership is about doing things, going places and pushing towards your goals. Our one-year warranty is our way of being there for you in your journey.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>
                    </div>

                    <div className="parallax-image">
                        <img src="img/year-buyback.jpg" alt="" />
                        <div className='banner-text'>
                            <h3>1/ 2/ 3 Years Buy Back</h3>
                            <p>We want you to enjoy the freedom that comes with a car. Luxury Ride Buyback makes resale of your car or upgrading it, rewarding and hassle-free.</p>
                            <a href="#" className="btn center arrow-style blueBdr">Know More</a>
                        </div>
                    </div>



                </section>

                <CustomerReviews />


            </WebsiteLayout >




        </div >





    )
}

export default LuxuryRideAssurance
