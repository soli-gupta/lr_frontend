import { columnChooserCancelBtnClick } from '@syncfusion/ej2-grids';
import $ from 'jquery'

export const validateForm = (e, form_id = false) => {
    let error = 0;
    if (form_id) {
        let form = document.getElementById(form_id)
        if (!form.checkValidity()) {
            error++;
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated')
    } else {
        let forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    error++;
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated')
            })
    }

    if (error) {
        return false
    } else {
        return true
    }
}

export const createSlug = (value, input) => {
    const convertToSlug = value.toLowerCase().replace(/ /g, '-');
    if (typeof window !== "undefined") {
        document.getElementById(input).value = convertToSlug;
        return convertToSlug;
    }

}

export const dateFormat = (date) => {
    return new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' });
}

export const onlyNumberKey = (evt) => {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


export const validateFormField = (inputId, errorId) => {
    var createError = 0;
    let input = document.getElementById(inputId).value
    if (input && input.length <= 0) {
        document.getElementById(errorId).innerHTML = 'Please select brand!';
        document.getElementById(errorId).style.display = "block";
        setTimeout(() => {
            document.getElementById(errorId).innerHTML = '';
            document.getElementById(errorId).style.display = "none";
        }, 3000);
        createError++;
    }
    if (createError > 0) {
        // setTinyLoader(false);
        return false;
    }
}


export const ButtonSpinner = props => {
    return (
        <>
            {
                props.load ?
                    <div className="spinner-border spinner-border-sm mx-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    : props.btnName
            }
        </>
    )
}

export const numberFormatter = (value) => {
    const formattedNumber = new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        // currency: 'INR'
    }).format(value);
    return formattedNumber
}

export const getWeeksDate = (res, days) => {
    let resultDate = [];
    const result = new Date(res);
    result.setDate(result.getDate() + days);
    resultDate = result;
    return resultDate;
}

export const weekDatesForForms = (limit) => {
    let todayDate = new Date();
    let tommrow = todayDate.getDate() + 1;
    let weekDates = [];
    let weekCal = [];
    for (let i = 0; i < limit; i++) {
        let days = getWeeksDate(todayDate, i);
        weekDates.push({
            day: days.getDate(),
            month: days.toLocaleString('default', { month: 'short' }),
            weekDay: days.getDate() === todayDate.getDate() ? 'Today' : days.getDate() === tommrow ? 'Tomorrow' : days.toLocaleDateString('en-IN', { weekday: 'long' }),
            year: days.getFullYear(),
            dateValue: days.getFullYear()
        });
        weekCal = weekDates;
    }
    return weekCal;
}

// export const convCreatedDate = (date) => {
//     let todayDate = new Date(date);
//     // let tommrow = todayDate.getDate() + 1;
//     let weekDates = {
//         day: todayDate.getDate(),
//         month: todayDate.toLocaleString('default', { month: 'short' }),
//         year: todayDate.getFullYear(),
//     };
//     // console.group(weekDates);
//     let weekCal = {};
//     // for (let i = 0; i < limit; i++) {
//     //     let days = getWeeksDate(todayDate, i);
//     //     weekDates.push({
//     //         day: days.getDate(),
//     //         month: days.toLocaleString('default', { month: 'short' }),
//     //         weekDay: days.getDate() === todayDate.getDate() ? 'Today' : days.getDate() === tommrow ? 'Tommrow' : days.toLocaleDateString('en-IN', { weekday: 'long' }),
//     //         year: days.getFullYear(),
//     //         dateValue: days.getFullYear()
//     //     });
//     // }
//     // weekCal = weekDates.toString()
//     // console.log(JSON.parse(weekCal));
//     // return weekDates.toString();
// }

export const databaseDateConverter = (date) => {
    let day = new Date(date);
    let convDate = {
        day: day.getDate(),
        month: day.toLocaleString('default', { month: 'short' }),
        year: day.getFullYear(),
        weekDay: day.toLocaleDateString('en-IN', { weekday: 'short' })
    }
    return convDate;
}


