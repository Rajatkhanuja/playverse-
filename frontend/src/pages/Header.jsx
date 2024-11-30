import React, { useContext } from 'react';
import './header.css';
import { AppContext } from '../App';

function Header({ toggleActive }) {
  const { library, bag, user } = useContext(AppContext);

  return (
    <header>
      <a href="#" className="menu" onClick={toggleActive}>
        <i className="bi bi-sliders"></i>
      </a>
      <div className="userItems">
        <a href="#" className="icon">
          <i className="bi bi-heart-fill"></i>
          <span className="like">{library.length}</span>
        </a>
        <a href="#" className="icon">
          <i className="bi bi-bag-fill"></i>
          <span className="bag">{bag.length}</span>
        </a>
        <div className="avatar">
          <a href="#">
            {/* Removed user image */}
          </a>
          <div className="user">
            <span>{user ? user.name : 'PLAYVERSE'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
