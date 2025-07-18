import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

   const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save additional data (username) in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        createdAt: new Date()
      });

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
     <div className="Signup-page-container">
            <div className="signup-sub-page">
                <h1>Sign Up</h1>
                <form className='signup-form' onSubmit={handleSignup} > 
                    <input type="text" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='Create UserName' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder='Create Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign Up</button>
                    <p>Already have an account <span><Link to='/'>Log In</Link></span></p>
                     {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
        </>
  )
}

export default SignupPage