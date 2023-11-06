import React from 'react'
import WebHead from '@/components/common/WebHead';
import { useRouter } from 'next/router'
import WebsiteLayout from '@/components/common/WebsiteLayout';
import Link from 'next/link'
import axios from 'axios';

function Index() {
    const router = useRouter()


    const userLogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user-logout`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    localStorage.removeItem("lr-user-token");
                    alert(res.data.message)
                    router.push('/')
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <div>


            <WebHead pageTitle={`User Menu`} />
            {/* <WebsiteLayout> */}


            <div className={`user-left mobile-menu`}>

                <ul>

                    <li className={`personal-information ${router.pathname === '/dashboard/personal-information' ? 'active' : ''}`}><Link href='/dashboard/personal-information'></Link> <div className='icon'></div>  Personal Information <div className='message-menu'>Edit and manage your profile</div> </li>

                    <li className={`booking ${router.pathname === '/dashboard/bookings' ? 'active' : ''}`}><Link href='/dashboard/bookings'></Link> <div className='icon'></div>  Bookings <div className='message-menu'>Check booking status and complete documentation</div> </li>

                    <li className={`test-drive ${router.pathname === '/dashboard/test-drives' ? 'active' : ''}`}><Link href='/dashboard/test-drives'></Link> <div className='icon'></div>  Test Drives <div className='message-menu'>Schedule, track and manage your test drive appointments</div> </li>

                    <li className={`sell-request ${router.pathname === '/dashboard/sell-requests' ? 'active' : ''}`}><Link href='/dashboard/sell-requests'></Link> <div className='icon'></div>  Sell Requests <div className='message-menu'>View, track and manage your selling requests</div> </li>

                    <li className={`service ${router.pathname === '/dashboard/service' ? 'active' : ''}`}><Link href='/dashboard/service/'></Link> <div className='icon'></div>  Service <div className='message-menu'>View, track and manage your service appointments</div> </li>

                    <li className={`car-care ${router.pathname === '/dashboard/car-care' ? 'active' : ''}`}><Link href='/dashboard/car-care'></Link> <div className='icon'></div>  Car Care <div className='message-menu'>Book and manage car maintenance appointments</div> </li>

                    <li className={`service-package ${router.pathname === '/dashboard/service-package' ? 'active' : ''}`}><Link href='/dashboard/service-package'></Link> <div className='icon'></div>  Service Packages <div className='message-menu'>Book your service package for extra savings on car services</div> </li>

                    <li className={`extended-warranty ${router.pathname === '/dashboard/extended-warranty' ? 'active' : ''}`}><Link href='/dashboard/extended-warranty'></Link> <div className='icon'></div>  Extended Warranty <div className='message-menu'>Get comprehensive coverage beyond the standard warranty period </div> </li>

                </ul>

                <div className='logout'>
                    <button onClick={() => userLogout()}><span>Log out</span></button>
                </div>
            </div>


            {/* </WebsiteLayout> */}
        </div >
    )
}

export default Index
