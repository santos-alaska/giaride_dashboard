// src/components/SupportContent.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiPlus, FiPaperclip, FiSend, FiChevronDown } from 'react-icons/fi';
import { BsLightningChargeFill, BsThreeDotsVertical, BsCheckAll } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io'; // For modal close button

// Sample data for dispute list (remains the same)
const initialDisputes = [
  { id: 'd1', title: 'My renewal failed to process', time: '06:12pm', iconColor: 'bg-yellow-400' },
  { id: 'd2', title: 'My Driver didn’t arrive', time: '05:12pm', iconColor: 'bg-yellow-400' },
  { id: 'd3', title: 'I can’t register my car', time: '06:12pm', iconColor: 'bg-yellow-400' },
];

// Sample data for chat messages (remains the same)
const initialMessages = [
  { id: 'm1', sender: 'GiaRide Support', type: 'support_ticket', ticket: { title: 'Payment failed', category: 'Billing Issue', date: '12th Nov, 2024', description: "I couldn't continue to pay when I entered my card details and this has been frustrating for three days now i couldn't do anything", }, time: '11:07am', read: true, },
  { id: 'm2', sender: 'GiaRide Support', text: 'Hello, this issue #23443, has been resolved. Kindly visit your primary care provider closest to you', time: '11:27am', read: true, },
];


