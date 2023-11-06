import React, { useState } from 'react'
import FsLightbox from 'fslightbox-react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import Loader from '../common/Loader';


const fetcher = (url) => axios.get(url).then(res => res.data);


function FrequentlyAskedQuestions({ pageType, heading }) {

    const Url = process.env.NEXT_PUBLIC_URL;


    const [fetchFAQs, setFetchFAQs] = useState([]);

    const { data, error } = useSWR(`${Url}get-faqs-by-page/${pageType}`, fetcher);

    const GetAllFAQs = async () => {
        // const getFAQs = useSWR(`${Url}get-faqs-by-page/${pageType}`);
        // const getFAQs = axios.get(`${Url}get-faqs-by-page/${pageType}`).then((res) => {
        //     setFetchFAQs(res.data.faqs);
        // }).catch((e) => {
        //     setFetchFAQs([]);
        // });
    }

    if (error) return <Loader loaderTitle={`Something went wrong.`} />
    if (!data) return <Loader loaderTitle={`Loading...`} />


    return (
        <>
            <section className='faq-for-sell commonm-gap'>
                <div className="wrapper">
                    <div className="center-text">
                        <h2>{heading}</h2>
                        <p>Have questions? We’re here to help.</p>
                    </div>

                    <div className='common-sell-faq'>
                        <Accordion allowZeroExpanded > 
                            {
                                data.faqs && data.faqs.map((faq, i) => {
                                    return (

                                        <AccordionItem   key={faq._id}>
                                            <AccordionItemHeading className="accordion-item">
                                                <AccordionItemButton className='acrd-title'>
                                                    {faq.faq_question} 
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                             
                                                    {/* {faq.faq_description} */}
                                                    <div className='faq-test' dangerouslySetInnerHTML={{ __html: faq.faq_description }}></div>
                                                
                                            </AccordionItemPanel>
                                        </AccordionItem>

                                    )
                                })
                            }
                        </Accordion>
                    </div>
                </div>
            </section>

            <section className='get-in-touch commonm-gap pt-0'>
                <div className="wrapper">
                    <div className='still-quebx'>
                        <div className='left-que-bx'>
                            <div className='que-icon-img'>
                                <img src="img/get-in-touch.png" alt="" />
                            </div>
                            <div className='que-txt'>
                                <h3>Still have questions?</h3>
                                <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                            </div>
                        </div>
                        <div className='right-que-bx'>
                            <Link href="/contact-us" class="btn arrow-style blue-btn"><span>Get In Touch</span></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default FrequentlyAskedQuestions