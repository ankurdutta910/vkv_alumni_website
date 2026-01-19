import { useEffect, useState } from "react";
import hero1 from "./assets/img/home/hero2.webp";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import img1 from "./assets/img/home/11jan2025alumnimeet-1.webp";
import img2 from "./assets/img/home/11jan2025alumnimeet-2.webp";
import img3 from "./assets/img/home/11jan2025alumnimeet-3.webp";
import img4 from "./assets/img/home/11jan2025alumnimeet-4.webp";
import img5 from "./assets/img/home/11jan2025alumnimeet-5.webp";
import img6 from "./assets/img/home/11jan2025alumnimeet-6.webp";

import regimg from "./assets/img/ff.webp";

const slides = [
  { id: 1, image: hero1 },
  { id: 2, image: hero1 },
];

const gallery = [
  { id: 1, image: img6 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img1 },
];

const word = "VKVian";

function Home() {
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const speed = isDeleting ? 80 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(word.substring(0, index + 1));
        setIndex(index + 1);

        if (index === word.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTypedText(word.substring(0, index - 1));
        setIndex(index - 1);

        if (index === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setEvents(data);
    }

    setLoading(false);
  };

  return (
    <div className="homemain">
      <section className="hero">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Once a <span className="typing">{typedText}</span>,
            <span className="breaktext"></span> Always a{" "}
            <span className="typing">{typedText}</span>
          </h1>
          <p>
            A Platform to Reconnect, Reminisce, and Grow Together as One Family
          </p>
        </div>
      </section>

      {/* <section className="container-fluid regcomponent mt-2 mb-0">
        <div
          className="card p-2"
          style={{
            background: "#0091c2",
            background:
              "linear-gradient(186deg,rgba(0, 130, 174, 1) 0%, rgba(2, 88, 132, 1) 100%)",
            border: "none",
          }}
        >
          <div className="d-flex gap-2">
            <img src={regimg} className="img-fluid regimg" />
            <div>
              <h6 className="mb-1" id="regheader">
                Alumni Meet 2025-26
              </h6>
              <p className="mb-2" id="regtext">
                Celebrating 25 years of VKV Dhemaji excellence.
              </p>

              <Link
                to="/event-registration"
                className="btn btn-light btn-sm mt-0 mb-0"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="about">
        <div className="about-container">
          <h2>About Us</h2>
          <p>
            The <strong>VKV Dhemaji Alumni Association</strong>, established on
            <strong> 1st January 2026</strong>, stands as a vibrant and
            ever-growing community of former students united by shared values,
            lifelong friendships, and a deep sense of gratitude toward our alma
            mater, VKV Dhemaji. Rooted in the ideals and culture imparted by the
            institution, the association proudly celebrates the spirit,
            discipline, and legacy that have shaped generations of students.
          </p>
          <p>
            The association provides a common platform for alumni to reconnect,
            relive cherished memories, strengthen bonds beyond academic years,
            and actively contribute to meaningful community initiatives
            together.
          </p>
        </div>
      </section>

      <section className="events">
        <div className="events-container">
          <h2>Our Events</h2>

          <div className="row">
            {events.map((event) => (
              <div className="col-lg-4 mb-3" key={event.id}>
                <div className="event-card">
                  <div className="event-img">
                    {event.status === "upcoming" && (
                      <span className="event-tag">Upcoming Event</span>
                    )}
                    <img src={event.main_image} alt={event.title} />
                  </div>

                  <div className="event-content">
                    <span className="event-date">{event.event_date}</span>
                    <h3>
                      {event.status === "upcoming" ? (
                        <Link to={event.url}>
                          {event.title}{" "}
                          <span
                            className="badge bg-danger"
                            style={{ fontSize: "12px" }}
                          >
                            Register Now
                          </span>
                        </Link>
                      ) : (
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                      )}
                    </h3>
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <h2>Gallery</h2>
          <div className="row">
            {gallery.map((img, i) => (
              <div className="col-lg-4 mb-3 event-gallery" key={img.id}>
                <img className="img-fluid" src={img.image} alt={img.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta">
        <div
          className="container-fluid"
          style={{ maxWidth: "1170px" }}
          data-aos="zoom-in"
        >
          <div className="row">
            <div className="col-lg-9 text-center text-lg-start">
              <h3>Join Us</h3>
              <p>
                Register as an alumnus and be officially part of the VKV Dhemaji
                Alumni Association
              </p>
            </div>
            <div className="col-lg-3 cta-btn-container text-center">
              <Link className="cta-btn align-middle" to="/alumni-registration">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
