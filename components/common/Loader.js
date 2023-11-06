import Lottie from "lottie-react";
import EmptyCar from "@/public/lotie-icons/emptyData.json"
function Loader({ loaderTitle }) {
    return (
        <>

            <div className='loader'>

                <div className='lotie-loader'>
                    <Lottie animationData={EmptyCar} loop={true} />
                    <p>{loaderTitle}</p>
                </div>
            </div>
        </>
    )
}

export default Loader;