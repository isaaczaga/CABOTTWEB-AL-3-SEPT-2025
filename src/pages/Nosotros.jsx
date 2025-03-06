import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <Container className="py-5 my-5">
      <h1 className="text-center mb-5">CORPORATIVO</h1>
      <Row>
        <Col md={12}>
          <p>
            Dedicados principalmente al otorgamiento de créditos, estudiando las necesidades particulares de cada persona o empresa,
            y otorgando soluciones integrales para la generación de beneficios y crecimiento económico.
          </p>
        </Col>
      </Row>
      
      <div className="my-4"></div>
      
      <Row>
        <Col md={6} className="mb-4">
          <img src="/images/project-pic-corporate.jpg" alt="Corporativo" className="img-fluid rounded shadow" />
        </Col>
        <Col md={6}>
          <h2>Nosotros</h2>
          <p>
            Cabott Capital, es una sociedad financiera, que cuenta con experiencia, infraestructura, y capacidad técnica, para ofrecer
            el mayor beneficio a sus clientes, otorgando las soluciones más eficientes y adecuadas, acorde con
            las necesidades de cada uno de sus clientes.
          </p>
          <p>
            Cabott Capital, opera bajo los requisitos más exigentes y rigurosos de conformidad con las leyes aplicables. Provee servicios
            financieros, de la más alta calidad, generando crecimiento económico para sus clientes.
          </p>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col md={6}>
          <h2>Misión</h2>
          <p>
            La misión de Cabott Capital, es generar valor, y apoyar el crecimiento económico de sus clientes al otorgarles liquidez.
          </p>
        </Col>
        <Col md={6}>
          <h2>Visión</h2>
          <p>
            Generar eficiencia en los productos que ofrecemos y en la demanda del mercado, otorgando las soluciones más adecuadas para
            cada cliente, posicionándonos de tal forma, como una de las sociedades financieras de mayor prestigio,
            logrando importantes crecimientos en la economía.
          </p>
        </Col>
      </Row>
      
      <Row className="text-center mt-5">
        <Col md={12}>
          <small>
            Esta Institución Financiera no requiere de autorización de la Secretaria de Hacienda y Crédito Público, y no se encuentra
            supervisada por la Comisión Nacional Bancaria y de Valores en términos operativos.
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default Nosotros;