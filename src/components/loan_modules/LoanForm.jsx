import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './LoanModules.css'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';

const LoanForm = ({ addLoan, onclose, loan }) => {
  const [loanName, setLoanName] = useState('');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('');
  const [dueDate, setDueDate] = useState('')

  const calculatePayment = (P, R, N) => {
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
    const lastDate = parseInt(dueDate)
    const lastPaidDate = null

    const payment = calculatePayment(principal, rate, months);
    const totalInterest = (principal * rate * months) / ( 100 * months ).toFixed(2);

     const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert('You must be logged in to add a loan.');
    return;
  }

    const loan = {
      userId: user.uid,
      loanName : loansname,
      amount: principal,
      interest: rate,
      duration: months,
      duedate:lastDate,
      lastPaidDate,
      totalInterest,
      payment,
      monthsPaid: 0,
      status:"Ongoing"
    };

    addLoan(loan);
    setLoanName('');
    setAmount('');
    setInterest('');
    setDuration('');
    setDueDate('')

    alert("Your Form Submitted Successfully")

    onclose()
  };

  return (
    <form onSubmit={handleSubmit} className='loan-form'>
      <h1>Enter Your Loan Form to Track</h1>
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
      <div className='loan-form-div'>
        <input
          type="number"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" >Add Loan</button>
      <button onClick={onclose} >Cancel</button>
    </form>
  );
};

export default LoanForm;