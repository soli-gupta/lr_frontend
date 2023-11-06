import React, { useState, useEffect } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import NewsMediaComponent from '@/components/news-media/NewsMediaComponent';
import axios from 'axios';

function Index() {

    const [newsData, setNewsData] = useState('')



    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }


    const newsMediaData = async () => axios.get(`${process.env.NEXT_PUBLIC_URL}all-news-media-list`).then(function (res) {
        if (res.data.status == 1) {
            setNewsData(res.data.data)
        }
    }).catch(function (error) {
        console.log(error)
    });


    useEffect(() => {
        newsMediaData()
        if (typeof window !== "undefined") {
            document.body.classList.add('mobile-menu-show');
        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('mobile-menu-show');
            }

        }



    }, []);

    return (
        <>
            <WebHead pageTitle="News And Media" />
            {/* <WebsiteLayout> */}
            <div className="home-banner inner-banner mobile-view-hide">
                <img src="/img/News-Banner.png" alt="" />

                <div className="filter-section wd-filters">

                    <h2><span>Newsroom</span>A glimpse of our remarkable rise in India's <br />pre-owned car industry!</h2>

                </div>

            </div>

            <div className="inner-mobile-banner desktop-hide-div mobile-show-div center-text-banner">
                <img src="/img/News-Banner-mobile.png" alt="" />

                <div className="mobile-txt-banner">
                    <div className="wrapper">
                        <h2><span>Newsroom</span>A glimpse of our remarkable rise in India's pre-owned car industry!</h2>


                    </div>
                </div>
            </div>

            <section className="news-container bg-grey">
                <NewsMediaComponent data={newsData} />
            </section >
            {/* </WebsiteLayout > */}
        </>
    )
}

export default Index
