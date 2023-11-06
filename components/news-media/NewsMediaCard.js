import React, { useEffect, useState } from 'react'
import { fullDatabaseDateConverter } from '../Helper'
import Link from 'next/link'

const initialPostList = 6
const incrementInitialPostList = 3
export default function NewsMediaCard({ data }) {

    const [displayPosts, setDisplayPosts] = useState(initialPostList);

    const loadMore = () => {
        setDisplayPosts(displayPosts + incrementInitialPostList)
    }

    useEffect(() => {

    }, [data])

    return (
        <>
            <div className="row">
                {data ? data.slice(0, displayPosts).map((news, i) => {
                    return (
                        <div className="col-lg-4 col-md-6 mb-30" key={i}>
                            <div className="news-list-item">
                                <Link href={`${news.news_url}`} target="_blank">
                                    <div className="news-img">
                                        <img src={`${process.env.NEXT_PUBLIC_URL}${news.image}`} alt="" />
                                    </div>
                                    <div className="news-txt">
                                        <ul>
                                            <li>Luxury Ride</li>
                                            <li>{new Date(news.posted_date).getDate()} {new Date(news.posted_date).toLocaleDateString('en-IN', { month: 'long' })} {news.posted_date ? new Date(news.posted_date).getFullYear() : ''}</li>
                                        </ul>
                                        <h4>{news.title}</h4>
                                        <p>{news.short_description}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                }) : ''}

                {displayPosts < data.length ? (
                    <div className="col-md-12">
                        <div className="text-center">
                            <button class="btn blueBdr" onClick={loadMore}>Load More</button>
                        </div >
                    </div >
                ) : null}
            </div >
        </>
    )
}
