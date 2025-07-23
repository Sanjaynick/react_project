import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
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


useEffect(() => {
  const auth = getAuth();
   let unsubscribeSnapshot = null;

  const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) {
      setOngoingCount(0);
     if (unsubscribeSnapshot) unsubscribeSnapshot(); // cleanup if needed
      return;
    }

    try {
      const loanRef = collection(db, 'loans');
      const ongoingQuery = query(
        loanRef,
        where('status', '==', 'Ongoing'),
        where('userId', '==', user.uid)
      );

         unsubscribeSnapshot = onSnapshot(ongoingQuery, (snapshot) => {
      setOngoingCount(snapshot.size); // Real-time update
    });
 
    } catch (err) {
      console.log("Error Fetching Count :", err);
    }
  });

  return () => {
    unsubscribe()
    if(unsubscribeSnapshot) unsubscribeSnapshot()
  };
}, []);

  useEffect(() => {
    const  auth = getAuth()
    let unsubscribeSnapshot = null;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if(!user){
        setFinishedCount(0)
        if (unsubscribeSnapshot) unsubscribeSnapshot(); // cleanup if needed
      return;
      }

      try{
        const loanrefs = collection(db, 'loans')
        const finishedQuery = query(loanrefs, where('status', '==', 'Finished'), where('userId', '==', user.uid))
        
            const unsubscribeSnapshot = onSnapshot(finishedQuery, (snapshot) => {
            setFinishedCount(snapshot.size); // Real-time update
    });

    // Clean up listener when user logs out
    return () => unsubscribeSnapshot();
      }
      catch(err){
        console.log("cant't get finished count : ", err);
      }

    })
     return () => {
    unsubscribe()
    if(unsubscribeSnapshot) unsubscribeSnapshot()
  };
  }, [])
  
  return (
    <UserContext.Provider value={{userData, ongoingCount, finishedCount}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);