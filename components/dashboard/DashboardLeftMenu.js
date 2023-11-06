import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import axios from 'axios'
import { ConfirmationModal } from '../Helper'

export default function DashboardLeftMenu(props) {
    const router = useRouter()
    const [UserMenu, setUserMenu] = useState(false)
    const [confirmModel, setConfirmModel] = useState(false)

    const openConfirmModel = () => {

        setConfirmModel(true)
    }

    const closePop = () => {
        setConfirmModel(false)
        if (typeof window !== "undefined") {
            document.body.classList.remove('header-No-Scroll');
        }
    }

    const userLogout = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user-logout`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    localStorage.removeItem("lr-user-token");
                    router.push('/')
                    setTimeout(() => {
                        router.reload()
                    }, 500)
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const openUser = () => {

        setUserMenu(!UserMenu)

    }

    useEffect(() => {

    }, [props.userProfile])

    return (
        <>
            <div className='user-welcome'>

                <div className='user-name'>

                    <div className='user-img'>{props.userProfile && props.userProfile.first_name ? props.userProfile.first_name.charAt(0).toUpperCase(props.userProfile.first_name) : 'U'}</div>

                    <h2><span>Hello,</span>
                        {props.userProfile && props.userProfile.first_name && props.userProfile.last_name ? props.userProfile.first_name : 'User'}
                        {/* {props.userProfile && props.userProfile.first_name} {props.userProfile && props.userProfile.last_name} */}
                    </h2>

                </div>

                <div className='whatsapp'><Link href={`https://api.whatsapp.com/send/?phone=917082206652&text&type=phone_number&app_absent=0`} target='_blank'><span>Chat With Us</span></Link></div>
                {/* 8410084100 */}
            </div>

            <div className={`${UserMenu ? "open-user-menu" : ""} user-left`}>
                <div onClick={openUser} className='mob-style-dash'></div>
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
                    <button onClick={(e) => openConfirmModel()}><span>Log out</span></button>
                </div>
            </div>
            <ConfirmationModal confirm={confirmModel} msg="Are You Sure You Want To Log Out?" closePop={closePop} method={() => userLogout()} />
        </>
    )
}
