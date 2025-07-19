
import React, { useState, useEffect } from 'react';
import './Home.css'
import LoanForm from '../../loan_modules/LoanForm';
import { useUser } from '../../../UserContext';
import DashBoard from '../../dashboard/DashBoard';


const Home = ({addLoan}) => {

  const [showPopup, setShowPopup] = useState(false)

  const handleShowPopup = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const {userData} = useUser();

  return (
    <>
    {userData && (
          <span className='home-username'>
            Welcome, <strong>{userData?.username.toUpperCase()}</strong>
          </span>
        )}

        <DashBoard />

        <button onClick={handleShowPopup} className='home-add-btn'>Add</button>

     {showPopup &&  <LoanForm addLoan={addLoan} onclose={handleClosePopup} />}

    </>

   
  );
}

export default Home