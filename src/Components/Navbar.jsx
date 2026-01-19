import React, { useState, useRef, useEffect } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch, FiX } from "react-icons/fi";
import logo from "./assets/img/logo.webp";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <nav>
      <div className={`navbar ${showSearch ? "showInput" : ""}`}>
        <RiMenu2Fill className="bx-menu" onClick={() => setSidebarOpen(true)} />

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className="nav-links"
          style={{ left: sidebarOpen ? "0" : "-100%" }}
        >
          <div className="sidebar-logo">
            <FiX className="bx-x" onClick={() => setSidebarOpen(false)} />
          </div>

          <ul className="links">
            <li>
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about-us" onClick={() => setSidebarOpen(false)}>
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                GALLERY
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                EVENTS
              </Link>
            </li>
            <li>
              <Link to="/alumni" onClick={() => setSidebarOpen(false)}>
                ALUMNI
              </Link>
            </li>

            <li>
              <Link to="/contribution" onClick={() => setSidebarOpen(false)}>
                CONTRIBUTION
              </Link>
            </li>

            <li>
              <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔍 Search Box */}
        <div className="search-box">
          {/* {showSearch ? (
            <FiX
              className="bx-x searchicon"
              onClick={() => {
                setShowSearch(false);
                setSearchText("");
              }}
            />
          ) : (
            <FiSearch
              className="bx-search searchicon"
              onClick={() => setShowSearch(true)}
            />
          )} */}
          <Link to="/authentication">
            <IoLogInOutline className="bx-x searchicon" />
          </Link>

          {/* <div className="input-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
