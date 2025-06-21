import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const Charts = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [dbFiles, setDbFiles] = useState([]);
  const [selectedDbFile, setSelectedDbFile] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [labelColumn, setLabelColumn] = useState('');
  const [valueColumn, setValueColumn] = useState('');
  const [parsedData, setParsedData] = useState([]);

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

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      if (json.length > 0) {
        const keys = Object.keys(json[0]);
        setHeaders(keys);
        setParsedData(json);
        setLabelColumn(keys[0]);
        setValueColumn(keys[1]);

        // Upload to MongoDB
        const formData = new FormData();
        formData.append('file', file);
        try {
          await axios.post('http://localhost:8080/api/upload', formData);
        } catch (err) {
          console.error('Upload failed:', err);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const renderSelectedChart = () => {
    if (!labelColumn || !valueColumn || parsedData.length === 0) return;

    const labels = parsedData.map((row) => row[labelColumn]);
    const values = parsedData.map((row) => Number(row[valueColumn]) || 0);

    const dynamicData = {
      labels,
      datasets: [
        {
          label: `${valueColumn} vs ${labelColumn}`,
          data: values,
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderRadius: 6
        }
      ]
    };

    setChartData(dynamicData);
  };

  useEffect(() => {
    renderSelectedChart();
  }, [labelColumn, valueColumn]);

  const renderChart = () => {
    switch (chartType) {
      case 'line': return <Line data={chartData || defaultData} options={options} />;
      case 'pie': return <Pie data={chartData || defaultData} options={options} />;
      case 'doughnut': return <Doughnut data={chartData || defaultData} options={options} />;
      case 'radar': return <Radar data={chartData || defaultData} options={options} />;
      default: return <Bar data={chartData || defaultData} options={options} />;
    }
  };

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

        <input type="file" accept=".xlsx,.xls" onChange={handleExcelFileChange} className="mb-4" />

        <div className="flex gap-4 mb-4">
          <label className="text-sm font-semibold">Chart Type:</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="border px-3 py-1 rounded">
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
            <option value="radar">Radar</option>
          </select>
        </div>

        {headers.length > 0 && (
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Select Label Column</label>
              <select value={labelColumn} onChange={(e) => setLabelColumn(e.target.value)} className="border px-3 py-1 rounded">
                {headers.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Select Value Column</label>
              <select value={valueColumn} onChange={(e) => setValueColumn(e.target.value)} className="border px-3 py-1 rounded">
                {headers.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        )}

        <div ref={chartRef} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          {renderChart()}
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
