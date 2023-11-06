import React, { useEffect, useState } from 'react'
import WebsiteFooter from './WebsiteFooter'
import WebsiteHeader from './WebsiteHeader'
import SEO from './SEO'
import { useRouter } from "next/router";
import PixelLoader, { loadFacebookPixel } from '../PixelLoader';

export default function WebsiteLayout({ children }) {

    const [enableSEO, setEnableSEO] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // <PixelLoader />

        // const handleRouteChange = () => {
        //     <PixelLoader />
        // };

        // router.events.on('routeChangeComplete', handleRouteChange);

        // return () => {
        //     router.events.off('routeChangeComplete', handleRouteChange);
        // };
    }, [router]);

    return (
        <>
            <WebsiteHeader />
            {/* <PixelLoader /> */}
            {/* <SEO windowlayerData={`(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}')`} router={router} /> */}
            {children}
            {/* {enableSEO ? <SEO windowlayerData={`(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}')`} /> : ''} */}
            <WebsiteFooter />
        </>
    )
}
