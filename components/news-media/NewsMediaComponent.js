import React, { useState } from 'react'
import { useEffect } from 'react';
import NewsMediaCard from './NewsMediaCard';

export default function NewsMediaComponent({ data }) {

    const [ShowRelevance, setShowRelevance] = useState(false);
    const [cards, setCards] = useState(data);
    const [currentCard, setCurrentCard] = useState('all');
    const [MobileText, setMobileText] = useState("All");
    const [Filter, setFilter] = useState(false);

    let date = new Date()
    let year = date.getFullYear()

    const Relevance = () => {
        setShowRelevance(!ShowRelevance)
    }
    if (typeof window !== "undefined") {
        document.body.classList.remove('hide-scroll');
    }

    let uniqueYear = [...new Set(data && data.length > 0 && data.map((item) => new Date(item.posted_date).getFullYear()))];

    const handleBtns = (id, e) => {
        setCurrentCard(id);
        setMobileText(e.target.innerText)
        setFilter(false)

    };

    const closePop = () => {
        setFilter(false)
    }

    const openFilter = () => {

        setFilter(true)

    }

    useEffect(() => {
        if (currentCard === 'all') {
            setCards(data);
        } else {
            const filtered = data.filter((card) => {

                return (
                    new Date(card.posted_date).getFullYear() === currentCard
                );
            });
            setCards(filtered);
        }
    }, [currentCard, data])

    return (
        <>
            <div className="filter-news commonm-gap">
                <div className="wrapper">
                    <div className="row justify-content-center">
                        <div className="col-md-10">


                            <div className={`news-filter page-filters no-scroll`}>

                                <div onClick={openFilter} className='mobile-style mobile-style-btn'>{MobileText}</div>

                                <div className={`${Filter ? "open-filter" : ""} mobile-hide`}>
                                    <div onClick={closePop} className="overlay-mob mobile-style page-filter"></div>

                                    <div className='mob-filter-style'>
                                        <h3 className='mobile-style'>Explore by categories</h3>
                                        <ul>
                                            <li className={`${currentCard === 'all' ? 'active' : ''}`} onClick={(e) => handleBtns('all', e)}>All</li>
                                            {uniqueYear && uniqueYear.reverse().map((years, i) => {
                                                return (
                                                    <>
                                                        <li className={`${currentCard === years ? 'active' : ''}`} onClick={(e) => handleBtns(years, e)} key={i} >{years}
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>

                                        <div class="center-btns two-btn mobile-style"><div class="popup-close-mob" onClick={closePop}>Close</div></div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div >
                </div >
            </div >

            <div className="news-listbx commonm-gap">
                <div className="wrapper">
                    <NewsMediaCard data={cards} />
                </div >
            </div >
        </>
    )
}
