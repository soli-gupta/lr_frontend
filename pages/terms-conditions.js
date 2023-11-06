import Loader from "@/components/common/Loader";
import WebHead from "@/components/common/WebHead";
import WebsiteLayout from "@/components/common/WebsiteLayout";
import { useEffect } from "react";

function TermsConditions({ cmsPage }) {

    useEffect(() => {

        if (typeof window !== "undefined") {
            document.body.classList.remove('header-No-Scroll');
        }
    }, []);

    if (!cmsPage) return <Loader loaderTitle={`Something went wrong.`} />

    return (
        <div>
            <WebHead pageTitle={cmsPage.page_title} />
            {/* <WebsiteLayout> */}
            <div className="policy-page commonm-gap">
                <div class="wrapper">
                    <div dangerouslySetInnerHTML={{ __html: cmsPage.content_one }}></div>
                </div>
            </div>
            {/* </WebsiteLayout> */}
        </div>
    )
}

export default TermsConditions;

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}cms-page/terms-and-conditions`);
    const data = await response.json();

    return {
        props: {
            cmsPage: data.cms_page ? data.cms_page : undefined,
        }
    }
}