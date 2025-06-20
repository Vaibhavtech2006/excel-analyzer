import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-100 flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/color/48/microsoft-excel-2019.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold text-blue-600">Excel Analyzing Platform</h1>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-semibold shadow"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        {isLoggedIn ? (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">Welcome, {user?.name || 'User'}!</h2>
            <p className="text-gray-600 mb-6">Here’s your profile information:</p>
            <div className="text-left space-y-2">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Plan:</strong> {user?.plan || 'Free'}</p>
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm text-center py-6 text-sm text-gray-500">
        <p className="text-gray-600">© 2025 Excel Analyzing Platform. All rights reserved.</p>
        <div className="mt-2 space-x-6 text-blue-600 font-medium">
          <button onClick={() => navigate('/about')} className="hover:underline">About</button>
          <button onClick={() => navigate('/contact')} className="hover:underline">Contact</button>
          <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy</button>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
