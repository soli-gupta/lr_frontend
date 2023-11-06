
// import Script from "next/script";
// import { useEffect, useState } from "react";
// import useRouter from 'next/router';

// const SEO = ({ router }) => {

//     const [useTime, setUseTime] = useState(false);

//     useEffect(() => {

//         setTimeout(() => {
//             setUseTime(true);
//         }, 1000);

//     }, [router.asPath, router.pathname]);
//     // strategy="afterInteractive"
//     //     return useTime ? <Script id="facebook-pixel">
//     //         {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':

//     // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

//     //                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

//     //                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

//     // })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`}
//     //     </Script> : <Script id="facebook-pixel">
//     //         {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':

//     // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

//     //                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

//     //                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

//     // })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`}
//     //     </Script>
//     console.log('useTime : ', useTime)
//     console.log('router.asPath : ', router.asPath)
//     console.log('router.pathname : ', router.pathname)
//     console.log('router.location : ', router.location)
//     return useTime ? <Script id="google-tag-manager" strategy="lazyOnload" dangerouslySetInnerHTML={{
//         __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':

// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

//               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

//               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

// })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`
//     }}>
//     </Script> : <Script id="google-tag-manager" strategy="lazyOnload" dangerouslySetInnerHTML={{
//         __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':

// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

//                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

//                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

// })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`
//     }}>
//     </Script>
//     // </Head>
// }

// export default SEO;