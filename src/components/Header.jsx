// src/components/Header.jsx
import React from 'react';
import './Header.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar 
  expand="lg" 
  fixed="top" 
  className="shadow-sm" 
  style={{ backgroundColor: '#f8f9fa' }}
>
    <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src="/images/logo/project-cabottcapital-logo.png" 
            alt="Cabott Capital" 
            height="40" 
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="text-secondary">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/nosotros" className="text-secondary">Nosotros</Nav.Link>
          <Nav.Link as={Link} to="/servicios" className="text-secondary">Servicios</Nav.Link>
          <Nav.Link as={Link} to="/blog" className="text-secondary">Blog</Nav.Link>
          <Nav.Link as={Link} to="/contacto" className="text-secondary">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;