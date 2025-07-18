import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './components/pages/home/Home'
import InterestCalculator from './components/intrest_calculator/InterestCalculator'
import LoanPage from './components/pages/loan/LoanPage'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/login/SignupPage'
import PrivateRoute from './PrivateRoute'

function AppRoutes({ loans, addLoan, removeLoan, payMonth }) {
  const location = useLocation()
  const hideHeaderOnRoutes = ['/', '/signup']

  return (
    <>
      {!hideHeaderOnRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={
          // <PrivateRoute>
          <SignupPage />
          // </PrivateRoute>
          } />
       
        <Route path='/home' element={
           <PrivateRoute>
          <Home addLoan={addLoan} />
          </PrivateRoute>
          } />
        
        <Route
          path='/loan'
          element={
            <PrivateRoute>
            <LoanPage
              loans={loans}
              removeLoan={removeLoan}
              payMonth={payMonth}
            />
            </PrivateRoute>
          }
        />
        <Route path='/InterestCalculator' element={
           <PrivateRoute>
          <InterestCalculator />
          </PrivateRoute>
          } />
      </Routes>
    </>
  )
}

export default AppRoutes