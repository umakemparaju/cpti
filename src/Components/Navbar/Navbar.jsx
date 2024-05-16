import React, { useState } from "react";
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import th from'../../assets/th.png';
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Redirect to YouTube search page with the search query
        window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <nav className="flex-div">
            <div className="nav-left flex-div">
                <img
                    className="menu-icon"
                    onClick={() => setSidebar(prev => !prev)}
                    src={menu_icon}
                    alt=""
                />
                <Link to="/">
                    <img className="logo" src={logo} alt="" />
                </Link>
            </div>
  
            <div className="nav-right flex-div">
                <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                        type="text"
                        placeholder="Search YouTube"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit">
                        <img src={search_icon} alt="Search" />
                    </button>
                </form>
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={th} className="user_icon" alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
