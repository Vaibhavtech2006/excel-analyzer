import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaClipboardList } from 'react-icons/fa';

const ActivityLog = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { activity: '3D Chart Generated', time: '2025-06-17 14:28', status: 'Success' },
    { activity: 'AI Summary Extracted', time: '2025-06-17 14:30', status: 'Success' },
    { activity: 'Export to PDF', time: '2025-06-17 14:31', status: 'Failed' },
  ];

  // 🔍 Filter logs based on search term
  const filteredLogs = logs.filter((log) =>
    log.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-xl font-bold text-blue-600">
            Excel Analyzing Platform
          </h1>
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</button>
          <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-semibold shadow">Profile</button>
        </div>
      </header>

      {/* Activity Log Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaClipboardList className="text-orange-500" />
              Activity Log
            </h2>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activity..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">Activity</th>
                  <th className="px-4 py-2 border-b">Timestamp</th>
                  <th className="px-4 py-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{log.activity}</td>
                      <td className="px-4 py-2">{log.time}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No activities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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

export default ActivityLog;
