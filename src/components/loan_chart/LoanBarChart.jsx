import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LoanBarChart = ({ loans }) => {
  const data = {
    labels: loans.map((loan, index) => `Loan ${index + 1}`),
    datasets: [
      {
        label: 'EMI Amount (₹)',
        data: loans.map((loan) => parseFloat(loan.payment)),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto' }}>
      <h3>📊 EMI Comparison (All Loans)</h3>
      <Bar data={data} />
    </div>
  );
};

export default LoanBarChart;