import React from 'react';
import LoanItem from './LoanItem';

const LoanList = ({ loans, removeLoan, payMonth }) => {
  return (
    <div>
      {
        loans.map((loan) => (
          <LoanItem key={loan.id} loan={loan} removeLoan={removeLoan} payMonth={payMonth} />
        ))
        }
    </div>
  );
};

export default LoanList;