import NavBar from '../component/NavBar';

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const UpdateForm = () => {
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [identificationFlag, setIdentificationFlag] = useState(false);

    const [formData, setFormData] = useState({
        identification_number: '',
        name: '',
        last_name: '',
        date_of_birth: '',
        date_of_issue: '',
        date_of_expiry: '',
      });
  
    const handleIdentificationSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:5001/citizens/"+identificationNumber)
        .then(response =>{
            response.json()
            .then(data=>{
                setFormData(data);
                console.log(data)
                setIdentificationFlag(true);
            })
        })
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log("hhh")
      console.log(formData)
      fetch("http://localhost:5001/citizens/"+identificationNumber, {
            method: 'PUT',
            body: formData,
        })
        .then((response) => {
            response.json()
            .then(data => console.log(data))
        })
        .catch(err => {console.log(err)})
    };
  
    return (
      <div>
        {identificationFlag ? (
          <Form onSubmit={handleFormSubmit} style={{width:"600px",margin:"10vh"}}>
          <Form.Group>
            <Form.Label>Identification Number</Form.Label>
            <Form.Control type="text" name="identification_number" value={formData.identification_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="text" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Issue</Form.Label>
            <Form.Control type="text" name="date_of_issue" value={formData.date_of_issue} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Expiry</Form.Label>
            <Form.Control type="text" name="date_of_expiry" value={formData.date_of_expiry} onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        ) : (
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
        )}
      </div>
    );
  };


export default function Update() {
  return (
    <>
        <NavBar/>
        <UpdateForm/>
    </>
  )
}