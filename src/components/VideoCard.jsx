import React, { useState } from "react";
import "./VideoCard.css";
import Modal from "./Modal";
import Swal from "sweetalert2";

const VideoCard = ({ video, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

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
        fetch(`https://apiproject-nu.vercel.app/api/videos/${video.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire(
                '¡Eliminado!',
                'El video ha sido eliminado.',
                'success'
              );
              onDelete(video.id);
            } else {
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el video.',
                'error'
              );
            }
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
      <img src={video.previewImage} alt={video.title} />
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
                src={video.url.replace("watch?v=", "embed/")}
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

