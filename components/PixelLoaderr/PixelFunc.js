import { useRouter } from "next/router";

export const loadFacebookPixel = (router, count) => {

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
        console.log('Script Injected!');
        fbq('init', '545715133393562');
        fbq('track', 'PageView');
        router.pathname === '/buy/test-drive/thank-you/[orderId]' ? fbq('track', 'SubmitApplication') : '';
        router.pathname === '/sell/thank-you' ? fbq('track', 'CompleteRegistration') : '';
        // }, 500);
    }
};