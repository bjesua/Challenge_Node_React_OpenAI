import React, { useState } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import logo1 from '../logo_robot.PNG'

const RFQForm = () => {
  const [emailContent, setEmailContent] = useState('');
  const [jsonValues, setJsonValues] = useState([]);
  const [result,setResutl] = useState('')
  
  const date = new Date().toISOString().slice(0, 10);

  const jsonData = {
    "products": [
      { "id": "P001", "name": "Smartphone X1" },
      { "id": "P002", "name": "Pro Laptop 15" },
      { "id": "P003", "name": "Wireless Headphones Y2" },
      { "id": "P004", "name": "Smartwatch Z3" },
      { "id": "P005", "name": "4K TV Ultra HD 55\"" },
      { "id": "P006", "name": "Bluetooth Speaker S2" },
      { "id": "P007", "name": "Gaming Console GX" },
      { "id": "P008", "name": "Tablet T10" },
      { "id": "P009", "name": "Digital Camera C5" },
      { "id": "P010", "name": "Smart Home Hub H1" }
    ]
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailContent })
    });

    const result = await response.json();
    setResutl(result)
    setJsonValues([...jsonValues, result]);
  };

  return (
    <Container>
      <img src={logo1} className="App-logo" alt="logo" style={{ width: '5%', margin: 'auto', display: 'block' }} />

      <h1 className='text-center'>Request For Quote</h1>
      <h3>List of products</h3>
      <ul>
        {jsonData.products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="emailContent">
          <Form.Label>Please write your email</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Email
        </Button>
      </Form>

      {jsonValues.length > 0 && (
        <div>
          <hr/>
          <h2>Response</h2>
          <p>{result}</p>
          <hr/>
          <h4>Previous Responses</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Quote #</th>
                <th>Date</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {jsonValues.map((response, index) => (
                <tr key={index+1}>
                  <td>{index+1}</td>
                  <td>{date}</td>
                  <td>{JSON.stringify(response)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default RFQForm;
