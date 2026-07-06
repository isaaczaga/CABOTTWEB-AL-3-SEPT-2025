import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// Importar el componente BuroLink existente
import BuroLink from './components/BuroLink';
// Importar el componente Chatbot
import ChatbotButton from './components/ChatbotButton';
import ProtectedRoute from './components/ProtectedRoute';

// Importa las páginas
import Home from './pages/Home';
import Simulador from './pages/Simulador';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import AdminChat from './pages/AdminChat';

function App() {
  // State para manejar el aviso importante
  const [showNotice, setShowNotice] = useState(true);

  // Ocultar el aviso después de 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Logo de la empresa fijo en la esquina superior izquierda */}
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease'
        }}>
          <Link to="/">
            <img
              src="/images/logo/project-cabottcapital-logo.png"
              alt="Cabott Capital Logo"
              width="80"
              height="80"
              style={{ display: 'block' }}
            />
          </Link>
        </div>

        {/* Componente BuroLink - ya tiene su propia posición fixed */}
        <BuroLink />

        {/* Componente ChatbotButton */}
        <ChatbotButton />

        {/* Aviso importante que se muestra por 10 segundos */}
        {showNotice && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#2a4d8f',
            color: 'white',
            padding: '12px 0',
            zIndex: 999,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            textAlign: 'center'
          }}>
            <Container>
              <div className="text-center">
                <span style={{ fontWeight: 'bold' }}>AVISO IMPORTANTE:</span> Nuevas tasas especiales disponibles para créditos PyMEs. ¡Solicite ahora!
                <button
                  onClick={() => setShowNotice(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* Navbar con padding extra por el logo fijo */}
        <Navbar expand="lg" className="navbar-dark bg-primary" style={{ paddingLeft: '100px' }}>
          <Container>
            <Navbar.Brand as={Link} to="/">Cabott Capital</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/simulador">Simulador Financiero</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Ajustar el contenido principal para evitar que se solape con los avisos */}
        <div style={{ paddingTop: showNotice ? '60px' : '0' }}>
          {/* Banner con mensaje dinámico entre el menú y los botones */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div style={{
            backgroundColor: '#2a4d8f',
            padding: '30px 0',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <Container>
              <h2 style={{
                color: 'white',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                maxWidth: '1000px',
                margin: '0 auto',
                lineHeight: '1.4',
                animation: 'fadeIn 1.5s'
              }}>
                Soluciones financieras a la medida de su negocio, enfocados en dar el mejor servicio y atención a nuestros clientes.
              </h2>
            </Container>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin-chat" element={<AdminChat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
