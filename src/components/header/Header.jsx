import './Header.css'
import React from 'react'
import {Link} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand  text-black " to="/">Loan Tracker</Link>
        <button
          className="navbar-toggler bg-black"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item   ">
              <Link className="nav-link text-black" to="/">Home</Link>
            </li>
            <li className="nav-item   ">
              <Link className="nav-link text-black" to="/loan">Loans</Link>
            </li>
            <li className="nav-item   ">
              <Link className="nav-link text-black" to="/InterestCalculator">Calculator</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header