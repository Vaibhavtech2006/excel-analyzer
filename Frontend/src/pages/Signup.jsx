import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // Local state for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password,
      });

      console.log('Signup response:', res.data);

      if (res.data.message === 'User registered') {
        navigate('/profile');
      } else {
        alert('Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert('Signup failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/color/48/microsoft-excel-2019.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold text-blue-600">
            Excel Analyzing Platform
          </h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold shadow hover:bg-blue-700"
        >
          Go to Home
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
            Sign Up
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Signup;
