import React, { useState, useEffect, useRef } from 'react';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "¡Hola! Soy el asistente virtual de Cabott Capital. ¿En qué puedo ayudarte hoy?", 
      sender: "bot" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  // Generate session ID if not exists
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 1 && sessionId) {
      saveConversationToStorage();
    }
  }, [messages, sessionId]);

  const saveConversationToStorage = () => {
    try {
      // Get existing conversations or initialize empty object
      const conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '{}');
      
      // Update this conversation
      conversations[sessionId] = {
        sessionId,
        messages,
        userInfo: {
          pagePath: window.location.pathname,
          userAgent: navigator.userAgent,
          startTime: new Date().toISOString()
        }
      };
      
      // Save back to localStorage
      localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  // Simple bot responses
  // Replace the getResponse function in your ChatbotButton.jsx with this enhanced version:

const getResponse = (message) => {
    const lowerMsg = message.toLowerCase().trim();
    
    // Greeting patterns
    if (lowerMsg.includes('hola') || lowerMsg.includes('buenos días') || 
        lowerMsg.includes('buenas tardes') || lowerMsg.includes('buenas noches') || 
        lowerMsg === 'hi' || lowerMsg === 'hello') {
      return "¡Hola! ¿En qué puedo ayudarte hoy? Puedes preguntar sobre nuestros créditos, tasas, requisitos u otros servicios.";
    }
    
    // Live agent request patterns
    if (lowerMsg.includes('agente') || lowerMsg.includes('persona') || 
        lowerMsg.includes('humano') || lowerMsg.includes('asesor real') || 
        lowerMsg.includes('hablar con alguien')) {
      return "En este momento estamos guardando tu solicitud. Un asesor revisará tu mensaje pronto y te contactará. ¿Hay algo más en lo que pueda ayudarte mientras tanto?";
    }
    
    // Credit and loan information
    if (lowerMsg.includes('credito') || lowerMsg.includes('crédito') || 
        lowerMsg.includes('prestamo') || lowerMsg.includes('préstamo') || 
        lowerMsg.includes('financiamiento')) {
      if (lowerMsg.includes('tipo') || lowerMsg.includes('clase') || lowerMsg.includes('opciones')) {
        return "Ofrecemos varios tipos de créditos: Crédito Simple, Crédito Revolvente, Crédito para Auto y Factoraje Financiero. Cada uno está diseñado para diferentes necesidades empresariales. ¿Sobre cuál te gustaría más información?";
      }
      return "Ofrecemos créditos empresariales con montos desde $500,000 hasta $10,000,000 MXN. Puede simular su crédito en nuestra página de Simulador Financiero para ver cuotas estimadas o contactar a un asesor para un análisis personalizado.";
    }
    
    // Interest rate questions
    if (lowerMsg.includes('tasa') || lowerMsg.includes('interes') || 
        lowerMsg.includes('interés') || lowerMsg.includes('costo') || 
        lowerMsg.includes('cat')) {
      return "Nuestras tasas de interés inician desde 18.5% anual, dependiendo del tipo de crédito, monto, plazo y perfil del cliente. El CAT (Costo Anual Total) incluye comisiones adicionales. Utilice nuestro simulador para calcular pagos aproximados con diferentes tasas.";
    }
    
    // Application requirements
    if (lowerMsg.includes('requisito') || lowerMsg.includes('solicitar') || 
        lowerMsg.includes('aplicar') || lowerMsg.includes('documentos') || 
        lowerMsg.includes('papeles')) {
      return "Para solicitar un crédito necesitará: 1) Identificación oficial, 2) Comprobante de domicilio, 3) Estados financieros de los últimos 2 años, 4) Estados de cuenta bancarios de los últimos 6 meses, 5) Alta en el SAT y 6) Comprobante de ingresos. Los requisitos pueden variar según el tipo de crédito y monto solicitado.";
    }
    
    // Contact information
    if (lowerMsg.includes('contacto') || lowerMsg.includes('teléfono') || 
        lowerMsg.includes('telefono') || lowerMsg.includes('correo') || 
        lowerMsg.includes('email') || lowerMsg.includes('oficina') || 
        lowerMsg.includes('dirección') || lowerMsg.includes('ubicacion')) {
      return "Puede contactarnos al (55) 4430-9061, por correo a info@cabottcapital.com, o visitar nuestras oficinas en Av. Paseo de la Reforma 383, Col. Cuauhtémoc, Ciudad de México. También puede usar nuestro formulario de contacto en la página web.";
    }
    
    // Factoring service
    if (lowerMsg.includes('factoraje') || lowerMsg.includes('factura') || 
        lowerMsg.includes('descuento') || lowerMsg.includes('anticipo')) {
      return "Nuestro servicio de factoraje financiero le permite obtener liquidez inmediata al descontar sus facturas por cobrar. Ofrecemos tasas competitivas y un proceso ágil. Es ideal para empresas que no quieren esperar 30, 60 o 90 días para cobrar a sus clientes. ¿Le interesa conocer más detalles específicos?";
    }
    
    // Auto credit
    if (lowerMsg.includes('auto') || lowerMsg.includes('carro') || 
        lowerMsg.includes('vehículo') || lowerMsg.includes('vehiculo') || 
        lowerMsg.includes('coche')) {
      return "Nuestro crédito para auto ofrece financiamiento para adquisición de vehículos para su empresa con tasas competitivas, plazos de hasta 60 meses y opciones de pago flexibles. Aplica para autos nuevos y seminuevos (hasta 5 años de antigüedad).";
    }
    
    // Terms and conditions
    if (lowerMsg.includes('plazo') || lowerMsg.includes('término') || 
        lowerMsg.includes('termino') || lowerMsg.includes('duración') || 
        lowerMsg.includes('duracion') || lowerMsg.includes('periodo') || 
        lowerMsg.includes('años') || lowerMsg.includes('meses')) {
      return "Nuestros plazos de financiamiento van desde 3 hasta 60 meses, dependiendo del tipo de crédito. Para créditos simples y de auto ofrecemos hasta 60 meses, mientras que para factoraje los plazos son más cortos, generalmente entre 3 y 12 meses.";
    }
    
    // Simulator questions
    if (lowerMsg.includes('simulador') || lowerMsg.includes('calcular') || 
        lowerMsg.includes('calculadora') || lowerMsg.includes('simular')) {
      return "Nuestro simulador financiero le permite calcular cuotas, intereses y el costo total de su préstamo. Puede acceder al simulador desde el menú principal o directamente en la sección 'Simulador Financiero'. Allí podrá ajustar montos, plazos y tasas para encontrar la opción que mejor se adapte a sus necesidades.";
    }
    
    // Payment questions
    if (lowerMsg.includes('pago') || lowerMsg.includes('cuota') || 
        lowerMsg.includes('amortización') || lowerMsg.includes('amortizacion') || 
        lowerMsg.includes('liquidar') || lowerMsg.includes('adelantar')) {
      return "Los pagos de nuestros créditos son mensuales mediante transferencia bancaria o depósito. Puede realizar pagos anticipados sin penalización para reducir intereses. Para más detalles sobre su plan de pagos específico, le recomendamos usar nuestro simulador o consultar con un asesor.";
    }
    
    // Thank you and goodbye
    if (lowerMsg.includes('gracias') || lowerMsg.includes('adios') || 
        lowerMsg.includes('adiós') || lowerMsg.includes('hasta luego') || 
        lowerMsg.includes('nos vemos')) {
      return "¡Gracias por comunicarse con Cabott Capital! Ha sido un placer atenderle. Si tiene más preguntas en el futuro, no dude en contactarnos nuevamente. ¡Que tenga un excelente día!";
    }
    
    // Default response for unrecognized queries
    return "Gracias por su mensaje. Para información más específica sobre " + message + ", le recomendamos contactar directamente a uno de nuestros asesores al (55) 4430-9061 o utilizar nuestro formulario de contacto. ¿Hay algo más en lo que pueda ayudarle?";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    
    // Simulate typing delay and add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: getResponse(inputValue), sender: "bot" }]);
    }, 1000);
    
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#2a4d8f',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 998,
          transition: 'all 0.3s',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          )}
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className="chat-window"
          style={{
            position: 'fixed',
            bottom: '170px',
            right: '20px',
            width: '350px',
            height: '450px',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
          }}
        >
          {/* Chat header */}
          <div
            className="chat-header"
            style={{
              backgroundColor: '#2a4d8f',
              color: 'white',
              padding: '15px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/images/logo/project-cabottcapital-logo.png" 
                alt="Cabott Logo" 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  marginRight: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  padding: '2px'
                }} 
              />
              <span>Asistente Cabott Capital</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages container */}
          <div
            className="messages-container"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              backgroundColor: '#f5f7fb',
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender}`}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#2a4d8f' : 'white',
                  color: message.sender === 'user' ? 'white' : '#333',
                  padding: '10px 15px',
                  borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  maxWidth: '80%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            className="input-container"
            style={{
              padding: '15px',
              borderTop: '1px solid #eaeaea',
              display: 'flex',
              backgroundColor: 'white',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje aquí..."
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                marginRight: '10px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: '#2a4d8f',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;