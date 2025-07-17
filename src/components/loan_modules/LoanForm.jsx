import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './LoanModules.css'

const LoanForm = ({ addLoan }) => {
  const [loanName, setLoanName] = useState('');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('');

  const calculateEMI = (P, R, N) => {
    const monthlyRate = R / 12 / 100;
    const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, N)) /
                (Math.pow(1 + monthlyRate, N) - 1) + (P * R * N) / ( 100 * N);
    return emi.toFixed(2);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const loansname = loanName
    const principal = parseFloat(amount);
    const rate = parseFloat(interest);
    const months = parseInt(duration);

    const emi = calculateEMI(principal, rate, months);
    const loan = {
      id: uuidv4(),
      loanName : loansname,
      amount: principal,
      interest: rate,
      duration: months,
      emi,
      monthsPaid: 0,
    };

    addLoan(loan);
    setLoanName('');
    setAmount('');
    setInterest('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} className='loan-form'>
      <div className='loan-form-div'>
        <input
          type="text"
          placeholder="Loan Name"
          value={loanName}
          onChange={(e) => setLoanName(e.target.value)}
          required
        />
      </div>
       <div className='loan-form-div'>
        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className='loan-form-div'>
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
        />
      </div>
      <div className='loan-form-div'>
        <input
          type="number"
          placeholder="Duration (Months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default LoanForm;