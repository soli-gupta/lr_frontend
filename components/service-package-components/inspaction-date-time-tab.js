import { useState } from "react";
import { ButtonSpinner, databaseDateConverter, fullDatabaseDateConverter, weekDatesForForms } from "../Helper";


function InstpactionDateTimeTab({ vehicleInspactionDateTab, selectionInspactionDateTime, dateConverterForValue, submitSelectedDate, selectedVehicleInspactionDateTab, selectedRadioDate, setSelectedRadioDate, editVehicaleInspactionDate, setInsertSelectedDate, bookedTimeSlot, setBookedTimeSlot, radioSelectedDate, setRadioSelectedDate, tinyLoader, submitPayAtWorkaShop }) {

    const todayDate = new Date();
    const todayTime = todayDate.getHours();
    const todayDay = dateConverterForValue(databaseDateConverter(todayDate).day, databaseDateConverter(todayDate).month, databaseDateConverter(todayDate).year)


    const [dateLimit, setDateLimit] = useState(7);
    // const [bookedTimeSlot, setBookedTimeSlot] = useState('');
    // const [radioSelectedDate, setRadioSelectedDate] = useState('');

    const changeDateShowLimit = () => {
        setDateLimit(14);
    }
    const weekCal = weekDatesForForms(dateLimit);


    const selctedDateHandler = (e, dayMonth, radioDate) => {
        setInsertSelectedDate(e);
        setSelectedRadioDate(fullDatabaseDateConverter(e))
        setRadioSelectedDate(radioDate);
        // setBookedDateSlot(fullDatabaseDateConverter(radioDate));
        const chekcedDateCheck = document.querySelector('input[name=book_time]:checked');
        if (todayDay === radioDate && chekcedDateCheck && chekcedDateCheck.checked === true) {
            chekcedDateCheck.checked = false;
        }
    }


    const manageTimeSlotOne = () => {
        setBookedTimeSlot('11 AM to 12 PM');
    }

    const manageTimeSlotTwo = () => {
        setBookedTimeSlot('12 PM to 1 PM');
    }

    const manageTimeSlotThree = () => {
        setBookedTimeSlot('1 PM to 2 PM');
    }

    const manageTimeSlotFour = () => {
        setBookedTimeSlot('2 PM to 3 PM');
    }

    const manageTimeSlotFive = () => {
        setBookedTimeSlot('3 PM to 4 PM');
    }

    const manageTimeSlotSix = () => {
        setBookedTimeSlot('4 PM to 5 PM');
    }

    const manageTimeSlotSaven = () => {
        setBookedTimeSlot('5 PM to 6 PM');
    }

    const manageTimeSlotEight = () => {
        setBookedTimeSlot('6 PM to 7 PM');
    }

    const manageDateTestDrive = (e, radioDate) => {

        // console.log('radioDate : ', fullDatabaseDateConverter(radioDate));
        // console.log('e : ', e);
    }





    return (
        <>
            <div className='formbx-white add-time-date' style={{ display: vehicleInspactionDateTab === false ? "none" : "block" }}>
                <h3 style={{ display: selectionInspactionDateTime === false ? "none" : "block" }}>Select Car Pickup Date</h3>
                <div className='nextstep' style={{ display: selectionInspactionDateTime === false ? "none" : "block" }}>
                    <div className='style-box'>
                        <h4>Select Date*</h4>
                        <div className='dates time-pd'>
                            {
                                weekCal && weekCal.map((date, i) => {
                                    return (
                                        <div className='date' key={i}>
                                            <input type="radio" name="selectedDate" onChange={(e) => selctedDateHandler(e.target.value, `${date.day} ${date.month}`, dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`))} value={dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} id={`selected_${i}`} />
                                            <label htmlFor={`selected_${i}`} className="option">
                                                {date.day} {date.month} <span>{date.weekDay}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <div className='see-all' onClick={changeDateShowLimit} style={{ display: dateLimit === 14 ? 'none' : 'block' }}>See All Dates</div>

                        </div>
                        <small id="selectedDateError" className="error"></small>
                    </div>


                    <div className='style-box time-slot no-border add-time-date'>

                        <h4>Select Time Slot</h4>

                        <div className='dates'>
                            {/* {dateConverterForValue(`${date.day}`, `${date.month}`, `${date.year}`)} */}

                            <div className='date'>
                                <input type="radio" name="book_time" value="11AM-12PM" id="selectTimeOne" onChange={manageTimeSlotOne}
                                    disabled={todayDay === radioSelectedDate && todayTime >= '11' ? true : false} />
                                <label htmlFor="selectTimeOne" className={`option ${todayDay === radioSelectedDate && todayTime >= '11' ? 'disable-time' : ''}`} >11AM - 12PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="12PM-1PM" id="selectTimeTwo" onChange={manageTimeSlotTwo} disabled={todayDay === radioSelectedDate && todayTime >= '12' ? true : false} />
                                <label htmlFor="selectTimeTwo" className={`option ${todayDay === radioSelectedDate && todayTime >= '12' ? 'disable-time' : ''}`}>12PM - 1PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="1PM-2PM" id="selectTimeThree" onChange={manageTimeSlotThree} disabled={todayDay === radioSelectedDate && todayTime >= '13' ? true : false} />
                                <label htmlFor="selectTimeThree" className={`option ${todayDay === radioSelectedDate && todayTime >= '13' ? 'disable-time' : ''}`}>1PM - 2PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="2PM-3PM" id="selectTimeFour" onChange={manageTimeSlotFour} disabled={todayDay === radioSelectedDate && todayTime >= '14' ? true : false} />
                                <label htmlFor="selectTimeFour" className={`option ${todayDay === radioSelectedDate && todayTime >= '14' ? 'disable-time' : ''}`}>2PM - 3PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="3PM-4PM" id="selectTimeFive" onChange={manageTimeSlotFive} disabled={todayDay === radioSelectedDate && todayTime >= '15' ? true : false} />
                                <label htmlFor="selectTimeFive" className={`option ${todayDay === radioSelectedDate && todayTime >= '15' ? 'disable-time' : ''}`}>3PM - 4PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="4PM-5PM" id="selectTimeSix" onChange={manageTimeSlotSix} disabled={todayDay === radioSelectedDate && todayTime >= '16' ? true : false} />
                                <label htmlFor="selectTimeSix" className={`option ${todayDay === radioSelectedDate && todayTime >= '16' ? 'disable-time' : ''}`}>4PM - 5PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="5PM-6PM" id="selectTimeSaven" onChange={manageTimeSlotSaven} disabled={todayDay === radioSelectedDate && todayTime >= '17' ? true : false} />
                                <label htmlFor="selectTimeSaven" className={`option ${todayDay === radioSelectedDate && todayTime >= '17' ? 'disable-time' : ''}`}>5PM - 6PM</label>
                            </div>

                            <div className='date'>
                                <input type="radio" name="book_time" value="6PM-7PM" id="selectTimeEight" onChange={manageTimeSlotEight} disabled={todayDay === radioSelectedDate && todayTime >= '18' ? true : false} />
                                <label htmlFor="selectTimeEight" className={`option ${todayDay === radioSelectedDate && todayTime >= '18' ? 'disable-time' : ''}`}>6PM - 7PM</label>
                            </div>

                        </div>
                        <small id="selectedTimeError" className="error"></small>

                    </div>

                    <div className='form-input mg-0'>
                        {/* <button className='btn arrow-style blue-btn' onClick={submitSelectedDate}>
                            <ButtonSpinner load={tinyLoader} btnName={`Save & Continue`} />
                        </button> */}
                        <div className='mobile-fixed-bg'>
                            <button className='btn blueBdr' onClick={submitPayAtWorkaShop}>
                                <ButtonSpinner load={tinyLoader} btnName={`Confirm`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='nextstep-edit editowner-details' style={{ display: selectedVehicleInspactionDateTab === false ? "none" : "block" }}>
                    <ul>
                        <li>
                            <div className='iconedit'>
                                <img src="/img/evaluation-date-and-time.svg" alt="Luxury Ride" />
                            </div>
                            <div className='editinfo-owner'>
                                <h4>Car Pickup Date</h4>
                                <p>
                                    {`${selectedRadioDate.weekDay}, ${selectedRadioDate.day} ${selectedRadioDate.month}, ${selectedRadioDate.year}, ${bookedTimeSlot}`}
                                </p>
                                {/* <p>Wed, 24th March, 2023, 2:00 PM to 4:00 PM</p> */}
                            </div>
                            <a className='edit-btn' onClick={editVehicaleInspactionDate}>Edit</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default InstpactionDateTimeTab;