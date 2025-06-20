import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
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
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Contact Us</h1>
          <p className="text-center text-gray-700 mb-6 text-lg">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello — feel free to reach out.
          </p>
          <div className="text-center text-gray-600 mb-8 space-y-2">
            <p><strong>Email:</strong> support@excelanalyzer.com</p>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <p><strong>Office Hours:</strong> Mon - Fri, 9:00 AM to 6:00 PM</p>
          </div>
          <form className="space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
            >
              Send Message
            </button>
          </form>
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

export default Contact;
