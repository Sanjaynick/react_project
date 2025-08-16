import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Reset isLoggedIn if user closes browser or refreshes
  useEffect(() => {
    const handleUnload = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { isLoggedIn: false });
        await signOut(auth);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');
    setCanResend(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Email verification check
      if (!user.emailVerified) {
        setInfoMsg('Please verify your email before logging in. Check your inbox.');
        setCanResend(true);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.isLoggedIn) {
          alert("This account is already logged in on another device.");
          await signOut(auth); // Sign out to prevent stuck session
          return;
        }
        await updateDoc(userDocRef, { isLoggedIn: true });
      }

      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const resendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        alert("Verification email sent again. Check your inbox!");
      } else {
        alert("Please try logging in again to resend the verification email.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <nav>
        <h2>Loan Tracker</h2>
      </nav>
      <div className="login-page-container">
        <div className="login-sub-page">
          <h1>Log In</h1>
          <form className='login-form' onSubmit={handleLogin}>
            <input
              type="email"
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Enter Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
            <p>Don't have an account? <span><Link to='/signup'>Sign Up</Link></span></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {infoMsg && <p style={{ color: 'orange' }}>{infoMsg}</p>}
          </form>
          {canResend && (
            <button onClick={resendVerification} style={{ marginTop: '10px' }}>
              Resend Verification Email
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
