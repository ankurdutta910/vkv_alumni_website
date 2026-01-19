import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import GoToTop from "../GoToTop";
import male from "./assets/img/man.webp";
import female from "./assets/img/woman.webp";
import hero1 from "./assets/img/home/hero2.webp";
import { useNavigate } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { FiFileText } from "react-icons/fi";

function AlumniList({ searchText }) {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const { data, error } = await supabase
        .from("AlumniRecord")
        .select("name, batch, gender")
        .order("batch", { ascending: false });

      if (error) throw error;

      setAlumni(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load alumni list");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Group alumni by batch
  const groupedByBatch = alumni.reduce((acc, curr) => {
    const batch = curr.batch || "Unknown Batch";
    if (!acc[batch]) acc[batch] = [];
    acc[batch].push(curr);
    return acc;
  }, {});

  return (
    <>
      <GoToTop />
      <div className="homemain">
        <div
          className="event-hero text-center"
          style={{ backgroundImage: `url(${hero1})` }}
        >
          <div className="event-hero-overlay">
            <h1>Alumni Directory</h1>
            <span>A directory of alumni registered with VKV Dhemaji</span>
          </div>
        </div>

        <div className="container-fluid main mt-3">
          <div className="d-flex gap-2 mb-3">
            <div
              className="card p-2 w-50"
              onClick={() => navigate("/alumni-registration")}
              style={{
                cursor: "pointer",
                backgroundColor: "#ffe9cf",
                borderColor: "#fedfbcff",
                color: "#825a2dff",
              }}
            >
              <p className="mb-0">
                <GiConfirmed style={{ marginTop: "-2px" }} /> Register Now
              </p>
            </div>
            <div
              className="card p-2 w-50"
              onClick={() => navigate("/alumni-registration-details")}
              style={{
                cursor: "pointer",
                backgroundColor: "#dce9fdff",
                borderColor: "#cee1fdff",
                color: "#4b6790ff",
              }}
            >
              <p className="mb-0">
                <FiFileText style={{ marginTop: "-2px" }} /> Registration
                Details
              </p>
            </div>
          </div>

          {loading && (
            <p className="text-center">Fetching data. Please wait...</p>
          )}
          {error && <>{error}</>}
          {/* <h5 className="section-title text-center mb-0">Alumni Directory</h5> */}

          {Object.entries(groupedByBatch).map(([batch, members]) => (
            <div key={batch} className="mb-4">
              {/* Batch Heading */}
              <h6 className="batch-heading mb-2">
                <strong>Batch of {batch}</strong>{" "}
                <i style={{ fontSize: "12px" }}>({members.length})</i>
              </h6>

              <div className="row">
                {members.map((data, index) => (
                  <div className="col-lg-3 mb-2" key={index}>
                    <div className="card p-2">
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={data.gender === "Female" ? female : male}
                          alt="alumni"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <div>
                          <h6 className="mb-0 text-uppercase">{data.name}</h6>
                          <p className="mb-0">
                            Batch : <b>{data.batch}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AlumniList;
