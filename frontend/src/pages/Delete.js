import NavBar from '../component/NavBar';

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const DeleteForm = () => {
    const [identificationNumber, setIdentificationNumber] = useState('');
    const handleIdentificationSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:5001/citizens/"+identificationNumber, {
            method: 'DELETE',
        })
        .then((response) => {
            response.json()
            .then(data => console.log(data))
        })
        .catch(err => {console.log(err)})
    };
  
  
    return (
      <div>
          <Form onSubmit={handleIdentificationSubmit}>
            <Form.Group controlId="identificationNumber">
              <Form.Label>Identification Number</Form.Label>
              <Form.Control
                type="text"
                value={identificationNumber}
                onChange={(e) => setIdentificationNumber(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
      </div>
    );
  };

export default function Delete() {
  return (
    <>
        <NavBar/>
        <DeleteForm/>
    </>
  )
}
