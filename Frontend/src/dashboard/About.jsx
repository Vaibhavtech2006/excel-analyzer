import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-100">
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
        <div className="space-x-4">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</button>
          <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-semibold shadow">Profile</button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">About Us</h1>
          
          <p className="text-gray-700 text-lg mb-4">
            Excel Analyzing Platform is a modern web-based solution designed to simplify the process of extracting, visualizing, and understanding complex Excel data. We serve individuals, teams, and businesses who rely on data-driven decision making.
          </p>

          <p className="text-gray-700 text-base mb-4">
            Our mission is to provide a seamless and intelligent platform that turns spreadsheets into actionable insights. From data upload to interactive 2D/3D visualizations and exportable reports, every feature is built with performance and usability in mind.
          </p>

          <p className="text-gray-700 text-base mb-4">
            Whether you're a student analyzing project data, a business analyst preparing reports, or a manager tracking team activity — our platform is built to meet your needs with security, speed, and simplicity.
          </p>

          <p className="text-gray-700 text-base">
            Excel Analyzing Platform is proudly built using the MERN Stack (MongoDB, Express.js, React, Node.js), ensuring scalability and responsiveness across devices.
          </p>
        </div>
      </main>

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

export default About;
