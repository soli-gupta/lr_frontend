function dashboardAddressList({ addr, selectedAddressByUser, i }) {
    return (
        <li>
            <input type="radio" name="address_radio_btn" id={`option_${i}`} value={`${addr.address_type} ${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`} onChange={(e) => selectedAddressByUser(addr.address_type, addr.full_address, addr.city, addr.state, addr.pincode)} defaultChecked={i === 0 ? true : false} />


            <label htmlFor={`option_${i}`} className="option">
                <div className="dot"></div>
                <div className='addresstype'>{addr.address_type}</div>
                <p>{`${addr.full_address} ${addr.city}, ${addr.state} - ${addr.pincode}`}</p>
            </label>
            <input type="hidden" value={addr.address_type} name="hid_address_type" id="hid-address-type" />
            <input type="hidden" value={addr.full_address} name="hid_full_address" id="hid-address-full" />
            <input type="hidden" value={addr.state} name="hid_user_state" id="hid-user-state" />
            <input type="hidden" value={addr.city} name="hid_user_city" id="hid-user-city" />
            <input type="hidden" value={addr.pincode} name="hid_user_pincode" id="hid-user-pincode" />
        </li>
    )
}

export default dashboardAddressList;