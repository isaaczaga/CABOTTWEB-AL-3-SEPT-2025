import React from 'react';
import { Container } from 'react-bootstrap';

const AvisoPrivacidad = () => {
  return (
    <Container className="py-5 my-5">
      <h1 className="text-center mb-5">AVISO DE PRIVACIDAD</h1>
      
      <div className="bg-light p-4 rounded">
        <p className="font-weight-bold">Estimado(s) cliente(s):</p>
        
        <p>
          En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la "Ley"), CABOTT CAPITAL SAPI DE CV SOFOM ENR ("CABOTT CAPITAL"), le informa que la misma actúa como responsable de sus datos personales, y por este medio hace de su conocimiento el Aviso de Privacidad de Datos Personales (el "Aviso"):
        </p>
        
        <p>
          Cualquier documentación o información que usted(es) proporcione(n) a CABOTT CAPITAL, será tratada de manera confidencial, y podrá utilizarse para los siguiente fines: (i) análisis y discusión de la misma con los funcionarios y empleados de CABOTT CAPITAL, incluyendo sin limitar al COMITÉ DE CRÉDITO; (ii) compartirla con las Sociedades de Información Crediticia; (iii) para mantenerla en resguardo durante el tiempo que dure la relación contractual, y el plazo que la legislación vigente obligue; (iv) para cumplir con las disposiciones legales en materia de prevención de lavado de dinero, y cualquier otra legislación vigente; (v) para ser utilizada en procedimientos judiciales y extrajudiciales; (vi) para crear bases de datos propias; (vii) para fines publicitarios por parte de CABOTT CAPITAL, sus agencias filiales, subsidiarias, sucursales, o cualquier otra empresa que para tal efecto contrate CABOTT CAPITAL.
        </p>
        
        <p>
          CABOTT CAPITAL, ha implementado medidas de seguridad administrativas, físicas y técnicas para proteger sus datos personales. Usted puede contactarnos en días y horas hábiles, en nuestras oficinas ubicadas en Avenida Constituyentes 1070, tercer piso, int 305, Colonia Lomas Altas, Miguel Hidalgo, Ciudad de México, C.P. 11950.
        </p>
        
        <p>
          Si Usted mantiene una relación, y/o pretende solicitar un crédito con CABOTT CAPITAL, le pedimos consentir el aviso firmando al calce (incluyendo su nombre completo, el de su representada en caso de ser persona moral, y la fecha).
        </p>
        
        <p>
          CABOTT CAPITAL, se reserva el derecho en todo momento para modificar este aviso de privacidad.
        </p>
      </div>
    </Container>
  );
};

export default AvisoPrivacidad;