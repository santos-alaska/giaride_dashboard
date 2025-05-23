// src/components/BookingsContent.jsx
import React, { useState } from 'react'; // Added useState
import { TbFilter } from 'react-icons/tb'; // Assuming this is available or imported
import { IoMdAdd } from 'react-icons/io'; // For Add New Booking button
import { BsThreeDotsVertical } from 'react-icons/bs'; // For table action menu

// Helper component for the "Today" tag
const TodayTag = () => (
  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
    Today
  </span>
);

const bookingStatsData = [
  { title: 'Air Travel', count: 30 },
  { title: 'Bus Travel', count: 40 },
  { title: 'Train Travel', count: 10 },
  { title: 'Water Travel', count: 5 },
];

// Sample data for the bookings table
const bookingsTableData = [
  { id: 'b1', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b2', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Bus Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b3', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Train Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b4', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Water Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b5', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b6', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b7', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b8', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b9', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
  { id: 'b10', no: '01', customerName: 'Alex Noman', customerImg: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'Male', travelType: 'Air Travel', departure: 'Lagos', arrival: 'Abuja', date: '12-05-2024', fare: '$ 35.44' },
];


const BookingsContent = () => {
  const [activeTab, setActiveTab] = useState('All bookings'); // State for active tab

  const tabs = ['All bookings', 'Pending bookings'];

  return (
    <div className="text-gray-800">
      {/* Bookings Title & Stats Cards */}
      <div className="bg-[#F8F7F1] p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold">Bookings</h2>
          <p className="text-xs sm:text-sm text-gray-500">Tue, 14 Nov, 2022, 11.30 AM</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {bookingStatsData.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-start border-b border-[#A3A3A333] mb-2 pb-3  ">
                <h3 className="text-base sm:text-lg font-medium text-gray-700">{stat.title}</h3>
                <TodayTag />
              </div>
              <div>
                <p className="text-[28px] font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Table Section START */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        {/* Top Bar: Filter and Add Booking Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-[30%]">
            <TbFilter size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Filter by travel type, Gender, State"
              className="text-sm placeholder-gray-400 outline-none flex-grow bg-transparent"
            />
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold px-4 py-2.5 rounded-[48px] flex items-center justify-center w-full sm:w-auto transition-colors">
            <IoMdAdd size={20} className="mr-1.5" />
            Add New Booking
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-6 -mb-px" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 text-sm font-medium
                  ${activeTab === tab
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
          <table className="w-full min-w-[1024px] text-sm text-left text-gray-600"> {/* Adjusted min-w for more columns */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">No.</th>
                <th scope="col" className="px-4 py-3">Customer name</th>
                <th scope="col" className="px-4 py-3">Gender</th>
                <th scope="col" className="px-4 py-3">Travel type</th>
                <th scope="col" className="px-4 py-3">Departure</th>
                <th scope="col" className="px-4 py-3">Arrival</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Fare</th>
                <th scope="col" className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingsTableData.map((booking) => (
                <tr key={booking.id} className="bg-white border-b border-[#A3A3A340] hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{booking.no}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img className="w-7 h-7 rounded-full mr-2.5 object-cover" src={booking.customerImg} alt={booking.customerName} />
                      <span className="font-medium text-gray-900">{booking.customerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{booking.gender}</td>
                  <td className="px-4 py-3">{booking.travelType}</td>
                  <td className="px-4 py-3">{booking.departure}</td>
                  <td className="px-4 py-3">{booking.arrival}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">{booking.fare}</td>
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
      {/* Bookings Table Section END */}
    </div>
  );
};

export default BookingsContent;