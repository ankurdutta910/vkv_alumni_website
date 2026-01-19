import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTop from "../GoToTop";
import { Alert } from "react-bootstrap";
import hero1 from "./assets/img/home/hero2.webp";

function RegistrationDetails() {
  const [checking, setChecking] = useState(false);
  const [alumniData, setAlumniData] = useState(null);

  // 🔘 SEARCH TYPE
  const [searchBy, setSearchBy] = useState("email"); // email | contact

  // CAPTCHA
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    contact: "",
  });

  // 🔢 Generate captcha
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 🔄 RESET RESULT
  const handleReset = () => {
    setAlumniData(null);
    setCaptchaAnswer("");
    generateCaptcha();
    setFormData({
      email: "",
      contact: "",
    });
  };

  // 🔍 SEARCH
  const handleSearch = async () => {
    if (!searchBy) {
      toast.error("Please select search type");
      return;
    }

    if (searchBy === "email" && !formData.email) {
      toast.error("Please enter email");
      return;
    }

    if (searchBy === "contact" && !/^\d{10}$/.test(formData.contact)) {
      toast.error("Enter valid 10-digit mobile number");
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      toast.error("Incorrect CAPTCHA");
      generateCaptcha();
      return;
    }

    try {
      setChecking(true);

      let query = supabase.from("AlumniRecord").select("*");

      query =
        searchBy === "email"
          ? query.eq("email", formData.email)
          : query.eq("contact", formData.contact);

      const { data, error } = await query.single();

      if (error || !data) {
        setAlumniData(null);
        toast.error("No record found");
        return;
      }

      setAlumniData(data);
      toast.success("Record found");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <GoToTop />

      <div className="homemain">
        {/* HERO */}
        <div
          className="event-hero text-center"
          style={{ backgroundImage: `url(${hero1})` }}
        >
          <div className="event-hero-overlay">
            <h1>Individual Data of Alumni</h1>
            <span>
              Existing members can check their registered details using the form
              below.
            </span>
          </div>
        </div>

        <div
          className="container-fluid main p-3 mt-1"
          style={{ maxWidth: "450px" }}
        >
          <h6 className="mb-4">Search your details:</h6>

          {/* 🔘 RADIO */}
          <div className="mb-2">
            <label className="me-3">
              <input
                type="radio"
                name="searchBy"
                checked={searchBy === "email"}
                onChange={() => setSearchBy("email")}
              />{" "}
              Search by Email
            </label>

            <label>
              <input
                type="radio"
                name="searchBy"
                checked={searchBy === "contact"}
                onChange={() => setSearchBy("contact")}
              />{" "}
              Search by Mobile
            </label>
          </div>

          {/* 📧 EMAIL */}
          {searchBy === "email" && (
            <>
              <label>Email</label>
              <input
                type="email"
                className="form-control mb-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </>
          )}

          {/* 📞 CONTACT */}
          {searchBy === "contact" && (
            <>
              <label>Contact</label>
              <input
                type="tel"
                className="form-control mb-2"
                value={formData.contact}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setFormData({ ...formData, contact: value });
                  }
                }}
                placeholder="10-digit mobile number"
                maxLength={10}
              />
            </>
          )}

          {/* CAPTCHA */}
          {searchBy && (
            <>
              <label>CAPTCHA:</label>
              <div className="d-flex gap-2">
                <div className="card p-2" style={{ minWidth: "100px" }}>
                  {num1} + {num2} = ?
                </div>
                <input
                  type="number"
                  className="form-control mb-0"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Enter answer"
                />
              </div>
            </>
          )}

          {/* SEARCH */}
          <button
            className="btn btn-primary w-100 mb-3 mt-3"
            onClick={handleSearch}
            disabled={checking || alumniData}
          >
            {checking ? "Searching..." : "Search"}
          </button>

          {/* RESET */}
          {alumniData && (
            <p
              className="text-center text-decoration-underline"
              style={{ cursor: "pointer", color: "grey" }}
              onClick={handleReset}
            >
              Reset Result
            </p>
          )}

          {/* RESULT */}
          {alumniData && (
            <>
              <h6 className="mb-2 mt-3">Your Registered Details:</h6>
              <div
                className="card p-3"
                style={{ backgroundColor: "#deeafc", borderColor: "#b4ccefff" }}
              >
                <div className="row mb-2">
                  <div className="col-3 ">
                    <strong>Name:</strong>
                  </div>
                  <div className="col-9">
                    <span>{alumniData.name}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-3">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-9">
                    <span style={{ textWrap: "nowrap" }}>
                      {alumniData.email}
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-3">
                    <strong>Contact:</strong>
                  </div>
                  <div className="col-9">
                    <span>{alumniData.contact}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-3">
                    <strong>Gender:</strong>
                  </div>
                  <div className="col-9">
                    <span>{alumniData.gender}</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-3">
                    <strong>Batch:</strong>
                  </div>
                  <div className="col-9">
                    <span>{alumniData.batch}</span>
                  </div>
                </div>

             
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RegistrationDetails;
