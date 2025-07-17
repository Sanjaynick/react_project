import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LoanProgressChart = ({ loan }) => {
  const paid = (loan.emi * loan.monthsPaid).toFixed(2);
  const remaining = (loan.amount + (loan.amount * loan.interest * loan.duration) / ( 100 * loan.duration ) * loan.duration) - Number(paid).toFixed(2);

  const data = {
    labels: ['Loan Progress'],
    datasets: [
      {
        label: 'Paid (₹)',
        data: [paid],
        backgroundColor: '#4caf50',
      },
      {
        label: 'Remaining (₹)',
        data: [remaining],
        backgroundColor: '#f44336',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: 400, marginTop: 10 }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LoanProgressChart;