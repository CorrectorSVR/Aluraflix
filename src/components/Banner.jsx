import React from "react";

import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      
      <img 
        src="/Cinemagirl.jpg" 
        alt="Chica en el cine" 
        className="banner__image" 
      />
      <div className="banner__overlay">
        <h2 className="banner__title">Plataforma para gestionar videos</h2>
      </div>
    </section>
  );
};

export default Banner;

