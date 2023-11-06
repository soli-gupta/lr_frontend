import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import axios from 'axios';
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import noData from "@/public/lotie-icons/not-data-found.json"
import Lottie from "lottie-react";

const fetcher = (url) => axios.get(url).then(res => res.data)

export default function BlogComponent({ blogsList }) {

    const router = useRouter()
    const [cards, setCards] = useState(blogsList);
    const [currentCard, setCurrentCard] = useState('all');
    const [MobText, setMobText] = useState('all');
    const [Filter, setFilter] = useState(false);

    const openFilter = () => {

        setFilter(true)

    }

    const closePop = () => {
        setFilter(false)
    }

    const handleBtns = (id, e) => {
        setCurrentCard(id);
        setMobText(e.target.innerText)
        setFilter(false)

    };

    // const viewBlogDetails = (_id) => {
    //     router.push(`/blog/${_id}`);
    // }

    useEffect(() => {
        if (currentCard === 'all') {
            setCards(blogsList);
        } else {
            const filtered = blogsList.filter((card) => {
                console.log(card)
                return (
                    card.blog_category_id && card.blog_category_id._id === currentCard
                );
            });
            setCards(filtered);
        }

    }, [currentCard, blogsList])

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}all-blog-category`, fetcher);
    if (error) return <Loader />;
    if (!data) return <Loader />;

    // console.log(blogsList)
    return (
        <>

            <div className='blog-left'>
                <h3>Explore By Categories</h3>

                <div className=' page-filters'>
                    <div onClick={openFilter} className='mobile-style mobile-style-btn'>{MobText}</div>
                    <div className={`${Filter ? "open-filter" : ""} mobile-hide`}>
                        <div onClick={closePop} className="overlay-mob mobile-style page-filter"></div>
                        <div className='mob-filter-style'>
                            <h3 className='mobile-style'>Explore By Categories</h3>
                            <ul>
                                <li className={`${currentCard === 'all' ? 'active' : ''}`} onClick={(e) => handleBtns('all', e)}> All </li>
                                {data && data.data && data.data.map((cate, i) => {
                                    return (
                                        <>
                                            <li className={`${currentCard === cate._id ? 'active' : ''}`} onClick={(e) => handleBtns(cate._id, e)} key={i} >{cate.name}</li>
                                        </>
                                    )
                                })}
                            </ul>

                            <div class="center-btns two-btn mobile-style"><div class="popup-close-mob" onClick={closePop}>Close</div></div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='blog-right'>
                <div className={`${cards.length == 0 ? "no-blog-data" : ""} blog-parent`}>
                    {cards !== '' && cards.length > 0 ? cards.slice(1)?.map((card, i) => {
                        return (
                            <div className='blog-row' key={i} >
                                <Link className='full-link' href={`blog/${card.blog_slug}`}></Link>
                                <div className='image'><img className='image-radious' src={`${process.env.NEXT_PUBLIC_URL}public/blog-post/${card.blog_image}`} alt="" /></div>

                                <div className='text'>

                                    <div className='blog-bread'>
                                        Luxury Ride
                                        <span>
                                            {new Date(card.blog_posted_date).getDate()} {new Date(card.blog_posted_date).toLocaleDateString('en-IN', { month: 'long' })} {new Date(card.blog_posted_date).getFullYear()}

                                        </span>
                                    </div>
                                    <h4>{card.blog_name}</h4>
                                    <p>{card.blog_short_description}</p>
                                    <div className='tags'>
                                        {card.blog_tag && card.blog_tag.map((tag, i) => {
                                            return (
                                                <>
                                                    <span>{tag.name}</span>
                                                </>
                                            )
                                        })}
                                    </div>

                                    <Link href={`blog/${card.blog_slug}`} className="btn blueBdr">Read more</Link>
                                </div>
                            </div>
                        )
                    }) :
                        <div className='no-data-found'>

                            <div className='lotie'> <Lottie animationData={noData} loop={true} /></div>
                            <h3>Data not found</h3>
                        </div>
                    }
                </div>

            </div>

        </>
    )
}

