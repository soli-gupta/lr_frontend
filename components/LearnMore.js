import React from 'react'

export default function LearnMore(props) {
    return (
        <>
            <div style={{ display: "block" }} className={`common-popup text-pop login get-acall`}>
                <div onClick={props.closePop} className="overlay-mob mobile-style "></div>
                <div className='popup-inner'>

                    <div onClick={props.closePop} className='popup-close'></div>

                    <div className='thankyou'>
                        <p>You can book this car exclusively by giving the booking amount. If you feel this car doesn’t meet your needs, you can cancel anytime. This booking amount is completely refundable. To buy your car, you need to submit the rest of the balance amount.</p>
                    </div>
                </div>

            </div>
        </>
    )
}
