import React, { useState, useEffect } from "react";
import "./Modal.css";

function Modal({ video, onClose, onSave, isViewing, children }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Animation",
    previewImage: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    if (video && !isViewing) {
      setFormData(video);
    }
  }, [video, isViewing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://apiproject-nu.vercel.app/api/videos/${video.id}`, {
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
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          {isViewing ? (
            children
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Animation">Animation</option>
                  <option value="Videogame">Videogame</option>
                  <option value="Music">Music</option>
                </select>
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <input type="text" name="previewImage" value={formData.previewImage} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>URL del Video</label>
                <input type="text" name="url" value={formData.url} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="modal-footer">
                <button type="submit" className="save-button">Guardar</button>
                <button type="button" className="clear-button" onClick={() => setFormData(video)}>Limpiar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;

