import React from 'react';
import { useState } from 'react';
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Header = ({OpenSidebar}) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to navigate to Notifications page
    const goToNotifications = () => {
        navigate('/Notifications');
    };

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // Function to handle menu item clicks
    const handleMenuItemClick = (path) => {
        navigate(path);
        setDropdownOpen(false); // Close dropdown after click
    };

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar} />
            </div>
            <div className='header-left'>
                <BsSearch className='icon' />
            </div>
            <div className='header-right'>
                {/* Bell Icon redirects to Notifications page */}
                <BsFillBellFill className='icon' onClick={goToNotifications} />

                <BsFillEnvelopeFill className='icon' />

                {/* User Icon shows dropdown */}
                <div className='dropdown'>
                    <BsPersonCircle className='icon' onClick={toggleDropdown} />
                    
                    {isDropdownOpen && (
                        <ul className='dropdown-menu'>
                            <li onClick={() => handleMenuItemClick('/Profile')}>Profile</li>
                            <li onClick={() => handleMenuItemClick('/Settings')}>Settings</li>
                            <li onClick={() => handleMenuItemClick('/Login')}>Account</li>
                            <li onClick={() => handleMenuItemClick('/Login')}>Logout</li>
                            
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
