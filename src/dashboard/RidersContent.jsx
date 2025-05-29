// src/components/RidersContent.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef
import { TbFilter } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';
import { BsThreeDotsVertical, BsCheckCircleFill } from 'react-icons/bs'; // Added for stepper in modal
import { FiChevronDown, FiMail, FiPhone, FiUser, FiTruck, FiClock, FiFileText, FiRepeat, FiMapPin, FiChevronUp } from 'react-icons/fi'; // Icons for modal
import { FaCarSide, FaShippingFast, FaBusAlt } from 'react-icons/fa'; // Icons for modal service types

// Import the modal (assuming it's in the same directory or adjust path)
import AddDriverModal from './AddDriverModal'; 

// Helper component for the "Today" tag
const TodayTag = () => (
    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        Today
    </span>
);

// Sample data for the Riders table (adjust fields for riders)
const ridersTableData = [
    // This data should represent RIDERS, not drivers.
    // The AddDriverModal is designed for drivers. If this page is for RIDERS,
    // the modal and data should reflect rider-specific information.
    // For now, I'll use the driver-like data for consistency with the modal,
    // but in a real app, this would be rider data.
    { id: 'r1', no: '01', riderId: 'RDR-6465', name: 'Alex Noman', img: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'active', statusColor: 'bg-green-500', gender: 'Male', joinDate: '10-03-2023', totalRides: '150', location: 'Lagos' },
    { id: 'r2', no: '02', riderId: 'RDR-5665', name: 'Bella Hadid', img: 'https://randomuser.me/api/portraits/women/33.jpg', status: 'inactive', statusColor: 'bg-gray-400', gender: 'Female', joinDate: '11-04-2023', totalRides: '80', location: 'Abuja' },
    // ... more rider data
];


const RidersContent = () => {
    const [activeTab, setActiveTab] = useState('All riders');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ridersData, setRidersData] = useState(ridersTableData); // Manage table data with state

    // IMPORTANT: The AddDriverModal is designed for adding DRIVERS.
    // If this page is for RIDERS, you would typically have an AddRiderModal
    // with fields relevant to riders. For this example, we'll use AddDriverModal
    // and pass "Rider" as entityType, but the internal fields of the modal
    // are driver-centric from its previous design.
    const entityTypeForModal = "Rider"; 
    const tabs = [`All ${entityTypeForModal.toLowerCase()}s`, 'Pending'];

    const handleAddRiderSubmit = (formDataFromModal) => {
        console.log(`New ${entityTypeForModal} Submitted:`, formDataFromModal);
        // Create a new rider entry based on the form data
        // Note: formDataFromModal will have driver-specific fields from AddDriverModal
        const newRider = {
            id: `r${ridersData.length + 1}`,
            no: `${String(ridersData.length + 1).padStart(2, '0')}`,
            riderId: `RDR-NEW${Date.now().toString().slice(-4)}`,
            name: `${formDataFromModal.firstName} ${formDataFromModal.lastName}`,
            img: 'https://via.placeholder.com/150/cccccc/808080?Text=User', // Placeholder
            status: 'pending', // New riders might be pending
            statusColor: 'bg-yellow-500',
            gender: formDataFromModal.gender.charAt(0).toUpperCase() + formDataFromModal.gender.slice(1),
            joinDate: new Date().toLocaleDateString('en-GB', {day:'2-digit', month:'2-digit', year:'numeric'}).replace(/\//g, '-'),
            totalRides: '0',
            location: formDataFromModal.address.split(',').pop().trim() || 'N/A', // Attempt to get city
        };
        setRidersData(prevRiders => [newRider, ...prevRiders]);
        setIsModalOpen(false); // Close the modal
        // Optionally show a success message/modal here
    };


    return (
        <div className="text-gray-800 relative">
            {/* Statistics Title & Cards */}
            <div className='bg-[#F8F7F1] p-8'>
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold">{entityTypeForModal}s Statistics</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Tue, 14 Nov, 2022, 11.30 AM</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2 pb-3 border-b border-[#A3A3A333]">
                            <h3 className="text-base sm:text-lg font-medium text-gray-700">Total {entityTypeForModal.toLowerCase()}s</h3>
                            <TodayTag />
                        </div>
                        <div>
                            <p className="text-3xl sm:text-[28px] font-bold">12,000</p> {/* Example data */}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3 pb-3 border-b border-[#A3A3A333]">
                            <h3 className="text-base sm:text-lg font-medium text-gray-700">Active {entityTypeForModal.toLowerCase()}s</h3>
                            <TodayTag />
                        </div>
                        <div>
                            <p className="text-3xl sm:text-[28px] font-bold">8,000</p> {/* Example data */}
                        </div>
                    </div>
                </div>
            </div>


            {/* Table Section */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto max-w-xs sm:max-w-sm">
                        <TbFilter size={20} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder={`Filter ${entityTypeForModal.toLowerCase()}s by name, ID, status`}
                            className="text-sm placeholder-gray-400 outline-none flex-grow bg-transparent"
                        />
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold px-[24px] py-[8px] rounded-full flex items-center justify-center w-full sm:w-auto transition-colors cursor-pointer"
                    >
                        <IoMdAdd size={20} className="mr-1.5" />
                        Add {entityTypeForModal}s
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
                                        ? 'border-yellow-500 text-yellow-600' // Or your preferred active tab style
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
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            {/* Adjust table headers for Riders */}
                            <tr>
                                <th scope="col" className="px-4 py-3">No.</th>
                                <th scope="col" className="px-4 py-3">Rider ID</th>
                                <th scope="col" className="px-4 py-3">{entityTypeForModal} Name</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                                <th scope="col" className="px-4 py-3">Gender</th>
                                <th scope="col" className="px-4 py-3">Join Date</th>
                                <th scope="col" className="px-4 py-3">Location</th>
                                <th scope="col" className="px-4 py-3">Total Rides</th>
                                <th scope="col" className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ridersData.map((item) => (
                                <tr key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-900">{item.no}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                            {item.riderId}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <img className="w-7 h-7 rounded-full mr-2.5 object-cover" src={item.img} alt={item.name} />
                                            <span className="font-medium text-gray-900">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${item.statusColor}`}></span>
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{item.gender}</td>
                                    <td className="px-4 py-3">{item.joinDate}</td>
                                    <td className="px-4 py-3">{item.location}</td>
                                    <td className="px-4 py-3">{item.totalRides}</td>
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

            {/* AddDriverModal is used here, passing "Rider" as entityType */}
            <AddDriverModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmitBooking={handleAddRiderSubmit} // Changed prop name for clarity if modal submits booking-like data
                entityType={entityTypeForModal} 
            />
        </div>
    );
};

export default RidersContent;