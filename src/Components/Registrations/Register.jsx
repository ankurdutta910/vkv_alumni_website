import React, { useState } from "react";
import { supabase } from "../../supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTop from "../../GoToTop";
import { RiResetLeftFill } from "react-icons/ri";
import banner from "../assets/img/AlumniMeet.webp";
import { Alert } from "react-bootstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [checking, setChecking] = useState(false);
  const [alumniId, setAlumniId] = useState(null);
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
    setAlumniId(null);
    setRegistered(false);
    setFormData({
      name: "",
      email: "",
      contact: "",
      gender: "",
      batch: "",
    });
  };

  // 🔍 VERIFY (EMAIL + CONTACT BOTH REQUIRED)
  const handleCheck = async () => {
    const { email, contact } = formData;

    // ❗ BOTH REQUIRED
    if (!email || !contact) {
      toast.error("Please enter BOTH Email and Contact to verify");
      return;
    }

    try {
      setChecking(true);

      // 1️⃣ CHECK EMAIL FIRST
      const { data: emailData, error: emailError } = await supabase
        .from("AlumniRecord")
        .select("*")
        .eq("email", email)
        .single();

      if (emailError && emailError.code !== "PGRST116") throw emailError;

      if (emailData) {
        fillAlumni(emailData);
        toast.info("Alumni record fetched!");
        return;
      }

      // 2️⃣ CHECK CONTACT
      const { data: contactData, error: contactError } = await supabase
        .from("AlumniRecord")
        .select("*")
        .eq("contact", contact)
        .single();

      if (contactError && contactError.code !== "PGRST116") throw contactError;

      if (contactData) {
        fillAlumni(contactData);
        toast.info("Alumni record fetched!");
        return;
      }

      // 🆕 NO RECORD FOUND
      setChecked(true);
      setIsExistingAlumni(false);
      toast.info("No record found. Please fill details");
    } catch (err) {
      console.error(err);
      toast.error("Error checking record");
    } finally {
      setChecking(false);
    }
  };

  // 🧠 FILL ALUMNI DATA
  const fillAlumni = (data) => {
    setAlumniId(data.id);
    setFormData({
      name: data.name || "",
      email: data.email || "",
      contact: data.contact || "",
      gender: data.gender || "",
      batch: data.batch || "",
    });
    setIsExistingAlumni(true);
    setChecked(true);
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
      let currentAlumniId = alumniId;

      // 🔁 EVENT CHECK
      if (currentAlumniId) {
        const { data } = await supabase
          .from("EventRegistrations")
          .select("11jan2026")
          .eq("alumni_id", currentAlumniId)
          .single();

        if (data?.["11jan2026"] === 1) {
          setRegistered(true);
          // toast.error("Already registered for the event");
          return;
        }
      }

      // 🆕 INSERT ALUMNI
      if (!currentAlumniId) {
        const { data, error } = await supabase
          .from("AlumniRecord")
          .insert([{ name, email, contact, gender, batch }])
          .select()
          .single();

        if (error) throw error;
        currentAlumniId = data.id;
      }

      // 🧾 EVENT REGISTRATION
      const { error } = await supabase
        .from("EventRegistrations")
        .insert([{ alumni_id: currentAlumniId, "11jan2026": 1 }]);

      if (error) throw error;

      toast.success("Successfully registered!");

      setTimeout(() => {
        window.location.href =
          "https://chat.whatsapp.com/L4HCI13vWxBBkFZidL0CEo?mode=wwt";
      }, 1500);
      
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
      <div className="container-fluid main p-3" style={{ maxWidth: "450px" }}>
        <img src={banner} className="img-fluid" />
        <h5 className="text-center my-3">Registration Form</h5>

        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          value={formData.email}
          onChange={handleChange}
          disabled={checked}
        />

        {/* CONTACT */}
        <label>Contact</label>
        <div className="d-flex gap-2 mb-3">
          <input
            type="tel"
            name="contact"
            style={{ width: "100%" }}
            className="form-control"
            value={formData.contact}
            onChange={handleChange}
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

        <hr />

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label>Full Name</label>
          <input
            className="form-control mb-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!checked || isExistingAlumni}
          />

          <label>Gender</label>
          <select
            className="form-control mb-2"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!checked || isExistingAlumni}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Batch</label>
          <select
            className="form-control mb-2"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            disabled={!checked || isExistingAlumni}
          >
            <option value="">Select Batch</option>
            {Array.from({ length: 16 }, (_, i) => 2010 + i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          {registered && (
            <Alert variant="success"><IoMdCheckmarkCircleOutline style={{marginTop:'-3px'}} /> Already registered for the event!</Alert>
          )}

          <button
            className="btn btn-primary w-100 mt-3"
            disabled={!checked || loading || registered}
          >
            {loading
              ? "Registering..."
              : registered
              ? "Registered"
              : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
