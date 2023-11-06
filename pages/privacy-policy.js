
import Loader from "@/components/common/Loader";
import WebHead from "@/components/common/WebHead"
import WebsiteLayout from "@/components/common/WebsiteLayout"
import axios from "axios";
import { useEffect, useState } from "react"

function PrivacyPolicy({ cmsPage }) {

    if (!cmsPage) return <Loader loaderTitle={`Something went wrong.`} />

    return (
        <div>
            <WebHead pageTitle={`Privacy Policy`} />
            <div className="policy-page commonm-gap">
                <div className="wrapper">
                    <div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
                </div>
            </div>
            {/* </WebsiteLayout> */}
        </div>
    )
}

export default PrivacyPolicy

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/privacy-policy`);
    const data = await response.json();

    return {
        props: {
            cmsPage: data.cms_page ? data.cms_page : undefined,
        }
    }
}