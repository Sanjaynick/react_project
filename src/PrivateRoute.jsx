import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from './firebaseconfig';

function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;