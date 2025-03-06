import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with the background image */}
      <div className="hero-section" style={{ 
        backgroundImage: `linear-gradient(rgba(70,70,70,0.7), rgba(70,70,70,0.7)), url("/images/building-skyscraper.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '0'
      }}>
        <Container className="text-center text-white">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                Soluciones financieras a la medida de su negocio
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                marginBottom: '2rem',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
              }}>
                Ofrecemos créditos empresariales y factoraje financiero con las mejores tasas del mercado.
              </p>
              <div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  href="/simulador"
                  style={{ 
                    backgroundColor: '#2a4d8f',
                    borderColor: '#2a4d8f',
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    marginRight: '1rem'
                  }}
                >
                  Simular Crédito
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  href="/contacto"
                  style={{ 
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem'
                  }}
                >
                  Contactar
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Rest of your homepage content would go here */}
      <div style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2 className="text-center mb-4" style={{ color: '#2a4d8f' }}>Lo mas imporante son nuestros clientes</h2>
          <Row className="mt-5">
            {/* Your existing content here */}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;