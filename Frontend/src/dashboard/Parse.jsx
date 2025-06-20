import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select a file first.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
  };

  const handleClear = () => {
    setFile(null);
    setError('');
    setData([]);
    document.getElementById('excelFile').value = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-100 flex flex-col">
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
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-semibold shadow"
          >
            Profile
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Upload Excel File
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Select an Excel file (.xlsx or .xls) to upload and view its contents.
          </p>

          <input
            type="file"
            id="excelFile"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
          />

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow"
            >
              Upload to DB
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 shadow"
            >
              Clear
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-4 text-center">
              {error}
            </p>
          )}

          {data.length > 0 && (
            <div className="mt-8 overflow-x-auto max-h-96">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(data[0]).map((key) => (
                      <th key={key} className="border px-3 py-2 text-left font-semibold">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      {Object.values(row).map((cell, i) => (
                        <td key={i} className="border px-3 py-2">
                          {cell?.toString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default Upload;
