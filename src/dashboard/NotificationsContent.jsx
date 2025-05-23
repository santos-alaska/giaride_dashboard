// src/components/NotificationsContent.jsx
import React, { useState } from 'react';
import { TbFilter } from 'react-icons/tb'; // Assuming this is available or imported
import { IoMdAdd } from 'react-icons/io'; // For New notification button
import { BsThreeDotsVertical } from 'react-icons/bs'; // For table action menu

// Sample data for the notifications table
const notificationsTableData = Array.from({ length: 10 }, (_, i) => ({
  id: `n${i + 1}`,
  no: `${String(i + 1).padStart(2, '0')}`,
  title: 'New account created',
  preview: 'Dear User...',
  targetAudience: 'All users',
  status: 'Sent',
  date: '12-05-2024',
}));


const NotificationsContent = () => {
  const [activeTab, setActiveTab] = useState('All Notifications'); // State for active tab

  const tabs = ['All Notifications', 'Account activation', 'Ride assignment', 'Document verification'];

  return (
    <div className="text-gray-800">
      {/* Notifications Table Section START */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {/* Top Bar: Filter and New Notification Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-[30%]">
            <TbFilter size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Filter by type, recipient, or status"
              className="text-sm placeholder-gray-400 outline-none flex-grow bg-transparent"
            />
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold px-4 py-2.5 rounded-[48px] flex items-center justify-center w-full sm:w-auto transition-colors">
            <IoMdAdd size={20} className="mr-1.5" />
            New notification
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-6 -mb-px overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 text-sm font-medium
                  ${
                    activeTab === tab
                      ? 'border-yellow-500 text-yellow-600'
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
          <table className="w-full min-w-[900px] text-sm text-left text-gray-600"> {/* Adjusted min-w based on columns */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">No.</th>
                <th scope="col" className="px-4 py-3">Title</th>
                <th scope="col" className="px-4 py-3">Preview</th>
                <th scope="col" className="px-4 py-3">Target/Audience</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {notificationsTableData.map((notification) => (
                <tr key={notification.id} className="bg-white border-b border-[#A3A3A340] hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{notification.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{notification.title}</td>
                  <td className="px-4 py-3">{notification.preview}</td>
                  <td className="px-4 py-3">{notification.targetAudience}</td>
                  <td className="px-4 py-3">{notification.status}</td>
                  <td className="px-4 py-3">{notification.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-gray-500 hover:text-gray-700">
                      <BsThreeDotsVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Notifications Table Section END */}
    </div>
  );
};

export default NotificationsContent;