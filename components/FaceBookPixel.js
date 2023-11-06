// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// function FacebookPixel() {

//     const router = useRouter();
//     const [reloadTriggered, setReloadTriggered] = useState(false);

//     useEffect(() => {
//         import("react-facebook-pixel")
//             .then((x) => x.default)
//             .then((ReactPixel) => {
//                 ReactPixel.init('545715133393562');
//                 ReactPixel.pageView();
//                 // ReactPixel.pageView();
//                 // router.events.on("routeChangeComplete", () => {
//                 //     ReactPixel.pageView();
//                 // });
//                 // const handleRouteChange = () => {

//                 // };

//                 // router.events.on("routeChangeComplete", handleRouteChange);

//                 const reloadUrl = `${router.asPath}?reload=${Math.random()}`;
//                 router.replace(reloadUrl);

//                 return () => {
//                     router.events.off("routeChangeComplete", handleRouteChange);
//                 };


//             });
//         const handleRouteChange = () => {
//             if (!reloadTriggered) {
//                 setReloadTriggered(true);

//                 // Add a random query parameter to trigger a reload
//                 const reloadUrl = `${router.asPath}?reload=${Math.random()}`;
//                 router.replace(reloadUrl);
//             } else {
//                 setReloadTriggered(false);
//             }
//         };

//         router.events.on('routeChangeComplete', handleRouteChange);

//         return () => {
//             router.events.off('routeChangeComplete', handleRouteChange);
//         };
//     }, [router, reloadTriggered]);
//     return null;
// }

// export default FacebookPixel;


// import { useRouter } from "next/router";
// import { useEffect } from "react";

// function FacebookPixel() {
//     const router = useRouter();

//     useEffect(() => {
//         import("react-facebook-pixel")
//             .then((x) => x.default)
//             .then((ReactPixel) => {
//                 ReactPixel.init('545715133393562');
//                 ReactPixel.pageView();

//                 const handleRouteChange = () => {
//                     ReactPixel.pageView();
//                 };

//                 router.events.on("routeChangeComplete", handleRouteChange);

//                 return () => {
//                     router.events.off("routeChangeComplete", handleRouteChange);
//                 };
//             });
//     }, [router]);

//     return null;
// }

// export default FacebookPixel;
