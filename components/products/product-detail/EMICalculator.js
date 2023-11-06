
import { calculateEMI, numberFormatter } from '@/components/Helper';
import IntersetCalc from '@/pages/rangeslider/product-detail/InterestCalc';
import InterestYearCalc from '@/pages/rangeslider/product-detail/InterestYearCalc';
import { useEffect, useState } from 'react';


function EMICalculator({ productPrice }) {
    // console.log(' productPrice : ', productPrice)

    const [totalPaybel, setTotalPaybel] = useState('');
    const [monthelyPaybel, setMonthelyPaybel] = useState('');
    const [interestPer, setInterestPer] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [circlePerc, setCirclePerc] = useState('');

    // const $get80Val = parseInt(productPrice) * parseInt(80) / 100;
    const $get80Val = parseInt(productPrice);




    // let principal = parseFloat(prompt("Enter the loan amount:"));
    // let interestRate = parseFloat(prompt("Enter the interest rate (% per annum):"));
    // let timePeriod = parseFloat(prompt("Enter the loan period (in years):"));

    // let emi = calculateEMI(principal, interestRate, timePeriod);

    // let $calcInterestPerYear = (parseInt($get80Val) * parseInt(12) * parseInt(5)) / parseInt(100);
    // let $perMonthEMI = ((parseInt($get80Val) + parseInt($calcInterestPerYear)) / parseInt(60)).toFixed(0);
    let $calcInterestPerYear = '';
    let $perMonthEMI = '';

    $calcInterestPerYear = calculateEMI($get80Val, 12, 5)
    $perMonthEMI = calculateEMI($get80Val, 12, 5);


    var loanAmount = $get80Val;
    var interestRate = 12;
    var loanTenure = 5;

    // Calculate monthly interest rate and loan tenure in months
    var monthlyInterestRate = parseInt(interestRate) / 1200;
    var loanTenureInMonths = loanTenure * 12;
    // Calculate EMI
    var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

    // Calculate total interest payable
    var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

    // Calculate total loan amount
    var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);


    const part = emi;
    const whole = totalLoanAmount;

    const percent = (part / whole) * 100;




    // var loanAmount = $get80Val;
    // var interestRate = document.getElementById("interest-per").value;
    // var loanTenure = document.getElementById("interest-year").value;

    // // Calculate monthly interest rate and loan tenure in months
    // var monthlyInterestRate = parseInt(interestRate) / 1200;
    // var loanTenureInMonths = loanTenure * 12;
    // // Calculate EMI
    // var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

    // // Calculate total interest payable
    // var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

    // // Calculate total loan amount
    // var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);

    // console.log('$perMonthEMI : ', $perMonthEMI)
    // console.log('$calcInterestPerYear : ', $calcInterestPerYear);

    // let $calcInterestPerYear = ($get80Val * 12 * 60) / 1200;
    // let $perMonthEMI = ($get80Val + $calcInterestPerYear) / 60;

    useEffect(() => {

    }, [])

    // console.log('calculateEMI($get80Val, 12, 5)', calculateEMI($get80Val, 12, 5));
    const calcInterestPer = (e) => { }
    const calInterestPerYear = (e) => { }

    const calcInteretByPerAndyear = (e) => {
        e.preventDefault();

        const $interestYear = document.getElementById('interest-year').value;
        const $interestPer = document.getElementById('interest-per').value;




        // var loanAmount = document.getElementById("loanAmount").value;
        // var interestRate = document.getElementById("interestRate").value;
        // var loanTenure = document.getElementById("loanTenure").value;
        // console.log(loanAmount)
        // console.log(interestRate)
        // console.log(loanTenure)


        var loanAmount = $get80Val;
        var interestRate = document.getElementById("interest-per").value;
        var loanTenure = document.getElementById("interest-year").value;

        // Calculate monthly interest rate and loan tenure in months
        var monthlyInterestRate = parseInt(interestRate) / 1200;
        var loanTenureInMonths = loanTenure * 12;
        // Calculate EMI
        var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureInMonths) / (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);

        // Calculate total interest payable
        var totalInterestPayable = emi * loanTenureInMonths - loanAmount;

        // Calculate total loan amount
        var totalLoanAmount = parseFloat(loanAmount) + parseFloat(totalInterestPayable);

        // Display results
        // document.getElementById("emi").innerHTML = "EMI: " + emi.toFixed(0);
        // document.getElementById("totalInterest").innerHTML = "Total Interest Payable: " + totalInterestPayable.toFixed(0);
        // document.getElementById("totalLoanAmount").innerHTML = "Total Loan Amount: " + totalLoanAmount.toFixed(0);




        const part = emi;
        const whole = totalLoanAmount;

        const percent = (part / whole) * 100;



        setTotalPaybel(totalLoanAmount.toFixed(0));
        setMonthelyPaybel(emi.toFixed(0));
        setInterestPer(totalInterestPayable.toFixed(0));
        setTotalInterest(totalInterestPayable.toFixed(0));
        setCirclePerc(percent.toFixed(0));


    }

    return (
        <>

            <div className="col-md-6 pro-d-emi">
                <div className="featSpecCont">
                    <h2>EMI Calculator</h2>
                    <div className="emi-calculator">
                        <div className="box-1">

                            <form name="frmCalulator" id="frmCalulator" onSubmit={calcInteretByPerAndyear} method="POST" >
                                <div className="row mb-3">
                                    <div className="col-md-7">
                                        <label>Loan Amount</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input className='input' type="text" value={`INR ${numberFormatter($get80Val)}`} id="loan_amount" name="loan_amount" readOnly />
                                        <span className="error" id="error_loan_amount"></span> </div>
                                </div>

                                <IntersetCalc min={1}
                                    max={15}
                                    defaultValue={12}
                                    onChange={calcInterestPer} />
                                {/* ({ min }) => console.log(`min = ${min}`) */}

                                <InterestYearCalc
                                    min={1}
                                    max={5}
                                    defaultValue={5}
                                    onChange={calInterestPerYear}
                                />
                                {/* ({ min }) => console.log(`min = ${min}`) */}

                                <div className="label">
                                    <button className="btn calculate-btn reverse"> Calculate </button>
                                </div>
                            </form>
                            <div className="row mb-4 gap">
                                <div className="col-md-4">
                                    <div className="chart-wrapper">




                                        <div className="pie animate" style={{ "--p": circlePerc !== '' && circlePerc !== undefined ? circlePerc : percent.toFixed(0) }} >
                                            <div className='bg-cricle'></div>
                                            <div className='emi-text'>EMI</div>
                                            <div className='emi-number'><span>INR</span>  {numberFormatter(monthelyPaybel ? monthelyPaybel : emi.toFixed(0))}</div>
                                        </div>

                                    </div>
                                </div>
                                {/* ? $calcInterestPerYear : totalPaybel */}
                                {/* {console.log(numberFormatter(totalPaybel ? totalPaybel : $calcInterestPerYear))} */}
                                <div className="col-md-8">
                                    <ul className="pieDetls">
                                        <li><span>Principal</span> <span>₹ {numberFormatter($get80Val)}</span></li>
                                        <li className='intrest-payble'>Interest Payable <span>₹ {numberFormatter(totalInterest ? totalInterest : totalInterestPayable.toFixed(0))}</span></li>
                                        {/* <li className='intrest-payble'>Interest Payable <span>{numberFormatter($calcInterestPerYear ? $calcInterestPerYear : totalPaybel)}</span></li>
                                        totalPaybel ? totalPaybel : $calcInterestPerYear
                                        */}
                                        <li>Total Amount Payable <span>₹ {numberFormatter(totalPaybel ? totalPaybel : totalLoanAmount.toFixed(0))}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="st-sm"> The above calculation is just for reference only. The loan is at the sole discretion of the Financier.<br />Terms & Condition apply. </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EMICalculator