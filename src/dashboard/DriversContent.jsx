// src/components/DriversContent.jsx
import React, { useState } from 'react';
import { TbFilter } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Import the modal
import AddDriverModal from './AddDriverModal'; // Assuming it's in the same directory or adjust path

// Helper component for the "Today" tag
const TodayTag = () => (
    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        Today
    </span>
);

// Updated sample data for the drivers table to match the image
const driversTableData = [
    { id: 'd1', no: '01', carNo: '6465', driverName: 'Alex Noman', driverImg: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'online', statusColor: 'bg-green-500', gender: 'Male', type: 'Interstate', location: 'Lagos', earning: '$ 35.44' },
    { id: 'd2', no: '02', carNo: '5665', driverName: 'Razib Rahman', driverImg: 'https://randomuser.me/api/portraits/men/33.jpg', status: 'offline', statusColor: 'bg-neutral-800', gender: 'Male', type: 'Intrastate', location: 'Abuja', earning: '$ 0.00' },
    { id: 'd3', no: '03', carNo: '1755', driverName: 'Luke Norton', driverImg: 'https://randomuser.me/api/portraits/men/34.jpg', status: 'In route', statusColor: 'bg-red-500', gender: 'Female', type: 'Interstate', location: 'Lagos', earning: '$ 23.50' },
    { id: 'd4', no: '01', carNo: '6465', driverName: 'Alex Noman', driverImg: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'online', statusColor: 'bg-green-500', gender: 'Male', type: 'Interstate', location: 'Lagos', earning: '$ 35.44' },
    { id: 'd5', no: '02', carNo: '5665', driverName: 'Razib Rahman', driverImg: 'https://randomuser.me/api/portraits/men/33.jpg', status: 'offline', statusColor: 'bg-neutral-800', gender: 'Male', type: 'Intrastate', location: 'Abuja', earning: '$ 0.00' },
    { id: 'd6', no: '03', carNo: '1755', driverName: 'Luke Norton', driverImg: 'https://randomuser.me/api/portraits/men/34.jpg', status: 'In route', statusColor: 'bg-red-500', gender: 'Female', type: 'Interstate', location: 'Lagos', earning: '$ 23.50' },
    { id: 'd7', no: '01', carNo: '6465', driverName: 'Alex Noman', driverImg: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'online', statusColor: 'bg-green-500', gender: 'Male', type: 'Interstate', location: 'Lagos', earning: '$ 35.44' },
    { id: 'd8', no: '02', carNo: '5665', driverName: 'Razib Rahman', driverImg: 'https://randomuser.me/api/portraits/men/33.jpg', status: 'offline', statusColor: 'bg-neutral-800', gender: 'Male', type: 'Intrastate', location: 'Abuja', earning: '$ 0.00' },
    { id: 'd9', no: '03', carNo: '1755', driverName: 'Luke Norton', driverImg: 'https://randomuser.me/api/portraits/men/34.jpg', status: 'In route', statusColor: 'bg-red-500', gender: 'Female', type: 'Interstate', location: 'Lagos', earning: '$ 23.50' },
];


const DriversContent = () => {
    const [activeTab, setActiveTab] = useState('All drivers'); // Default active tab
    const [isModalOpen, setIsModalOpen] = useState(false);

    const entityTypeForModal = "Driver"; // Set to "Driver" to match the image's table context
    const tabs = [`All ${entityTypeForModal.toLowerCase()}s`, 'Pending'];

    return (
        <div className="text-gray-800 relative">
            {/* Statistics section - kept as is from your previous code, but title updated to Drivers */}
            <div className='bg-[#F8F7F1] p-8'>
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold">Drivers Statistics</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Tue, 14 Nov, 2022, 11.30 AM</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2 pb-3 border-b border-[#A3A3A333]">
                            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total {entityTypeForModal.toLowerCase()}s</h3>
                            <TodayTag />
                        </div>
                        <div>
                            <p className="text-3xl sm:text-[28px] font-bold">4,000</p> {/* Updated number from image */}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3 pb-3 border-b border-[#A3A3A333]">
                            <h3 className="text-base sm:text-lg font-medium text-gray-700">Active {entityTypeForModal.toLowerCase()}s</h3>
                            <TodayTag />
                        </div>
                        <div>
                            <p className="text-3xl sm:text-[28px] font-bold">1,300</p> {/* Updated number from image */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full sm:w-[26%]"> {/* Adjusted width */}
                        <TbFilter size={20} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder={`Filter ${entityTypeForModal.toLowerCase()}s by name, ID, status`}
                            className="text-sm placeholder-gray-400 outline-none flex-grow bg-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold px-[24px] py-[8px] rounded-[48px] flex items-center justify-center w-full sm:w-auto transition-colors cursor-pointer" // Rounded-md to match image
                    >
                        <IoMdAdd size={20} className="mr-1.5" />
                        Add {entityTypeForModal}
                    </button>
                </div>

                <div className="mb-4 border-b border-gray-200">
                    <nav className="flex space-x-6 -mb-px" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap pb-3 px-1 border-b-2 text-sm font-medium
                                    ${activeTab === tab
                                        ? 'border-neutral-800 text-neutral-900' // Darker underline for active tab as per image
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm text-left text-gray-600">
                        {/* UPDATED THEAD TO MATCH IMAGE */}
                        <thead className="text-xs text-gray-500 uppercase bg-transparent"> {/* Removed bg-gray-50 to match image */}
                            <tr>
                                <th scope="col" className="px-4 py-3 font-medium">No.</th>
                                <th scope="col" className="px-4 py-3 font-medium">Car no.</th>
                                <th scope="col" className="px-4 py-3 font-medium">Driver Name</th>
                                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                                <th scope="col" className="px-4 py-3 font-medium">Gender</th>
                                <th scope="col" className="px-4 py-3 font-medium">Type</th>
                                <th scope="col" className="px-4 py-3 font-medium">Location</th>
                                <th scope="col" className="px-4 py-3 font-medium">Earning</th>
                                <th scope="col" className="px-4 py-3 font-medium text-center">...</th> {/* Action header */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* UPDATED TBODY MAPPING TO MATCH IMAGE DATA STRUCTURE */}
                            {driversTableData.map((driver) => (
                                <tr key={driver.id} className="bg-white border-b border-gray-100 hover:bg-gray-50"> {/* Lighter border */}
                                    <td className="px-4 py-3 text-gray-700">{driver.no}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                                            {driver.carNo}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <img className="w-6 h-6 rounded-full mr-2 object-cover" src={driver.driverImg} alt={driver.driverName} /> {/* Slightly smaller image */}
                                            <span className="font-medium text-gray-800">{driver.driverName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-2 ${driver.statusColor}`}></span> {/* Smaller dot */}
                                            <span className="text-gray-700">{driver.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">{driver.gender}</td>
                                    <td className="px-4 py-3 text-gray-700">{driver.type}</td>
                                    <td className="px-4 py-3 text-gray-700">{driver.location}</td>
                                    <td className="px-4 py-3 text-gray-700">{driver.earning}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <BsThreeDotsVertical size={16} /> {/* Slightly smaller icon */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddDriverModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                entityType={entityTypeForModal} 
            />
        </div>
    );
};

export default DriversContent;