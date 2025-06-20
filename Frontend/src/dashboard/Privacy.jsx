import React from 'react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
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
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-700 text-base mb-4">
            At Excel Analyzing Platform, we are committed to protecting your personal data and ensuring transparency in how we collect, use, and safeguard information.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Data Collection</h2>
          <p className="text-gray-700 mb-4">
            We collect minimal personal information including your name, email address, and uploaded Excel files. This data is only used to deliver platform functionality such as file analysis, activity tracking, and personalized dashboard services.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. File Privacy</h2>
          <p className="text-gray-700 mb-4">
            All Excel files uploaded to the platform are processed securely and stored in encrypted formats. Only the file owner can access their files and delete them at any time. Files are not shared or used for any third-party purposes.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Usage Data</h2>
          <p className="text-gray-700 mb-4">
            We may collect anonymous usage data to improve platform performance and user experience. This includes logs of uploads, page visits, and non-personal analytics.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Legal Compliance</h2>
          <p className="text-gray-700 mb-4">
            We adhere to applicable data protection regulations including the General Data Protection Regulation (GDPR) and Indian IT Act. Your rights include access, correction, deletion, and portability of your personal data.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions or concerns regarding this Privacy Policy, please contact our team at <span className="text-blue-700 font-medium">support@excelanalyzer.com</span>.
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

export default Privacy;