// --- New Dispute Modal Component ---
const NewDisputeModal = ({ isOpen, onClose, onSubmitDispute }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const modalContentRef = useRef(null);
  const MAX_DESC_LENGTH = 240;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Reset form on open
      setTitle('');
      setCategory('');
      setDescription('');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !description) {
        alert("Please fill in all fields.");
        return;
    }
    onSubmitDispute({ title, category, description });
    onClose();
  };
  
  // Sample categories for the dropdown
  const disputeCategories = [
    { value: 'billing', label: 'Billing Issue' },
    { value: 'driver_issue', label: 'Driver Issue' },
    { value: 'technical_problem', label: 'Technical Problem' },
    { value: 'account_issue', label: 'Account Issue' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div ref={modalContentRef} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">New dispute</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              id="disputeTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black peer"
              placeholder=" " // Required for floating label
              required
            />
            <label
              htmlFor="disputeTitle"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1.5"
            >
              Title
            </label>
          </div>

          {/* Category Select */}
          <div className="relative">
            <select
              id="disputeCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`block px-3.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black peer
                ${category ? 'text-gray-900' : 'text-gray-500'}
              `}
              required
            >
              <option value="" disabled hidden></option> {/* Empty option for placeholder behavior */}
              {disputeCategories.map(cat => (
                <option key={cat.value} value={cat.value} className="text-gray-900">{cat.label}</option>
              ))}
            </select>
            <label
              htmlFor="disputeCategory"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1.5"
            >
              Category
            </label>
            <FiChevronDown className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20}/>
          </div>
          
          {/* Description Textarea */}
          <div className="relative">
            <textarea
              id="disputeDescription"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC_LENGTH))}
              className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black peer resize-none"
              placeholder=" " // Required for floating label
              required
            ></textarea>
            <label
              htmlFor="disputeDescription"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3.5 scale-75 top-3.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 left-1.5"
            >
              Description
            </label>
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {description.length}/{MAX_DESC_LENGTH}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold text-base py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-3"
          >
            Submit dispute
          </button>
        </form>
      </div>
    </div>
  );
};
// --- End New Dispute Modal Component ---


const SupportContent = () => {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [selectedDispute, setSelectedDispute] = useState(initialDisputes[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isNewDisputeModalOpen, setIsNewDisputeModalOpen] = useState(false); // State for new modal
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (selectedDispute) {
      setMessages(initialMessages); 
    }
  }, [selectedDispute]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const newMsg = { id: `m${messages.length + 1}`, sender: 'User', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(), read: false, };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleNewDisputeSubmit = (disputeData) => {
    console.log("New Dispute Submitted:", disputeData);
    // Add the new dispute to the list (or send to backend)
    const newDisputeEntry = {
        id: `d${disputes.length + 1}`,
        title: disputeData.title,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
        iconColor: 'bg-yellow-400' // Or derive from category
    };
    setDisputes(prevDisputes => [newDisputeEntry, ...prevDisputes]);
    setSelectedDispute(newDisputeEntry); // Optionally select the new dispute
  };

  return (
    <div className="flex h-[calc(100vh-theme(space.24))] font-sans">
      {/* Left Sidebar: Disputes List */}
      <div className="w-full sm:w-2/5 md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
            <button 
              onClick={() => setIsNewDisputeModalOpen(true)} // Open modal
              className="bg-yellow-400 text-neutral-900 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center hover:bg-yellow-500 transition-colors"
            >
              <FiPlus size={16} className="mr-1" />
              New dispute
            </button>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16}/>
            <input
              type="text"
              placeholder="Search for dispute"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {disputes.map((dispute) => (
            <button
              key={dispute.id}
              onClick={() => setSelectedDispute(dispute)}
              className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100
                ${selectedDispute?.id === dispute.id ? 'bg-yellow-50' : ''}
              `}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white ${dispute.iconColor}`}>
                  <BsLightningChargeFill size={16} />
                </span>
                <span className={`text-sm font-medium ${selectedDispute?.id === dispute.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {dispute.title}
                </span>
              </div>
              <span className="text-xs text-gray-400">{dispute.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Chat Area (remains the same) */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {selectedDispute ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-yellow-400 text-white"> <BsLightningChargeFill size={16} /> </span>
                <div> <h3 className="text-md font-semibold text-gray-900">GiaRide Support</h3> </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 p-1"> <BsThreeDotsVertical size={20} /> </button>
            </div>
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'support_ticket' ? (
                     <div className="bg-yellow-50 p-3 rounded-lg max-w-md sm:max-w-lg border border-yellow-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">{msg.ticket.title}</h4>
                        <p className="text-xs text-gray-600 mb-0.5">Category: <span className="font-medium text-gray-700">{msg.ticket.category}</span></p>
                        <p className="text-xs text-gray-600 mb-1.5">Date: <span className="font-medium text-gray-700">{msg.ticket.date}</span></p>
                        <p className="text-xs text-gray-600 mb-1 font-medium">Description:</p>
                        <p className="text-xs text-gray-700 leading-relaxed">{msg.ticket.description}</p>
                        <div className="text-right text-[10px] text-gray-500 mt-1.5 flex items-center justify-end"> {msg.time} {msg.read && <BsCheckAll size={14} className="ml-1 text-blue-500" />} </div>
                    </div>
                  ) : (
                    <div className={`p-3 rounded-lg max-w-md sm:max-w-lg ${msg.sender === 'User' ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm rounded-bl-none' }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={`text-right text-[10px] mt-1.5 flex items-center justify-end ${msg.sender === 'User' ? 'text-gray-300' : 'text-gray-500'}`}> {msg.time} {msg.sender === 'User' && msg.read && <BsCheckAll size={14} className="ml-1 text-blue-400" />} {msg.sender !== 'User' && msg.read && <BsCheckAll size={14} className="ml-1 text-blue-500" />} </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your chat here" className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"/>
                <button type="submit" className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"> <FiSend size={20} /> </button>
              </form>
            </div>
          </>
        ) : ( <div className="flex-1 flex items-center justify-center text-gray-500"> Select a dispute to see the conversation. </div> )}
      </div>

      {/* New Dispute Modal */}
      <NewDisputeModal 
        isOpen={isNewDisputeModalOpen}
        onClose={() => setIsNewDisputeModalOpen(false)}
        onSubmitDispute={handleNewDisputeSubmit}
      />
    </div>
  );
};

export default SupportContent;