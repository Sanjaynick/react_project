import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './firebaseconfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // { uid, email, username }
  const [ongoingCount, setOngoingCount] = useState(0); 
  const [finishedCount, setFinishedCount] = useState(0); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect (() => {
    const fetchOngoingLoans = async () => {
      try {
        const loanRef = collection(db, 'loans')
        const ongoingQuery = query(loanRef, where('status', '==', 'Ongoing'))

        const snapshot = await getDocs(ongoingQuery)
        setOngoingCount(snapshot.size)

      }
      catch(err){
        console.log("Error Fetching Count :", err);
        
      }
    }
    fetchOngoingLoans()
  }, [])

  useEffect(() => {
    const fetchFinishedLoans = async () => {
      try{
        const loansRef = collection(db, 'loans')
        const finishedLoansQuery = query(loansRef, where('status', '==', 'Finished'))

        const snapshot = await getDocs(finishedLoansQuery)
        setFinishedCount(snapshot.size)
      }
      catch(err){
        console.log("Error Fetching Count : ", err);
        
      }
    }

    fetchFinishedLoans()
  }, [])
  
  return (
    <UserContext.Provider value={{userData, ongoingCount, finishedCount}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);