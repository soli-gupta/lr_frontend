
import axios from 'axios';
import useSWR from 'swr';
import { ButtonSpinner } from '../Helper';

const fetcher = (url) => axios.get(url).then(res => res.data);

const loggedFetcher = (url) => axios.get(url, {
    headers: {
        token: localStorage.getItem('lr-user-token')
    }
}).then(res => res.data);


function ServiceCenterTab({ serviceCenterAddress, submitServiceCenterAddress, centerAddress, serviceCenterName, editServiceCenterTab, serviceCenterAddressHandler, tinyLoader }) {
    const Url = process.env.NEXT_PUBLIC_URL;

    const serviceCenters = useSWR(`${Url}fetch-service-centers`, fetcher);

    return (
        <>

            <div className='formbx-white preferred-service-center'>
                <h3 style={{ display: serviceCenterAddress === false ? "none" : "block" }}  >Select Preferred Service Centre</h3>

                <div style={{ display: serviceCenterAddress === false ? "none" : "block" }}>
                    <form method="POST" onSubmit={submitServiceCenterAddress}>

                        <ul className='selectaddress'>

                            {
                                serviceCenters !== undefined && serviceCenters.data !== undefined && serviceCenters.data.experience_center.map((center) => {
                                    return (
                                        <li key={center._id}>
                                            <input type="radio" name="select-center" id={`select-service_${center.name}`} onChange={(e) => serviceCenterAddressHandler(center.name, center.address)} />
                                            <label htmlFor={`select-service_${center.name}`} className="option">
                                                <div className="dot"></div>
                                                <div className='addresstype'>{center.name}</div>
                                            </label>
                                        </li>
                                    )
                                })

                            }


                            <small id="serviceCenterError" className="error"></small>
                        </ul>
                        <p>{centerAddress}</p>
                        <input type="hidden" name="service_center_address" id="service-center-address" value={centerAddress} />

                        <div className='form-input mg-0'>
                            <button href="javascript:void(0)" className='btn arrow-style blue-btn' >
                                <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                            </button>
                        </div>

                    </form>
                </div>


                <div className='nextstep-edit editowner-details' style={{ display: serviceCenterAddress === true ? "none" : "block" }}>
                    <ul>
                        <li>
                            <div className='iconedit'>
                                <img src="/img/car-service-icon.svg" alt="Luxury Ride" />
                            </div>
                            <div className='editinfo-owner'>
                                <h4>Preferred Service Centre</h4>
                                <div className="ownername">{serviceCenterName}</div>
                                <p>{centerAddress}</p>
                            </div >
                            <div className='edit-btn' onClick={editServiceCenterTab}>Edit</div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ServiceCenterTab