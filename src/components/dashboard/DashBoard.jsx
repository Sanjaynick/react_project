import React from 'react'
import './DashBoard.css'
import { useUser } from '../../UserContext'

const DashBoard = () => {

  const {ongoingCount, finishedCount} = useUser()

  return (
    <>
   <div className="dashboard-div-container">
    <div className="dashboard-first-card">
        <h1>Current Loan</h1>
        <h1>{ongoingCount}</h1>
    </div>
     <div className="dashboard-second-card">
        <h1>Finished Loan</h1>
        <h1>{finishedCount}</h1>
    </div>
   </div>
    </>
  )
}

export default DashBoard