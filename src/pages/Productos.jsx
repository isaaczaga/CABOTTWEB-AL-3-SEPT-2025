import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Productos = () => {
  // Array con los productos financieros
  const productos = [
    {
      id: 1,
      titulo: "Crédito Simple",
      descripcion: "Financiamiento a corto y mediano plazo con una tasa competitiva. Ideal para capital de trabajo, expansión o adquisición de activos.",
      caracteristicas: [
        "Montos desde $500,000 hasta $10,000,000 MXN",
        "Plazos de 12 hasta 60 meses",
        "Tasa fija durante toda la vida del crédito",
        "Pagos mensuales fijos"
      ]
    },
    {
      id: 2,
      titulo: "Crédito Revolvente",
      descripcion: "Línea de crédito flexible que le permite disponer de los recursos cuando los necesite. Pague intereses solo por el monto utilizado.",
      caracteristicas: [
        "Disponibilidad inmediata de fondos",
        "Mayor flexibilidad para sus necesidades de capital",
        "Plazos de renovación anuales",
        "Pagos mensuales de interés, capital al vencimiento"
      ]
    },
    {
      id: 3,
      titulo: "Factoraje Financiero",
      descripcion: "Obtenga liquidez inmediata al descontar sus facturas por cobrar, sin necesidad de esperar a sus clientes.",
      caracteristicas: [
        "Adelanto de hasta el 90% del valor de sus facturas",
        "Plazos desde 30 hasta 120 días",
        "Mejore su flujo de efectivo sin endeudamiento adicional",
        "Gestión profesional de cobranza"
      ]
    },
    {
      id: 4,
      titulo: "Crédito para Auto",
      descripcion: "Financiamiento para adquirir vehículos nuevos o seminuevos para su empresa con condiciones preferenciales.",
      caracteristicas: [
        "Montos desde $200,000 hasta $1,500,000 MXN",
        "Plazos de hasta 60 meses",
        "Tasa preferencial para autos nuevos",
        "Mínimos requisitos"
      ]
    }
  ];

  // Estado para controlar la animación de texto
  const [animatedTexts, setAnimatedTexts] = useState({});
  const [visibleProducts, setVisibleProducts] = useState({});

  // Efecto para iniciar la animación cuando el componente se monta
  useEffect(() => {
    // Inicializar el estado para cada producto
    const initialVisibility = {};
    productos.forEach(producto => {
      initialVisibility[producto.id] = false;
    });
    setVisibleProducts(initialVisibility);

    // Mostrar productos secuencialmente con un retraso
    productos.forEach((producto, index) => {
      setTimeout(() => {
        setVisibleProducts(prev => ({
          ...prev,
          [producto.id]: true
        }));
        
        // Iniciar la animación de texto
        animateText(producto.id, producto.descripcion);
      }, 400 * (index + 1)); // Retraso escalonado para cada producto
    });
  }, []);

  // Función para animar el texto letra por letra
  const animateText = (productId, text) => {
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      setAnimatedTexts(prev => ({
        ...prev,
        [productId]: text.substring(0, currentIndex + 1)
      }));
      
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(textInterval);
      }
    }, 20); // Velocidad de la animación (ms por caracter)
  };

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/images/office-background.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '80px 0'
    }}>
      <Container>
        <h1 className="text-center mb-5" style={{ color: '#2a4d8f' }}>Nuestros Productos Financieros</h1>
        <p className="text-center mb-5">
          En Cabott Capital ofrecemos soluciones financieras adaptadas a las necesidades específicas de su empresa,
          con tasas competitivas y atención personalizada.
        </p>
        
        <Row>
          {productos.map(producto => (
            <Col md={6} key={producto.id} className="mb-4">
              <Card 
                className={`h-100 shadow-sm product-card ${visibleProducts[producto.id] ? 'visible' : ''}`}
                style={{ 
                  transform: visibleProducts[producto.id] ? 'translateY(0)' : 'translateY(50px)',
                  opacity: visibleProducts[producto.id] ? 1 : 0,
                  transition: 'all 0.8s ease',
                  borderRadius: '10px',
                  border: 'none',
                  overflow: 'hidden'
                }}
              >
                <Card.Body className="p-4">
                  <div className="product-icon mb-3" style={{ 
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#2a4d8f',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px'
                  }}>
                    {producto.id}
                  </div>
                  <Card.Title className="mb-3" style={{ color: '#2a4d8f', fontSize: '1.5rem' }}>
                    {producto.titulo}
                  </Card.Title>
                  <Card.Text style={{ minHeight: '80px' }}>
                    {animatedTexts[producto.id] || ''}
                  </Card.Text>
                  <h5 className="mt-4 mb-3">Características</h5>
                  <ul className="features-list">
                    {producto.caracteristicas.map((caracteristica, index) => (
                      <li key={index} 
                        style={{ 
                          marginBottom: '8px',
                          opacity: visibleProducts[producto.id] ? 1 : 0,
                          transform: visibleProducts[producto.id] ? 'translateX(0)' : 'translateX(-20px)',
                          transition: `all 0.5s ease ${0.8 + (index * 0.1)}s`
                        }}
                      >
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <div className="card-footer bg-white border-top-0 text-end">
                  <a href="/simulador" className="btn btn-outline-primary">Simular Crédito</a>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <p>¿Necesita más información sobre nuestros productos?</p>
          <a href="/contacto" className="btn btn-primary">Contacte a un Asesor</a>
        </div>
      </Container>
      
      <style jsx>{`
        .product-card {
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .product-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .features-list {
          padding-left: 20px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Productos;