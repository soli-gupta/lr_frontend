import React from 'react'
import Lottie from "lottie-react";
import notFound from "../public/lotie-icons/not-found.json";
import WebHead from '@/components/common/WebHead';
import Link from 'next/link';
import WebsiteHeader from '@/components/common/WebsiteHeader';
import WebsiteFooter from '@/components/common/WebsiteFooter';


export default function Index() {
    return (
        <>
            <WebHead pageTitle='Error 404 - Page Not Found' />
            {/* <WebsiteHeader /> */}
            <div className='not-found'>

                <div className="wrapper">

                    <div className='lotie-icon'><Lottie animationData={notFound} loop={true} /></div>

                    <h1>Error 404 - Page Not Found</h1>

                    <p>Oops! Looks like you’ve stumbled upon a missing page. We apologize for the inconvenience.<br /> Please double-check the URL or navigate to our homepage.</p>

                    <Link href="/" className="btn reverse">Go to Homepage</Link>

                </div>

            </div>
            {/* <WebsiteFooter /> */}
        </>
    )
}
