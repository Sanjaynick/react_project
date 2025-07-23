import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const LoginPage = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. (Optional) Get extra user data (like username) from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Logged in as:', userData.username);
        // You could store username in state, context, or localStorage if needed
      }

      // 3. Redirect to home
      navigate('/home');
    } catch (err) {
      setError(err.message);
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
                <form className='login-form' onSubmit={handleLogin} > 
                    <input type="text" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Log IN</button>
                    <p>Don't have an account <span><Link to='/signup'>Sign Up</Link></span></p>
                     {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
        </>
    )
}

export default LoginPage