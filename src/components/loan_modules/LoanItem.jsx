import React, { useState } from 'react';
import LoanChart from '../loan_chart/LoanChart';
import LoanProgressChart from '../loan_chart/LoanProgressChart';

const LoanItem = ({ loan, removeLoan, payMonth }) => {

  return (
    <div className='loan-item'>
      <div className="loan-item-details">
        <table>
          <tbody>
            <tr>
              <td><h5>Loan Name</h5></td>
              <td><h5>{loan.loanName}</h5></td>
            </tr>
            <tr>
              <td><h5>Loan Amount</h5></td>
              <td><h5>₹ {loan.amount}</h5></td>
            </tr>
            <tr>
              <td><h5>Interest Rate</h5></td>
              <td><h5>{loan.interest}%</h5></td>
            </tr>
              <tr>
              <td><h5>Monthly Interest</h5></td>
              <td><h5>₹ {loan.totalInterest}</h5></td>
            </tr>
            <tr>
              <td><h5>Duration</h5></td>
              <td><h5>{loan.duration} months</h5></td>
            </tr>
            <tr>
              <td><h5>Monthly Pay</h5></td>
              <td><h5>₹ {loan.payment}</h5></td>
            </tr>
            <tr>
              <td><h5>Due Date</h5></td>
              <td><h5>{loan.duedate}</h5></td>
            </tr>
            <tr>
              <td><h5>Months Paid</h5></td>
              <td><h5>{loan.monthsPaid} / {loan.duration}</h5></td>
            </tr>
          </tbody>
        </table>

        <div className="loan-item-buttons">
          <button onClick={() => removeLoan(loan.id)} style={{ marginLeft: 10 }}>
            Remove
          </button>
        </div>

      </div>

      <div className="loan-item-sub-div">
        <LoanProgressChart loan={loan} />
      </div>
    </div>
  );
};

export default LoanItem;