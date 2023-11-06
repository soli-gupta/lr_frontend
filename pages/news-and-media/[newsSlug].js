import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { InlineShareButtons } from 'sharethis-reactjs';
import { useRouter } from 'next/router';
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import axios from 'axios';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';
import Link from 'next/link';
const fetcher = (url) => axios.get(url).then(res => res.data)

function Index() {

    const router = useRouter()
    const [blogDetail, setBlogDetail] = useState('')

    const { newsSlug } = router.query

    useEffect(() => {
        if (typeof window !== "undefined") {

            document.body.classList.add('mobile-menu-show');
        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('mobile-menu-show');
            }

        }


    }, [newsSlug]);

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}news-media-details/${newsSlug}`, fetcher);
    if (error) return <Loader />;
    if (!data) return <Loader />;

    //console.log(data)
    const settings = {
        slidesPerView: 1.2,
        spaceBetween: 10,
        loop: false,
        modules: [Pagination],
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
        }
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span className="' + className + '">' + "<i>" + (index + 1) + "</i>" + "</span>";
        },
    };

    return (
        <div>

            <WebHead pageTitle="Blog-Detail" />
            {/* <WebsiteLayout> */}
            <div className="home-banner blog-banner-detail">
                <img src={`${process.env.NEXT_PUBLIC_URL}public/news-media/${data && data.data && data.data.image}`} alt="" />
            </div>

            <div className='blog-bg'>
                <div className='wrapper'>

                    <div className="blog-detail commonm-gap">

                        <div className="blog-bread">Luxury Ride <span>{new Date(data && data.data && data.data.createdAt).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(data && data.data && data.data.createdAt).getDate()} {new Date(data && data.data && data.data.createdAt).toLocaleDateString('en-IN', { month: 'long' })}  {new Date(data && data.data && data.data.createdAt).getFullYear()}</span></div>

                        <h1>{data && data.data && data.data.title}</h1>
                        <>
                            {data && data.data && data.data.description}
                        </>

                    </div>
                </div>
            </div>

            <div className='blog-next-prev commonm-gap'>
                <div className='wrapper'>

                    <div className="blog-share"> <span>Share:</span>

                        <InlineShareButtons
                            config={{
                                alignment: 'left',  // alignment of buttons (left, center, right)
                                color: 'social',      // set the color of buttons (social, white)
                                enabled: true,        // show/hide buttons (true, false)
                                font_size: 16,        // font size for the buttons
                                labels: 'cta',        // button labels (cta, counts, null)
                                language: 'en',       // which language to use (see LANGUAGES)
                                networks: [           // which networks to include (see SHARING NETWORKS)
                                    'facebook',
                                    'twitter',
                                    'linkedin',
                                ],
                                padding: 5,          // padding within buttons (INTEGER)
                                radius: 4,            // the corner radius on each button (INTEGER)
                                show_total: false,
                                size: 30,

                            }}
                        />

                    </div>
                </div>

            </div>

            <div className='clr'></div>
            <section className="comPadBt50 blog-related youLikeSlider product-listing">
                <div className="wrapper">
                    <h2>Explore More News Media</h2>
                    <Swiper className='threeSlider' {...settings} pagination={{ clickable: true }}>

                        <SwiperSlide>
                            <div className='blog-row'>
                                <a className='full-link' href='#'></a>
                                <div className='image'><img className='image-radious' src="/img/blog-main-banner.jpg" alt="" /></div>

                                <div className='text'>

                                    <div className='blog-bread'>

                                        Luxury Ride <span>21 January 2023</span>

                                    </div>

                                    <h4>Best pre-owned sports cars to buy in India</h4>

                                    <p>Sports cars are unique! Sports cars are elite! They are the cars whose sound is magic to the ears. Sports cars are unique! Sports cars are elite!</p>

                                    <div className='tags'>

                                        <a href='#'>Sports Car</a>
                                        <a href='#'>Best Car</a>
                                        <a href='#'>New Tag</a>

                                    </div>

                                    <Link href="#" className="btn blueBdr">Read more</Link>

                                </div>

                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='blog-row'>
                                <a className='full-link' href='#'></a>
                                <div className='image'><img className='image-radious' src="/img/blog-main-banner.jpg" alt="" /></div>

                                <div className='text'>

                                    <div className='blog-bread'>

                                        Luxury Ride <span>21 January 2023</span>

                                    </div>

                                    <h4>Best pre-owned sports cars to buy in India</h4>

                                    <p>Sports cars are unique! Sports cars are elite! They are the cars whose sound is magic to the ears. Sports cars are unique! Sports cars are elite!</p>

                                    <div className='tags'>

                                        <a href='#'>Sports Car</a>
                                        <a href='#'>Best Car</a>
                                        <a href='#'>New Tag</a>

                                    </div>

                                </div>

                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='blog-row'>
                                <a className='full-link' href='#'></a>
                                <div className='image'><img className='image-radious' src="/img/blog-main-banner.jpg" alt="" /></div>

                                <div className='text'>

                                    <div className='blog-bread'>

                                        Luxury Ride <span>21 January 2023</span>

                                    </div>

                                    <h4>Best pre-owned sports cars to buy in India</h4>

                                    <p>Sports cars are unique! Sports cars are elite! They are the cars whose sound is magic to the ears. Sports cars are unique! Sports cars are elite!</p>

                                    <div className='tags'>

                                        <a href='#'>Sports Car</a>
                                        <a href='#'>Best Car</a>
                                        <a href='#'>New Tag</a>

                                    </div>

                                </div>

                            </div>
                        </SwiperSlide>


                        <SwiperSlide>
                            <div className='blog-row'>
                                <a className='full-link' href='#'></a>
                                <div className='image'><img className='image-radious' src="/img/blog-main-banner.jpg" alt="" /></div>

                                <div className='text'>

                                    <div className='blog-bread'>

                                        Luxury Ride <span>21 January 2023</span>

                                    </div>

                                    <h4>Best pre-owned sports cars to buy in India</h4>

                                    <p>Sports cars are unique! Sports cars are elite! They are the cars whose sound is magic to the ears. Sports cars are unique! Sports cars are elite!</p>

                                    <div className='tags'>

                                        <a href='#'>Sports Car</a>
                                        <a href='#'>Best Car</a>
                                        <a href='#'>New Tag</a>

                                    </div>

                                </div>

                            </div>
                        </SwiperSlide>





                    </Swiper>
                </div>
            </section>

            {/* </WebsiteLayout> */}
        </div>





    )
}

export default Index
