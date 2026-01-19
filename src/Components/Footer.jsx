import React from "react";
import logo from "./assets/img/logowhite.webp";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer class="footer-section">
        <div class="container" style={{ maxWidth: "1180px" }}>
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <span>VKV Dhemaji, Hatigarh, 787057, Assam</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fas fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <span>(+91) 7086952212</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="far fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <span>alumnivkvdhemaji@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-6 col-lg-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <a>
                      <img src={logo} class="img-fluid" alt="logo" />
                    </a>
                  </div>
                  <div class="footer-text">
                    <p>
                      The VKV Dhemaji Alumni Association unites former students
                      to reconnect, relive memories, and strengthen lifelong
                      bonds together.
                    </p>
                  </div>
                  {/* <div class="footer-social-icon">
                    <span>Follow us</span>
                    <a href="#">
                      <i class="fab fa-facebook-f facebook-bg"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-twitter twitter-bg"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-google-plus-g google-bg"></i>
                    </a>
                  </div> */}
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li>
                      <Link to="/about-us">About us</Link>
                    </li>
                    <li>
                      <Link to="/">Events</Link>
                    </li>

                    <li>
                      <Link to="/contact-us">Contact us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div class="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div class="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i class="fab fa-telegram-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; 2026, All Right Reserved{" "}
                    <a href="/">VDAA</a>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div class="footer-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <Link to="/">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
