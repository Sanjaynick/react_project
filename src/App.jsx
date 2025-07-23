import { useState, useEffect } from 'react'
import './index.css'
import {
  HashRouter as Router, Routes, Route, useLocation
} from 'react-router-dom'
import { db } from './firebaseconfig';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import AppRoutes from './AppRoutes'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';


function App() {


  const [loans, setLoans] = useState([]);
   const loansCollection = collection(db, 'loans')


  //  Real-time listener using onSnapshot
  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const loansQuery = query(loansCollection, where('userId', '==', user.uid));

      const unsubscribeLoans = onSnapshot(loansQuery, (snapshot) => {
        const loanData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLoans(loanData);
      });

      return () => unsubscribeLoans();
    });

    return () => unsubscribeAuth();
  }, []);

  // Add loan to Firestore
  const addLoan = async (loan) => {
    const auth = getAuth()
    const user = auth.currentUser
    if(!user) return

    await addDoc(loansCollection, {
      ...loan,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });
    // No need to update state manually — onSnapshot handles it
  };

  // Remove loan from Firestore
  const removeLoan = async (id) => {
    const loanDoc = doc(db, 'loans', id);
    await deleteDoc(loanDoc);
  };

  // Update loan in Firestore
  const payMonth = async () => {
    const today = new Date();
    const todayDate = today.getDate(); // 1–31
    const todayMonth = today.getMonth() + 1; // 0–11
    const todayYear = today.getFullYear();

    for (const loan of loans) {
      if (
        Number(loan.duedate) === todayDate &&
        loan.monthsPaid < loan.duration
      ) {
        // Check if this loan was already paid this month
        const lastPaid = loan.lastPaidDate ? new Date(loan.lastPaidDate) : null;

        const alreadyPaidThisMonth =
          lastPaid &&
          lastPaid.getMonth() + 1 === todayMonth &&
          lastPaid.getFullYear() === todayYear;

        if (!alreadyPaidThisMonth) {
          const updatedLoan = {
            ...loan,
            monthsPaid: loan.monthsPaid + 1,
            lastPaidDate: today.toISOString(), // store when this payment was made
          };

          const loanDoc = doc(db, 'loans', loan.id);

          await updateDoc(loanDoc, {
            monthsPaid: updatedLoan.monthsPaid,
            lastPaidDate: updatedLoan.lastPaidDate,
          });

          if (updatedLoan.monthsPaid === loan.duration) {
            await updateDoc(loanDoc, { status: "Finished" });
          }
        }
      }
    }
  };

  useEffect(() => {
    payMonth()
  }, [loans])


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
