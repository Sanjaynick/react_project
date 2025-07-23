import React from 'react'
import LoanItem from '../../loan_modules/LoanItem'
import './FinishedLoan.css'

const FinishedLoan = ({loans, removeLoan, payMonth}) => {

  const finishedLoans = loans.filter(loan => loan.status == "Finished")

  if(finishedLoans.length == 0){
    return <p className='no-loan-para'>There are no Finished Loans</p>
  }
  return (
    finishedLoans.map((loan) => (
      <LoanItem key={loan.id} loan={loan} removeLoan={removeLoan} payMonth={payMonth} />
    ))
  )
}

export default FinishedLoan