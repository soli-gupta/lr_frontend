import Lottie from "lottie-react";
import Congratulationstick from '@/public/lotie-icons/tick-circle.json'
import errorStick from '@/public/lotie-icons/error.json';


function SmallSuccessPopUp({ successMessage, HidePopup, errorMessage }) {
    return (
        <div style={{ display: "block" }} className={`common-popup login get-acall`}>
            <div className="overlay-mob mobile-style " onClick={HidePopup}></div>
            <div className='popup-inner'>

                <div className='popup-close' onClick={HidePopup}></div>

                <div className='thankyou'>

                    <div className='lotie-thanks'> <Lottie animationData={successMessage !== '' ? Congratulationstick : errorStick} loop={true} /></div>

                    <p>{successMessage !== '' && successMessage !== undefined ? successMessage : errorMessage}</p>
                </div>
            </div>

        </div>
    )
}

export default SmallSuccessPopUp;