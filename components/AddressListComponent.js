import React from 'react'
import { useEffect } from 'react'

export default function AddressListComponent(props) {
    console.log(props)
    useEffect(() => {

    }, [props.data])
    return (
        <div>
            <li key={props.data._id}>
                <input type="hidden" name="step_form" id="step_form" value="3" />
                <input type="text" id="address-type" defaultValue={props.data.address_type} />
                <input type="text" id="user-state" defaultValue={props.data.state} />
                <input type="text" id="user-city" defaultValue={props.data.city} />
                <input type="text" id="user-full-address" defaultValue={props.data.full_address} />
                <input type="text" id="user-pincode" defaultValue={props.data.pincode} />
                <input type="radio" name="select" id={`option_${props.data._id}`} value={`${props.data.full_address} ${props.data.city}, ${props.data.state} - ${props.data.pincode}`} onChange={(e) => props.selectedAddressByUser(props.data.address_type, props.data.full_address, props.data.city, props.data.state, props.data.pincode)} defaultChecked={!(!!props.data._id)} />
                <label htmlFor={`option_${props.data._id}`} className="option">
                    <div className="dot"></div>
                    <div className='addresstype'>{props.data.address_type}</div>
                    <p>{`${props.data.full_address} ${props.data.city}, ${props.data.state} - ${props.data.pincode}`}</p>
                </label>
            </li>
        </div>
    )
}
