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
  console.log(router.query)
  const { data, error } = useSWR(`${Url}fetch-booked-user-test-drive/${orderId}`, loggedFetcher);


  if (error) return <Loader loaderTitle={`Something went wrong.`} />
  if (!data) return <Loader loaderTitle={`Loading...`} />
  if (!data.testDrive) <Loader loaderTitle={`Loading...`} />

  const bookedDate = fullDatabaseDateConverter(data.testDrive.test_drive_date);


  return (
    <div className='thakyou-page'>
      <WebHead pageTitle={`${data.testDrive.car_name} | Thank You | Booked Test Drive`} />
      <div className="wrapper">



        <div className='thankyou'>



          <div className='lotie-thanks'> <Lottie animationData={Congratulationstick} loop={true} /></div>

          <h4>Congratulations!!</h4>

          <p>

            Your Test Drive is scheduled for
            <i> {`${bookedDate.weekDay}, ${bookedDate.day} ${bookedDate.month} ${bookedDate.year}, ${data.testDrive.test_drive_time} `}
            </i>
            at <i>{data.testDrive.experience_center.center_name} Experience Center</i>.
            <span> Our Sales Manager will connect with you shortly.  </span></p>

          <Link href={`/buy`} className='btn reverse'>Back To Cars</Link>
          <Link target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/Luxury Ride ${data.testDrive.experience_center.center_full_address}`} className='btn reverse' >Get Directions</Link>

        </div>

      </div>

    </div >
  )
}

export default TestDriveThankYou
