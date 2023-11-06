
import WebHead from "@/components/common/WebHead"
import WebsiteLayout from "@/components/common/WebsiteLayout"
import axios from "axios";
import { useEffect, useState } from "react"

function Refund({ cmsPage }) {
    return (
        <div>
            <WebHead pageTitle={`Refund`} />
            <div className="policy-page commonm-gap">
                <div class="wrapper">
                    <div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
                </div>
            </div>
        </div>
    )
}

export default Refund

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/refund`);
    const data = await response.json();

    return {
        props: {
            cmsPage: data.cms_page,
        }
    }
}