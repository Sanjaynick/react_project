import { useState, useEffect } from 'react'
import './index.css'
import {
  HashRouter  as Router, Routes , Route, useLocation
} from 'react-router-dom'
import { db } from './firebaseconfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
    onSnapshot
} from 'firebase/firestore';
import AppRoutes from './AppRoutes'


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

    if(updatedLoan.monthsPaid == loan.duration){
      await updateDoc(loanDoc, {status: "Finished"})
    }
  };

  return (
    <>
   <Router>
      <AppRoutes
        loans={loans}
        addLoan={addLoan}
        removeLoan={removeLoan}
        payMonth={payMonth}
      />
    </Router>
    </>
  )
}

export default App
