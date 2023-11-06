import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PixelLoader = () => {
    const router = useRouter();
    const [loadPixel, setLoadPixel] = useState(false);

    const loadFacebookPixel = () => {
        if (typeof window !== "undefined") {
            if (typeof fbq === 'function') { fbq = null }

            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);

            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            // setTimeout(() => {
            fbq('init', '545715133393562');
            fbq('track', 'PageView');
            router.pathname === '/buy/test-drive/thank-you/[orderId]' ? fbq('track', 'SubmitApplication') : '';
            router.pathname === '/sell/thank-you' ? fbq('track', 'CompleteRegistration') : '';
            // }, 500);
        }
    };

    useEffect(() => {
        // setLoadPixel(true);

        // const timeout = setTimeout(() => {
        //     // loadFacebookPixel(); // Load the Facebook Pixel script

        //     const handleRouteChange = () => {
        //         loadFacebookPixel(); // Load on route change
        //     };

        //     router.events.on('routeChangeComplete', handleRouteChange);

        //     return () => {
        //         router.events.off('routeChangeComplete', handleRouteChange);
        //     };
        // }, 100); // Delay for 100 milliseconds

        // return () => {
        //     clearTimeout(timeout); // Clean up the timeout
        // };

        // Load Facebook Pixel on initial mount
        // loadFacebookPixel();

        // const handleRouteChange = () => {
        //     loadFacebookPixel(); // Load on route change
        // };

        // // Set up event listener for route changes
        // router.events.on("routeChangeComplete", handleRouteChange);

        // // Clean up the event listener when component unmounts
        // return () => {
        //     router.events.off("routeChangeComplete", handleRouteChange);
        // };

        // console.log("PixelLoader component mounted.");

        // Load Facebook Pixel on initial mount
        loadFacebookPixel();

        const handleRouteChange = () => {
            // console.log("Route change detected.");
            loadFacebookPixel(); // Load on route change
        };

        // Set up event listener for route changes
        router.events.on("routeChangeComplete", handleRouteChange);

        // Clean up the event listener when component unmounts
        return () => {
            // console.log("PixelLoader component unmounted.");
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    return null;
    // loadPixel ? loadFacebookPixel() : loadFacebookPixel();
};

export default PixelLoader;


// import { useLayoutEffect } from "react";
// // import { useRouter } from "next/router";

// // const loadFacebookPixel = () => {
// //     // Your Facebook Pixel script implementation
// // };

// const PixelLoader = () => {
//     const router = useRouter();

//     useLayoutEffect(() => {
//         const timeout = setTimeout(() => {
//             loadFacebookPixel(); // Load the Facebook Pixel script

//             const handleRouteChange = () => {
//                 loadFacebookPixel(); // Load on route change
//             };

//             router.events.on('routeChangeComplete', handleRouteChange);

//             return () => {
//                 router.events.off('routeChangeComplete', handleRouteChange);
//             };
//         }, 100); // Delay for 100 milliseconds

//         return () => {
//             clearTimeout(timeout); // Clean up the timeout
//         };
//     }, [router]);

//     return null; // Doesn't render anything visible
// };

// export default PixelLoader;


   // loadFacebookPixel();
        // // TagManager.dataLayer({ event: 'page_view' });

        // const handleRouteChange = () => {
        //     loadFacebookPixel();
        //     console.log('hgsdfhgsdhgfhg');
        // };

        // router.events.on('routeChangeComplete', handleRouteChange);

        // return () => {
        //     router.events.off('routeChangeComplete', handleRouteChange);
        // };