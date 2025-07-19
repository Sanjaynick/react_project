import React from 'react'
import { useState } from 'react'
import './InterestCalculator.css'

const InterestCalculator = () => {

  const [emiAmount, setEmiAmount] = useState('')
  const [interest, setInterest] = useState('')
  const [tenure, setTenure] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [monthlyInterest, setMonthlyInterest] = useState(0)
  const [monthlyPayInterest, setMonthlyPayInterest] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const handleInput = (e) => {
    setEmiAmount(e.target.value)
  }
  const handleInput1 = (e) => {
    setInterest(e.target.value)
  }
  const handleInput2 = (e) => {
    setTenure(e.target.value)
  }

  const ClearAllValue = () => {
    setEmiAmount('')
    setInterest('')
    setTenure('')
    setMonthlyPayment(0)
    setMonthlyInterest(0)
    setMonthlyPayInterest(0)
    setTotalInterest(0)
    setTotalPayment(0)
  }

  const p = emiAmount
  const r = interest / 100 / 12
  const R = interest
  const n = tenure
  const monthlyInterests = (p * R * n) / (100 * n)
  const totalIntrests = monthlyInterests * n
  // const totalPay = Number(p) + Number(totalIntrests)

  const calcualtion = () => {
    const result1 = monthlyInterests
    setMonthlyInterest(result1.toFixed(2))

    const result2 = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(result2.toFixed(2))

    const result3 = result1 + result2
    setMonthlyPayInterest(result3.toFixed(2))

    const result4 = totalIntrests
    setTotalInterest(result4.toFixed(2))

    // const result5 = totalPay
    const result5 = result3 * n
    setTotalPayment(result5.toFixed(2))
  }

  const clickCalcBtn = () => {
    calcualtion()
  }

  const ClearAll = () => {
    ClearAllValue()
  }

  return (
    <section className="calculator-section">
      <div className="calculator-container">
        <h1>Interest Calculator</h1>

        <div className="input-fields">
          <label htmlFor="emi-amount">EMI Amount</label>
          <input type="number" id='emi-amount' value={emiAmount} onChange={handleInput} />
          <label htmlFor="interest">Interest</label>
          <input type="number" id='interest' value={interest} onChange={handleInput1} />
          <label htmlFor="tenure">Tenure(Month)</label>
          <input type="number" id='tenure' value={tenure} onChange={handleInput2} />
        </div>

        <div className="buttons">
          <button onClick={clickCalcBtn}>Calculate</button>
          <button onClick={ClearAll}>Reset</button>
        </div>

        <div className="details">
          <div className="summary">
            <h1>Your EMI Details</h1>
            <div className="details-div">
              <div className="monthly-pay">
                <p>Monthly Payment</p>
                <p>{monthlyPayment}</p>
              </div>
              <div className="monthly-pay">
                <p>Monthly Interest</p>
                <p>{monthlyInterest}</p>
              </div>
              <div className="monthly-pay">
                <p>Monthly Payment with Interest</p>
                <p>{monthlyPayInterest}</p>
              </div>
              <div className="monthly-pay">
                <p>Total Interest</p>
                <p>{totalInterest}</p>
              </div>
              <div className="monthly-pay">
                <p>Total Payment</p>
                <p>{totalPayment}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default InterestCalculator