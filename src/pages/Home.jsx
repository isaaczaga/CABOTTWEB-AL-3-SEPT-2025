// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section text-white">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Soluciones financieras a la medida de su negocio</h1>
              <p className="lead">Ofrecemos créditos empresariales, factoraje financiero y arrendamiento con las mejores tasas del mercado.</p>
              <div className="d-flex gap-3">
                <Button variant="primary" size="lg" as={Link} to="/simulador">
                  Simular Crédito
                </Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contacto">
                  Contáctanos
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container className="py-5">
        <h2 className="text-center mb-5">Bienvenido a Cabott Capital</h2>
        <p className="text-center">
          Ofrecemos soluciones financieras diseñadas para impulsar el crecimiento de su empresa.
        </p>
      </Container>
    </div>
  );
};

export default Home;
