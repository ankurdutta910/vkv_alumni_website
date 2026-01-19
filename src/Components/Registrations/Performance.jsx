import React, { useState } from "react";
import { supabase } from "../../supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoToTop from "../../GoToTop";
import { MdDeleteOutline } from "react-icons/md";

function Performance() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    batch: "",
    performance: "",
    otherPerformance: "",
    isGroup: false,
    groupMembers: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ➕ Add group member
  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      groupMembers: [
        ...prev.groupMembers,
        { name: "", batch: "", contact: "" },
      ],
    }));
  };

  // ✏️ Update member
  const updateMember = (index, field, value) => {
    const updated = [...formData.groupMembers];
    updated[index][field] = value;
    setFormData({ ...formData, groupMembers: updated });
  };

  // ❌ Remove member
  const removeMember = (index) => {
    const updated = formData.groupMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, groupMembers: updated });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      contact,
      batch,
      performance,
      otherPerformance,
      isGroup,
      groupMembers,
    } = formData;

    if (!name || !contact || !batch || !performance) {
      toast.error("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      toast.error("Contact number must be 10 digits");
      return;
    }

    if (performance === "Others" && !otherPerformance) {
      toast.error("Please specify performance");
      return;
    }

    if (isGroup && groupMembers.length === 0) {
      toast.error("Please add at least one group member");
      return;
    }

    if (
      isGroup &&
      groupMembers.some(
        (m) => !m.name || !m.batch || !/^\d{10}$/.test(m.contact)
      )
    ) {
      toast.error("Please fill all group member details correctly");
      return;
    }

    try {
      setLoading(true);

      const finalPerformance =
        performance === "Others" ? otherPerformance : performance;

      const { error } = await supabase.from("PerformanceRegistrations").insert([
        {
          name,
          contact,
          batch,
          performance: finalPerformance,
          is_group: isGroup,
          group_members: isGroup ? groupMembers : [],
        },
      ]);

      if (error) throw error;

      toast.success("Performance registered successfully!");

      // 🔄 RESET
      setFormData({
        name: "",
        contact: "",
        batch: "",
        performance: "",
        otherPerformance: "",
        isGroup: false,
        groupMembers: [],
      });
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
        <h5 className="text-center my-3">Performance Registration</h5>

        <form onSubmit={handleSubmit}>
          {/* MAIN DETAILS */}
          <label>Full Name</label>
          <input
            className="form-control mb-2"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Contact</label>
          <input
            className="form-control mb-2"
            value={formData.contact}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData({ ...formData, contact: value });
              }
            }}
            maxLength={10}
          />

          <label>Batch</label>
          <select
            className="form-control mb-2"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
          >
            <option value="">Select Batch</option>
            {Array.from({ length: 16 }, (_, i) => 2010 + i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          {/* PERFORMANCE */}
          <label>Performance</label>
          <select
            className="form-control mb-2"
            name="performance"
            value={formData.performance}
            onChange={handleChange}
          >
            <option value="">Select Performance</option>
            <option>Solo Dance</option>
            <option>Group Dance</option>
            <option>Solo Song</option>
            <option>Group Song</option>
            <option>Poem Recitation</option>
            <option>Drama</option>
            <option>Others</option>
          </select>

          {formData.performance === "Others" && (
            <input
              className="form-control mb-2"
              name="otherPerformance"
              value={formData.otherPerformance}
              onChange={handleChange}
              placeholder="Specify performance"
            />
          )}

          {/* GROUP CHECKBOX */}
          <div className="form-check my-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="isGroup"
              checked={formData.isGroup}
              onChange={handleChange}
            />
            <label className="form-check-label">Performing in a group?</label>
          </div>

          {/* GROUP MEMBERS */}
          {formData.isGroup && (
            <>
              <h6 className="mt-3">Group Members</h6>

              {formData.groupMembers.map((m, i) => (
                <div key={i} className="mb-2">
                  <div className="d-flex justify-content-between">
                    <label>Member {i + 1}:</label>

                    <MdDeleteOutline
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => removeMember(i)}
                    />
                  </div>

                  <input
                    className="form-control mb-2 mt-1"
                    placeholder="Full Name"
                    value={m.name}
                    onChange={(e) => updateMember(i, "name", e.target.value)}
                  />

                  <select
                    className="form-control mb-2"
                    name="batch"
                    value={m.batch}
                    onChange={(e) => updateMember(i, "batch", e.target.value)}
                  >
                    <option value="">Select Batch</option>
                    {Array.from({ length: 16 }, (_, i) => 2010 + i).map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>

                  <input
                    className="form-control mb-2"
                    placeholder="Contact"
                    value={m.contact}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      if (v.length <= 10) updateMember(i, "contact", v);
                    }}
                    maxLength={10}
                  />
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={addMember}
              >
                + Add Member
              </button>
            </>
          )}

          <button className="btn btn-primary w-100 mt-3" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Performance;
