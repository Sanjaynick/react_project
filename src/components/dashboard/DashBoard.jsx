import React from 'react'
import './DashBoard.css'
import { useUser } from '../../UserContext'
import { Link, useNavigate } from 'react-router-dom'

const DashBoard = () => {

  const {ongoingCount, finishedCount} = useUser()
  const navigate = useNavigate()

  const handleCurrentLoan = () => {
    navigate('/loan')
  }

  const handleFinishedLoan = () => {
    navigate('/finishedloan')
  }


  return (
    <>
   <div className="dashboard-div-container">
    <div className="dashboard-first-card" onClick={handleCurrentLoan}>
        <h1>Current Loan</h1>
        <h1>{ongoingCount}</h1>
    </div>
     <div className="dashboard-second-card" onClick={handleFinishedLoan}>
        <h1>Finished Loan</h1>
        <h1>{finishedCount}</h1>
    </div>
   </div>
    </>
  )
}

export default DashBoard