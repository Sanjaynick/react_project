import React, { useEffect, useState } from 'react'
import LoanList from '../../loan_modules/LoanList'

const LoanPage = ({loans = [], removeLoan, payMonth}) => {

  return (
     <div className="home-sub-div">
      <LoanList loans={loans} removeLoan={removeLoan} payMonth={payMonth} />
       </div>
  )
}

export default LoanPage