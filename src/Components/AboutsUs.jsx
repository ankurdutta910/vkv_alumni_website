import React, { useEffect, useState } from "react";
import GoToTop from "../GoToTop";
import hero1 from "./assets/img/home/hero2.webp";

function AboutsUs() {
  return (
    <>
      <GoToTop />
      <div className="homemain">
        <div
          className="event-hero text-center"
          style={{ backgroundImage: `url(${hero1})` }}
        >
          <div className="event-hero-overlay">
            <h1>About Us</h1>
            <span>VKV Dhemaji Alumni Association</span>
          </div>
        </div>

        <div className="container-fluid main mt-4 aboutuscontainer">
          <p>
            The <strong>VKV Dhemaji Alumni Association</strong>, established on
            <strong> 1st January 2026</strong>, stands as a vibrant and
            ever-growing community of former students united by shared values,
            lifelong friendships, and a deep sense of gratitude toward our alma
            mater, VKV Dhemaji. Rooted in the ideals and culture imparted by the
            institution, the association proudly celebrates the spirit,
            discipline, and legacy that have shaped generations of students.
          </p>{" "}
          <p>
            Serving as a common platform, the association enables alumni from
            different batches and walks of life to reconnect, rekindle old
            friendships, and relive cherished memories of their school days. It
            fosters a strong sense of belonging that goes far beyond academic
            years, encouraging meaningful interactions, mentorship, and mutual
            support among members. By bridging the past with the present, the
            association keeps the bond with VKV Dhemaji alive and relevant.
          </p>
          <p>
            Beyond social connections, the VKV Dhemaji Alumni Association is
            committed to giving back to society. Through collective efforts,
            alumni actively participate in educational support, social welfare,
            cultural initiatives, and community development programs. The
            association aims to inspire responsibility, leadership, and service,
            reflecting the values instilled during student life.
          </p>
          <p>
            With unity, purpose, and shared vision at its core, the VKV Dhemaji
            Alumni Association continues to strengthen alumni relations while
            contributing positively to the institution and the wider community.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutsUs;
