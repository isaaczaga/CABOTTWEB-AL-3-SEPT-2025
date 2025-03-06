import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Alert, Button } from 'react-bootstrap';

const Simulador = () => {
    // Estados para los valores del simulador
    const [loanType, setLoanType] = useState('simple');
    const [amount, setAmount] = useState(500000);
    const [formattedAmount, setFormattedAmount] = useState(
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
            .format(500000)
            .replace('$', '')
    );
    const [term, setTerm] = useState(12);
    const [rate, setRate] = useState(18.5);
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [cat, setCat] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // Función para formatear números con comas para miles
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
    };

    // Manejadores de cambios en inputs
    const handleLoanTypeChange = (e) => {
        setLoanType(e.target.value);
    };
    
    const handleTermChange = (e) => {
        setTerm(parseInt(e.target.value));
    };
    
    const handleRateChange = (e) => {
        setRate(parseFloat(e.target.value));
    };

    // Función para calcular la TIR mensual
    const calcularTIRMensual = (flujos) => {
        let tir = 0.01;
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
            if (Math.abs(valorPresente) < precision) break;
            if (Math.abs(derivada) < precision) break;
            const nuevaTir = tir - valorPresente / derivada;
            if (Math.abs(nuevaTir - tir) < precision) {
                tir = nuevaTir;
                break;
            }
            tir = nuevaTir;
        }
        return tir;
    };

    // Función para exportar a Excel (CSV)
    const exportToExcel = () => {
        let csvContent = 'data:text/csv;charset=utf-8,';
        let headers = ['Periodo', 'Pago', 'Capital', 'Interés', 'Saldo'];
        if (loanType === 'factoraje') headers.splice(1, 0, 'Disposición');
        csvContent += headers.join(',') + '\r\n';
        
        paymentSchedule.forEach(row => {
            let rowData = [
                row.period === 0 ? 'Inicio' : row.period,
                loanType === 'factoraje' && row.period === 0 ? 0 : row.payment,
                row.principal,
                row.interest,
                row.balance
            ];
            if (loanType === 'factoraje') {
                rowData.splice(1, 0, row.disposicion !== undefined ? row.disposicion : '');
            }
            rowData = rowData.map(val => 
                typeof val === 'number' ? val.toFixed(2).replace('.', ',') : val
            );
            csvContent += rowData.join(',') + '\r\n';
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Tabla_${loanType}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Función principal para calcular pagos
    const calculatePayments = () => {
        let schedule = [];
        let totalInt = 0;
        let totalPay = 0;
        
        if (loanType === 'simple' || loanType === 'auto') {
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
            const comisionApertura = amount * 0.01;
            const montoRecibido = amount - comisionApertura;
            const flujos = [-montoRecibido, ...Array(term).fill(monthlyPayment)];
            const tirMensual = calcularTIRMensual(flujos);
            setCat((Math.pow(1 + tirMensual, 12) - 1) * 100);
        } else if (loanType === 'revolvente') {
            const monthlyRate = rate / 100 / 12;
            const monthlyInterest = amount * monthlyRate;
            for (let i = 1; i <= term; i++) {
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
            const comisionApertura = amount * 0.01;
            setCat(((rate / 100) + (comisionApertura / amount)) * 100);
        } else if (loanType === 'factoraje') {
            const interest = amount * (rate / 100) * (term / 12);
            const montoEntregado = amount - interest;
            totalInt = interest;
            totalPay = amount;
            schedule.push(
                {
                    period: 0,
                    payment: 0,
                    principal: 0,
                    interest: interest,
                    balance: amount,
                    disposicion: montoEntregado
                },
                {
                    period: term,
                    payment: amount,
                    principal: amount,
                    interest: 0,
                    balance: 0,
                    disposicion: 0
                }
            );
            setCat((Math.pow(amount / montoEntregado, 12 / term) - 1) * 100);
        }
        
        setPaymentSchedule(schedule);
        setTotalInterest(totalInt);
        setTotalPayment(totalPay);
    };

    // Efecto para recalcular cuando cambian los valores
    useEffect(() => {
        calculatePayments();
    }, [loanType, amount, term, rate]);

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Simulador Financiero</h1>
            <Card className="shadow mb-5">
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex align-items-center">
                        <img 
                            src="/images/logo/logo.png" 
                            alt="Cabott Capital Logo"
                            className="mr-3"
                            width="50"
                            height="50"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <h3 className="mb-0">Simulador Financiero Cabott Capital</h3>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Alert variant="info">
                        Este simulador le permite calcular diferentes escenarios de financiamiento según sus necesidades. Los resultados son solo informativos y pueden variar según evaluación crediticia.
                    </Alert>
                    <Form className="mb-4">
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="loanType">
                                    <Form.Label>Tipo de Crédito</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        value={loanType}
                                        onChange={handleLoanTypeChange}
                                    >
                                        <option value="simple">Crédito Simple</option>
                                        <option value="revolvente">Crédito Revolvente</option>
                                        <option value="auto">Crédito para Auto</option>
                                        <option value="factoraje">Factoraje Financiero</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="amount">
                                    <Form.Label>Monto del Préstamo</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={isEditing ? amount.toString() : formattedAmount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setAmount(value ? parseInt(value, 10) : 0);
                                            }
                                        }}
                                        onFocus={() => setIsEditing(true)}
                                        onBlur={() => {
                                            setIsEditing(false);
                                            setFormattedAmount(formatCurrency(amount).replace('$', ''));
                                        }}
                                        className="text-right"
                                    />
                                    <Form.Text className="text-muted">Monto mínimo: $10,000 MXN</Form.Text>
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
                                        onChange={handleTermChange}
                                        min="1"
                                        max="60"
                                    />
                                    <Form.Text className="text-muted">Plazo máximo: 60 meses</Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="rate">
                                    <Form.Label>Tasa de Interés Anual (%)</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={rate}
                                        onChange={handleRateChange}
                                        min="1"
                                        max="50"
                                        step="0.1"
                                    />
                                    <Form.Text className="text-muted">Tasa sugerida: 18.5% anual</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <Card className="bg-light mb-4">
                        <Card.Body>
                            <h4 className="text-primary mb-4">Resumen del Financiamiento</h4>
                            {loanType === 'factoraje' ? (
                                <Row>
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
                                </Row>
                            ) : (
                                <Row>
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
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                    <div className="table-responsive">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-primary mb-0">
                                {loanType === 'factoraje' ? 'Flujo de Factoraje Financiero' : 'Tabla de Amortización'}
                            </h4>
                            <Button variant="outline-primary" onClick={exportToExcel}>
                                <i className="fas fa-download mr-2"></i>Exportar a Excel
                            </Button>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Periodo</th>
                                    {loanType === 'factoraje' && <th className="text-right">Disposición</th>}
                                    <th className="text-right">Pago</th>
                                    <th className="text-right">Capital</th>
                                    <th className="text-right">Interés</th>
                                    <th className="text-right">Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentSchedule.map((row, index) => (
                                    <tr key={index} className={row.period === 0 ? 'table-info' : ''}>
                                        <td>{row.period === 0 ? 'Inicio' : row.period}</td>
                                        {loanType === 'factoraje' && (
                                            <td className="text-right">
                                                {row.disposicion !== undefined ? formatCurrency(row.disposicion) : '-'}
                                            </td>
                                        )}
                                        <td className="text-right">
                                            {loanType === 'factoraje' && row.period === 0 
                                                ? '-' 
                                                : formatCurrency(row.payment)}
                                        </td>
                                        <td className="text-right">{formatCurrency(row.principal)}</td>
                                        <td className="text-right">{formatCurrency(row.interest)}</td>
                                        <td className="text-right">{formatCurrency(row.balance)}</td>
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
            <div className="text-center mb-5">
                <Button href="/contacto" variant="primary" size="lg">Solicitar más información</Button>
            </div>
        </Container>
    );
};

export default Simulador;