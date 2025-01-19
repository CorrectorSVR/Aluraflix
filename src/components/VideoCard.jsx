import React, { useState } from "react";
import "./VideoCard.css";
import Modal from "./Modal";
import Swal from "sweetalert2";

const VideoCard = ({ video, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const API_URL = "https://apiproject-nu.vercel.app"; // Usar la nueva URL de la API

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/api/videos/${video.id}`, { // Usar la nueva URL de la API
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar el video");
            }
            Swal.fire(
              '¡Eliminado!',
              'El video ha sido eliminado.',
              'success'
            );
            onDelete(video.id);
          })
          .catch((error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el video.',
              'error'
            );
            console.error("Error deleting video:", error);
          });
      }
    });
  };

  const handleView = () => {
    setIsViewing(true);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setIsViewing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="video-card">
      <img src={video.image} alt={video.title} onError={(e) => { e.target.onerror = null; e.target.src = "default-image-url.jpg"; }} /> {/* Verificar que la URL de la imagen sea completa */}
      <h3>{video.title}</h3>
      <div className="actions">
        <button onClick={handleEdit}>Editar</button>
        <button className="delete" onClick={handleDelete}>Borrar</button>
        <button className="view-button" onClick={handleView}>Ver Video</button>
      </div>
      {isModalOpen && (
        <Modal video={video} onClose={closeModal} isViewing={isViewing} onSave={onEdit}>
          {isViewing && (
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
          )}
        </Modal>
      )}
    </div>
  );
};

export default VideoCard;