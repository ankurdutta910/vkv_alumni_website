import React, { useEffect, useState } from "react";
import GoToTop from "../GoToTop";
import hero1 from "./assets/img/home/hero2.webp";

function ContactUs() {
  return (
    <>
      <GoToTop />
      <div className="homemain">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.7534506225734!2d94.53300537491374!3d27.445793436979923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3740dd1143214f25%3A0xb28065a435896b6f!2sVivekananda%20Kendra%20Vidyalaya%2C%20Dhemaji!5e0!3m2!1sen!2sin!4v1766991619776!5m2!1sen!2sin"
          width="100%"
          height="270"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <div
          className="main container-fluid mt-0"
          style={{ maxWidth: "500px", padding: "30px" }}
        >
            <h5>Get in Touch</h5>
            <p style={{fontSize:'13px',color:'grey'}}>We'd love to hear from you. Drop us a line and we'll get back to you shortly.</p>
          <label>Full Name</label>
          <input
            className="form-control mb-2"
            name="name"
            type="text"
            // value={formData.name}
            // onChange={handleChange}
            // disabled={!checked || isExistingAlumni}
          />

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            // value={formData.email}
            // onChange={handleChange}
            // disabled={checked}
          />

          {/* CONTACT */}
          <label>Contact</label>

          <input    
            type="tel"
            name="contact"
            style={{ width: "100%" }}
            className="form-control mb-2"
            // value={formData.contact}
            // onChange={handleChange}
            // disabled={checked}
          />

          {/* CONTACT */}
          <label>Message</label>

          <textarea
            name="contact"
            style={{ width: "100%" }}
            className="form-control"
            // value={formData.contact}
            // onChange={handleChange}
            // disabled={checked}
          ></textarea>

          <button
            className="btn btn-primary w-100 mt-3"
            // disabled={!checked || loading || registered}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
