
import React, { useState, useEffect } from 'react';
import './Home.css'
import LoanForm from '../../loan_modules/LoanForm';


const Home = ({addLoan}) => {

  return (
    <div className='home-div'>
      <div className="home-form-div">
      <h1>Enter Your Loan Amount To Track</h1>
      <LoanForm addLoan={addLoan} />
      </div>

    </div>

   
  );
}

export default Home