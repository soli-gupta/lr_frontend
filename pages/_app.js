import '../styles/globals.css'
import "../styles/responsive.css"
import { useEffect, useState } from 'react'
import { AppContext } from '@/components/AppContext';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Script from 'next/script';
// import * as fbq from '@/components/lib/fbpixel';
import { useRouter } from 'next/router';
import SEO from '../components/common/SEO';
// import { GTM_ID, pageview } from '@/lib/gtm'
// import { GTM_ID, pageview } from '@/components/lib/gtm.js'
import WebHead from '../components/common/WebHead';
import Head from 'next/head';
import PixelLoader from '@/components/PixelLoader';
import FacebookPixel from '@/components/FaceBookPixel';
// import PixelLoader from '@/components/PixelLoader';
// import loadFacebookPixel from '@/components/PixelLoader';
// import TagManager from 'react-gtm-module';
// import ReactPixel from 'react-facebook-pixel';

export default function App({ Component, pageProps }) {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  // const [reloadPage, setReloadPage] = useState(false);


  useEffect(() => {
    if (typeof window !== undefined) {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      OneSignalDeferred.push(function (OneSignal) {
        OneSignal.init({
          appId: "ba103e03-4431-427f-825a-1761642e2f98",
        });
      });
    }
    import('react-notifications/lib/notifications.css');
    // FacebookPixel();
    // const handleRouteChange = () => {
    //   <PixelLoader />
    // };

    // router.events.on('routeChangeComplete', handleRouteChange);

    // return () => {
    //   router.events.off('routeChangeComplete', handleRouteChange);
    // };
    // TagManager.initialize({ gtmId: 'GTM-KJJCZSJ' });
    // setReloadPage(true);

    // router.events.on("routeChangeComplete", () => {
    //   // Trigger a reload after each route change to ensure events are detected
    //   const reloadUrl = `${window.location.pathname}?reload=${Math.random()}`;
    //   window.location.replace(reloadUrl);
    // });

    // return () => {
    //   router.events.off("routeChangeComplete");
    // };
  }, [router]);

  // useEffect(() => {
  //   if (reloadPage) {
  //     router.replace(router.asPath); // This triggers a reload without a full refresh
  //   }
  // }, [reloadPage, router]);
  return <>
    <PixelLoader />

    <AppContext.Provider value={{ context, setContext }}>

      <Head>

        <meta name="google-site-verification" content="jARxyat392amiBbC5W0Diz2egwLOQVr-bKKneAqYVQg" />
        {/* <script async src="https://static.saleassist.ai/widgets/widget.js"></script>
      <script>{`EmbeddableWidget.mount({source_key: "53fab8a5-35f0-403a-b907-5f402c6e8b2b"});`}</script> */}
      </Head>
      {/* <link rel='manifest' href='/manifest.json' /> */}
      {/* <FacebookPixel /> */}

      <WebsiteLayout>

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} suppressHydrationWarning ></Script>

        <script suppressHydrationWarning dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
page_path: window.location.pathname,
});
`}}>

        </script>



        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA__TAG_ID}`} suppressHydrationWarning></Script>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GA__TAG_ID}');
`}}>
        </script>
        {/* <WebHead /> */}
        {<Component {...pageProps} />}
      </WebsiteLayout>
    </AppContext.Provider>
  </>
}


