import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import GoToTop from "../../GoToTop";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setEvent(null);
    } else {
      setEvent(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading event...</h2>;
  }

  if (!event) {
    return <h2 style={{ textAlign: "center" }}>Event not found</h2>;
  }

  return (
    <>
      <GoToTop />

      <div className="event-details homemain">
        {/* Hero Section */}
        <div
          className="event-hero"
          style={{
            backgroundImage: `url(${event.main_image})`,
          }}
        >
          <div className="event-hero-overlay">
            <h1>{event.title}</h1>
            {event.date && <span>{event.date}</span>}
          </div>
        </div>

        {/* Content */}
        <div className="container mt-3">
          <p className="event-description">{event.description}</p>

          {/* Gallery (main image + other images) */}
          {event.gallery_images?.length > 0 && (
            <>
              <h6 className="mb-2">Event Gallery</h6>
              <div className="event-gallery">
                {[event.main_image, ...event.gallery_images].map(
                  (img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${event.title} ${index + 1}`}
                    />
                  )
                )}
              </div>
            </>
          )}

          {/* CTA */}
          {event.status === "upcoming" && event.url && (
            <Link to={event.url} className="btn-primary">
              Register Now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default EventDetails;
