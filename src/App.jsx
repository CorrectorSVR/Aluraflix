import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import NewVideo from './pages/NewVideo';
import Banner from './components/Banner';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [categories, setCategories] = useState({
    Animation: [],
    Videogame: [],
    Music: [],
  });

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

        const animationVideos = videos.filter((video) => video.category === 'Animation');
        const videogameVideos = videos.filter((video) => video.category === 'Videogame');
        const musicVideos = videos.filter((video) => video.category === 'Music');
        setCategories({
          Animation: animationVideos,
          Videogame: videogameVideos,
          Music: musicVideos,
        });
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, [API_URL]);

  return (
    <Router>
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/new-video" element={<NewVideo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