// export function getTodayDate() {
//     const todayDate = new Date();
//     const currentDate = todayDate.getDate();
//     console.log(currentDate.length);
//     const todayMonth = todayDate.getMonth() + 1;
//     const todayYear = todayDate.getFullYear();
//     const todayTime = todayDate.getHours();
//     const todayDay = todayYear + '/' + todayMonth + '/' + currentDate
// console.log()
// }

export const fullDatabaseDateConverter = (date) => {
    let day = new Date(date);
    let convDate = {
        day: day.getDate(),
        month: day.toLocaleString('default', { month: 'long' }),
        year: day.getFullYear(),
        weekDay: day.toLocaleDateString('en-IN', { weekday: 'long' })
    }
    return convDate;
}


export const dateConverterForValue = (day, month, year) => {
    // day = day >= 1 || day <= 9 ? "0" + day : day.length === 3 ? day.slice(-2) : day;
    day = day >= 1 && day <= 9 ? "0" + day : day;
    const convDateMonth = new Date(`${day},${month},${year}`);
    let checkMonth = ("0" + (convDateMonth.getMonth() + 1)).slice(-2);
    const convDate = year + '/' + checkMonth + '/' + day
    return convDate;
}

export function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

export function formatHoursTo12Hour(date) {
    return date.getHours() % 12 || 12;
}

export const capitalizeFirstLetter = (str) => {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

export const countdown = (elementName, minutes, seconds) => {

    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "";
            document.getElementById('resendOtp').style.display = 'inline-block'
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }

    element = document.getElementById(elementName);
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

export const onlyAlphaValidation = (event) => {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[a-z]/i);
    return pattern.test(value);
}

export const ConfirmationModal = props => {
    return (
        <div className={`${props.confirm ? "open-popup" : ""} common-popup are-you-sure center-popup login`}>
            <div onClick={props.closePop} className='overlay-mob'></div>
            <div className='popup-inner'>
                <div className='popup-close' onClick={props.closePop}></div>
                <div className='before-otp'>
                    <h3>{props.msg}</h3>
                    <button type="button" className='btn arrow-style blue-btn' onClick={props.closePop}>Cancel</button>
                    <button className='btn arrow-style blue-btn grey' onClick={props.method}>Yes</button>
                </div>
            </div>

        </div>
    )
}

// export function calculateEMI(principal, interestRate, timePeriod) {
//     let monthlyInterestRate = interestRate / 1200;
//     let totalPayments = timePeriod * 12;
//     console.log(totalPayments);
//     let emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
//     return emi.toFixed(2);
// }

export function calculateEMI(loanAmount, interestRate, loanTenure) {


    // Calculate monthly interest rate and loan tenure in months
    var monthlyInterestRate = parseInt(interestRate) / 1200;
    var loanTenureInMonths = loanTenure * 12;
    // Calculate EMI
    var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

    // Calculate total interest payable
    var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

    // Calculate total loan amount
    var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);

    return ({ totalLoan: totalLoanAmount.toFixed(2), emi: emi.toFixed(2), interesPayable: totalInterestPayable.toFixed(2) });
}

export function countWords(str) {
    const arr = str.split(' ');

    return arr.filter(word => word !== '').length;
}

export function createLiElements(n) {
    var elements = [];
    for (let i = 0; i < n; i++) {
        elements.push(<li></li>);
    }
    return elements;
}

export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

import crypto from 'crypto';


function getAlgorithm(keyBase64) {
    var key = Buffer.from(keyBase64, 'base64');
    switch (key.length) {
        case 16:
            return 'aes-128-cbc';
        case 32:
            return 'aes-256-cbc';

    }
    throw new Error('Invalid key length: ' + key.length);
}


export const ccAvEncrypt = function (plainText, keyBase64, ivBase64) {
    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    return encrypted;
}

export const ccAvDecrypt = function (messagebase64, keyBase64, ivBase64) {

    const key = Buffer.from(keyBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
    let decrypted = decipher.update(messagebase64, 'hex');
    decrypted += decipher.final();
    return decrypted;
}
