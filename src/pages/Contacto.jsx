import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    comentarios: ''
  });
  
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulación de envío
    console.log('Formulario enviado:', formData);
    setShowSuccess(true);
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      comentarios: ''
    });
    setValidated(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  return (
    <Container className="py-5 my-5">
      <h1 className="text-center mb-5">CONTACTO</h1>
      
      <Row>
        <Col md={6} className="mb-4">
          <h3><i className="fas fa-envelope mr-2"></i> Envíanos un mensaje</h3>
          <p>Utiliza el siguiente formulario y en breve nos pondremos en contacto contigo.</p>
          
          {showSuccess && (
            <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
              ¡Gracias por contactarnos! Nos pondremos en contacto contigo a la brevedad.
            </Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu nombre.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mt-3">
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu teléfono.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mt-3">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un correo electrónico válido.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mt-3">
              <Form.Label>Comentarios:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="comentarios"
                value={formData.comentarios}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tus comentarios.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Enviar Información
            </Button>
          </Form>
        </Col>
        
        <Col md={6}>
          <h3><i className="fas fa-map-marker-alt mr-2"></i> Corporativo</h3>
          <p>
            Avenida Constituyentes 1070, tercer piso, int 305, Colonia Lomas Altas, Miguel Hidalgo, Ciudad de México, C.P. 11950
          </p>
          
          <div id="map" className="rounded mb-4" style={{ height: '400px', width: '100%' }}>
            {/* El mapa se cargará aquí con JavaScript */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.689015134291!2d-99.21669318509037!3d19.42170498689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201fcffaaaaab%3A0xb3f49e0900720957!2sAv.%20Constituyentes%201070%2C%20Lomas%20Altas%2C%20Miguel%20Hidalgo%2C%2011950%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1646166825145!5m2!1ses-419!2smx" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
          
          <p>
            Para cualquier aclaración o reclamación, se puede poner en contacto con el titular.
          </p>
          <p>
            <strong>Unidad especializada de atención a usuarios:</strong><br />
            Lic. Isaac Zaga Hop<br />
            Teléfonos: (55) 44 30 90 61, (55) 44 30 90 62 y (55) 44 30 90 63
          </p>
          <p>
            Correo electrónico:
            <a href="mailto:isaaczaga@cabottcapital.mx"> isaaczaga@cabottcapital.mx</a>
          </p>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col md={12}>
          <div className="bg-light p-4 rounded">
            <h4>Leyendas de Advertencia</h4>
            <ul>
              <li>Incumplir tus obligaciones te puede generar comisiones e intereses moratorios.</li>
              <li>Contratar créditos por arriba de tu capacidad de pago puede afectar tu historial crediticio.</li>
              <li>El avalista, obligado solidario o coacreditado responderá como obligado principal frente a la entidad financiera.</li>
            </ul>
            
            <h4>Recomendación a Usuarios</h4>
            <p>
              Cuide su imagen crediticia de lo contrario su imagen será afectada. Es importante pague su crédito y sus intereses generados puntualmente, ya que la clasificación crediticia muestra su responsabilidad, por la que será reportada a buró de crédito y recuerde, que de su cumplimiento dependerá de su aprobación de nuevos créditos en esta y nuevas instituciones.
            </p>
            
            <p className="text-primary font-italic">
              Esta sociedad financiera no requiere autorización ni se encuentra supervisada por la Secretaría de Hacienda y Crédito Público, ni tampoco por la Comisión Nacional Bancaria y de Valores, únicamente está supervisada por ésta última por lo que hace a la prevención de lavado de dinero.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;