import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";

let AutoViewer = dynamic(() => import("./WarpperCompo"), {
    ssr: false,
});


const fetcher = (url) => axios.get(url).then(res => res.data);

function AutoViewerComponent({ productId, productSlug }) {

    const [galleryViewer, setGalleryViewer] = useState([]);
    const [arModel, setARMode] = useState("gallery");
    const [mode, setMode] = useState("");
    const [deviceType, setDeviceType] = useState("DETAILED");

    const router = useRouter();
    const ref = useRef(null);

    useEffect(() => {
        if (productId) {

            let $whereQuery = { lookup_id: productId }
            let enCodeQuery = encodeURIComponent(JSON.stringify($whereQuery))

            axios.get(`${process.env.HELLO_AR_URL}application_products?where=${encodeURIComponent(JSON.stringify($whereQuery))}`, {
                headers: {
                    Authorization: 'SDK YTZkNzNlMmItZDEzNy00ZjdiLWI2NDEtNmZhODZhYmVjMTU4OjZkMGRmYzUzLTIxYTEtNGU1OC04ZTQ5LWNhNmRkYmJiMzg3ZQ==',
                },
            }, fetcher).then((res) => {
                setGalleryViewer(res.data._items);
            }).catch((err) => {
                setGalleryViewer([]);
            });
        }

        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
            // || navigator.userAgent.match(/webOS/i)
            // || navigator.userAgent.match(/iPad/i)
            // || navigator.userAgent.match(/iPod/i)
            // || navigator.userAgent.match(/BlackBerry/i)
            // || navigator.userAgent.match(/Windows Phone/i)
            setDeviceType("GALLERY");
        }

    }, []);

    // console.log(navigator.platform)
    // console.log('window.orientation  :', window.orientation)
    // console.log('window.navigator.userAgent  :', window.navigator.userAgent)
    // console.log('navigator.userAgent  :', navigator.userAgent)

    // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // if (/windows phone/i.test(userAgent)) {
    //     console.log("Windows Phone");
    // }

    // if (/android/i.test(userAgent)) {
    //     console.log("Android");
    // }

    // // iOS detection from: http://stackoverflow.com/a/9039885/177710
    // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //     console.log("iOS");
    // }

    const onModeChange = (currentMode) => {

        setMode(currentMode);
        if (currentMode === "DETAILED" || currentMode === "ZOOM" || currentMode === "360") {
            if (typeof window !== "undefined") {
                document.body.className = "hello-ar-first-click header-No-Scroll  no-top-header"
            }
        } else {
            document.body.className = "header-No-Scroll sticky-btn-have no-top-header"
        }
    };

    useEffect(() => { }, [productSlug]);

    const reloadAutoViewer = () => {
        ref?.current?.changeMode("GALLERY");
    }

    return (
        <>
            <div className="mobile-style gallery-back" onClick={reloadAutoViewer} > Back to gallery</div>
            <div className="helloAr360">

                {galleryViewer !== undefined && galleryViewer !== '' && galleryViewer.map((viewer) => {
                    return (
                        <AutoViewer autoRef={ref}
                            productId={viewer._id}
                            initialMode={`${deviceType}`}
                            onModeChange={onModeChange} key={viewer._id}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default AutoViewerComponent;