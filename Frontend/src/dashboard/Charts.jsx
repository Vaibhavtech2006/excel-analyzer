import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [dbFiles, setDbFiles] = useState([]);
  const [selectedDbFile, setSelectedDbFile] = useState('');
  const [excelFile, setExcelFile] = useState(null);

  const defaultData = {
    labels: ['Sales', 'Marketing', 'HR', 'Finance', 'IT'],
    datasets: [
      {
        label: 'Department Performance',
        data: [120, 90, 70, 100, 80],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Company Performance Overview' }
    }
  };

  const downloadPNG = async () => {
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape');
    pdf.addImage(imgData, 'PNG', 10, 10, 270, 130);
    pdf.save('chart.pdf');
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  const handleExcelFileShow = () => {
    if (!excelFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const labels = jsonData.map((row) => row.Label);
      const values = jsonData.map((row) => row.Value);
      const dynamicData = {
        labels,
        datasets: [
          {
            label: 'Excel Data',
            data: values,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderRadius: 6
          }
        ]
      };
      setChartData(dynamicData);
    };
    reader.readAsArrayBuffer(excelFile);
  };

  const fetchDbFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/files');
      setDbFiles(res.data);
    } catch (err) {
      console.error('Failed to fetch files from DB', err);
    }
  };

  const loadDbFile = async () => {
    if (!selectedDbFile) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/files/${selectedDbFile}`);
      const jsonData = res.data;
      const labels = jsonData.map((row) => row.Label);
      const values = jsonData.map((row) => row.Value);
      const dynamicData = {
        labels,
        datasets: [
          {
            label: 'Excel Data from DB',
            data: values,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderRadius: 6
          }
        ]
      };
      setChartData(dynamicData);
    } catch (err) {
      console.error('Error loading file from DB', err);
    }
  };

  useEffect(() => {
    fetchDbFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-100 flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="flex items-center gap-2">
          <img src="https://img.icons8.com/color/48/microsoft-excel-2019.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-blue-600">Excel Analyzing Platform</h1>
        </div>
        <div className="space-x-4">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</button>
          <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-semibold shadow">Profile</button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Interactive Chart</h2>

        <input type="file" accept=".xlsx,.xls" onChange={handleExcelFileChange} className="mb-2" />
        <button onClick={handleExcelFileShow} className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow">Show Chart for Uploaded File</button>

        <select
          className="mb-2 px-4 py-2 border rounded-md"
          value={selectedDbFile}
          onChange={(e) => setSelectedDbFile(e.target.value)}
        >
          <option value="">Select File from Database</option>
          {dbFiles.map((file) => (
            <option key={file._id} value={file._id}>{file.name}</option>
          ))}
        </select>

        <button
          onClick={loadDbFile}
          className="mb-6 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow"
        >
          Load Chart from DB File
        </button>

        <div ref={chartRef} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <Bar data={chartData || defaultData} options={options} />
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={downloadPNG} className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow">Download PNG</button>
          <button onClick={downloadPDF} className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 shadow">Download PDF</button>
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

export default Charts;
