// src/components/SettingsContent.jsx
import React, { useState } from 'react';
import {
  FiUser,
  FiLock,
  FiSettings,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiEye,     // Added
  FiEyeOff,  // Added
} from 'react-icons/fi';

// Sidebar Navigation Item Component (remains the same)
const SettingsNavItem = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full text-left px-4 py-2.5 my-1 rounded-lg transition-colors duration-150 text-sm relative
      ${
        isActive
          ? 'bg-gray-100 text-gray-900 font-semibold'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
      }
    `}
  >
    {isActive && (
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-lg"></span>
    )}
    {React.cloneElement(icon, { size: 20, className: `mr-3 ${isActive ? 'ml-2' : ''}` })}
    <span>{text}</span>
  </button>
);

// Input Field Component (reusable - updated for password toggle)
const InputField = ({ placeholder, icon, type = 'text', value, onChange, name, children, onToggleVisibility, showPassword }) => (
  <div className="flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-black focus-within:border-black">
    {icon && React.cloneElement(icon, { size: 18, className: 'text-gray-500 mr-2.5 flex-shrink-0' })}
    {children || (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full text-sm text-gray-700 placeholder-gray-500 outline-none bg-transparent"
      />
    )}
    {onToggleVisibility && ( // Render eye icon if onToggleVisibility is provided
      <button type="button" onClick={onToggleVisibility} className="text-gray-400 hover:text-gray-600 ml-2">
        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    )}
  </div>
);

// Select Field Component (reusable - remains the same)
const SelectField = ({ placeholder, options, value, onChange, name }) => (
  <div className="relative flex items-center border border-gray-300 rounded-lg px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-black focus-within:border-black">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full text-sm text-gray-700 placeholder-gray-500 outline-none bg-transparent appearance-none pr-8 cursor-pointer"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <FiChevronDown size={18} className="text-gray-500 absolute right-3.5 pointer-events-none" />
  </div>
);

// Toggle Switch Component (for Notifications Management)
const ToggleSwitch = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm text-gray-700">{label}</span>
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex items-center h-5 w-9 rounded-full transition-colors duration-200 ease-in-out focus:outline-none
        ${enabled ? 'bg-black' : 'bg-gray-300'}
      `}
    >
      <span
        className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform duration-200 ease-in-out
          ${enabled ? 'translate-x-4.5' : 'translate-x-0.5'} 
        `} // translate-x-4.5 is approx for a w-9 parent and w-3.5 child
      />
    </button>
  </div>
);


const ProfileInformationForm = () => { /* ... remains the same as previous version ... */
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '+234', });
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const genderOptions = [ { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }, ];
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <InputField placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
      <InputField placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
      <InputField placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
      <SelectField placeholder="Gender" options={genderOptions} name="gender" value={formData.gender} onChange={handleChange} />
      <InputField placeholder="Email" type="email" icon={<FiMail />} name="email" value={formData.email} onChange={handleChange} />
      <InputField icon={<FiPhone />}>
        <div className="flex items-center w-full">
          <span className="text-sm text-gray-700 mr-2 whitespace-nowrap">+234</span><span className="text-gray-400 mr-2">|</span>
          <input type="tel" name="phone" value={formData.phone.startsWith('+234') ? formData.phone.substring(4) : formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: '+234' + e.target.value.replace(/\D/g, '') }))} className="w-full text-sm text-gray-700 placeholder-gray-500 outline-none bg-transparent"/>
        </div>
      </InputField>
      <button type="submit" className="w-full bg-black text-white font-semibold text-base py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-6"> Save changes </button>
    </form>
  );
};

const PasswordSettingsForm = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <InputField
        placeholder="Current Password"
        type={showCurrent ? 'text' : 'password'}
        name="current"
        value={passwords.current}
        onChange={handleChange}
        onToggleVisibility={() => setShowCurrent(!showCurrent)}
        showPassword={showCurrent}
      />
      <InputField
        placeholder="New Password"
        type={showNew ? 'text' : 'password'}
        name="new"
        value={passwords.new}
        onChange={handleChange}
        onToggleVisibility={() => setShowNew(!showNew)}
        showPassword={showNew}
      />
      <InputField
        placeholder="Confirm New Password"
        type={showConfirm ? 'text' : 'password'}
        name="confirm"
        value={passwords.confirm}
        onChange={handleChange}
        onToggleVisibility={() => setShowConfirm(!showConfirm)}
        showPassword={showConfirm}
      />
      <button
        type="submit"
        className="w-full bg-black text-white font-semibold text-base py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-6"
      >
        Save changes
      </button>
    </form>
  );
};

const GeneralSettingsForm = () => {
  const [notifications, setNotifications] = useState({
    sms: false,
    email: true,
    accountLogin: false,
    otp: false,
    verificationCode: false,
    transactions: true,
    profileUpdates: true,
    helpSupport: true,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="divide-y divide-gray-200">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">Notify me via</h3>
        <ToggleSwitch label="SMS" enabled={notifications.sms} onChange={() => handleToggle('sms')} />
        <ToggleSwitch label="Email" enabled={notifications.email} onChange={() => handleToggle('email')} />
      </div>
      <div className="pt-4 mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Allow GiaRide notify me for</h3>
        <ToggleSwitch label="Account Login" enabled={notifications.accountLogin} onChange={() => handleToggle('accountLogin')} />
        <ToggleSwitch label="OTP" enabled={notifications.otp} onChange={() => handleToggle('otp')} />
        <ToggleSwitch label="Verification Code" enabled={notifications.verificationCode} onChange={() => handleToggle('verificationCode')} />
        <ToggleSwitch label="Transactions" enabled={notifications.transactions} onChange={() => handleToggle('transactions')} />
        <ToggleSwitch label="Profile Updates" enabled={notifications.profileUpdates} onChange={() => handleToggle('profileUpdates')} />
        <ToggleSwitch label="Help & Support" enabled={notifications.helpSupport} onChange={() => handleToggle('helpSupport')} />
      </div>
    </div>
  );
};


const SettingsContent = () => {
  const [activeSetting, setActiveSetting] = useState('My Profile');

  const settingsNav = [
    { text: 'My Profile', icon: <FiUser />, content: <ProfileInformationForm /> },
    { text: 'Password', icon: <FiLock />, content: <PasswordSettingsForm /> }, // Updated content
    { text: 'Settings', icon: <FiSettings />, content: <GeneralSettingsForm /> }, // Updated content
  ];

  const currentContent = settingsNav.find(nav => nav.text === activeSetting)?.content;
  const currentItem = settingsNav.find(nav => nav.text === activeSetting);

  return (
    <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 p-4 sm:p-6 md:p-10 bg-white font-sans">
      <div className="w-full md:w-56 lg:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6 lg:pr-8">
        <nav>
          {settingsNav.map((item) => (
            <SettingsNavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              isActive={activeSetting === item.text}
              onClick={() => setActiveSetting(item.text)}
            />
          ))}
        </nav>
      </div>

      <div className="w-full md:max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">
          {/* Title logic adjusted based on activeSetting */}
          {currentItem?.text === "My Profile" ? "Profile information" : currentItem?.text}
        </h1>
        
        {(activeSetting === "My Profile" || activeSetting === "Password") && (
          <h2 className="text-md font-semibold text-gray-800 mb-4">
            Personal Information {/* This subheading is consistent for Profile and Password in the image */}
          </h2>
        )}
        {activeSetting === "Settings" && (
          <h2 className="text-md font-semibold text-gray-800 mb-4">
            Notifications Management
          </h2>
        )}
        
        {currentContent}
      </div>
    </div>
  );
};

export default SettingsContent;