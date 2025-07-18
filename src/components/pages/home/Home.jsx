
import React, { useState, useEffect } from 'react';
import './Home.css'
import LoanForm from '../../loan_modules/LoanForm';
import { useUser } from '../../../UserContext';


const Home = ({addLoan}) => {

  const user = useUser();

  return (
    <>
    {user && (
          <span className='home-username'>
            Welcome, <strong>{user.username.toUpperCase()}</strong>
          </span>
        )}
    <div className='home-div'>
      <div className="home-form-div">
      <h1>Enter Your Loan Amount To Track</h1>
      <LoanForm addLoan={addLoan} />
      </div>

    </div>
    </>

   
  );
}

export default Home