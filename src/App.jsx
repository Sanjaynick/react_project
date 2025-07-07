import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import InterestCalculator from './components/intrest_calculator/InterestCalculator'
import {
  BrowserRouter as Router, Routes , Route
} from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
          <Header />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/InterestCalculator' element={<InterestCalculator />} />
          </Routes>
    </Router>
    </>
  )
}

export default App
