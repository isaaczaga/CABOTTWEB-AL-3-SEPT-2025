// src/components/common/Image.jsx
import React from 'react';

const Image = ({ name, alt, className = "", width, height, onClick }) => {
  // Define la ruta base de tus imágenes
  const basePath = "/Users/isaaczaga/cabott-capital-website/public/images/logo/project-cabottcapital-logo.png"; // ajusta esto según tu estructura de archivos
  
  return (
    <img 
      src={`${basePath}/${name}`} 
      alt={alt || "Imagen"} 
      className={className}
      width={width}
      height={height}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export default Image;