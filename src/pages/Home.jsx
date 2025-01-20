import React, { useEffect, useState } from "react";
import Modal from "../components/Modal"; // Importa tu componente Modal personalizado
import VideoCard from "../components/VideoCard"; // Importa tu componente VideoCard
import "./Home.css"; // Importa el archivo CSS

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://apiproject-nu.vercel.app/api/videos")
      .then(response => response.json())
      .then(data => {
        const { videos } = data;  // Extrae el array de videos
        setVideos(videos);  // Establece el estado con el array de videos
      })
      .catch(error => console.error("Error fetching videos:", error));
  }, []);

  const handleClear = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const renderCategory = (categoryName, videos) => (
    <div className={`category ${categoryName.toLowerCase()}`}>
      <h2>{categoryName}</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );

  const animationVideos = videos.filter(video => video.category === 'Animation');
  const videogameVideos = videos.filter(video => video.category === 'Videogame');
  const musicVideos = videos.filter(video => video.category === 'Music');

  return (
    <div>
      <h1>Videos Categorías</h1>
      {renderCategory('Animación', animationVideos)}
      {renderCategory('Videojuegos', videogameVideos)}
      {renderCategory('Música', musicVideos)}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={handleClear}>
          <form>
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

