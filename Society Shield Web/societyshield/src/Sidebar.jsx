import React from 'react';
import { BsCart3,BsGrid1X2Fill, BsFillArchiveFill,BsFillGrid3X3GapFill,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill} from 'react-icons/bs';
import {Link} from 'react-router-dom'
import SSlogo from './assets/ssicon.png'

const Sidebar = ({openSidebarToggle, OpenSidebar}) => {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive":""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                  <img src={SSlogo} className='ssicon'/> Society Shield 
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                <Link to="/"><BsGrid1X2Fill className='icon' /> Dashboard</Link>
                </li>
                <li className='sidebar-list-item'>
                <Link to="/products"><BsFillArchiveFill className='icon' /> Property</Link>
                </li>
                <li className='sidebar-list-item'>
                <Link to="/Members"><BsPeopleFill className='icon' /> Members</Link>
                </li>
                <li className='sidebar-list-item'>   
                   <Link to="/RecordPayment"><BsFillGrid3X3GapFill className='icon'/> Record Payment</Link>
                </li>
               
                <li className='sidebar-list-item'>                 
                   <Link to="/ManagePayments"><BsListCheck className='icon'/> Manage Payments</Link>
                </li>
                <li className='sidebar-list-item'>
                   <Link to="/Reports"><BsMenuButtonWideFill className='icon'/> Reports</Link>
                </li>
                <li className='sidebar-list-item'>
                   <Link to="/Settings"><BsFillGearFill className='icon'/> Settings</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
