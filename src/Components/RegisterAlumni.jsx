import React, { useState } from "react";
import { supabase } from "../supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTop from "../GoToTop";
import { RiResetLeftFill } from "react-icons/ri";
import { Alert } from "react-bootstrap";
import hero1 from "./assets/img/home/hero2.webp";

function RegisterAlumni() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const [checked, setChecked] = useState(false);
  const [isExistingAlumni, setIsExistingAlumni] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    batch: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔄 RESET
  const handleReverify = () => {
    setChecked(false);
    setIsExistingAlumni(false);
    setFormData({
      name: "",
      email: "",
      contact: "",
      gender: "",
      batch: "",
    });
  };

  // 🔍 VERIFY
  const handleCheck = async () => {
    const { email, contact } = formData;

    if (!email || !contact) {
      toast.error("Please enter BOTH Email and Contact to verify");
      return;
    }

    try {
      setChecking(true);

      // CHECK EMAIL
      const { data: emailData } = await supabase
        .from("AlumniRecord")
        .select("id")
        .eq("email", email)
        .single();

      if (emailData) {
        setChecked(true);
        setIsExistingAlumni(true);
        toast.info("Your email is already registered!");
        return;
      }

      // CHECK CONTACT
      const { data: contactData } = await supabase
        .from("AlumniRecord")
        .select("id")
        .eq("contact", contact)
        .single();

      if (contactData) {
        setChecked(true);
        setIsExistingAlumni(true);
        toast.info("Your phone no. is already registered!");
        return;
      }

      // NO RECORD FOUND
      setChecked(true);
      setIsExistingAlumni(false);
      toast.success("No record found. Please complete registration.");
    } catch (err) {
      console.error(err);
      toast.error("Error checking record");
    } finally {
      setChecking(false);
    }
  };

  // ✅ REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, contact, gender, batch } = formData;

    if (!name || !email || !contact || !gender || !batch) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("AlumniRecord").insert([
        {
          name,
          email,
          contact,
          gender,
          batch,
        },
      ]);

      if (error) throw error;

      toast.success("Successfully registered!");
      handleReverify();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
            <h1>Alumni Registration</h1>
            <span>
              Register to be part of the official VKV Dhemaji Alumni community
            </span>
          </div>
        </div>

        <div
          className="container-fluid main p-3 mt-1"
          style={{ maxWidth: "450px" }}
        >
          <h6 className="text-center mb-2">Registration form</h6>
          {/* EMAIL */}
          <label>
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            value={formData.email}
            onChange={handleChange}
            disabled={checked}
            placeholder="Enter your email id"
          />

          {/* CONTACT */}
          <label>
            Contact<span style={{ color: "red" }}>*</span>
          </label>
          <div className="d-flex gap-2 mb-3">
            <input
              type="tel"
              name="contact"
              className="form-control"
              value={formData.contact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // digits only
                if (value.length <= 10) {
                  setFormData({ ...formData, contact: value });
                }
              }}
              placeholder="10-digit mobile number"
              maxLength={10}
              disabled={checked}
            />

            <button
              className="btn btn-success"
              onClick={handleCheck}
              disabled={checking || checked}
            >
              {checking ? "Checking..." : "Verify"}
            </button>

            {checked && (
              <button className="btn btn-secondary" onClick={handleReverify}>
                <RiResetLeftFill />
              </button>
            )}
          </div>

          {/* 🚫 EXISTING ALUMNI */}
          {checked && isExistingAlumni && (
            <Alert variant="danger">You are already registered!</Alert>
          )}

          {/* ✅ NEW ALUMNI FORM */}
          {checked && !isExistingAlumni && (
            <>
              <hr />
              <form onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                  className="form-control mb-2"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <label>Gender</label>
                <select
                  className="form-control mb-2"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <label>Batch</label>
                <select
                  className="form-control mb-3"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                >
                  <option value="">Select Batch</option>
                  {Array.from({ length: 16 }, (_, i) => 2010 + i).map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterAlumni;
