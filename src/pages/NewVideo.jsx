import React, { useState } from "react";
import "./NewVideo.css";
import Swal from "sweetalert2";

const NewVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    video: "",
    description: "",
  });

  const API_URL = "https://apiproject-nu.vercel.app"; // Usar la nueva URL de la API

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/videos`, { // Usar la nueva URL de la API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el video");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire("Video added successfully!");
        setFormData({
          title: "",
          category: "",
          image: "",
          video: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error adding video:", error);
        Swal.fire("Error", "Hubo un problema al agregar el video", "error");
      });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      category: "",
      image: "",
      video: "",
      description: "",
    });
  };

  return (
    <div className="new-video">
      <h2>Agregar Nuevo Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Animation">Animation</option>
            <option value="Videogame">Videogame</option>
            <option value="Music">Music</option>
          </select>
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL completa de la imagen"
          />
        </div>
        <div className="form-group">
          <label>Video</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="URL completa del video"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-footer">
          <button type="submit" className="save-button">
            Guardar
          </button>
          <button type="button" className="clear-button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVideo;