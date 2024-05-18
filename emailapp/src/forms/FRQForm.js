import React, { useState } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';

const RFQForm = () => {
  const [emailContent, setEmailContent] = useState('');
  const [jsonValues, setJsonValues] = useState([]);
  const [result,setResutl] = useState('')
  
  const date = new Date().toISOString().slice(0, 10);

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
      <h1 className='text-center'>Request For Quote</h1>
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
