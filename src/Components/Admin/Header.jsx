import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.webp";

function Header() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid" style={{ maxWidth: "1170px" }}>
          <a class="navbar-brand" href="#">
            <img src={logo} className="img-fluid" style={{ height: "40px" }} />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
            </ul>
            <form class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to="/dashboard">
                    Home
                  </Link>
                </li>
                 <li class="nav-item">
                  <Link class="nav-link" to="/registration-alumni-meet-2025-26">
                    Registrations
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link" to="/add-donation">
                    Add Donation
                  </Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
