import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Añade esta línea
import './index.css';
import App from './App';  // O CabottApp, dependiendo de cómo hayas nombrado tu componente
import './styles/App.css';
// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar jQuery y Bootstrap JS (si necesitas componentes interactivos)
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Hacer jQuery disponible globalmente si es necesario
window.$ = $;
window.jQuery = $;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);