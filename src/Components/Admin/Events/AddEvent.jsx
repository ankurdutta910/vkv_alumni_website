import React, { useState } from "react";
import { supabase } from "../../../supabase"; // adjust path if needed

function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // upload main image
      const mainImageUrl = await uploadImage(mainImage);

      // upload additional images
      const galleryUrls = [];
      for (let img of galleryImages) {
        const url = await uploadImage(img);
        galleryUrls.push(url);
      }

      // save event data
      const { error } = await supabase.from("events").insert([
        {
          title,
          description,
          main_image: mainImageUrl,
          gallery_images: galleryUrls,
        },
      ]);

      if (error) throw error;

      alert("Event added successfully 🎉");
      setTitle("");
      setDescription("");
      setMainImage(null);
      setGalleryImages([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h2>Add Event</h2>

      <div className="main container-fluid">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="form-control"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Main Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            required
          />

          <label>Additional Images</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
          />

          <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
            {loading ? "Uploading..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
