import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Row, Col, Alert, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const FinancialSimulator = () => {
  // Estados para los valores del simulador
  const [loanType, setLoanType] = useState('simple');
  const [amount, setAmount] = useState(500000);
  const [formattedAmount, setFormattedAmount] = useState("$500,000");
  const [term, setTerm] = useState(12);
  const [rate, setRate] = useState(18.5);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [cat, setCat] = useState(0);
  
  // Referencias para formateo
  const amountInputRef = useRef(null);

  // Función para formatear números con comas para miles
  const formatNumberWithCommas = (value) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  };

  // Manejo del cambio en el monto con formato
  const handleAmountChange = (e) => {
    // Obtenemos solo los dígitos del valor
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    
    // Convertir a número
    const numValue = parseInt(rawValue || "0", 10);
    
    // Actualizar el estado del monto numérico
    setAmount(numValue);
    
    // Formatear para mostrar
    setFormattedAmount(formatNumberWithCommas(numValue));
  };

  // Función para exportar la tabla a Excel
  const exportToExcel = () => {
    const tableData = [
      // Fila de encabezados
      [
        'Periodo', 
        loanType === 'factoraje' ? 'Disposición' : '', 
        'Pago', 
        'Capital', 
        'Interés', 
        'Saldo'
      ].filter(header => header !== '')
    ];
    
    // Filas de datos
    paymentSchedule.forEach(row => {
      const rowData = [
        row.period === 0 ? 'Inicio' : row.period,
        loanType === 'factoraje' ? (row.disposicion !== undefined ? row.disposicion : '') : undefined,
        loanType === 'factoraje' && row.period === 0 ? 0 : row.payment,
        row.principal,
        row.interest,
        row.balance
      ];
      
      // Filtrar campos undefined si no es factoraje
      const filteredRow = loanType === 'factoraje' ? rowData : rowData.filter((_, index) => index !== 1);
      tableData.push(filteredRow);
    });
    
    // Crear hoja de Excel
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Amortización");
    
    // Generar el archivo
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = `${loanType === 'factoraje' ? 'Flujo_Factoraje' : 'Tabla_Amortizacion'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Descargar el archivo
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);
  };

  // Calcular el plan de pagos cuando cambien los valores
  useEffect(() => {
    calculatePayments();
  }, [amount, term, rate, loanType]);

  // Función para calcular pagos y CAT correctamente
  const calculatePayments = () => {
    let schedule = [];
    let totalInt = 0;
    let totalPay = 0;
    
    if (loanType === 'simple' || loanType === 'auto') {
      // Préstamo con amortización
      const monthlyRate = rate / 100 / 12;
      const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
      
      let balance = amount;
      
      for (let i = 1; i <= term; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance -= principal;
        
        schedule.push({
          period: i,
          payment: monthlyPayment,
          principal: principal,
          interest: interest,
          balance: balance > 0 ? balance : 0
        });
        
        totalInt += interest;
        totalPay += monthlyPayment;
      }
      
      // Cálculo del CAT para créditos con amortización
      const comisionApertura = amount * 0.01; // Comisión de apertura del 1%
      const montoRecibido = amount - comisionApertura;
      const flujos = [];
      flujos.push(-montoRecibido);
      for (let i = 0; i < term; i++) {
        flujos.push(monthlyPayment);
      }
      
      // Calculamos la TIR mensual
      const tirMensual = calcularTIRMensual(flujos);
      const catCalculado = (Math.pow(1 + tirMensual, 12) - 1) * 100;
      setCat(catCalculado);
      
    } else if (loanType === 'revolvente') {
      // Préstamo revolvente (solo intereses hasta el final)
      const monthlyRate = rate / 100 / 12;
      const monthlyInterest = amount * monthlyRate;
      
      // En un crédito revolvente, intereses mensuales y capital al final
      for (let i = 1; i <= term; i++) {
        // En meses intermedios, solo se pagan intereses
        if (i < term) {
          schedule.push({
            period: i,
            payment: monthlyInterest,
            principal: 0,
            interest: monthlyInterest,
            balance: amount
          });
          totalInt += monthlyInterest;
          totalPay += monthlyInterest;
        } else {
          // En el último mes, se paga capital + intereses
          schedule.push({
            period: i,
            payment: amount + monthlyInterest,
            principal: amount,
            interest: monthlyInterest,
            balance: 0
          });
          totalInt += monthlyInterest;
          totalPay += amount + monthlyInterest;
        }
      }
      
      // CAT para revolvente - similar a la tasa anual con ajustes por comisiones
      const comisionApertura = amount * 0.01;
      const catRevolvente = ((rate / 100) + (comisionApertura / amount)) * 100;
      setCat(catRevolvente);
      
    } else if (loanType === 'factoraje') {
      // Factoraje financiero - interés se descuenta al inicio
      const interest = amount * (rate / 100) * (term / 12);
      
      // En factoraje, el interés se descuenta al inicio
      const montoEntregado = amount - interest;
      totalInt = interest;
      totalPay = amount; // El cliente paga el monto total al vencimiento
      
      // Flujo de operación de factoraje - Periodo 0
      schedule.push({
        period: 0,
        payment: 0, // No es un pago, es el inicio de la operación
        principal: 0,
        interest: interest, // Intereses descontados al inicio
        balance: amount,
        disposicion: montoEntregado // Monto que recibe el cliente
      });
      
      // Flujo de operación de factoraje - Periodo final
      schedule.push({
        period: term,
        payment: amount, // Lo que paga el cliente al vencimiento (el total)
        principal: amount,
        interest: 0, // Los intereses ya se cobraron al inicio
        balance: 0,
        disposicion: 0
      });
      
      // CAT para factoraje - considera el descuento inicial
      const catFactoraje = (Math.pow(amount / montoEntregado, 12 / term) - 1) * 100;
      setCat(catFactoraje);
    }
    
    setPaymentSchedule(schedule);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);
  };
  
  // Función para calcular la TIR mensual usando método de Newton-Raphson simplificado
  const calcularTIRMensual = (flujos) => {
    // Implementación simplificada para aproximar la TIR
    let tir = 0.01; // Suposición inicial
    const precision = 0.0000001;
    const maxIteraciones = 100;
    
    for (let i = 0; i < maxIteraciones; i++) {
      let valorPresente = 0;
      let derivada = 0;
      
      for (let j = 0; j < flujos.length; j++) {
        const factor = Math.pow(1 + tir, j);
        valorPresente += flujos[j] / factor;
        if (j > 0) {
          derivada -= j * flujos[j] / Math.pow(1 + tir, j + 1);
        }
      }
      
      if (Math.abs(valorPresente) < precision) {
        break;
      }
      
      // Evitar división por cero
      if (Math.abs(derivada) < precision) {
        break;
      }
      
      const nuevaTir = tir - valorPresente / derivada;
      
      if (Math.abs(nuevaTir - tir) < precision) {
        tir = nuevaTir;
        break;
      }
      
      tir = nuevaTir;
    }
    
    return tir;
  };

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  };

  return (
    <Card className="shadow">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex align-items-center">
          <img 
            src="/images/logo/logo.png" 
            alt="Cabott Capital Logo"
            className="me-3"
            width="50"
            height="50"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h3 className="mb-0">Simulador Financiero Cabott Capital</h3>
        </div>
      </Card.Header>
      <Card.Body>
        <Alert variant="info">
          Este simulador le permite calcular diferentes escenarios de financiamiento según sus necesidades. Los resultados son solo informativos y pueden variar según evaluación crediticia.
        </Alert>
        
        {/* Formulario */}
        <Form className="mb-4">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="loanType">
                <Form.Label>Tipo de Crédito</Form.Label>
                <Form.Select 
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                >
                  <option value="simple">Crédito Simple</option>
                  <option value="revolvente">Crédito Revolvente</option>
                  <option value="auto">Crédito para Auto</option>
                  <option value="factoraje">Factoraje Financiero</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="amount">
                <Form.Label>Monto del Préstamo</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formattedAmount}
                  onChange={handleAmountChange}
                  onClick={() => amountInputRef.current?.select()}
                  ref={amountInputRef}
                  className="text-end"
                />
                <Form.Text muted>Monto mínimo: $10,000 MXN</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group controlId="term">
                <Form.Label>Plazo (meses)</Form.Label>
                <Form.Control 
                  type="number" 
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  min="1"
                  max="60"
                />
                <Form.Text muted>Plazo máximo: 60 meses</Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="rate">
                <Form.Label>Tasa de Interés Anual (%)</Form.Label>
                <Form.Control 
                  type="number" 
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  min="1"
                  max="50"
                  step="0.1"
                />
                <Form.Text muted>Tasa sugerida: 18.5% anual</Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        
        {/* Resultados */}
        <Card className="bg-light mb-4">
          <Card.Body>
            <h4 className="text-primary mb-4">Resumen del Financiamiento</h4>
            
            <Row>
              {loanType === 'factoraje' ? (
                <>
                  <Col md={3} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Monto Solicitado</p>
                        <h5 className="text-primary">{formatCurrency(amount)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={3} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Disposición Neta (Inicial)</p>
                        <h5 className="text-primary">{formatCurrency(amount - totalInterest)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={3} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Intereses Descontados</p>
                        <h5 className="text-primary">{formatCurrency(totalInterest)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={3} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Monto a Pagar al Vencimiento</p>
                        <h5 className="text-primary">{formatCurrency(totalPayment)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={3} className="mb-3">
                    <Card className="h-100 border-primary">
                      <Card.Body>
                        <p className="text-muted mb-1">CAT (Costo Anual Total)</p>
                        <h5 className="text-primary">{cat.toFixed(2)}%</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              ) : (
                <>
                  <Col md={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Pago Total</p>
                        <h5 className="text-primary">{formatCurrency(totalPayment)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4} className="mb-3">
                    <Card className="h-100">
                      <Card.Body>
                        <p className="text-muted mb-1">Intereses Totales</p>
                        <h5 className="text-primary">{formatCurrency(totalInterest)}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={4} className="mb-3">
                    <Card className="h-100 border-primary">
                      <Card.Body>
                        <p className="text-muted mb-1">CAT Aproximado</p>
                        <h5 className="text-primary">{cat.toFixed(2)}%</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
        
        {/* Tabla de Amortización o Flujo del Financiamiento */}
        <div className="table-responsive">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-primary mb-0">
              {loanType === 'factoraje' ? 'Flujo de Factoraje Financiero' : 'Tabla de Amortización'}
            </h4>
            <Button variant="outline-primary" onClick={exportToExcel}>
              <i className="bi bi-download me-2"></i>Exportar a Excel
            </Button>
          </div>
          
          <table className="table table-striped table-hover">
            <thead className="bg-primary text-white">
              <tr>
                <th>Periodo</th>
                {loanType === 'factoraje' && <th className="text-end">Disposición</th>}
                <th className="text-end">Pago</th>
                <th className="text-end">Capital</th>
                <th className="text-end">Interés</th>
                <th className="text-end">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {paymentSchedule.map((row, index) => (
                <tr key={index} className={row.period === 0 ? 'table-info' : ''}>
                  <td>
                    {row.period === 0 ? 'Inicio' : row.period}
                  </td>
                  {loanType === 'factoraje' && (
                    <td className="text-end">
                      {row.disposicion !== undefined ? formatCurrency(row.disposicion) : '-'}
                    </td>
                  )}
                  <td className="text-end">
                    {loanType === 'factoraje' && row.period === 0 
                      ? '-' 
                      : formatCurrency(row.payment)}
                  </td>
                  <td className="text-end">{formatCurrency(row.principal)}</td>
                  <td className="text-end">{formatCurrency(row.interest)}</td>
                  <td className="text-end">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-light rounded">
          <h5>Información importante:</h5>
          <ul>
            <li>Este simulador es solo para fines informativos.</li>
            <li>Las tasas finales y condiciones pueden variar según evaluación crediticia.</li>
            <li>El cálculo del CAT incluye tasa de interés y comisiones.</li>
            <li>Para factoraje financiero, el interés se descuenta al inicio de la operación.</li>
            <li>Para crédito revolvente, los intereses se pagan mensualmente y el capital al vencimiento.</li>
          </ul>
          <p className="mb-0">Para más información o solicitar un crédito, contáctenos al (55) 4430-9061 o visite nuestras oficinas.</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FinancialSimulator;