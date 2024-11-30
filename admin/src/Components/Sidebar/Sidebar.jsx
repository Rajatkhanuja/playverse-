import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-option">
        <NavLink to='/admin/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Games</p>
        </NavLink>
        <NavLink to='/admin/list' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>List Game</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
