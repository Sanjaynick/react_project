import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      // 1️⃣ Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Save user data in Firestore with lastActive timestamp
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        email,
        createdAt: new Date(),
        lastActive: new Date(0) // session inactive until login
      });

      // 3️⃣ Send email verification
      await sendEmailVerification(user);

      setSuccessMsg('Signup successful! Verification email sent. Please verify your email before logging in.');
      setUsername('');
      setEmail('');
      setPassword('');

      // Optional: redirect after delay
      setTimeout(() => navigate('/'), 7000);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav>
        <h2>Loan Tracker</h2>
      </nav>
      <div className="Signup-page-container">
        <div className="signup-sub-page">
          <h1>Sign Up</h1>
          <form className='signup-form' onSubmit={handleSignup}> 
            <input
              type="email"
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder='Create UserName'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder='Create Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Sign Up</button>
            <p>Already have an account? <span><Link to='/'>Log In</Link></span></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
