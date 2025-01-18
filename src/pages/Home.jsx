import React, { useState, useEffect } from "react";
import "./Home.css";
import Modal from "../components/Modal";
import VideoCard from "../components/VideoCard";

const Home = ({ categories: initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

  useEffect(() => {
    fetch(`${API_URL}/videos`) // Usar la variable de entorno en la URL
      .then((response) => response.json())
      .then((data) => {
        const animationVideos = data.filter((video) => video.category === "Animation");
        const videogameVideos = data.filter((video) => video.category === "Videogame");
        const musicVideos = data.filter((video) => video.category === "Music");
        setCategories({
          Animation: animationVideos,
          Videogame: videogameVideos,
          Music: musicVideos,
        });
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [API_URL]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = (videoId) => {
    fetch(`${API_URL}/videos/${videoId}`, { // Usar la variable de entorno en la URL
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCategories((prevCategories) => {
            const newCategories = { ...prevCategories };
            Object.keys(newCategories).forEach((category) => {
              newCategories[category] = newCategories[category].filter((video) => video.id !== videoId);
            });
            return newCategories;
          });
        } else {
          console.error("Error deleting video");
        }
      })
      .catch((error) => console.error("Error deleting video:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const newVideo = {
      id: Date.now().toString(),
      title: event.target.title.value,
      category: event.target.category.value,
      image: event.target.image.value,
      video: event.target.video.value,
      description: event.target.description.value,
    };

    fetch(`${API_URL}/videos`, { // Usar la variable de entorno en la URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories((prevCategories) => {
          const newCategories = { ...prevCategories };
          newCategories[data.category].push(data);
          return newCategories;
        });
        closeModal();
      })
      .catch((error) => console.error("Error adding video:", error));
  };

  const handleClear = () => {
    console.log("Limpiar formulario");
  };

  return (
    <div>
      {Object.keys(categories).map((category) => (
        <div key={category} className={`category ${category.toLowerCase()}`}>
          <h2>{category}</h2>
          <div className="video-grid">
            {categories[category].map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Título</label>
              <input type="text" name="title" defaultValue={selectedVideo?.title || ""} />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select name="category" defaultValue={selectedVideo?.category || ""}>
                <option value="">Selecciona una categoría</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input type="text" name="image" defaultValue={selectedVideo?.image || ""} />
            </div>
            <div className="form-group">
              <label>Video</label>
              <input type="text" name="video" defaultValue={selectedVideo?.video || ""} />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea name="description" defaultValue={selectedVideo?.description || ""}></textarea>
            </div>
            <div className="modal-footer">
              <button type="submit" className="save-button">Guardar</button>
              <button type="button" className="clear-button" onClick={handleClear}>Limpiar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Home;