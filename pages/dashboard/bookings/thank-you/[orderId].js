import WebHead from "@/components/common/WebHead";
import Lottie from "lottie-react";
import Congratulationstick from '/public/lotie-icons/tick-circle.json';
import useSWR from 'swr';
import { useRouter } from "next/router";
import { numberFormatter } from "@/components/Helper";
import axios from "axios";
import Link from "next/link";
import WebsiteLayout from "@/components/common/WebsiteLayout";
import Loader from "@/components/common/Loader";
import { useState } from "react";


const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);
function ThankYou() {


    const Url = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
    const { orderId } = router.query;


    const [LearMore, setLearMore] = useState(false);
    const [appearLearnData, setAppearLearnData] = useState('');

    const { data, error } = useSWR(`${Url}user/fetch-order-details/${orderId}`, loggedFetcher);

    if (error) return <Loader loaderTitle={`Something went wrong.`} />;
    if (!data) return <Loader loaderTitle={`Loading...`} />;
    if (!data.order) return <Loader loaderTitle={`Loading...`} />;

    // setTimeout(() => {
    //     router.push('/dashboard/bookings');
    // }, 5000);

    const OpenLearn = () => {
        setLearMore(true);
        setAppearLearnData(`We at Luxury Ride stand behind our cars and your satisfaction with them is very important to us. If you change your mind about the booking, we will happily issue you a refund upon your request,no questions asked.`);
        document.body.classList.add('hide-scroll-poup-new');
        if (typeof window !== "undefined") {
            document.body.className = 'hide-scroll-poup hide-scroll-poup-new';
        }
    }


    const closePop = () => {
        setLearMore(false);
        document.body.classList.remove('hide-scroll-poup-new');
        document.body.classList.remove('hide-scroll-poup');
    }

    return <>
        <div>
            <WebHead pageTitle={`Thank You!`} />

            {/* <WebsiteLayout> */}
            <section className='ebook-deatil bg-grey comPad'>
                <div className='wrapper'>
                    <div className="box-reduce">
                        <div className='row'>
                            <div className="col-md-12 desktop-hide-div mobile-show-div ">
                                <div className="row  prductSec01">
                                    <div className="col-5">
                                        <div className="image-circle">
                                            <img src={`${data.order.order_product_id.product_image}`} />
                                        </div>
                                    </div>

                                    <div className="col-7">
                                        <div className="txt">
                                            <h1>{data.order.order_car_name}</h1>
                                            <ul>
                                                <li>{data.order.order_car_registration_year}</li>
                                                <li>{data.order.order_car_registration_state}</li>
                                                <li>{data.order.order_car_kms}</li>
                                                <li>{data.order.order_car_ownership}</li>
                                                <li>{data.order.order_car_fuel_type}</li>
                                            </ul>

                                            <div className="price-detail">
                                                <div className="price">INR <span>{numberFormatter(data.order.order_car_amount)}/-</span></div>
                                                <div className="emiStarts">EMI starts from <span>INR {numberFormatter(data.order.order_product_id.product_monthely_emi)}/-</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='formbx-white congratulation-bx' style={{ display: "block" }}>
                                    <div className='congo-namebx'>
                                        <div className='animation-icon'>
                                            <Lottie animationData={Congratulationstick} loop={true} />
                                        </div>
                                        <div className='msg-congo'>
                                            <h2>Congratulations! {data.order.user_first_name} {data.order.user_last_name}</h2>
                                            <ul>
                                                <li>+91-{data.order.user_contact}</li>
                                                <li>{data.order.user_email_id !== undefined && data.order.user_email_id !== '' ? data.order.user_email_id : ''}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='payment-orderinfo'>
                                        {/* Your payment of <span>INR 50,000/-</span> has received. */}
                                        <span>  We have received your payment of <span> INR {numberFormatter(data.order.user_booking_amount)}</span>.
                                            <br /> Your order ID is <span>{data.order.order_id ? data.order.order_id : ''}</span>.</span>
                                    </div>

                                    <div className='address-confirmation'>
                                        <ul>
                                            {/* <li>
                                                <div className='icon-add'>
                                                    <img src="/img/messageblue-icon.svg" alt="Luxury Ride" />
                                                </div>
                                                You would have got an SMS with all the details of your payment
                                            </li> */}
                                            <li>
                                                <div className='icon-add'>
                                                    <img src="/img/loactionicon-blue.svg" alt="Luxury Ride" />
                                                </div>
                                                <span>{data.order.user_address_type}</span>
                                                {data.order.user_full_address}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* <div className='col-md-6 sticky-div'>


                                <div className='sticky-div'>
                                    <div className='formbx-white p-0 order-summary overflow-unset'>
                                        <div className='border-heading'><h3>Order Summary</h3></div>

                                        <h5>Car Details</h5>
                                        <div className='vehicle-list-detail border-bottom pad-small '>
                                            <ul>
                                                <li>Brand<span>{data.order.order_brand_name}</span></li>
                                                <li>Reg. Year<span>{data.order.order_car_registration_year}</span></li>
                                                <li>Model<span>{data.order.order_model_name}</span></li>
                                                <li>Variant<span>{data.order.order_variant_name}</span></li>
                                                <li>Ownership<span>{data.order.order_car_ownership}</span></li>
                                                <li>KMs Driven<span>{numberFormatter(data.order.order_car_kms)}</span></li>
                                            </ul >
                                        </div >

                                        <div className='summarylist'>
                                            <ul>
                                                <li>
                                                    <div className='left-txt'>Purchase Amount
                                                        <span style={{ display: data.order.user_optd_insurance === 1 ? "block" : "none" }}>Opted in for financing</span>
                                                    </div>
                                                    <div className='right-txt'>INR {numberFormatter(data.order.order_car_amount)}/-</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>2 Months Comprehensive Warranty</div>
                                                    <div className='right-txt green-txtorder'>Free</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>Insurance</div>
                                                    <div className='right-txt'>{data.order.order_car_insurance_type === "Valid" ? ` ${data.order.order_car_insurance_type} Till ${data.order.order_car_insurance_valid}` : (data.order.order_car_insurance_type === "Expired" || data.order.order_car_insurance_valid === "expired" ? `Expired in  ${data.order.order_car_insurance_valid}` : '')} */}
                            {/* // Jan 2024 */}
                            {/* </div>
                                                </li>
                                                <li>
                                                    <div className='left-txt blue-txt-order'>Booking Amount */}
                            {/* <i>(Paid)</i> 
                                                    <div className='info-order'>
                                                        <img src='/img/circle-info.svg' alt="" />

                                                        <div className='infotxt'>
                                                            <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                            <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                        </div>
                                                    </div>*/}
                            {/* </div>
                                                    <div className='right-txt blue-txt-order'>

                                                        <b>INR {numberFormatter(data.order.user_booking_amount)}/-</b>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>Balance Amount */}
                            {/* <i>(Pay Later)</i>
                                                    <div className='info-order'>
                                                        <img src='/img/circle-info.svg' alt="" />

                                                        <div className='infotxt'>
                                                            <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                            <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                        </div>
                                                    </div> */}
                            {/* </div>
                                                    <div className='right-txt'>
                                                        INR {numberFormatter(data.order.user_booking_amount !== '' && data.order.user_booking_amount !== undefined ? data.order.order_car_amount - data.order.user_booking_amount : data.order.order_car_amount)}/-
                                                    </div>
                                                </li>
                                                <li className='grandtotal'>
                                                    <div className='left-txt'>Grand Total</div>
                                                    <div className='right-txt'>INR {numberFormatter(data.order.user_booking_amount !== '' && data.order.user_booking_amount !== undefined ? data.order.order_car_amount - data.order.user_booking_amount : data.order.order_car_amount)}/-</div>
                                                </li>
                                            </ul>
                                            <div className='order-cancle'>Cancel anytime, fully refundable. <Link href="" className='btnunderline'>Learn more</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                            <div className='col-md-6 sticky-div'>


                                <div className='sticky-div'>
                                    <div className='formbx-white p-0 order-summary overflow-unset new-design-image'>
                                        <div className='border-heading'><h3>Order Summary</h3></div>

                                        <h5 className="mobile-view-hide">Car Details</h5>
                                        <div className='vehicle-list-detail border-bottom pad-small mobile-view-hide'>

                                            <div className='image'>  <img className='image-radious' src={`${data.order.order_product_id.product_image}`} /></div>


                                            <div className='car-info'>

                                                <div className='car-year'><span>{data.order.order_car_registration_year}</span></div>
                                                <div className='car-name'><span>{data.order.order_model_name}</span></div>
                                                <ul>
                                                    {/* <li><span>{order.order_brand_name}</span></li> */}


                                                    <li><span>{data.order.order_variant_name}</span></li>
                                                    <li><span>{data.order.order_car_ownership}</span></li>
                                                    <li><span>{numberFormatter(data.order.order_car_kms)}</span></li>
                                                </ul>

                                            </div>
                                        </div>

                                        <div className='summarylist'>
                                            <ul>
                                                <li>
                                                    <div className='left-txt'>Car Value
                                                        <span style={{ display: data.order.user_optd_insurance === 1 ? "none" : "block" }}>Opted in for financing</span>
                                                    </div>
                                                    <div className='right-txt'>INR {numberFormatter(data.order.order_car_amount)}/-</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>2 Months Comprehensive Warranty</div>
                                                    <div className='right-txt green-txtorder'>Free</div>
                                                </li>
                                                <li>
                                                    <div className='left-txt'>Insurance
                                                        <span>{data.order.order_car_insurance_type}</span>
                                                    </div>
                                                    <div className='right-txt'>{`${data.order.order_car_insurance_valid}`}
                                                        {/* {order.order_car_insurance_type === "Valid" ? ` ${order.order_car_insurance_type} Till ${order.order_car_insurance_valid}` : (order.order_car_insurance_type === "Expired" || order.order_car_insurance_type === "expired" ? `Expired in  ${order.order_car_insurance_valid}` : '')} */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='left-txt blue-txt-order'>Booking Amount
                                                        <div className='info-order'>
                                                            <img src='/img/circle-info.svg' alt="" />

                                                            <div className='infotxt'>
                                                                <p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 7 days. Use this time to freely decide if the car is your perfect fit.</p>
                                                                <p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
                                                            </div>
                                                        </div>
                                                        {/* <i>(Pay Now)</i> */}
                                                        {/* <div className='info-order'>
<img src='/img/circle-info.svg' alt="" />

<div className='infotxt'>
<p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
<p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
</div>
</div> */}
                                                    </div>
                                                    <div className='right-txt blue-txt-order'>
                                                        {/* <Link href='' className='btnunderline'>Edit</Link> */}
                                                        <b>INR {numberFormatter(data.order.user_booking_amount)}/-</b>
                                                    </div>
                                                </li>
                                                {/* <li>
<div className='left-txt'>Balance Amount */}
                                                {/* <i>(Pay Later)</i> */}
                                                {/* <div className='info-order'>
<img src='/img/circle-info.svg' alt="" />

<div className='infotxt'>
<p>Luxury Ride Satisfaction Assurance Placing a booking deposit allows us to reserve this car exclusively for you, for a total of 3 days. Use this time to freely decide if the car is your perfect fit.</p>
<p>If you’re not 100% satisfied with the car, we’ll refund your entire booking amount no-questions-asked.</p>
</div>
</div> */}
                                                {/* </div>
<div className='right-txt'>
INR {numberFormatter(order.order_balance_amount)}/-
</div>
</li> */}
                                                <li className='grandtotal'>
                                                    <div className='left-txt'>Balance Amount
                                                        <div className='info-order'>
                                                            <img src='/img/circle-info.svg' alt="" />

                                                            <div className='infotxt'>
                                                                <p>Don’t make your dream car wait !!
                                                                    Pay the balance amount and lock the deal on your dream car. We offer you a 15 days money back guarantee to boost your confidence in your buying decision.
                                                                </p>
                                                                <p>Rest assured we will continue to hold this exclusively for you for next 7 days. We are committed to making your car-buying experience as seamless and transparent as possible.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='right-txt'>INR {numberFormatter(data.order.order_balance_amount)}/-</div>
                                                </li>
                                            </ul>
                                            <div className='order-cancle'>Cancel anytime, fully refundable.  <span onClick={OpenLearn} className='btnunderline'>
                                                Learn more</span></div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {LearMore ? <div style={{ display: "block" }} className={`common-popup text-pop login get-acall`}>
                <div onClick={closePop} className="overlay-mob mobile-style "></div>
                <div className='popup-inner'>

                    <div onClick={closePop} className='popup-close'></div>

                    <div className='thankyou'>



                        <p>{appearLearnData}</p>
                    </div>
                </div>

            </div>
                : ""
            }
            {/* </WebsiteLayout > */}
        </div >
    </>
}


export default ThankYou;