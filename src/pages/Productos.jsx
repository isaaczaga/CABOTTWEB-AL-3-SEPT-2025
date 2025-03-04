import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Productos = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Nuestros Productos</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Crédito Simple</Card.Title>
              <Card.Text>
                Línea de crédito con amortizaciones mensuales que incluyen capital e intereses.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Crédito Revolvente</Card.Title>
              <Card.Text>
                Disposiciones según sus necesidades con la flexibilidad de volver a disponer una vez pagado.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Factoraje Financiero</Card.Title>
              <Card.Text>
                Descuento de documentos a cargo de terceros con plazos determinados.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Arrendamiento</Card.Title>
              <Card.Text>
                Financiamiento a plazo con opción de adquirir el bien al término del contrato.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Productos;