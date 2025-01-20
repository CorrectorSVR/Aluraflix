import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NewVideo from "./pages/NewVideo";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import "./styles/global.css"; // Asegúrate de tener este archivo para tus estilos globales

function App() {
  const [categories, setCategories] = useState({
    Animation: [],
    Videogame: [],
    Music: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://apiproject-nu.vercel.app/api/videos')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Respuesta completa de la API:', data); // Imprime toda la respuesta de la API
        console.log('Tipo de datos de la respuesta:', typeof data); // Imprime el tipo de datos de la respuesta

        // Verificamos si la respuesta contiene 'videos' como un array
        if (data && data.videos && Array.isArray(data.videos)) {
          const animationVideos = data.videos.filter((video) => video.category === 'Animation');
          const videogameVideos = data.videos.filter((video) => video.category === 'Videogame');
          const musicVideos = data.videos.filter((video) => video.category === 'Music');

          // Actualizamos el estado con los videos filtrados
          setCategories({
            Animation: animationVideos,
            Videogame: videogameVideos,
            Music: musicVideos,
          });
        } else {
          setError('La propiedad "videos" no es un array o no está presente.');
          console.error('La propiedad "videos" no es un array o no está presente:', data);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Header />
      <Banner />
      <div className="app-container">
        <h1>Videos Categorías</h1>

        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div>
            <h2>Animación</h2>
            <ul>
              {categories.Animation.map((video, index) => (
                <li key={index}>{video.title}</li>
              ))}
            </ul>

            <h2>Videojuegos</h2>
            <ul>
              {categories.Videogame.map((video, index) => (
                <li key={index}>{video.title}</li>
              ))}
            </ul>

            <h2>Música</h2>
            <ul>
              {categories.Music.map((video, index) => (
                <li key={index}>{video.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-video" element={<NewVideo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;