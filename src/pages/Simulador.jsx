import React from 'react';
import { Container } from 'react-bootstrap';
import { FinancialSimulator } from '../components';

const Simulador = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Simulador Financiero</h1>
      <FinancialSimulator />
    </Container>
  );
};

export default Simulador;