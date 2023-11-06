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
import Head from 'next/head';
const fetcher = (url) => axios.get(url).then(res => res.data)

function SellIndex(blogItem) {

    const router = useRouter()
    const [blogDetail, setBlogDetail] = useState('')
    const [displayPosts, setDisplayPosts] = useState(5);

    const { blogSlug } = router.query

    const reacentBlogList = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}blogs`).then(function (res) {
            if (res.data.status == 1) {
                setBlogDetail(res.data.data)
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        reacentBlogList()
        if (typeof window !== "undefined") {

            document.body.classList.add('mobile-menu-show');
        }

        return () => {
            if (typeof window !== "undefined") {

                document.body.classList.remove('mobile-menu-show');
            }

        }


    }, [blogSlug]);

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}blogs/${blogSlug}`, fetcher);
    // if (error) return <Loader />;
    // if (!data) return <Loader />;

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

            {/* <WebHead pageTitle="Blog-Detail" /> */}
            {/* <WebsiteLayout> */}
            <Head>
                <title>{`${'Blog'} | Luxury Ride`}</title>
                <meta name="description" content={blogItem && blogItem.blogItem && blogItem.blogItem.blog_meta_description ? blogItem.blogItem.blog_meta_description : ''} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                {/* blog_page_title */}
                <meta property="og:title" content={blogItem && blogItem.blogItem && blogItem.blogItem.blog_page_title ? blogItem.blogItem.blog_page_title : ''} />
                <meta
                    property="og:description"
                    content={blogItem && blogItem.blogItem && blogItem.blogItem.blog_meta_description ? blogItem.blogItem.blog_meta_description : ''}
                />
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${blogItem && blogItem.blogItem && blogItem.blogItem.blog_image}`}
                />

                <link href="/img/lr-favicon.ico" rel="icon" media="(prefers-color-scheme: light)" />
                <link href="/img/lr-favicon-dark.ico" rel="icon" media="(prefers-color-scheme: dark)" />

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" />
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />

                <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' defer />

                <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js" defer></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"
                />
            </Head>
            <div className="home-banner blog-banner-detail">
                <img src={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${data && data.data && data.data.blog_image}`} alt="" />
            </div>

            <div className='blog-bg'>
                <div className='wrapper'>

                    <div className="blog-detail commonm-gap">

                        <div className="blog-bread">Luxury Ride <span>{new Date(data && data.data && data.data.blog_posted_date).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(data && data.data && data.data.blog_posted_date).getDate()} {new Date(data && data.data && data.data.blog_posted_date).toLocaleDateString('en-IN', { month: 'long' })}  {new Date(data && data.data && data.data.blog_posted_date).getFullYear()}</span></div>

                        <h1>{data && data.data && data.data.blog_name}</h1>
                        <div dangerouslySetInnerHTML={{ __html: data && data.data && data.data.blog_description }}></div>

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
                    <div className='next-prev'>
                        <a href='#'> <span><span>Previous Blog</span> Top used Sedans to buy under 50 lakhs</span></a>
                        <a href='#'> <span><span>Next Blog</span> Top used Sedans to buy under 50 lakhs</span></a>
                    </div>
                </div>

            </div>

            <div className='clr'></div>
            <section className="comPadBt50 blog-related youLikeSlider product-listing">
                <div className="wrapper">
                    <h2>Explore More Blogs</h2>
                    <Swiper className='threeSlider' {...settings} pagination={{ clickable: true }}>
                        {blogDetail && blogDetail.slice(1, displayPosts).map((blogs, i) => {
                            return (
                                <SwiperSlide>
                                    <div className='blog-row' key={i}>
                                        <Link className='full-link' href={`/blog/${blogs.blog_slug}`}></Link>
                                        <div className='image'>
                                            <img className='image-radious' src={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${blogs.blog_image}`} alt="" />
                                        </div>

                                        <div className='text'>

                                            <div className='blog-bread'>

                                                Luxury Ride <span>{new Date(blogs.blog_posted_date).getDate()} {new Date(blogs.blog_posted_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(blogs.blog_posted_date).getFullYear()}</span>

                                            </div>

                                            <h4>{blogs.blog_name}</h4>

                                            <p>{blogs.blog_short_description}</p>

                                            <div className='tags'>
                                                {blogs.blog_tag && blogs.blog_tag.map((tag, i) => {
                                                    return (
                                                        <>
                                                            <span key={i}>{tag.name}</span>
                                                        </>
                                                    )
                                                })}
                                            </div>

                                            <Link href={`blog/${blogs.blog_slug}`} className="btn blueBdr">Read more</Link>

                                        </div>

                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </section>

            {/* </WebsiteLayout> */}
        </div>
    )
}

export default SellIndex

export async function getServerSideProps({ params }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}blogs/${params.blogSlug}`);
    const data = await response.json();

    return {
        props: { blogItem: data && data.data }
    }
}
