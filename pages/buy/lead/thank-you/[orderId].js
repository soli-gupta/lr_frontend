import React from 'react'
import Lottie from "lottie-react";
import Link from 'next/link';
import Congratulationstick from '/public/lotie-icons/tick-circle.json'
import WebHead from '@/components/common/WebHead';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';
import { fullDatabaseDateConverter } from '@/components/Helper';

const loggedFetcher = (url) => axios.get(url, {
  headers: {
    token: localStorage.getItem('lr-user-token')
  }
}).then(res => res.data);




function TestDriveThankYou() {

  const Url = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const { orderId } = router.query;

  const { data, error } = useSWR(`${Url}feth-buy-lead-by-user/${orderId}`, loggedFetcher);


  if (error) return <Loader loaderTitle={`Something went wrong.`} />
  if (!data) return <Loader loaderTitle={`Loading...`} />
  if (!data.lead) <Loader loaderTitle={`Loading...`} />

  return (
    <div className='thakyou-page'>
      <WebHead pageTitle={`${data.lead.brand_id.brand_name} ${data.lead.model_id.model_name} ${data.lead.variant_id.variant_name} | Thank You`} />

      <div className="wrapper">



        <div className='thankyou'>



          <div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

          <h4>Your Request Has Been Submitted</h4>

          <p>
            Thank you for your interest in Luxury Ride.
            <span>Please wait, our representative will contact you shortly.  </span></p>

          <Link href={`/buy`} className='btn reverse'>Back To Cars</Link>

        </div>

      </div>

    </div >
  )
}

export default TestDriveThankYou
