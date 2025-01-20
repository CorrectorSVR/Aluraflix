import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewVideo.css";

function NewVideo() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Animation",
    image: "",
    video: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://apiproject-nu.vercel.app/api/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Video added successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  return (
    <main className="new-video">
      <h1>Nuevo Video</h1>
      <form className="new-video-form" onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Animation">Animación</option>
            <option value="Videogame">Videojuegos</option>
            <option value="Music">Música</option>
          </select>
        </label>
        <label>
          Imagen:
          <input
            type="url"
            name="image"
            placeholder="URL de la imagen"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Video:
          <input
            type="url"
            name="video"
            placeholder="URL del video"
            value={formData.video}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <div className="form-actions">
          <button type="submit">Guardar</button>
          <button type="reset" onClick={() => setFormData({ title: "", category: "Animation", image: "", video: "", description: "" })}>Limpiar</button>
        </div>
      </form>
    </main>
  );
}

export default NewVideo;

