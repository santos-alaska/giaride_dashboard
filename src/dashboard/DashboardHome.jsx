// src/components/AdminDashboard.jsx
import React, { useState } from 'react';

// Importing necessary icons from react-icons
import {
  BsLightningChargeFill,
  BsCalendarCheck,
} from 'react-icons/bs';
import {
  RiLayoutGridFill,
  RiArrowLeftRightFill,
} from 'react-icons/ri';
import {
  FaUserTie,
  FaUsers,
} from 'react-icons/fa';
import {
  IoMdNotificationsOutline,
  IoMdSettings,
} from 'react-icons/io';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiSupport } from 'react-icons/bi';
import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi'; // Added FiArrowUp, FiArrowDown
import DashboardContent from './DashboardContent'; // Importing the DashboardContent component
import DriversContent from './DriversContent'; // Importing the DriversContent component
import RidersContent from './RidersContent';
import BookingsContent from './BookingsContent';
import NotificationsContent from './NotificationsContent'; // Importing the Notification component
import SettingsContent from './SettingsContent'; // Importing the SettingsContent component
import TransactionsContent from './TransactionsContent';
import CarReportContent from './CarReportContent';
import SupportContent from './SupportContent';



// --- Main AdminDashboard Component ---
const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default active item

  // Data for main navigation items
  const mainNavItemsData = [
    { id: 'dashboard', text: 'Dashboard', icon: <RiLayoutGridFill size={18} /> },
    { id: 'drivers', text: 'Drivers', icon: <FaUserTie size={18} /> },
    { id: 'riders', text: 'Riders', icon: <FaUsers size={18} /> },
    { id: 'bookings', text: 'Bookings', icon: <BsCalendarCheck size={18} /> },
    { id: 'notifications', text: 'Notifications', icon: <IoMdNotificationsOutline size={18} /> },
    { id: 'settings', text: 'Settings', icon: <IoMdSettings size={18} /> },
  ];

  // Data for report and support navigation items
  const reportNavItemsData = [
    { id: 'transactions', text: 'Transactions', icon: <RiArrowLeftRightFill size={18} /> },
    { id: 'car_report', text: 'Car Report', icon: <HiOutlineDocumentReport size={18} /> },
    { id: 'support', text: 'Support', icon: <BiSupport size={18} /> },
  ];

  // Reusable NavItem component
  const NavItem = ({ item, isActive, onClick }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(item.text);
      }}
      className={`flex items-center space-x-3 px-4 py-2.5 my-1 rounded-lg transition-colors duration-150 text-sm
        ${
          isActive
            ? 'bg-yellow-400 text-neutral-900 font-semibold'
            : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
        }
      `}
    >
      {item.icon}
      <span>{item.text}</span>
    </a>
  );

  return (
    <div className="flex h-screen bg-neutral-100 font-sans"> {/* Main layout container, added font-sans */}
      {/* --- Sidebar Start --- */}
      <div className="w-64 bg-neutral-900 flex flex-col h-screen flex-shrink-0"> {/* Added flex-shrink-0 */}
        {/* Logo Area */}
        <div className="p-5 flex items-center space-x-2.5 border-b border-neutral-800 flex-shrink-0">
          <BsLightningChargeFill className="text-yellow-400" size={28} />
          <span className="text-xl font-bold text-white">giaride</span>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto pt-4">
          {/* Main Navigation */}
          <nav className="px-4">
            {mainNavItemsData.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.text}
                onClick={setActiveItem}
              />
            ))}
          </nav>

          {/* Report & Support Section */}
          <div className="mt-6">
            <hr className="border-neutral-700 mx-4" />
            <div className="mt-5 mb-2 px-4">
              <h3 className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                Report & Support
              </h3>
            </div>
            <nav className="pb-4 px-4">
              {reportNavItemsData.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.text}
                  onClick={setActiveItem}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* --- Sidebar End --- */}
      
      {/* --- Content Area Start --- */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white flex flex-col overflow-y-auto">
        {/* Header for Content Area */}
        <div className="flex justify-end items-center mb-4 sm:mb-6 flex-shrink-0">
          {/* Notification Bell */}
          <div className="relative mr-3 sm:mr-4 md:mr-6 cursor-pointer">
            <IoMdNotificationsOutline className="text-gray-500 hover:text-gray-700" size={24} sm:size={26} />
            {/* Red notification dot */}
            <span className="absolute top-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border border-white sm:border-2 sm:border-neutral-100"></span>
          </div>

          {/* Search Input */}
          <div className="flex items-center bg-white rounded-lg shadow-md px-2.5 sm:px-3 py-1.5 sm:py-2 w-48 sm:w-56 md:w-72">
            <input
              type="text"
              placeholder="Search here"
              className="text-xs sm:text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none flex-grow"
            />
            <FiSearch className="text-gray-400 ml-2" size={18} sm:size={20} />
          </div>
        </div>

        {/* Main Content Display */}
        <div className="flex-grow">
          {/* Conditionally render content based on activeItem */}
          {activeItem === 'Dashboard' && <DashboardContent />}
          {activeItem === 'Drivers' && <DriversContent />}
          {activeItem === 'Riders' && <RidersContent />}
          {activeItem === 'Bookings' && <BookingsContent />}
          {activeItem === 'Notifications' && <NotificationsContent />}
          {activeItem === 'Settings' && <SettingsContent />}
          {activeItem === 'Transactions' && <TransactionsContent />}
          {activeItem === 'Car Report' && <CarReportContent />}
          {activeItem === 'Support' && <SupportContent />}
          
          {/* Placeholder for other sections */}
          {/* {activeItem !== 'Dashboard' || activeItem !== "Drivers" || activeItem !== "Riders" || activeItem !== "Bookings"  && (
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4">
                {activeItem}
              </h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-sm sm:text-base">Content for {activeItem} will appear here.</p>
              </div>
            </div>
          )} */}
        </div>
      </div>
      {/* --- Content Area End --- */}
    </div>
  );
};

export default AdminDashboard;