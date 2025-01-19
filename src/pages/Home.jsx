import React, { useState, useEffect } from "react";
import "./Home.css";
import Modal from "../components/Modal";
import VideoCard from "../components/VideoCard";

const Home = ({ categories: initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const API_URL = "https://apiproject-nu.vercel.app"; // Usar la nueva URL de la API

  useEffect(() => {
    fetch(`${API_URL}/api/videos`) // Usar la nueva URL de la API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los videos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response data:", data); // Verificar la estructura de la respuesta de la API
        const videos = data.videos; // Acceder a la propiedad 'videos' dentro de la respuesta

        const animationVideos = videos.filter((video) => video.category === "Animation");
        const videogameVideos = videos.filter((video) => video.category === "Videogame");
        const musicVideos = videos.filter((video) => video.category === "Music");

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
    fetch(`${API_URL}/api/videos/${videoId}`, { // Usar la nueva URL de la API
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el video");
        }
        setCategories((prevCategories) => {
          const newCategories = { ...prevCategories };
          Object.keys(newCategories).forEach((category) => {
            newCategories[category] = newCategories[category].filter((video) => video.id !== videoId);
          });
          return newCategories;
        });
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

    fetch(`${API_URL}/api/videos`, { // Usar la nueva URL de la API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el video");
        }
        return response.json();
      })
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
              <input type="text" name="image" defaultValue={selectedVideo?.image || ""} placeholder="URL completa de la imagen" />
            </div>
            <div className="form-group">
              <label>Video</label>
              <input type="text" name="video" defaultValue={selectedVideo?.video || ""} placeholder="URL completa del video" />
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