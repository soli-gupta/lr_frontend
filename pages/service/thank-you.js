import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import Congratulationstick from "@/public/lotie-icons/tick-circle.json";
import WebHead from '@/components/common/WebHead';
import WebsiteLayout from '@/components/common/WebsiteLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import LearnMore from '@/components/LearnMore';


export default function Index() {
    const router = useRouter()
    const id = router.query.id
    const Url = process.env.NEXT_PUBLIC_URL;
    const [userCarInfo, setUserCarInfo] = useState('')
    const [LearMore, setLearMore] = useState(false)
    const [selectedServices, setSelectedServices] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [gst, setGst] = useState(0)
    const [grandPrice, setGrandPrice] = useState(0)

    const fetchData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/edit-user-service?id=${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setUserCarInfo(res.data.data)
                }
            })
            .catch(function (error) {
                console.log(error)

            });
    }
    const closeLearnMorePop = () => {
        setLearMore(false)
        if (typeof window !== "undefined") {

            document.body.className = '';
        }
    }

    const OpenLearn = () => {

        setLearMore(true)
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';

        }
    }
    const selectServiceAddToCart = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}user/get-service-by-order-id/${id}`, {
            headers: {
                'token': typeof window !== "undefined" ? localStorage.getItem("lr-user-token") : false,
            }
        })
            .then(function (res) {
                if (res.data.status == 1) {
                    setSelectedServices(res.data.data)
                    setTotalPrice(res.data.total_price)
                    setGst(res.data.gst)
                    setGrandPrice(res.data.grand_price)

                }
            })
            .catch(function (e) {
                setTinyLoader(false)
                console.log(e)
            });
    }

    useEffect(() => {
        selectServiceAddToCart()
        if (!typeof window !== "undefined" && !localStorage.getItem("lr-user-token")) {
            router.push("/");
        }
        fetchData()
    }, [id])

    return (
        <>
            <WebHead pageTitle={'Thank You'} />
            {/* <WebsiteLayout> */}
            <section className="package-service bg-grey comPad">
                <div className='extra-pd-rightleft'>
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-7">
                                <div className='formbx-white p-0  desktop-hide-div border-mobile mobile-show-div'>
                                    <div className='border-heading relativediv'>
                                        <h3>Car Details</h3>

                                    </div>
                                    <div className='vehicle-list-detail'>
                                        {userCarInfo && userCarInfo !== undefined && <ul>
                                            <li>Brand<span>{userCarInfo.brand_name ? userCarInfo.brand_name : ''}</span></li>
                                            <li>Model<span>{userCarInfo.model_name ? userCarInfo.model_name : ''}</span></li>
                                            <li>Variant<span>{userCarInfo.variant_name ? userCarInfo.variant_name : ''}</span></li>
                                            <li>Fuel Type<span>{userCarInfo.fuel_type ? userCarInfo.fuel_type : ''}</span></li>
                                        </ul>
                                        }
                                    </div>
                                </div>
                                <div className='formbx-white congratulation-bx'>
                                    <div className='congo-namebx'>
                                        <div className='animation-icon'>
                                            <Lottie animationData={Congratulationstick} loop={true} />
                                        </div>
                                        <div className='msg-congo'>
                                            <h2>Congratulations! {userCarInfo && userCarInfo.first_name && userCarInfo.first_name && `${userCarInfo.first_name} ${userCarInfo.last_name} `}</h2>
                                            <ul>
                                                <li>+91-{userCarInfo && userCarInfo.mobile}</li>
                                                <li>{userCarInfo && userCarInfo.email ? userCarInfo.email : ''}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='payment-orderinfo'>
                                        {/* Your payment of <span>INR 34,999/- </span>has been received. */}
                                        <span >Your service <span className='blue-txt'>confirmation order id</span> is <span className='blue-txt'>{userCarInfo && userCarInfo.order_id ? userCarInfo.order_id : ''}</span></span></div>

                                    <div className='address-confirmation'>
                                        <ul>
                                            {/* <li>
                                                <div className='icon-add'>
                                                    <img src="/img/messageblue-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                You would have got an SMS with all the details of your service
                                            </li> */}
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Preferred Service Centre</span>
                                                <b>{userCarInfo && userCarInfo.center_name && userCarInfo.center_name}</b>
                                                {userCarInfo && userCarInfo.center_address && userCarInfo.center_address}
                                            </li>
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>Date</span>
                                                {new Date(userCarInfo && userCarInfo.slot_day).toLocaleDateString('en-IN', { weekday: 'short' })}, {new Date(userCarInfo && userCarInfo.slot_day).getDate()} {new Date(userCarInfo && userCarInfo.slot_day).toLocaleDateString('en-IN', { month: 'long' })}, {new Date(userCarInfo && userCarInfo.slot_day).getFullYear()},  {userCarInfo && userCarInfo.slot_time}
                                            </li>
                                            {userCarInfo && userCarInfo.pickup_car === 'yes' ?

                                                <li>
                                                    <div className='icon-add'>
                                                        <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                    </div>
                                                    <span>Car Pickup Address</span>
                                                    <b>{userCarInfo && userCarInfo.pickup_car_address_type}</b>
                                                    {userCarInfo && userCarInfo.pickup_car_address}
                                                </li>
                                                :

                                                <li>
                                                    <div className='icon-add'>
                                                        <img src="/img/drop-user.svg" alt="Luxury Ride" />
                                                    </div>
                                                    <span>Car To Be Dropped By</span>
                                                    <b>{userCarInfo && userCarInfo.pickup_person_name}</b>
                                                    <p>{userCarInfo && userCarInfo.pickup_person_mobile}</p>
                                                </li>
                                            }


                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-5">
                                <div className="nextstep">
                                    <div className='formbx-white p-0 mobile-view-hide'>
                                        <div className='border-heading relativediv'>
                                            <h3>Car Details</h3>

                                        </div>
                                        <div className='vehicle-list-detail'>
                                            {userCarInfo && userCarInfo !== undefined && <ul>
                                                <li>Brand<span>{userCarInfo.brand_name ? userCarInfo.brand_name : ''}</span></li>
                                                <li>Model<span>{userCarInfo.model_name ? userCarInfo.model_name : ''}</span></li>
                                                <li>Variant<span>{userCarInfo.variant_name ? userCarInfo.variant_name : ''}</span></li>
                                                <li>Fuel Type<span>{userCarInfo.fuel_type ? userCarInfo.fuel_type : ''}</span></li>
                                            </ul>
                                            }
                                        </div>
                                    </div>

                                    <div className="formbx-white service-order-summary pb-0  scroll-summery desktop-style" >
                                        <h3>Order Summary</h3>
                                        <div className='summarylist p-0'>
                                            <ul className='data-scroll more-item'>
                                                {selectedServices && selectedServices.length > 0 ? selectedServices.map((addService, i) => {
                                                    return (
                                                        <>
                                                            <li key={i}>
                                                                <div className='left-txt blue-txt-order'>
                                                                    {addService && addService.service_sub_category && addService.service_sub_category.service_sub_category_name}

                                                                    <span dangerouslySetInnerHTML={{ __html: addService && addService.service_sub_category && addService.service_sub_category.service_short_description }}></span>

                                                                    <span>{ } </span>
                                                                </div>
                                                                <div className='right-txt blue-txt-order'>
                                                                    INR {addService && addService.service_price ? addService.service_price : ''}/-

                                                                </div>
                                                            </li>
                                                        </>
                                                    )

                                                }) : ''}
                                            </ul>

                                            <ul className='gap-ul'>
                                                <li>
                                                    <div className='left-txt'>Pick & Drop</div>
                                                    <div className='right-txt green-txtorder'>Free</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>Car Wash</div>
                                                    <div className='right-txt green-txtorder'>Free</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>Car Inspection</div>
                                                    <div className='right-txt green-txtorder'>Free</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>GST (18%)</div>
                                                    <div className='right-txt green-txtorder'> {gst ? Number(gst).toLocaleString('en-US') : ''}</div>
                                                </li>
                                                <li className='grandtotal'>
                                                    <div className='left-txt'>Grand Total</div>
                                                    <div className='right-txt'>INR {grandPrice ? Number(grandPrice).toLocaleString('en-US') : ''}
                                                        /-</div>
                                                </li>

                                            </ul>

                                        </div>
                                    </div>
                                    <div className='order-cancle'>Cancel anytime, fully refundable.  <span onClick={OpenLearn} className='btnunderline'>Learn more</span></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {LearMore ? <LearnMore closePop={closeLearnMorePop} />
                : ""
            }
            {/* </WebsiteLayout> */}
        </>
    )
}
