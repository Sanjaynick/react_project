import React, { useEffect, useState } from 'react'
import LoanList from '../../loan_modules/LoanList'

const LoanPage = ({loans = [], removeLoan, payMonth}) => {


  //  const allFinished = loans.filter(loan => loan.status == "Ongoing")
  //  console.log(allFinished);
   

  return (
     <div className="home-sub-div">
  {/* {
    allFinished.length > 0 ? ( */}
      <LoanList loans={loans} removeLoan={removeLoan} payMonth={payMonth} />
    {/* ) : (
      <p>All Loans Are Fully Paid</p>
    )
  } */}
       </div>
  )
}

export default LoanPage