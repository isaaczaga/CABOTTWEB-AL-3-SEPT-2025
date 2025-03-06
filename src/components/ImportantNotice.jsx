import React, { useState, useEffect } from 'react';

const ImportantNotice = () => {
  // Estado para controlar la visibilidad del aviso
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-cierre después de 15 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Si no es visible, no renderizamos nada
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center">
      {/* Botón X a la izquierda */}
      <button 
        onClick={() => setIsVisible(false)} 
        className="border border-gray-600 h-10 w-10 flex items-center justify-center bg-white text-black font-bold m-1"
        aria-label="Cerrar aviso"
      >
        X
      </button>
      
      {/* Mensaje principal con texto oscuro sobre fondo azul claro */}
      <div className="bg-blue-200 text-blue-900 py-3 px-4 font-bold text-center w-full">
        AVISO IMPORTANTE - CABOTT CAPITAL - NO PIDE PAGOS ADELANTADOS BAJO LA PROMESA DE OTORGAR PRESTAMOS. ¡QUE NO TE SORPRENDAN!
      </div>
    </div>
  );
};

export default ImportantNotice;