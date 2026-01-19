import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import AlumniMeet2025 from "./Components/Registrations/AlumniMeet2025";
import Register from "./Components/Registrations/Register.jsx";
import { Routes, Route } from "react-router-dom";
import AlumniMeet202526 from "./Components/Admin/Registrations/AlumniMeet202526.jsx";
import Home from "./Components/Home.jsx";
import Footer from "./Components/Footer.jsx";
import EventDetails from "./Components/Events/EventDetails.jsx";
import AlumniList from "./Components/AlumniList.jsx";
import RegisterAlumni from "./Components/RegisterAlumni.jsx";
import RegistrationDetails from "./Components/RegistrationDetails.jsx";
import Performance from "./Components/Registrations/Performance.jsx";
import AboutsUs from "./Components/AboutsUs.jsx";
import ContactUs from "./Components/ContactUs.jsx";
import Login from "./Components/Admin/Login.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import Header from "./Components/Admin/Header.jsx";
import AddDonation from "./Components/Admin/AddDonation.jsx";
import Donation from "./Components/Donation.jsx";
import AddEvent from "./Components/Admin/Events/AddEvent.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/about-us"
          element={
            <>
              <Navbar />
              <AboutsUs />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/contact-us"
          element={
            <>
              <Navbar />
              <ContactUs />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/alumni"
          element={
            <>
              <Navbar />
              <AlumniList />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/alumni-registration"
          element={
            <>
              <Navbar />
              <RegisterAlumni />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/alumni-registration-details"
          element={
            <>
              <Navbar />
              <RegistrationDetails />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/alumnimeet-registrations"
          element={
            <>
              <Navbar />
              <AlumniMeet2025 />
              <Footer />
            </>
          }
        />

        <Route
          path="/alumni-meet-performance-registration"
          element={
            <>
              <Navbar />
              <Performance />
              <Footer />
              {/* <AlumniMeet2025/> */}
            </>
          }
        />

        <Route
          path="/event-registration"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        <Route
          path="/events/:id"
          element={
            <>
              <Navbar />
              <EventDetails />
              <Footer />
            </>
          }
        />

        <Route
          path="/contribution"
          element={
            <>
              <Navbar />
              <Donation />
              <Footer />
            </>
          }
        />

        <Route
          path="/authentication"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/registration-alumni-meet-2025-26"
          element={
            <>
              <Header />
              <AlumniMeet202526 />
            </>
          }
        />
        <Route
          path="/add-donation"
          element={
            <>
              <Header />
              <AddDonation />
            </>
          }
        />

        <Route
          path="/add-event"
          element={
            <>
              <Header />
              <AddEvent />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
