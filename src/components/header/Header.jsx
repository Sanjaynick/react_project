import './Header.css'
import React from 'react'
import {Link} from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx'

const Header = () => {

    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const {userData} = useUser()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand  text-black " to="/home">Loan Tracker</Link>
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

        <div className="collapse navbar-collapse ms-5" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item   ">
              <Link className="nav-link text-black" to="/home">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link text-black dropdown-toggle" to='#' id='dropdownNavbar' role='button' data-bs-toggle='dropdown' aria-expanded='false'>Loans</Link>
              <ul className='dropdown-menu' aria-labelledby='dropdownNavbar'>
                   <li><Link className="dropdown-item" to='/loan' >Current Loan</Link></li>
                   <li><Link className="dropdown-item" to='/finishedloan'>Finished Loan</Link></li>
              </ul>
            </li>
            <li className="nav-item   ">
              <Link className="nav-link text-black" to="/InterestCalculator">Calculator</Link>
            </li>
                <div className="nav-item logout-div  " onClick={handleLogout}>
              {userData?.username.slice(0,1).toUpperCase()}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header