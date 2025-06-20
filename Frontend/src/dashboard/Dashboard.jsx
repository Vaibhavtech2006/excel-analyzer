import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-blue-50 to-purple-100">
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

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-1.5 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-1.5 text-sm rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Profile
          </button>
        </div>
      </header>

      <main className="text-center py-16 px-4">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Excel Analyzing Platform
        </h2>
        <h3 className="text-2xl font-bold text-purple-600 mt-2">
          Into Powerful
        </h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Upload Excel files, create stunning 3D visualizations, get AI-powered
          insights, and export in multiple formats.
        </p>
        <button
          onClick={() => navigate('/upload')}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
        >
          <FaRocket className="text-white" />
          Start Now
        </button>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <Card
            title="Upload File"
            text="Upload your Excel files in .xls or .xlsx format. Our system processes them securely, preparing for deep analysis and visualization."
            onClick={() => navigate('/upload')}
          />
          <Card
            title="Recent Log"
            text="View your entire activity history: uploaded files, processing times, errors, and more. Helps track changes and file management efficiently."
            onClick={() => navigate('/activity-log')}
          />
          <Card
            title="Charts"
            text="Transform raw Excel data into rich interactive charts and graphs. Use filters, zoom, and insights to explore your data like a pro."
            onClick={() => navigate('/charts')}
          />
          <Card
            title="Parse the Excel"
            text="Process and analyze the uploaded Excel data. Extract insights, clean formats, and prepare for visual representation."
            onClick={() => navigate('/parse')}
          />
        </div>
      </main>

      <footer className="bg-white shadow-sm text-center py-6 text-sm text-gray-500">
        <p className="text-gray-600">© 2025 Excel Analyzing Platform. All rights reserved.</p>
        <div className="mt-2 space-x-6 text-blue-600 font-medium">
          <button onClick={() => navigate('/about')} className="hover:underline">About</button>
          <button onClick={() => navigate('/contact')} className="hover:underline">Contact Us</button>
          <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy Policy</button>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ title, text, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl border border-gray-300 shadow hover:shadow-lg transition-all text-left min-h-[220px] flex flex-col justify-between cursor-pointer hover:border-purple-400"
  >
    <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
    <p className="text-gray-600 mt-2 text-sm">{text}</p>
  </div>
);

export default Dashboard;
