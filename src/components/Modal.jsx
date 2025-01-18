import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ video, onClose, isViewing, onSave }) => {
  const [formData, setFormData] = useState({
    title: video.title,
    category: video.category,
    image: video.image,
    video: video.video,
    description: video.description,
  });

  const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

  useEffect(() => {
    setFormData({
      title: video.title,
      category: video.category,
      image: video.image,
      video: video.video,
      description: video.description,
    });
  }, [video, isViewing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/videos/${video.id}`, { // Usar la variable de entorno en la URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Video updated successfully!");
        onSave(formData);
        onClose();
      })
      .catch((error) => console.error("Error updating video:", error));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {isViewing ? (
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={video.video.replace("watch?v=", "embed/")}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
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
              />
            </div>
            <div className="form-group">
              <label>Video</label>
              <input
                type="text"
                name="video"
                value={formData.video}
                onChange={handleChange}
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
            <div className="modal-footer">
              <button type="submit" className="save-button">
                Guardar
              </button>
              <button type="button" className="clear-button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;