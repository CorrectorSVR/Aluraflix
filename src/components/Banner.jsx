import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <section id="banner" className="banner">
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
}

export default Banner;

