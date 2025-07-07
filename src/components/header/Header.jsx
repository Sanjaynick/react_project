import './Header.css'
import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <nav>
        <h1>EMI Tracker</h1>
        <div className="list-div">
            <ul>
                <li><Link to ='/Home' className='list'>Home</Link></li>
                <li><Link to ='/InterestCalculator' className='list'>Interest Calculator</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header