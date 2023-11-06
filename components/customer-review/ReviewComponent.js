import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import FsLightbox from 'fslightbox-react';
import axios from 'axios';
import "swiper/css";
import "swiper/css/pagination";
import { $ } from 'react-jquery-plugin'
import { useRouter } from 'next/router';

import { createLiElements, formatAMPM } from '../Helper';

export default function ReviewComponent({ type }) {
    const [toggler, setToggler] = useState(false);
    const [VideoUrl, setVideoUrl] = useState();
    const [review, setReview] = useState('')
    const [HideReview, setHideReview] = useState(false);
    // Store form Value
    const router = useRouter()
    const allReviewData = async () => {
        let testimonialUrl = ''
        if (type) {
            testimonialUrl = `${process.env.NEXT_PUBLIC_URL}testimonial/${type}`
        } else {
            testimonialUrl = `${process.env.NEXT_PUBLIC_URL}all-testimonial-list`
        }
        await axios.get(`${testimonialUrl}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.data && res.data.status === 1) {
                setReview(res.data.data)
            }
        }).catch((e) => {
            if (e.response && e.response.data.status === 0) {
                alert('Something went wrong. Please fill all details and click agin for Book a Visit.');
            }
        })

    }

    const swiperSetting = {
        slidesPerView: 1.2,
        spaceBetween: 15,
        loop: false,
        modules: [Pagination],
        breakpoints: {
            1200: {
                slidesPerView: 3.5,
                spaceBetween: 50,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 25,
            },
        }
    }


    const VideoPlay = (e) => {
        setVideoUrl(e.currentTarget.id)
        setToggler(!toggler)

    }

    useEffect(() => {
        allReviewData()
    }, [type])


    const HidePopup = () => {
        setHideReview(false)

    }


    if (typeof window !== "undefined") {

        $(".read-more-review").on("click", function () {

            setTimeout(() => {
                var moredata = $(this).parent().parent().find(".more-data").html();
                $(".text-data").html(moredata)
                setHideReview(true)
            }, 300);

        })



    }

    return (
        <>


            <div style={{ display: HideReview ? "block" : "none" }} className={`common-popup review-pop get-acall`}>
                <div className="overlay-mob mobile-style " onClick={HidePopup}></div>
                <div className='popup-inner' onClick={HidePopup}>

                    <div className='popup-close' ></div>


                    <div className='text-data'></div>

                </div>

            </div>



            <div className="customersReviewsSec commonm-gap">

                <div className="wrapper">

                    <div className="center-text">

                        <h2>Customers Reviews</h2>

                        <p>Top Rated Solutions Delivered</p>
                    </div>

                </div>


                <FsLightbox
                    toggler={toggler}
                    sources={[
                        `${VideoUrl}`,

                    ]}
                />

                <Swiper {...swiperSetting} pagination={{ clickable: true }}>

                    {review ? review.map((reviews, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className={`review ${reviews.video_url ? 'video-review' : ''}   `}>
                                    {reviews.video_url ?
                                        <div className='image' id={`${reviews.video_url}?autoplay`} onClick={VideoPlay}>
                                            <img src={`${process.env.NEXT_PUBLIC_URL}public/testimonial/${reviews.user_image}`} />
                                        </div> : reviews.user_image ? <img src={`${process.env.NEXT_PUBLIC_URL}public/testimonial/${reviews.user_image}`} /> : <img src="img/image-placeholder.png" />
                                    }


                                    <div className='text'>

                                        <div className='user-name'>{`${reviews.first_name} ${reviews.last_name}`}</div>
                                        <div className='user-car'>{reviews.product_name}</div>
                                        <div className='service-type'>{router.pathname === '/' ? reviews.service_name ? reviews.service_name : '' : ''}
                                        </div>

                                        <p>{reviews.description ? reviews.description.substring(0, 180) : ''}
                                            {reviews.description.length > 180 ? "..." : ''}
                                            {reviews.description.length > 180 ? <span className='read-more-review'>Read more</span> : ''}</p>



                                        <div className='more-data'>
                                            {reviews.video_url ?
                                                <div className='image' id={`${reviews.video_url}?autoplay`} onClick={VideoPlay}>
                                                    <img src={`${process.env.NEXT_PUBLIC_URL}public/testimonial/${reviews.user_image}`} />
                                                </div> : reviews.user_image ? <img src={`${process.env.NEXT_PUBLIC_URL}public/testimonial/${reviews.user_image}`} /> : <img src="img/image-placeholder.png" />
                                            }

                                            <div className='user-name'>{`${reviews.first_name} ${reviews.last_name}`}</div>
                                            <div className='user-car'>{reviews.product_name}</div>
                                            <div className='service-type'>{router.pathname === '/' ? reviews.service_name ? reviews.service_name : '' : ''}</div>
                                            <div className='text'>
                                                {reviews.description}

                                            </div>

                                        </div>

                                        {/* <div className='comment-date'>
                                            {formatAMPM(new Date(reviews.createdAt))} - {new Date(reviews.createdAt).toLocaleDateString('en-IN', { month: 'short' })} {new Date(reviews.createdAt).getDate()}, {new Date(reviews.createdAt).getFullYear()}
                                        </div> */}
                                        <div className='rating'>
                                            <ul>
                                                {createLiElements(reviews.rating)}
                                            </ul>

                                        </div>

                                    </div >
                                </div >
                            </SwiperSlide >
                        )
                    })

                        : ''}


                </Swiper >

            </div >


        </>
    )
}
