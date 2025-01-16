import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NewVideo from "./pages/NewVideo";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  const [categories, setCategories] = useState({
    Animation: [],
    Videogame: [],
    Music: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/videos")
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




