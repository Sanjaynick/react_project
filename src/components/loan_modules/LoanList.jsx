import React from 'react';
import LoanItem from './LoanItem';

const LoanList = ({ loans, removeLoan, payMonth }) => {

     const allFinished = loans.filter(loan => loan.status == "Ongoing")

     if(allFinished.length == 0){
      return <p className='all-finished'>All Loans Are Finished</p>
     }

  return (
    <div>
      {
        allFinished.map((loan) => (
          <LoanItem key={loan.id} loan={loan} removeLoan={removeLoan} payMonth={payMonth} />
        ))
        }
    </div>
  );
};

export default LoanList;