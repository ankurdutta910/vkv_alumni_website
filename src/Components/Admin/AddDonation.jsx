import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

function AddDonation() {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [amount, setAmount] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // 🔍 Search alumni when 10 digit contact entered
  useEffect(() => {
    if (contact.length == 10) {
      fetchAlumniByContact(contact);
    } else {
      setSuggestions([]);
      setAutoFilled(false);
    }
  }, [contact]);

  const fetchAlumniByContact = async (value) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("AlumniRecord")
      .select("id, name, batch, contact")
      .ilike("contact", `%${value}%`);

    if (!error && data?.length > 0) {
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }

    setLoading(false);
  };

  // ✅ Select suggestion
  const handleSelect = (item) => {
    setName(item.name);
    setBatch(item.batch);
    setContact(item.contact);
    setSuggestions([]);
    setAutoFilled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contact || !name || !batch || !amount) {
      setMessage("Please fill all fields");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { error } = await supabase.from("Donation").insert([
      {
        contact,
        name,
        batch,
        amount: Number(amount),
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Failed to submit donation. Try again.");
    } else {
      setMessage("Donation added successfully ✅");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      // Reset form
      setContact("");
      setName("");
      setBatch("");
      setAmount("");
      setSuggestions([]);
      setAutoFilled(false);
    }

    setSubmitting(false);
  };

  return (
    <div className="container-fluid main">
      <h5 className="section-title">Add Donation</h5>

      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            {/* CONTACT */}
            <div className="mb-3 position-relative">
              <label className="form-label mb-0">Contact Number</label>
              <input
                type="text"
                className="form-control"
                maxLength={10}
                value={contact}
                onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 10 digit contact"
              />

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 z-3">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelect(item)}
                    >
                      <strong>{item.name}</strong> – {item.batch}
                    </li>
                  ))}
                </ul>
              )}

              {loading && (
                <small className="text-muted">Searching alumni...</small>
              )}

              {/* INFO */}
              {!autoFilled &&
                contact.length === 10 &&
                suggestions.length === 0 && (
                  <small className="text-warning">
                    No alumni record found. Please enter details manually.
                  </small>
                )}
            </div>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label mb-0">Name</label>
              <input
                type="text"
                required
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            {/* BATCH */}
            <div className="mb-3">
              <label className="form-label mb-0">Batch</label>
              <input
                type="text"
                required
                className="form-control"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Enter batch"
              />
            </div>

            {/* AMOUNT */}
            <div className="mb-3">
              <label className="form-label mb-0">Donation Amount</label>
              <input
                type="number"
                required
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Donation"}
            </button>

            {message && (
              <div className="mt-2 text-center">
                <small className="text-success">{message}</small>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDonation;
