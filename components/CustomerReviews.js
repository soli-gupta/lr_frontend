import FsLightbox from 'fslightbox-react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";

import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";



function CustomerReviews() {


    const [toggler, setToggler] = useState(false);
    const [VideoUrl, setVideoUrl] = useState();

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


    return (
        <section className="customer-reviews commonm-gap">




            <div className="wrapper">

                <div className="center-text">

                    <h2>Customers Reviews</h2>

                    <p>Top Rated Solutions Delivered</p>
                </div>

            </div>

            <div className="customersReviewsSec ">


                <FsLightbox

                    toggler={toggler}

                    sources={[

                        `${VideoUrl}`,


                    ]}



                />

                <Swiper {...swiperSetting} pagination={{ clickable: true }}>

                    <SwiperSlide>



                        <div className='review video-review'>

                            <div className='image' id='https://www.youtube.com/watch?v=xsSOBFrGQlY?autoplay' onClick={VideoPlay}><img src="/img/review-img.png" /></div>

                            <div className='text'>

                                <div className='user-name'>Rahul Kumar</div>
                                <div className='user-car'>Audi A8</div>
                                <div className='service-type'>Standard Service</div>

                                <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be taken care of by their staff. Never over charge, never replace any part blindly.</p>

                                <div className='comment-date'>8:35 PM - Dec 19, 2022</div>

                                <div className='rating'>

                                    <ul>

                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='review video-review'>

                            <div className='image' id='https://www.youtube.com/watch?v=8Mn7OCnJIv4' onClick={VideoPlay}><img src="/img/review-img.png" /></div>

                            <div className='text'>

                                <div className='user-name'>Rahul Kumar</div>
                                <div className='user-car'>Audi A8</div>
                                <div className='service-type'>Standard Service</div>

                                <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be taken care of by their staff. Never over charge, never replace any part blindly.</p>

                                <div className='comment-date'>8:35 PM - Dec 19, 2022</div>

                                <div className='rating'>

                                    <ul>

                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='review'>



                            <div className='text'>

                                <div className='user-name'>Rahul Kumar</div>
                                <div className='user-car'>Audi A8</div>
                                <div className='service-type'>Standard Service</div>

                                <div className='no-image'>

                                    <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be taken care of by their staff. Never over charge, never replace any part blindly.</p>

                                    <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be taken care of by their staff. Never over charge, never replace any part blindly.</p>

                                    <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be </p>

                                </div>



                                <div className='comment-date'>8:35 PM - Dec 19, 2022</div>

                                <div className='rating'>

                                    <ul>

                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                    <SwiperSlide>

                        <div className='review'>

                            <div className='image'><img src="/img/review-img.png" /></div>

                            <div className='text'>

                                <div className='user-name'>Rahul Kumar</div>
                                <div className='user-car'>Audi A8</div>
                                <div className='service-type'>Standard Service</div>

                                <p>Extremely satisfied with their services. You can just leave your car, go home and relax as rest will be taken care of by their staff. Never over charge, never replace any part blindly.</p>

                                <div className='comment-date'>8:35 PM - Dec 19, 2022</div>

                                <div className='rating'>

                                    <ul>

                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>





                </Swiper>

            </div>


        </section>

    )
}


export default CustomerReviews;