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

  const API_URL = import.meta.env.VITE_API_URL; // Usar la variable de entorno

  useEffect(() => {
    fetch(`${API_URL}/videos`) // Usar la variable de entorno en la URL
      .then((response) => response.json())
      .then((data) => {
        const animationVideos = data.filter((video) => video.category === 'Animation');
        const videogameVideos = data.filter((video) => video.category === 'Videogame');
        const musicVideos = data.filter((video) => video.category === 'Music');
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




