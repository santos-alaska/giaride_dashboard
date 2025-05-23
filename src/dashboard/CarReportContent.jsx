// src/components/CarReportContent.jsx
import React, { useState, useRef, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import {
  BsThreeDotsVertical,
  BsEye,
  BsTools,
  BsCheckCircle,
  BsTrash,
} from 'react-icons/bs';
import { FiCommand } from 'react-icons/fi';

// Helper component for the "Today" tag on stats cards
const TodayTag = () => (
  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
    Today
  </span>
);

// Sample data for the reports table
const carReportsTableData = Array.from({ length: 8 }, (_, i) => ({
  id: `cr${i + 1}`,
  no: '01',
  user: 'Alex Noman',
  userImg: 'https://randomuser.me/api/portraits/men/32.jpg',
  carDetails: 'Toyota Corolla 06',
  carReg: '646567fg',
  issueType: 'Oil leak',
  reportedDate: '12-01-2025,',
  reportedTime: '10:00am',
  status: i < 3 ? 'Reported' : 'Resolved',
  statusColor: i < 3 ? 'bg-red-500' : 'bg-green-500',
}));

// Action Dropdown Component
const ActionDropdown = ({ reportId, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (action) => {
    onAction(reportId, action);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
      >
        <BsThreeDotsVertical size={18} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 py-1">
          <button
            onClick={() => handleItemClick('view')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <BsEye size={16} className="mr-3" /> View
          </button>
          <button
            onClick={() => handleItemClick('assign')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <BsTools size={16} className="mr-3" /> Assign Mechanic
          </button>
          <button
            onClick={() => handleItemClick('resolve')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <BsCheckCircle size={16} className="mr-3" /> Mark as Resolved
          </button>
          <div className="my-1 border-t border-gray-200"></div>
          <button
            onClick={() => handleItemClick('delete')}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-between"
          >
            <div className="flex items-center">
              <BsTrash size={16} className="mr-3" /> Delete
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <FiCommand size={12} className="mr-0.5" /> X
            </div>
          </button>
        </div>
      )}
    </div>
  );
};


const CarReportContent = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tableTabs = ['All', 'Pending', 'Resolved'];

  const handleTableAction = (reportId, action) => {
    console.log(`Action: ${action} on report ID: ${reportId}`);
  };

  return (
    <div className="text-gray-800">
      {/* Todays Statistics Title & Cards */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold">Today's Statistics</h2>
        <p className="text-xs sm:text-sm text-gray-500">Tue, 14 Nov, 2022, 11.30 AM</p>
      </div>
      {/* Grid for stats cards - using a 5-column conceptual grid for lg screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {/* Total reports received Card (Dark) */}
        <div className="sm:col-span-2 lg:col-span-2 bg-neutral-800 text-white p-5 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-medium">Total reports received</h3>
            <TodayTag />
          </div>
          <div>
            <p className="text-[28px] font-bold">1,000</p>
          </div>
        </div>
        {/* Pending Reports Card */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Pending Reports</h3>
          </div>
          <div>
            <p className="text-[28px] font-bold">200</p>
          </div>
        </div>
        {/* Resolved Reports Card */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-medium text-gray-700">Resolved Reports</h3>
          </div>
          <div>
            <p className="text-[28px] font-bold">1,300</p>
          </div>
        </div>
        {/* Most common issues Card */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between items-start">
          <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4">Most common issues</h3>
          <div>
            <p className="text-[28px] font-bold">Engine issues</p>
          </div>
        </div>
      </div>


      {/* Car Reports Table Section */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {/* Top Bar: Filter */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-[30%]">
            <TbFilter size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Filter drivers by name, ID, status"
              className="text-sm placeholder-gray-400 outline-none flex-grow bg-transparent"
            />
          </div>
        </div>

        {/* Tabs for Table */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-6 -mb-px" aria-label="Tabs">
            {tableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 text-sm font-medium
                  ${
                    activeTab === tab
                      ? 'border-gray-800 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1024px] text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">No.</th>
                <th scope="col" className="px-4 py-3">User</th>
                <th scope="col" className="px-4 py-3">Car Details</th>
                <th scope="col" className="px-4 py-3"></th> {/* Empty for Car Reg Badge */}
                <th scope="col" className="px-4 py-3">Issue Type</th>
                <th scope="col" className="px-4 py-3">Reported Date & Time</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {carReportsTableData.map((report) => (
                <tr key={report.id} className="bg-white border-b border-[#A3A3A340] hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{report.no}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img className="w-7 h-7 rounded-full mr-2.5 object-cover" src={report.userImg} alt={report.user} />
                      <span className="font-medium text-gray-900">{report.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{report.carDetails}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {report.carReg}
                    </span>
                  </td>
                  <td className="px-4 py-3">{report.issueType}</td>
                  <td className="px-4 py-3">
                    <div>{report.reportedDate}</div>
                    <div className="text-xs text-gray-500">{report.reportedTime}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${report.statusColor}`}></span>
                      {report.status}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ActionDropdown reportId={report.id} onAction={handleTableAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarReportContent;