function AddAddressForm({ saveNewAddress, checkPinCode, getStates, manageCities, getCities, managePinCodeHandler, getCitiesByState }) {
    return (
        <form method="POST" onSubmit={saveNewAddress} id="add-new-user-address">

            <div className='select-address-type'>
                <label className='selectAddresstxt'>Select address type*</label>
                <ul>
                    <li>
                        <input type="radio" name="address_type" id="addresstype" value="Home" />
                        <label htmlFor="addresstype" className="option">Home</label>
                    </li>
                    <li>
                        <input type="radio" name="address_type" id="addresstype1" value="Work" />
                        <label htmlFor="addresstype1" className="option">Work</label>
                    </li>
                    <li>
                        <input type="radio" name="address_type" id="addresstype2" value="Other" />
                        <label htmlFor="addresstype2" className="option">Other</label>
                    </li>
                    <small id="selectAddressTypeError" className="error"></small>
                </ul>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <div className='form-input'>
                        <label>Full Address*</label>
                        <input type='text' placeholder='Enter your full address' name="full_address" id="full-address" />
                        <small id="fullAddressError" className="error"></small>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-input'>
                        <label>Pincode*</label>
                        <input type='text' placeholder='Enter Your Pincode' onChange={(e) => managePinCodeHandler(e.target.value)} name="pincode" id="pincode" value={checkPinCode} minLength={6} maxLength={6} />
                        <small id="pinCodeError" className="error"></small>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-input'>
                        <label>Select State*</label>

                        <select onChange={(e) => getCitiesByState(e.target.value)} name="state" id="state_name">
                            <option value={``}>Select State</option>
                            {
                                getStates !== undefined && getStates.data !== undefined && getStates.data.data.map((state, i) => {
                                    return (
                                        <option value={state.province_title} key={i}>{state.province_title}</option>
                                    )
                                })
                            }
                        </select>
                        <small id="selectAddressError" className="error"></small>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='form-input'>
                        <label>Select City*</label>
                        <select name="city" id="city_name" onChange={manageCities}>
                            <option value={``}>Select City</option>
                            {
                                getCities !== undefined && getCities !== '' && getCities.map((city, i) => {
                                    return (
                                        <option value={city.name} key={i}>{city.name}</option>
                                    )
                                })
                            }
                        </select>
                        <small id="selectCityError" className="error"></small>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='form-input'>
                        <button className='btn arrow-style blue-btn'><span>Save & Continue</span></button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddAddressForm;