import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5>Cabott Capital</h5>
            <p>Soluciones financieras para empresas y personas físicas con actividad empresarial, orientada al crecimiento sostenible y al desarrollo de negocios.</p>
            <p>
              <Link to="/aviso-privacidad" className="text-white">Aviso de Privacidad</Link>
            </p>
          </Col>
          <Col lg={4} className="mb-4">
            <h5>Contacto</h5>
            <address>
              Avenida Constituyentes 1070, tercer piso, int 305<br />
              Colonia Lomas Altas, Miguel Hidalgo<br />
              Ciudad de México, C.P. 11950<br />
              Tel.: 01 (55) 4430-9061 al 63
            </address>
          </Col>
          <Col lg={4} className="mb-4">
            <h5>Enlaces de interés</h5>
            <ul className="list-unstyled">
              <li><a href="http://www.condusef.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-white">CONDUSEF</a></li>
              <li><a href="http://www.cnbv.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-white">CNBV</a></li>
              <li><a href="http://www.banxico.org.mx/" target="_blank" rel="noopener noreferrer" className="text-white">Banxico</a></li>
              <li><a href="https://www.buro.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-white">Buró de Entidades Financieras</a></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12} className="text-center">
            <p className="small mb-0">&copy; Cabott Capital® Todos los Derechos Reservados. México {new Date().getFullYear()}.</p>
            <p className="small mt-2">Esta SOFOM ENR está sujeta a la supervisión de la CNBV exclusivamente en materia de prevención de lavado de dinero y financiamiento al terrorismo.</p>
          </Col>
        </Row>
        
        <Row className="mt-3">
          <Col md={12}>
            <div className="bg-secondary p-3 rounded small">
              <strong>Advertencias:</strong>
              <ul className="mb-1">
                <li>Incumplir tus obligaciones te puede generar comisiones e intereses moratorios.</li>
                <li>Contratar créditos por arriba de tu capacidad de pago puede afectar tu historial crediticio.</li>
                <li>El avalista, obligado solidario o coacreditado responderá como obligado principal frente a la entidad financiera.</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;