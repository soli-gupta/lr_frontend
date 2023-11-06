import React from 'react'
import Lottie from "lottie-react";
import Link from 'next/link';
import Congratulationstick from '/public/lotie-icons/tick-circle.json'
import WebHead from '@/components/common/WebHead';

function index() {
    return (
        <div className='thakyou-page'>
            <WebHead pageTitle={`Thank You!`} />
            <div className="wrapper">



                <div className='thankyou'>



                    <div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

                    <h4>We Are Here For You!</h4>

                    <p>

                        Thank you for reaching out. We can't wait to connect with you and provide the assistance you need.<br /> Stay tuned for a call from our executive.
                        {/* <span> Our Sales Manager will connect with you shortly.  </span> */}
                    </p>

                    <Link href={`/`} className='btn reverse'>Back To Home</Link>

                </div>

            </div>

        </div>
    )
}

export default index
