// import { useEffect } from 'react';

// function PixelLoader() {
//     useEffect(() => {
//         // Load the Facebook Pixel script on the client side
//         !function (f, b, e, v, n, t, s) {
//             if (f.fbq) return; n = f.fbq = function () {
//                 n.callMethod ?
//                     n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//             };
//             if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//             n.queue = []; t = b.createElement(e); t.async = !0;
//             t.src = v; s = b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t, s)
//         }(window, document, 'script',
//             'https://connect.facebook.net/en_US/fbevents.js');

//         // Initialize the Facebook Pixel
//         fbq('init', `${process.env.NEXT_PUBLIC_GTM_ID}`);
//         fbq('track', 'PageView');
//     }, []);

//     return null; // The component doesn't render anything
// }

// export default PixelLoader;


// import Script from 'next/script';
// import { useEffect } from 'react';

// const PixelLoader = ({ trackEvent }) => {
//     const loadPixelScript = <script suppressHydrationWarning dangerouslySetInnerHTML={{
//         __html: `

//     !function (f, b, e, v, n, t, s) {
//         if (f.fbq) return; n = f.fbq = function () {
//             n.callMethod ?
//                 n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//         };
//         if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//         n.queue = []; t = b.createElement(e); t.async = !0;
//         t.src = v; s = b.getElementsByTagName(e)[0];
//         s.parentNode.insertBefore(t, s)
//     }(window, document, 'script',
//         'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '545715133393562');
//     fbq('track', 'PageView');

//     `}}>

//     </script>

//     const loadNoScript = <noscript>
//         <img height="1" width="1" style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=545715133393562&ev=PageView&noscript=1" />

//     </noscript>

//     useEffect(() => {
//     }, []);

//     return <>
//         {loadPixelScript}
//         {loadNoScript}
//     </>
// };



// export default PixelLoader;




// !function (f, b, e, v, n, t, s) {
//     if (f.fbq) return; n = f.fbq = function () {
//         n.callMethod ?
//             n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//     };
//     if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//     n.queue = []; t = b.createElement(e); t.async = !0;
//     t.src = v; s = b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t, s)
// }(window, document, 'script',
//     'https://connect.facebook.net/en_US/fbevents.js');

// // Initialize the Facebook Pixel
// fbq('init', '&#39;545715133393562&#39;);');
// fbq('track', 'PageView');

// !function (f, b, e, v, n, t, s) {
//     if (f.fbq) return; n = f.fbq = function () {
//         n.callMethod ?
//         n.callMethod.apply(n, arguments) : n.queue.push(arguments)
//     };
//     if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
//     n.queue = []; t = b.createElement(e); t.async = !0;
//     t.src = v; s = b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t, s)
// }(window, document, 'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '545715133393562');
// fbq('track', 'PageView');


// import React, { useEffect } from 'react';

// const PixelLoader = () => {
//     useEffect(() => {
//         const loadFacebookPixel = () => {
//             !function (f, b, e, v, n, t, s) {
//                 if (f.fbq) return;
//                 n = f.fbq = function () {
//                     n.callMethod ?
//                         n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//                 };
//                 if (!f._fbq) f._fbq = n;
//                 n.push = n;
//                 n.loaded = !0;
//                 n.version = '2.0';
//                 n.queue = [];
//                 t = b.createElement(e);
//                 t.async = !0;
//                 t.src = v;
//                 s = b.getElementsByTagName(e)[0];
//                 s.parentNode.insertBefore(t, s);
//             }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

//             // Set up pixel after script has loaded
//             window.fbq('init', '545715133393562');
//             window.fbq('track', 'PageView');
//         };

//         // Load Facebook Pixel script dynamically
//         const script = document.createElement('script');
//         script.async = true;
//         script.src = 'https://connect.facebook.net/en_US/fbevents.js';
//         script.onload = loadFacebookPixel;
//         document.head.appendChild(script);

//         // Load noscript image
//         const noscriptImg = document.createElement('img');
//         noscriptImg.height = '1';
//         noscriptImg.width = '1';
//         noscriptImg.style.display = 'none';
//         noscriptImg.src = 'https://www.facebook.com/tr?id=545715133393562&ev=PageView&noscript=1';
//         document.body.appendChild(noscriptImg);

//     }, []);

//     return null;
// };

// export default PixelLoader;





// import React from 'react';

// const FacebookPixelLayout = ({ children }) => {
//     const loadFacebookPixel = () => {
//         !function (f, b, e, v, n, t, s) {
//             if (f.fbq) return;
//             n = f.fbq = function () {
//                 n.callMethod ?
//                     n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//             };
//             if (!f._fbq) f._fbq = n;
//             n.push = n;
//             n.loaded = !0;
//             n.version = '2.0';
//             n.queue = [];
//             t = b.createElement(e);
//             t.async = !0;
//             t.src = v;
//             s = b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t, s);
//         }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

//         window.fbq('init', '545715133393562');
//         window.fbq('track', 'PageView');
//     };

//     React.useEffect(() => {
//         loadFacebookPixel();
//     }, []);

//     return (
//         <>
//             {children}
//             <noscript>
//                 <img
//                     height="1"
//                     width="1"
//                     style={{ display: "none" }}
//                     src="https://www.facebook.com/tr?id=545715133393562&ev=PageView&noscript=1"
//                 />
//             </noscript>
//         </>
//     );
// };

// export default FacebookPixelLayout;




// const loadFacebookPixel = () => {
//     !function (f, b, e, v, n, t, s) {
//         if (f.fbq) return;
//         n = f.fbq = function () {
//             n.callMethod ?
//                 n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//         };
//         if (!f._fbq) f._fbq = n;
//         n.push = n;
//         n.loaded = !0;
//         n.version = '2.0';
//         n.queue = [];
//         t = b.createElement(e);
//         t.async = !0;
//         t.src = v;
//         s = b.getElementsByTagName(e)[0];
//         s.parentNode.insertBefore(t, s);
//     }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

//     window.fbq('init', '545715133393562');
//     window.fbq('track', 'PageView');
// };

// export default loadFacebookPixel;


