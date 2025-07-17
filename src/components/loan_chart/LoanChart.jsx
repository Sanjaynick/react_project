import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const LoanChart = ({ loan }) => {
  const totalInterest = (loan.amount * loan.interest * loan.duration) / ( 100 * loan.duration ).toFixed(2);

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [loan.amount, totalInterest],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '300px', marginTop: '10px' }}>
      <Pie data={data} />
    </div>
  );
};

export default LoanChart;