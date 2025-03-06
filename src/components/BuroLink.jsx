// src/components/BuroLink.jsx
import React from 'react';

const BuroLink = () => {
  return (
    <div className="buro-link-container">
      <a 
        href="https://www.buro.gob.mx/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Buró de Entidades Financieras"
      >
        <img 
          src="/images/buro-entidades-financieras.png" 
          alt="Buró de Entidades Financieras" 
          className="buro-logo"
        />
      </a>
      
      <style jsx>{`
        .buro-link-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          transition: transform 0.3s;
        }
        
        .buro-link-container:hover {
          transform: scale(1.05);
        }
        
        .buro-logo {
          width: 100px;
          height: auto;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .buro-link-container {
            bottom: 10px;
            right: 10px;
          }
          
          .buro-logo {
            width: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuroLink;