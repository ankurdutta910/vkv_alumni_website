import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import GoToTop from "../GoToTop";
import hero1 from "./assets/img/home/hero2.webp";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

function Donation() {
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
        .from("Donation")
        .select("name, batch,amount")
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

  return (
    <>
      <GoToTop />
      <div className="homemain">
        <div
          className="event-hero text-center"
          style={{ backgroundImage: `url(${hero1})` }}
        >
          <div className="event-hero-overlay">
            <h1>Contribution</h1>
            <span>
              Construction of the Interior of Laboratory in New Building
            </span>
          </div>
        </div>

        <div className="container-fluid main mt-3">
          {loading ? (
            <p className="text-center">Fetching data. Please wait...</p>
          ) : (
            <>
              <div className="row">
                {alumni && alumni.length > 0 ? (
                  <>
                    {alumni.map((data, index) => (
                      <div className="col-lg-3 mb-2" key={index}>
                        <div className="card p-2">
                          <div className="d-flex justify-content-between align-item-center ">
                            <div className="d-flex gap-2 align-items-center">
                              <FaRegUser
                                style={{ fontSize: "25px", color: "orange" }}
                              />
                              <div>
                                <h6 className="mb-0 text-uppercase">
                                  {data.name}
                                </h6>
                                <p className="mb-0">
                                  Batch : <b>{data.batch}</b>
                                </p>
                              </div>
                            </div>
                            <h6
                              className="text-right text-success"
                              style={{
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              <b>
                                ₹
                                {parseFloat(data.amount).toLocaleString(
                                  "en-IN"
                                )}
                              </b>
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="text-center text-danger">No Data Found</p>
                  </>
                )}
              </div>
            </>
          )}
          {error && <>{error}</>}
        </div>
      </div>
    </>
  );
}

export default Donation;
