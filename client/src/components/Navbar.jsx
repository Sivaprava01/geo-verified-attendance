import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user"); // get user from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out successfully!");
    navigate("/login");
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold text-info" to="/">
          BioAttend
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" || location.pathname === "/home"
                    ? "active-link"
                    : ""
                }`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active-link" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>

            {user ? (
              <>
                <span className="nav-link text-light">
                  Welcome, {JSON.parse(user).name}
                </span>
                <button
                  className="btn btn-outline-info btn-sm ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active-link" : ""
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
