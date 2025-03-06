import React, { useState, useEffect } from 'react';

/**
 * Este componente actúa como un wrapper que añade el aviso importante 
 * a cualquier contenido existente sin modificarlo
 */
const LayoutWithNotice = ({ children }) => {
  // Estado para el aviso importante
  const [showNotice, setShowNotice] = useState(true);
  
  // Auto-cierre después de 15 segundos
  useEffect(() => {
    if (showNotice) {
      const timer = setTimeout(() => {
        setShowNotice(false);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotice]);
  
  return (
    <>
      {/* Aviso Importante - con estilos inline para evitar interferencias */}
      {showNotice && (
        <div style={{
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center'
          }}
          id="important-notice"
        >
          {/* Botón X */}
          <button 
            onClick={() => setShowNotice(false)} 
            style={{
              border: '1px solid #666',
              height: '40px',
              width: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              margin: '4px'
            }}
            aria-label="Cerrar aviso"
          >
            X
          </button>
          
          {/* Mensaje principal */}
          <div style={{
              backgroundColor: '#BFDBFE', // bg-blue-200
              color: '#1E3A8A', // text-blue-900
              padding: '12px 16px',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%'
            }}>
            AVISO IMPORTANTE - CABOTT CAPITAL - NO PIDE PAGOS ADELANTADOS BAJO LA PROMESA DE OTORGAR PRESTAMOS. ¡QUE NO TE SORPRENDAN!
          </div>
        </div>
      )}
      
      {/* Contenido existente - con padding-top cuando el aviso está visible */}
      <div style={{ 
        paddingTop: showNotice ? '50px' : '0', 
        transition: 'padding-top 0.3s'
      }}>
        {children}
      </div>
    </>
  );
};

export default LayoutWithNotice;