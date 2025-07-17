import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/header/Header'
import Home from './components/pages/home/Home'
import InterestCalculator from './components/intrest_calculator/InterestCalculator'
import {
  BrowserRouter as Router, Routes , Route
} from 'react-router-dom'
import LoanPage from './components/pages/loan/LoanPage'
import LoanForm from './components/loan_modules/LoanForm'
import { db } from './firebaseconfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
    onSnapshot
} from 'firebase/firestore';


function App() {

  
     const [loans, setLoans] = useState([]);

  const loansCollection = collection(db, 'loans');

  //  Real-time listener using onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(loansCollection, (snapshot) => {
      const loanData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoans(loanData);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Add loan to Firestore
  const addLoan = async (loan) => {
    await addDoc(loansCollection, loan);
    // No need to update state manually — onSnapshot handles it
  };

  // Remove loan from Firestore
  const removeLoan = async (id) => {
    const loanDoc = doc(db, 'loans', id);
    await deleteDoc(loanDoc);
  };

  // Update loan in Firestore
  const payMonth = async (id) => {
    const loan = loans.find((loan) => loan.id === id);
    if (!loan || loan.monthsPaid >= loan.duration) return;

    const updatedLoan = { ...loan, monthsPaid: loan.monthsPaid + 1 };
    const loanDoc = doc(db, 'loans', id);
    await updateDoc(loanDoc, { monthsPaid: updatedLoan.monthsPaid });
  };

  return (
    <>
    <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home addLoan={addLoan}  />} />
            <Route path='/loan' element={<LoanPage  loans={loans} removeLoan={removeLoan} payMonth={payMonth} />} />
            <Route path='/InterestCalculator' element={<InterestCalculator />} />
          </Routes>
    </Router>
    </>
  )
}

export default App
