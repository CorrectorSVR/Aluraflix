import React, { useState, useEffect } from "react";
import "./Home.css";
import Modal from "../components/Modal";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [categories, setCategories] = useState({
    Animation: [],
    Videogame: [],
    Music: [],
  });

  useEffect(() => {
    fetch("https://apirest-flix.vercel.app/videos")
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
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDelete = (videoId) => {
    setCategories((prevCategories) => {
      const newCategories = { ...prevCategories };
      Object.keys(newCategories).forEach((category) => {
        newCategories[category] = newCategories[category].filter((video) => video.id !== videoId);
      });
      return newCategories;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log("Guardar cambios");
    closeModal();
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
              <input type="text" defaultValue={selectedVideo.title} />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select defaultValue={selectedVideo.category}>
                <option value="">Selecciona una categoría</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input type="text" defaultValue={selectedVideo.previewImage} />
            </div>
            <div className="form-group">
              <label>Video</label>
              <input type="text" defaultValue={selectedVideo.url} />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea defaultValue={selectedVideo.description}></textarea>
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

